/**
 * jQuery.minitranslate
 * http://bryce.io/minitranslate
 * minitranslate.herokuapp.com
 *
 * @version
 * 0.8.0 (June 7 2014)
 *
 * @license
 * The MIT license.
 */
function mt(mt_lib, div) {
  var i,j,txt,txt_arr,tmp,punct,capitals;
  if($(div).length > 0 && (mt_lib.length > 0 && $(div).attr("class") !== "mt-ignore")) {
    
    // Children!
    if($(div).children().length > 0) {
      for(j = 0; j < $(div).children().length; j++) {
        if($($(div).children()[j]).attr("class") !== "mt-ignore") {
          // Shouldn't be an input div, so get text (not val)
          txt = $($(div).children()[j]).text();

          // Find where punctuation was so we can re-apply at end
          tmp = txt.split(" ");

          // Only do this if there is punctuation
          punct = get_punct(tmp);

          // Array of tokens without punctuation
          txt = txt.replace(/[\.,-\/#!$%\^&\*;:{}=\-_`~()]/g, "");
          txt_arr = txt.split(" ");

          // Iterate through library
          iterate_lib(txt_arr, capitals, mt_lib);

          for(i = 0; i < punct.length; i++) {
            txt_arr[punct[i].idx] += punct[i].c;
          }

          // All words are applied
          txt = txt_arr.join(" ");

          // Apply translation
          $($(div).children()[j]).text(txt);
        }
      }
    } else { // No kids :(
      // If it's an input, get val(), otherwise get text()
      if($(div).attr("id") === "mt-output") {
        txt = $(div).val();
      } else { txt = $(div).text(); }

      // Find where punctuation was so we can re-apply at end
      tmp = txt.split(" ");

      // Only do this if there is punctuation
      punct = get_punct(tmp);

      // Array of tokens without punctuation
      txt = txt.replace(/[\.,-\/#!$%\^&\*;:{}=\-_`~()]/g, "");
      txt_arr = txt.split(" ");

      // Iterate through library
      iterate_lib(txt_arr, capitals, mt_lib);

      for(i = 0; i < punct.length; i++) {
        txt_arr[punct[i].idx] += punct[i].c;
      }

      // All words are applied
      txt = txt_arr.join(" ");

      // Apply translation
      if($(div).attr("id") === "mt-output") {
        $(div).val(txt);
      } else {
        $(div).text(txt);
      }
    }
  }
}

function iterate_lib(t, capitals, mt_lib) {
  for(var i = 0; i < mt_lib.length; i++) {
    for(var j = 0; j < t.length; j++) {
      capitals = detect_capitals(t[j]);
      if(t[j].toLowerCase() === mt_lib[i].w.toLowerCase()) {
        t[j] = apply_capitals(mt_lib[i].r, capitals);
      }
    }
  }
}

function get_punct(tmp) {
  var p = [];
  for(var i = 0; i < tmp.length; i++) {
    for(var j = 0; j < tmp[i].length; j++) {
      // Word at index i has punctuation at end of it.
      if(tmp[i].charAt(j) === "!" || tmp[i].charAt(j) === "?" || tmp[i].charAt(j) === "," || tmp[i].charAt(j) === ".") {
        p.push(new Pun(tmp[i].charAt(j), i));
      }
    }
  }
  return p;
}

function detect_capitals(word) {
  var detect = [];
  for(var i = 0; i < word.length; i++) {
    if(word.charAt(i) >= "A" && word.charAt(i) <= "Z") {
      detect.push(1);
    } else {
      detect.push(0);
    }
  }
  return detect;
}

function apply_capitals(word, capitals) {
  var ret = "";
  var end = (word.length >= capitals.length) ? capitals.length : word.length;
  for(var i = 0; i < end; i++) {
    if(capitals[i]) {
      ret += word.charAt(i).toUpperCase();
    } else {
      ret += word.charAt(i).toLowerCase();
    }
  }
  if(word.length >= capitals.length) { 
    ret += word.substr(i, word.length - 1);
  }
  return ret;
}

function Pun(c, i) {
  this.c = c;
  this.idx = i;
}

// Static
function mt_translate(mt_lib) {
  $(".mt-translate").each(function(i, div) {
    mt(mt_lib, div);
  });
}

// Dynamic
function mt_watch(mt_lib, inp, out) {
  $(inp).keyup(function() {
    if(!inp.hasClass('mt-patient')) {
      $(out).val($(this).val());
      mt(mt_lib, $(out));
    }
  });
  $("#mt-button").click(function() {
    $(out).val($(inp).val());
    mt(mt_lib, $(out));
  });
}

// Validate
if($("#mt-input").length > 0 && $("#mt-output").length === 0) { console.log("MT-DEBUG: Input detected but no Output. Check your input IDs"); }
if($("#mt-input").length === 0 && $("#mt-output").length > 0) { console.log("MT-DEBUG: Output detected but no Input. Check your input IDs"); }

// Instantiate
mt_watch(mt_lib, $("#mt-input"), $("#mt-output"));
mt_translate(mt_lib);
