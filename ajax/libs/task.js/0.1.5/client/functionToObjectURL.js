module.exports = function functionToObjectURL(func) {
  var blob,
      stringFunc = func.toString();
  stringFunc = stringFunc.substring(stringFunc.indexOf('{') + 1, stringFunc.lastIndexOf('}'));

  try {
    blob = new Blob([stringFunc], {
      'type': 'text/javascript'
    });
  } catch (error) {
    // Backwards-compatibility
    window.BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder;
    blob = new BlobBuilder();
    blob.append(stringFunc);
    blob = blob.getBlob();
  }

  return (window.URL || window.webkitURL).createObjectURL(blob);
};