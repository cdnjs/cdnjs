

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

DataTable.feature.register('inputPaging', function (settings, opts) {
    let api = new DataTable.Api(settings);
    let tags = stylingStructure(api);
    let options = Object.assign({
        firstLast: true,
        previousNext: true,
        pageOf: true
    }, opts);
    // Create the DOM elements for the paging control
    let wrapper = createElement(tags.wrapper);
    let first = createElement(tags.item, api.i18n('oPaginate.sFirst', '\u00AB'), () => api.page('first').draw(false));
    let previous = createElement(tags.item, api.i18n('oPaginate.sPrevious', '\u2039'), () => api.page('previous').draw(false));
    let next = createElement(tags.item, api.i18n('oPaginate.sNext', '\u203A'), () => api.page('next').draw(false));
    let last = createElement(tags.item, api.i18n('oPaginate.sLast', '\u00BB'), () => api.page('last').draw(false));
    let box = createElement(tags.inputItem);
    let input = createElement(tags.input);
    let of = createElement({ tag: 'span', className: '' });
    input.setAttribute('type', 'text');
    input.setAttribute('inputmode', 'numeric');
    input.setAttribute('pattern', '[0-9]*');
    // Assemble the DOM structure
    if (options.firstLast) {
        wrapper.appendChild(first);
    }
    if (options.previousNext) {
        wrapper.appendChild(previous);
    }
    wrapper.appendChild(box);
    if (options.previousNext) {
        wrapper.appendChild(next);
    }
    if (options.firstLast) {
        wrapper.appendChild(last);
    }
    box.appendChild(input);
    if (options.pageOf) {
        box.appendChild(of);
    }
    // Block characters other than numbers
    input.addEventListener('keypress', function (e) {
        if (e.charCode < 48 || e.charCode > 57) {
            e.preventDefault();
        }
    });
    // On new value, redraw the table
    input.addEventListener('input', function () {
        if (input.value) {
            api.page(input.value - 1).draw(false);
        }
        // Auto adjust the width so the content is visible
        input.style.width = (input.value.length + 2) + 'ch';
    });
    api.on('draw', () => {
        let info = api.page.info();
        // Update the classes for the "jump" buttons to show what is available
        setState(first, tags.item.disabled, info.page === 0);
        setState(previous, tags.item.disabled, info.page === 0);
        setState(next, tags.item.disabled, info.page === info.pages - 1);
        setState(last, tags.item.disabled, info.page === info.pages - 1);
        // Set the new page value into the input box
        if (input.value !== info.page + 1) {
            input.value = info.page + 1;
        }
        // Show how many pages there are
        of.textContent = ' / ' + info.pages;
    });
    return wrapper;
});
function setState(el, disabledClass, disabled) {
    el.classList.toggle(disabledClass, disabled);
    let a = el.querySelector('a');
    if (a) {
        if (disabled) {
            a.setAttribute('disabled', 'disabled');
        }
        else {
            a.removeAttribute('disabled');
        }
    }
}
/**
 * Get details about the DOM structure that input paging needs to build
 * @returns DOM information object
 */
function stylingStructure(api) {
    let container = api.table().container();
    let classList = container.classList;
    if (classList.contains('dt-bootstrap5') ||
        classList.contains('dt-bootstrap4') ||
        classList.contains('dt-bootstrap')) {
        return {
            wrapper: {
                tag: 'ul',
                className: 'dt-inputpaging pagination',
            },
            item: {
                tag: 'li',
                className: 'page-item',
                disabled: 'disabled',
                liner: {
                    tag: 'a',
                    className: 'page-link',
                }
            },
            inputItem: {
                tag: 'li',
                className: 'page-item dt-paging-input'
            },
            input: {
                tag: 'input',
                className: '',
            }
        };
    }
    else if (classList.contains('dt-bulma')) {
        return {
            wrapper: {
                tag: 'ul',
                className: 'dt-inputpaging pagination-list',
            },
            item: {
                tag: 'li',
                className: '',
                disabled: 'disabled',
                liner: {
                    tag: 'a',
                    className: 'pagination-link',
                }
            },
            inputItem: {
                tag: 'li',
                className: 'dt-paging-input'
            },
            input: {
                tag: 'input',
                className: '',
            }
        };
    }
    else if (classList.contains('dt-foundation')) {
        return {
            wrapper: {
                tag: 'ul',
                className: 'dt-inputpaging pagination',
            },
            item: {
                tag: 'li',
                className: '',
                disabled: 'disabled',
                liner: {
                    tag: 'a',
                    className: '',
                }
            },
            inputItem: {
                tag: 'li',
                className: 'dt-paging-input'
            },
            input: {
                tag: 'input',
                className: '',
            }
        };
    }
    else if (classList.contains('dt-semanticUI')) {
        return {
            wrapper: {
                tag: 'div',
                className: 'dt-inputpaging ui unstackable pagination menu',
            },
            item: {
                tag: 'a',
                className: 'page-link item',
                disabled: 'disabled'
            },
            inputItem: {
                tag: 'div',
                className: 'dt-paging-input'
            },
            input: {
                tag: 'input',
                className: 'ui input',
            }
        };
    }
    return {
        wrapper: {
            tag: 'div',
            className: 'dt-inputpaging dt-paging',
        },
        item: {
            tag: 'button',
            className: 'dt-paging-button',
            disabled: 'disabled',
        },
        inputItem: {
            tag: 'div',
            className: 'dt-paging-input',
            liner: {
                tag: '',
                className: ''
            }
        },
        input: {
            tag: 'input',
            className: '',
        }
    };
}
/**
 * Create a new element
 *
 * @param opts Tag and class name
 * @param text Text to show in the element
 * @param fn Click event handler
 * @returns Element
 */
function createElement(opts, text, fn) {
    let el = document.createElement(opts.tag);
    el.className = opts.className;
    if (opts.liner && opts.liner.tag) {
        let liner = createElement(opts.liner, text);
        el.appendChild(liner);
    }
    else {
        // Bottom nesting level
        if (text) {
            el.textContent = text;
        }
    }
    // Top level only
    if (fn) {
        el.addEventListener('click', fn);
    }
    return el;
}


return DataTable;
}));
