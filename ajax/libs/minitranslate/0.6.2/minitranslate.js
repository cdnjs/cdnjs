// Ready to rumble.
console.log("MT READY");

function mt(mt_lib, div) {
  if($(div).length > 0 && (mt_lib.length > 0 && $(div).attr("class") != "mt-ignore"))
    // Children!
    if($(div).children().length > 0)
      for(var j = 0; j < $(div).children().length; j++) {
        if($($(div).children()[j]).attr("class") != "mt-ignore") {
          // Shouldn't be an input div, so get text (not val)
          var txt = $($(div).children()[j]).text();
          
          // Find where punctuation was so we can re-apply at end
          var tmp = txt.split(" ");

          // Only do this if there is punctuation
          var punct = [];
          for(var i = 0; i < tmp.length; i++)
            for(var k = 0; k < tmp[i].length; k++)
              // Word at index i has punctuation at end of it.
              if(tmp[i].charAt(k) == "!" || tmp[i].charAt(k) == "?" || tmp[i].charAt(k) == "," || tmp[i].charAt(k) == ".") punct.push(new pun(tmp[i].charAt(k), i));
          
          // Array of tokens without punctuation
          txt = txt.replace(/[\.,-\/#!$%\^&\*;:{}=\-_`~()]/g, "");
          var txt_arr = txt.split(" ");
          
          // Iterate through library
          for(i = 0; i < mt_lib.length; i++)
            for(k = 0; k < txt_arr.length; k++) {
              var capitals = detect_capitals(txt_arr[k]);
              if(txt_arr[k].toLowerCase() == mt_lib[i].w.toLowerCase()) txt_arr[k] = apply_capitals(mt_lib[i].r, capitals)
            }
          for(i = 0; i < punct.length; i++) txt_arr[punct[i].idx] += punct[i].c;
          
          // All words are applied
          txt = txt_arr.join(" ");

          // Apply translation
          $($(div).children()[j]).text(txt)
        }
      } else { // No kids :(
        // If it's an input, get val(), otherwise get text()
        if($(div).attr("id") == "mt-output") var txt = $(div).val();
        else var txt = $(div).text();
        
        // Find where punctuation was so we can re-apply at end
        var tmp = txt.split(" ");
        var punct = [];
        for(var i = 0; i < tmp.length; i++)
          for(var k = 0; k < tmp[i].length; k++)
            if(tmp[i].charAt(k) == "!" || tmp[i].charAt(k) == "?" || tmp[i].charAt(k) == "," || tmp[i].charAt(k) == ".") {
              punct.push(new pun(tmp[i].charAt(k), i));
            } 
        
        // Array of tokens without punctuation
        txt = txt.replace(/[\.,-\/#!$%\^&\*;:{}=\-_`~()]/g, "");
        var txt_arr = txt.split(" ");
        
        // Iterate through library
        for(var i = 0; i < mt_lib.length; i++)
          for(var j = 0; j < txt_arr.length; j++) {
            var capitals = detect_capitals(txt_arr[j]);
            if(txt_arr[j].toLowerCase() == mt_lib[i].w.toLowerCase()) txt_arr[j] = apply_capitals(mt_lib[i].r, capitals)
          }
        for(i = 0; i < punct.length; i++) txt_arr[punct[i].idx] += punct[i].c;
        
        // All words are applied
        txt = txt_arr.join(" ");

        // Apply translation
        if($(div).attr("id") == "mt-output") $(div).val(txt);
        else $(div).text(txt)
      }
}

function detect_capitals(word) {
  var detect = [];
  for(var i = 0; i < word.length; i++)
    if(word.charAt(i) >= "A" && word.charAt(i) <= "Z") detect.push(1);
    else detect.push(0);
  return detect
}

function apply_capitals(word, capitals) {
  var ret = "";
  if(word.length >= capitals.length) {
    for(var i = 0; i < capitals.length; i++)
      if(capitals[i]) ret += word.charAt(i).toUpperCase();
      else ret += word.charAt(i).toLowerCase();
    ret += word.substr(i, word.length - 1)
  } else
    for(var i = 0; i < word.length; i++)
      if(capitals[i]) ret += word.charAt(i).toUpperCase();
      else ret += word.charAt(i).toLowerCase(); return ret
}

function mt_translate(mt_lib) {
  $(".mt-translate").each(function(i, div) {
    mt(mt_lib, div)
  })
}

function pun(c, i) {
  this.c = c;
  this.idx = i
}

function mt_watch(mt_lib, inp, out) {
  $(inp).keyup(function() {
    $(out).val($(this).val());
    mt(mt_lib, $(out))
  })
}
if($("#mt-input").length > 0 && !$("#mt-output").length > 0) console.log("MT-DEBUG: Input detected but no Output. Check your input IDs");
if(!$("#mt-input").length > 0 && $("#mt-output").length > 0) console.log("MT-DEBUG: Output detected but no Input. Check your input IDs");
mt_watch(mt_lib, $("#mt-input"), $("#mt-output"));
mt_translate(mt_lib);