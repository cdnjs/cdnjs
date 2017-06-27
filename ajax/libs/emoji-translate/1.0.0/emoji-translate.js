var allEmojis;
var SYMBOLS = '!"#$%&\'()*+,-./:;<=>?@[]^_`{|}~';

/**
 * Fires an emoji:ready event when the list of emojis has been loaded.
 *
 * @event emoji-ready
 */
(function() {
  var request = new XMLHttpRequest();
  request.open('GET', 'bower_components/emojilib/emojis.json', true);
  request.onload = function() {
    if (request.status >= 200 && request.status < 400) {
      allEmojis = JSON.parse(request.response);
      var event = document.createEvent('HTMLEvents');
      event.initEvent('emoji-ready', true, false);
      document.dispatchEvent(event);
    }
  };
  request.send();
})();

/**
 * Returns a possibly translated english word to emoji, ready for display.
 * @param {String} word The word to be translated
 * @returns {HTMLElement} A <span> element containing the translated word.
 */
function translateWord(word) {
  var node = document.createElement('span');

  // Punctuation blows. Get all the punctuation at the start and end of the word.
  var firstSymbol = '';
  var lastSymbol = '';

  while (SYMBOLS.indexOf(word[0]) != -1) {
    firstSymbol += word[0];
    word = word.slice(1, word.length);
  }

  while (SYMBOLS.indexOf(word[word.length - 1]) != -1) {
    lastSymbol += word[word.length - 1];
    word = word.slice(0, word.length - 1);
  }

  var emoji = getMeAnEmoji(word);
  if (emoji != '') {
    node.title = word;
    // Emoji in bold text isn't rendered in Chrome :sob:
    node.style.fontWeight = 'normal';
    node.style.fontFamily = 'AppleColorEmoji';
    node.style.letterSpacing = '0.1em';
    node.innerHTML = emoji;
  } else {
    node.innerHTML = word;
  }

  // Reapply the punctuation.
  node.innerHTML = firstSymbol + node.innerHTML + lastSymbol + ' ';
  return node;
}

/**
 * Returns the emoji equivalent of an english word.
 * @param {String} word The word to be translated
 * @returns {String} The emoji character representing this word, or '' if one doesn't exist.
 */
function getMeAnEmoji(word) {
  word = word.trim().toLowerCase();

  if (!word || word === '' || word === 'it')
    return '';

  // Maybe this is a plural word but the word is the singular?
  // Don't do it for two letter words since "as" would become "a" etc.
  var maybeSingular = '';
  if (word.length > 2 && word[word.length - 1] == 's')
    maybeSingular = word.slice(0, word.length - 1);

  // Maybe this is a singular word but the word is the plural?
  // Don't do this for single letter since that will pluralize crazy things.
  var maybePlural = (word.length == 1) ? '' : word + 's';

  // Go through all the things and find the first one that matches.
  for (var emoji in allEmojis) {
    var words = allEmojis[emoji].keywords;
    if (emoji == word || emoji == maybeSingular || emoji == maybePlural ||
        (words && words.indexOf(word) >= 0) ||
        (words && words.indexOf(maybeSingular) >= 0) ||
        (words && words.indexOf(maybePlural) >= 0))
      return allEmojis[emoji].char;
  }
  return '';
};
