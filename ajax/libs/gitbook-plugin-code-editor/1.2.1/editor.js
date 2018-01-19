//2.  Figure out css and js

require(["gitbook"], function(gitbook) {
  gitbook.events.bind("page.change", initEditors);
});

function initEditors(){
  var blocks = document.getElementsByClassName('zc-editor');
  for (var i=0;i<blocks.length;i++){
    initEditor(blocks[i].dataset.id, blocks[i].dataset.singleTab);
  }
}

function initEditor(id, singleTab) {
  if (singleTab === 'false'){
    singleTab = false;
  }

  var editor = initAce(id);

  var obj = {
    js: document.getElementById('init-js' + id).value,
    html: editor.getValue(),
    css: document.getElementById('init-css' + id).value
  };

  //when we do js and css in the future, we'll need to check for active tabs here.
  obj.js = obj.js.replace(/>/g, '&gt;');
  obj.js = obj.js.replace(/</g, '&lt;');
  document.getElementById('css-code' + id).innerHTML = obj.css;
  document.getElementById('js-code' + id).innerHTML = obj.js;

  //Set default tab
  toggle(document.getElementById('init-active' + id).value,  id, singleTab);
}

function initAce(id){
  var fullId = 'codeeditor' + id;
  var block = document.getElementById(fullId);
  var settings = JSON.parse(block.dataset.settings);
  var editor = ace.edit(fullId);

  editor.setTheme('ace/theme/' + settings.theme );
  editor.getSession().setMode('ace/mode/' + settings.mode);
  editor.setReadOnly(settings.readOnly);
  editor.setOption('maxLines', settings.maxLines);

  return editor;
}


function extractDelimited(source, start, end){
  var aParts = source.split(start);
  var i = 1;
  var deferString = "";
  var headString = aParts[0];
  while(i< aParts.length){
    //Defer String
    deferString +=  aParts[i].split(end)[0];
    headString += aParts[i].slice(aParts[i].indexOf(end) + 9);
    i++;
  }
  return {
    extracted : deferString,
    remaining : headString
  }
}

function updateIframeCode(id){
  var editor = ace.edit('codeeditor' + id);
  var obj = {
    js: document.getElementById('init-js' + id).value,
    html: editor.getValue(),
    css: document.getElementById('init-css' + id).value
  };

  var htmlParts = extractDelimited(obj.html, "<" + "script>", "<" + "/script>");
  //Get global zingchart theme
  var sJS = "<" + "script> window.onload= function(){" + htmlParts.extracted + obj.js + "}<" + "/script>";
  var aParts = htmlParts.remaining.split('<' + '/body>');
  var index = aParts[0].indexOf('<' + 'body>');
  aParts[0] = aParts[0].slice(0, index + 5) + " style='margin:0px'" + aParts[0].slice(index + 5);
  var sHTML = aParts[0] + sJS + aParts[1];

  //Inject CSS
  aParts = sHTML.split('<' + '/head>');
  sHTML = aParts[0] + "<" + "style>" + obj.css + "<" + "/style>" + "</" + "head>" + aParts[1];

  createIframe(sHTML, id);
}

function createIframe(sHTML, id){
  var result = document.getElementById('result' + id);
  var child = document.getElementById('preview' + id);

  if (child){
    result.removeChild(child);
  }

  var height = result.dataset.height;
  var iFrame = document.createElement('iframe');
  iFrame.style.width="100%";
  iFrame.style.height=height;
  iFrame.id = "preview" + id;
  iFrame.src = "";
  iFrame.frameBorder = "0";
  result.appendChild(iFrame);
  document.getElementById('preview' + id).contentWindow.document.write(sHTML);
  document.getElementById('preview' + id).contentWindow.document.close();
}

function toggle(target, id, singleTab){
  if (target === 'result'){
    updateIframeCode(id);
  }

  if (singleTab){
    var container = document.getElementById(target + id);
    container.style.display = "";
  }
  else {
    var containers = ['result', 'html', 'js', 'css'];
    for (var i = 0; i < containers.length; i++) {
      var container = document.getElementById(containers[i] + id);
      var btn = document.getElementById(containers[i] + '-btn' + id);

      if (container.id === (target + id)) {
        container.style.display = "";
        btn.className = "zc-btn active";
      }
      else {
        if (btn) {
          btn.className = "zc-btn";
        }
        container.style.display = "none";
      }
    }
  }
}

function exportToCodepen(id){
  //JS Code Block
  var editor = ace.edit('codeeditor' + id);

  var obj = {
    js  : document.getElementById('init-js' + id).value,
    html : editor.getValue(),
    css : document.getElementById('init-css' + id).value
  };

  document.getElementById('codepen-data'+id).value = JSON.stringify(obj);
  document.getElementById('codepen-form'+id).submit();
}

function tabSizePolyfill(){
  var codeElements = document.getElementsByTagName('code');
  var e = document.createElement('i');
  if(e.style.tabSize !== '' && e.style.MozTabSize !== '' && e.style.oTabSize !== ''){
    ele[i].innerHTML = ele[i].innerHTML.replace(/\t/g, "  ");
  }
}

function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}