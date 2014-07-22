// author: Blair Vanderhoof
// https://github.com/blairvanderhoof/gist-embed
// version 2.0
(function($) {

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

  $.fn.gist = function() {
    return this.each(function() {
      var $elem = $(this),
        id,
        url,
        file,
        lines,
        highlightLines,
        hideFooterOption,
        hideLineNumbersOption,
        data = {};

      // make block level so loading text shows properly
      $elem.css('display', 'block');

      id = $elem.data('gist-id') || '';
      file = $elem.data('gist-file');
      hideFooterOption = $elem.data('gist-hide-footer') === true;
      hideLineNumbersOption = $elem.data('gist-hide-line-numbers') === true;
      lines = $elem.data('gist-line');
      highlightLines = $elem.data('gist-highlight-line');

      if (file) {
        data.file = file;
      }

      // if the id doesn't exist, then ignore the code block
      if (!id) return false;

      url = 'https://gist.github.com/' + id + '.json';

      // loading
      $elem.html('Loading gist ' + url + (data.file ? ', file: ' + data.file : '') + '...');

      // request the json version of this gist
      $.ajax({
        url: url,
        data: data,
        dataType: 'jsonp',
        timeout: 10000,
        success: function(response) {
          var linkTag,
            head,
            lineNumbers,
            highlightLineNumbers,
            $responseDiv;

          // the html payload is in the div property
          if (response && response.div) {
            // github returns /assets/embed-id.css now, but let's be sure about that
            if (response.stylesheet && response.stylesheet.indexOf('http') !== 0) {
              // add leading slash if missing
              if (response.stylesheet.indexOf('/') !== 0) {
                response.stylesheet = '/' + response.stylesheet;
              }
              response.stylesheet = 'https://gist.github.com' + response.stylesheet;
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

              // find all .line divs (acutal code lines) that match the highlightLines and add the highlight class
              $responseDiv.find('.line').each(function(index) {
                if ($.inArray(index + 1, highlightLineNumbers) !== -1) {
                  $(this).css({
                    'background-color': 'rgb(255, 255, 204)'
                  });
                }
              });
            }

            // if user provided a line param, get the line numbers baesed on the criteria
            if (lines) {
              lineNumbers = getLineNumbers(lines);

              // find all .line divs (acutal code lines) and remove them if they don't exist in the line param
              $responseDiv.find('.line').each(function(index) {
                if (($.inArray(index + 1, lineNumbers)) === -1) {
                  $(this).remove();
                }
              });

              // find all .line-number divs (numbers on the gutter) and remove them if they don't exist in the line param
              $responseDiv.find('.line-number').each(function(index) {
                if (($.inArray(index + 1, lineNumbers)) === -1) {
                  $(this).remove();
                }
              });
            }

            // option to remove footer
            if (hideFooterOption) {
              $responseDiv.find('.gist-meta').remove();
              
              // present a uniformed border when footer is hidden
              $responseDiv.find('.gist-data').css("border-bottom", "0px");
              $responseDiv.find('.gist-file').css("border-bottom", "1px solid #ddd");
            }

            // option to remove
            if (hideLineNumbersOption) {
              $responseDiv.find('.line-numbers').remove();
            }

          } else {
            $elem.html('Failed loading gist ' + url);
          }
        },
        error: function(jqXHR, textStatus) {
          $elem.html('Failed loading gist ' + url + ': ' + textStatus);
        }
      });

    });
  };

  $(function() {
    // find all elements containing "data-gist-id" attribute.
    $('[data-gist-id]').gist();
  });

})(jQuery);
