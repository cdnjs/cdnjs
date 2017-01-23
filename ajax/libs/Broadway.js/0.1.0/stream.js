'use strict';

var Stream = (function stream() {
  function constructor(url) {
    this.url = url;
  }
  
  constructor.prototype = {
    readAll: function(progress, complete) {
      var xhr = new XMLHttpRequest();
      var async = true;
      xhr.open("GET", this.url, async);
      xhr.responseType = "arraybuffer";
      if (progress) {
        xhr.onprogress = function (event) {
          progress(xhr.response, event.loaded, event.total);
        };
      }
      xhr.onreadystatechange = function (event) {
        if (xhr.readyState === 4) {
          complete(xhr.response);
          // var byteArray = new Uint8Array(xhr.response);
          // var array = Array.prototype.slice.apply(byteArray);
          // complete(array);
        }
      }
      xhr.send(null);
    }
  };
  return constructor;
})();


