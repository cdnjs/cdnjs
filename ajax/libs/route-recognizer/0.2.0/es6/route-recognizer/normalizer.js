// Match percent-encoded values (e.g. %3a, %3A, %25)
var PERCENT_ENCODED_VALUES = /%[a-fA-F0-9]{2}/g;

function toUpper(str) { return str.toUpperCase(); }

// Turn percent-encoded values to upper case ("%3a" -> "%3A")
function percentEncodedValuesToUpper(string) {
  return string.replace(PERCENT_ENCODED_VALUES, toUpper);
}

// Normalizes percent-encoded values to upper-case and decodes percent-encoded
// values that are not reserved (like unicode characters).
// Safe to call multiple times on the same path.
function normalizePath(path) {
  return path.split('/')
             .map(normalizeSegment)
             .join('/');
}

function percentEncode(char) {
  return '%' + charToHex(char);
}

function charToHex(char) {
  return char.charCodeAt(0).toString(16).toUpperCase();
}

// Decodes percent-encoded values in the string except those
// characters in `reservedHex`, where `reservedHex` is an array of 2-character
// percent-encodings
function decodeURIComponentExcept(string, reservedHex) {
  if (string.indexOf('%') === -1) {
    // If there is no percent char, there is no decoding that needs to
    // be done and we exit early
    return string;
  }
  string = percentEncodedValuesToUpper(string);

  var result = '';
  var buffer = '';
  var idx = 0;
  while (idx < string.length) {
    var pIdx = string.indexOf('%', idx);

    if (pIdx === -1) { // no percent char
      buffer += string.slice(idx);
      break;
    } else { // found percent char
      buffer += string.slice(idx, pIdx);
      idx = pIdx + 3;

      var hex = string.slice(pIdx + 1, pIdx + 3);
      var encoded = '%' + hex;

      if (reservedHex.indexOf(hex) === -1) {
        // encoded is not in reserved set, add to buffer
        buffer += encoded;
      } else {
        result += decodeURIComponent(buffer);
        buffer = '';
        result += encoded;
      }
    }
  }
  result += decodeURIComponent(buffer);
  return result;
}

// Leave these characters in encoded state in segments
var reservedSegmentChars = ['%', '/'];
var reservedHex = reservedSegmentChars.map(charToHex);

function normalizeSegment(segment) {
  return decodeURIComponentExcept(segment, reservedHex);
}

var Normalizer = {
  normalizeSegment: normalizeSegment,
  normalizePath: normalizePath
};

export default Normalizer;
