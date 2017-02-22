angular.module( 'angularUtils.filters.ordinalDate', [] )

    .filter('ordinalDate', ['$filter', function($filter) {

        var getOrdinalSuffix = function(number) {
            var suffixes = ["'th'", "'st'", "'nd'", "'rd'"];
            var relevantDigits = (number < 30) ? number % 20 : number % 30;
            return (relevantDigits <= 3) ? suffixes[relevantDigits] : suffixes[0];
        };

        /**
         * Look through the format string for any possible match for 'd'.
         * It needs to ignore 'dd' and also occurrences of the letter d inside
         * string such as "d 'day of' MM'.
         * @param format
         */
        var getIndecesOfDayCharacter = function(format) {
            var dayRegex = /(?:'(?:[^']|'')*')|(?:d+)/g;
            var matchingIndices = [];
            var finishedLooking = false;

            while(!finishedLooking) {
                var matches = dayRegex.exec(format);
                if (matches) {
                    dayRegex.lastIndex = matches.index + matches[0].length;
                    if (matches[0] === 'd') {
                        matchingIndices.push(matches.index + 1);
                    }
                } else {
                    finishedLooking = true;
                }
            }

            return matchingIndices;
        };

        /**
         * Insert a string at a given index of another string
         * @param inputString
         * @param index
         * @param stringToInsert
         * @returns {string}
         */
        var insertAtIndex = function(inputString, index, stringToInsert) {
            var partBeforeIndex = inputString.substring(0, index);
            var partAfterIndex = inputString.substring(index, inputString.length);
            return partBeforeIndex + stringToInsert + partAfterIndex;
        };

        return function(timestamp, format) {
            var date = new Date(timestamp);
            var dayOfMonth = date.getDate();
            var suffix = getOrdinalSuffix(dayOfMonth);

            var matchingIndices = getIndecesOfDayCharacter(format);

            // now we to insert the suffix at the index(-ces) that we found
            for (var i = matchingIndices.length; i > 0; i --) {
                format = insertAtIndex(format, matchingIndices[i-1], suffix);
            }
            return $filter('date')(date, format);
        };
    }]);