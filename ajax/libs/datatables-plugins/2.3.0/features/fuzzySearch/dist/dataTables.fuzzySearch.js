/*!
 * Fuzzy Search for DataTables
 * SpryMedia Ltd - datatables.net/license MIT license
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

		if (typeof window === 'undefined') {
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
}(function( $, window, document ) {
'use strict';
var DataTable = $.fn.dataTable;


DataTable.ext.search.push(function (settings, data, dataIndex) {
    var initial = settings.oInit.fuzzySearch;
    if (!initial) {
        return true;
    }
    if (settings.aoData[dataIndex]) {
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
    if (typeof initialFuzzy === 'object' && initialFuzzy.columns) {
        initialFuzzy.columns = api.columns(initialFuzzy.columns).indexes().toArray();
    }
    var fromPlugin = false;
    // Find the input element
    var input = $('div.dt-search input', api.table().container());
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
    if (initialFuzzy === true || initialFuzzy.toggleSmart) {
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
