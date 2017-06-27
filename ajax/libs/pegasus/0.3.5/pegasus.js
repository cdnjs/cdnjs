// a   url (naming it a, because it will be reused to store callbacks)
// e   timeout error placeholder to avoid using var, not to be used
// xhr placeholder to avoid using var, not to be used
function pegasus(a, e, xhr) {
  xhr = new XMLHttpRequest();

  // Set URL
  xhr.open('GET', a);

  // Don't need a to store URL anymore
  // Reuse it to store callbacks
  a = [];

  pegasus.timeout && (xhr.timeout = pegasus.timeout);

  xhr.ontimeout = function (event) {
    e = event
  }

  xhr.onreadystatechange = xhr.then = function(onSuccess, onError, cb, data) {
    // Test if onSuccess is a function
    // Means that the user called xhr.then
    if (onSuccess && onSuccess.call) {
      a = [,onSuccess, onError];
    }

    // Test if there's a timeout error
    e && a[2] && a[2](e, xhr)

    // Test if request is complete
    if (xhr.readyState == 4) {
      // index will be:
      // 0 if undefined
      // 1 if status is between 200 and 399
      // 2 if status is over
      cb = a[0|xhr.status / 200];
      if (cb) {
        try {
          data = JSON.parse(xhr.responseText)
        } catch (e) {
          data = null
        }
        cb(data, xhr);
      }
    }
  };

  // Send the GET request
  xhr.send();

  // Return request
  return xhr;
}
