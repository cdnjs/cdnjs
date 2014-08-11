/**
 * jQuery.minitranslate
 * http://bryce.io/minitranslate
 * minitranslate.herokuapp.com
 *
 * @version
 * 0.8.1 (July 3 2014)
 *
 * @license
 * The MIT license.
 */
function mt(mt_lib, div) {
  var i, txt, txt_arr, tmp, punct, capitals;
  if ($(div).length > 0 && (mt_lib.length > 0 && $(div).attr("class") !== "mt-ignore")) {
    if ($(div).children().length > 0) { // Children
      // TODO - refactor to recursively apply to all children
      $.each($(div).children(), function(i, c) {
        if ($(c).attr("class") !== "mt-ignore") {
          punct_and_text = prepare_punct_and_text(c);

          iterate_lib(punct_and_text[0], capitals, mt_lib);

          append_punct(punct_and_text[0], punct_and_text[1]);

          apply_changes(c, punct_and_text[0])
        }
      });
    } else { // No children
      punct_and_text = prepare_punct_and_text(div);

      iterate_lib(punct_and_text[0], capitals, mt_lib);

      append_punct(punct_and_text[0], punct_and_text[1]);

      apply_changes(div, punct_and_text[0]);
    }
  }
}

function append_punct(txt, punct) {
  for (i = 0; i < punct.length; i++) {
    txt[punct[i].idx] += punct[i].c;
  }
}

function apply_changes(item, array) {
  txt = array.join(" ");

  if ($(item).attr("id") === "mt-output") {
    $(item).val(txt);
  } else {
    $(item).text(txt);
  }
}

function prepare_punct_and_text(item) {
  if ($(item).attr("id") === "mt-output") {
    txt = $(item).val();
  } else {
    txt = $(item).text();
  }

  // Find where punctuation was so we can re-apply at end
  tmp = txt.split(" ");

  // Only do this if there is punctuation
  punct = get_punct(tmp);

  // Array of tokens without punctuation
  txt = txt.replace(/[\.,-\/#!$%\^&\*;:{}=\-_`~()]/g, "");
  txt_arr = txt.split(" ");

  return [txt_arr, punct];
}

function iterate_lib(t, capitals, mt_lib) {
  for (i = 0; i < mt_lib.length; i++) {
    for (j = 0; j < t.length; j++) {
      capitals = detect_capitals(t[j]);
      if (t[j].toLowerCase() === mt_lib[i].w.toLowerCase()) {
        t[j] = apply_capitals(mt_lib[i].r, capitals);
      }
    }
  }
}

function get_punct(tmp) {
  var p = [];
  for (i = 0; i < tmp.length; i++) {
    for (j = 0; j < tmp[i].length; j++) {
      // Word at index i has punctuation at end of it.
      if (tmp[i].charAt(j) === "!" || tmp[i].charAt(j) === "?" || tmp[i].charAt(j) === "," || tmp[i].charAt(j) === ".") {
        p.push(new Pun(tmp[i].charAt(j), i));
      }
    }
  }
  return p;
}

function detect_capitals(word) {
  var detect = [];
  for (var i = 0; i < word.length; i++) {
    if (word.charAt(i) >= "A" && word.charAt(i) <= "Z") {
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
  for (var i = 0; i < end; i++) {
    if (capitals[i]) {
      ret += word.charAt(i).toUpperCase();
    } else {
      ret += word.charAt(i).toLowerCase();
    }
  }
  if (word.length >= capitals.length) {
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
    if (!inp.hasClass('mt-patient')) {
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
if ($("#mt-input").length > 0 && $("#mt-output").length === 0) {
  console.log("MT-DEBUG: Input detected but no Output. Check your input IDs");
}
if ($("#mt-input").length === 0 && $("#mt-output").length > 0) {
  console.log("MT-DEBUG: Output detected but no Input. Check your input IDs");
}

// Instantiate
mt_watch(mt_lib, $("#mt-input"), $("#mt-output"));
mt_translate(mt_lib);
