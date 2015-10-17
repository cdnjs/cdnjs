/*-----------------------------------------------------------------------------+
| Product:  Ajile [com.iskitz.ajile]
| Version:  0.5
|+-----------------------------------------------------------------------------+
| Author:   Michael A. I. Lee [ajile@iskitz.com]
|
| Created:  Tuesday,   November   4, 2003    [2003.11.04]
| Modified: Wednesday, June       7, 2006    [2006.06.07 - 23:15:00 EDT]
|+-----------------------------------------------------------------------------+
|
| [Ajile] - Advanced JavaScript Import & Load Extension is a JavaScript
|           module that adds namespacing and importing capabilities to the
|           JavaScript Language.
|
|           Visit http://ajile.iskitz.com/ to start creating
|
|                  "Smart scripts that play nice!"
|
|           Copyright (c) 2003-2006 Michael A. I. Lee, iSkitz.com
|
|+-----------------------------------------------------------------------------+
|
| ***** BEGIN LICENSE BLOCK *****
| Version: MPL 1.1/GPL 2.0/LGPL 2.1
|
| The contents of this file are subject to the Mozilla Public License Version
| 1.1 (the "License"); you may not use this file except in compliance with
| the License. You may obtain a copy of the License at
| http://www.mozilla.org/MPL/
|
| Software distributed under the License is distributed on an "AS IS" basis,
| WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
| for the specific language governing rights and limitations under the
| License.
|
| The Original Code is Ajile.
|
| The Initial Developer of the Original Code is Michael A. I. Lee
|
| Portions created by the Initial Developer are Copyright (C) 2003-2006
| the Initial Developer. All Rights Reserved.
|
| Contributor(s): Michael A. I. Lee <ajile@iskitz.com>
|
| Alternatively, the contents of this file may be used under the terms of
| either the GNU General Public License Version 2 or later (the "GPL"), or
| the GNU Lesser General Public License Version 2.1 or later (the "LGPL"),
| in which case the provisions of the GPL or the LGPL are applicable instead
| of those above. If you wish to allow use of your version of this file only
| under the terms of either the GPL or the LGPL, and not to allow others to
| use your version of this file under the terms of the MPL, indicate your
| decision by deleting the provisions above and replace them with the notice
| and other provisions required by the GPL or the LGPL. If you do not delete
| the provisions above, a recipient may use your version of this file under
| the terms of any one of the MPL, the GPL or the LGPL.
|
| ***** END LICENSE BLOCK *****
*-----------------------------------------------------------------------------*/


// Create or verify existance of com.iskitz namespace
for(var _ = [this, -1, ["\x63\x6f\x6d","\x69\x73\x6b\x69\x74\x7a"]]; ++_[1] < _[2].length;)
{
   if(!_[0][_[2][_[1]]])
      _[0][_[2][_[1]]] = {};

   _[0] = _[0][_[2][_[1]]];
}

// Cleanup global helper variables
delete _[0];
delete _[1];
delete _[2];
_ = null;


/* Create com.iskitz.ajile module */
com.iskitz.ajile = new function()
{
   var VERSION = "0.5";

   if(containerFailsRequirements()) return;

   // Regular Expressions
   var RE_PARENT_DIR       = (/(.*\/)[^\/]+/);
   var RE_PARENT_NAMESPACE = (/(.*)\.[^\.]+/);
   var RE_RELATIVE_DIR     = (/(\/\.\/)|(\/[^\/]*\/\.\.\/)/);
   var RE_URL_PROTOCOL     = (/:\/\x2f/);

   var NSINFO   = new NamespaceInfo();
   var MN       = "\x69\x6e\x64\x65\x78";
   var QP       = "\x63\x6f\x6d\x2f\x69\x73\x6b\x69\x74\x7a\x2f\x61\x6a\x69\x6c\x65";
   var QN       = "\x63\x6f\x6d\x2e\x69\x73\x6b\x69\x74\x7a\x2e\x61\x6a\x69\x6c\x65";
   var SHORT    = "\x41\x6a\x69\x6c\x65";
   var TYPES    = [ SHORT, "Import", "ImportAs", "Load", "Namespace"
                  , "NamespaceException", "Package", "PackageException" ];
   var USE_NAME = true;
   var USE_PATH = !USE_NAME;

   // Debug
   var DEBUG     = false;
   var DEBUG_LOG = '';

   // Components
   var ALERT     = window.alert;
   var THIS;
   var LOADER;

   /* Stores namespace information for each imported module. */
   var nsInfoMap =
   {
      clear : function nsInfoMap_clear()
      {
         for(var moduleName in this)
            delete this[moduleName];
      }
   };
   
   /* Stores qualified and shortened names of modules waiting to be imported. */
   var pendingImports =
   {
      length  : 0,
      modules : {},

      add : function pendingImports_add(qualifiedName, shortName)
      {
         if(this.modules[qualifiedName]) return false;

         this.modules[qualifiedName] = shortName;
         this.length++;

         return true;
      },

      clear : function pendingImports_clear()
      {
         for(var qualifiedName in this.modules)
            delete this.modules[qualifiedName];

         this.length = 0;
      },

      get : function pendingImportsGet(namespace, owner)
      {
         var script = owner || window;
         namespace = namespace.split('\x2e');

         for(var i=0, j=namespace.length; i < j; i++)
            if(typeof script[namespace[i]] != "undefined")
               script = script[namespace[i]];
            else
               return undefined;

         return script;
      },

      isEmpty : function pendingImports_isEmpty()
      {
         return this.length == 0;
      },

      remove : function pendingImports_remove(qualifiedName)
      {
         if(!this.modules[qualifiedName]) return;

         delete this.modules[qualifiedName];
         this.length--;
      }
   };


   /*--------------------------------------------------------------------------+
   | completeImports (e) // Object - Event
   |+--------------------------------------------------------------------------+
   | Attempts to complete any pending imports.
   *--------------------------------------------------------------------------*/
   function completeImports(e)
   {
      var modules = pendingImports.modules;

      for(var qualifiedName in modules)
      {
         alert( 'ImportAs ("'+modules[qualifiedName]+'", "'+qualifiedName+'")'
              + "...CHECKING.", arguments);

         if(!pendingImports.get(qualifiedName)) continue;
         ImportAs(modules[qualifiedName], qualifiedName, null, null, this);
         pendingImports.remove(qualifiedName);
      }
   }


   function containerFailsRequirements()
   {
      return (  typeof document                   == "undefined"
             || typeof document.appendChild       == "undefined"
             || typeof document.createElement     == "undefined"
             || typeof document.getElementsByName == "undefined"
             );
   }


   /*--------------------------------------------------------------------------+
   | detectNamespaceInfo([dotPath]     // String - Dot notation namespace to locate.
   |+--------------------------------------------------------------------------+
   | Detects the default location from which to load external JavaScripts. When
   | neither the dirPath nor the dotPath parameters are supplied, Ajile's
   | location is used.
   *--------------------------------------------------------------------------*/
   function detectNamespaceInfo(dotPath)
   {
      dotPath = dotPath || QN;

      // Avoid the extra work if a default path is already set
      if(dotPath == QN && NSINFO.path) return NSINFO;

      var nsInfo = nsInfoMap[dotPath];

      if(nsInfo) return nsInfo;

      var dirPath  = dotPath.replace(/\x2e/g, "\x2f");
      var dirPath2 = '\x2f' + dirPath + '\x2f';
      dirPath      = '\x2f' + dirPath + '\x2e';
      dotPath      = '\x2f' + dotPath + '\x2e';

      var usesDots, paths, path;
      var scripts = getModules();

      if(!scripts) return new NamespaceInfo();

      for(var lastHope, i1, i2=0, i=0, j=scripts.length; i < j || lastHope; i++)
      {
         if(!lastHope)
            path = scripts[i].src;

         else
         {
            path = scripts[i].parentNode.lastChild;
            path = (path && path.nodeName == "SCRIPT") ? path.src : undefined;
         }

         // if path is missing a protocol create an absolute path
         if(path && path.search(RE_URL_PROTOCOL) == -1)
         {
            path  = document.location.href;

            // check if already at a diretctory level
            if(path.charAt(path.length - 1) != '\x2f')
            {
               paths = RE_PARENT_DIR.exec(path);

               // only switch to parent dir if not already in root
               if(paths[1].length > path.search(RE_URL_PROTOCOL) + 3)
                  path = paths[1];
            }

            i2 = path.length;

            if(!lastHope)
               path += scripts[i].src;

            else
            {
               var node = scripts[i].parentNode.lastChild;

               if(node && node.nodeName == "SCRIPT")
                  path += node.src;
            }
         }

         if(path == undefined || path == null)
         {
            lastHope = false;
            continue;
         }

         // search for dot notation
         i1 = path.indexOf(dotPath, i2) + 1;

         // path uses dot notation
         if(!(usesDots = i1 > 0))
            i1 = path.indexOf(dirPath, i2) + 1 || path.indexOf(dirPath2, i2) + 1;

         // Resolve relative paths ./ and ../ to absolute locations
         if(RE_RELATIVE_DIR.test(path))
         {
            do
            {
               path  = path.replace(RE_RELATIVE_DIR, '\x2f');
            }while(RE_RELATIVE_DIR.test(path));

            i1 = path.lastIndexOf(dotPath) + 1
                 || path.lastIndexOf(dirPath) + 1
                 || path.lastIndexOf(dirPath2) + 1;
         }

         if(i1 > 0)   // Found namespace's loader; now extract path
         {
            // undo usesDots if path found doesn't exactly match this namespace
            if(usesDots)
               usesDots = i1 == (path.lastIndexOf(dotPath) + 1);

            path = path.substring(0, i1);
            break;
         }

         if((lastHope = !lastHope && (i == j - 1)))
            --i;

         // getting here means Ajile's path was not found so reset
         path = usesDots = undefined;
         i2 = 0;
      }//end for(...scripts...)
         
      var qualifiedName = dotPath.slice(1,-1);
      if(qualifiedName == QN) scripts[i].title = qualifiedName;

      nsInfo = new NamespaceInfo(path, usesDots);

      // store path for the namespace
      if(nsInfo.path)
         nsInfoMap[dotPath.slice(1,-1)] = nsInfo;

      return nsInfo;
   }//end detectNamespaceInfo(...)


   /*--------------------------------------------------------------------------+
   | EnableDebugging (no)  // Boolean - Indicates whether to enable debugging
   |+--------------------------------------------------------------------------+
   | Used to enable external debugging of Ajile. When called without
   | arguments debugging is enabled. If the -no- argument is supplied a value of
   | true would enable debugging while a value of false would disable it.
   *--------------------------------------------------------------------------*/
   function EnableDebugging(isOnOrOff)
   {
      DEBUG = isOnOrOff == undefined ? true : isOnOrOff;

      preserveExtensions(isOnOrOff);
   }


   function getModules(container)
   {
      if(!(container = validateContainer(container, arguments)))
         return null;

      return container.scripts || container.getElementsByTagName("script") || [];
   }


   /*--------------------------------------------------------------------------+
   | GetVersion
   |+--------------------------------------------------------------------------+
   | Used to retrieve Ajile's VERSION information.
   *--------------------------------------------------------------------------*/
   function GetVersion()
   {
      return VERSION;
   }


   function handle(error, container)
   {
      error = error || '';

      if((container = prepareLoader(container)))
         for(var modules=getModules(), errors,i=modules.length; --i >= 0;)
            if(modules[i])
               if(  (errors = modules[i].title) == error
                 || (errors && errors.indexOf(error) == 0))
                  container.removeChild(modules[i]);
   }
   

   function handled(errors)
   {
      if(!(errors && errors.constructor == String))
        return false;handle(errors);return true;
   }

   /*--------------------------------------------------------------------------+
   | Import (qualifiedName // String  - Fully-qualified name of external script.
   |         [, url]       // String  - Location of external script
   |         [, usesDots]  // Boolean - Indicates if script is in dot notation.
   |         [, owner])    // Object  - Imported scripts container
   |+--------------------------------------------------------------------------+
   | Used to dynamically load external JavaScripts and where possible make them
   | accessible via their shortened names
   | (i.e. Import = com.iskitz.ajile.Import).
   *--------------------------------------------------------------------------*/
   function Import(qualifiedName, url, usesDots, owner)
   {
      return ImportAs (undefined, qualifiedName, url, usesDots, owner);
   }

   /*--------------------------------------------------------------------------+
   | ImportAs (shortName      // String  - External script's shortened-name.
   |           [qualifiedName // String  - External script's fully-qualified name
   |           [, url]        // String  - Location of external script
   |           [, usesDots]   // Boolean - Indicates if script uses dot notation.
   |           [, owner])     // Object  - Imported scripts container.
   |+--------------------------------------------------------------------------+
   | Used to dynamically load an external JavaScript and where possible make it
   | accessible via the specified shortened name. For example, using:
   |
   |     ImportAs ("MyImporter", "com.iskitz.ajile.Import");
   |
   | sets MyImporter as the shortname for com.iskitz.ajile.Import.
   *--------------------------------------------------------------------------*/
   function ImportAs(shortName, qualifiedName, url, usesDots, owner)
   {
      preserveExtensions();

      if(qualifiedName == undefined || qualifiedName == null)
         throw new NamespaceException(qualifiedName);

      owner = owner || this;

      var start = qualifiedName.lastIndexOf('\x2e') + 1;
      shortName = shortName || qualifiedName.substring(start);

      // check if this is a whole namespace import
      if(shortName == '*')
      {
         // if fully-qualified name was '*', throw exception
         if(start <= 0) throw new NamespaceException('*');

         qualifiedName = RE_PARENT_NAMESPACE.exec(qualifiedName)[1];
      }
      // Disallow overriding system types
      else if(owner[shortName])
         for(var t=TYPES.length; --t >= 0;)
         {
            if(shortName != TYPES[t]) continue;

            alert('ImportAs ("'+ shortName +'", "'+ qualifiedName +'") '
                 + "failed. "+ shortName +" is restricted.", arguments);
                 
            return owner[shortName];
         }

      var script  = owner,
          nsParts = qualifiedName.split('\x2e');

      var _parentNsID = '';

      for(var i=0, j = nsParts.length; i < j; i++)
         if(typeof script[nsParts[i]] != "undefined")
         {
            script = script[nsParts[i]];
            _parentNsID += nsParts[i] + '\x2e';
         }
         else break;

      // Namespace, Object, or Type exists
      if(i >= j)
      {
         // JavaScript has been loaded so check for short-name conflicts to avoid
         // overwriting any existing objects; If one exists the imported JavaScript
         // can still be accessed using its fully qualified name.
         if(typeof owner[shortName] == "undefined")
         {
            owner[shortName] = script;
            pendingImports.remove(qualifiedName);
            handle(qualifiedName, validateContainer(owner, arguments));

            alert( 'ImportAs ("'+shortName+'", "'+qualifiedName+'")...SUCCESS!.'
                 , arguments);

            // Preserve module's qualified name access
            return script;
         }

         if(pendingImports.get(qualifiedName) != owner[shortName])
            alert( qualifiedName +" can't be imported as "+ shortName
                  + "\nbecause that alias is already in use by a different "
                  + " module. You may\nre-attempt to import this module using a "
                  + "different alias as follows:\n\n\t"
                  + 'ImportAs ("<Alias>", "'+ qualifiedName +'");\n\n'
                  + "Another alternative is to simply access the module using its "
                  + "fully-qualified name:\n\n\t"+ qualifiedName +".\n\n"
                , arguments);
         
         // Preserve access to the module via its qualified name.
         return script;
      }

      // Namespace is undefined
      if(shortName == '*')
         script = Namespace(qualifiedName, url, usesDots, owner);

      // check if import is already pending; if so don't re-import
      if(pendingImports.modules[qualifiedName])
         return undefined;

      alert('ImportAs ("'+shortName+'", "'+qualifiedName+'")...', arguments);

      _parentNsID      = qualifiedName;
      var prevParentNs = _parentNsID;

      do
      {
         _parentNsID = RE_PARENT_NAMESPACE.exec(_parentNsID)[1];

         if(_parentNsID == prevParentNs) break;

         prevParentNs = _parentNsID;
         var nsInfo   = nsInfoMap[_parentNsID];

         // find & store base path on first import if not already found
         if(!nsInfo && !url)
            nsInfo = detectNamespaceInfo(_parentNsID);

      }while(nsInfo == undefined || nsInfo.path == undefined);

      // test for valid url
      if(url == undefined || url == null || url.constructor != String)
         url = (nsInfo != undefined && typeof nsInfo.path != "undefined")
               ? nsInfo.path : NSINFO.path || '';

      // guarantee that url ends with '/'
      if(url.lastIndexOf('\x2f') != (url.length - 1)) url += '\x2f';

      // Translate fully-qualified name from dot (.) notation to a file path if
      // working with dir notation JavaScripts
      // (i.e. /com/iskitz/ajile.js vs. /com.iskitz.ajile.js)
      if(usesDots
         || (usesDots == undefined
             && ((nsInfo && nsInfo.usesDots)
                 || (!nsInfo.path && NSINFO.usesDots))))
      {
         url += qualifiedName;
      }
      else url += qualifiedName.replace(/\x2e/g,'\x2f');

      // If the namespace/object/type isn't already pending import, add it to
      // the pending list & load its external JavaScript file.
      if(pendingImports.add(qualifiedName, shortName))
      {
         var code = 'ImportAs("'+ shortName +'", "'+ qualifiedName +'");';
         
         Load(url + "\x2e\x6a\x73"
             , validateContainer(owner, arguments)
             , code
             , false
             , qualifiedName);
      }

      alert('ImportAs ("'+shortName+'", "'+qualifiedName+'")...PENDING.',arguments);

      // return control so loading of the namespace/object/type can be completed
      return script;
   }


   /* Logs specified message to debug log. */
   function inform(message)
   {
      if(!ALERT) return;

      if(arguments.length == 1)
         return ALERT(message);

      var caller = arguments[1];
      var calledBy = (caller && caller.callee)
                   ? caller.callee.toString().split("function ")[1].split("(")[0]
                   : '';

      DEBUG_LOG = new Date() +"\t:: "
                + calledBy   + "\n\t"
                + message    + "\n\n"
                + DEBUG_LOG;

      return arguments[2] ? ShowLog() : void(0);
   }


   function informFriendly(message, caller, ShowLog)
   {
      if(ALERT && ALERT != informFriendly && ALERT != inform)
         ALERT(message);
         
      inform(message, caller, ShowLog);
   }


   /* Initialize Ajile */
   function initialize()
   {
      preserveExtensions();

      // Detect Ajile's base path and namespace type for scripts
      var nsInfo = detectNamespaceInfo(QN);

      // Create the default NamespaceInfo object
      NSINFO = new NamespaceInfo();

      // Set Ajile's default base path; current directory is default
      NSINFO.path = nsInfo.path || '';

      // Set Ajile's default namespace type; dot is default
      NSINFO.usesDots = nsInfo.usesDots != undefined ? nsInfo.usesDots
                                                     : USE_NAME;

      prepareLoader(window.document);

      var _width = "\x73\x74\x61\x74\x75\x73";
      var path = "\x50\x6f\x77\x65\x72\x65\x64\x20\x62\x79\x20\x2e\x3a\x20"
                + SHORT + "\x20\u2122\x20\x3a\x2e\x20\x20";

      if(window[_width].indexOf(path) == -1)
         window[_width] = path + window[_width];

      // Expose Ajile's features
      publishAPI();
  
      // Attempt to load the user's default JavaScript module
      Load (NSINFO.path + MN + "\x2e\x6a\x73");handle(QN);
   }


   /*--------------------------------------------------------------------------+
   | Load (  uri        // String  - Module's location (e.g. http://.../a.js)
   |      [, container] // Object  - Module's container; scripting capable.
   |      [, code])     // String  - Module's code.
   |      [, defer]     // Boolean - Flag for delaying module processing.
   |      [, title])    // String  - Module's title.
   |      [, type]      // String  - Module's type (e.g. text/javascript).
   |      [, language]  // String  - Module's language; legacy support.
   |+--------------------------------------------------------------------------+
   | Loads modules; used by Import and ImportAs.
   *--------------------------------------------------------------------------*/
   function Load(uri, container, code, defer, title, type, language)
   {
      preserveExtensions();

      if(!(container = validateContainer(container, arguments)))
      {
         alert("Invalid container. Unable to load:\n\n[" + uri + "]", arguments);
         return;
      }

      // no type or language set so set defaults for both
      if(!(type || language))
      {
         language = "JavaScript";
         type     = "text/javascript";
      }

      // set defer
      if(defer == undefined) defer = false;
      
      if(!title && uri)
         if(uri.indexOf(QN) >= 0 || uri.indexOf(QP) >= 0)
         {
            title = QN;
            code  = (code || '') ? (code + ';') : '';
            code += SHORT +'\x2e\x55\x6e\x6c\x6f\x61\x64\x28"'+title+'"\x29';
         }

      // Build the script object
      var script = container.createElement("script");

      if(!script)
      {
         LoadSimple(uri, container, code, defer, title, type, language);
         return;
      }

      if(defer)    script.defer    = defer;
      if(language) script.language = language;
      if(title)    script.title    = title;
      if(type)     script.type     = type;

      var savedCode;

      if(uri) // Attempt to load module at specified uri
      {
         alert("Load [ " + uri + " ]...", arguments);

         // Use W3C DOM 2 approach to load the script
         //container.getElementsByTagName("head")[0].appendChild(script);
         prepareLoader(container).appendChild(script);

         // MSIE only loads the script if this is done *after* appending.
         script.src = uri;

         alert("Load [ " + uri + " ]...DONE!", arguments);
      }

      // No code to load
      if(!code) return;

      // Received dual request to load a script and execute code
      if(uri) return Load(null, container, code, defer, title, type, language);

      // Can't use W3C DOM 2 approach to append code to the script.
      if(typeof(script.canHaveChildren) != "undefined")
         if(!script.canHaveChildren)
         {
            code = "\x73\x65\x74\x54\x69\x6d\x65\x6f\x75\x74\x28'"+ code +"',0\x29\x3b";
            return LoadSimple(null, container, code, defer, title, type, language);
         }

     	script.appendChild(container.createTextNode(code));
      prepareLoader(container).appendChild(script);
   }


   /*--------------------------------------------------------------------------+
   | LoadSimple (  src]       // String  - Module's location (e.g. http://.../a.js)
   |            [, container] // Object  - Module's container; scripting capable.
   |            [, code])     // String  - Module's code.
   |            [, defer]     // Boolean - Flag for delaying module processing.
   |            [, title])    // String  - Module's title.
   |            [, type]      // String  - Module's type (e.g. text/javascript).
   |            [, language]  // String  - Module's language; legacy support.
   |+--------------------------------------------------------------------------+
   | Simple module loading for containers that don't fully support W3C DOM 2.0.
   *--------------------------------------------------------------------------*/
   function LoadSimple(src, container, code, defer, title, type, language)
   {
      if(!(container = validateContainer(container, arguments)))
          return;

      var savedCode;

      if(src) // Attempt to load module at specified location
      {
         alert("LoadSimple [ " + uri + " ]...", arguments);

         savedCode = code;
         code      = null;
      }

      container.write('<'+"script"
                     + (defer   ?  ' defer="defer"'                  : '')
                     + (language? (' language="'  + language + '"')  : '')
                     + (title   ? (' title="'     + title    + '"')  : '')
                     + (type    ? (' type="'      + type     + '"')  : '')
                     + (src     ? (' src="'       + src      + '">') : '>')
                     + (code    ? (code                      + '\n') : '')
                     + "<\/script>\n"
                     );

      if(src) alert("LoadSimple [ " + uri + " ]...DONE!", arguments);

      // No code to load
      if(!(code = code || savedCode)) return;

      if(src) // Received dual request to load a script and execute code
         return LoadSimple(null, container, code, defer, title, type, language);
   }


   /*--------------------------------------------------------------------------+
   | Namespace (namespace     // String  - Fully-qualified namespace name
   |            [, nsPath]    // String  - Location of external script
   |            [, usesDots]  // Boolean - Indicates namespace uses dot notation.
   |            [, owner])    // Object  - Container

   |+--------------------------------------------------------------------------+
   | Creates a unique namespace to encapsulate JavaScript functionality.
   *--------------------------------------------------------------------------*/
   function Namespace(namespace, url, usesDots, owner)
   {
      if(!namespace) return namespace;

      preserveExtensions();
      alert('Namespace ("' + namespace + '")', arguments);

      var script  = owner || window;

      // default namespace settings
      if(namespace == "*")
      {
         NSINFO.path = url || NSINFO.path;

         if(usesDots != undefined)
            NSINFO.usesDots = usesDots;

         return script;
      }

      // load / create the namespace
      var nsParts = namespace.split('\x2e');
      for(var parentNamespace, i=0, j=nsParts.length; i < j; i++)
         if(typeof script[nsParts[i]] != "undefined")
            script = script[nsParts[i]];
         else
            script = script[nsParts[i]] = {};


      var nsInfo = nsInfoMap[namespace];

      // find & store base bath on first namespace definition if not already found
      if(!nsInfo)
      {
         if(!url) nsInfo = detectNamespaceInfo(namespace);

         if(usesDots == undefined)
         {
            completeImports();
            return script;
         }
      }


      // set namespace's default notation (usesDots or not)
      nsInfo.usesDots = usesDots != undefined
                        ? usesDots : typeof nsInfo.usesDots == "undefined"
                                     ? NSINFO.usesDots : nsInfo.usesDots;

      // set namespace's default path
      nsInfo.path = url != undefined
                    ? url : typeof nsInfo.path == "undefined"
                            ? NSINFO.path : nsInfo.path;

      completeImports();

      return script;
   }


   /*--------------------------------------------------------------------------+
   | NamespaceException (String namespace)
   |+--------------------------------------------------------------------------+
   | Used to catch Namespace exceptions caused by invalid namespace ids.
   *--------------------------------------------------------------------------*/
   function NamespaceException(namespace)
   {
      this.name = QN + ".NamespaceException";
      this.message = "Invalid namespace name [" + namespace + "]";

      this.toString = function ()
      {
        return "[" + this.name + "] :: " + this.message;
      };
   }


   /*--------------------------------------------------------------------------+
   | NamespaceInfo
   |+--------------------------------------------------------------------------+
   | Used to store path and namespace type information.
   *--------------------------------------------------------------------------*/
   function NamespaceInfo(path, usesDots)
   {
      this.usesDots = usesDots;
      this.path = path;

      this.toString = function ()
      {
        return "NamespaceInfo [ path: "      + this.path
                            + ", usesDots: " + this.usesDots
                            + " ]";
      };
   }


   /* Guarantee availability of module loader. */
   function prepareLoader(container)
   {
      // Acquire new loader if loader is unavailable or container has changed.
      if(container && (!LOADER || container != LOADER.ownerDocument))
         LOADER = container.lastChild.firstChild;
         
      return LOADER;
   }
   

   function preserveExtensions(friendly)
   {
      if(!(friendly = (friendly || DEBUG)))
      {
         window.alert   = inform;
       //window.confirm = requestFeedback;
       //window.prompt  = requestInput
         return;
      }
      
      if(window.alert != inform && window.alert != informFriendly)
      {
         ALERT        = window.alert;
         window.alert = informFriendly;
      }
   }


   /* Exposes Ajile features for public use */
   function publishAPI()
   {
      //Directives
      window.Import       = Import;
      window.ImportAs     = ImportAs;
      window.Load         = Load;
      window.Namespace    = window.Package // Deprecated
                          = Namespace;

      var API = window[SHORT]= THIS;

      //Functions
      API.EnableDebugging = EnableDebugging;
      API.GetVersion      = GetVersion;
      API.ShowLog         = ShowLog;
      API.Unload          = Unload;

      //Types
      API.USE_NAME              = API.DOT_NAMESPACE       // Deprecated
                                = USE_NAME;
      API.USE_PATH              = API.DIR_NAMESPACE       // Deprecated
                                = USE_PATH;
      window.NamespaceException = window.PackageException // Deprecated
                                = NamespaceException;
   }
   

   function ShowLog()
   {
      if(ALERT) ALERT(DEBUG_LOG);
   }


   /*--------------------------------------------------------------------------+
   | Unload
   |+--------------------------------------------------------------------------+
   | Free memory consumed by Ajile.
   *--------------------------------------------------------------------------*/
   function Unload(errors)
   {
      preserveExtensions();
      if(handled(errors))return;
      nsInfoMap.clear();
      pendingImports.clear();
      handle();
      
      // Remove exposed components
      delete Import;
      delete ImportAs;
      delete Load;
      delete Namespace;
      delete NamespaceException;

      // Release references
      LOADER
      = window[SHORT]
      = window.Import
      = window.ImportAs
      = window.Load
      = window.Namespace
      = window.NamespaceException
      = window.Package
      = window.PackageException
      = undefined;
      
      // Reset browser's alert functionality
      window.alert = ALERT;
      ALERT        = null;

      // Remove Ajile's logic
      delete com.iskitz.ajile;
   }
   

   function validateContainer(element, args)
   {
      // verify / attain container
      if(!element) return window.document;

      // setup container
      if(typeof element.write == "undefined")
         if(typeof element.document != "undefined")
            element = element.document;
         else return validateContainer(element.parentNode, args);
         
      return element;
   }


   // preserve reference to the this object
   THIS = this;
   initialize();
};