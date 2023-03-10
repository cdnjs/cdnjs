/*!
 * Fuzzy Search for DataTables
 * 2021 SpryMedia Ltd - datatables.net/license MIT license
 *
 * Damerau-Levenshtein function courtesy of https://github.com/tad-lispy/node-damerau-levenshtein
 * BSD 2-Clause License
 * Copyright (c) 2018, Tadeusz Łazurski
 * All rights reserved.
 */

(function( factory ){
	if ( typeof define === 'function' && define.amd ) {
		// AMD
		define( ['jquery', 'datatables.net'], function ( $ ) {
			return factory( $, window, document );
		} );
	}
	else if ( typeof exports === 'object' ) {
		// CommonJS
		var jq = require('jquery');
		var cjsRequires = function (root, $) {
			if ( ! $.fn.dataTable ) {
				require('datatables.net')(root, $);
			}
		};

		if (typeof window !== 'undefined') {
			module.exports = function (root, $) {
				if ( ! root ) {
					// CommonJS environments without a window global must pass a
					// root. This will give an error otherwise
					root = window;
				}

				if ( ! $ ) {
					$ = jq( root );
				}

				cjsRequires( root, $ );
				return factory( $, root, root.document );
			};
		}
		else {
			cjsRequires( window, jq );
			module.exports = factory( jq, window, window.document );
		}
	}
	else {
		// Browser
		factory( jQuery, window, document );
	}
}(function( $, window, document, undefined ) {
'use strict';
var DataTable = $.fn.dataTable;


function levenshtein(__this, that, limit) {
    var thisLength = __this.length, thatLength = that.length, matrix = [];
    // If the limit is not defined it will be calculate from this and that args.
    limit = (limit || (thatLength > thisLength ? thatLength : thisLength)) + 1;
    for (var i = 0; i < limit; i++) {
        matrix[i] = [i];
        matrix[i].length = limit;
    }
    for (i = 0; i < limit; i++) {
        matrix[0][i] = i;
    }
    if (Math.abs(thisLength - thatLength) > (limit || 100)) {
        return prepare(limit || 100);
    }
    if (thisLength === 0) {
        return prepare(thatLength);
    }
    if (thatLength === 0) {
        return prepare(thisLength);
    }
    // Calculate matrix.
    var j, this_i, that_j, cost, min, t;
    for (i = 1; i <= thisLength; ++i) {
        this_i = __this[i - 1];
        // Step 4
        for (j = 1; j <= thatLength; ++j) {
            // Check the jagged ld total so far
            if (i === j && matrix[i][j] > 4)
                return prepare(thisLength);
            that_j = that[j - 1];
            cost = this_i === that_j ? 0 : 1; // Step 5
            // Calculate the minimum (much faster than Math.min(...)).
            min = matrix[i - 1][j] + 1; // Devarion.
            if ((t = matrix[i][j - 1] + 1) < min)
                min = t; // Insertion.
            if ((t = matrix[i - 1][j - 1] + cost) < min)
                min = t; // Substitution.
            // Update matrix.
            matrix[i][j] =
                i > 1 &&
                    j > 1 &&
                    this_i === that[j - 2] &&
                    __this[i - 2] === that_j &&
                    (t = matrix[i - 2][j - 2] + cost) < min
                    ? t
                    : min; // Transposition.
        }
    }
    return prepare(matrix[thisLength][thatLength]);
    function prepare(steps) {
        var length = Math.max(thisLength, thatLength);
        var relative = length === 0 ? 0 : steps / length;
        var similarity = 1 - relative;
        return {
            steps: steps,
            relative: relative,
            similarity: similarity,
        };
    }
}
function fuzzySearch(searchVal, data, initial) {
    // If no searchVal has been defined then return all rows.
    if (searchVal === undefined || searchVal.length === 0) {
        return {
            pass: true,
            score: '',
        };
    }
    var threshold = initial.threshold !== undefined ? initial.threshold : 0.5;
    // Split the searchVal into individual words.
    var splitSearch = searchVal.split(/ /g);
    // Array to keep scores in
    var highestCollated = [];
    // Remove any empty words or spaces
    for (var x = 0; x < splitSearch.length; x++) {
        if (splitSearch[x].length === 0 || splitSearch[x] === ' ') {
            splitSearch.splice(x, 1);
            x--;
        }
        // Aside - Add to the score collection if not done so yet for this search word
        else if (highestCollated.length < splitSearch.length) {
            highestCollated.push({ pass: false, score: 0 });
        }
    }
    // Going to check each cell for potential matches
    for (var i = 0; i < data.length; i++) {
        // Convert all data points to lower case fo insensitive sorting
        data[i] = data[i].toLowerCase();
        // Split the data into individual words
        var splitData = data[i].split(/ /g);
        // Remove any empty words or spaces
        for (var y = 0; y < splitData.length; y++) {
            if (splitData[y].length === 0 || splitData[y] === ' ') {
                splitData.splice(y, 1);
                x--;
            }
        }
        // Check each search term word
        for (var x = 0; x < splitSearch.length; x++) {
            // Reset highest score
            var highest = {
                pass: undefined,
                score: 0,
            };
            // Against each word in the cell
            for (var y = 0; y < splitData.length; y++) {
                // If this search Term word is the beginning of the word in the cell we want to pass this word
                if (splitData[y].indexOf(splitSearch[x]) === 0) {
                    var newScore = splitSearch[x].length / splitData[y].length;
                    highest = {
                        pass: true,
                        score: highest.score < newScore ? newScore : highest.score,
                    };
                }
                // Get the levenshtein similarity score for the two words
                var steps = levenshtein(splitSearch[x], splitData[y]).similarity;
                // If the levenshtein similarity score is better than a previous one for the search word then var's store it
                if (steps > highest.score) {
                    highest.score = steps;
                }
            }
            // If this cell has a higher scoring word than previously found to the search term in the row, store it
            if (highestCollated[x].score < highest.score || highest.pass) {
                highestCollated[x] = {
                    pass: highest.pass || highestCollated[x].pass
                        ? true
                        : highest.score > threshold,
                    score: highest.score,
                };
            }
        }
    }
    // Check that all of the search words have passed
    for (var i = 0; i < highestCollated.length; i++) {
        if (!highestCollated[i].pass) {
            return {
                pass: false,
                score: Math.round((highestCollated.reduce((a, b) => a + b.score, 0) /
                    highestCollated.length) *
                    100) + '%',
            };
        }
    }
    // If we get to here, all scores greater than 0.5 so display the row
    return {
        pass: true,
        score: Math.round((highestCollated.reduce((a, b) => a + b.score, 0) /
            highestCollated.length) *
            100) + '%',
    };
}
DataTable.ext.search.push(function (settings, data, dataIndex) {
    var initial = settings.oInit.fuzzySearch;
    if (!initial) {
        return true;
    }
    // If fuzzy searching has not been implemented then pass all rows for this function
    if (settings.aoData[dataIndex]._fuzzySearch !== undefined) {
        // Read score to set the cell content and sort data
        var score = settings.aoData[dataIndex]._fuzzySearch.score;
        if (initial.rankColumn !== undefined) {
            settings.aoData[dataIndex].anCells[initial.rankColumn].innerHTML = score;
            // Remove '%' from the end of the score so can sort on a number
            settings.aoData[dataIndex]._aSortData[initial.rankColumn] =
                +score.substring(0, score.length - 1);
        }
        // Return the value for the pass as decided by the fuzzySearch function
        return settings.aoData[dataIndex]._fuzzySearch.pass;
    }
    else if (initial.rankColumn !== undefined) {
        settings.aoData[dataIndex].anCells[initial.rankColumn].innerHTML = '';
        settings.aoData[dataIndex]._aSortData[initial.rankColumn] = '';
    }
    return true;
});
$(document).on('init.dt', function (e, settings) {
    var api = new DataTable.Api(settings);
    var initial = api.init();
    var initialFuzzy = initial.fuzzySearch;
    // If this is not set then fuzzy searching is not enabled on the table so return.
    if (!initialFuzzy) {
        return;
    }
    var fromPlugin = false;
    // Find the input element
    var input = $('div.dataTables_filter input', api.table().container());
    var fontBold = {
        'font-weight': '600',
        'background-color': 'rgba(255,255,255,0.1)',
    };
    var fontNormal = {
        'font-weight': '500',
        'background-color': 'transparent',
    };
    var toggleCSS = {
        border: 'none',
        background: 'none',
        'font-size': '100%',
        width: '50%',
        display: 'inline-block',
        color: 'white',
        cursor: 'pointer',
        padding: '0.5em',
    };
    // Only going to set the toggle if it is enabled
    var toggle, tooltip, exact, fuzzy, label;
    if (typeof initialFuzzy === 'object' && initialFuzzy.toggleSmart) {
        toggle = $('<button class="toggleSearch">Abc</button>')
            .insertAfter(input)
            .css({
            border: 'none',
            background: 'none',
            position: 'relative',
            right: '33px',
            top: '0px',
            cursor: 'pointer',
            color: '#3b5e99',
            'margin-top': '1px',
        });
        exact = $('<button class="toggleSearch">Exact</button>')
            .insertAfter(input)
            .css(toggleCSS)
            .css(fontBold)
            .attr('highlighted', 'true');
        fuzzy = $('<button class="toggleSearch">Fuzzy</button>')
            .insertAfter(input)
            .css(toggleCSS);
        input.css({
            'padding-right': '30px',
        });
        $(input.parent()).css('right', '-33px').css('position', 'relative');
        label = $('<div>Search Type<div>').css({
            'padding-bottom': '0.5em',
            'font-size': '0.8em',
        });
        tooltip = $('<div class="fuzzyToolTip"></div>')
            .css({
            position: 'absolute',
            top: '2em',
            background: 'white',
            'border-radius': '4px',
            'text-align': 'center',
            padding: '0.5em',
            'background-color': '#16232a',
            'box-shadow': '4px 4px 4px rgba(0, 0, 0, 0.5)',
            color: 'white',
            transition: 'opacity 0.25s',
            'z-index': '30001',
            width: input.outerWidth() - 3,
        })
            .append(label)
            .append(exact)
            .append(fuzzy);
    }
    function toggleFuzzy(event) {
        if (toggle.attr('blurred')) {
            toggle.css({ filter: 'blur(0px)' }).removeAttr('blurred');
            fuzzy.removeAttr('highlighted').css(fontNormal);
            exact.attr('highlighted', true).css(fontBold);
        }
        else {
            toggle.css({ filter: 'blur(1px)' }).attr('blurred', true);
            exact.removeAttr('highlighted').css(fontNormal);
            fuzzy.attr('highlighted', true).css(fontBold);
        }
        // Whenever the search mode is changed we need to re-search
        triggerSearchFunction(event);
    }
    // Turn off the default datatables searching events
    $(settings.nTable).off('search.dt.DT');
    var fuzzySearchVal = '';
    var searchVal = '';
    // The function that we want to run on search
    var triggerSearchFunction = function (event) {
        // If the search is only to be triggered on return wait for that
        if ((event.type === 'input' &&
            (initial.search === undefined || !initial.search.return)) ||
            event.key === 'Enter' ||
            event.type === 'click') {
            // If the toggle is set and isn't checkd then perform a normal search
            if (toggle && !toggle.attr('blurred')) {
                api.rows().iterator('row', function (settings, rowIdx) {
                    settings.aoData[rowIdx]._fuzzySearch = undefined;
                }, false);
                searchVal = input.val();
                fuzzySearchVal = searchVal;
                fromPlugin = true;
                api.search(searchVal);
                fromPlugin = false;
                searchVal = '';
            }
            // Otherwise perform a fuzzy search
            else {
                // Get the value from the input element and convert to lower case
                fuzzySearchVal = input.val();
                searchVal = '';
                if (fuzzySearchVal !== undefined && fuzzySearchVal.length !== 0) {
                    fuzzySearchVal = fuzzySearchVal.toLowerCase();
                }
                // For each row call the fuzzy search function to get result
                api.rows().iterator('row', function (settings, rowIdx) {
                    settings.aoData[rowIdx]._fuzzySearch = fuzzySearch(fuzzySearchVal, settings.aoData[rowIdx]._aFilterData, initialFuzzy);
                }, false);
                fromPlugin = true;
                // Empty the datatables search and replace it with our own
                api.search('');
                input.val(fuzzySearchVal);
                fromPlugin = false;
            }
            fromPlugin = true;
            api.draw();
            fromPlugin = false;
        }
    };
    var apiRegister = DataTable.Api.register;
    apiRegister('search.fuzzy()', function (value) {
        if (value === undefined) {
            return fuzzySearchVal;
        }
        else {
            fuzzySearchVal = value.toLowerCase();
            searchVal = api.search();
            input.val(fuzzySearchVal);
            // For each row call the fuzzy search function to get result
            api.rows().iterator('row', function (settings, rowIdx) {
                settings.aoData[rowIdx]._fuzzySearch = fuzzySearch(fuzzySearchVal, settings.aoData[rowIdx]._aFilterData, initialFuzzy);
            }, false);
            // triggerSearchFunction({key: 'Enter'});
            return this;
        }
    });
    input.off();
    // Set listeners to occur on toggle and typing
    if (toggle) {
        // Highlights one of the buttons in the tooltip and un-highlights the other
        function highlightButton(toHighlight, event) {
            if (!toHighlight.attr('highlighted')) {
                toggleFuzzy(event);
            }
        }
        // Removes the tooltip element
        function removeToolTip() {
            tooltip.remove();
        }
        // Actions for the toggle button
        toggle
            .on('click', toggleFuzzy)
            .on('mouseenter', function () {
            tooltip.insertAfter(toggle).on('mouseleave', removeToolTip);
            tooltip.css('left', input.position().left + 3);
            exact.on('click', event => highlightButton(exact, event));
            fuzzy.on('click', event => highlightButton(fuzzy, event));
        })
            .on('mouseleave', removeToolTip);
        // Actions for the input element
        input
            .on('mouseenter', function () {
            tooltip.insertAfter(toggle).on('mouseleave', removeToolTip);
            tooltip.css('left', input.position().left + 3);
            exact.on('click', event => highlightButton(exact, event));
            fuzzy.on('click', event => highlightButton(fuzzy, event));
        })
            .on('mouseleave', function () {
            var inToolTip = false;
            tooltip.on('mouseenter', () => (inToolTip = true));
            toggle.on('mouseenter', () => (inToolTip = true));
            setTimeout(function () {
                if (!inToolTip) {
                    removeToolTip();
                }
            }, 250);
        });
        var state = api.state.loaded();
        api.on('stateSaveParams', function (e, settings, data) {
            data._fuzzySearch = {
                active: toggle.attr('blurred'),
                val: input.val(),
            };
        });
        if (state !== null && state._fuzzySearch !== undefined) {
            input.val(state._fuzzySearch.val);
            if (state._fuzzySearch.active === 'true') {
                toggle.click();
                api.page(state.start / state.length).draw('page');
            }
        }
    }
    api.on('search', function () {
        if (!fromPlugin) {
            input.val(api.search() !== searchVal ? api.search() : fuzzySearchVal);
        }
    });
    // Always add this event no matter if toggling is enabled
    input.on('input keydown', triggerSearchFunction);
});


return DataTable;
}));
