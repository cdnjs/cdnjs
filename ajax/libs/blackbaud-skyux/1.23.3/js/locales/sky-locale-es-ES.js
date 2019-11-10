/*jshint unused: false */
/*global angular */

(function () {
'use strict';

var bbResourcesOverrides;

bbResourcesOverrides = {"action_bar_actions":"Acciones","alert_close":"Cerrar","autonumeric_abbr_billions":"b","autonumeric_abbr_millions":"m","autonumeric_abbr_thousands":"k","avatar_error_not_image_description":"Elija un archivo que sea una imagen válida.","avatar_error_not_image_title":"El archivo no es una imagen.","avatar_error_too_large_description":"Elija una imagen que tenga menos de {0}.","avatar_error_too_large_title":"El archivo es demasiado grande.","card_select":"Seleccionar tarjeta","carousel_button_label_next":"Ir al siguiente elemento","carousel_button_label_previous":"Ir al elemento anterior","carousel_dot_label":"Ir al elemento {0}","checklist_categories_label":"Categorías","checklist_check_title":"Seleccionar un elemento","checklist_clear_all":"Borrar todo","checklist_no_items":"Ningún elemento encontrado","checklist_only_selected_items":"Solo mostrar los elementos seleccionados","checklist_search_label":"Buscar","checklist_select_all":"Seleccionar todo","chevron_collapse":"Colapsar","chevron_expand":"Expandir","context_menu_default_label":"Menú de contexto","date_field_invalid_date_message":"Introduzca una fecha válida","date_range_picker_at_any_time":"En cualquier momento","date_range_picker_filter_description_at_any_time":"{0} en cualquier momento","date_range_picker_filter_description_last_calendar_year":"{0} del último año calendario","date_range_picker_filter_description_last_fiscal_year":"{0} del último año fiscal","date_range_picker_filter_description_last_month":"{0} del mes anterior","date_range_picker_filter_description_last_quarter":"{0} del último trimestre","date_range_picker_filter_description_last_week":"{0} de la semana anterior","date_range_picker_filter_description_next_calendar_year":"{0} del próximo año calendario","date_range_picker_filter_description_next_fiscal_year":"{0} del próximo año fiscal","date_range_picker_filter_description_next_month":"{0} del próximo mes","date_range_picker_filter_description_next_quarter":"{0} del próximo trimestre","date_range_picker_filter_description_next_week":"{0} de la próxima semana","date_range_picker_filter_description_specific_range":"{0} de {1} a {2}","date_range_picker_filter_description_this_calendar_year":"{0} de este año calendario","date_range_picker_filter_description_this_fiscal_year":"{0} de este año fiscal","date_range_picker_filter_description_this_month":"{0} de este mes","date_range_picker_filter_description_this_quarter":"{0} de este trimestre","date_range_picker_filter_description_this_week":"{0} de esta semana","date_range_picker_filter_description_today":"{0} de hoy","date_range_picker_filter_description_tomorrow":"{0} de mañana","date_range_picker_filter_description_yesterday":"{0} de ayer","date_range_picker_from_date":"Fecha desde","date_range_picker_last_calendar_year":"Último año calendario","date_range_picker_last_fiscal_year":"Último año fiscal","date_range_picker_last_month":"Mes anterior","date_range_picker_last_quarter":"Último trimestre","date_range_picker_last_week":"Semana anterior","date_range_picker_max_date_error":"La fecha de inicio debe ser anterior a la fecha de fin","date_range_picker_min_date_error":"La fecha de fin debe ser posterior a la fecha de inicio","date_range_picker_next_calendar_year":"Próximo año calendario","date_range_picker_next_fiscal_year":"Próximo año fiscal","date_range_picker_next_month":"Próximo mes","date_range_picker_next_quarter":"Próximo trimestre","date_range_picker_next_week":"Próxima semana","date_range_picker_specific_range":"Rango específico","date_range_picker_this_calendar_year":"Este año calendario","date_range_picker_this_fiscal_year":"Este año fiscal","date_range_picker_this_month":"Este mes","date_range_picker_this_quarter":"Este trimestre","date_range_picker_this_week":"Esta semana","date_range_picker_to_date":"Fecha hasta","date_range_picker_today":"Hoy","date_range_picker_tomorrow":"Mañana","date_range_picker_yesterday":"Ayer","datepicker_clear":"Borrar","datepicker_close":"Listo","datepicker_open":"Abrir calendario","datepicker_today":"Hoy","definition_list_none_found":"No se encontró nada","error_description_broken":"Intente actualizar esta página o regrese más tarde.","error_description_construction":"¡Gracias por su paciencia mientras realizamos mejoras!\nPor favor vuelva a intentarlo más tarde.","error_title_broken":"Lo sentimos, ocurrió un error.","error_title_construction":"Esta página estará disponible nuevamente en breve.","error_title_notfound":"Lo sentimos, no podemos encontrar esa página.","errormodal_ok":"Aceptar","file_item_delete":"Borrar un archivo","file_size_b_plural":"{0} bytes","file_size_b_singular":"{0} byte","file_size_gb":"{0} GB","file_size_kb":"{0} KB","file_size_mb":"{0} MB","file_upload_drag_file_here":"Arrastre un archivo aquí","file_upload_drag_or_click":"Arrastre un archivo aquí o haga clic en Buscar","file_upload_drop_files_here":"Suelte los archivos aquí","file_upload_invalid_file":"Este tipo de archivo no es válido","file_upload_link_input":"Agregar un enlace a un archivo","file_upload_link_placeholder":"http://www.something.com/file","file_upload_or_click_to_browse":"o haga clic en Buscar","file_upload_paste_link":"Pegue el enlace de un archivo","file_upload_paste_link_done":"Listo","filter_button_title":"Filtros","filter_modal_apply":"Aplicar filtros","filter_modal_clear":"Borrar todos los filtros","filter_summary_close":"Cerrar","filter_summary_header":"Filtro","grid_action_bar_cancel_mobile_actions":"Cancelar","grid_action_bar_choose_action":"Elegir una acción","grid_action_bar_clear_selection":"Borrar selección","grid_back_to_top":"Regresar arriba","grid_column_picker_all_categories":"Todas las categorías","grid_column_picker_description_header":"Descripción","grid_column_picker_header":"Elegir columnas para mostrar en la lista","grid_column_picker_name_header":"Columna","grid_column_picker_search_no_columns":"Ninguna columna encontrada","grid_column_picker_search_placeholder":"Buscar por nombre","grid_column_picker_submit":"Aplicar cambios","grid_columns_button":" Elegir columnas","grid_filters_apply":"Aplicar filtros","grid_filters_button":"Filtros","grid_filters_clear":"Borrar","grid_filters_header":"Filtro","grid_filters_hide":"Ocultar","grid_filters_summary_header":"Filtro:","grid_load_more":"Cargar más","grid_search_placeholder":"Buscar en esta lista","help_button_label":"Abrir ayuda","infinite_scroll_load_more":"Cargar más","listbuilder_add_title":"Agregar","listbuilder_card_switcher":"Cambiar a vista de tarjetas","listbuilder_footer_back_to_top":"Regresar arriba","listbuilder_grid_switcher":"Pasar a vista de cuadrícula","listbuilder_multiselect_clear_all":"Borrar todo","listbuilder_multiselect_select_all":"Seleccionar todo","listbuilder_pick_columns":"Elegir columnas","listbuilder_repeater_switcher":"Cambiar a vista de repetidor","listbuilder_show_only_selected":"Mostrar solo las selecciones","listbuilder_show_secondary_actions":"Mostrar acciones secundarias","modal_close":"Ignorar diálogo","modal_footer_cancel_button":"Cancelar","modal_footer_primary_button":"Guardar","month_short_april":"Abr.","month_short_august":"Agos.","month_short_december":"Dic.","month_short_february":"Feb.","month_short_january":"Ene.","month_short_july":"Jul.","month_short_june":"Jun.","month_short_march":"Mar.","month_short_may":"Mayo","month_short_november":"Nov.","month_short_october":"Oct.","month_short_september":"Sep.","page_noaccess_button":"Regresar a una página no clasificada","page_noaccess_description":"Lo sentimos, no tiene los derechos necesarios para esta página.\nSi cree que debería tenerlos, contacte a su administrador del sistema.","page_noaccess_header":"Siga adelante, no hay nada para ver aquí","pagination_next":"Siguiente","pagination_previous":"Anterior","reorder_top":"Arriba","search_dismiss":"Ignorar búsqueda","search_label":"Buscar elementos","search_open":"Abrir búsqueda","search_placeholder":"Buscar en esta lista","searchfield_no_records":"Lo sentimos, no se encontraron coincidencias","searchfield_searching":"Buscando...","selectfield_remove":"Eliminar","selectfield_summary_text":"{0} elementos seleccionados","selectfieldpicker_clear":"Borrar selección","selectfieldpicker_select":"Seleccionar","selectfieldpicker_select_value":"Seleccionar un valor","selectfieldpicker_select_values":"Seleccionar valores","sort_button_label":"Clasificar","sort_menu_heading":"Clasificar por","summary_actionbar_hide_summary":"Ocultar resumen","summary_actionbar_open_secondary":"Mostrar acciones secundarias","summary_actionbar_show_summary":"Mostrar resumen","tab_add":"Agregar pestaña","tab_open":"Abrir","text_expand_close_text":"Cerrar","text_expand_modal_title":"Expandir vista","text_expand_see_less":"Ver menos","text_expand_see_more":"Ver más","tile_chevron_label":"Expandir o colapsar","wizard_navigator_finish":"Finalizar","wizard_navigator_next":"Siguiente","wizard_navigator_previous":"Anterior"};

angular.module('sky.resources')
    .config(['bbResources', function (bbResources) {
        angular.extend(bbResources, bbResourcesOverrides);
    }]);
}());

//! moment.js locale configuration
//! locale : spanish (es)
//! author : Julio Napurí : https://github.com/julionc

;(function (global, factory) {
   typeof exports === 'object' && typeof module !== 'undefined'
       && typeof require === 'function' ? factory(require('../moment')) :
   typeof define === 'function' && define.amd ? define(['moment'], factory) :
   factory(global.moment)
}(this, function (moment) { 'use strict';


    var monthsShortDot = 'ene._feb._mar._abr._may._jun._jul._ago._sep._oct._nov._dic.'.split('_'),
        monthsShort = 'ene_feb_mar_abr_may_jun_jul_ago_sep_oct_nov_dic'.split('_');

    var es = moment.defineLocale('es', {
        months : 'enero_febrero_marzo_abril_mayo_junio_julio_agosto_septiembre_octubre_noviembre_diciembre'.split('_'),
        monthsShort : function (m, format) {
            if (/-MMM-/.test(format)) {
                return monthsShort[m.month()];
            } else {
                return monthsShortDot[m.month()];
            }
        },
        weekdays : 'domingo_lunes_martes_miércoles_jueves_viernes_sábado'.split('_'),
        weekdaysShort : 'dom._lun._mar._mié._jue._vie._sáb.'.split('_'),
        weekdaysMin : 'do_lu_ma_mi_ju_vi_sá'.split('_'),
        longDateFormat : {
            LT : 'H:mm',
            LTS : 'H:mm:ss',
            L : 'DD/MM/YYYY',
            LL : 'D [de] MMMM [de] YYYY',
            LLL : 'D [de] MMMM [de] YYYY H:mm',
            LLLL : 'dddd, D [de] MMMM [de] YYYY H:mm'
        },
        calendar : {
            sameDay : function () {
                return '[hoy a la' + ((this.hours() !== 1) ? 's' : '') + '] LT';
            },
            nextDay : function () {
                return '[mañana a la' + ((this.hours() !== 1) ? 's' : '') + '] LT';
            },
            nextWeek : function () {
                return 'dddd [a la' + ((this.hours() !== 1) ? 's' : '') + '] LT';
            },
            lastDay : function () {
                return '[ayer a la' + ((this.hours() !== 1) ? 's' : '') + '] LT';
            },
            lastWeek : function () {
                return '[el] dddd [pasado a la' + ((this.hours() !== 1) ? 's' : '') + '] LT';
            },
            sameElse : 'L'
        },
        relativeTime : {
            future : 'en %s',
            past : 'hace %s',
            s : 'unos segundos',
            m : 'un minuto',
            mm : '%d minutos',
            h : 'una hora',
            hh : '%d horas',
            d : 'un día',
            dd : '%d días',
            M : 'un mes',
            MM : '%d meses',
            y : 'un año',
            yy : '%d años'
        },
        ordinalParse : /\d{1,2}º/,
        ordinal : '%dº',
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 4  // The week that contains Jan 4th is the first week of the year.
        }
    });

    return es;

}));
moment.locale('es');