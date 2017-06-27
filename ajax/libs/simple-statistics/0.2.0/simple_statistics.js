(function() {
    var ss = {};

    if (typeof module !== 'undefined') {
        // node.js
        exports = module.exports = ss;
    } else {
        // browser
        this.ss = ss;
    }

    // # [Linear Regression](http://en.wikipedia.org/wiki/Linear_regression)
    //
    // [Simple linear regression](http://en.wikipedia.org/wiki/Simple_linear_regression)
    // is a simple way to find a fitted line
    // between a set of coordinates.
    ss.linear_regression = function() {
        var linreg = {},
            data = [];

        // Assign the data to the model.
        linreg.data = function(x) {
            if (!arguments.length) return data;
            data = x.slice();
            return linreg;
        };

        // ## Fitting The Regression Line
        //
        // This is called after `.data()` and returns the
        // equation `y = f(x)` which gives the position
        // of the regression line at each point in `x`.
        linreg.line = function() {

            //if there's only one point, arbitrarily choose a slope of 0
            //and a y-intercept of whatever the y of the initial point is
            if (data.length == 1) {
                m = 0;
                b = data[0][1];
            } else {
                // Initialize our sums and scope the `m` and `b`
                // variables that define the line.
                var sum_x = 0, sum_y = 0,
                    sum_xx = 0, sum_xy = 0,
                    m, b;

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

            // Return a function that computes a `y` value for each
            // x value it is given, based on the values of `b` and `a`
            // that we just computed.
            return function(x) {
                return b + (m * x);
            };
        };

        return linreg;
    };

    // # [R Squared](http://en.wikipedia.org/wiki/Coefficient_of_determination)
    //
    // The r-squared value of data compared with a function `f`
    // is the sum of the squared differences between the prediction
    // and the actual value.
    ss.r_squared = function(data, f) {
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
    };


    // # [Bayesian Classifier](http://en.wikipedia.org/wiki/Naive_Bayes_classifier)
    //
    // This is a naïve bayesian classifier that takes
    // singly-nested objects.
    ss.bayesian = function() {
        // Create the bayes_model object, that will
        // expose methods
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
    };

    // # sum
    //
    // is simply the result of adding all numbers
    // together, starting from zero.
    //
    // This runs on `O(n)`, linear time in respect to the array
    ss.sum = function(x) {
        var sum = 0;
        for (var i = 0; i < x.length; i++) {
            sum += x[i];
        }
        return sum;
    };

    // # mean
    //
    // is the sum over the number of values
    //
    // This runs on `O(n)`, linear time in respect to the array
    ss.mean = function(x) {
        // The mean of no numbers is null
        if (x.length === 0) return null;

        return ss.sum(x) / x.length;
    };

    // # geometric mean
    //
    // a mean function that is more useful for numbers in different
    // ranges.
    //
    // this is the nth root of the input numbers multipled by each other
    //
    // This runs on `O(n)`, linear time in respect to the array
    ss.geometric_mean = function(x) {
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
    };

    // Alias this into its common name
    ss.average = ss.mean;

    // # min
    //
    // This is simply the minimum number in the set.
    //
    // This runs on `O(n)`, linear time in respect to the array
    ss.min = function(x) {
        var min;
        for (var i = 0; i < x.length; i++) {
            // On the first iteration of this loop, min is
            // undefined and is thus made the minimum element in the array
            if (x[i] < min || min === undefined) min = x[i];
        }
        return min;
    };

    // # max
    //
    // This is simply the maximum number in the set.
    //
    // This runs on `O(n)`, linear time in respect to the array
    ss.max = function(x) {
        var max;
        for (var i = 0; i < x.length; i++) {
            // On the first iteration of this loop, min is
            // undefined and is thus made the minimum element in the array
            if (x[i] > max || max === undefined) max = x[i];
        }
        return max;
    };

    // # [variance](http://en.wikipedia.org/wiki/Variance)
    //
    // is the sum of squared deviations from the mean
    ss.variance = function(x) {
        // The variance of no numbers is null
        if (x.length === 0) return null;

        var mean = ss.mean(x),
            deviations = [];

        // Make a list of squared deviations from the mean.
        for (var i = 0; i < x.length; i++) {
            deviations.push(Math.pow(x[i] - mean, 2));
        }

        // Find the mean value of that list
        return ss.mean(deviations);
    };

    // # [standard deviation](http://en.wikipedia.org/wiki/Standard_deviation)
    //
    // is just the square root of the variance.
    ss.standard_deviation = function(x) {
        // The standard deviation of no numbers is null
        if (x.length === 0) return null;

        return Math.sqrt(ss.variance(x));
    };

    // # [variance](http://en.wikipedia.org/wiki/Variance)
    //
    // is the sum of squared deviations from the mean
    ss.sample_variance = function(x) {
        // The variance of no numbers is null
        if (x.length <= 1) return null;

        var mean = ss.mean(x),
            sum = 0.0;

        // Make a list of squared deviations from the mean.
        for (var i = 0; i < x.length; i++) {
            sum += Math.pow(x[i] - mean, 2);
        }

        // Find the mean value of that list
        return sum / (x.length - 1);
    };

    // # [standard deviation](http://en.wikipedia.org/wiki/Standard_deviation)
    //
    // is just the square root of the variance.
    ss.sample_standard_deviation = function(x) {
        // The standard deviation of no numbers is null
        if (x.length <= 1) return null;

        return Math.sqrt(ss.sample_variance(x));
    };

    // # [covariance](http://en.wikipedia.org/wiki/Covariance)
    //
    // sample covariance of two datasets: how much do the two datasets move together?
    ss.sample_covariance = function(x, y){
        // The two datasets must have the same length which must be more than 1
        if (x.length <= 1 || x.length != y.length){
          return null;
        }

        var xmean = ss.mean(x);
        var ymean = ss.mean(y);

        var sum = 0.0;

        for (var i = 0; i < x.length; i++){
          sum += (x[i] - xmean) * (y[i] - ymean);
        }

        return sum / (x.length - 1);
    };

    // # [correlation)(http://en.wikipedia.org/wiki/Correlation_and_dependence
    //
    // Gets a measure of how correlated two datasets are, between -1 and 1
    ss.sample_correlation = function(x, y){
        var cov = ss.sample_covariance(x, y);
        var xstd = ss.sample_standard_deviation(x);
        var ystd = ss.sample_standard_deviation(y);

        if (cov === null || xstd === null || ystd === null){
          return null;
        }
        return cov / xstd / ystd;
    };

    // # [median](http://en.wikipedia.org/wiki/Median)
    ss.median = function(x) {
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
    };

    // # [mode](http://en.wikipedia.org/wiki/Mode_(statistics))
    // This implementation is inspired by science.js:
    // https://github.com/jasondavies/science.js/blob/master/src/stats/mode.js
    ss.mode = function(x) {

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
            mode,
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
                    mode = last;
                }
                last = sorted[i];
            // if this isn't a new number, it's one more occurrence of
            // the potential mode
            } else { seen_this++; }
        }
        return mode;
    };

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
    ss.t_test = function(sample, x) {
      // The mean of the sample
      var sample_mean = ss.mean(sample);

      // The standard deviation of the sample
      var sd = ss.standard_deviation(sample);

      // Square root the length of the sample
      var rootN = Math.sqrt(sample.length);

      // Compute the known value against the sample,
      // returning the t value
      return (sample_mean - x) / (sd / rootN);
    };

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
    ss.quantile = function(sample, p) {

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
    };

    ss.mixin = function() {
        var support = !!(Object.defineProperty && Object.defineProperties);
        if (!support) throw new Error('without defineProperty, simple-statistics cannot be mixed in');

        var arrayMethods = ['median', 'standard_deviation', 'sum',
            'mean', 'min', 'max', 'quantile', 'geometric_mean'];

        // create a closure with a method name so that a reference
        // like arrayMethods[i] doesn't follow the loop increment
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
        // argument
        for (var i = 0; i < arrayMethods.length; i++) {
            Object.defineProperty(Array.prototype, arrayMethods[i], {
                value: wrap(arrayMethods[i]),
                configurable: true,
                enumerable: false,
                writable: true
            });
        }
    };

})(this);
