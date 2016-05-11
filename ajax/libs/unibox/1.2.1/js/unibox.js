(function($) {
 
    $.fn.unibox = function(options) {
 
 		var searchBox = this;
 
 		// settings with default options.
        var settings = $.extend({
            // these are the defaults.
            suggestUrl: '',
			queryVisualizationHeadline: '',
			highlight: true,
			throttleTime: 300,
			animationSpeed: 300,
			instantVisualFeedback: 'all',
			enterCallback: undefined,
			minChars: 3,
			maxWidth: searchBox.outerWidth()
        }, options);
		
        UniBox.init(searchBox, settings);
 
        return this; 
    };
 
}(jQuery));


var UniBox = function() {
    //// common vars
    // div line height
    
    // index of selected entry
    var selectedEntryIndex = -1;
	
	// the search box
	var searchBox;
	
	// the suggest box
	var suggestBox;
	
	// the URL where to get the search suggests
	var suggestUrl = '';
    
	// the number of ms before the update of the search box is triggered
	var throttleTime;
	
	// the list of all selectable divs
	var selectables = [];
	
	// whether the search words should be highlighted in the results
	var highlight = true;
	
	// general animation speed
	var animationSpeed = 300;
	
	// the headline of the query visualization
	var queryVisualizationHeadline = '';
	
	// the minimum input before the suggest pops up
	var minChars = 2;
	
	// the action that should happen if enter is pressed
	var enterCallback;

	// the words that were highlighted above the search bar
	var ivfWords = [];
	
	// where to show the ivf
	var instantVisualFeedback = 'all';

    // hide the search suggests
    function hideSuggestBox(event) {
		
        if (event !== undefined) {
			
			var inputText = searchBox.val();

            // hide if tab or enter was pressed
            if (event.keyCode == 9 || event.keyCode == 13 || inputText.length < minChars) {
                suggestBox.slideUp(animationSpeed);
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
	        },
	        delay || 500);
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
			if (word.length < 2) {
				return;
			}
			//string = string.replace(new RegExp(word,'gi'),'<span>'+word+'</span>');			
			string = string.replace(new RegExp(word,'gi'),'##'+key+'##');
			markers['##'+key+'##'] = '<span>'+word+'</span>';			
		});
		
		$.each(markers, function(marker, replacement) {
			string = string.replace(new RegExp(marker,'gi'),replacement);
		});			
		
		return string;
	}
		
    // update suggest box when new data is given
    function updateSuggestBox(data){
		
		//data = JSON.parse(data);
		//console.log(data);
		
		var searchString = searchBox.val();
		
		//// fill the box
		suggestBox.html('');
		
		// suggest
		$.each(data['suggests'], function(key, values) {
			
	    	//console.log('key: ' + key);
			if (key.replace(/_/,'').length > 0 && values.length > 0) {
				var keyNode = $('<h4>'+key+'</h4>');
				suggestBox.append(keyNode);
			}
			
			$.each(values, function(index, suggest) {
				//console.log(suggest);
				
				var suggestLine = '<div class="unibox-selectable">';
				
				if (suggest['image'] != undefined) {
					suggestLine += '<img src="'+suggest['image']+'"/>';				
				}
				
				if (suggest['link'] != undefined) {
					suggestLine += '<a href="'+suggest['link']+'">';
					suggestLine += highlightSearchWords(suggest['name'],searchString);
					suggestLine += '</a>';
				} else {
					suggestLine += highlightSearchWords(suggest['name'],searchString);
				}
				
				suggestLine += '<div class="unibox-ca"></div></div>';
				
				var suggestNode = $(suggestLine);
				suggestBox.append(suggestNode);
			});
			
	    });

	    // click handler on selectables
		$('.unibox-selectable').click(function() {
			searchBox.val($(this).text());			
			enterCallback($(this).text());	
			hideSuggestBox();		
		});
		
		// trigger words / visualization
		if (data['words'].length > 0 && queryVisualizationHeadline.length > 0 && (instantVisualFeedback == 'all' || instantVisualFeedback == 'bottom')) {
			suggestBox.append('<h4>'+queryVisualizationHeadline+'</h4>');
		}
		
		$.each(data['words'], function(key, word) {

			//console.log(word);
			//console.log(ivfWords);

			if ((instantVisualFeedback == 'all' || instantVisualFeedback == 'bottom')) {
				if (word['overlayImage'] != undefined) {
					suggestBox.append('<img class="unibox-vis" src="'+word['overlayImage'] +'" style="background-image: url(\''+word['image']+'\');background-size: 75%;background-repeat: no-repeat;background-position: center;">');				
				} else {
					suggestBox.append('<img class="unibox-vis" src="'+word['image']+'">');
				}
			}

			var invisibleBox = $('#unibox-invisible');
			invisibleBox.html(searchString.replace(new RegExp(word['name'],'gi'),'<span>'+word['name']+'</span>'));

			// show visuals above search bar
			if ((instantVisualFeedback == 'all' || instantVisualFeedback == 'top') && jQuery.inArray(word['image'], ivfWords) == -1) {
	
				var span =  $('#unibox-invisible span')[0];
				if (span != undefined && word['name'].length > 0) {
					var posLeft = $(span).position().left;

					visImage = $('<div class="unibox-ivf"><img src="'+word['image']+'" alt="'+word['name']+'"></div>');
					visImage.css('left', searchBox.offset().left + posLeft - 10);
					visImage.css('top', searchBox.offset().top - 80);
			        $('body').append(visImage);
			        setTimeout(function() {$('.unibox-ivf').find('img').addClass('l'); }, 10);	

				}
		        //visImage.find('img').addClass('l');
		        ivfWords.push(word['image']);		        
			}			

		});
		
		$("img").error(function () {
            $(this).hide();
        });

		//// position it
		suggestBox.css('left',searchBox.offset().left);
		suggestBox.css('top',searchBox.offset().top+searchBox.outerHeight());
		
		//// show it
		suggestBox.slideDown(animationSpeed, function() {
			//// re-position it (in some cases the slide down moves the search box and the suggest box is not aligned anymore)
			suggestBox.css('left',searchBox.offset().left);
			suggestBox.css('top',searchBox.offset().top+searchBox.outerHeight());
		});

		//// update selectables for cursor navigation 
		selectables = $('.unibox-selectable');
		selectedEntryIndex = -1;
		
    }
    
    function clearIvf() {
		ivfWords = [];
		$('.unibox-ivf').remove();
    }

    function scrollList(event) {
		
    	if (searchBox.val().length <= 1) {
			clearIvf();
    	}

		// return if NOT up or down is pressed
		if (event.keyCode != 38 && event.keyCode != 40 && event.keyCode != 13) {
			
			if (event.keyCode == 46 || event.keyCode == 8) {
				clearIvf();
			}

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
		if (selectables.length > 0) {
			
			selectedEntryIndex = selectedEntryIndex % selectables.length;
			selectables.removeClass('active');
			var selected = $(selectables[selectedEntryIndex]);
			
			selected.addClass('active');
		
		}
		
		if (event.keyCode == 13) {
			
			if (enterCallback != undefined) {
				var selectedText = searchBox.val();
				if (selectedEntryIndex != -1) {
					selectedText = $($('.unibox-selectable.active')[0]).text();
				}
				enterCallback(selectedText);				
			} else if (selectedEntryIndex != -1) {
				window.location.href = $($('.unibox-selectable.active')[0]).find('a').attr('href');
			}
			
			return false;
		}
    }
		
    // provide search suggests
    function searchSuggest(event) {

		// scroll list when up or down is pressed
		if (event.keyCode == 38 || event.keyCode == 40 || event.keyCode == 13) {
			return;
		}
		
        var inputText = searchBox.val();
        
		if (inputText.length >= minChars) {
			$.ajax(suggestUrl+encodeURIComponent(inputText),{dataType:'json', success: function(data) {
				 updateSuggestBox(data);
			}});
		}
       
    }
    
    // return an object, through closure all methods keep bound to returned object
    return {
        init: function(searchBoxObject, options) {
            searchBox = searchBoxObject;
			highlight = options.highlight;
            suggestUrl = options.suggestUrl;
			throttleTime = options.throttleTime;
			animationSpeed = options.animationSpeed;
			minChars = options.minChars;
			enterCallback = options.enterCallback;
			instantVisualFeedback = options.instantVisualFeedback;
			queryVisualizationHeadline = options.queryVisualizationHeadline;
                       
            // insert necessary values for inputfield
            searchBox.attr("autocomplete", "off");

			// position and size the suggest box
            suggestBox = $('<div id="unibox-suggest-box"></div>');
			$('body').append(suggestBox);
			suggestBox.css('min-width', searchBox.outerWidth());
			suggestBox.css('max-width', options.maxWidth);
						
            // add event listeners
			searchBox.keydown(scrollList);
			searchBox.keydown(throttle(searchSuggest,throttleTime));
			searchBox.keydown(hideSuggestBox);
			searchBox.keyup(hideSuggestBox);
			
			// click outside of suggest div closes it
			$('html').click(function() {
				suggestBox.slideUp(animationSpeed);
			});
			
			suggestBox.click(function(event){
			    event.stopPropagation();
			});
			

			// copy search box styles to an invisible element so we can determine the text width
			var invisible = $('<div id="unibox-invisible">text whatever <span>this one</span></div>');
			searchBox.parent().append(invisible);

			console.log('unibox initialized');
        }
    }
}();
