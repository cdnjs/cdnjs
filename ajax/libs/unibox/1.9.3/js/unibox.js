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

    // the vertical offset of the ivf images
    var ivfImageOffset = -80;

    // if an image is missing, hide it (undefined) or show a placeholder image
    var missingErrorImage;

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

    // show 'delete all' (x) button when focus hits back to input field
    var showDeleteAllButton = false;

    // sort suggests by this array, if empty, use given array order
    var suggestOrder = [];

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
        $.each(words, function(key, word) {
            if (word.length < 1) {
                return;
            }

            var matches = string.match(new RegExp("("+word+")",'gi'));
            if (matches != null) {
                for (var i = 0; i < matches.length; i++) {
                    var match = matches[i];
                    string = string.replace(new RegExp(match,'g'),'##'+key+"-"+i+'##');
                    markers['##'+key+"-"+i+'##'] = '<span>'+match+'</span>';
                }
            }

        });

        $.each(markers, function(marker, replacement) {
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
        var suggestOrderToUse = Object.keys(data['suggests']);
        if(suggestOrder && suggestOrder.length > 0){
            suggestOrderToUse = suggestOrder;
            jQuery.each(Object.keys(data['suggests']), function(i,o){if($.inArray(o, suggestOrderToUse) < 0)suggestOrderToUse.push(o)});
        }

        jQuery.each(suggestOrderToUse, function(idx, key) {
            var values = data['suggests'][key];
            if(!values)return true;
            var suggestSet = jQuery('<div class="unibox-suggest-'+key+'"></div>');

            if (key.replace(/_/,'').length > 0 && values.length > 0) {
                var keyNode = jQuery('<h4>'+key+'</h4>');
                suggestSet.append(keyNode);
            }

            jQuery.each(values, function(index, suggest) {

                var suggestLine = '<div class="unibox-selectable">';

                if (suggest['image'] != undefined) {
                    var imageUrl =  suggest['image'].length === 0 && missingErrorImage ? missingErrorImage : suggest['image'].length === 0 || suggest['image'].indexOf("/") === 0 || suggest['image'].indexOf("http") === 0?suggest['image']:ivfImagePath+suggest['image'];

                    suggestLine += '<div class="unibox-selectable-img-container"><img src="'+imageUrl+'"/></div>';
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
        selectables.mousedown(function() {
            var q = jQuery(this).text();
            searchBox.val(q);
            var href = undefined;
            try {
                href = jQuery(this).find('a').attr('href');
            } catch (e) {}
            if (enterCallbackResult != undefined) {
                enterCallbackResult.call(this, q, href);
            }
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
                    visImage.css('top', getSearchBoxOffset().top - searchBox.outerHeight() + ivfImageOffset);
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
            if(missingErrorImage){
                jQuery(this).attr('src', missingErrorImage);
            }else{
                jQuery(this).hide();
            }
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
            jQuery.ajax({
                url: suggestUrl+encodeURIComponent(inputText),
                dataType: 'json',
                success: function(data) {
                    updateSuggestBox(data);
                }
            });
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
            ivfImageOffset = options.ivfImageOffset;
            missingErrorImage = options.missingErrorImage;
            throttleTime = options.throttleTime;
            animationSpeed = options.animationSpeed;
            minChars = options.minChars;
            enterCallback = options.enterCallback;
            enterCallbackResult = options.enterCallbackResult;
            placeholder = options.placeholder;
            instantVisualFeedback = options.instantVisualFeedback;
            queryVisualizationHeadline = options.queryVisualizationHeadline;
            showDeleteAllButton = options.showDeleteAllButton;
            suggestOrder= options.suggestOrder;

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
            suggestBox.mouseenter(function(){suggestBox.find('.unibox-selectable.active').removeClass('active')});

            // click outside of suggest div closes it
            jQuery('html').click(function() {
                suggestBox.slideUp(animationSpeed);
            });

            suggestBox.click(function(event){
                event.stopPropagation();
            });

            // handling the placeholder
            // check if original input has placeholder attribute
            var originalPlaceholder = searchBox.attr('placeholder');
            // if so, then assign to placeholder and use from now on
            placeholder = originalPlaceholder && originalPlaceholder.length > 0 ? originalPlaceholder : placeholder;
            // if placeholder is now undefined and length > 0 go on, else no placeholder at all
            if(placeholder && placeholder.length > 0){
                // check if browser supports HTML5 placeholder
                var testInput = document.createElement('input');

                // emulate HTML5 placeholder behaviour
                if(!('placeholder' in testInput)){
                    searchBox.focus(function(){
                        var localPlaceholder = jQuery(this).attr('placeholder');
                        if ((localPlaceholder) && (localPlaceholder.length > 0) && (localPlaceholder != '') && jQuery(this).val() == localPlaceholder) {
                            jQuery(this).val('').removeClass('hasPlaceholder');
                        }
                    }).blur(function(){
                        var localPlaceholder = jQuery(this).attr('placeholder');
                        if ((localPlaceholder) && (localPlaceholder.length > 0) && (localPlaceholder != '') && (jQuery(this).val() == '' || jQuery(this).val() == localPlaceholder)) {
                            jQuery(this).val(localPlaceholder).addClass('hasPlaceholder');
                        }
                    });

                    // set placeholder if defined, remove input of the search box
                    searchBox.val(placeholder);
                }
                searchBox.attr('placeholder', placeholder);
            }

            // copy search box styles to an invisible element so we can determine the text width
            var invisible = jQuery('<div id="unibox-invisible">&nbsp;<span>&nbsp;</span></div>');
            searchBox.parent().append(invisible);

            // if showDeleteAllButton == true, prepare button
            if(showDeleteAllButton){
                var dab = jQuery('<div id="unibox-dab-holder"><div id="unibox-dab"></div></div>');
                searchBoxParent.append(dab);
                // Events:
                // if clicking the deleteAllButton erase the search field
                jQuery(dab).mousedown(function(e){
                    (e || window.event).stopPropagation();
                    searchBox.val('');
                    searchBox.focus();
                    return false;
                });
                searchBox.focus(function(){
                    if(searchBox.val().length>0){
                        dab.show();
                    }else{
                        dab.hide();
                    }
                }).blur(function(){
                    dab.hide();
                }).keydown(function(){
                    if(jQuery(this).val().length >0)jQuery(dab).show();
                });
                // CSS:
                // put some padding to the right of the search field
                var sbPaddingRight = parseInt(searchBox.css('paddingRight').replace('px','').trim());
                searchBox.css('paddingRight', (sbPaddingRight>25)?sbPaddingRight:25);
                // css for dab: respect border width and height of search field
                var heightOfSb = searchBox.outerHeight();
                var borderWidthOfSb = parseInt(searchBox.css('borderTopWidth').replace('px','').trim());
                dab.height(heightOfSb - (2*borderWidthOfSb));
                dab.css('marginTop', borderWidthOfSb);
                dab.css('marginRight', borderWidthOfSb);
            }

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
            ivfImageOffset: -80,
            missingErrorImage: undefined,
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
            maxWidth: searchBox.outerWidth(),
            showDeleteAllButton: false,
            suggestOrder: []
        }, options);

        var individualUnibox = new UniBox();
        individualUnibox.init(searchBox, settings);

        return individualUnibox;
    };

}(jQuery));