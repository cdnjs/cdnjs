/**
 * minitranslate.js
 * http://bryce.io/minitranslate
 * minitranslate.herokuapp.com
 *
 * @version
 * 1.0.3 (July 8 2014)
 *
 * @license
 * The MIT license.
 */
function mt(mt_lib, div) {
  if ((div.innerHTML !== '' || div.value !== '') && (mt_lib.length > 0 && div.getAttribute("class") !== "mt-ignore")) {
    if (div.children.length > 0) {
      var elements = div.children;

      // elements += Array.prototype.filter.call(div.parentNode.children, function(child) {
      //   return child !== div;
      // });

      Array.prototype.forEach.call(elements, function(c, i) {
        if (c.getAttribute("class") !== "mt-ignore") {
          punct_and_text = prepare_punct_and_text(c);

          iterate_lib(punct_and_text[0], mt_lib);

          append_punct(punct_and_text[0], punct_and_text[1]);

          apply_changes(c, punct_and_text[0]);
        }
      });
    } else { // No children
      punct_and_text = prepare_punct_and_text(div);

      iterate_lib(punct_and_text[0], mt_lib);

      append_punct(punct_and_text[0], punct_and_text[1]);

      apply_changes(div, punct_and_text[0]);
    }
  }
}

function append_punct(txt, punct) {
  for (var i = 0; i < punct.length; i++) {
    txt[punct[i].idx] += punct[i].c;
  }
}

function apply_changes(item, array) {
  var txt = array.join(" ");
  if (item.id === "mt-output") {
    item.value = txt;
  } else {
    item.innerHTML = txt;
  }
}

function prepare_punct_and_text(item) {
  if (item.id === "mt-output") {
    var txt = item.value;
  } else {
    var txt = item.innerText;
  }
  // Find where punctuation was so we can re-apply at end
  var tmp = txt.split(" ");

  // Only do this if there is punctuation
  var punct = get_punct(tmp);

  // Array of tokens without punctuation
  txt = txt.replace(/[\.,-\/#!$%\^&\*;:{}=\-_`~()]/g, "");
  var txt_arr = txt.split(" ");

  return [txt_arr, punct];
}

function iterate_lib(t, mt_lib) {
  for (var i = 0; i < mt_lib.length; i++) {
    for (var j = 0; j < t.length; j++) {
      var capitals = detect_capitals(t[j]);
      if (t[j].toLowerCase() === mt_lib[i].w.toLowerCase()) {
        t[j] = apply_capitals(mt_lib[i].r, capitals);
      }
    }
  }
}

function get_punct(tmp) {
  var p = [];
  for (var i = 0; i < tmp.length; i++) {
    for (var j = 0; j < tmp[i].length; j++) {
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
  var elements = document.querySelectorAll(".mt-translate");
  Array.prototype.forEach.call(elements, function(el, i) {
    mt(mt_lib, el);
  });
}

// Dynamic
function mt_watch(mt_lib) {
  var inp = document.getElementById("mt-input");
  var outp = document.getElementById("mt-output");
  var butt = document.getElementById("mt-button");
  if (inp !== null && outp !== null) {
    inp.onkeyup = function() {
      if (!inp.getAttribute("class" === 'mt-patient')) {
        outp.value = inp.value;
        mt(mt_lib, outp);
      }
    };
  }
  if (butt !== null) {
    document.getElementById("mt-button").click(function() {
      outp.value = inp.value;
      mt(mt_lib, outp);
    });
  }
}

// Validate
if (document.getElementById("mt-input") && !document.getElementById("mt-output")) {
  console.log("mt.js: Input detected but no output. Check your input IDs");
}
if (!document.getElementById("mt-input") && document.getElementById("mt-output")) {
  console.log("mt.js: Output detected but no input. Check your input IDs");
}

// Instantiate
if (document.getElementById("mt-input") !== null && document.getElementById("mt-output") !== null || document.getElementById("mt-button") !== null) {
  mt_watch(mt_lib);
}
mt_translate(mt_lib);
