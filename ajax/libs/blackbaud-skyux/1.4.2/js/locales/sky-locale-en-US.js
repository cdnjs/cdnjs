/*jshint unused: false */
/*global angular, bbResourcesOverrides */

(function () {
'use strict';

var bbResourcesOverrides;
    
bbResourcesOverrides = {
    "action_bar_actions": "Actions", // The label for the actions dropdown on the action button bar
    "autonumeric_abbr_billions": "b", // The suffix to show after an abbreviated value in the billions (e.g. $1.2b)
    "autonumeric_abbr_millions": "m", // The suffix to show after an abbreviated value in the millions (e.g. $1.2m)
    "autonumeric_abbr_thousands": "k", // The suffix to show after an abbreviated value in the thousands (e.g. $1.2k)
    "checklist_select_all": "Select all", // Text for the link in a checklist to select all items.
    "checklist_clear_all": "Clear all", // Text for the link in a checklist to clear selections.
    "checklist_no_items": "No items found", // Text in a checklist when no items are shown based on the current filter.
    "grid_back_to_top": "Back to top", // Text for link in grid to scroll back to the top.
    "grid_column_picker_all_categories": "All", // Button text for category filters used to indicate that all columns should be shown in the column picker
    "grid_column_picker_description_header": "Description", // In the column picker, the header for the column showing the description of the columns to include in the grid.
    "grid_column_picker_header": "Choose columns to show in the list", // Header text for the grid column picker screen
    "grid_column_picker_name_header": "Column", // In the column picker, the header for the column showing the names of the columns to include in the grid.
    "grid_column_picker_search_placeholder": "Search by name", // Search text placeholder for the search box on the grid column picker
    "grid_column_picker_submit": "Apply changes", // Button text for applying changes made in the grid column picker
    "grid_columns_button": " Choose columns", // Label for button to select columns to display in a grid.
    "grid_filters_apply": "Apply filters", // Text for button on filters flyout to apply the selected filters to the grid
    "grid_filters_button": "Filters", // Label for button to select filters to be applied to a grid.
    "grid_filters_clear": "Clear", // Text for button on filters flyout to clear the selected filters for the grid
    "grid_filters_header": "Filter", // Header text for grid filters flyout
    "grid_filters_hide": "Hide", // Hide link text for grid filters flyout
    "grid_filters_summary_header": "Filter:", // Header text for filter summary on top of grid
    "grid_load_more": "Load more", // The text for the button to load additional rows into the grid if more rows are available.
    "grid_search_placeholder": "Find in this list", // Placeholder text in grid search box
    "grid_column_picker_search_no_columns": "No columns found", // Displays when no columns are found for the specified search text.
    "modal_footer_cancel_button": "Cancel", // Default lable text for modal cancel button
    "modal_footer_primary_button": "Save", // Default lable text for modal primary button
    "month_short_april": "Apr",
    "month_short_august": "Aug",
    "month_short_december": "Dec",
    "month_short_february": "Feb",
    "month_short_january": "Jan",
    "month_short_july": "Jul",
    "month_short_june": "Jun",
    "month_short_march": "Mar",
    "month_short_may": "May",
    "month_short_november": "Nov",
    "month_short_october": "Oct",
    "month_short_september": "Sep",
    "page_noaccess_button": "Return to a non-classified page",
    "page_noaccess_description": "Sorry, you don\'t have rights to this page.\nIf you feel you should, please contact your system administrator.",
    "page_noaccess_header": "Move along, there\'s nothing to see here",
    "text_expand_see_less": "See less", // Display less text content
    "text_expand_see_more": "See more",
    "grid_action_bar_clear_selection": "Clear selection", // Clear the selections in the grid.
    "grid_action_bar_cancel_mobile_actions": "Cancel", // Close the menu where you choose an action in mobile multiselect.
    "grid_action_bar_choose_action": "Choose an action", // Open a menu to choose an action in mobile  multiselect.
    "date_field_invalid_date_message": "Please enter a valid date", // error message shown when an invalid date is entered.
    "date_range_picker_this_week": "This week", //text for date range picker
    "date_range_picker_last_week": "Last week", //text for date range picker
    "date_range_picker_next_week": "Next week", //text for date range picker
    "date_range_picker_this_month": "This month", //text for date range picker
    "date_range_picker_last_month": "Last month", //text for date range picker
    "date_range_picker_next_month": "Next month", //text for date range picker
    "date_range_picker_this_calendar_year": "This calendar year", //text for date range picker
    "date_range_picker_last_calendar_year": "Last calendar year", //text for date range picker
    "date_range_picker_next_calendar_year": "Next calendar year", //text for date range picker
    "date_range_picker_this_fiscal_year": "This fiscal year", //text for date range picker
    "date_range_picker_last_fiscal_year": "Last fiscal year", //text for date range picker
    "date_range_picker_next_fiscal_year": "Next fiscal year", //text for date range picker
    "date_range_picker_this_quarter": "This quarter", //text for date range picker
    "date_range_picker_last_quarter": "Last quarter", //text for date range picker
    "date_range_picker_next_quarter": "Next quarter", //text for date range picker
    "date_range_picker_at_any_time": "At any time", //text for date range picker
    "date_range_picker_today": "Today", //text for date range picker
    "date_range_picker_tomorrow": "Tomorrow", //text for date range picker
    "date_range_picker_yesterday": "Yesterday", //text for date range picker
    "date_range_picker_filter_description_this_week": "{0} for this week", //text for date range picker
    "date_range_picker_filter_description_last_week": "{0} from last week", //text for date range picker
    "date_range_picker_filter_description_next_week": "{0} for next week", //text for date range picker
    "date_range_picker_filter_description_this_month": "{0} for this month", //text for date range picker
    "date_range_picker_filter_description_last_month": "{0} from last month", //text for date range picker
    "date_range_picker_filter_description_next_month": "{0} for next month", //text for date range picker
    "date_range_picker_filter_description_this_calendar_year": "{0} for this calendar year", //text for date range picker
    "date_range_picker_filter_description_last_calendar_year": "{0} from last calendar year", //text for date range picker
    "date_range_picker_filter_description_next_calendar_year": "{0} for next calendar year", //text for date range picker
    "date_range_picker_filter_description_this_fiscal_year": "{0} for this fiscal year", //text for date range picker
    "date_range_picker_filter_description_last_fiscal_year": "{0} from last fiscal year", //text for date range picker
    "date_range_picker_filter_description_next_fiscal_year": "{0} for next fiscal year", //text for date range picker
    "date_range_picker_filter_description_this_quarter": "{0} for this quarter", //text for date range picker
    "date_range_picker_filter_description_last_quarter": "{0} from last quarter", //text for date range picker
    "date_range_picker_filter_description_next_quarter": "{0} for next quarter", //text for date range picker
    "date_range_picker_filter_description_at_any_time": "{0} at any time", //text for date range picker
    "date_range_picker_filter_description_today": "{0} for today", //text for date range picker
    "date_range_picker_filter_description_yesterday": "{0} from yesterday", //text for date range picker
    "date_range_picker_filter_description_tomorrow": "{0} for tomorrow", //text for date range picker
    "file_size_b_plural": "{0} bytes",
    "file_size_b_singular": "{0} byte",
    "file_size_kb": "{0} KB",
    "file_size_mb": "{0} MB",
    "file_size_gb": "{0} GB",
    "file_upload_drag_file_here": "Drag a file here",
    "file_upload_drop_files_here": "Drop files here",
    "file_upload_invalid_file": "This file type is invalid",
    "file_upload_link_placeholder": "http://www.something.com/file",
    "file_upload_or_click_to_browse": "or click to browse",
    "file_upload_paste_link": "Paste a link to a file",
    "file_upload_paste_link_done": "Done",
    "searchfield_searching": "Searching...", //text for ui-select search control while performing a remote search
    "searchfield_no_records": "Sorry, no matching records found", // text for ui-select search control when no records are found,
    "wizard_navigator_finish": "Finish", // Text displayed on the next button when a wizard is ready for completion.
    "wizard_navigator_next": "Next", // Text displayed on a wizard"s next button.
    "wizard_navigator_previous": "Previous", // Text displayed on a wizard"s previous button.
    "datepicker_today": "Today", //Text displayed in the Today button of the datepicker
    "datepicker_clear": "Clear", //Text displayed in the Clear button of the datepicker
    "datepicker_close": "Done" //Text displayed in the Close button of the datepicker
};

angular.module('sky.resources')
    .config(['bbResources', function (bbResources) {
        angular.extend(bbResources, bbResourcesOverrides);
    }]);
}());