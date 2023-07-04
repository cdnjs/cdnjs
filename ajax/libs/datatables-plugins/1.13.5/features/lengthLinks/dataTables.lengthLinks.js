/*! © SpryMedia Ltd - datatables.net/license */

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
}(function( $, window, document, undefined ) {
'use strict';
var DataTable = $.fn.dataTable;


/**
 * @summary     LengthLinks
 * @description Page length control via links for DataTables
 * @version     1.2.0
 * @author      Allan Jardine
 *
 * This feature plug-in for DataTables adds page length control links to the
 * DataTable. The `dom` option can be used to insert the control using the `L`
 * character option and it uses the `lengthMenu` options of DataTables to
 * determine what to display.
 *
 * @example
 *   $('#myTable').DataTable( {
 *     dom: 'Lfrtip'
 *   } );
 *
 * @example
 *   $('#myTable').DataTable( {
 *     lengthMenu: [ [10, 25, 50, -1], [10, 25, 50, "All"] ]
 *     dom: 'Lfrtip'
 *   } );
 */
DataTable.LengthLinks = function (inst) {
    var api = new DataTable.Api(inst);
    var settings = api.settings()[0];
    var container = $('<div></div>').addClass(settings.oClasses.sLength);
    var lastLength = null;
    // API so the feature wrapper can return the node to insert
    this.container = function () {
        return container[0];
    };
    // Listen for events to change the page length
    container.on('click.dtll', 'a', function (e) {
        e.preventDefault();
        api.page.len($(this).data('length') * 1).draw(false);
    });
    // Update on each draw
    api.on('draw', function () {
        // No point in updating - nothing has changed
        if (api.page.len() === lastLength) {
            return;
        }
        var menu = settings.aLengthMenu;
        var lang = menu.length === 2 && Array.isArray(menu[0]) ? menu[1] : menu;
        var lens = menu.length === 2 && Array.isArray(menu[0]) ? menu[0] : menu;
        var out = $.map(lens, function (el, i) {
            return el == api.page.len()
                ? '<a class="active" data-length="' + lens[i] + '">' + lang[i] + '</a>'
                : '<a data-length="' + lens[i] + '">' + lang[i] + '</a>';
        });
        container.html(settings.oLanguage.sLengthMenu.replace('_MENU_', out.join(' | ')));
        lastLength = api.page.len();
    });
    api.on('destroy', function () {
        container.off('click.dtll', 'a');
    });
};
// Subscribe the feature plug-in to DataTables, ready for use
DataTable.ext.feature.push({
    fnInit: function (settings) {
        var l = new DataTable.LengthLinks(settings);
        return l.container();
    },
    cFeature: 'L',
    sFeature: 'LengthLinks',
});


return DataTable;
}));
