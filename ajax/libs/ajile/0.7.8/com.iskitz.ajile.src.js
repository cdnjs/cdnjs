/*-----------------------------------------------------------------------------+
| Product:  Ajile [com.iskitz.ajile]
| Version:  0.7.8
|+-----------------------------------------------------------------------------+
| Author:   Michael A. I. Lee [ http://ajile.iskitz.com/ ]
|
| Created:  Tuesday,   November   4, 2003    [2003.11.04]
| Modified: Friday,    December  29, 2006    [2006.12.29 - 06:00:06 EST]
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
|           Copyright (c) 2003-2007 Michael A. I. Lee, iSkitz.com
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
| Contributor(s): Michael A. I. Lee [http://ajile.iskitz.com/ ]
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


new function /*com.iskitz.ajile*/() 
{
   if(isIncompatible()) return;

   // Options/Settings
   var CLOAK     = true
     , DEBUG     = false
     , MVC       = true
     , MVC_SHARE = true
     , OVERRIDE  = false
     , REFRESH   = false;
//     , UPDATE    = false;

   var CONTROLLER = "\x69\x6e\x64\x65\x78",x65="\x41\x6a\x69\x6c\x65"
     , EXTENSION  = "\x2e\x6a\x73",x2f="\x63\x6f\x6d\x2e\x69\x73\x6b\x69\x74\x7a\x2e\x61\x6a\x69\x6c\x65"
     , SEPARATOR  = '\x2f',x2e="\x50\x6f\x77\x65\x72\x65\x64\x20\x62\x79\x20"
     , THREAD     = "\x73\x65\x74\x54\x69\x6d\x65\x6f\x75\x74",x3c="\x3c\x2a\x3e"
     , TYPES      = [ x65, "Import", "ImportAs", "Load", "Namespace"
                    , "NamespaceException", "Package", "PackageException"
                    ];

   var INFO   = new NamespaceInfo()
     , LOADED = "_$loaded$_"
     , LOADER
     , LOG    = '';

   // Notations: Win2K legal [~!@#$%^&()_+`-={}[];',. ] and illegal [*\|:"<>?/]
   var NOTATIONS = [ '*',    '|', ':',    '"', '<', '>', '?',    '[', '{', '('
                   , ')',    '}', ']', '\x5c', '&', '@', '#', '\x24', '%', '!'
                   , ';',    "'", '=',    '+', '~', ',', '^',    '_', ' ', '`'
                   , '-', '\x2f', '.'
                   ];

   // Regular Expressions
   var RE_OPT_CLOAK        = (   /(cloakoff|cloak)/)
     , RE_OPT_DEBUG        = (   /(debugoff|debug)/)
     , RE_OPT_MVC          = (     /(mvcoff|mvc)/)
     , RE_OPT_MVC_SHARE    = (/(mvcshareoff|mvcshare)/)
     , RE_OPT_OVERRIDE     = (/(overrideoff|override)/)
     , RE_OPT_REFRESH      = ( /(refreshoff|refresh)/)
//     , RE_OPT_UPDATE       = (  /(updateoff|update)/)
     , RE_PARENT_DIR       = (/(.*\/)[^\/]+/)
     , RE_PARENT_NAMESPACE = (/(.*)\.[^\.]+/)
     , RE_RELATIVE_DIR     = (/(\/\.\/)|(\/[^\/]*\/\.\.\/)/)
     , RE_URL_PROTOCOL     = (/:\/\x2f/);
   
   var currentModuleName = x2f
     , isSafari          = (/WebKit/i).test(window.navigator.userAgent);

   /* This acts as a map for module dependencies. */
   var dependence = new SimpleSet();
   
   /* Stores import listeners [functions respond to import events]. */
   var importListeners = new SimpleSet();

   /* This acts as a cache for all script paths. */
   var modulePaths = new SimpleSet();

   /* Stores namespace information for each imported module. */
   var nsInfoMap =
   {
      clear: function /*nsInfoMap$clear*/()
      {
         for(var moduleName in this)
            delete this[moduleName];
      }
   };


   /* Stores qualified and shortened names of modules waiting to be imported. */
   var pendingImports = new SimpleSet();

   /* Stores qualified names of modules that have been processed. */
   var processed = new SimpleSet();

   /* This acts as a map of module usage (list of who uses it). */
   var usage = new SimpleSet();


   /* Ajile's Constructor */(
   function /*$Create*/(THIS)
   {
      // Detect Ajile's base path and namespace type for scripts
      if(!(INFO = getNamespaceInfo(x2f))) return;

      // Respect Honesty, and Credit, MFs
      var meta = document.createElement("meta");

      if(meta)
      {
         meta.httpEquiv = x2e + x65; x2e = x2f.split('\x2e').reverse().join('\x2e');
         meta.content   = x2e + "\x20\x3a\x3a\x20\x53\x6d\x61\x72\x74\x20\x73\x63\x72\x69\x70\x74\x73\x20\x74\x68\x61\x74\x20\x70\x6c\x61\x79\x20\x6e\x69\x63\x65\x21\x20";
         getMainLoader(this.document).appendChild(meta);
      }

      //if(UPDATE)
      //{
      //   Load("http://ajile.sourceforge.net/lib/com.iskitz.ajile.js");cloak(x2f);
      //   return;
      //}
      
      // Create the default NamespaceInfo object
      INFO = new NamespaceInfo(INFO);

      share(THIS);
      handleImportLoaded(x65, x2f, THIS, this);
// Disabled since seems to be a timing issue with when this is called, disrupts
// processing in IE with Examples page and LoadExample
// AddImportListener(cloak);
      loadController();
      cloak(x2f);
      preserveImportFailSafe();
      
   })(this);


   /*--------------------------------------------------------------------------+
   | Ajile's Destructor
   |+--------------------------------------------------------------------------+
   | Free resources created and/or used by Ajile.
   *--------------------------------------------------------------------------*/
   function $Destroy(fullName)
   {
      if(fullName && fullName != x2f)
      {
         destroyModule(fullName);
         return;
      }
      
      // Clear collections
      dependence.clear();
      importListeners.clear();
      modulePaths.clear();
      nsInfoMap.clear();
      pendingImports.clear();
      processed.clear();
      usage.clear();
      cloak();
      
      // Remove exposed components
      delete Import;
      delete ImportAs;
      delete Load;
      delete Namespace;
      delete DEPRECATED$NamespaceException;

      // Release references
      LOADER
      = window[x65]
      = window.Import
      = window.ImportAs
      = window.JSImport
      = window.JSLoad
      = window.JSPackage
      = window.Load
      = window.Namespace
      = window.NamespaceException
      = window.Package
      = window.PackageException
      = undefined;

      // Remove Ajile's logic
      delete com.iskitz.ajile;
   }


   function addDependence(fullName, shortName)
   {
      if(fullName == currentModuleName) return;
      
      var supporters = dependence.get(currentModuleName);

      if(!supporters)
         dependence.add(currentModuleName, (supporters = new SimpleSet()));

      supporters.add(fullName, shortName);
   }
   
   
   function AddImportListener(moduleName, listener)
   {
      preserveImportFailSafe();
      
      if(!listener || (Function != listener.constructor))
         if(moduleName && (Function == moduleName.constructor))
         {
            listener   = moduleName;
            moduleName = null;
         }
         else return false;
      else
         if(moduleName && (String != moduleName.constructor))
            return false;

      if(moduleName == x3c && this == window[x65])
         return false;
         
      if(!moduleName && this != window[x65])
         moduleName = x3c;

      // Listener being added for module that's already been imported
      if(moduleName && (processed.has(moduleName) || GetModule(moduleName)))
         return setTimeout(function(){listener(moduleName);}, 62.25);

      // Generic Listener being added after some moduless were already imported
      if(!moduleName && (processed.getSize() > 0 || pendingImports.getSize() == 0))
         setTimeout(function(){listener(moduleName);}, 62.25);

      var listeners = importListeners.get((moduleName = (moduleName || '')));

      if(!listeners) // First import listener for this module
         importListeners.add(moduleName, (listeners = new SimpleSet()));

      listeners.add(Math.random(), listener);
      
      return true;
   }


   function addUsage(fullName)
   {
      if(fullName == currentModuleName) return;
      
      var usesOf = usage.get(fullName);

      if(!usesOf)
         usage.add(fullName, (usesOf = new SimpleSet()));

      usesOf.add(currentModuleName);
   }     


   function cloak(moduleName)
   {
//return;
      if(moduleName && String != moduleName.constructor) return;

      moduleName = moduleName || '';

//      if(CLOAK || (moduleName.indexOf(x2f) == 0))
//         log("Cloaking [ "+moduleName+" ]...", arguments);

      var container = GetNamespaceInfo(moduleName);
      var isCloaked = (container && container.hasOption("cloak"));

      for(var id, src, sys, loaders=getLoaders(), i=loaders.length; --i >= 0;)
      {
         if(!loaders[i] || ((id = loaders[i].title) && moduleName && (id != moduleName)))
            continue;

         src = loaders[i].src;
         sys = (src && (src.indexOf(x2f) >= 0)) || (id && (id.indexOf(x2f) == 0));

         if(sys || (!src && id) || isCloaked || CLOAK)
            if((container = loaders[i].parentNode) && container.removeChild)
               container.removeChild(loaders[i]);
      }
   }
   
   
   /* UTIL :: Comparator function used to sort numeric values in arrays. */
   function compareNumbers(num1, num2) { return num1 - num2; }


   /*--------------------------------------------------------------------------+
   | completeImports ([fullName]) // String - A module's fully-qualified name.
   |                              // Event  - Gecko browsers may pass an event. 
   |+--------------------------------------------------------------------------+
   | Attempts to complete a specific import or any ones pending.
   *--------------------------------------------------------------------------*/
   function completeImports(fullName)
   {
      var module, modules;

      if(!(isString(fullName) && pendingImports.has(fullName)))
         modules = pendingImports.getAllArray();
      else if(GetModule(fullName))
         modules = [[fullName, pendingImports.get(fullName)]];

      if(!modules) return;
      
      for(var shortName, i=modules.length; --i >=0;)
//      for(var shortName, i=0, j=modules.length; i < j; ++i)
      {
         fullName = modules[i][0];

         // check if module has been imported during this check
         if(!(pendingImports.has(fullName) && (module = GetModule(fullName))))
            continue;

         logImportCheck((shortName = modules[i][1]), fullName, arguments);

         if(shortName == '*') shortName = null;

         handleImportLoaded(shortName, fullName, module, this);
         updateDependents(fullName);
      }
   }
   

   function destroyModule(fullName)
   {
      var shortName;

      if(fullName)
      {
         if(String != fullName.constructor)
            if((fullName = GetNamespaceInfo(fullName)))
            {
               fullName  = fullName.fullName;
               shortName = fullName.shortName;
            }

         if(!shortName && fullName)
            shortName = fullName.substring(fullName.lastIndexOf('\x2e') + 1);

         fullName = RE_PARENT_NAMESPACE.exec(fullName);
         fullName = fullName ? fullName[1] : null;
      }

      var module = GetModule(fullName);

      if(shortName && typeof(module[shortName]) != "undefined")
      {
         if(module[shortName] == window[shortName])
            delete window[shortName];

         delete module[shortName];
      }

      cloak(fullName);
      return;
   }

   
   function detectCurrentModule(namespace)
   {
      var parentNamespace = namespace;
      var pending         = pendingImports.getAllArray();
    
      for(var moduleName, i=0, j=pending.length; i < j; ++i)
      {
         if(processed.has((moduleName = pending[i][0])))
            continue;
         
         if('*' != pending[i][1])
            parentNamespace = RE_PARENT_NAMESPACE.exec(moduleName);

         if(!(parentNamespace && (namespace == parentNamespace[1])))
            continue;

         processed.add((currentModuleName = moduleName));
         return;
      }
            
      currentModuleName = CONTROLLER;
   }

   function getContainer(element)
   {
      if(!element) return window.document;

      // find valid document node
      if(typeof element.write == "undefined")
         if(typeof element.document != "undefined")
            element = element.document;
         else return getContainer(element.parentNode);
         
      return element;
   }


   function getImportInfo(shortName, fullName)
   {
      if(!fullName) return null;

      var parts = fullName.split('\x2e');
      var version;

      for(var i=0, j=parts.length; i < j; i++)
      {
         if(isNaN(parts[i])) continue;
         
         fullName  = parts.slice(0, i).join('\x2e');
         shortName = shortName || parts.slice(i-1, i)[0];
         version   = parts.slice(i).join('\x2e');
         break;
      }
      
      if(!version) return null;
      
      return [shortName, fullName, version];
   }
   

   function getLoaders(container)
   {
      if(!(container = getContainer(container)))
         return null;

      var loaders = (container.scripts instanceof Array)
                  ?  container.scripts
                  : (container.getElementsByTagName("script") || []);

      return loaders;
   }


   /* Guarantee availability of module loader. */
   function getMainLoader(container)
   {
      // Acquire new loader if loader is unavailable or container has changed.
      if(container && (!LOADER || container != LOADER.ownerDocument))
         if(container.lastChild && container.lastChild.firstChild)
            LOADER = container.lastChild.firstChild;
         
      return LOADER;
   }


   function getMETAInfo(path)
   {
      loadOptions(path);

      if(!path || path.constructor != String)
         return [];
      
      // Calculate location of module's file extension
      var iExt = EXTENSION
               ? path.lastIndexOf(EXTENSION)
               : path.lastIndexOf('\x2e');

      // Retrieve module's extension & version
      if(iExt < path.length && iExt >= 0)
      {
         var extension = path.slice(iExt, iExt + EXTENSION.length);
         var version   = path.substring(0, iExt);

         if(version && isNaN(version.charAt(0)))
            version = '';
      }
      
      return [version, extension];
   }


   function GetModule(fullName, owner)
   {
      if(!isString(fullName)) return undefined;

      var module = owner || window;
      fullName   = fullName.split('\x2e');

      for(var i=0, j=fullName.length; i < j; i++)
         if(typeof module[fullName[i]] != "undefined")
            module = module[fullName[i]];
         else
            return undefined;

      return module;
   }

   
   /*--------------------------------------------------------------------------+
   | GetNamespaceInfo (moduleOrName) // Object - Module or namespace reference.
   |                                 // String - Module or namespace's name.
   |+--------------------------------------------------------------------------+
   | Returns the NamespaceInfo object associated with the specified module or
   | namespace.
   *--------------------------------------------------------------------------*/
   function GetNamespaceInfo(moduleOrName)
   {
      if(!moduleOrName) // Protect Ajile's namespace from external tampering...
         return new NamespaceInfo(INFO);

      var isModuleName = moduleOrName.constructor == String;
      
      for(var moduleName in nsInfoMap)
         if(!(moduleName in Object.prototype))
            if(  ( isModuleName && moduleOrName == moduleName)
              || (!isModuleName && moduleOrName == GetModule(moduleName)))
              return nsInfoMap[moduleName];

      return null;
   }


   /*--------------------------------------------------------------------------+
   | getNamespaceInfo([$namespace] // String - Dot notation namespace to locate.
   |+--------------------------------------------------------------------------+
   | Detects the default location from which to load external JavaScripts. When
   | the $namespace parameter isn't supplied, Ajile's location is detected.
   *--------------------------------------------------------------------------*/
   function getNamespaceInfo($namespace, $notation)
   {
      $namespace = $namespace || x2f;

      // Avoid the extra work if a default path is already set
      if($namespace == x2f && INFO.path) return INFO;

      var nsInfo = nsInfoMap[$namespace];

      if(nsInfo) return nsInfo;
      
      var lookups = getNamespaceLookups($namespace, $notation);

      if((nsInfo = getNamespaceInfoCached($namespace, lookups)))
         return (nsInfoMap[$namespace] = nsInfo); 

      var loaders = getLoaders();

      if(!(loaders && lookups))
         return null;

      var $path;
     
      for(var found=false, path, paths, i=0, j=loaders.length; i < j; i++)
      {
         path = unescape(loaders[i].src);

         // if path is missing a protocol create an absolute path
         if(path && path.search(RE_URL_PROTOCOL) == -1)
         {
            path = unescape(document.location.href);

            // check if already at a directory level
            if(path.charAt(path.length - 1) != SEPARATOR)
               // only switch to parent dir if not already in root
               if((paths = RE_PARENT_DIR.exec(path)) != null)
                  if(paths[1].length > path.search(RE_URL_PROTOCOL) + 3)
                     path = paths[1];

            path += unescape(loaders[i].src);
         }

         if(path == undefined || path == null)
            continue;
      
         // Resolve relative paths ./ and ../ to absolute locations
         while(RE_RELATIVE_DIR.test(path))
            path  = path.replace(RE_RELATIVE_DIR, '\x2f');

         // skip namespace resolution if path is already cached
         if(modulePaths.has(path)) continue;

         // Cache script path - handle posibility of early removal by cloaking
         modulePaths.add(path);
         
         // Namespace's path has been found, but must complete caching paths
         if(found) continue;

         var lookupList;
         for(var notation in lookups)
         {
            if(notation in Object.prototype)
               continue;

            lookupList = lookups[notation];
            
            // Search for loader's path using lookups
            var lookup, position, positions = [];
            for(var lc=lookupList.length; --lc >= 0;)
            {
               lookup   = lookupList[lc];
               position = path.lastIndexOf(lookup) + 1;

               // lookup failed to find namespace's loader so continue searching
               if(position <= 0 || position == positions[0])
                  continue;

               positions[positions.length] = position;
               log("Found Path [ "+path+" ]", arguments);
            }
                  
            // no matches found so continue searching
            if(positions.length == 0) continue;

            // use first match found, ignore rest?
            positions.sort(compareNumbers);
            position = positions[positions.length-1];

            // notation unknown if path doesn't exactly match this namespace
            $notation = (position == (path.lastIndexOf(lookup) + 1))
                      ? notation
                      : undefined;
   
            // extract the namespace's loader's path
            $path = path.substring(0, position);
            found = true;

            // label Ajile's loader
            if($namespace == x2f && loaders[i].title != x2f)
               loaders[i].title = x2f;

            // Index for the end of the Module or Namespace 
            var iEnd      = position + lookup.length - 2;
            var metaInfo  = getMETAInfo(path.substring(iEnd + 1));
            var extension = metaInfo[1];
            var version   = metaInfo[0];
            break;
         }
      }//end for(...loaders...)
         
      // Namespace's path couldn't be detected
      if(!$path) return null;
      
      nsInfo = new NamespaceInfo( $path, $notation, $namespace, null, version
                                , extension);

      // Store the namespace's information
      nsInfoMap[$namespace] = nsInfo;

      return nsInfo;
   }//end getNamespaceInfo(...)
   
   
   function getNamespaceInfoCached($namespace, lookups)
   {
      var closest   = Number.MAX_VALUE;
      var diff;
      var iFinds    = [];
      var iFound;
      var iPick     = 0;
      lookups       = lookups || getNamespaceLookups($namespace);
      var notations = [];
      var paths     = modulePaths.getAll();

paths:for(var path in paths)
      {
         if(path in Object.prototype)
            continue;

         for(var notation in lookups)
         {
            if(notation in Object.prototype)
               continue;

            notations[notations.length] = notation;
            
            for(var lookupList=lookups[notation], i=lookupList.length; --i >= 0;)
            {
               if(0 < (iFound = path.lastIndexOf(lookupList[i])))
               {
                  diff = path.length - (iFound + lookupList[i].length);

                  if(diff < closest)
                  {
                     closest = diff;
                     iPick = iFinds.length;
                  }
      
                  iFinds[iFinds.length] = iFound + 1;

                  // Index for the end of the Module or Namespace 
                  var iEnd      = (iFound + 1) + lookupList[i].length - 2;
                  var metaInfo  = getMETAInfo(path.substring(iEnd + 1));
                  var extension = metaInfo[1];
                  var version   = metaInfo[0];

                  log("Found Cached Path [ "+path+" ]", arguments);
//always take 1st find?
break paths;
//continue paths;
               }

               if(i == 0) delete notations[--notations.length];
            }
         }
      }

      // No valid paths found so abort;
      if(!iFinds || iFinds.length == 0) return null;

      //Choose first | last | any | closest to current script's path?
      path = path.substring(0, iFinds[iPick]);

      var nsInfo = new NamespaceInfo( path, notations[iPick], $namespace
                                    , null, version, extension);

      // store path for the namespace
      if(nsInfo.path) nsInfoMap[$namespace] = nsInfo;

      return nsInfo;
   }

   
   function getNamespaceLookups($namespace, notation)
   {
      var separator = getSeparator();
      var notations = notation == undefined ? NOTATIONS : [notation];
      var lookups   = {};
      
      for(var i=notations.length; --i >= 0;)
      {
         notation             = notations[i];
         lookups[notation]    = [];
         lookups[notation][2] = separator + $namespace.replace(/\x2e/g, notation);
         lookups[notation][0] = lookups[notation][2] + notation;
         lookups[notation][1] = lookups[notation][2] + separator;
         lookups[notation][2] = lookups[notation][2] + '\x2e';
      }
      
      return lookups;
   }
   
   
   function getOptions()
   {
      return [ (CLOAK     ? "cloak"    : "cloakoff")
             , (DEBUG     ? "debug"    : "debugoff")
             , (MVC       ? "mvc"      : "mvcoff")
             , (MVC_SHARE ? "mvcshare" : "mvcshareoff")
             , (OVERRIDE  ? "override" : "overrideoff")
             , (REFRESH   ? "refresh"  : "refreshoff")
//             , (UPDATE    ? "update"   : "updateoff")
             ].join(',');
   }


   function getSeparator()
   {
      var path    = unescape(document.location.href);
      var iBSlash = path.lastIndexOf('\x5c') + 1;
      var iFSlash = path.lastIndexOf('\x2f') + 1;
      SEPARATOR   = (iBSlash > iFSlash ? '\x5c' : '\x2f');
      
      return SEPARATOR;
   }
   
   
   function handleImport(shortName, fullName, url, notation, version, module, owner)
   {
      var _parentNsID  = fullName + (shortName == '*' ? '.*' : '');
      var prevParentNs = _parentNsID;
      var nsInfo;

      do
      {
         if((_parentNsID = RE_PARENT_NAMESPACE.exec(_parentNsID)))
            _parentNsID = _parentNsID[1];
         else break;

         if(_parentNsID == prevParentNs) break;

         prevParentNs = _parentNsID;
         nsInfo       = getNamespaceInfo(_parentNsID);

      }while(!nsInfo);

      // test for valid url
      if(url == undefined || url == null || url.constructor != String)
         url = (nsInfo != undefined && typeof(nsInfo.path) != "undefined")
               ? nsInfo.path : (INFO.path || '');

      // guarantee that url ends with '/'
      if(url.lastIndexOf('\x2f') != (url.length - 1)) url += '\x2f';

      //JSPackaging backwards compatability
           if(notation == false) notation = '\x2f';
      else if(notation == true)  notation = '\x2e';
      
      // Determine if notation is file path or file name style
      if(notation == undefined)
         notation = nsInfo ? nsInfo.notation == undefined
                           ? INFO.notation : nsInfo.notation
                           : INFO.notation;
      
      // Generate URL using indicated notation (i.e. file name or file path)
      url += escape(fullName.replace(/\x2e/g, notation));

      addDependence(fullName, (shortName == '*' ? fullName : shortName));
      addUsage(fullName);

      // If the namespace/object/type isn't already pending import, add it to
      // the pending list & load its external JavaScript file.
      if(pendingImports.add(fullName, shortName))
      {
         if(shortName == '*')
         {
            shortName = LOADED;
            log('Import ("'+ fullName +'.*")...', arguments);
         }
         else log('ImportAs ("'+shortName+'", "'+ fullName +'")...', arguments);

         if(version) url += '\x2e' + version;

         url += EXTENSION;
         
         if(nsInfo && nsInfo.hasOption("refresh"))
            url = setRefresher(url);

         var isLoading = Load( url
                             , getContainer((owner || this))
                             , 'ImportAs("'+ shortName +'", "'+ fullName +'");'
                             , false
                             , fullName);

         if(!isLoading) return module;

         (new ImportThread(fullName)).start();
      }

      // return control so loading of the namespace/object/type can be completed
      return module;
   }
   
   
   function handleImportLoaded(shortName, fullName, module, owner)
   {
      owner = owner || this;

      if(!module) return module;
      
      // Module has been loaded so check for short-name conflicts to avoid
      // overriding any existing objects; If one exists the imported module
      // can still be accessed using its fully-qualified name.
      if((shortName != LOADED) && hasNamingConflict(shortName, fullName, owner))
      {
         pendingImports.remove(fullName);
//should listener's be notified even if there's a naming conflict? I think not...
//notifyImportListeners(fullName);
         return module;
      }
      
      // Don't provide shortname access or notify listeners if the module's
      // dependencies aren't loaded.
      if(!isSupported(fullName, shortName))
         return undefined;

      var logMsg      = [];
      var pendingName = pendingImports.get(fullName);

      // Provide shortname access to imported module.
      if(shortName && shortName != LOADED && (!pendingName || (pendingName != '*' && pendingName != LOADED)))
      {
         owner[shortName] = module;
         logMsg[0] = 'ImportAs ("'+shortName+'", "'+fullName+'")...SUCCESS';
         pendingImports.remove(fullName);
      }

      // Provide shortname access to each of imported namespace's public members.
      else if(pendingName == '*')
      {
         logMsg[logMsg.length] = " ";

         var $fullName;
         for(var member in module)
         {
            $fullName = fullName + '.' + member;

            if(nsInfoMap[$fullName] || hasNamingConflict(member, $fullName, owner))
               continue;

            owner[member] = module[member];
            logMsg[logMsg.length] = 'ImportAs ("'+member+'", "'+$fullName+'")...SUCCESS';
         }

         if(logMsg[logMsg.length - 1] == " ")
            delete logMsg[--logMsg.length];
         
         pendingImports.remove(fullName);

         if(shortName != LOADED)
            pendingImports.add(fullName, LOADED);
      }
      
      // Log & Remove successful namespace import from pending list.
      else if(pendingName != '*' && (pendingName == LOADED || shortName == LOADED))
      {
         logMsg[0] = 'Import ("'+fullName+'.*")...SUCCESS';
         pendingImports.remove(fullName);
      }
      
      if(logMsg.length > 0)
         log(logMsg.join("\r\n"), arguments);

      notifyImportListeners(fullName);
      
      // Preserve access to the module via its qualified name.
      return module;
   }
   
   
   function hasNamingConflict(shortName, fullName, owner)
   {
      owner = owner || this;

      if(  OVERRIDE
        || (typeof owner[shortName] == "undefined")
        || (GetModule(fullName) == owner[shortName]))
         return false;

      var msg =  "\nWARNING: There is a naming conflict with the alias ";
          msg += shortName;
          msg += ".\nConsider using ImportAs with a different alias. For ";
          msg += 'example:\n\n\tImportAs ("';
          msg += shortName;
          msg += '1", "';
          msg += fullName;
          msg += '");\n\n';
          msg += "The module can currently be accessed using its ";
          msg += "fully-qualified name:\n\n\t";
          msg += fullName;
          msg += ".\n";
         
      log(msg, arguments, DEBUG);
         
      return true;
   }

   /*--------------------------------------------------------------------------+
   | Import (fullName     // String  - Fully-qualified name of external script.
   |         [, url]      // String  - Location of external script
   |         [, notation] // Boolean - Indicates if script is in dot notation.
   |         [, owner])   // Object  - Imported scripts container
   |+--------------------------------------------------------------------------+
   | Used to dynamically load external JavaScripts and where possible make them
   | accessible via their shortened names
   | (i.e. Import = com.iskitz.ajile.Import).
   *--------------------------------------------------------------------------*/
   function Import(fullName, url, notation, owner)
   {
      return ImportAs (undefined, fullName, url, notation, owner);
   }

   /*--------------------------------------------------------------------------+
   | ImportAs ([shortName   // String  - Module's shortened-name.
   |           , fullName   // String  - Module's fully-qualified name.
   |           [, url]      // String  - Location of external script.
   |           [, notation] // Boolean - Indicates script's packaging style.
   |           [, owner])   // Object  - Imported scripts container.
   |+--------------------------------------------------------------------------+
   | Used to dynamically load an external JavaScript and where possible make it
   | accessible via the specified shortened name. For example, using:
   |
   |     ImportAs ("MyImporter", "com.iskitz.ajile.Import");
   |
   | sets MyImporter as the shortname for com.iskitz.ajile.Import.
   *--------------------------------------------------------------------------*/
   function ImportAs(shortName, fullName, url, notation, owner)
   {
      preserveImportFailSafe();
      
      if(!fullName || fullName == "*")
      {
         log('ImportAs ("'+ shortName +'", "'+ fullName +'")...INVALID!');
         return null;
      }

      var importInfo, version;
      
      if(!isString(shortName)) shortName = '';

      if((importInfo = getImportInfo(shortName, fullName)))
      {
         fullName  = importInfo[1];
         shortName = (shortName != LOADED) ? importInfo[0] : LOADED;
         version   = importInfo[2];
      }
      else if(!shortName)
         shortName = fullName.substring(fullName.lastIndexOf('\x2e') + 1);
         
      owner = owner || this;

      // check if this is a whole namespace import
      if(shortName == '*')
         fullName = RE_PARENT_NAMESPACE.exec(fullName)[1];

      // Disallow overriding system types
      else if(owner[shortName])
         for(var msg, t=TYPES.length; --t >= 0;)
         {
            if(shortName != TYPES[t]) continue;

            msg =  'ImportAs ("';
            msg += shortName;
            msg += '", "';
            msg += fullName;
            msg += '") ';
            msg += "failed. ";
            msg += shortName;
            msg += " is restricted.";
               
            log(msg, arguments);
                 
            return owner[shortName];
         }

      var module      = owner;
      var _parentNsID = '';

      for(var nsParts=fullName.split('\x2e'), i=0, j=nsParts.length; i < j; i++)
         if(typeof module[nsParts[i]] != "undefined")
         {
            module       = module[nsParts[i]];
            _parentNsID += nsParts[i] + '\x2e';
         }
         else break;

      // Handle import request whose module is now loaded.
      if((i >= j && shortName != '*'))// || ((shortName == LOADED) && (i == j-2)))
      {
         // Skip if already imported
         if(pendingImports.has(fullName) || !processed.has(fullName))
         {
            module = handleImportLoaded(shortName, fullName, module, owner);
            updateDependents(fullName);
         }

         return module;
      }

      // Ignore pending import request.
      if(pendingImports.has(fullName))
      {
         if(shortName == '*' || shortName == LOADED) shortName = fullName;

         addDependence(fullName, shortName);
         addUsage(fullName);
         return undefined;
      }
         
      // Handle new import request.
      return handleImport(shortName, fullName, url, notation, version, module, owner);
   }
   
   
   function ImportThread(fullName, ttl, maxCheckCount)
   {
      maxCheckCount    = maxCheckCount || 500;
      var terminatorID = window.setInterval(stop, (ttl = ttl || 60000));
      var threadID;
      var timesChecked = 0;

      this.start = start;
      this.stop  = stop;

      function start()
      {
         if(timesChecked >= maxCheckCount)
         {
            stop();return;
         }

         //if(DEBUG) window.status = fullName+" ["+(++timesChecked)+"]";

//if(pendingImports.has(fullName))
{
//   if((processed.has(fullName) || GetModule(fullName)))
      //completeImports(fullName);
         if(/*processed.has(fullName) ||*/GetModule(fullName))
            completeImports();//fullName);
         else
            threadID = window.setTimeout(start, 0);
}//else stop();
      }
      
      function stop()
      {
//         pendingImports.remove(fullName);

         if(threadID != undefined)
            window.clearTimeout(threadID);
         
         if(terminatorID != undefined)
            window.clearInterval(terminatorID);

         //if(DEBUG) window.status = fullName+" stopped!";
      }
   }
/*
   function importTrigger(e)
   {
return;
      var msg;
      
      if(typeof this.onreadystatechange != "undefined")
      {
         if(!(this.readyState == "loaded" || this.readyState == "complete"))
            return;
         
         msg = this.readyState.toUpperCase();
      }
      else msg = "LOADED";

      log((msg + ": " + this.title + " from [ " + this.src + " ]"), arguments);
      completeImports(e);
   }
*/

   function isIncompatible()
   {
      return (  typeof document                      == "undefined"
             || typeof document.appendChild          == "undefined"
             || typeof document.createElement        == "undefined"
             || typeof document.getElementsByTagName == "undefined"
             || typeof document.removeChild          == "undefined"
             );
   }

   
   // UTIL :: Determines if an object is a String
   function isString(object)
   {
      return (object != null
          &&  object != undefined
          &&  object.constructor == String);
   }
   
   
   function isSupported(fullName, shortName)
   {
      var isCurrentModule = (fullName == currentModuleName);
      var isPending       = pendingImports.has(fullName);
      var supporters      = dependence.get(fullName);
      
      function isInlineImportReady()
      {
         if(isCurrentModule || isSupported(currentModuleName) || isPending)
            return true;

//         if(isPending) return false;
//         addUsage(fullName);
         // force reimporting to satisfy current module's dependency
         pendingImports.add(fullName, shortName);
         (new ImportThread(fullName)).start();
         return false;
      }

      if(!supporters || !(supporters = supporters.getAll()))
         return isInlineImportReady();

      for(var supporter in supporters)
//         if(fullName != supporter)
            if(!GetModule(supporters[supporter]))
//**/{log(shortName+" is missing "+supporters[supporter]+" or "+supporter, arguments);
               return false;
//**/}
      return isInlineImportReady();
   }


   /*--------------------------------------------------------------------------+
   | Load (  url        // String  - Module's location (e.g. http://.../a.js)
   |      [, container] // Object  - Module's container; scripting capable.
   |      [, code])     // String  - Module's code.
   |      [, defer]     // Boolean - Flag for delaying module processing.
   |      [, title])    // String  - Module's title.
   |      [, type]      // String  - Module's type (e.g. text/javascript).
   |      [, language]  // String  - Module's language; legacy support.
   |+--------------------------------------------------------------------------+
   | Loads modules; used by Import and ImportAs.
   *--------------------------------------------------------------------------*/
   function Load(url, container, code, defer, title, type, language)
   {
      preserveImportFailSafe();
      
      if(!(container = getContainer(container)))
      {
         log("Invalid container. Unable to load:\n\n[" + url + "]", arguments);
         return false;
      }

      if(url)
      {
         //Cache script's path for faster and more robust Import path resolution
         modulePaths.add(unescape(url));
         if(REFRESH) url = setRefresher(url);
      }

      // no type or language set so set defaults for both
      if(!(type || language))
      {
         language = "JavaScript";
         type     = "text/javascript";
      }

      // set defer
      if(defer == undefined) defer = false;

      // Build the script object
      var script = container.createElement("script");

      if(!script)
      {
         if(code) code = "setTimeout('"+code+"',0);";
         LoadSimple(url, container, code, defer, title, type, language);
         return false;
      }

      if(defer)    script.defer    = defer;
      if(language) script.language = language;
      if(title)    script.title    = title;
      if(type)     script.type     = type;

      if(url) // Attempt to load module at specified url
      {
         log("Load [ " + url + " ]...", arguments);
/*
         if(typeof script.onload != "undefined")
            script.onload = importTrigger;
         
         if(typeof script.onreadystatechange != "undefined")
            script.onreadystatechange = importTrigger;
*/
         // Safari requires setting src before appending
         if(isSafari) script.src = url;

         // Use W3C DOM 2 approach to load the script
         getMainLoader(container).appendChild(script);

         // MSIE only loads the script if this is done *after* appending.
         if(!isSafari) script.src = url;

         log("Load [ " + url + " ]...DONE!", arguments);
      }

      // No code to load; true for Opera fail-safe
      if(!code) return true;
//    else if(!url) log("LoadCode [ " + code + " ]...", arguments);

      // Received dual request to load a script and execute code
      if(url)
      {
         Load(null, container, code, defer, title, type, language);
//       log("LoadCode [ " + code + " ]...DONE!", arguments);
         // Opera 7.54 fail-safe
         return true;
      }

      if(typeof(script.canHaveChildren) == "undefined" || script.canHaveChildren)
         script.appendChild(container.createTextNode(code));

      // Handle IE's inability to append code using W3C DOM 2 approach.
      else if(!script.canHaveChildren)
         script.text = code;

      getMainLoader(container).appendChild(script);
      return false;
   }


   /*--------------------------------------------------------------------------+
   | loadController
   |+--------------------------------------------------------------------------+
   | Attempts to load the current page's MVC auto-loader and the shared
   | auto-loader if the mvcshare option is set.
   *--------------------------------------------------------------------------*/
   function loadController()
   {
      if(!(MVC || MVC_SHARE)) return;

      if(MVC_SHARE)
         Load(INFO.path + CONTROLLER + EXTENSION, null, null, null, CONTROLLER);
      
      if(!MVC) return;

      var name = unescape(document.location.href);
      var iEnd = name.lastIndexOf(SEPARATOR);
      name     = name.substring(++iEnd);
      iEnd     = name.lastIndexOf('\x2e');
      iEnd     = (iEnd == -1) ? 0 : iEnd;

      if("" != (name = name.substring(0, iEnd)))
         CONTROLLER = name;

      Load(CONTROLLER + EXTENSION, null, null, null, CONTROLLER);
   }


   /*--------------------------------------------------------------------------+
   | loadOptions
   |+--------------------------------------------------------------------------+
   | Parses a script's path for Ajile options. Valid options are:
   | cloak[off], debug[off], mvc[off], update[off].
   *--------------------------------------------------------------------------*/
   function loadOptions(path)
   {
      if(!path || path.constructor != String) return;
      
      var iQuery = path.lastIndexOf("?") + 1;
            path = path.substring(iQuery).toLowerCase();

      if(path.length == 0) return;
      
      var option;
      
      if((option = RE_OPT_CLOAK.exec(path)))
         CLOAK = option[1] == "cloak";

      if((option = RE_OPT_DEBUG.exec(path)))
         DEBUG = option[1] == "debug";

      if((option = RE_OPT_MVC.exec(path)))
         MVC = option[1] == "mvc";

      if((option = RE_OPT_MVC_SHARE.exec(path)))
         MVC_SHARE = option[1] == "mvcshare";

      if((option = RE_OPT_OVERRIDE.exec(path)))
         OVERRIDE = option[1] == "override";

      if((option = RE_OPT_REFRESH.exec(path)))
         REFRESH = option[1] == "refresh";

//      if((option = RE_OPT_UPDATE.exec(path)))
//         UPDATE = option[1] == "update";
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
      if(!(container = getContainer(container)))
          return;

      var savedCode;

      if(src) // Attempt to load module at specified location
      {
         log("LoadSimple [ " + src + " ]...", arguments);

         savedCode = code;
         code      = null;
      }
      
      var scriptTag =  '<'+"script";
          scriptTag += (defer   ?  ' defer="defer"'                  : '');
          scriptTag += (language? (' language="'  + language + '"')  : '');
          scriptTag += (title   ? (' title="'     + title    + '"')  : '');
          scriptTag += (type    ? (' type="'      + type     + '"')  : '');
          scriptTag += (src     ? (' src="'       + src      + '">') : '>');
          scriptTag += (code    ? (code                      + ';')  : '');
          scriptTag += "<\/script>\n";

      container.write(scriptTag);

      if(src) log("LoadSimple [ " + src + " ]...DONE!", arguments);

      // No code to load
      if(!(code = code || savedCode)) return;

      if(src) // Received dual request to load a script and execute code
         LoadSimple(null, container, code, defer, title, type, language);
   }


   /* Logs specified message to debug log. */
   function log(message, _caller, showLog)
   {
      // Only log if debugging is on or is an explicit request to show log
      if(!DEBUG && !showLog) return;
      
      var calledBy = (_caller && _caller.callee)
                   ? _caller.callee.toString().split("function ")[1].split("(")[0]
                   : '';

      if(message != undefined)
      {
         message += "\r\n\r\n";
         message += LOG;

         LOG =  new Date();
         LOG += "\t:: ";
         LOG += currentModuleName;
         LOG += " :: ";
         LOG += calledBy;
         LOG += "\r\n";
         LOG += message;
      }

      if(showLog) ShowLog();
   }


   function logImportCheck(shortName, fullName, params)
   {
      var logMsg = (shortName == '*' || shortName == LOADED)
                 ? ('Import ("'+ fullName +'.*")')
                 : ('ImportAs ("'+ shortName +'", "'+ fullName +'")');
      
      log((logMsg += "...CHECKING"), params);
   }


   /*--------------------------------------------------------------------------+
   | Namespace (namespace     // String  - Fully-qualified namespace name
   |            [, path]      // String  - Location of external script
   |            [, notation]  // Boolean - Indicates namespace uses dot notation.
   |            [, owner])    // Object  - Container

   |+--------------------------------------------------------------------------+
   | Creates a unique namespace to encapsulate JavaScript functionality.
   *--------------------------------------------------------------------------*/
   function Namespace(namespace, path, notation, owner)
   {
      preserveImportFailSafe();
      
      namespace = namespace || "\x3cdefault\x3e";

      log('Namespace ("' + namespace + '")', arguments);

      var script = owner || window;

      // default namespace settings
      if(namespace == "\x3cdefault\x3e")
      {
         INFO.update(path, notation);
         log(INFO, arguments);
         return script;
      }

      detectCurrentModule(namespace);

      // load / create the namespace
      var nsParts = namespace.split('\x2e');
      for(var i=0, j=nsParts.length; i < j; i++)
         if(typeof script[nsParts[i]] != "undefined")
            script = script[nsParts[i]];
         else
            script = script[nsParts[i]] = {};

      var nsInfo = nsInfoMap[namespace];

      if(nsInfo)
      {
         nsInfo.update(path, notation);
         log(nsInfo, arguments);
         return script;
      }
      
      if(!path) //Find & store path on namespace's initial definition
         nsInfo = getNamespaceInfo(namespace, notation);
      
      if(path || !nsInfo)
         nsInfo = new NamespaceInfo(path, notation, namespace);

      if(nsInfo && !nsInfoMap[namespace])
         nsInfoMap[namespace] = nsInfo;

      log(nsInfo, arguments);

      return script;
   }


   /*--------------------------------------------------------------------------+
   | NamespaceInfo ([  path]       // String - Module/Namespace's location.
   |                [, notation]   // String - Notation used for packaging.
   |                [, fullName]   // String - Fully-qualified name.
   |                [, shortName]  // String - Shortened name.
   |                [, version])   // String - Module/Namespace's version.
   |                [, extension]) // String - File extension.
   |+--------------------------------------------------------------------------+
   | Stores namespace path, notation, fully-qualified and shortened name, and
   | file extension information.
   *--------------------------------------------------------------------------*/
   function NamespaceInfo(path, notation, fullName, shortName, version, extension, options)
   {
      this.hasOption = hasOption;
      this.toString  = toString;
      this.update    = update;

      // Copy constructor
      if(path instanceof NamespaceInfo)
      {
         var ns    = path;
         extension = ns.extension;
         fullName  = ns.fullName;
         notation  = ns.notation;
         options   = ns.options;
         path      = ns.path;
         shortName = ns.shortName;
         version   = ns.version;
      }
        
      this.update(path, notation, fullName, shortName, version, extension, options);
      
      function hasOption(optionName)
      {
         options = options || this.options;

         if(!(options && optionName && (options.indexOf(optionName) >= 0)))
            return false;

         var option = (new RegExp(optionName, 'g')).exec(options);

         return option
             && (typeof option[1] != "undefined")
             &&  option[1] == optionName;
      }
      
      function toString()
      {
         var contents =  "NamespaceInfo";
             contents += "\r\n[ fullName: "  + this.fullName;
             contents += "\r\n, shortName: " + this.shortName;
             contents += "\r\n, version: "   + this.version;
             contents += "\r\n, notation: "  + this.notation;
             contents += "\r\n, options: "   + this.options;
             contents += "\r\n, path: "      + this.path;
             contents += "\r\n, uri: "       + this.uri;
             contents += "\r\n]";

         return contents;
      }
      
      // Creates the URI for this namespace or module using the extension.
      function update(path, notation, fullName, shortName, version, extension, options)
      {
         this.extension = extension || this.extension || EXTENSION;
         this.fullName  = fullName  || this.fullName  || '';
         this.shortName = shortName || this.shortName || '';

         this.notation = isString(notation)
                       ? notation
                       : (this.notation || ((INFO && isString(INFO.notation))
                                           ? INFO.notation
                                           : '\x2e'));

         this.options = isString(options)
                      ? options
                      : (this.options || getOptions());

         this.path = isString(path)
                   ? path
                   : (this.path || ((INFO && isString(INFO.path))
                                   ? INFO.path
                                   : ''));

         this.uri = this.path
                  + this.fullName.replace(/\x2e/g, this.notation);

         this.version = '' + (version || this.version || '');

         if(!this.uri) return;

         this.uri += (this.version ? ('\x2e'+ this.version) : '')
                  +   this.extension;
      }
   }
   
   
   function notifyImportListeners(fullName)
   {
      var listenerList = [ importListeners.get('')       // Generic listeners
                         , importListeners.get(fullName) // Specific listeners
                         , importListeners.get(x3c)      // Ajile listeners
                         ];

      // No listeners to process
      if(!listenerList[0] && !listenerList[1] && !listenerList[2])
         return;
      
      var hasListeners =  (listenerList[0] && (listenerList[0].getSize() > 0))
                       || (listenerList[1] && (listenerList[1].getSize() > 0));
      
      if(DEBUG && hasListeners)
         log(("Notify Import Listeners :: " + fullName + "..."), arguments);

      // Specific to generic notification
      for(var listeners, i=listenerList.length; --i >= 0;)
      {
         if(!listenerList[i]) continue;

         listeners = listenerList[i].getAll();
   
         for(var id in listeners)
            if(!(id in Object.prototype))
               listeners[id](fullName);
      }

      if(DEBUG && hasListeners)
         log(("Notify Import Listeners :: " + fullName + "...DONE!"), arguments);
   }
   
   
   function preserveImportFailSafe(owner)
   {
      var $onload = (owner = owner || window || this).onload;

      if($onload && (Function == $onload.constructor))
         if(importFailSafe.toString() == $onload.toString())
            return;

      owner.onload = importFailSafe;

      function importFailSafe(e)
      {
         AddImportListener(cloak);
         completeImports(e);
         cloak();

         if($onload && (Function == $onload.constructor))
            $onload(e);
      }
   }
   
   
   function RemoveImportListener(moduleName, listener)
   {
      preserveImportFailSafe();
      
      if(!listener || (Function != listener.constructor))
         if(moduleName && (Function == moduleName.constructor))
         {
            listener   = moduleName;
            moduleName = null;
         }
         else return false;
      else
         if(moduleName && (String != moduleName.constructor))
            return false;

      var listenerList = [ importListeners.get('')         // Generic listeners
                         , importListeners.get(moduleName) // Specific listeners
                         , importListeners.get(x3c)        // Ajile listeners
                         ];

      // No listeners to process
      if(!listenerList[0] && !listenerList[1] && !listenerList[2])
         return false;
      
      var wasRemoved = false;

      // Specific to generic notification
      for(var listeners, i=listenerList.length; --i >= 0;)
      {
         if(!listenerList[i]) continue;

         listeners = listenerList[i].getAll();
   
         for(var id in listeners)
            if(!(id in Object.prototype) && (listeners[id] == listener))
            {
               listenerList[i].remove(id);
               wasRemoved = true;
               break;
            }
      }
      
      return wasRemoved;
   }


   /*--------------------------------------------------------------------------+
   | SetOption (  optionName  // String  - Name of option being set.
   |           [, enabled     // Boolean - Indicates whether option is enabled.
   |+--------------------------------------------------------------------------+
   | Used to enable specific options programmatically. If the [enabled]
   | parameter is false or not specified the specified option is disabled. If
   | the [enabled] parameter is true the specified option will be enabled.
   *--------------------------------------------------------------------------*/
   function SetOption(optionName, isOnOrOff)
   {
      preserveImportFailSafe();
      
      if(!optionName || optionName.constructor != String) return;
      
      isOnOrOff  = isOnOrOff == undefined ? true : isOnOrOff;
      optionName = optionName.toLowerCase();

      switch(optionName)
      {
         case   "cloak": CLOAK   = isOnOrOff; break;
         case   "debug": DEBUG   = isOnOrOff; break;
         case "refresh": REFRESH = isOnOrOff; break;
//         case  "update": UPDATE  = isOnOrOff; break;
         
         default: break;
      }
   }
   
   
   function setRefresher(url)
   {
      if((/ajile.refresh/g).test(url))
         return url;

      return url
           + ((/\?/g).test(url) ? '&' : '?')
           + "ajile.refresh="+Math.random();
   }


   /* Exposes Ajile's features for public use */
   function share(THIS)
   {
      // Define Ajile's namespace
      Namespace(x2f);
      pendingImports.add((currentModuleName = x2f), x65);
      processed.add(x2f, x65);

      //Directives
      this.Import    = Import;
      this.ImportAs  = ImportAs;
      this.Load      = Load;
      this.Namespace = Namespace;
      
      //Types
//Not exposing since uri/path could be used to view cloaked modules
      //THIS.NamespaceInfo = NamespaceInfo;

      //Functions
      THIS.AddImportListener    = AddImportListener;
//Not exposing since module.toString() can be used to view cloaked source.
      //THIS.GetModule            = GetModule;
//Not exposing since uri/path could be used to view cloaked modules
      //THIS.GetNamespaceInfo     = GetNamespaceInfo;
      THIS.RemoveImportListener = RemoveImportListener;
      THIS.SetOption            = SetOption;
      THIS.ShowLog              = ShowLog;
      THIS.Unload               = $Destroy;

      //Option Setters
      shareOption(THIS, "Cloak");
      shareOption(THIS, "Debug");
      shareOption(THIS, "Override");
      shareOption(THIS, "Refresh");
      //Doesn't make sense since option is used before it can be explicitly set.
      //shareOption(THIS, "MVC");
      //shareOption(THIS, "Update");

      //BACKWARDS COMPATIBILITY ------------------------------------------ START
      THIS.DIR_NAMESPACE      = THIS.USE_PATH      = '\x2f';
      THIS.DOT_NAMESPACE      = THIS.USE_NAME      = '\x2e';
      THIS.EnableDebugging    = THIS.EnableDebug;
      THIS.GetVersion         = function(){ return INFO.version; };
      this.JSImport           = Import;
      this.JSLoad             = Load;
      this.JSPackage          =
      this.Package            = Namespace;
      this.NamespaceException =
      this.PackageException   = DEPRECATED$NamespaceException;
      //BACKWARDS COMPATIBILITY -------------------------------------------- END
   }
   
   
   function shareOption(THIS, optionName)
   {
      if(!optionName || optionName.constructor != String) return;

      THIS["Enable" + optionName] = function(isOnOrOff)
      {
         SetOption(optionName, isOnOrOff);
      };
   }
   

   function ShowLog()
   {
      preserveImportFailSafe();
      
      if(!DEBUG)
         LOG = "\r\nTo enable debug logging, use <b>Ajile.EnableDebug()<\/b> "
             + "from within any of your scripts or use Ajile's debug load-time "
             + "option as follows:<br><br>"
             + '<pre><code>&lt;script src="'+ INFO.uri +'?<b>debug<\/b>" '
             + 'type="text/javascript"&gt;&lt;\/script&gt;<\/code><\/pre>';

      var output = "<html><head><title>Ajile's Debug Log "
                 + (!DEBUG ? ":: DISABLED" : "") + "<\/title>\r\n"
                 + '<style type="text/css">*{font-family:"Tahoma";font-size: 12px;color:#000;background-color:#eee;}<\/style>\r\n'
                 + "<\/head>\r\n<body>"
                 + LOG.replace(/\r\n/g,"<br>")
                 + "<\/body><\/html>";

      var width  = screen.width  / 1.5;
      var height = screen.height / 1.5;
      var logWin = window.open("","_AJILE_LOG_","width="+width+",height="+height+",addressbar=no,scrollbars=yes,statusbar=no,resizable=yes");

      logWin.document.writeln(output);
      logWin.document.close();
   }


   /* A Simple Set Type. */
   function SimpleSet()
   { 
      this.add         = add;
      this.clear       = clear;
      this.get         = get;
      this.getAll      = getAll;
      this.getAllArray = getAllArray;
      this.getSize     = getSize;
      this.has         = has;
      this.remove      = remove;

      var members      = {};
      var size         = 0;


      function add(key, value)
      {
         if(members[key]) return false;

         members[key] = value;
         size++;

         return true;
      }

      function clear()
      {
         for(var key in members)
            delete members[key];

         size = 0;
      }

      function get(key)
      {
         if((!(key in members)) || typeof(members[key]) == "undefined")
            return undefined;

         return members[key];
      }

      function getAll()
      {
         return members;
      }

      function getAllArray()
      {
         var array = []; 
         
         for(var item in members)
            if(!(item in Object.prototype))
               array[array.length] = [item, members[item]];
            
         return array;
      }

      function getSize()
      {
         return size;
      }

      function has(key)
      {
         return (key in members); 
      }

      function remove(key)
      {
         if(!has(key)) return false;

         delete members[key];
         size--;

         return true;
      }
   }
   

   function updateDependents(fullName)
   {
//return;
      var users = usage.get(fullName);

      if(!users) return;

      users = users.getAll();

      var module;
      for(var user in users)
         if(pendingImports.has(user) && (module = GetModule(user)))
            if(handleImportLoaded(pendingImports.get(user), user, module, this))
               updateDependents(user);
   }


   /*--------------------------------------------------------------------------+
   | NamespaceException (String namespace)
   |+--------------------------------------------------------------------------+
   | Used to catch Namespace exceptions caused by invalid namespace ids.
   *--------------------------------------------------------------------------*/
   function DEPRECATED$NamespaceException(namespace)
   {
      this.name     = "DEPRECATED: " + x2f + ".NamespaceException";
      this.message  = "DEPRECATED: Invalid namespace name [" + namespace + "]";
      this.toString = toString;
      
      function toString()
      {
        return "[ "+ this.name + " ] :: "+ this.message;
      }
   }
};