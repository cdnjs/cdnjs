import {
  __commonJS,
  __name
} from "./chunk-T24N4LJA.mjs";

// ../../node_modules/.pnpm/@braintree+sanitize-url@6.0.2/node_modules/@braintree/sanitize-url/dist/index.js
var require_dist = __commonJS({
  "../../node_modules/.pnpm/@braintree+sanitize-url@6.0.2/node_modules/@braintree/sanitize-url/dist/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.sanitizeUrl = void 0;
    var invalidProtocolRegex = /^([^\w]*)(javascript|data|vbscript)/im;
    var htmlEntitiesRegex = /&#(\w+)(^\w|;)?/g;
    var htmlCtrlEntityRegex = /&(newline|tab);/gi;
    var ctrlCharactersRegex = /[\u0000-\u001F\u007F-\u009F\u2000-\u200D\uFEFF]/gim;
    var urlSchemeRegex = /^.+(:|&colon;)/gim;
    var relativeFirstCharacters = [".", "/"];
    function isRelativeUrlWithoutProtocol(url) {
      return relativeFirstCharacters.indexOf(url[0]) > -1;
    }
    __name(isRelativeUrlWithoutProtocol, "isRelativeUrlWithoutProtocol");
    function decodeHtmlCharacters(str) {
      return str.replace(htmlEntitiesRegex, function(match, dec) {
        return String.fromCharCode(dec);
      });
    }
    __name(decodeHtmlCharacters, "decodeHtmlCharacters");
    function sanitizeUrl(url) {
      var sanitizedUrl = decodeHtmlCharacters(url || "").replace(htmlCtrlEntityRegex, "").replace(ctrlCharactersRegex, "").trim();
      if (!sanitizedUrl) {
        return "about:blank";
      }
      if (isRelativeUrlWithoutProtocol(sanitizedUrl)) {
        return sanitizedUrl;
      }
      var urlSchemeParseResults = sanitizedUrl.match(urlSchemeRegex);
      if (!urlSchemeParseResults) {
        return sanitizedUrl;
      }
      var urlScheme = urlSchemeParseResults[0];
      if (invalidProtocolRegex.test(urlScheme)) {
        return "about:blank";
      }
      return sanitizedUrl;
    }
    __name(sanitizeUrl, "sanitizeUrl");
    exports.sanitizeUrl = sanitizeUrl;
  }
});

export {
  require_dist
};
