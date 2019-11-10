/*jshint unused: false */
/*global angular */

(function () {
'use strict';

var bbResourcesOverrides;

bbResourcesOverrides = {"action_bar_actions":"Actions","alert_close":"Close","autonumeric_abbr_billions":"b","autonumeric_abbr_millions":"m","autonumeric_abbr_thousands":"k","avatar_error_not_image_description":"Please choose a file that is a valid image.","avatar_error_not_image_title":"File is not an image.","avatar_error_too_large_description":"Please choose an image that is less than {0}.","avatar_error_too_large_title":"File is too large.","card_select":"Select card","carousel_button_label_next":"Go to next item","carousel_button_label_previous":"Go to previous item","carousel_dot_label":"Go to item {0}","checklist_categories_label":"Categories","checklist_check_title":"Select item","checklist_clear_all":"Clear all","checklist_no_items":"No items found","checklist_only_selected_items":"Only show selected items","checklist_search_label":"Search","checklist_select_all":"Select all","chevron_collapse":"Collapse","chevron_expand":"Expand","context_menu_default_label":"Context menu","date_field_invalid_date_message":"Please enter a valid date","date_range_picker_at_any_time":"At any time","date_range_picker_filter_description_at_any_time":"{0} at any time","date_range_picker_filter_description_last_calendar_year":"{0} from last calendar year","date_range_picker_filter_description_last_fiscal_year":"{0} from last fiscal year","date_range_picker_filter_description_last_month":"{0} from last month","date_range_picker_filter_description_last_quarter":"{0} from last quarter","date_range_picker_filter_description_last_week":"{0} from last week","date_range_picker_filter_description_next_calendar_year":"{0} for next calendar year","date_range_picker_filter_description_next_fiscal_year":"{0} for next fiscal year","date_range_picker_filter_description_next_month":"{0} for next month","date_range_picker_filter_description_next_quarter":"{0} for next quarter","date_range_picker_filter_description_next_week":"{0} for next week","date_range_picker_filter_description_specific_range":"{0} from {1} to {2}","date_range_picker_filter_description_this_calendar_year":"{0} for this calendar year","date_range_picker_filter_description_this_fiscal_year":"{0} for this fiscal year","date_range_picker_filter_description_this_month":"{0} for this month","date_range_picker_filter_description_this_quarter":"{0} for this quarter","date_range_picker_filter_description_this_week":"{0} for this week","date_range_picker_filter_description_today":"{0} for today","date_range_picker_filter_description_tomorrow":"{0} for tomorrow","date_range_picker_filter_description_yesterday":"{0} from yesterday","date_range_picker_from_date":"From date","date_range_picker_last_calendar_year":"Last calendar year","date_range_picker_last_fiscal_year":"Last financial year","date_range_picker_last_month":"Last month","date_range_picker_last_quarter":"Last quarter","date_range_picker_last_week":"Last week","date_range_picker_max_date_error":"Start date must be before end date","date_range_picker_min_date_error":"End date must be after start date","date_range_picker_next_calendar_year":"Next calendar year","date_range_picker_next_fiscal_year":"Next fiscal year","date_range_picker_next_month":"Next month","date_range_picker_next_quarter":"Next quarter","date_range_picker_next_week":"Next week","date_range_picker_specific_range":"Specific range","date_range_picker_this_calendar_year":"This calendar year","date_range_picker_this_fiscal_year":"This financial year","date_range_picker_this_month":"This month","date_range_picker_this_quarter":"This quarter","date_range_picker_this_week":"This week","date_range_picker_to_date":"To date","date_range_picker_today":"Today","date_range_picker_tomorrow":"Tomorrow","date_range_picker_yesterday":"Yesterday","datepicker_clear":"Clear","datepicker_close":"Done","datepicker_open":"Open datepicker","datepicker_today":"Today","definition_list_none_found":"None found","error_description_broken":"Try to refresh this page or come back later.","error_description_construction":"Thanks for your patience while improvements are made!\nPlease check back in a little while.","error_title_broken":"Sorry, something went wrong.","error_title_construction":"This page will return soon.","error_title_notfound":"Sorry, we can't reach that page.","errormodal_ok":"OK","file_item_delete":"Delete file","file_size_b_plural":"{0} bytes","file_size_b_singular":"{0} byte","file_size_gb":"{0} GB","file_size_kb":"{0} KB","file_size_mb":"{0} MB","file_upload_drag_file_here":"Drag a file here","file_upload_drag_or_click":"Drag a file here or click to browse","file_upload_drop_files_here":"Drop files here","file_upload_invalid_file":"This file type is invalid","file_upload_link_input":"Add a link to a file","file_upload_link_placeholder":"http://www.something.com/file","file_upload_or_click_to_browse":"or click to browse","file_upload_paste_link":"Paste a link to a file","file_upload_paste_link_done":"Done","filter_button_title":"Filters","filter_modal_apply":"Apply filters","filter_modal_clear":"Clear all filters","filter_summary_close":"Close","filter_summary_header":"Filter","grid_action_bar_cancel_mobile_actions":"Cancel","grid_action_bar_choose_action":"Choose an action","grid_action_bar_clear_selection":"Clear selection","grid_back_to_top":"Back to top","grid_column_picker_all_categories":"All categories","grid_column_picker_description_header":"Description","grid_column_picker_header":"Choose columns to show in the list","grid_column_picker_name_header":"Column","grid_column_picker_search_no_columns":"No columns found","grid_column_picker_search_placeholder":"Search by name","grid_column_picker_submit":"Apply changes","grid_columns_button":" Choose columns","grid_filters_apply":"Apply filters","grid_filters_button":"Filters","grid_filters_clear":"Clear","grid_filters_header":"Filter","grid_filters_hide":"Hide","grid_filters_summary_header":"Filter:","grid_load_more":"Load more","grid_search_placeholder":"Find in this list","help_button_label":"Open help","infinite_scroll_load_more":"Load more","listbuilder_add_title":"Add","listbuilder_card_switcher":"Switch to card view","listbuilder_footer_back_to_top":"Back to top","listbuilder_grid_switcher":"Switch to grid view","listbuilder_multiselect_clear_all":"Clear all","listbuilder_multiselect_select_all":"Select all","listbuilder_pick_columns":"Choose columns","listbuilder_repeater_switcher":"Switch to repeater view","listbuilder_show_only_selected":"Show only selected","listbuilder_show_secondary_actions":"Show secondary actions","modal_close":"Close modal","modal_footer_cancel_button":"Cancel","modal_footer_primary_button":"Save","month_short_april":"Apr","month_short_august":"Aug","month_short_december":"Dec","month_short_february":"Feb","month_short_january":"Jan","month_short_july":"Jul","month_short_june":"Jun","month_short_march":"Mar","month_short_may":"May","month_short_november":"Nov","month_short_october":"Oct","month_short_september":"Sep","page_noaccess_button":"Return to a non-classified page","page_noaccess_description":"Sorry, you don't have rights to this page.\nIf you feel you should, please contact your system administrator.","page_noaccess_header":"Move along, there's nothing to see here","pagination_next":"Next","pagination_previous":"Previous","reorder_top":"Top","search_dismiss":"Dismiss search","search_label":"Search items","search_open":"Open search","search_placeholder":"Find in this list","searchfield_no_records":"Sorry, no matching records found","searchfield_searching":"Searching...","selectfield_remove":"Remove","selectfield_summary_text":"{0} items selected","selectfieldpicker_clear":"Clear selection","selectfieldpicker_select":"Select","selectfieldpicker_select_value":"Select value","selectfieldpicker_select_values":"Select values","sort_button_label":"Sort","sort_menu_heading":"Sort by","summary_actionbar_hide_summary":"Hide summary","summary_actionbar_open_secondary":"Show secondary actions","summary_actionbar_show_summary":"Show summary","tab_add":"Add tab","tab_open":"Open","text_expand_close_text":"Close","text_expand_modal_title":"Expanded view","text_expand_see_less":"See less","text_expand_see_more":"See more","tile_chevron_label":"Expand or collapse","wizard_navigator_finish":"Finish","wizard_navigator_next":"Next","wizard_navigator_previous":"Previous"};

angular.module('sky.resources')
    .config(['bbResources', function (bbResources) {
        angular.extend(bbResources, bbResourcesOverrides);
    }]);
}());

// moment.js locale configuration
// locale : great britain english (en-gb)
// author : Chris Gedrim : https://github.com/chrisgedrim

(function (factory) {
    if (typeof define === 'function' && define.amd) {
        define(['moment'], factory); // AMD
    } else if (typeof exports === 'object') {
        module.exports = factory(require('../moment')); // Node
    } else {
        factory((typeof global !== 'undefined' ? global : this).moment); // node or other global
    }
}(function (moment) {
    return moment.defineLocale('en-gb', {
        months : 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_'),
        monthsShort : 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_'),
        weekdays : 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_'),
        weekdaysShort : 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_'),
        weekdaysMin : 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_'),
        longDateFormat : {
            LT : 'HH:mm',
            LTS : 'HH:mm:ss',
            L : 'DD/MM/YYYY',
            LL : 'D MMMM YYYY',
            LLL : 'D MMMM YYYY LT',
            LLLL : 'dddd, D MMMM YYYY LT'
        },
        calendar : {
            sameDay : '[Today at] LT',
            nextDay : '[Tomorrow at] LT',
            nextWeek : 'dddd [at] LT',
            lastDay : '[Yesterday at] LT',
            lastWeek : '[Last] dddd [at] LT',
            sameElse : 'L'
        },
        relativeTime : {
            future : 'in %s',
            past : '%s ago',
            s : 'a few seconds',
            m : 'a minute',
            mm : '%d minutes',
            h : 'an hour',
            hh : '%d hours',
            d : 'a day',
            dd : '%d days',
            M : 'a month',
            MM : '%d months',
            y : 'a year',
            yy : '%d years'
        },
        ordinalParse: /\d{1,2}(st|nd|rd|th)/,
        ordinal : function (number) {
            var b = number % 10,
                output = (~~(number % 100 / 10) === 1) ? 'th' :
                (b === 1) ? 'st' :
                (b === 2) ? 'nd' :
                (b === 3) ? 'rd' : 'th';
            return number + output;
        },
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 4  // The week that contains Jan 4th is the first week of the year.
        }
    });
}));

moment.locale('en-gb');