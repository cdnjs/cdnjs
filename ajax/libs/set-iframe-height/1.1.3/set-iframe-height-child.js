(function() {
  if (!window.parent || parent === self) {
    return;
  }

  function postCurrentHeight() {
    var D = document;
    var height = Math.min(
      Math.max(D.body.offsetHeight, D.documentElement.offsetHeight),
      Math.max(
        Math.max(D.body.scrollHeight, D.documentElement.scrollHeight),
        Math.max(D.body.clientHeight, D.documentElement.clientHeight)
      )
    );
    postHeight(height);
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

  setInterval(postCurrentHeight, 350);
  postCurrentHeight();
})();