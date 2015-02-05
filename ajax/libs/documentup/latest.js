this.DocumentUp = {};

DocumentUp.document = function (opts) {
  var repo;
  if ("string" === typeof opts) {
    repo = opts;
    opts = null;
  } else {
    repo = opts.repo;
    delete opts.repo;
  }

  window.callback = function (resp) {
    if (resp.status === 200) {
      document.open();
      document.write(resp.html);
      document.close();
      if (opts && opts.afterRender && typeof opts.afterRender === "function")
        opts.afterRender()
    }
  }

  var script = document.createElement('script');
  script.src = 'http://documentup.com/'+repo
  if (opts)
    script.src += "?config="+encodeURIComponent(JSON.stringify(opts))+'&callback=callback';
  else
    script.src += "?callback=callback";

  document.getElementsByTagName('head')[0].appendChild(script);
}