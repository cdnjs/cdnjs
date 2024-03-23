import {
  __commonJS,
  __name
} from "./chunk-N5XDFYNB.mjs";

// ../../node_modules/.pnpm/@braintree+sanitize-url@7.0.1/node_modules/@braintree/sanitize-url/dist/constants.js
var require_constants = __commonJS({
  "../../node_modules/.pnpm/@braintree+sanitize-url@7.0.1/node_modules/@braintree/sanitize-url/dist/constants.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.BLANK_URL = exports.relativeFirstCharacters = exports.urlSchemeRegex = exports.ctrlCharactersRegex = exports.htmlCtrlEntityRegex = exports.htmlEntitiesRegex = exports.invalidProtocolRegex = void 0;
    exports.invalidProtocolRegex = /^([^\w]*)(javascript|data|vbscript)/im;
    exports.htmlEntitiesRegex = /&#(\w+)(^\w|;)?/g;
    exports.htmlCtrlEntityRegex = /&(newline|tab);/gi;
    exports.ctrlCharactersRegex = /[\u0000-\u001F\u007F-\u009F\u2000-\u200D\uFEFF]/gim;
    exports.urlSchemeRegex = /^.+(:|&colon;)/gim;
    exports.relativeFirstCharacters = [".", "/"];
    exports.BLANK_URL = "about:blank";
  }
});

// ../../node_modules/.pnpm/@braintree+sanitize-url@7.0.1/node_modules/@braintree/sanitize-url/dist/index.js
var require_dist = __commonJS({
  "../../node_modules/.pnpm/@braintree+sanitize-url@7.0.1/node_modules/@braintree/sanitize-url/dist/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.sanitizeUrl = void 0;
    var constants_1 = require_constants();
    function isRelativeUrlWithoutProtocol(url) {
      return constants_1.relativeFirstCharacters.indexOf(url[0]) > -1;
    }
    __name(isRelativeUrlWithoutProtocol, "isRelativeUrlWithoutProtocol");
    function decodeHtmlCharacters(str) {
      var removedNullByte = str.replace(constants_1.ctrlCharactersRegex, "");
      return removedNullByte.replace(constants_1.htmlEntitiesRegex, function(match, dec) {
        return String.fromCharCode(dec);
      });
    }
    __name(decodeHtmlCharacters, "decodeHtmlCharacters");
    function sanitizeUrl(url) {
      if (!url) {
        return constants_1.BLANK_URL;
      }
      var charsToDecode;
      var decodedUrl = url;
      do {
        decodedUrl = decodeHtmlCharacters(decodedUrl).replace(constants_1.htmlCtrlEntityRegex, "").replace(constants_1.ctrlCharactersRegex, "").trim();
        charsToDecode = decodedUrl.match(constants_1.ctrlCharactersRegex) || decodedUrl.match(constants_1.htmlEntitiesRegex) || decodedUrl.match(constants_1.htmlCtrlEntityRegex);
      } while (charsToDecode && charsToDecode.length > 0);
      var sanitizedUrl = decodedUrl;
      if (!sanitizedUrl) {
        return constants_1.BLANK_URL;
      }
      if (isRelativeUrlWithoutProtocol(sanitizedUrl)) {
        return sanitizedUrl;
      }
      var urlSchemeParseResults = sanitizedUrl.match(constants_1.urlSchemeRegex);
      if (!urlSchemeParseResults) {
        return sanitizedUrl;
      }
      var urlScheme = urlSchemeParseResults[0];
      if (constants_1.invalidProtocolRegex.test(urlScheme)) {
        return constants_1.BLANK_URL;
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
