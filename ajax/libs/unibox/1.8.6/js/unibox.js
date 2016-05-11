var UniBox = function() {
    //// common vars

    // index of selected entry
    var selectedEntryIndex = -1;

    // the search box
    var searchBox;

    // the search box's parent
    var searchBoxParent;

    // the suggest box
    var suggestBox;

    // the URL where to get the search suggests
    var suggestUrl = '';

    // the root path to the instant visual feedback images
    var ivfImagePath = '';

    // the number of ms before the update of the search box is triggered
    var throttleTime;

    // the list of all selectable divs
    var selectables = [];

    // whether the search words should be highlighted in the results
    var highlight = true;

    // extra HTML code that is shown in each search suggest
    var extraHtml;

    // general animation speed
    var animationSpeed = 300;

    // the headline of the query visualization
    var queryVisualizationHeadline = '';

    // the minimum input before the suggest pops up
    var minChars = 2;

    // the action that should happen if enter is pressed
    var enterCallback;

    // the action that should happen if enter is pressed when a suggest result is selected
    var enterCallbackResult;

    // the placeholder for the input field
    var placeholder;

    // the words that were highlighted above the search bar
    var ivfWords = [];

    // where to show the ivf
    var instantVisualFeedback = 'all';

    // remember the last key stroke to avoid showing the suggests after enter
    var lastKeyCode = -1;

    // hide the search suggests
    function hideSuggests(event) {

        if (event !== undefined) {

            var inputText = searchBox.val();

            // hide if tab, escape, or enter was pressed
            if (event.keyCode == 9 || event.keyCode == 27 || event.keyCode == 13 || inputText.length < minChars) {

                suggestBox.slideUp(animationSpeed);

                if (event.keyCode == 13 && enterCallback != undefined && selectedEntryIndex == -1) {
                    enterCallback.call(this, inputText);
                }

                selectedEntryIndex = -1;

            }

        } else {
            suggestBox.slideUp(animationSpeed);
            selectedEntryIndex = -1;
        }

    }

    function throttle(f, delay){
        var timer = null;
        return function(){
            var context = this, args = arguments;
            clearTimeout(timer);
            timer = window.setTimeout(function(){
                f.apply(context, args);
            }, delay || 50);
        };
    }

    // highlight search words
    function highlightSearchWords(string, searchString) {
        if (!highlight) {
            return string;
        }
        var words = searchString.split(' ');

        var markers = {};
        jQuery.each(words, function(key, word) {
            if (word.length < 1) {
                return;
            }
            //string = string.replace(new RegExp(word,'gi'),'<span>'+word+'</span>');
            string = string.replace(new RegExp(word,'gi'),'##'+key+'##');
            markers['##'+key+'##'] = '<span>'+word+'</span>';
        });

        jQuery.each(markers, function(marker, replacement) {
            string = string.replace(new RegExp(marker,'gi'),replacement);
        });

        return string;
    }

    // update suggest box when new data is given
    function updateSuggestBox(data){

        // don't do anything if the last key was enter
        if (lastKeyCode == 13) {
            hideSuggests();
            return;
        }

        var searchString = searchBox.val();

        //// fill the box
        suggestBox.html('');

        // find out whether we have something to show in the first place
        var showSuggestBox = false;

        // suggest
        jQuery.each(data['suggests'], function(key, values) {

            var suggestSet = jQuery('<div class="unibox-suggest-'+key+'"></div>');

            if (key.replace(/_/,'').length > 0 && values.length > 0) {
                var keyNode = jQuery('<h4>'+key+'</h4>');
                suggestSet.append(keyNode);
            }

            jQuery.each(values, function(index, suggest) {

                var suggestLine = '<div class="unibox-selectable">';

                if (suggest['image'] != undefined) {
                    suggestLine += '<div class="unibox-selectable-img-container"><img src="'+suggest['image']+'"/></div>';
                }

                if (suggest['link'] != undefined) {
                    suggestLine += '<a href="'+suggest['link']+'">';
                    suggestLine += highlightSearchWords(suggest['name'],searchString);
                    suggestLine += '</a>';
                } else {
                    suggestLine += '<span>' + highlightSearchWords(suggest['name'],searchString) + '</span>';
                }

                if (extraHtml != undefined) {
                    var matches = extraHtml.match(/##(.*?)##/gi);
                    var extraHtmlFilled = extraHtml;

                    var missedMatch = false;
                    for (var m in matches) {
                        var variable = matches[m].replace(/#/g,'');
                        var replacement = suggest[variable];
                        if (replacement == undefined) {
                            missedMatch = true;
                            continue;
                        }
                        var re = new RegExp(matches[m],'g');
                        extraHtmlFilled = extraHtmlFilled.replace(re,replacement);
                    }
                    if (!missedMatch) {
                        suggestLine += '<div class="unibox-extra">'+extraHtmlFilled+'</div>';
                    }
                }

                suggestLine += '<div class="unibox-ca"></div></div>';

                var suggestNode = jQuery(suggestLine);
                suggestSet.append(suggestNode);
                showSuggestBox = true;
            });

            suggestBox.append(suggestSet);
        });

        //// update selectables for cursor navigation
        selectables = searchBoxParent.find('.unibox-selectable');
        selectedEntryIndex = -1;

        // click handler on selectables
        selectables.click(function() {
            var q = jQuery(this).find('span').first().text();
            searchBox.val(q);
            var href = undefined;
            try {
                href = jQuery(this).find('a').attr('href');
            } catch (e) {}
            enterCallbackResult.call(this, q, href);
            hideSuggests();
        });

        // click handler on selectables
        searchBoxParent.find('.unibox-selectable .unibox-extra').click(function() {
            event.stopPropagation();
        });

        // trigger words / visualization
        if (data['words'].length > 0 && queryVisualizationHeadline.length > 0 && (instantVisualFeedback == 'all' || instantVisualFeedback == 'bottom')) {
            suggestBox.append('<h4>'+queryVisualizationHeadline+'</h4>');
            showSuggestBox = true;
        }

        var newIvfWords = [];

        jQuery.each(data['words'], function(key, word) {

            if ((instantVisualFeedback == 'all' || instantVisualFeedback == 'bottom')) {
                if (word['overlayImage'] != undefined) {
                    suggestBox.append('<img class="unibox-vis" src="'+ivfImagePath+word['overlayImage'] +'" style="background-image: url(\''+ivfImagePath+word['image']+'\');background-size: 75%;background-repeat: no-repeat;background-position: center;">');
                } else if (word['image'] != undefined) {
                    suggestBox.append('<img class="unibox-vis" src="'+ivfImagePath+word['image']+'">');
                }
            }

            var invisibleBox = searchBoxParent.find('#unibox-invisible');
            invisibleBox.html(searchString.replace(new RegExp(word['name'],'gi'),'<span>'+word['name']+'</span>'));

            //console.log(word['image']+' : '+jQuery.inArray(word['image'], ivfWords));

            // show visuals above search bar
            if ((instantVisualFeedback == 'all' || instantVisualFeedback == 'top') && jQuery.inArray(word['image'], ivfWords) == -1) {

                var span =  searchBoxParent.find('#unibox-invisible span')[0];
                if (span != undefined && word['name'].length > 0 && word['image'] != undefined) {
                    var posLeft = jQuery(span).position().left;

                    visImage = jQuery('<div class="unibox-ivf"><img src="'+ivfImagePath+word['image']+'" alt="'+word['name']+'"></div>');
                    visImage.css('left', getSearchBoxOffset().left + posLeft - 10);
                    visImage.css('top', getSearchBoxOffset().top - searchBox.outerHeight() - 80);
                    //searchBoxParent.find('#unibox').append(visImage);
                    searchBoxParent.append(visImage);
                    setTimeout(function() {searchBoxParent.find('.unibox-ivf').find('img').addClass('l'); }, 10);

                    //visImage.find('img').addClass('l');
                    newIvfWords.push(word['image']);
                }

            } else if (jQuery.inArray(word['image'], ivfWords) > -1) {
                newIvfWords.push(word['image']);
            }

        });

        ivfWords = newIvfWords;

        jQuery("img").error(function () {
            jQuery(this).hide();
        });

        //// position it
        suggestBox.css('left',getSearchBoxOffset().left);
        suggestBox.css('top',getSearchBoxOffset().top);

        //// show it
        if (showSuggestBox) {
            suggestBox.slideDown(animationSpeed, function() {
                //// re-position it (in some cases the slide down moves the search box and the suggest box is not aligned anymore)
                suggestBox.css('left',getSearchBoxOffset().left);
                suggestBox.css('top',getSearchBoxOffset().top);
            });
        } else {
            hideSuggests();
        }

    }

    function getSearchBoxOffset() {
        //return {left:searchBox.offset().left - searchBoxParent.find('#unibox').offset().left, top: searchBox.offset().top - searchBoxParent.find('#unibox').offset().top + searchBox.outerHeight()};
        return {left:searchBox.offset().left - searchBoxParent.offset().left, top: searchBox.offset().top - searchBoxParent.offset().top + searchBox.outerHeight()};
    }

    function updateIvf() {
        var shownWords = searchBoxParent.find('.unibox-ivf img').map(function(){return jQuery(this).attr('src');}).get();
        for (var i = 0; i < shownWords.length; i++) {
            if (jQuery.inArray(shownWords[i].replace(ivfImagePath,''),ivfWords) == -1) {
                searchBoxParent.find('.unibox-ivf:has(img[src*="'+shownWords[i]+'"])').remove();
            }
        }
    }

    function clearIvf() {
        ivfWords = [];
        searchBoxParent.find('.unibox-ivf').remove();
    }

    function scrollList(event) {

        if (searchBox.val().length <= 1) {
            clearIvf();
        }

        // return if NOT up or down is pressed
        if (event.keyCode != 38 && event.keyCode != 40 && event.keyCode != 13) {
            updateIvf();
            return;
        }

        // if up or down arrows are pressed move selected entry
        if (event.keyCode == 38 && selectedEntryIndex > 0) {
            selectedEntryIndex--;
        }
        else if (event.keyCode == 40) {
            selectedEntryIndex++;
        }

        // mark the selected selectable
        if (selectables.length > 0 && selectedEntryIndex > -1) {
            selectedEntryIndex = selectedEntryIndex % selectables.length;
            selectables.removeClass('active');
            var selected = jQuery(selectables[selectedEntryIndex]);

            selected.addClass('active');
        }

        if (event.keyCode == 13) {

            if (enterCallbackResult != undefined) {
                var selectedText = searchBox.val();
                var href = undefined;
                if (selectedEntryIndex != -1) {
                    selectedText = jQuery(searchBoxParent.find('.unibox-selectable.active span')[0]).text();
                    searchBox.val(selectedText);
                    try {
                        href = jQuery(searchBoxParent.find('.unibox-selectable.active')[0]).find('a').attr('href');
                    } catch (e) {}
                    enterCallbackResult.call(this, selectedText, href);
                }
            } else if (selectedEntryIndex != -1) {
                window.location.href = jQuery(searchBoxParent.find('.unibox-selectable.active')[0]).find('a').attr('href');
            }

            return false;
        }
    }

    // provide search suggests
    function searchSuggest(event) {

        // don't show suggests if alt + something is pressed
        if (lastKeyCode == 18) {
            lastKeyCode = event.keyCode;
            return;
        }

        lastKeyCode = event.keyCode;

        // scroll list when up or down is pressed
        if (event.keyCode == 38 || event.keyCode == 40 || event.keyCode == 13 || event.keyCode == 9) {
            return;
        }

        var inputText = searchBox.val();

        if (lastKeyCode == 46 && inputText.length == 0) {
            clearIvf();
        }

        if (inputText.length >= minChars) {
            jQuery.ajax(suggestUrl+encodeURIComponent(inputText),{dataType:'json', success: function(data) {
                updateSuggestBox(data);
            }});
        }

    }

    // return an object, through closure all methods keep bound to returned object
    return {
        updateSuggestUrl: function(newUrl) {
            suggestUrl = newUrl;
        },
        hideSuggestBox: function() {
            hideSuggests();
        },
        setIvfImagePath: function(path) {
            ivfImagePath = path;
            if (ivfImagePath.charAt(ivfImagePath.length-1) != '/') {
                ivfImagePath += '/';
            }
        },
        changeInstantVisualFeedbackState: function(state) {
            instantVisualFeedback = state;
        },
        init: function(searchBoxObject, options) {
            searchBox = searchBoxObject;
            searchBoxParent = searchBox.parent();
            highlight = options.highlight;
            extraHtml = options.extraHtml;
            suggestUrl = options.suggestUrl;
            ivfImagePath = options.ivfImagePath;
            throttleTime = options.throttleTime;
            animationSpeed = options.animationSpeed;
            minChars = options.minChars;
            enterCallback = options.enterCallback;
            enterCallbackResult = options.enterCallbackResult;
            placeholder = options.placeholder;
            instantVisualFeedback = options.instantVisualFeedback;
            queryVisualizationHeadline = options.queryVisualizationHeadline;

            // insert necessary values for inputfield
            searchBox.attr("autocomplete", "off");

            // position and size the suggest box
            suggestBox = jQuery('<div id="unibox-suggest-box"></div>');
            searchBoxParent.append(suggestBox);
            var pos = searchBoxParent.css('position');
            if (pos != 'absolute') {
                searchBoxParent.css('position','relative');
            }
            var borderSize = suggestBox.css('border-width').replace('px','');
            suggestBox.css('min-width', searchBox.outerWidth()-2*borderSize);
            suggestBox.css('max-width', options.maxWidth-2*borderSize);

            // add event listeners
            searchBox.keydown(scrollList);
            searchBox.keydown(throttle(searchSuggest,throttleTime));
            searchBox.keyup(hideSuggests);

            searchBox.blur(function() {
                suggestBox.slideUp(animationSpeed);
            });

            // click outside of suggest div closes it
            jQuery('html').click(function() {
                suggestBox.slideUp(animationSpeed);
            });

            suggestBox.click(function(event){
                event.stopPropagation();
            });

            // set placeholder if defined, remove input of the search box
            if (placeholder != undefined) {
                searchBox.attr('placeholder', placeholder);
                searchBox.val('');
            }

            // copy search box styles to an invisible element so we can determine the text width
            var invisible = jQuery('<div id="unibox-invisible">&nbsp;<span>&nbsp;</span></div>');
            searchBox.parent().append(invisible);

            if (instantVisualFeedback == 'none') {
                jQuery('#unibox-invisible').css('display','none');
            }
        }
    }
};

(function(jQuery) {

    jQuery.fn.unibox = function(options) {
        var searchBox = this;

        // settings with default options.
        var settings = jQuery.extend({
            // these are the defaults.
            suggestUrl: '',
            ivfImagePath: '',
            queryVisualizationHeadline: '',
            highlight: true,
            throttleTime: 50,
            animationSpeed: 300,
            instantVisualFeedback: 'all',
            enterCallback: undefined,
            enterCallbackResult: undefined,
            placeholder: undefined,
            extraHtml: undefined,
            minChars: 3,
            maxWidth: searchBox.outerWidth()
        }, options);

        var individualUnibox = new UniBox();
        individualUnibox.init(searchBox, settings);

        return individualUnibox;
    };

}(jQuery));