/*jshint unused: false */
/*global angular */

(function () {
'use strict';

var bbResourcesOverrides;

bbResourcesOverrides = {"action_bar_actions":"Actions","alert_close":"Fermer","autonumeric_abbr_billions":"m","autonumeric_abbr_millions":"m","autonumeric_abbr_thousands":"m","avatar_error_not_image_description":"Veuillez choisir un fichier qui est une image valide.","avatar_error_not_image_title":"Le fichier n'est pas une image.","avatar_error_too_large_description":"Veuillez choisir une image qui est inférieure à {0}.","avatar_error_too_large_title":"Le fichier est trop volumineux.","card_select":"Sélectionner la carte","carousel_button_label_next":"Passer à l'élément suivant","carousel_button_label_previous":"Passer à l'élément précédent","carousel_dot_label":"Passer à l'élément {0}","checklist_categories_label":"Catégories","checklist_check_title":"Sélectionner un élément","checklist_clear_all":"Tout effacer","checklist_no_items":"Aucun élément trouvé","checklist_only_selected_items":"Afficher uniquement les éléments sélectionnés","checklist_search_label":"Rechercher","checklist_select_all":"Tout sélectionner","chevron_collapse":"Réduire","chevron_expand":"Développer","context_menu_default_label":"Menu contextuel","date_field_invalid_date_message":"Saisissez une date valide","date_range_picker_at_any_time":"À tout moment","date_range_picker_filter_description_at_any_time":"{0} à tout moment","date_range_picker_filter_description_last_calendar_year":"{0} de la dernière année civile","date_range_picker_filter_description_last_fiscal_year":"{0} de la dernière année fiscale","date_range_picker_filter_description_last_month":"{0} du mois dernier","date_range_picker_filter_description_last_quarter":"{0} du dernier trimestre","date_range_picker_filter_description_last_week":"{0} de la semaine dernière","date_range_picker_filter_description_next_calendar_year":"{0} pour la prochaine année civile","date_range_picker_filter_description_next_fiscal_year":"{0} pour l'année fiscale à venir","date_range_picker_filter_description_next_month":"{0} pour le mois à venir","date_range_picker_filter_description_next_quarter":"{0} pour le trimestre à venir","date_range_picker_filter_description_next_week":"{0} pour la semaine prochaine","date_range_picker_filter_description_specific_range":"{0} de {1} à {2}","date_range_picker_filter_description_this_calendar_year":"{0} pour cette année civile","date_range_picker_filter_description_this_fiscal_year":"{0} pour cette année fiscale","date_range_picker_filter_description_this_month":"{0} pour ce mois","date_range_picker_filter_description_this_quarter":"{0} pour ce trimestre","date_range_picker_filter_description_this_week":"{0} pour cette semaine","date_range_picker_filter_description_today":"{0} pour aujourd'hui","date_range_picker_filter_description_tomorrow":"{0} pour demain","date_range_picker_filter_description_yesterday":"{0} d'hier","date_range_picker_from_date":"À partir de la date","date_range_picker_last_calendar_year":"Dernière année civile","date_range_picker_last_fiscal_year":"Dernière année fiscale","date_range_picker_last_month":"Mois dernier","date_range_picker_last_quarter":"Trimestre dernier","date_range_picker_last_week":"Semaine dernière","date_range_picker_max_date_error":"La date de début doit être antérieure à la date de fin","date_range_picker_min_date_error":"La date de fin doit être postérieure à la date de début","date_range_picker_next_calendar_year":"Année civile suivante","date_range_picker_next_fiscal_year":"Année fiscale suivante","date_range_picker_next_month":"Mois suivant","date_range_picker_next_quarter":"Trimestre suivant","date_range_picker_next_week":"Semaine suivante","date_range_picker_specific_range":"Plage spécifique","date_range_picker_this_calendar_year":"Cette année civile","date_range_picker_this_fiscal_year":"Cette année fiscale","date_range_picker_this_month":"Ce mois","date_range_picker_this_quarter":"Ce trimestre","date_range_picker_this_week":"Cette semaine","date_range_picker_to_date":"À ce jour","date_range_picker_today":"Aujourd'hui","date_range_picker_tomorrow":"Demain","date_range_picker_yesterday":"Hier","datepicker_clear":"Effacer","datepicker_close":"Terminé","datepicker_open":"Ouvrir le sélecteur de date","datepicker_today":"Aujourd'hui","definition_list_none_found":"Aucun trouvé","error_description_broken":"Essayez d'actualiser cette page ou revenez plus tard.","error_description_construction":"Merci de votre patience pendant que nous procédons à des améliorations.\nVeuillez réessayer un peu plus tard.","error_title_broken":"Désolé, un problème est survenu.","error_title_construction":"Cette page sera bientôt à nouveau disponible.","error_title_notfound":"Désolé, nous ne pouvons pas afficher cette page.","errormodal_ok":"OK","file_item_delete":"Supprimer le fichier","file_size_b_plural":"{0} octets","file_size_b_singular":"{0} octet","file_size_gb":"{0} Go","file_size_kb":"{0} Ko","file_size_mb":"{0} Mo","file_upload_drag_file_here":"Faites glisser un fichier jusqu'ici","file_upload_drag_or_click":"Glissez un fichier ici ou cliquez pour parcourir","file_upload_drop_files_here":"Déposez des fichiers ici","file_upload_invalid_file":"Ce type de fichier n'est pas valide","file_upload_link_input":"Ajouter un lien à un fichier","file_upload_link_placeholder":"http://www.something.com/file","file_upload_or_click_to_browse":"ou cliquez pour parcourir","file_upload_paste_link":"Coller un lien dans un fichier","file_upload_paste_link_done":"Terminé","filter_button_title":"Filtres","filter_modal_apply":"Appliquer les filtres","filter_modal_clear":"Effacer tous les filtres","filter_summary_close":"Fermer","filter_summary_header":"Filtre","grid_action_bar_cancel_mobile_actions":"Annuler","grid_action_bar_choose_action":"Choisir une action","grid_action_bar_clear_selection":"Effacer la sélection","grid_back_to_top":"Retour au début","grid_column_picker_all_categories":"Toutes les catégories","grid_column_picker_description_header":"Description","grid_column_picker_header":"Choisir les colonnes à afficher dans la liste","grid_column_picker_name_header":"Colonne","grid_column_picker_search_no_columns":"Aucune colonne trouvée","grid_column_picker_search_placeholder":"Rechercher par nom","grid_column_picker_submit":"Appliquer les modifications","grid_columns_button":" Choisir les colonnes","grid_filters_apply":"Appliquer les filtres","grid_filters_button":"Filtres","grid_filters_clear":"Effacer","grid_filters_header":"Filtre","grid_filters_hide":"Masquer","grid_filters_summary_header":"Filtre :","grid_load_more":"Charger plus","grid_search_placeholder":"Trouver dans cette liste","help_button_label":"Ouvrir l'aide","infinite_scroll_load_more":"Charger plus","listbuilder_add_title":"Ajouter","listbuilder_card_switcher":"Passer en vue carte","listbuilder_footer_back_to_top":"Retour au début","listbuilder_grid_switcher":"Passer en vue grille","listbuilder_multiselect_clear_all":"Tout effacer","listbuilder_multiselect_select_all":"Tout sélectionner","listbuilder_pick_columns":"Choisir les colonnes","listbuilder_repeater_switcher":"Passer en vue répéteur","listbuilder_show_only_selected":"Afficher seulement les articles sélectionnés","listbuilder_show_secondary_actions":"Afficher les options secondaires","modal_close":"Fermer le modal","modal_footer_cancel_button":"Annuler","modal_footer_primary_button":"Enregistrer","month_short_april":"Avr","month_short_august":"Aoû","month_short_december":"Déc","month_short_february":"Fév","month_short_january":"Jan","month_short_july":"Jul","month_short_june":"Jun","month_short_march":"Mar","month_short_may":"Mai","month_short_november":"Nov","month_short_october":"Oct","month_short_september":"Sep","page_noaccess_button":"Revenir à une page non classée","page_noaccess_description":"Désolé, vous ne disposez pas des droits requis pour accéder à cette page.\nSi vous souhaitez y accéder, veuillez contacter votre administrateur système.","page_noaccess_header":"Circulez, il n'y a rien à voir","pagination_next":"Suivant","pagination_previous":"Précédent","reorder_top":"Haut","search_dismiss":"Abandonner la recherche","search_label":"Rechercher des éléments","search_open":"Ouvrir la recherche","search_placeholder":"Trouver dans cette liste","searchfield_no_records":"Désolé, aucun enregistrement correspondant trouvé","searchfield_searching":"Recherche en cours...","selectfield_remove":"Supprimer","selectfield_summary_text":"{0} élément(s) sélectionné(s)","selectfieldpicker_clear":"Effacer la sélection","selectfieldpicker_select":"Sélectionner","selectfieldpicker_select_value":"Sélectionner une valeur","selectfieldpicker_select_values":"Sélectionner des valeurs","sort_button_label":"Trier","sort_menu_heading":"Trier par","summary_actionbar_hide_summary":"Masquer la synthèse","summary_actionbar_open_secondary":"Afficher les options secondaires","summary_actionbar_show_summary":"Afficher la synthèse","tab_add":"Ajouter un onglet","tab_open":"Ouvrir","text_expand_close_text":"Fermer","text_expand_modal_title":"Vue développée","text_expand_see_less":"Afficher moins","text_expand_see_more":"Afficher plus","tile_chevron_label":"Développer ou réduire","wizard_navigator_finish":"Terminer","wizard_navigator_next":"Suivant","wizard_navigator_previous":"Précédent"};

angular.module('sky.resources')
    .config(['bbResources', function (bbResources) {
        angular.extend(bbResources, bbResourcesOverrides);
    }]);
}());

// moment.js locale configuration
// locale : french (fr)
// author : John Fischer : https://github.com/jfroffice

(function (factory) {
    if (typeof define === 'function' && define.amd) {
        define(['moment'], factory); // AMD
    } else if (typeof exports === 'object') {
        module.exports = factory(require('../moment')); // Node
    } else {
        factory((typeof global !== 'undefined' ? global : this).moment); // node or other global
    }
}(function (moment) {
    return moment.defineLocale('fr', {
        months : 'janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre'.split('_'),
        monthsShort : 'janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.'.split('_'),
        weekdays : 'dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi'.split('_'),
        weekdaysShort : 'dim._lun._mar._mer._jeu._ven._sam.'.split('_'),
        weekdaysMin : 'Di_Lu_Ma_Me_Je_Ve_Sa'.split('_'),
        longDateFormat : {
            LT : 'HH:mm',
            LTS : 'LT:ss',
            L : 'DD/MM/YYYY',
            LL : 'D MMMM YYYY',
            LLL : 'D MMMM YYYY LT',
            LLLL : 'dddd D MMMM YYYY LT'
        },
        calendar : {
            sameDay: '[Aujourd\'hui à] LT',
            nextDay: '[Demain à] LT',
            nextWeek: 'dddd [à] LT',
            lastDay: '[Hier à] LT',
            lastWeek: 'dddd [dernier à] LT',
            sameElse: 'L'
        },
        relativeTime : {
            future : 'dans %s',
            past : 'il y a %s',
            s : 'quelques secondes',
            m : 'une minute',
            mm : '%d minutes',
            h : 'une heure',
            hh : '%d heures',
            d : 'un jour',
            dd : '%d jours',
            M : 'un mois',
            MM : '%d mois',
            y : 'un an',
            yy : '%d ans'
        },
        ordinalParse: /\d{1,2}(er|)/,
        ordinal : function (number) {
            return number + (number === 1 ? 'er' : '');
        },
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 4  // The week that contains Jan 4th is the first week of the year.
        }
    });
}));

moment.locale('fr');