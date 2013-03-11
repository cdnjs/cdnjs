<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>UglifyJS JavaScript minification</title>
    <style type="text/css">
      body {padding: 2em 4em; font-family: tahoma, sans-serif;}
      a {text-decoration: none;}
      input[type=text], textarea {border: 1px solid black; width: 100%}
      #httpdoc {background: #eee; padding: .1em 1em; margin-bottom: 1em;}

      /* pulsy! and a bgcolor as fallback for non-webkit */
      @-webkit-keyframes pulse {
        0% { background: white; }
        100% { background: #6af; }
      }
      .active-drop-target {
        -webkit-animation-name: pulse;
        -webkit-animation-duration: 0.7s;
        -webkit-animation-iteration-count: infinite;
        -webkit-animation-direction: alternate;
        -webkit-animation-timing-function: in-and-out;
        background: #6af;
      }
    </style>
  </head>

  <body>
    <h1>
      <a href="http://github.com/mishoo/UglifyJS/">UglifyJS</a> JavaScript minification
      <span style="font-size: 40%; color: #888">version 2.2.1</span>
    </h1>

    <p>Use the form below, or
    the <a href="javascript:void(document.getElementById('httpdoc').style.display='');">HTTP
    API</a>, to compress JavaScript code.</p>

    <div id="httpdoc" style="display: none">
      <p>UglifyJS compression can be used as an HTTP service by
      sending a <code>POST</code> or <code>GET</code> request to this
      URL, with any of the parameters listed below either embedded in
      the URL, or in an <code>application/x-www-form-urlencoded</code>
      request body. The response body will contain the compressed code
      in case of a successful request, or an error message when
      returning an error HTTP status code.</p>

      <dl>
        <dt><code>code_url</code></dt>
        <dd>A URL pointing at a JavaScript file to compress. Only
        the <code>http:</code> and <code>https:</code> protocols are
        supported. Invalid or errorring URLs will be ignored. This
        parameter can be given multiple times to concatenate the
        scripts at those locations together.</dd>

        <dt><code>js_code</code></dt>
        <dd>JavaScript code passed directly inside the request. Both
        this parameter and <code>code_url</code> can be given, in
        which case the code passed in <code>js_code</code> will end up
        after the code from URLs.</dd>

        <dt><code>utf8</code></dt>
        <dd>Defaults to off, can be passed (with any value) to allow
        non-ascii characters to appear in the output.</dd>

        <dt><code>source_map</code></dt>
        <dd>When set to any non-empty value, this will cause the
        response to contain
        the <a href="http://www.html5rocks.com/en/tutorials/developertools/sourcemaps/">source
        map</a> for the minified code instead of the code itself.
        You'd typically make two requests, one to fetch the minfied
        code, and one to fetch the corresponding source map.</dd>

        <dt><code>download</code></dt>
        <dd>When given, this should contain a filename. The server
        will add a <code>Content-Disposition</code> header to the
        response, which causes typical browsers to download the
        response under the given filename.</dd>
      </dl>

      <p>This API is loosely based
      on <a href="http://code.google.com/closure/compiler/docs/api-ref.html">Google's
      Closure API</a>, and should be compatible for simple uses.</p>

      <p>If you are planning to use this for something that might
      generate a lot of traffic,
      please <a href="mailto:marijnh@gmail.com">discuss</a> with me
      first, since my server isn't very heavy.</p>
    </div>

    <form method="post">
      <div id="urlinputs">
        <div>Script URL: <a href="javascript:void(addURLInput());">[+]</a></div>
        
          <div><input name="code_url" type="text" value=""></div>
        
      </div>
      <p>
        Script text:<br/>
        <textarea style="height: 20em" id="code" name="js_code"></textarea>
      </p>
      <p id="file-api-support" style="display: none; font-size: 80%; color: #999; margin-top: -.8em;">
        You can also drag files onto the textarea above to add them.
        Alternatively, select one or more files here to add them. If
        order is important, add your files one-by-one.
        <input type="file" id="file-api-inp" multiple/>
      </p>

      <p><input type="checkbox" name="utf8" > allow non-ascii output</p>

      <p>
        <input type="submit" name="form" value="show"> or
        <input type="submit" value="download"> as <input name="download" type="text" style="width: 10em">
      </p>
    </form>
    

    <script>
      function addURLInput() {
        var div = document.getElementById("urlinputs").appendChild(document.createElement("DIV"));
        div.innerHTML = '<input name="code_url" type="text">';
      }

      if (window.File && window.FileReader && window.FileList) {
        (function(){ // local scope
          var stopEvent = function(e){
            e.stopPropagation();
            e.preventDefault();
          };

          // take a FileList object and process all the files it contains
          var processFiles = function(files){
            for (var i=0; i<files.length; ++i) read(files[i]);
          };

          // read a single File with a FileReader
          // onload, append the result to the textarea (with a return appended to it)
          // maybe we could append a semi-colon to prevent most concat issues?
          // and a comment to make clear the file starts there? will be stripped anyways.
          var read = function(file){
            var fr = new FileReader;
            fr.onload = function(e){
              var e = document.getElementById('code'), v = e.value;
              e.value =
                v + (v ? '\n\n' : '') +
                ';// #################################\n' +
                ' // ## Start of file: '+file.name+'\n' +
                ' // #################################\n\n' +
                fr.result;
            };
            // on error flash red?
            fr.onabort = function(e){
              console.log("The file read was aborted...",e,'['+e.getMessage()+']');
            };
            fr.onerror = function(e){
              console.log("There was an error reading the file...",e,'['+e.getMessage()+']');
            };
            // start read (script files are utf-8, no? :)
            fr.readAsText(file);
          };

          // show desc for drag-n-drop / file picker
          var e = document.getElementById('file-api-support');
          if (e) e.style.display = 'block';

          // when you drag.
          e = document.getElementById('code');

          // dragging onto textarea
          e.ondragenter = function(evt){
            stopEvent(evt);
            this.className = 'active-drop-target';
          };
          // drag-moving over the textarea
          e.ondragover = function(evt){
            stopEvent(evt);
          };
          // no-longer dragging over the textarea
          e.ondragleave = function(evt){
            stopEvent(evt);
            this.className = '';
          };
          // dropped on the textarea
          e.ondrop = function(evt){
            stopEvent(evt);
            this.className = '';

            var files = evt.dataTransfer.files; // FileList object.
            if (files) processFiles(files);
            else try {
              var text = evt.dataTransfer.getData("Text");
              document.getElementById('code').value += text;
            } catch(e){}
          };

          // this handles the file input for selecting local files
          document.getElementById('file-api-inp').onchange = function(){
            var files = this.files;
            processFiles(files);
            this.value = "";
          };
        })();
      }
    </script>
  </body>
</html>
