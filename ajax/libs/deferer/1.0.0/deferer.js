(function() {
  var config = window['_deferer'] || {};
  var blocked_hosts = config['hosts'];  // List of blocked hosts; defaults to reddit.com
  var redirect_url = config['redirect'] // URL to redirect blocked hosts to

  if (typeof blocked_hosts === 'undefined' || typeof blocked_hosts === null) {
    blocked_hosts = ['reddit.com'];
  }
  if (typeof redirect_url === 'undefined' || typeof redirect_url === null) {
    redirect_url = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
  }

  // Best guess at incoming referer host
  var refererHost = document.referrer.split('/')[2]

  blocked_hosts = blocked_hosts.map(function(host) { return host.replace('.', '\\.') })
  if (new RegExp(blocked_hosts.join("|")).test(refererHost)) {
    window.location.href = redirect_url;
  }
})();