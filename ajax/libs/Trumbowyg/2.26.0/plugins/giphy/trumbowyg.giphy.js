(function ($) {
  'use strict';

  $.extend(true, $.trumbowyg, {
    langs: {
      // jshint camelcase:false
      en: {
        giphy: 'Insert GIF',
      },
      sl: {
        giphy: 'Vstavi GIF',
      },
      by: {
        giphy: 'Уставіць GIF',
      },
      et: {
        giphy: 'Sisesta GIF',
      },
      fr: {
        giphy: 'Insérer un GIF',
      },
      hu: {
        giphy: 'GIF beszúrás',
      },
      ru: {
        giphy: 'Вставить GIF',
      },
      tr: {
        giphy: 'GIF ekle',
      },
      // jshint camelcase:true
    }
  });

  var giphyLogo = '<svg viewBox="0 0 231 53" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2"><path d="M48.32 22.386c0-1.388-.252-1.892-1.767-1.85-3.448.126-6.855.042-10.303.042H25.443c-.927 0-1.346.211-1.305 1.22.085 2.86.085 5.72.043 8.58 0 .883.252 1.169 1.169 1.135 2.018-.084 3.995-.042 6.014 0 1.64 0 4.164-.546 4.752.252.841 1.169.421 3.364.337 5.089-.043.547-.547 1.304-1.094 1.598-2.692 1.556-5.678 2.018-8.747 1.892-5.342-.21-9.336-2.439-11.481-7.527-1.388-3.364-1.725-6.855-1.01-10.43 1.01-4.963 3.407-8.747 8.58-10.051 5.215-1.305 10.136-.547 14.467 2.817 1.219.967 1.798.715 2.691-.294 1.514-1.724 3.154-3.322 4.753-4.963 1.892-1.933 1.892-1.892-.169-3.7C38.429.813 31.238-.617 23.5.224 12.818 1.393 5.248 6.658 1.59 17.045-.177 22.008-.428 27.097.623 32.227c1.682 7.914 5.551 14.12 13.289 17.368 6.898 2.901 14.046 3.448 21.321 1.598 4.331-1.093 8.411-2.608 11.354-6.223 1.136-1.388 1.725-2.902 1.682-4.71l.043-17.873.008-.001zm125.153 3.784l.042-23.046c0-1.136-.168-1.598-1.472-1.556a238.02 238.02 0 0 1-11.017 0c-1.136-.042-1.439.337-1.439 1.439v15.645c0 1.345-.421 1.556-1.641 1.556a422.563 422.563 0 0 0-14.593 0c-1.262.042-1.472-.421-1.439-1.556l.043-15.813c0-.926-.169-1.304-1.17-1.262h-11.513c-.927 0-1.304.169-1.304 1.22v46.764c0 .967.252 1.262 1.219 1.262h11.512c1.169.042 1.262-.462 1.262-1.388l-.042-15.644c0-1.053.251-1.346 1.304-1.346h15.14c1.22 0 1.388.421 1.388 1.472l-.042 15.477c0 1.093.21 1.472 1.388 1.439 3.615-.085 7.233-.085 10.807 0 1.304.042 1.598-.337 1.598-1.598l-.042-23.047.011-.018zM106.565 1.654c-8.369-.211-16.728-.126-25.065-.211-1.346 0-1.767.337-1.767 1.724l.043 23.004v23.215c0 1.009.168 1.439 1.304 1.387a271.22 271.22 0 0 1 11.691 0c1.094 0 1.346-.336 1.346-1.345l-.042-10.64c0-1.052.294-1.345 1.345-1.345 3.322.042 6.645.085 9.967-.085 4.407-.21 8.621-1.219 12.111-4.12 5.551-4.584 7.613-12.701 5.131-20.061-2.313-6.561-8.747-11.354-16.064-11.522v-.001zm-3.028 24.013c-2.818.042-5.594-.043-8.411.042-1.169.042-1.439-.378-1.345-1.439.084-1.556 0-3.069 0-4.626v-5.131c-.043-.841.251-1.094 1.052-1.052 2.986.042 5.929-.085 8.915.042 3.616.126 5.887 2.692 5.846 6.266-.126 3.658-2.313 5.846-6.055 5.887l-.002.011zM229.699 1.569c-4.458 0-8.915-.042-13.415.043-.629 0-1.472.503-1.85 1.052a505.695 505.695 0 0 0-8.957 14.214c-.884 1.472-1.22 1.169-1.977-.084l-8.496-14.089c-.503-.841-1.052-1.136-2.018-1.136l-13.078.043c-.462 0-.967.125-1.439.21.21.378.378.799.629 1.169l17.412 27.167c.462.715.715 1.682.757 2.524v16.653c0 1.052.168 1.514 1.388 1.472 3.784-.084 7.57-.084 11.354 0 1.136.043 1.304-.377 1.304-1.387l-.042-8.58c0-2.734-.084-5.51.042-8.243.043-.926.337-1.933.841-2.649l18.167-27.041c.252-.337.337-.758.547-1.17a3.636 3.636 0 0 0-1.169-.168zM70.104 2.661c0-1.009-.294-1.219-1.262-1.219H57.69c-1.262-.043-1.472.377-1.472 1.513l.042 23.004v23.34c0 1.053.126 1.514 1.346 1.473 3.7-.085 7.444-.043 11.152 0 .966 0 1.387-.085 1.387-1.262l-.042-46.857.001.008z" fill="currentColor" fill-rule="nonzero"/></svg>'; // jshint ignore:line

  var CANCEL_EVENT = 'tbwcancel';

  // Throttle helper
  function trumbowygThrottle(callback, delay) {
    var last;
    var timer;

    return function () {
      var context = this;
      var now = +new Date();
      var args = arguments;

      if (last && now < last + delay) {
        clearTimeout(timer);
        timer = setTimeout(function () {
          last = now;
          callback.apply(context, args);
        }, delay);
      } else {
        last = now;
        callback.apply(context, args);
      }
    };
  }

  // Fills modal with response gifs
  function renderGifs(response, $giphyModal, trumbowyg, mustEmpty) {
    var width = ($giphyModal.width() - 20) / 3;

    var html = response.data
      .filter(function (gifData) {
        // jshint camelcase:false
        var downsized = gifData.images.downsized || gifData.images.downsized_medium;
        // jshint camelcase:true
        return !!downsized.url;
      })
      .map(function (gifData) {
        // jshint camelcase:false
        var downsized = gifData.images.downsized || gifData.images.downsized_medium;
        // jshint camelcase:true
        var image = downsized,
            imageRatio = image.height / image.width,
            altText = gifData.title;

        var imgHtml = '<img src=' + image.url + ' width="' + width + '" height="' + imageRatio * width + '" alt="' + altText + '" loading="lazy" />';
        return '<div class="img-container">' + imgHtml + '</div>';
      })
      .join('')
    ;

    if (mustEmpty === true) {
      if (html.length === 0) {
        if ($('.' + trumbowyg.o.prefix + 'giphy-no-result', $giphyModal).length > 0) {
          return;
        }

        html = '<img class="' + trumbowyg.o.prefix + 'giphy-no-result" src="' + trumbowyg.o.plugins.giphy.noResultGifUrl + '"/>';
      }

      $giphyModal.empty();
    }
    $giphyModal.append(html);

    // Remove gray overlay on image load
    // moved here from inline callback definition due to CSP issue
    // Note: this is being done post-factum because load event doesn't bubble up and so can't be delegated
    var addLoadedClass = function (img) { img.classList.add('tbw-loaded'); };
    $('img', $giphyModal).each(function (){
      var img = this;
      if (img.complete){ // images load instantly when cached and esp. when loaded in previous modal open
        addLoadedClass(img);
      } else {
        img.addEventListener('load', function(){ addLoadedClass(this); });
      }
    });

    $('img', $giphyModal).on('click', function () {
      var src = $(this).attr('src'),
          alt = $(this).attr('alt');
      trumbowyg.restoreRange();
      trumbowyg.execCmd('insertImage', src, false, true);

      // relay alt tag into inserted image
      if (alt){
        var $img = $('img[src="' + src + '"]:not([alt])',trumbowyg.$box);
        $img.attr('alt', alt);
        // Note: This seems to fire relatively early and could be wrapped in a setTimeout if needed
        trumbowyg.syncCode();
      }
      $('img', $giphyModal).off();
      trumbowyg.closeModal();
    });
  }

  var defaultOptions = {
    rating: 'g',
    apiKey: null,
    throttleDelay: 300,
    noResultGifUrl: 'https://media.giphy.com/media/2Faz9FbRzmwxY0pZS/giphy.gif'
  };

  // Add dropdown with font sizes
  $.extend(true, $.trumbowyg, {
    plugins: {
      giphy: {
        init: function (trumbowyg) {
          trumbowyg.o.plugins.giphy = $.extend({},
            defaultOptions,
            trumbowyg.o.plugins.giphy || {}
          );

          trumbowyg.addBtnDef('giphy', {
            fn: function() {
              if (trumbowyg.o.plugins.giphy.apiKey === null) {
                throw new Error('You must set a Giphy API Key');
              }

              var BASE_URL = 'https://api.giphy.com/v1/gifs/search?api_key=' + trumbowyg.o.plugins.giphy.apiKey + '&rating=' + trumbowyg.o.plugins.giphy.rating,
                  DEFAULT_URL = BASE_URL.replace('/search', '/trending');
              var previousAjaxCall = {abort: function () {}};
              var prefix = trumbowyg.o.prefix;

              // Create and open the modal
              var searchInput = '<input name="" class="' + prefix + 'giphy-search" placeholder="Search a GIF" autofocus="autofocus">',
                  closeButton = '<button class="' + prefix + 'giphy-close" title="' + trumbowyg.lang.close + '"><svg><use xlink:href="' + trumbowyg.svgPath + '#' + prefix + 'close"/></svg></button>',
                  poweredByGiphy = '<div class="' + prefix + 'powered-by-giphy"><span>Powered by</span>' + giphyLogo + '</div>',
                  giphyModalHtml = searchInput + closeButton + poweredByGiphy + '<div class="' + prefix + 'giphy-modal-scroll"><div class="' + prefix + 'giphy-modal"></div></div>';

              trumbowyg
                .openModal(null, giphyModalHtml, false)
                .one(CANCEL_EVENT, function () {
                  try {
                    previousAjaxCall.abort();
                  } catch (e) {}

                  trumbowyg.closeModal();
                });

              var $giphyInput = $('.' + prefix + 'giphy-search'),
                  $giphyClose = $('.' + prefix + 'giphy-close'),
                  $giphyModal = $('.' + prefix + 'giphy-modal');

              var ajaxError = function () {
                if (!navigator.onLine && !$('.' + prefix + 'giphy-offline', $giphyModal).length) {
                  $giphyModal.empty();
                  $giphyModal.append('<p class="' + prefix + 'giphy-offline">You are offline</p>');
                }
              };

              // Load trending gifs as default
              $.ajax({
                url: DEFAULT_URL,
                dataType: 'json',

                success: function(response) {
                  renderGifs(response, $giphyModal, trumbowyg, true);
                },
                error: ajaxError
              });

              var searchGifsOnInput = function () {
                var query = $giphyInput.val();

                if (query.length === 0) {
                  return;
                }

                try {
                  previousAjaxCall.abort();
                } catch (e) {}

                previousAjaxCall = $.ajax({
                  url: BASE_URL + '&q=' + encodeURIComponent(query),
                  dataType: 'json',

                  success: function(response) {
                    renderGifs(response, $giphyModal, trumbowyg, true);
                  },
                  error: ajaxError
                });
              };
              var throttledInputRequest = trumbowygThrottle(searchGifsOnInput, trumbowyg.o.plugins.giphy.throttleDelay);

              $giphyInput.on('input', throttledInputRequest);
              $giphyInput.focus();

              $giphyClose.one('click', function() {
                $giphyModal.trigger(CANCEL_EVENT);
              });
            },
          });
        }
      }
    }
  });
})(jQuery);
