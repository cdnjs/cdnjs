var StanfordSlateEnhancements = StanfordSlateEnhancements || (function(){
    var _features = ["classify", "dialog", "selectSearch", "showHide", "tabs"];
    var _args = [];
    var _observers = [];
    return {
        init : function(args) {
            if (!args) {
                args = _features;
            }
            
            // Add the arguments to the private variable.
            _args = args;

            // Call each feature.
            args.forEach(function(item, index) {
                StanfordSlateEnhancements[item]();
            });

            // For the items that need to wait for elements like popups to show
            // Create an observer to watch for changes.
            var observer = new MutationObserver(function(mutations) {
                _observers.forEach(function(item, index) {
                    if (_args.includes(item)) {
                        StanfordSlateEnhancements[item]();
                    }
                });
            });

            // Start observing
            observer.observe(document.body, { //document.body is node target to observe
                childList: true, //This is a must have for the observer with subtree
                subtree: true //Set to true if changes must also be observed in descendants.
            });
        },
        registerObserver : function(feature) { // Allows features to say they need to be called when a dom change occurs.
            if (!_observers.includes(feature)) {
                _observers.push(feature);
            }
        },
        classify : function() {
            var classes = [];

            // ======  Add path classes ======
            let path = window.location.pathname.substring(1);
            if (path.endsWith('/')) {
                path = path.slice(0, -1);
            }

            // Replace slashes with hyphens to build our class.
            let pathString = 'path-' + path.replace(/\//g, '-');
            
            // If it's a form add the form id to the class. 
            let pathParts = path.split('/');
            if (pathParts[pathParts.length -1] == 'frm') {
                let urlParams = new URLSearchParams(window.location.search);
                for (var key of urlParams.keys()) {
                    pathString += '-' + key;
                    break;
                }
            }

            classes.push(pathString);

            // Add an application path on the application pages.
            if (pathParts.length > 1 && pathParts[0] == 'apply' && pathParts[pathParts.length - 1] !== 'status') {
                classes.push('application');
            }

            // Add a slate-form class on the slate pages.
            if (pathParts[0] == 'register') {
                classes.push('slate-form');
            }

            // ===== End Path Classes =====

            // ===== Logged In Class =====
            if ($('#global a[href^="/account/logout"]').length || $('#global a[href^="/manage/logout"]').length) {
                classes.push('logged-in');
            }
            else {
                classes.push('not-logged-in');
            }
            // ===== End Logged In Class =====

            var classString = classes.join(' ');

            $('body').addClass(classString);

            // Add a class for the application-list table.
            if (classes.includes('path-apply') && classes.includes('logged-in')) {
                $('#start_application_link').parent().prev().addClass('application-list');
            }

            // Add classes for the login links
            if (classes.includes('path-apply') && classes.includes('not-logged-in')) {
                $firstTimeTitle = $('h2:contains("First-time users:")');
                $firstTimeTitle.parents('td').addClass('create-an-account-wrapper');
                $firstTimeTitle.parents('table').addClass('authentication-table');

                $returningUsersTitle = $('h2:contains("Returning users:")');
                $returningUsersTitle.parents('td').addClass('log-in-wrapper');
            }
        },
        dialog : function($dialogs) {
            this.registerObserver('dialog');
            $dialogs = $('[data-sse-dialog]');
            if ($dialogs) {
                
                // Find all dialogs
                $dialogs.each(function() {
                    let $link = jQuery(this);

                    // Check if the dialog has already been processed
                    if ($link.hasClass("sse-dialog-observed")) {
                        return;
                    }
                    
                    // Need to add a class markign that we have already processed this. 
                    $link.addClass("sse-dialog-observed");

                    let dialogID = $link.attr('data-sse-dialog');
                    let $dialog = $('#' + dialogID);

                    // Hide the dialog
                    $dialog.hide();

                    // Add dialog class
                    $dialog.addClass('dialog');

                    // Create the close button and make it close on click.
                    let $dialogClose = $('<button class="default" type="button">Close</button>');
                    $dialogClose.on('click', function(e) {
                        e.preventDefault();
                        FW.Dialog.Unload();
                    });

                    // Add the close button to the end of the dialog.
                    $('<div class="action"></div>').appendTo($dialog).append($dialogClose);
                
                    // Open the dialog when the link is clicked.
                    $link.on('click', function(e) {
                        e.preventDefault();
                        FW.Dialog.Load($dialog);
                    });
                });
            }
        },
        selectSearch : function($selects) {
            this.registerObserver('selectSearch');
            // Get the select2 javascript file and load it in the header.
            $.ajax({
                url: "https://cdnjs.cloudflare.com/ajax/libs/select2/4.1.0-rc.0/js/select2.min.js",
                dataType: "script",
                cache: "true",
                success: function( data, textStatus, jqxhr ) {
                    $selects = $('span.sse-select-search');
                    if ($selects) {
                        // Add the css to our header so we can use it.
                        if (!$('link#select2-css').length) {
                            $('<link>').attr('id', 'select2-css').appendTo('head').attr({
                                type: 'text/css',
                                rel: 'stylesheet',
                                href: 'https://cdnjs.cloudflare.com/ajax/libs/select2/4.1.0-rc.0/css/select2.min.css'
                            });
                        }
                        
                        // Run it on every span that has the class sse-search-select
                        $selects.each(function() {
                            $select = $(this);
                            
                            // Check if the select has already been processed
                            if ($select.hasClass("sse-select-search-observed")) {
                                return;
                            }
                            
                            // Need to add a class marking that we have already processed this. 
                            $select.addClass("sse-select-search-observed");

                            // Let select2 options be set via a data attribute on the span tag.
                            let options = {}
                            if ($select.data('sse-select-search-options')) {
                                options = $select.data('sse-select-search-options');
                            }

                            var $selectInput = $select.closest('.form_select').find('.form_responses select');
                            $selectInput.select2(options);

                            // Make the input box take focus when opened.
                            $selectInput.on('select2:open', function(e) {
                                $('.select2-search__field').get(0).focus();
                            });
                        });
                    }
                }
            });
        },
        showHide : function($showhides) {
            this.registerObserver('showHide');

            $showhides = $('[data-sse-showhide]');
            if ($showhides) {
                // Find all the showhide links.
                $showhides.each(function() {
                    let $link = $(this);
                        
                    // Check if the show hide 
                    if ($link.hasClass("sse-showhide-observed")) {
                        return;
                    }

                    $link.addClass("sse-showhide-observed");

                    let showHideID = $link.attr('data-sse-showhide');
                    let $showHide = jQuery('#' + showHideID);

                    // Hide the text initially
                    $showHide.hide();

                    // Hide and show depending on the current state.
                    $link.attr('aria-expanded', 'false');
                    $link.on('click', function(e) {
                        e.preventDefault();
                        if ($link.attr('aria-expanded') == "true") {
                            $link.attr('aria-expanded', 'false');
                            $showHide.hide();
                        }
                        else {
                            $link.attr('aria-expanded', 'true');
                            $showHide.show();
                        }
                    });
                });
            }
        },
        tabs : function() {
            this.registerObserver('tabs');

            // Find all tab groups.
            $('[data-sse-tabs-content]').each(function() {
                var $tabGroup = $(this);

                // Check if it has already been processed
                if ($tabGroup.hasClass('sse-tabs-observed')) {
                    return;
                }
                $tabGroup.addClass('sse-tabs-observed');

                // Get the ID of content area to use
                var contentID = $tabGroup.data('sse-tabs-content');

                // Loop through each tab
                var $tabs = $tabGroup.find('[data-sse-tabs-action]');
                $tabs.each(function() {
                    var $tabItem = $(this);

                    // Load the active tab
                    if ($tabItem.hasClass('active')) {
                        FW.Lazy.Fetch("?cmd=" + $tabItem.data('sse-tabs-action'), $("#" + contentID));
                    }

                    // Switch tab when clicked.
                    $tabItem.on('click', function(e) {
                        e.preventDefault();
                        var $tab = $(this);
                        $tabs.removeClass('active');
                        $tab.addClass('active');
                        FW.Lazy.Fetch("?cmd=" + $tab.data('sse-tabs-action'), $("#" + contentID));
                    });
                });
            });
        }
    };
}());
