/*!
 * Ajax Bootstrap Select
 *
 * Extends existing [Bootstrap Select] implementations by adding the ability to search via AJAX requests as you type. Originally for CROSCON.
 *
 * @version 1.3.8
 * @author Adam Heim - https://github.com/truckingsim
 * @link https://github.com/truckingsim/Ajax-Bootstrap-Select
 * @copyright 2016 Adam Heim
 * @license Released under the MIT license.
 *
 * Contributors:
 *   Mark Carver - https://github.com/markcarver
 *
 * Last build: 2016-11-18 3:06:30 PM EST
 */
!(function ($) {
 /*!
     * Spanish translation for the "es-ES" and "es" language codes.
     * Diomedes Domínguez <diomedes.domimnguez@gmail.com>
     */
    $.fn.ajaxSelectPicker.locale["es-ES"] = {
        /**
         * @member $.fn.ajaxSelectPicker.locale
         * @cfg {String} currentlySelected = 'Currently Selected'
         * @markdown
         * El texto que se utilizará para la etiqueta del grupo de opciones cuando se conservan las opciones seleccionadas.
         */
        currentlySelected: "Seleccionado",

        /**
         * @member $.fn.ajaxSelectPicker.locale
         * @cfg {String} emptyTitle = 'Select and begin typing'
         * @markdown
         * El texto que se utilizará como título para el elemento de selección cuando no hay elementos para mostrar.
         */
        emptyTitle: "Seleccione y comience a escribir",

        /**
         * @member $.fn.ajaxSelectPicker.locale
         * @cfg {String} errorText = ''Unable to retrieve results'
         * @markdown
         * El texto que se utilizan en el contenedor de estado cuando una solicitud devuelve con un error.
         */
        errorText: "No se puede recuperar resultados",

        /**
         * @member $.fn.ajaxSelectPicker.locale
         * @cfg {String} searchPlaceholder = 'Search...'
         * @markdown
         * El texto que se utilizará para el atributo marcador de posición de entrada de búsqueda.
         */
        searchPlaceholder: "Buscar...",

        /**
         * @member $.fn.ajaxSelectPicker.locale
         * @cfg {String} statusInitialized = 'Start typing a search query'
         * @markdown
         * El texto utilizado en el contenedor de estado cuando se inicializa.
         */
        statusInitialized: "Empieza a escribir una consulta de búsqueda",

        /**
         * @member $.fn.ajaxSelectPicker.locale
         * @cfg {String} statusNoResults = 'No Results'
         * @markdown
         * El texto utilizado en el contenedor de estado cuando la solicitud no devolvió resultados.
         */
        statusNoResults: "Sin Resultados",

        /**
         * @member $.fn.ajaxSelectPicker.locale
         * @cfg {String} statusSearching = 'Searching...'
         * @markdown
         * El texto que se utilizan en el contenedor de estado cuando se está iniciando una solicitud.
         */
        statusSearching: "Buscando..."
    };
    $.fn.ajaxSelectPicker.locale.es = $.fn.ajaxSelectPicker.locale["es-ES"];
})(jQuery);
