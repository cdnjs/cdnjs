var Libil = Libil || {};

Libil.CONSONANT_MAP = [
  'h', 'n', 'c', 'r', 'k',
  'd', 't', 's', 'w', 'l',
  'p', 'dh', 'j', 'y', 'ny',
  'm', 'g', 'b', 'th', 'ng'
];

Libil.inverseCap = function(s) {
  sc = s.slice(1);
  return s.charAt(0).toLowerCase() + sc.toUpperCase();
}

Libil.capitalize = function(s) {
  sc = s.slice(1);
  return s.charAt(0).toUpperCase() + sc.toLowerCase();
}

Libil.fixCase = function(orig, mapped) {
  if(orig.toLowerCase() == orig) {
    return mapped.toLowerCase();
  }
  else if(Libil.capitalize(orig) == orig) {
    return Libil.capitalize(mapped);
  }
  else if (orig.toUpperCase() == orig) {
    return mapped.toUpperCase();
  }
  else if(Libil.inverseCap(orig) == orig) {
    return Libil.inverseCap(mapped);
  }
  else {
    return mapped;
  }
}

Libil.mapToken = function (t) {
  idx = Libil.CONSONANT_MAP.indexOf(t.toLowerCase());
  if (idx === -1) {
    return t;
  } 
  map_idx = -1;
  if (idx <= 9) {
    map_idx = idx + 10
  }
  else {
    map_idx = idx - 10;
  }

  return Libil.CONSONANT_MAP[map_idx];
}

Libil.mapFixToken = function(t) {
  m = Libil.mapToken(t);
  return Libil.fixCase(t, m); 
}

Libil.fixSourceVocal = function(s) {
  var vocals = ['a', 'i', 'u', 'e', 'o'];
  var pair = s.slice(0,2);
  var c = s.charAt(0);
  if (vocals.indexOf(c) != -1) {
    if (Libil.capitalize(pair) == pair) {
      return "H" + c.toLowerCase() + s.slice(1);
    }
    else if (pair.toUpperCase() == pair) {
      return "H" + s;
    }
    else {
      return 'h' + s;
    }
  }
  else {
    return s;
  }
}

Libil.tokenize = function(s) {
  var w = Libil.fixSourceVocal(s)
    var tokens = [];
  var pair = "";
  if (!s.trim()) {
    return tokens;
  }
  for (var i = 0; i < w.length; ++i) {
    c = w[i]
    pair = w.slice(i, i+2);
    if (-1 != Libil.CONSONANT_MAP.indexOf(pair.toLowerCase())) {
      ++i; // skip one index
      tokens.push(pair);  
    }
    else {
      tokens.push(c);
    }
  }
  return tokens;

}

Libil.convert_word = function(s) {
    var mappedTokens = Libil.tokenize(s).map(function(t) {
      return Libil.mapFixToken(t);
    });
    return mappedTokens.join('');
}

Libil.convert_word_ngalam = function(s) {
    var tokens = Libil.tokenize(s);
    tokens.reverse();
    return Libil.fixCase(s, tokens.join(''));
}

Libil.convert =  function(s, ngalam) {
    var words = s.split(" ");
    var mappedWords = words.map(ngalam === true ? Libil.convert_word_ngalam : Libil.convert_word); 
    return mappedWords.join(' ');
}

// for node
if (typeof module !== 'undefined') {
  module.exports = {  
    tokenize: Libil.tokenize,
    convert_word: Libil.convert_word,
    convert_word_ngalam: Libil.convert_word_ngalam,
    convert: Libil.convert
  }
}
