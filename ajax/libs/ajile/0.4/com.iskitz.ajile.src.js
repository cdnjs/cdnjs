/*-----------------------------------------------------------------------------+
| Product:  Ajile [com.iskitz.ajile]
| Version:  0.4
|+-----------------------------------------------------------------------------+
| Author:   Michael A. I. Lee [ajile@iskitz.com]
|
| Created:  Tuesday,   November   4, 2003    [2003.11.04]
| Modified: Sunday,    January   22, 2006    [2006.01.22 - 14:39:00 EST]
|+-----------------------------------------------------------------------------+
| Ajile, the Automated JavaScript Imports Language Extension is a
| JavaScript module that extends the JavaScript language with support for
| namespaces and module importing.
|
| Visit http://ajile.iskitz.com/ for news, documentation, examples and updates.
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
| The Initial Developer of the Original Code is
| Michael A. I. Lee.
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
for(var _ = [this, -1, ["com","iskitz"]]; ++_[1] < _[2].length;)
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
   var VERSION = "0.4";
   var DEBUG   = false;

   if(containerFailsRequirements()) return;

   // List of System Types to disallow overriding of.
   var SYSTEM_TYPES = ["AbstractView", "Attr", "CDATASection", "CSS2Properties"
                        , "CSSCharsetRule", "CSSFontFaceRule", "CSSImportRule"
                        , "CSSMediaRule", "CSSPageRule", "CSSPrimitiveValue"
                        , "CSSRule", "CSSRuleList", "CSSStyleDeclaration"
                        , "CSSStyleRule", "CSSStyleSheet", "CSSUnknownRule"
                        , "CSSValue", "CSSValueList", "CharacterData", "Comment"
                        , "Counter", "DOMException", "DOMImplementation"
                        , "DOMImplementationCSS", "DOMString", "DOMTimeStamp"
                        , "Document", "DocumentCSS", "DocumentEvent"
                        , "DocumentFragment", "DocumentRange", "DocumentStyle"
                        , "DocumentTraversal", "DocumentType", "DocumentView"
                        , "Element", "ElementCSSInlineStyle", "Entity"
                        , "EntityReference", "Event", "EventException"
                        , "EventListener", "EventTarget", "HTMLAnchorElement"
                        , "HTMLAppletElement", "HTMLAreaElement"
                        , "HTMLBRElement", "HTMLBaseElement"
                        , "HTMLBaseFontElement", "HTMLBodyElement"
                        , "HTMLButtonElement", "HTMLCollection"
                        , "HTMLDListElement", "HTMLDOMImplementation"
                        , "HTMLDirectoryElement", "HTMLDivElement"
                        , "HTMLDocument", "HTMLElement", "HTMLFieldSetElement"
                        , "HTMLFontElement", "HTMLFormElement"
                        , "HTMLFrameElement", "HTMLFrameSetElement"
                        , "HTMLHRElement", "HTMLHeadElement"
                        , "HTMLHeadingElement", "HTMLHtmlElement"
                        , "HTMLIFrameElement", "HTMLImageElement"
                        , "HTMLInputElement", "HTMLIsIndexElement"
                        , "HTMLLIElement", "HTMLLabelElement"
                        , "HTMLLegendElement", "HTMLLinkElement"
                        , "HTMLMapElement", "HTMLMenuElement", "HTMLMetaElement"
                        , "HTMLModElement", "HTMLOListElement"
                        , "HTMLObjectElement", "HTMLOptGroupElement"
                        , "HTMLOptionElement", "HTMLParagraphElement"
                        , "HTMLParamElement", "HTMLPreElement"
                        , "HTMLQuoteElement", "HTMLScriptElement"
                        , "HTMLSelectElement", "HTMLStyleElement"
                        , "HTMLTableCaptionElement", "HTMLTableCellElement"
                        , "HTMLTableColElement", "HTMLTableElement"
                        , "HTMLTableRowElement", "HTMLTableSectionElement"
                        , "HTMLTextAreaElement", "HTMLTitleElement"
                        , "HTMLUListElement", "LinkStyle", "MediaList"
                        , "MouseEvent", "MutationEvent", "NamedNodeMap", "Node"
                        , "NodeFilter", "NodeIterator", "NodeList", "Notation"
                        , "ProcessingInstruction", "RGBColor", "Range"
                        , "RangeException", "Rect", "StyleSheet"
                        , "StyleSheetList", "Text", "TreeWalker", "UIEvent"
                        , "ViewCSS", "Ajile", "Import", "ImportAs", "Load"
                        , "Namespace", "NamespaceException", "Package"
                        , "PackageException"
                      ];

   // Regular Expressions
   var RE_PARENT_DIR       = (/(.*\/)[^\/]+/);
   var RE_PARENT_NAMESPACE = (/(.*)\.[^\.]+/);
   var RE_RELATIVE_DIR     = (/(\/\.\/)|(\/[^\/]*\/\.\.\/)/);
   var RE_URL_PROTOCOL     = (/:\/\//);

   var DIR_NAMESPACE       = false;
   var DOT_NAMESPACE       = !DIR_NAMESPACE;
   var FRAMEWORK_DIR_PATH  = "com/iskitz/ajile";
   var FRAMEWORK_DOT_PATH  = "com.iskitz.ajile";
   var NSINFO              = new NameSpaceInfo();

   var listenersNotInitialized = false;

   var importCount   = 0;
   var nsInfoMap     = {};
   var _htmlHead;
   var _this;


   /*--------------------------------------------------------------------------+
   | NameSpaceInfo
   |+--------------------------------------------------------------------------+
   | Used to store path and namespace type information.
   *--------------------------------------------------------------------------*/
   function NameSpaceInfo(path, usesDots)
   {
      this.usesDots = usesDots;
      this.path = path;

      this.toString = function ()
      {
        return "NameSpaceInfo [ path: "      + this.path
                            + ", usesDots: " + this.usesDots
                            + " ]";
      };
   }


   /*--------------------------------------------------------------------------+
   | EnableDebugging (no)  // Boolean - Indicates whether to enable debugging
   |+--------------------------------------------------------------------------+
   | Used to enable external debugging of the framework. When called without
   | arguments debugging is enabled. If the -no- argument is supplied a value of
   | true would enable debugging while a value of false would disable it.
   *--------------------------------------------------------------------------*/
   function EnableDebugging(no)
   {
      DEBUG = no == undefined ? true : no;
   }


   /*--------------------------------------------------------------------------+
   | GetPathFor (namespace) // String - Fully qualified namespace.
   |+--------------------------------------------------------------------------+
   | Returns the path associated with the specified namespace.
   *--------------------------------------------------------------------------*/
   function GetPathFor(namespace)
   {
      var nsInfo = nsInfoMap[namespace];

      if(!nsInfo || !nsInfo.path)
         return undefined;

      if(!nsInfo.usesDots)
         namespace = namespace.replace(/./g, '/') + '/';
      else
         namespace += '.';

      return nsInfo.path + namespace;
   }


   /*--------------------------------------------------------------------------+
   | GetVersion
   |+--------------------------------------------------------------------------+
   | Used to retrieve the framework's VERSION information.
   *--------------------------------------------------------------------------*/
   function GetVersion()
   {
      return VERSION;
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
      if(listenersNotInitialized) initializeListeners();

      if(qualifiedName == undefined || qualifiedName == null)
         throw new NamespaceException(qualifiedName);

      owner = owner || this;

      var start = qualifiedName.lastIndexOf('.') + 1;
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
         for(var t=SYSTEM_TYPES.length; --t >= 0;)
            if(shortName == SYSTEM_TYPES[t])
               return undefined;

      var script  = owner,
          nsParts = qualifiedName.split('.');

      var _parentNsID = '';

      for(var i=0, j = nsParts.length; i < j; i++)
         if(typeof script[nsParts[i]] != "undefined")
         {
            script = script[nsParts[i]];
            _parentNsID += nsParts[i] + '.';
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

            if(DEBUG)
               window.status += '<'+"b><"+"i>:: Imported [ "+shortName+" ]<\/i><\/b>\n";
         }
         else if(DEBUG)
         {
            window.status += '<'+"b><"+"i>:: Imported [ "+qualifiedName+" ]<\/i><\/b>\n";
         }

         // return reference to the newly imported script
         return script;
      }

      // Namespace is undefined
      if(shortName == '*')
         script = Namespace(qualifiedName, url, usesDots, owner);

      // check if import is already pending; if so don't re-import
      if(pendingImports.namespaces[qualifiedName])
         return undefined;

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
         {
            nsInfo = getNSInfoFor(_parentNsID
                                  , url
                                    || (_parentNsID ? _parentNsID.replace(/\./g, "\/")
                                                     : undefined));
         }
      }while(nsInfo == undefined || nsInfo.path == undefined);

      // test for valid url
      if(url == undefined || url == null || url.constructor != String)
         url = (nsInfo != undefined && typeof nsInfo.path != "undefined")
               ? nsInfo.path : NSINFO.path || '';

      // guarantee that url ends with '/'
      if(url.lastIndexOf('/') != (url.length - 1)) url += '/';

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
      else url += qualifiedName.replace(/\./g,'\/');

      // If the namespace/object/type isn't already pending import, add it to
      // the pending list & load its external JavaScript file.
      if(pendingImports.add(qualifiedName, shortName, url))
         Load(url + ".js");

      if(DEBUG) window.status += "Import [ "+qualifiedName+" ]...\n";

      // return control so loading of the namespace/object/type can be completed
      return script;
   }


   /*--------------------------------------------------------------------------+
   | Load (url           // String  - Scripts location (i.e. http://.../a.js)
   |       [, container] // Object  - Window with script loading capability
   |       [, type]      // String  - Type of script (i.e. text/javascript)
   |       [, defer]     // Boolean - Flag for delaying script processing
   |       [, language]  // String  - Language script is written in.
   |       [, title])    // String  - Title for loaded script
   |+--------------------------------------------------------------------------+
   | Loads external JavaScripts; used by Import.
   *--------------------------------------------------------------------------*/
   function Load(url, container, type, defer, language, title)
   {
      if(DEBUG) window.status += "\nLOADING [ " + url + " ]...\n";

      // verify / attain container
      if(!container) container = window.document;

      // setup container
      if(typeof container.write == "undefined")
         if(typeof container.document != "undefined")
            container = container.document;
         else throw "Invalid container. Unable to load [" + url + "]";

      // test if HTML HEAD tag is already cached; if not acquire and cache it
      //cacheHTMLHead(container);
      if(container && (!_htmlHead || container != _htmlHead.ownerDocument))
         _htmlHead = container.lastChild.firstChild;

      // no type or language set so set defaults for both
      if(!(type || language))
      {
         language = "JavaScript";
         type = "text/javascript";
      }

      // set defer
      if(defer == undefined) defer = false;

      // build the script object
      var script = container.createElement("script");

      if(!script)
      {
         LoadSimple(container, url, type, defer, language, title);
         return;
      }

      if(defer) script.defer = defer;
      if(language) script.language = language;
      if(title) script.title = title;
      if(type) script.type = type;

      // dynamically load the script via it's container
      //container.getElementsByTagName("head")[0].appendChild(script);
      _htmlHead.appendChild(script);

      // The script won't load in IE unless this is done *after* appending
      // it to the document's HEAD tag.
      script.src = url;

      if(DEBUG) window.status += "LOADED  [ " + url + " ]...\n";
   }


   /** Simple version of Load for browsers that don't fully support DOM 2.0 */
   function LoadSimple(container, src, type, defer, language, title)
   {
      if(!(container && container.write)) return;

      container.write('<'+"script"
                      + (defer   ?  ' defer="defer"' : '')
                      + (language? (' language="'  + language + '"') : '')
                      + (title   ? (' title="'     + title + '"') : '')
                      + (type    ? (' type="'      + type + '"') : '')
                      + ' src="' + src + '"><\/script>');
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
      if(listenersNotInitialized) initializeListeners();

      if(!namespace) return namespace;

      if(DEBUG)
      {
         window.status += "Processing [ " + getActiveImportee() + " ]..."
                       +  "\tNamespace  [ " + namespace + " ]\n";
      }

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
      var nsParts = namespace.split('.');
      for(var parentNamespace, i=0, j=nsParts.length; i < j; i++)
         if(typeof script[nsParts[i]] != "undefined")
            script = script[nsParts[i]];
         else
            script = script[nsParts[i]] = {};


      var nsInfo = nsInfoMap[namespace];

      // find & store base bath on first namespace definition if not already found
      if(!nsInfo)
      {
         if(!url)
            nsInfo = getNSInfoFor(namespace, namespace.replace(/\./g, "\/"));

         if(usesDots == undefined)
            return script;
      }


      // set namespace's default notation (usesDots or not)
      nsInfo.usesDots = usesDots != undefined
                        ? usesDots : typeof nsInfo.usesDots == "undefined"
                                     ? NSINFO.usesDots : nsInfo.usesDots;

      // set namespace's default path
      nsInfo.path = url != undefined
                    ? url : typeof nsInfo.path == "undefined"
                            ? NSINFO.path : nsInfo.path;

      return script;
   }


   /*--------------------------------------------------------------------------+
   | NamespaceException (String namespace)
   |+--------------------------------------------------------------------------+
   | Used to catch Namespace exceptions caused by invalid namespace ids.
   *--------------------------------------------------------------------------*/
   function NamespaceException(namespace)
   {
      this.name = FRAMEWORK_DOT_PATH + ".NamespaceException";
      this.message = "Invalid namespace name [" + namespace + "]";

      this.toString = function ()
      {
        return "[" + this.name + "] :: " + this.message;
      };
   }

   /* Stores ids of namespaces that are waiting to be imported */
   var pendingImports =
   {
      namespaces : {},

      add : function pendingImportsAdd(namespace, shortName, url)
      {
         if(this.namespaces[namespace]) return false;

         this.namespaces[namespace] = [namespace, shortName, url];
         ++this.namespaces.length;

         return true;
      },

      destroy : function pendingImportsDestroy(namespace)
      {
         delete this.namespaces[namespace];
         --this.namespaces.length;
      },

      get : function pendingImportsGet(namespace, owner)
      {
         var script = owner || window;
         namespace = namespace.split('.');

         for(var i=0, j=namespace.length; i < j; i++)
            if(typeof script[namespace[i]] != "undefined")
               script = script[namespace[i]];
            else
               return undefined;

         return script;
      },

      isEmpty : function pendingImportsIsEmpty()
      {
         return this.namespaces.length < 1;
      }
   };


   // Cache HEAD tag for later use by Load
   function cacheHTMLHead(container)
   {
      // test if HTML HEAD is already cached; if not acquire and cache it
      if(container && (!_htmlHead || container != _htmlHead.ownerDocument))
         _htmlHead = container.lastChild.firstChild;
   }


   /*--------------------------------------------------------------------------+
   | completeImports (e) // Object - Event
   |+--------------------------------------------------------------------------+
   | Attempts to complete any pending imports.
   *--------------------------------------------------------------------------*/
   function completeImports(e)
   {
      var script, _imports = pendingImports.namespaces;

      if(DEBUG) window.status += '\n';

      for(var nsID in _imports)
         if((script = pendingImports.get(nsID)))
         {
            ImportAs(_imports[nsID][1], nsID, null, null, this);
            script.jsBasePath = _imports[nsID][2];
            pendingImports.destroy(nsID);
         }
         else if(DEBUG)
            window.status += '<'+"i>:: Pending   [ "+nsID+" ]<\/i>\n";
   }


   function containerFailsRequirements()
   {
      return (  typeof document                   == "undefined"
             || typeof document.appendChild       == "undefined"
             || typeof document.createElement     == "undefined"
             || typeof document.getElementsByName == "undefined"
              );
   }


   /* Free memory consumed by Ajile */
   function destroy()
   {
      // Remove exposed components
      delete Import;
      delete ImportAs;
      delete Load;
      delete Namespace;
      delete NamespaceException;

      // Release references
      _htmlHead
      = window.Ajile
      = window.Import
      = window.ImportAs
      = window.Load
      = window.Namespace
      = window.NamespaceException
      = window.Package
      = window.PackageException
      = undefined;

      // Remove Ajile's logic
      delete com.iskitz.ajile;
   }

   /* Use to disable event handlers */
   function disabled()
   {
      return false;
   }


   /* Exposes Ajile features for public use */
   function exposeFramework()
   {
      window.Ajile = _this;

      window.Ajile.DIR_NAMESPACE = DIR_NAMESPACE;
      window.Ajile.DOT_NAMESPACE = DOT_NAMESPACE;

      window.Ajile.EnableDebugging = EnableDebugging;
    //window.Ajile.GetModuleFor    = GetModuleFor/*(moduleName)*/;
      window.Ajile.GetPathFor      = GetPathFor;
      window.Ajile.GetVersion      = GetVersion;

      window.Import             = Import;
      window.ImportAs           = ImportAs;
      window.Load               = Load;
      window.Namespace          = window.Package   // <-------- Deprecated
                                = Namespace;
      window.NamespaceException = window.PackageException   // Deprecated
                                = NamespaceException;
   }


   function getActiveImportee()
   {
      var pending = pendingImports.namespaces;
      var i = 2;

      for(var importee in pending)
         if(--i == 0)
            return importee;

      return '';
   }

   /*--------------------------------------------------------------------------+
   | getNSInfoFor([dotPath]     // String - Dot notation namespace to locate.
   |              [, dirPath])  // String - Directory path to locate.
   |+--------------------------------------------------------------------------+
   | Detects the default location from which to load external JavaScripts. When
   | neither the dirPath nor the dotPath parameters are supplied, the
   | Framework's location is used.
   *--------------------------------------------------------------------------*/
   function getNSInfoFor(dotPath, dirPath)
   {
      dirPath = dirPath || FRAMEWORK_DIR_PATH;
      dotPath = dotPath || FRAMEWORK_DOT_PATH;

      // Avoid the extra work if a default path is already set
      if(dirPath == FRAMEWORK_DIR_PATH
         && dotPath == FRAMEWORK_DOT_PATH
         && NSINFO.path)
         return NSINFO;

      var nsInfo = nsInfoMap[dotPath];

      if(nsInfo) return nsInfo;

      var dirPath2   = '/' + dirPath + '/';
      dirPath        = '/' + dirPath + '.';
      dotPath        = '/' + dotPath + '.';

      var usesDots, paths, path;
      var scripts = document.scripts || document.getElementsByTagName("script");

      scripts = scripts || {length: 0};

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
            if(path.charAt(path.length - 1) != '/')
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
               path  = path.replace(RE_RELATIVE_DIR, '/');
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

         // getting here means the framework's path was not found so reset
         path = usesDots = undefined;
         i2 = 0;
      }//end for(...scripts...)

      nsInfo = new NameSpaceInfo(path, usesDots);

      // store path for the namespace
      if(nsInfo.path)
         nsInfoMap[dotPath.slice(1,-1)] = nsInfo;

      return nsInfo;
   }//end getNSInfoFor(...)


   /* Initialize Ajile */
   function initializeFramework()
   {
      // Get the framework's detected base path and namespace type for scripts
      var nsInfo = getNSInfoFor(FRAMEWORK_DOT_PATH, FRAMEWORK_DIR_PATH);

      // Create the default NameSpaceInfo object
      NSINFO = new NameSpaceInfo();

      // Set the framework's default base path; current directory is default
      NSINFO.path = nsInfo.path || '';

      // Set the framework's default namespace type; dot is default
      NSINFO.usesDots = nsInfo.usesDots != undefined ? nsInfo.usesDots
                                                     : DOT_NAMESPACE;

      // Cache HTML HEAD tag for later use by Load
      cacheHTMLHead(window.document);

      var brand = "Powered by .: Ajile \u2122 :.  ";

      if(window.status.indexOf(brand) == -1)
         window.status = brand + window.status;

      // Expose the Framework's features
      exposeFramework();

      // Import event listener functionality if not provided by container
      Import("com.iskitz.dom.events.EventTarget");

      // Now make sure framework's window events get configured
      listenersNotInitialized = true;
   }


   function initializeListeners()
   {
      // Add DOM 2 EventListener methods to window if necessary
      if(com.iskitz.dom)
         if(com.iskitz.dom.events)
            if(com.iskitz.dom.events.EventTarget)
               com.iskitz.dom.events.EventTarget.apply(window, []);

      if(!window.addEventListener) return;

      // Hides errors (no popup windows about code errors)
      window.addEventListener("error"  , disabled        , true);
      window.addEventListener("load"   , completeImports , true);
      window.addEventListener("unload" , destroy         , true);

      listenersNotInitialized = false;
   }


   // preserve reference to the this object
   _this = this;

   initializeFramework();
};