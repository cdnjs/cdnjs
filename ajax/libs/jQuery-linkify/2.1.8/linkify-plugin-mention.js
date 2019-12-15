'use strict';

;(function (linkify) {
	var plugin = function () {
		'use strict';

		/**
  	Mention parser plugin for linkify
  */

		function mention(linkify) {
			var TT = linkify.scanner.TOKENS; // Text tokens
			var _linkify$parser = linkify.parser,
			    MT = _linkify$parser.TOKENS,
			    State = _linkify$parser.State; // Multi tokens, state

			var MultiToken = MT.Base;
			var S_START = linkify.parser.start;

			var TT_DOMAIN = TT.DOMAIN;
			var TT_LOCALHOST = TT.LOCALHOST;
			var TT_NUM = TT.NUM;
			var TT_SLASH = TT.SLASH;
			var TT_TLD = TT.TLD;
			var TT_UNDERSCORE = TT.UNDERSCORE;
			var TT_DOT = TT.DOT;
			var TT_AT = TT.AT;

			function MENTION(value) {
				this.v = value;
			}

			linkify.inherits(MultiToken, MENTION, {
				type: 'mention',
				isLink: true,
				toHref: function toHref() {
					return '/' + this.toString().substr(1);
				}
			});

			var S_AT = S_START.jump(TT.AT); // @
			var S_AT_SYMS = new State();
			var S_MENTION = new State(MENTION);
			var S_MENTION_DIVIDER = new State();
			var S_MENTION_DIVIDER_SYMS = new State();

			// @_,
			S_AT.on(TT_UNDERSCORE, S_AT_SYMS);

			//  @_*
			S_AT_SYMS.on(TT_UNDERSCORE, S_AT_SYMS).on(TT_DOT, S_AT_SYMS);

			// Valid mention (not made up entirely of symbols)
			S_AT.on(TT_DOMAIN, S_MENTION).on(TT_LOCALHOST, S_MENTION).on(TT_TLD, S_MENTION).on(TT_NUM, S_MENTION);

			S_AT_SYMS.on(TT_DOMAIN, S_MENTION).on(TT_LOCALHOST, S_MENTION).on(TT_TLD, S_MENTION).on(TT_NUM, S_MENTION);

			// More valid mentions
			S_MENTION.on(TT_DOMAIN, S_MENTION).on(TT_LOCALHOST, S_MENTION).on(TT_TLD, S_MENTION).on(TT_NUM, S_MENTION).on(TT_UNDERSCORE, S_MENTION);

			// Mention with a divider
			S_MENTION.on(TT_SLASH, S_MENTION_DIVIDER).on(TT_DOT, S_MENTION_DIVIDER).on(TT_AT, S_MENTION_DIVIDER);

			// Mention _ trailing stash plus syms
			S_MENTION_DIVIDER.on(TT_UNDERSCORE, S_MENTION_DIVIDER_SYMS);
			S_MENTION_DIVIDER_SYMS.on(TT_UNDERSCORE, S_MENTION_DIVIDER_SYMS);

			// Once we get a word token, mentions can start up again
			S_MENTION_DIVIDER.on(TT_DOMAIN, S_MENTION).on(TT_LOCALHOST, S_MENTION).on(TT_TLD, S_MENTION).on(TT_NUM, S_MENTION);

			S_MENTION_DIVIDER_SYMS.on(TT_DOMAIN, S_MENTION).on(TT_LOCALHOST, S_MENTION).on(TT_TLD, S_MENTION).on(TT_NUM, S_MENTION);
		}

		return mention;
	}();

	plugin(linkify);
})(window.linkify);