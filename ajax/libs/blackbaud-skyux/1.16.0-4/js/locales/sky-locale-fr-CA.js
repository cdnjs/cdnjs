/*jshint unused: false */
/*global angular */

(function () {
'use strict';

var bbResourcesOverrides;

bbResourcesOverrides = {"action_bar_actions":"Actions","alert_close":"Fermer","autonumeric_abbr_billions":"b","autonumeric_abbr_millions":"m","autonumeric_abbr_thousands":"k","avatar_error_not_image_description":"Veuillez choisir un fichier qui soit une image valide.","avatar_error_not_image_title":"Le fichier n'est pas une image.","avatar_error_too_large_description":"Veuillez choisir une image de moins de {0}.","avatar_error_too_large_title":"Le fichier est trop gros.","card_select":"Sélectionner la carte","carousel_button_label_next":"Aller à l'article suivant","carousel_button_label_previous":"Aller à l'article précédent","carousel_dot_label":"Aller à l'article {0}","checklist_categories_label":"Catégories","checklist_check_title":"Sélectionnez l'article","checklist_clear_all":"Effacer tout","checklist_no_items":"Aucun article n'a été trouvé","checklist_only_selected_items":"Montrer uniquement les articles sélectionnés","checklist_search_label":"Rechercher","checklist_select_all":"Sélectionner tout","chevron_collapse":"Réduire","chevron_expand":"Agrandir","context_menu_default_label":"Menu du contexte","date_field_invalid_date_message":"Veuillez entrer une date valide","date_range_picker_at_any_time":"N'importe quand","date_range_picker_filter_description_at_any_time":"{0} n'importe quand","date_range_picker_filter_description_last_calendar_year":"{0} depuis la dernière année civile","date_range_picker_filter_description_last_fiscal_year":"{0} depuis le dernier exercice","date_range_picker_filter_description_last_month":"{0} depuis le mois dernier","date_range_picker_filter_description_last_quarter":"{0} depuis le dernier trimestre","date_range_picker_filter_description_last_week":"{0} depuis la semaine dernière","date_range_picker_filter_description_next_calendar_year":"{0} pour la prochaine année civile","date_range_picker_filter_description_next_fiscal_year":"{0} pour le prochain exercice","date_range_picker_filter_description_next_month":"{0} pour le mois prochain","date_range_picker_filter_description_next_quarter":"{0} pour le prochain trimestre","date_range_picker_filter_description_next_week":"{0} pour semaine prochaine","date_range_picker_filter_description_specific_range":"{0} de {1} à {2}","date_range_picker_filter_description_this_calendar_year":"{0} pour cette année civile","date_range_picker_filter_description_this_fiscal_year":"{0} pour cet exercice","date_range_picker_filter_description_this_month":"{0} pour ce mois","date_range_picker_filter_description_this_quarter":"{0} pour ce trimestre","date_range_picker_filter_description_this_week":"{0} pour cette semaine","date_range_picker_filter_description_today":"{0} pour aujourd'hui","date_range_picker_filter_description_tomorrow":"{0} pour demain","date_range_picker_filter_description_yesterday":"{0} depuis hier","date_range_picker_from_date":"À partir de la date du","date_range_picker_last_calendar_year":"La dernière année civile","date_range_picker_last_fiscal_year":"Le dernier exercice","date_range_picker_last_month":"Le mois dernier","date_range_picker_last_quarter":"Le trimestre dernier","date_range_picker_last_week":"La semaine dernière","date_range_picker_max_date_error":"La date de début doit être avant la date de fin.","date_range_picker_min_date_error":"La date de fin doit être après la date de début.","date_range_picker_next_calendar_year":"La prochaine année civile","date_range_picker_next_fiscal_year":"Le prochain exercice","date_range_picker_next_month":"Le mois prochain","date_range_picker_next_quarter":"Le trimestre prochain","date_range_picker_next_week":"La semaine prochaine","date_range_picker_specific_range":"Plage spécifique","date_range_picker_this_calendar_year":"Cette année civile","date_range_picker_this_fiscal_year":"L'exercice en cours","date_range_picker_this_month":"Ce mois","date_range_picker_this_quarter":"Ce trimestre","date_range_picker_this_week":"Cette semaine","date_range_picker_to_date":"À ce jour","date_range_picker_today":"Aujourd'hui","date_range_picker_tomorrow":"Demain","date_range_picker_yesterday":"Hier","datepicker_clear":"Effacer","datepicker_close":"Exécuté","datepicker_open":"Ouvrir le sélecteur de dates","datepicker_today":"Aujourd'hui","definition_list_none_found":"Aucun trouvé","error_description_broken":"Essayez d'actualiser cette page ou revenez plus tard.","error_description_construction":"Merci de votre patience alors que nous apportons des améliorations!\nVeuillez essayer à nouveau sous peu.","error_title_broken":"Désolé, quelque chose n'a pas fonctionné.","error_title_construction":"Cette page réapparaîtra bientôt.","error_title_notfound":"Désolé, nous ne pouvons pas atteindre cette page.","errormodal_ok":"OK","file_item_delete":"Supprimer le fichier","file_size_b_plural":"{0} octets","file_size_b_singular":"{0} octet","file_size_gb":"{0} Go","file_size_kb":"{0} Ko","file_size_mb":"{0} Mo","file_upload_drag_file_here":"Faites glisser un fichier ici","file_upload_drag_or_click":"Faites glisser un fichier ici ou cliquez pour naviguer","file_upload_drop_files_here":"Déplacez les fichiers ici","file_upload_invalid_file":"Ce type de fichier n'est pas valide","file_upload_link_input":"Ajoutez un lien à un fichier","file_upload_link_placeholder":"http://www.something.com/file","file_upload_or_click_to_browse":"ou cliquez pour naviguer","file_upload_paste_link":"Insérez un lien à un fichier","file_upload_paste_link_done":"Exécuté","filter_button_title":"Filtres","filter_modal_apply":"Appliquez les filtres","filter_modal_clear":"Effacer tous les filtres","filter_summary_close":"Fermer","filter_summary_header":"Filtre","grid_action_bar_cancel_mobile_actions":"Annuler","grid_action_bar_choose_action":"Choisir une action","grid_action_bar_clear_selection":"Effacer la sélection","grid_back_to_top":"Retour en haut","grid_column_picker_all_categories":"Toutes les catégories","grid_column_picker_description_header":"Description","grid_column_picker_header":"Choisir les colonnes à indiquer dans la liste","grid_column_picker_name_header":"Colonne","grid_column_picker_search_no_columns":"Aucune colonne n'a été trouvée","grid_column_picker_search_placeholder":"Recherchez selon le nom","grid_column_picker_submit":"Appliquez les changements","grid_columns_button":" Choisissez les colonnes","grid_filters_apply":"Appliquez les filtres","grid_filters_button":"Filtres","grid_filters_clear":"Effacer","grid_filters_header":"Filtre","grid_filters_hide":"Dissimuler","grid_filters_summary_header":"Filtre :","grid_load_more":"Charger encore","grid_search_placeholder":"Trouver dans cette liste","help_button_label":"Ouvrir aide","infinite_scroll_load_more":"Charger encore","listbuilder_add_title":"Ajouter","listbuilder_card_switcher":"Passez à la visualisation de carte","listbuilder_footer_back_to_top":"Retour en haut","listbuilder_grid_switcher":"Passez à la visualisation en grille","listbuilder_multiselect_clear_all":"Effacer tout","listbuilder_multiselect_select_all":"Sélectionner tout","listbuilder_pick_columns":"Choisissez les colonnes","listbuilder_repeater_switcher":"Passez à la visualisation de répéteur","listbuilder_show_only_selected":"Montrer seulement ce qui est sélectionné","listbuilder_show_secondary_actions":"Montrer les actions secondaires","modal_close":"Fermer le modal","modal_footer_cancel_button":"Annuler","modal_footer_primary_button":"Sauvegarder","month_short_april":"Avr","month_short_august":"Aoû","month_short_december":"Déc","month_short_february":"Fév","month_short_january":"Jan","month_short_july":"Jul","month_short_june":"Jui","month_short_march":"Mar","month_short_may":"Mai","month_short_november":"Nov","month_short_october":"Oct","month_short_september":"Sep","page_noaccess_button":"Retournez vers une page non classifiée","page_noaccess_description":"Désolé, vous n'avez pas droit à cette page.\nIf si vous pensez que vous y avez droit, veuillez prendre contact avec votre administrateur de système.","page_noaccess_header":"Avancez, il n'y a rien à voir ici","pagination_next":"Suivant","pagination_previous":"Précédent","reorder_top":"Haut","search_dismiss":"Omettre la recherche","search_label":"Rechercher des articles","search_open":"Ouvrir la recherche","search_placeholder":"Trouver dans cette liste","searchfield_no_records":"Désolé, aucun dossier correspondant n'a été trouvé","searchfield_searching":"Recherche...","selectfield_remove":"Enlever","selectfield_summary_text":"{0} articles sélectionnés","selectfieldpicker_clear":"Effacer la sélection","selectfieldpicker_select":"Sélectionner","selectfieldpicker_select_value":"Sélectionner une valeur","selectfieldpicker_select_values":"Sélectionner des valeurs","sort_button_label":"Trier","sort_menu_heading":"Trier par","summary_actionbar_hide_summary":"Dissimuler le récapitulatif","summary_actionbar_open_secondary":"Montrer les actions secondaires","summary_actionbar_show_summary":"Montrer le récapitulatif","tab_add":"Ajouter un onglet","tab_open":"Ouvert","text_expand_close_text":"Fermer","text_expand_modal_title":"Vue agrandie","text_expand_see_less":"Voir moins","text_expand_see_more":"Voir plus","tile_chevron_label":"Agrandir ou réduire","wizard_navigator_finish":"Terminer","wizard_navigator_next":"Suivant","wizard_navigator_previous":"Précédent"};

angular.module('sky.resources')
    .config(['bbResources', function (bbResources) {
        angular.extend(bbResources, bbResourcesOverrides);
    }]);
}());

// moment.js locale configuration
// locale : canadian french (fr-ca)
// author : Jonathan Abourbih : https://github.com/jonbca

(function (factory) {
    if (typeof define === 'function' && define.amd) {
        define(['moment'], factory); // AMD
    } else if (typeof exports === 'object') {
        module.exports = factory(require('../moment')); // Node
    } else {
        factory((typeof global !== 'undefined' ? global : this).moment); // node or other global
    }
}(function (moment) {
    return moment.defineLocale('fr-ca', {
        months : 'janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre'.split('_'),
        monthsShort : 'janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.'.split('_'),
        weekdays : 'dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi'.split('_'),
        weekdaysShort : 'dim._lun._mar._mer._jeu._ven._sam.'.split('_'),
        weekdaysMin : 'Di_Lu_Ma_Me_Je_Ve_Sa'.split('_'),
        longDateFormat : {
            LT : 'HH:mm',
            LTS : 'LT:ss',
            L : 'YYYY-MM-DD',
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
        }
    });
}));

moment.locale('fr-ca');