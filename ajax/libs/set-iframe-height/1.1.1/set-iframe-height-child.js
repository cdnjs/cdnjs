(function() {
  if (!window.parent) {
    return;
  }

  function postCurrentHeight() {
    var currentHeight = document.documentElement.scrollHeight;
    postHeight(currentHeight);
  }

  function isSameHostAsParent() {
    return getHostForUrl(document.location.href) === getHostForUrl(parent.location.href);
  }

  function getHostForUrl(url) {
    return url.match(/https?:\/\/.[^/]+/)[0];
  }

  function postHeight(height) {
    if (parent.postMessage) {
      parent.postMessage('setIframeHeight::{ "iframeSrc": "'+document.location.href+'", "iframeReferrer": "'+document.referrer+'", "height":'+height+' }', '*');
    }
    else if (isSameHostAsParent() && parent.setIframeHeight) {
      parent.setIframeHeight.setHeight(document.location.href, height, document.referrer);
    }
  }

  setInterval(postCurrentHeight, 500);
  postHeight(0);
})();