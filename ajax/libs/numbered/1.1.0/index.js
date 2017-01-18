(function (root, factory) {
  /* istanbul ignore else */
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else if (typeof define === 'function' && define.amd) {
    // AMD, registers as an anonymous module.
    define(factory);
  } else {
    // Browser global.
    root.numbered = factory();
  }
})(this, function () {
  var NUMBER_MAP = {
    '.': 'point',
    '-': 'negative',
    0: 'zero',
    1: 'one',
    2: 'two',
    3: 'three',
    4: 'four',
    5: 'five',
    6: 'six',
    7: 'seven',
    8: 'eight',
    9: 'nine',
    10: 'ten',
    11: 'eleven',
    12: 'twelve',
    13: 'thirteen',
    14: 'fourteen',
    15: 'fifteen',
    16: 'sixteen',
    17: 'seventeen',
    18: 'eighteen',
    19: 'nineteen',
    20: 'twenty',
    30: 'thirty',
    40: 'forty',
    50: 'fifty',
    60: 'sixty',
    70: 'seventy',
    80: 'eighty',
    90: 'ninety'
  };

  // http://en.wikipedia.org/wiki/English_numerals#Cardinal_numbers
  var CARDINAL_MAP = {
    2: 'hundred',
    3: 'thousand',
    6: 'million',
    9: 'billion',
    12: 'trillion',
    15: 'quadrillion',
    18: 'quintillion',
    21: 'sextillion',
    24: 'septillion',
    27: 'octillion',
    30: 'nonillion',
    33: 'decillion',
    36: 'undecillion',
    39: 'duodecillion',
    42: 'tredecillion',
    45: 'quattuordecillion',
    48: 'quindecillion',
    51: 'sexdecillion',
    54: 'septendecillion',
    57: 'octodecillion',
    60: 'novemdecillion',
    63: 'vigintillion',
    100: 'googol',
    303: 'centillion'
  };

  // Make a hash of words back to their numeric value.
  var WORD_MAP = {
    nil: 0,
    naught: 0,
    period: '.',
    decimal: '.'
  };

  Object.keys(NUMBER_MAP).forEach(function (num) {
    WORD_MAP[NUMBER_MAP[num]] = isNaN(+num) ? num : +num;
  });

  Object.keys(CARDINAL_MAP).forEach(function (num) {
    WORD_MAP[CARDINAL_MAP[num]] = isNaN(+num) ? num : Math.pow(10, +num);
  });

  /**
   * Returns the number of significant figures for the number.
   *
   * @param  {number} num
   * @return {number}
   */
  function intervals (num) {
    var match = String(num).match(/e\+(\d+)/);

    if (match) return match[1];

    return String(num).length - 1;
  }

  /**
   * Calculate the value of the current stack.
   *
   * @param {Array}  stack
   * @param {number} largest
   */
  function totalStack (stack, largest) {
    var total = stack.reduceRight(function (prev, num, index) {
      if (num > stack[index + 1]) {
        return prev * num;
      }

      return prev + num;
    }, 0);

    return total * largest;
  }

  /**
   * Accepts both a string and number type, and return the opposite.
   *
   * @param  {string|number} num
   * @return {string|number}
   */
  function numbered (num) {
    if (typeof num === 'string') return numbered.parse(num);
    if (typeof num === 'number') return numbered.stringify(num);

    throw new Error('Numbered can only parse strings or stringify numbers');
  }

  /**
   * Turn a number into a string representation.
   *
   * @param  {number} num
   * @return {string}
   */
  numbered.stringify = function (value) {
    var num = Number(value);
    var floor = Math.floor(num);

    // If the number is in the numbers object, we quickly return.
    if (NUMBER_MAP[num]) return NUMBER_MAP[num];

    // If the number is a negative value.
    if (num < 0) return NUMBER_MAP['-'] + ' ' + numbered.stringify(-num);

    // Check if we have decimals.
    if (floor !== num) {
      var words = [numbered.stringify(floor), NUMBER_MAP['.']];
      var chars = String(num).split('.').pop();

      for (var i = 0; i < chars.length; i++) {
        words.push(numbered.stringify(+chars[i]));
      }

      return words.join(' ');
    }

    var interval = intervals(num);

    // It's below one hundred, but greater than nine.
    if (interval === 1) {
      return NUMBER_MAP[Math.floor(num / 10) * 10] + '-' + numbered.stringify(Math.floor(num % 10));
    }

    var sentence = [];

    // Simple check to find the closest full number helper.
    while (!CARDINAL_MAP[interval]) interval -= 1;

    if (CARDINAL_MAP[interval]) {
      var remaining = Math.floor(num % Math.pow(10, interval));

      sentence.push(numbered.stringify(Math.floor(num / Math.pow(10, interval))));
      sentence.push(CARDINAL_MAP[interval] + (remaining > 99 ? ',' : ''));

      if (remaining) {
        if (remaining < 100) sentence.push('and');

        sentence.push(numbered.stringify(remaining));
      }
    }

    return sentence.join(' ');
  };

  /**
   * Turns a string representation of a number into a number type
   * @param  {string} num
   * @return {number}
   */
  numbered.parse = function (num) {
    var modifier = 1;
    var largest = 0;
    var largestInterval = 0;
    var zeros = 0; // Track leading zeros in a decimal.
    var stack = [];

    var total = num.split(/\W+/g)
      .map(function (word) {
        var num = word.toLowerCase();

        return WORD_MAP[num] !== undefined ? WORD_MAP[num] : num;
      })
      .filter(function (num) {
        if (num === '-') modifier = -1;
        if (num === '.') return true; // Decimal points are a special case.

        return typeof num === 'number';
      })
      .reduceRight(function (memo, num) {
        var interval = intervals(num);

        // Check the interval is smaller than the largest one, then create a stack.
        if (typeof num === 'number' && interval < largestInterval) {
          stack.push(num);
          if (stack.length === 1) return memo - largest;
          return memo;
        }

        memo += totalStack(stack, largest);
        stack = []; // Reset the stack for more computations.

        // If the number is a decimal, transform everything we have worked with.
        if (num === '.') {
          var decimals = zeros + String(memo).length;

          zeros = 0;
          largest = 0;
          largestInterval = 0;

          return memo * Math.pow(10, -decimals);
        }

        // Buffer encountered zeros.
        if (num === 0) {
          zeros += 1;
          return memo;
        }

        // Shove the number on the front if the intervals match and the number whole.
        if (memo >= 1 && interval === largestInterval) {
          var output = '';

          while (zeros > 0) {
            zeros -= 1;
            output += '0';
          }

          return Number(String(num) + output + String(memo));
        }

        largest = num;
        largestInterval = intervals(largest);

        return (memo + num) * Math.pow(10, zeros);
      }, 0);

    return modifier * (total + totalStack(stack, largest));
  };

  return numbered;
});
