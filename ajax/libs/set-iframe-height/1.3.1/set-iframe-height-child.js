(function($) {
  'use strict';

  if (!window.parent || parent === self) {
    return;
  }

  var iframeId = parseInt(Math.random() * 99999999);

  try {
    iframeId = (self.frameElement && self.frameElement.getAttribute('data-set-iframe-height_id')) || iframeId;
  } catch (e) {}

  $(window).bind('message', onMessage);

  function postCurrentHeight() {
    postHeight(getDocumentHeight());
  }

  function getDocumentHeight() {
    var D = document;

    var matches = navigator.userAgent.match(/MSIE (\d)/);
    if (matches && parseInt(matches[1], 10) <=10) {

      return Math.max(D.body.scrollHeight, D.documentElement.scrollHeight);
    }

    return Math.min(
      Math.max(D.body.offsetHeight, D.documentElement.offsetHeight),
      Math.max(
        Math.max(D.body.scrollHeight, D.documentElement.scrollHeight),
        Math.max(D.body.clientHeight, D.documentElement.clientHeight)
      )
    );
  }

  function postHeight(height) {
    if (parent.postMessage) {
      parent.postMessage('setIframeHeight::{ "iframeSrc": "'+document.location.href+'", "iframeId": "'+iframeId+'", "iframeReferrer": "'+document.referrer+'", "height":'+height+' }', '*');

      // amp-iframe resize request (https://github.com/ampproject/amphtml/blob/master/extensions/amp-iframe/amp-iframe.md#-amp-iframe)
      parent.postMessage({
        sentinel: 'amp',
        type: 'embed-size',
        height: height
      }, '*');
    }
  }

  function onMessage(e) {
    var data = e.originalEvent.data;
    if (data.indexOf('::')) {
      var data = data.split('::');
      if (data.length === 2) {
        var params;
        try {
          params = $.parseJSON(data[1])
        } catch (err) { };

        if (params && params !== data[1]) {
          var eventName = data[0];
          switch (eventName) {
            case 'setIframeHeight:deepLink:changed':
              $(window).trigger('setIframeHeight:deepLink:changed', params);
              break;
          }
        }
      }
    }
  }

  setInterval(postCurrentHeight, 350);
  postCurrentHeight();
})(jQuery);