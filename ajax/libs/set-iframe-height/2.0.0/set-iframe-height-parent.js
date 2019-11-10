'use strict';

(function () {
  'use strict';

  /************** EVENT BINDINGS **************/

  window.addEventListener('setIframeHeight', onSetIframeHeight);
  window.addEventListener('message', onMessage);

  /************** PUBLIC INTERFACE **************/

  var that = {
    setHeight: function setHeight(data) {
      data.height = parseInt(data.height, 10);
      triggerCustomEvent(window, 'setIframeHeight', data);
    }
  };

  var lastHeights = {};

  /************** PRIVATE VARS AND FUNCTIONS **************/

  function findIframeBySrc(src) {
    var bestMatchingIframe = null;

    document.querySelectorAll('iframe').forEach(function (iframe) {
      var iframeSrc = iframe.dataset.iframeAutoHeightCurrentSrc || iframe.src;
      if (iframeSrc) {
        iframeSrc = absolutizeUrl(iframeSrc);
        if (iframeSrc === src) {
          bestMatchingIframe = iframe;

          return false; //break loop
        }
      }
    });

    return bestMatchingIframe;
  }

  function findIframeById(iframeId) {
    var bestMatchingIframe = null;

    document.querySelectorAll('iframe').forEach(function (iframe) {
      if (!bestMatchingIframe && iframe.dataset.setIframeHeightId === iframeId) {
        bestMatchingIframe = iframe;
      }
    });

    return bestMatchingIframe;
  }

  function absolutizeUrl(url) {
    if (url.indexOf('/') === 0) {
      url = getHostForUrl(document.location.href) + url;
    }

    return url;
  }

  function getHostForUrl(url) {
    var matches = url.match(/https?:\/\/.[^/]+/) || [];
    return matches[0];
  }

  function normalizeUrl(url) {
    return url.replace(/^https?:\/\//, '//');
  }

  function onSetIframeHeight(e) {
    var data = e.detail;
    var iframe;

    iframe = findIframeById(data.iframeId);

    if (!iframe) {
      iframe = findIframeBySrc(data.iframeSrc);
    }

    if (!iframe && data.iframeReferrer) {
      iframe = findIframeBySrc(data.iframeReferrer);
    }

    if (iframe) {
      iframe.dataset.setIframeHeightId = data.iframeId;

      iframe.style.height = data.height + 'px';

      var urlHasChanged = normalizeUrl(iframe.dataset.iframeAutoHeightCurrentSrc || iframe.src) !== normalizeUrl(data.iframeSrc);

      iframe.dataset.iframeAutoHeightCurrentSrc = data.iframeSrc;

      var lastHeight = lastHeights[data.iframeId];
      var height = data.height;
      if (lastHeight === undefined) {
        triggerCustomEvent(window, 'setIframeHeight:determined', data);
      } else if (lastHeight > height) {
        triggerCustomEvent(window, 'setIframeHeight:shrinked', data);
      } else if (lastHeight < height) {
        triggerCustomEvent(window, 'setIframeHeight:enlarged', data);
      }

      lastHeights[data.iframeId] = height;

      if (window.history.replaceState && iframe.dataset.iframeAutoHeightDeepLinkPattern && urlHasChanged) {
        var parentUrl = absolutizeUrl(iframe.dataset.iframeAutoHeightDeepLinkPattern.replace(/%deepLinkIframeSrc%/, encodeURIComponent(data.iframeSrc)));
        if (normalizeUrl(document.location.href) !== normalizeUrl(parentUrl)) {
          window.history.replaceState({}, '', parentUrl);
          triggerCustomEvent(window, 'setIframeHeight:deepLink:changed', {
            childUrl: data.iframeSrc,
            parentUrl: parentUrl
          });
        }

        if (iframe.contentWindow && iframe.contentWindow.postMessage) {
          iframe.contentWindow.postMessage('setIframeHeight:deepLink:changed::{ "parentUrl": "' + parentUrl + '", "childUrl": "' + data.iframeSrc + '"}', '*');
        }
      }
    }
  }

  function onMessage(e) {
    var data = e.data;
    if (typeof data === 'string' && data.indexOf('::')) {
      var data = data.split('::');
      if (data.length === 2 && data[0] === 'setIframeHeight') {
        var params = JSON.parse(data[1]);
        that.setHeight(params);
      }
    }
  }

  function triggerCustomEvent(element, eventName, eventData) {
    var e = document.createEvent('CustomEvent');
    e.initCustomEvent(eventName, true, true, eventData);
    element.dispatchEvent(e);
  }

  return that;
})();