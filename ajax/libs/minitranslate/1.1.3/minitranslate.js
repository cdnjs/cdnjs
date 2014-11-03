/**
 * minitranslate.js
 * http://bryce.io/minitranslate
 * minitranslate.herokuapp.com
 *
 * @version
 * 1.1.3 (Sept 6 2014)
 *
 * @license
 * The MIT license.
 */
function mt(mt_lib, div) {
  if ((div.innerHTML !== '' || div.value !== '') && (mt_lib.length > 0 && div.getAttribute("class") !== "mt-ignore")) {
    if (div.children.length > 0) {
      Array.prototype.forEach.call(div.children, function(el, i) {
        if (el.getAttribute("class") !== "mt-ignore") {
          apply_translation(el);
        }
      });
    } else apply_translation(div);
  }
}

function apply_translation(div) {
  d = delouse(div);
  iterate_lib(d[0], mt_lib);
  append_punctuation(d[0], d[1]);
  write_changes(div, d[0]);
}

function append_punctuation(txt, punct) {
  punct.map(function(p) {
    txt[p.idx] += p.c;
  });
}

function write_changes(item, array) {
  var txt = array.join(" ");
  if (item.id === "mt-output") {
    item.value = txt;
  } else {
    item.innerHTML = txt;
  }
}

// Sanitizes & saves punctuation
function delouse(item) {
  var txt = (item.id === "mt-output") ? item.value : item.innerText;
  var tmp = txt.split(" ");
  var punct = get_punct(tmp);
  txt_arr = txt.replace(/[\.,-\/#!$%\^&\*;:{}=\-_`~()]/g, "").split(" ");
  return [txt_arr, punct];
}

function iterate_lib(t, mt_lib) {
  for (var j = 0; j < t.length; j++) {
    mt_lib.every(function(entry) {
      if (t[j].toLowerCase() === entry.w.toLowerCase()) {
        var capitals = detect_capitals(t[j]);
        t[j] = apply_capitals(entry.r, capitals);
        return false;
      } else return true;
    });
  }
}

function get_punct(tmp) {
  var keep = [];
  tmp.map(function(b, i) {
    b.split('').map(function(c) {
      if (c === "!" || c === "?" || c === "," || c === ".") {
        keep.push(new Pun(c, i));
      }
    });
  });
  return keep;
}

function detect_capitals(word) {
  return word.split('').map(function(letter, i) {
    return (word.charAt(i) >= "A" && word.charAt(i) <= "Z") ? 1 : 0;
  });
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

// Associates index & char
function Pun(c, i) {
  this.c = c;
  this.idx = i;
}

// Static
function mt_translate(mt_lib) {
  Array.prototype.forEach.call(document.querySelectorAll(".mt-translate"), function(el, i) {
    mt(mt_lib, el);
  });
}

// Dynamic
function mt_watch(mt_lib) {
  var inp = document.getElementById("mt-input");
  var outp = document.getElementById("mt-output");
  var butt = document.getElementById("mt-button");
  if (inp !== null && outp !== null) {
    if (butt) {
      butt.onclick = function() {
        outp.value = inp.value;
        mt(mt_lib, outp);
      };
    }
    inp.onkeyup = function() {
      if (inp.getAttribute("class").indexOf('mt-patient') === -1) {
        outp.value = inp.value;
        mt(mt_lib, outp);
      }
    };
  }
}

// Validate
if (document.getElementById("mt-input") && !document.getElementById("mt-output")) {
  console.log("mt.js: Input detected but no output. Check your output ID.");
}
if (!document.getElementById("mt-input") && document.getElementById("mt-output")) {
  console.log("mt.js: Output detected but no input. Check your input ID.");
}

// Instantiate
if (document.getElementById("mt-input") && document.getElementById("mt-output")) {
  mt_watch(mt_lib);
}
mt_translate(mt_lib);