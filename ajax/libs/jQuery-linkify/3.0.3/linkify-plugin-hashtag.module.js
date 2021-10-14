import { registerPlugin } from 'linkifyjs';

/**
	Quick Hashtag parser plugin for linkify
*/
var hashtag = function hashtag(_ref) {
  var scanner = _ref.scanner,
      parser = _ref.parser,
      utils = _ref.utils;
  // Various tokens that may compose a hashtag
  var _scanner$tokens = scanner.tokens,
      POUND = _scanner$tokens.POUND,
      DOMAIN = _scanner$tokens.DOMAIN,
      TLD = _scanner$tokens.TLD,
      LOCALHOST = _scanner$tokens.LOCALHOST,
      UNDERSCORE = _scanner$tokens.UNDERSCORE; // The start state

  var START_STATE = parser.start; // Create a new token that class that the parser emits when it finds a hashtag

  var Hashtag = utils.createTokenClass('hashtag', {
    isLink: true
  }); // Take or create a transition from start to the '#' sign (non-accepting)

  var HASH_STATE = START_STATE.tt(POUND); // Take transition from '#' to any text token to yield valid hashtag state

  var HASHTAG_STATE = HASH_STATE.tt(DOMAIN, Hashtag); // Now that we have the hashtag state, no need to create new states

  HASH_STATE.tt(TLD, HASHTAG_STATE);
  HASH_STATE.tt(LOCALHOST, HASHTAG_STATE); // Account for leading underscore (non-accepting unless followed by domain)

  var HASH_UNDERSCORE_STATE = HASH_STATE.tt(UNDERSCORE);
  HASH_UNDERSCORE_STATE.tt(UNDERSCORE, HASH_UNDERSCORE_STATE);
  HASH_UNDERSCORE_STATE.tt(DOMAIN, HASHTAG_STATE);
  HASH_UNDERSCORE_STATE.tt(TLD, HASHTAG_STATE);
  HASH_UNDERSCORE_STATE.tt(LOCALHOST, HASHTAG_STATE); // Continue the transitions

  HASHTAG_STATE.tt(UNDERSCORE, HASHTAG_STATE);
  HASHTAG_STATE.tt(DOMAIN, HASHTAG_STATE);
  HASHTAG_STATE.tt(TLD, HASHTAG_STATE);
  HASHTAG_STATE.tt(LOCALHOST, HASHTAG_STATE); // Trailing underscore is okay
};
registerPlugin('hashtag', hashtag);

export { hashtag };
