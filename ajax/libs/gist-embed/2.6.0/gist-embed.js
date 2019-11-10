/*
 * author: Blair Vanderhoof
 * https://github.com/blairvanderhoof/gist-embed
 * version 2.6.0
 */
(function($) {
  'use strict';

  function getLineNumbers(lineRangeString) {
    var lineNumbers = [], range, lineNumberSections;

    if (typeof lineRangeString === 'number') {
      lineNumbers.push(lineRangeString);
    } else {
      lineNumberSections = lineRangeString.split(',');

      for (var i = 0; i < lineNumberSections.length; i++) {
        range = lineNumberSections[i].split('-');
        if (range.length === 2) {
          for (var j = parseInt(range[0], 10); j <= range[1]; j++) {
            lineNumbers.push(j);
          }
        } else if (range.length === 1) {
          lineNumbers.push(parseInt(range[0], 10));
        }
      }
    }
    return lineNumbers;
  }
  
  //object to cache the calls made to the same gist-id
  var gistCache = {};
  
  $.fn.gist = function(callback) {
    return this.each(function() {
      var $elem = $(this),
        id,
        url,
        file,
        lines,
        loading,
        highlightLines,
        hideFooterOption,
        hideLineNumbersOption,
        showLoading,
        showSpinner,
        enableCache,
        data = {};

      // make block level so loading text shows properly
      $elem.css('display', 'block');

      id = $elem.data('gist-id') || '';
      file = $elem.data('gist-file');
      hideFooterOption = $elem.data('gist-hide-footer') === true;
      hideLineNumbersOption = $elem.data('gist-hide-line-numbers') === true;
      lines = $elem.data('gist-line');
      highlightLines = $elem.data('gist-highlight-line');
      showSpinner = $elem.data('gist-show-spinner') === true;
      if (showSpinner) {
        showLoading = false;
      } else {
        showLoading = $elem.data('gist-show-loading') !== undefined ?
          $elem.data('gist-show-loading') : true;
      }

      if (file) {
        data.file = file;
      }

      // if the id doesn't exist, then ignore the code block
      if (!id) {
        return false;
      }

      url = 'https://gist.github.com/' + id + '.json';
      enableCache = $elem.data('gist-enable-cache') === true || gistCache[url];
      loading = 'Loading gist ' + url + (data.file ? ', file: ' + data.file : '') + '...';

      // loading
      if (showLoading)  {
        $elem.html(loading);
      }

      // loading spinner
      if (showSpinner) {
        $elem.html('<img style="display:block;margin-left:auto;margin-right:auto"  alt="' + loading + '" src="https://assets-cdn.github.com/images/spinners/octocat-spinner-32.gif">');
      }
      
      function successCallback(response) {
        var linkTag,
            head,
            lineNumbers,
            highlightLineNumbers,
            $responseDiv;

          // the html payload is in the div property
          if (response && response.div) {
            // github returns /assets/embed-id.css now, but let's be sure about that
            if (response.stylesheet) {
              // github passes down html instead of a url for the stylehsheet now
              // parse off the href
              if (response.stylesheet.indexOf('<link') === 0) {
                response.stylesheet =
                  response.stylesheet
                    .replace(/\\/g,'')
                    .match(/href=\"([^\s]*)\"/)[1];
              } else if (response.stylesheet.indexOf('http') !== 0) {
                // add leading slash if missing
                if (response.stylesheet.indexOf('/') !== 0) {
                  response.stylesheet = '/' + response.stylesheet;
                }
                response.stylesheet = 'https://gist.github.com' + response.stylesheet;
              }
            }

            // add the stylesheet if it does not exist
            if (response.stylesheet && $('link[href="' + response.stylesheet + '"]').length === 0) {
              linkTag = document.createElement('link');
              head = document.getElementsByTagName('head')[0];

              linkTag.type = 'text/css';
              linkTag.rel = 'stylesheet';
              linkTag.href = response.stylesheet;
              head.insertBefore(linkTag, head.firstChild);
            }

            // refernce to div
            $responseDiv = $(response.div);

            // remove id for uniqueness constraints
            $responseDiv.removeAttr('id');

            $elem.html('').append($responseDiv);

            // option to highlight lines
            if (highlightLines) {
              highlightLineNumbers = getLineNumbers(highlightLines);

              // we need to set the line-data td to 100% so the highlight expands the whole line
              $responseDiv.find('td.line-data').css({
                'width': '100%'
              });

              // find all .js-file-line tds (actual code lines) that match the highlightLines and add the highlight class
              $responseDiv.find('.js-file-line').each(function(index) {
                if ($.inArray(index + 1, highlightLineNumbers) !== -1) {
                  $(this).css({
                    'background-color': 'rgb(255, 255, 204)'
                  });
                }
              });
            }

            // if user provided a line param, get the line numbers based on the criteria
            if (lines) {
              lineNumbers = getLineNumbers(lines);

              // find all trs containing code lines that don't exist in the line param
              $responseDiv.find('.js-file-line').each(function(index) {
                if (($.inArray(index + 1, lineNumbers)) === -1) {
                  $(this).parent().remove();
                }
              });
            }

            // option to remove footer
            if (hideFooterOption) {
              $responseDiv.find('.gist-meta').remove();

              // present a uniformed border when footer is hidden
              $responseDiv.find('.gist-data').css('border-bottom', '0px');
              $responseDiv.find('.gist-file').css('border-bottom', '1px solid #ddd');
            }

            // option to remove
            if (hideLineNumbersOption) {
              $responseDiv.find('.js-line-number').remove();
            }

          } else {
            $elem.html('Failed loading gist ' + url);
          }
      }
      
      function errorCallBack(textStatus) {
        $elem.html('Failed loading gist ' + url + ': ' + textStatus);
      }
      
      function completeCallBack() {
        if (typeof callback === 'function') {
            callback();
        } 
      }
      // request the json version of this gist
      $.ajax({
        url: url,
        data: data,
        dataType: 'jsonp',
        timeout: 20000,
        beforeSend : function() {
            // option to enable cacheing of the gists
            if (enableCache) {
                if (gistCache[url]) {
                    // loading the response from cache and preventing the ajax call
                    gistCache[url].then(function(response) {
                        successCallback(response);
                        completeCallBack();
                    }, function(errorStatus) {
                        errorCallBack(errorStatus);
                    });
                    return false;
                } else {
                    // saving the promise for the requested json as a proxy for the actuall response
                    gistCache[url] = $.Deferred();
                }
            }
        },
        success: function(response) {
            if (enableCache) {
                if (gistCache[url]) {
                    gistCache[url].resolve(response);
                }
            }
            successCallback(response);
        },
        error: function(jqXHR, textStatus) {
           errorCallBack(textStatus);
        },
        complete: function() {
          completeCallBack();
        }
      });

    });
  };

  $(function() {
    // find all elements containing "data-gist-id" attribute.
    $('[data-gist-id]').gist();
  });

})(jQuery);
