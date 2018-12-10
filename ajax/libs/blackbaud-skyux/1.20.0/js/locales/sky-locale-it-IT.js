/*jshint unused: false */
/*global angular */

(function () {
'use strict';

var bbResourcesOverrides;

bbResourcesOverrides = {"action_bar_actions":"Azioni","alert_close":"Chiudi","autonumeric_abbr_billions":"b","autonumeric_abbr_millions":"m","autonumeric_abbr_thousands":"k","avatar_error_not_image_description":"Scegliere un file immagine valido.","avatar_error_not_image_title":"Il file non è un’immagine.","avatar_error_too_large_description":"Scegliere un’immagine inferiore a {0}.","avatar_error_too_large_title":"Il file è troppo grande.","card_select":"Seleziona scheda","carousel_button_label_next":"Vai all’elemento successivo","carousel_button_label_previous":"Vai all’elemento precedente","carousel_dot_label":"Vai all’elemento {0}","checklist_categories_label":"Categorie","checklist_check_title":"Seleziona elemento","checklist_clear_all":"Annulla tutto","checklist_no_items":"Nessun elemento trovato","checklist_only_selected_items":"Mostra solo gli elementi selezionati","checklist_search_label":"Ricerca","checklist_select_all":"Seleziona tutto","chevron_collapse":"Comprimi","chevron_expand":"Espandi","context_menu_default_label":"Menu di scelta rapida","date_field_invalid_date_message":"Inserire una data valida","date_range_picker_at_any_time":"In qualunque momento","date_range_picker_filter_description_at_any_time":"{0} in qualunque momento","date_range_picker_filter_description_last_calendar_year":"{0} dallo scorso anno calendario","date_range_picker_filter_description_last_fiscal_year":"{0} dallo scorso anno fiscale","date_range_picker_filter_description_last_month":"{0} dallo scorso mese","date_range_picker_filter_description_last_quarter":"{0} dall’ultimo trimestre","date_range_picker_filter_description_last_week":"{0} dalla scorsa settimana","date_range_picker_filter_description_next_calendar_year":"{0} per il prossimo anno calendario","date_range_picker_filter_description_next_fiscal_year":"{0} per il prossimo anno fiscale","date_range_picker_filter_description_next_month":"{0} per il prossimo mese","date_range_picker_filter_description_next_quarter":"{0} per il prossimo trimestre","date_range_picker_filter_description_next_week":"{0} per la prossima settimana","date_range_picker_filter_description_specific_range":"{0} da {1} a {2}","date_range_picker_filter_description_this_calendar_year":"{0} per questo anno calendario","date_range_picker_filter_description_this_fiscal_year":"{0} per questo anno fiscale","date_range_picker_filter_description_this_month":"{0} per questo mese","date_range_picker_filter_description_this_quarter":"{0} per questo trimestre","date_range_picker_filter_description_this_week":"{0} per questa settimana","date_range_picker_filter_description_today":"{0} per oggi","date_range_picker_filter_description_tomorrow":"{0} per domani","date_range_picker_filter_description_yesterday":"{0} da ieri","date_range_picker_from_date":"Dalla data","date_range_picker_last_calendar_year":"Scorso anno calendario","date_range_picker_last_fiscal_year":"Scorso anno fiscale","date_range_picker_last_month":"Scorso mese","date_range_picker_last_quarter":"Scorso trimestre","date_range_picker_last_week":"Settimana scorsa","date_range_picker_max_date_error":"La data iniziale deve essere anteriore alla data finale","date_range_picker_min_date_error":"La data finale deve essere posteriore alla data iniziale","date_range_picker_next_calendar_year":"Prossimo anno calendario","date_range_picker_next_fiscal_year":"Prossimo anno fiscale","date_range_picker_next_month":"Prossimo mese","date_range_picker_next_quarter":"Prossimo trimestre","date_range_picker_next_week":"Prossima settimana","date_range_picker_specific_range":"Specifica intervallo","date_range_picker_this_calendar_year":"Questo anno calendario","date_range_picker_this_fiscal_year":"Questo anno fiscale","date_range_picker_this_month":"Questo mese","date_range_picker_this_quarter":"Questo trimestre","date_range_picker_this_week":"Questa settimana","date_range_picker_to_date":"Alla data","date_range_picker_today":"Oggi","date_range_picker_tomorrow":"Domani","date_range_picker_yesterday":"Ieri","datepicker_clear":"Cancella","datepicker_close":"Fine","datepicker_open":"Apri Selezione data","datepicker_today":"Oggi","definition_list_none_found":"Nessuna rispondenza trovata","error_description_broken":"Provare ad aggiornare la pagina o riprovare più tardi.","error_description_construction":"Stiamo apportando dei miglioramenti!\nRitornare fra un po’ di tempo.","error_title_broken":"Si è verificato un errore.","error_title_construction":"Questa pagina tornerà presto disponibile.","error_title_notfound":"Impossibile raggiungere quella pagina.","errormodal_ok":"OK","file_item_delete":"Elimina file","file_size_b_plural":"{0} byte","file_size_b_singular":"{0} byte","file_size_gb":"{0} GB","file_size_kb":"{0} KB","file_size_mb":"{0} MB","file_upload_drag_file_here":"Trascina qui il file","file_upload_drag_or_click":"Trascina qui il file o fai clic per sfogliare","file_upload_drop_files_here":"Rilascia i file qui","file_upload_invalid_file":"Questo tipo di file non è valido","file_upload_link_input":"Aggiungi un link a un file","file_upload_link_placeholder":"http://www.something.com/file","file_upload_or_click_to_browse":"o fai clic per sfogliare","file_upload_paste_link":"Incolla un link in un file","file_upload_paste_link_done":"Fine","filter_button_title":"Filtri","filter_modal_apply":"Applica filtri","filter_modal_clear":"Cancella tutti i filtri","filter_summary_close":"Chiudi","filter_summary_header":"Filtro","grid_action_bar_cancel_mobile_actions":"Annulla","grid_action_bar_choose_action":"Scegliere un’azione","grid_action_bar_clear_selection":"Cancella selezione","grid_back_to_top":"Torna su","grid_column_picker_all_categories":"Tutte le categorie","grid_column_picker_description_header":"Descrizione","grid_column_picker_header":"Scegliere le colonne da mostrare nell’elenco","grid_column_picker_name_header":"Colonna","grid_column_picker_search_no_columns":"Nessuna colonna trovata","grid_column_picker_search_placeholder":"Ricerca per nome","grid_column_picker_submit":"Applica modifiche","grid_columns_button":" Scegli colonne","grid_filters_apply":"Applica filtri","grid_filters_button":"Filtri","grid_filters_clear":"Cancella","grid_filters_header":"Filtro","grid_filters_hide":"Nascondi","grid_filters_summary_header":"Filtro:","grid_load_more":"Carica altro","grid_search_placeholder":"Trova in questo elenco","help_button_label":"Apri Guida","infinite_scroll_load_more":"Carica altro","listbuilder_add_title":"Aggiungi","listbuilder_card_switcher":"Passa alla vista scheda","listbuilder_footer_back_to_top":"Torna su","listbuilder_grid_switcher":"Passa alla vista griglia","listbuilder_multiselect_clear_all":"Annulla tutto","listbuilder_multiselect_select_all":"Seleziona tutto","listbuilder_pick_columns":"Scegli colonne","listbuilder_repeater_switcher":"Passa alla vista ripetitore","listbuilder_show_only_selected":"Mostra solo selezionati","listbuilder_show_secondary_actions":"Mostra azioni secondarie","modal_close":"Chiudi finestra modale","modal_footer_cancel_button":"Annulla","modal_footer_primary_button":"Salva","month_short_april":"Apr","month_short_august":"Ago","month_short_december":"Dic","month_short_february":"Feb","month_short_january":"Gen","month_short_july":"Lug","month_short_june":"Giu","month_short_march":"Mar","month_short_may":"Mag","month_short_november":"Nov","month_short_october":"Ott","month_short_september":"Set","page_noaccess_button":"Torna a una pagina non classificata","page_noaccess_description":"Spiacenti, non si possiedono i diritti per questa pagina.\nSe si pensa di possedere i diritti, contattare l’amministratore del sistema.","page_noaccess_header":"Procedere, qui non c’è nulla da vedere","pagination_next":"Avanti","pagination_previous":"Precedente","reorder_top":"In alto","search_dismiss":"Ignora ricerca","search_label":"Ricerca elementi","search_open":"Apri ricerca","search_placeholder":"Trova in questo elenco","searchfield_no_records":"Non è stato trovato nessun record corrispondente","searchfield_searching":"Ricerca in corso...","selectfield_remove":"Rimuovi","selectfield_summary_text":"{0} elementi selezionati","selectfieldpicker_clear":"Cancella selezione","selectfieldpicker_select":"Seleziona","selectfieldpicker_select_value":"Seleziona valore","selectfieldpicker_select_values":"Seleziona valori","sort_button_label":"Elenca","sort_menu_heading":"Elenca per","summary_actionbar_hide_summary":"Nascondi riepilogo","summary_actionbar_open_secondary":"Mostra azioni secondarie","summary_actionbar_show_summary":"Mostra riepilogo","tab_add":"Aggiungi scheda","tab_open":"Apri","text_expand_close_text":"Chiudi","text_expand_modal_title":"Visualizzazione espansa","text_expand_see_less":"Mostra meno elementi","text_expand_see_more":"Mostra più elementi","tile_chevron_label":"Espandi o riduci","wizard_navigator_finish":"Fine","wizard_navigator_next":"Avanti","wizard_navigator_previous":"Precedente"};

angular.module('sky.resources')
    .config(['bbResources', function (bbResources) {
        angular.extend(bbResources, bbResourcesOverrides);
    }]);
}());

//! moment.js locale configuration
//! locale : italian (it)
//! author : Lorenzo : https://github.com/aliem
//! author: Mattia Larentis: https://github.com/nostalgiaz

;(function (global, factory) {
   typeof exports === 'object' && typeof module !== 'undefined'
       && typeof require === 'function' ? factory(require('../moment')) :
   typeof define === 'function' && define.amd ? define(['moment'], factory) :
   factory(global.moment)
}(this, function (moment) { 'use strict';


    var it = moment.defineLocale('it', {
        months : 'gennaio_febbraio_marzo_aprile_maggio_giugno_luglio_agosto_settembre_ottobre_novembre_dicembre'.split('_'),
        monthsShort : 'gen_feb_mar_apr_mag_giu_lug_ago_set_ott_nov_dic'.split('_'),
        weekdays : 'Domenica_Lunedì_Martedì_Mercoledì_Giovedì_Venerdì_Sabato'.split('_'),
        weekdaysShort : 'Dom_Lun_Mar_Mer_Gio_Ven_Sab'.split('_'),
        weekdaysMin : 'Do_Lu_Ma_Me_Gi_Ve_Sa'.split('_'),
        longDateFormat : {
            LT : 'HH:mm',
            LTS : 'HH:mm:ss',
            L : 'DD/MM/YYYY',
            LL : 'D MMMM YYYY',
            LLL : 'D MMMM YYYY HH:mm',
            LLLL : 'dddd, D MMMM YYYY HH:mm'
        },
        calendar : {
            sameDay: '[Oggi alle] LT',
            nextDay: '[Domani alle] LT',
            nextWeek: 'dddd [alle] LT',
            lastDay: '[Ieri alle] LT',
            lastWeek: function () {
                switch (this.day()) {
                    case 0:
                        return '[la scorsa] dddd [alle] LT';
                    default:
                        return '[lo scorso] dddd [alle] LT';
                }
            },
            sameElse: 'L'
        },
        relativeTime : {
            future : function (s) {
                return ((/^[0-9].+$/).test(s) ? 'tra' : 'in') + ' ' + s;
            },
            past : '%s fa',
            s : 'alcuni secondi',
            m : 'un minuto',
            mm : '%d minuti',
            h : 'un\'ora',
            hh : '%d ore',
            d : 'un giorno',
            dd : '%d giorni',
            M : 'un mese',
            MM : '%d mesi',
            y : 'un anno',
            yy : '%d anni'
        },
        ordinalParse : /\d{1,2}º/,
        ordinal: '%dº',
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 4  // The week that contains Jan 4th is the first week of the year.
        }
    });

    return it;

}));
moment.locale('it');