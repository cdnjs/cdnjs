/*! markdown-it-emoji 0.1.0 https://github.com//markdown-it/markdown-it-emoji @license MIT */!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var o;"undefined"!=typeof window?o=window:"undefined"!=typeof global?o=global:"undefined"!=typeof self&&(o=self),o.markdownitEmoji=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports={
  "smile": "😀",
  "happy": "😆",
  "joy": "😂",
  "smiley": "😃",
  "haha": "😆",
  "grinning": "😀",
  "proud": "😊",
  "wink": "😉",
  "flirt": "😘",
  "heart_eyes": "😍",
  "crush": "😍",
  "kissing_heart": "😘",
  "kissing_closed_eyes": "😚",
  "kissing": "😗",
  "kissing_smiling_eyes": "😙",
  "stuck_out_tongue_winking_eye": "😜",
  "prank": "😝",
  "silly": "😜",
  "stuck_out_tongue_closed_eyes": "😝",
  "stuck_out_tongue": "😛",
  "flushed": "😳",
  "grin": "😁",
  "pensive": "😔",
  "relieved": "😌",
  "whew": "😌",
  "unamused": "😒",
  "meh": "😐",
  "disappointed": "😞",
  "persevere": "😣",
  "struggling": "😣",
  "cry": "😭",
  "tear": "😿",
  "tears": "😂",
  "sob": "😭",
  "bawling": "😭",
  "sleepy": "😪",
  "tired": "😩",
  "disappointed_relieved": "😥",
  "phew": "😥",
  "sweat": "😓",
  "nervous": "😟",
  "cold_sweat": "😰",
  "sweat_smile": "😅",
  "hot": "😅",
  "weary": "😩",
  "tired_face": "😫",
  "upset": "😫",
  "whine": "😫",
  "fearful": "😨",
  "scared": "😨",
  "shocked": "😱",
  "oops": "😨",
  "scream": "😱",
  "horror": "🙀",
  "mad": "😠",
  "annoyed": "😠",
  "rage": "😡",
  "smug": "😏",
  "confounded": "😖",
  "laughing": "😆",
  "satisfied": "😆",
  "yum": "😋",
  "lick": "😋",
  "mask": "😷",
  "sick": "😷",
  "ill": "😷",
  "sunglasses": "😎",
  "dizzy_face": "😵",
  "astonished": "😲",
  "amazed": "😲",
  "gasp": "😲",
  "worried": "😟",
  "frowning": "😦",
  "anguished": "😧",
  "stunned": "😧",
  "smiling_imp": "😈",
  "open_mouth": "😮",
  "surprise": "😮",
  "impressed": "😮",
  "wow": "😮",
  "neutral_face": "😐",
  "confused": "❓",
  "hushed": "😯",
  "silence": "😶",
  "speechless": "😯",
  "no_mouth": "😶",
  "innocent": "😇",
  "smirk": "😏",
  "expressionless": "😑",
  "smiley_cat": "😺",
  "smile_cat": "😸",
  "heart_eyes_cat": "😻",
  "kissing_cat": "😽",
  "smirk_cat": "😼",
  "scream_cat": "🙀",
  "crying_cat_face": "😿",
  "joy_cat": "😹",
  "pouting_cat": "😾",
  "sparkles": "✨",
  "shiny": "✨",
  "star": "⭐",
  "watch": "⌚",
  "fist": "✊",
  "hand": "✋",
  "raised_hand": "✋",
  "highfive": "✋",
  "rain": "☔",
  "cat": "🐱",
  "mouse": "🐭",
  "cow": "🐮",
  "monkey_face": "🐵",
  "zap": "⚡",
  "lightning": "⚡",
  "thunder": "⚡",
  "umbrella": "☔",
  "time": "⌚",
  "hourglass": "⌛",
  "black_joker": "🃏",
  "mahjong": "🀄",
  "coffee": "☕",
  "cafe": "☕",
  "espresso": "☕",
  "anchor": "⚓",
  "loop": "➿",
  "wheelchair": "♿",
  "accessibility": "♿",
  "negative_squared_cross_mark": "❎",
  "white_check_mark": "✅",
  "aries": "♈",
  "taurus": "♉",
  "gemini": "♊",
  "cancer": "♋",
  "leo": "♌",
  "virgo": "♍",
  "libra": "♎",
  "scorpius": "♏",
  "sagittarius": "♐",
  "capricorn": "♑",
  "aquarius": "♒",
  "pisces": "♓",
  "x": "❌",
  "exclamation": "❗",
  "heavy_exclamation_mark": "❗",
  "bang": "❗",
  "question": "❓",
  "grey_exclamation": "❕",
  "grey_question": "❔",
  "heavy_plus_sign": "➕",
  "heavy_minus_sign": "➖",
  "heavy_division_sign": "➗",
  "curly_loop": "➰",
  "black_medium_small_square": "◾",
  "white_medium_small_square": "◽",
  "black_circle": "⚫",
  "white_circle": "⚪",
  "white_large_square": "⬜",
  "black_large_square": "⬛"
}
},{}],2:[function(require,module,exports){
module.exports={
  "smile": [ ":)", ":-)" ],
  "disappointed": [ ":(", ":-(" ],
  "laughing": [ ":D", ":-D" ],
  "sunglasses": [ "8-)", "B-)" ],
  "wink": [ ";)", ";-)" ],
  "astonished": [ ":o", ":-o", ":O", ":-O" ],
  "cry": [ ";(", ";-(" ],
  "expressionless": [ ":|", ":-|" ],
  "kissing": [ ":*", ":-*" ]
}
},{}],3:[function(require,module,exports){
// Convert input options to more useable format
// and compile search regexp

'use strict';


function quoteRE (str) {
  return str.replace(/[.?*+^$[\]\\(){}|-]/g, '\\$&');
}


module.exports = function normalize_opts(options) {
  var emojies = options.emojies,
      shortcuts;

  // Filter emojies by whitelist, if needed
  if (options.enabled.length) {
    emojies = Object.keys(emojies).reduce(function (acc, key) {
      if (options.enabled.indexOf(key) >= 0) {
        acc[key] = emojies[key];
      }
      return acc;
    }, {});
  }

  // Flatten shortcuts to simple object: { alias: emoji_name }
  shortcuts = Object.keys(options.shortcuts).reduce(function (acc, key) {
    // Skip aliases for filtered emojies, to reduce regexp
    if (!emojies[key]) { return acc; }

    if (Array.isArray(options.shortcuts[key])) {
      options.shortcuts[key].forEach(function (alias) {
        acc[alias] = key;
      });
      return acc;
    }

    acc[options.shortcuts[key]] = key;
    return acc;
  }, {});

  // Compile regexp
  var names = Object.keys(emojies)
                .map(function (name) { return ':' + name + ':'; })
                .concat(Object.keys(shortcuts))
                .map(function (name) { return quoteRE(name); })
                .sort()
                .reverse()
                .join('|');
  var scanRE = RegExp(names, 'g');


  return {
    emojies: emojies,
    shortcuts: shortcuts,
    scanRE: scanRE
  };
};

},{}],4:[function(require,module,exports){
'use strict';

module.exports = function emoji_html(tokens, idx /*, options, env */) {
  return tokens[idx].to;
};

},{}],5:[function(require,module,exports){
'use strict';

/*eslint-disable no-loop-func*/

function arrayReplaceAt(src, pos, newElements) {
  return [].concat(src.slice(0, pos), newElements, src.slice(pos + 1));
}

module.exports = function emoji_replace(state, emojies, shortcuts, compiledRE) {
  var i, j, l, tokens, token, text, nodes, level, last_pos, emoji_name,
      blockTokens = state.tokens;

  for (j = 0, l = blockTokens.length; j < l; j++) {
    if (blockTokens[j].type !== 'inline') { continue; }
    tokens = blockTokens[j].children;

    // We scan from the end, to keep position when new tags added.
    // Use reversed logic in links start/end match
    for (i = tokens.length - 1; i >= 0; i--) {
      token = tokens[i];

      if (token.type === 'text' && compiledRE.test(token.content)) {
        text      = token.content;
        last_pos  = 0;
        nodes     = [];
        level     = token.level;
        compiledRE.lastIndex = 0;

        token.content.replace(compiledRE, function(match, offset) {
          // Validate emoji name
          if (shortcuts.hasOwnProperty(match)) {
            // replace shortcut with full name
            emoji_name = shortcuts[match];
          } else {
            emoji_name = match.slice(1, -1);
          }

          // Add new tokens to pending list
          if (offset > last_pos) {
            nodes.push({
              type: 'text',
              content: text.slice(last_pos, offset),
              level: level
            });
          }
          nodes.push({
            type: 'emoji',
            name:  emoji_name,
            to: emojies[emoji_name],
            level: level
          });
          last_pos = offset + match.length;

        });

        if (last_pos < text.length) {
          nodes.push({
            type: 'text',
            content: text.slice(last_pos),
            level: level
          });
        }
        // replace current node
        blockTokens[j].children = tokens = arrayReplaceAt(tokens, i, nodes);
      }
    }
  }
};

},{}],6:[function(require,module,exports){
'use strict';


var emojies_light     = require('./lib/data/light.json');
var emojies_shortcuts = require('./lib/data/shortcuts.json');
var emoji_html        = require('./lib/render');
var emoji_replace     = require('./lib/replace');
var normalize_opts    = require('./lib/normalize_opts');


module.exports = function emoji_plugin(md, options) {
  var conf = options || {};

  var opts = normalize_opts({
    emojies: conf.defs || emojies_light,
    shortcuts: conf.shortcuts || emojies_shortcuts,
    enabled: conf.enabled || []
  });

  md.renderer.rules.emoji = emoji_html;

  md.core.ruler.push('emoji', function emoji_rule(state) {
    emoji_replace(state, opts.emojies, opts.shortcuts, opts.scanRE);
  });
};

},{"./lib/data/light.json":1,"./lib/data/shortcuts.json":2,"./lib/normalize_opts":3,"./lib/render":4,"./lib/replace":5}]},{},[6])(6)
});