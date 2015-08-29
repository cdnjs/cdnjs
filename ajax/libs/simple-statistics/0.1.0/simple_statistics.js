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
            var odds = {};
            // Iterate through each key in the item,
            // then iterate through each category that has been used
            // in previous calls to `.train()`
            for (var k in item) {
                var v = item[k];
                for (var category in data) {
                    // Create an empty object for storing key - value combinations
                    // for this category.
                    if (odds[category] === undefined) odds[category] = {};

                    // If this item doesn't even have a property, it counts for nothing,
                    // but if it does have the property that we're looking for from
                    // the item to categorize, it counts based on how popular it is
                    // versus the whole population.
                    if (data[category][k]) {
                        odds[category][k + '_' + v] = data[category][k][v] / total_count;
                    } else {
                        odds[category][k + '_' + v] = 0;
                    }
                }
            }

            // Set up a new object that will contain sums of these odds by category
            var odds_sums = {};

            for (var category in odds) {
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

    // # [median](http://en.wikipedia.org/wiki/Median)
    ss.median = function(x) {
        // The median of an empty list is null
        if (x.length === 0) return null;

        // Sorting the array makes it easy to find the center, but
        // use `.slice()` to ensure the original array `x` is not modified
        var sorted = x.slice().sort();

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

})(this);
