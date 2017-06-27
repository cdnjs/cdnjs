/*-----------------------------------------------------------------------------+
| Product:  Ajile [com.iskitz.ajile]
| Version:  0.7.9
|+-----------------------------------------------------------------------------+
| Author:   Michael A. I. Lee [ http://ajile.iskitz.com/ ]
|
| Created:  Tuesday,   November   4, 2003    [2003.11.04]
| Modified: Friday,    March      9, 2007    [2007.03.09 - 01:06:04 EST]
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
| Portions created by the Initial Developer are Copyright (C) 2003-2007
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

   var CLOAK     = true
     , DEBUG     = false
     , LEGACY    = false
     , MVC       = true
     , MVC_SHARE = true
     , OVERRIDE  = false
     , REFRESH   = false;

   var ALIAS      = "Ajile"
     , ATTRIB     = "Powered by "
     , CONTROLLER = "index"
     , EXTENSION  = ".js"
     , INTERNAL   = "<*>"
     , QNAME      = "com.iskitz.ajile"
     , SEPARATOR  = '/'
     , TYPES      = [ ALIAS, "Import", "ImportAs", "Load", "Namespace"
                    , "NamespaceException", "Package", "PackageException"
                    ];

   var INFO   = new NamespaceInfo()
     , LOADED = "_$loaded$_"
     , LOADER
     , LOG    = '';

   var NOTATIONS = [ '*',    '|', ':',    '"', '<', '>', '?',    '[', '{', '('
                   , ')',    '}', ']', '\x5c', '&', '@', '#', '\x24', '%', '!'
                   , ';',    "'", '=',    '+', '~', ',', '^',    '_', ' ', '`'
                   , '-', '\x2f', '.'
                   ];

   var RE_OPT_CLOAK        = (   /(cloakoff|cloak)/)
     , RE_OPT_DEBUG        = (   /(debugoff|debug)/)
     , RE_OPT_LEGACY       = (  /(legacyoff|legacy)/)
     , RE_OPT_MVC          = (     /(mvcoff|mvc)/)
     , RE_OPT_MVC_SHARE    = (/(mvcshareoff|mvcshare)/)
     , RE_OPT_OVERRIDE     = (/(overrideoff|override)/)
     , RE_OPT_REFRESH      = ( /(refreshoff|refresh)/)
     , RE_PARENT_DIR       = (/(.*\/)[^\/]+/)
     , RE_PARENT_NAMESPACE = (/(.*)\.[^\.]+/)
     , RE_RELATIVE_DIR     = (/(\/\.\/)|(\/[^\/]*\/\.\.\/)/)
     , RE_URL_PROTOCOL     = (/:\/\x2f/);
   
   var currentModuleName = QNAME
     , dependence        = new SimpleSet()
     , importListeners   = new SimpleSet()
     , isSafari          = (/WebKit/i).test(window.navigator.userAgent)
     , modulePaths       = new SimpleSet();

   var nsInfoMap =
   {
      clear: function()
      {
         for(var moduleName in this)
            delete this[moduleName];
      }
   };


   var pendingImports = new SimpleSet()
     , processed      = new SimpleSet()
     , usage          = new SimpleSet();


   (function(THIS)
   {
      if(!(INFO = getNamespaceInfo(QNAME))) return;

      var meta = document.createElement("meta");
      
      if(meta)
      {
         meta.httpEquiv = ATTRIB + ALIAS; ATTRIB= QNAME.split('\x2e').reverse().join('\x2e');
         meta.content   = ATTRIB + " :: Smart scripts that play nice ";
         getMainLoader(this.document).appendChild(meta);
      }
      
      INFO = new NamespaceInfo(INFO);

      share(THIS);
      handleImportLoaded(ALIAS, QNAME, THIS, this);
      loadController();
      cloak(QNAME);
      preserveImportFailSafe();
   })(this);


   function $Destroy(fullName)
   {
      if(fullName && fullName != QNAME)
      {
         destroyModule(fullName);
         return;
      }
      
      dependence.clear();
      importListeners.clear();
      modulePaths.clear();
      nsInfoMap.clear();
      pendingImports.clear();
      processed.clear();
      usage.clear();
      cloak();
      
      delete Import;
      delete ImportAs;
      delete Load;
      delete Namespace;
      delete DEPRECATED$NamespaceException;

      LOADER
      = window[ALIAS]
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

      if(moduleName == INTERNAL && this == window[ALIAS])
         return false;
         
      if(!moduleName && this != window[ALIAS])
         moduleName = INTERNAL;

      if(moduleName && (processed.has(moduleName) || GetModule(moduleName)))
         return setTimeout(function(){listener(moduleName);}, 62.25);

      if(!moduleName && (processed.getSize() > 0 || pendingImports.getSize() == 0))
         setTimeout(function(){listener(moduleName);}, 62.25);

      var listeners = importListeners.get((moduleName = (moduleName || '')));

      if(!listeners)
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
      if(moduleName && String != moduleName.constructor) return;

      moduleName    = moduleName || '';
      var container = GetNamespaceInfo(moduleName);
      var isCloaked = (container && container.hasOption("cloak"));

      for(var id, src, sys, loaders=getLoaders(), i=loaders.length; --i >= 0;)
      {
         if(!loaders[i] || ((id = loaders[i].title) && moduleName && (id != moduleName)))
            continue;

         src = loaders[i].src;
         sys = (src && (src.indexOf(QNAME) >= 0)) || (id && (id.indexOf(QNAME) == 0));

         if(sys || (!src && id) || isCloaked || CLOAK)
            if((container = loaders[i].parentNode) && container.removeChild)
               container.removeChild(loaders[i]);
      }
   }
   
   
   function compareNumbers(num1, num2) { return num1 - num2; }


   function completeImports(fullName)
   {
      var module, modules;

      if(!(isString(fullName) && pendingImports.has(fullName)))
         modules = pendingImports.getAllArray();
      else if(GetModule(fullName))
         modules = [[fullName, pendingImports.get(fullName)]];

      if(!modules) return;
      
      for(var shortName, i=modules.length; --i >=0;)
      {
         fullName = modules[i][0];

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


   function getMainLoader(container)
   {
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
      
      var iExt = EXTENSION
               ? path.lastIndexOf(EXTENSION)
               : path.lastIndexOf('\x2e');

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

   
   function GetNamespaceInfo(moduleOrName)
   {
      if(!moduleOrName)
         return new NamespaceInfo(INFO);

      var isModuleName = moduleOrName.constructor == String;
      
      for(var moduleName in nsInfoMap)
         if(!(moduleName in Object.prototype))
            if(  ( isModuleName && moduleOrName == moduleName)
              || (!isModuleName && moduleOrName == GetModule(moduleName)))
              return nsInfoMap[moduleName];

      return null;
   }


   function getNamespaceInfo($namespace, $notation)
   {
      $namespace = $namespace || QNAME;

      if($namespace == QNAME && INFO.path) return INFO;

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

         if(path && path.search(RE_URL_PROTOCOL) == -1)
         {
            path = unescape(document.location.href);

            if(path.charAt(path.length - 1) != SEPARATOR)
               if((paths = RE_PARENT_DIR.exec(path)) != null)
                  if(paths[1].length > path.search(RE_URL_PROTOCOL) + 3)
                     path = paths[1];

            path += unescape(loaders[i].src);
         }

         if(path == undefined || path == null)
            continue;
      
         while(RE_RELATIVE_DIR.test(path))
            path  = path.replace(RE_RELATIVE_DIR, '\x2f');

         if(modulePaths.has(path)) continue;

         modulePaths.add(path);
         
         if(found) continue;

         var lookupList;
         for(var notation in lookups)
         {
            if(notation in Object.prototype)
               continue;

            lookupList = lookups[notation];
            
            var lookup, position, positions = [];
            for(var lc=lookupList.length; --lc >= 0;)
            {
               lookup   = lookupList[lc];
               position = path.lastIndexOf(lookup) + 1;

               if(position <= 0 || position == positions[0])
                  continue;

               positions[positions.length] = position;
               log("Found Path [ "+path+" ]", arguments);
            }
                  
            if(positions.length == 0) continue;

            positions.sort(compareNumbers);
            position = positions[positions.length-1];

            $notation = (position == (path.lastIndexOf(lookup) + 1))
                      ? notation
                      : undefined;
   
            $path = path.substring(0, position);
            found = true;

            if($namespace == QNAME && loaders[i].title != QNAME)
               loaders[i].title = QNAME;

            var iEnd      = position + lookup.length - 2;
            var metaInfo  = getMETAInfo(path.substring(iEnd + 1));
            var extension = metaInfo[1];
            var version   = metaInfo[0];
            break;
         }
      }
         
      if(!$path) return null;
      
      nsInfo = new NamespaceInfo( $path, $notation, $namespace, null, version
                                , extension);

      nsInfoMap[$namespace] = nsInfo;

      return nsInfo;
   }
   
   
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

                  var iEnd      = (iFound + 1) + lookupList[i].length - 2;
                  var metaInfo  = getMETAInfo(path.substring(iEnd + 1));
                  var extension = metaInfo[1];
                  var version   = metaInfo[0];

                  log("Found Cached Path [ "+path+" ]", arguments);
                  break paths;
               }

               if(i == 0) delete notations[--notations.length];
            }
         }
      }

      if(!iFinds || iFinds.length == 0) return null;

      path = path.substring(0, iFinds[iPick]);

      var nsInfo = new NamespaceInfo( path, notations[iPick], $namespace
                                    , null, version, extension);

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
             , (LEGACY    ? "legacy"   : "legacyoff")
             , (MVC       ? "mvc"      : "mvcoff")
             , (MVC_SHARE ? "mvcshare" : "mvcshareoff")
             , (OVERRIDE  ? "override" : "overrideoff")
             , (REFRESH   ? "refresh"  : "refreshoff")
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

      if(url == undefined || url == null || url.constructor != String)
         url = (nsInfo != undefined && typeof(nsInfo.path) != "undefined")
               ? nsInfo.path : (INFO.path || '');

      if(url.lastIndexOf('\x2f') != (url.length - 1)) url += '\x2f';

      //Backwards compatibility (JSPackaging)
      if(LEGACY)
         if     (notation == false) notation = '\x2f';
         else if(notation == true)  notation = '\x2e';
      
      if(notation == undefined)
         notation = nsInfo ? nsInfo.notation == undefined
                           ? INFO.notation : nsInfo.notation
                           : INFO.notation;
      
      url += escape(fullName.replace(/\x2e/g, notation));

      addDependence(fullName, (shortName == '*' ? fullName : shortName));
      addUsage(fullName);

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

      return module;
   }
   
   
   function handleImportLoaded(shortName, fullName, module, owner)
   {
      owner = owner || this;

      if(!module) return module;
      
      if((shortName != LOADED) && hasNamingConflict(shortName, fullName, owner))
      {
         pendingImports.remove(fullName);
         return module;
      }
      
      if(!isSupported(fullName, shortName))
         return undefined;

      var logMsg      = [];
      var pendingName = pendingImports.get(fullName);

      if(shortName && shortName != LOADED && (!pendingName || (pendingName != '*' && pendingName != LOADED)))
      {
         owner[shortName] = module;
         logMsg[0] = 'ImportAs ("'+shortName+'", "'+fullName+'")...SUCCESS';
         pendingImports.remove(fullName);
      }

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

         pendingImports.remove(fullName);

         if(shortName != LOADED)
            pendingImports.add(fullName, LOADED);
      }
      
      else if(pendingName != '*' && (pendingName == LOADED || shortName == LOADED))
      {
         logMsg[0] = 'Import ("'+fullName+'.*")...SUCCESS';
         pendingImports.remove(fullName);
      }
      
      if(logMsg.length > 0)
         log(logMsg.join("\r\n"), arguments);

      notifyImportListeners(fullName);
      return module;
   }
   
   
   function hasNamingConflict(shortName, fullName, owner)
   {
      owner = owner || this;

      if(  OVERRIDE
        || (typeof owner[shortName] == "undefined")
        || (GetModule(fullName) == owner[shortName]))
         return false;

      log( "\nWARNING: There is a naming conflict with the alias " + shortName
         + ".\nConsider using ImportAs with a different alias. For example:"
         + '\n\n\tImportAs ("'+ shortName +'1", "'+ fullName +'");\n\n'
         + "The module can currently be accessed using its fully-qualified "
         + "name:\n\n\t"+ fullName +".\n"
         , arguments
         , DEBUG);
         
      return true;
   }


   function Import(fullName, url, notation, owner)
   {
      return ImportAs (undefined, fullName, url, notation, owner);
   }


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

      if(shortName == '*')
         fullName = RE_PARENT_NAMESPACE.exec(fullName)[1];

      else if(owner[shortName])
         for(var t=TYPES.length; --t >= 0;)
         {
            if(shortName != TYPES[t]) continue;

            log('ImportAs ("'+ shortName +'", "'+ fullName +'") '
               + "failed. "+ shortName +" is restricted.", arguments);
                 
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

      if((i >= j && shortName != '*'))
      {
         if(pendingImports.has(fullName) || !processed.has(fullName))
         {
            module = handleImportLoaded(shortName, fullName, module, owner);
            updateDependents(fullName);
         }

         return module;
      }

      if(pendingImports.has(fullName))
      {
         if(shortName == '*' || shortName == LOADED)
            shortName = fullName;

         addDependence(fullName, shortName);
         addUsage(fullName);
         return undefined;
      }

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

         if(GetModule(fullName))
            completeImports();
         else
            threadID = window.setTimeout(start, 0);
      }
      
      function stop()
      {
         if(threadID != undefined)
            window.clearTimeout(threadID);
         
         if(terminatorID != undefined)
            window.clearInterval(terminatorID);
      }
   }


   function isIncompatible()
   {
      return (  typeof document                      == "undefined"
             || typeof document.appendChild          == "undefined"
             || typeof document.createElement        == "undefined"
             || typeof document.getElementsByTagName == "undefined"
             || typeof document.removeChild          == "undefined"
             );
   }

   
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

         pendingImports.add(fullName, shortName);
         (new ImportThread(fullName)).start();
         return false;
      }

      if(!supporters || !(supporters = supporters.getAll()))
         return isInlineImportReady();

      for(var supporter in supporters)
         if(!GetModule(supporters[supporter]))
            return false;

      return isInlineImportReady();
   }


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
         modulePaths.add(unescape(url));
         if(REFRESH) url = setRefresher(url);
      }

      if(!(type || language))
      {
         language = "JavaScript";
         type     = "text/javascript";
      }

      if(defer == undefined) defer = false;

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

      if(url)
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

      if(!code) return true;

      if(url)
      {
         Load(null, container, code, defer, title, type, language);
         return true;
      }

      if(typeof(script.canHaveChildren) == "undefined" || script.canHaveChildren)
         script.appendChild(container.createTextNode(code));

      else if(!script.canHaveChildren)
         script.text = code;

      getMainLoader(container).appendChild(script);
      return false;
   }


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

      if((option = RE_OPT_LEGACY.exec(path)))
         LEGACY = option[1] == "legacy";

      if((option = RE_OPT_MVC.exec(path)))
         MVC = option[1] == "mvc";

      if((option = RE_OPT_MVC_SHARE.exec(path)))
         MVC_SHARE = option[1] == "mvcshare";

      if((option = RE_OPT_OVERRIDE.exec(path)))
         OVERRIDE = option[1] == "override";

      if((option = RE_OPT_REFRESH.exec(path)))
         REFRESH = option[1] == "refresh";
   }


   function LoadSimple(src, container, code, defer, title, type, language)
   {
      if(!(container = getContainer(container)))
          return;

      var savedCode;

      if(src)
      {
         log("LoadSimple [ " + src + " ]...", arguments);

         savedCode = code;
         code      = null;
      }
      
      var scriptTag = '<'+"script"
                    + (defer   ?  ' defer="defer"'                  : '')
                    + (language? (' language="'  + language + '"')  : '')
                    + (title   ? (' title="'     + title    + '"')  : '')
                    + (type    ? (' type="'      + type     + '"')  : '')
                    + (src     ? (' src="'       + src      + '">') : '>')
                    + (code    ? (code                      + ';')  : '')
                    + "<\/script>\n";

      container.write(scriptTag);

      if(src)
         log("LoadSimple [ " + src + " ]...DONE!", arguments);

      if(!(code = code || savedCode)) return;

      if(src)
         LoadSimple(null, container, code, defer, title, type, language);
   }


   function log(message, _caller, showLog)
   {
      if(!DEBUG && !showLog) return;
      
      var calledBy = (_caller && _caller.callee)
                   ? _caller.callee.toString().split("function ")[1].split("(")[0]
                   : '';

      if(message != undefined)
         LOG = new Date()        + "\t:: "
             + currentModuleName + " :: "
             + calledBy          + "\r\n"
             + message           + "\r\n\r\n"
             + LOG;

      if(showLog) ShowLog();
   }


   function logImportCheck(shortName, fullName, params)
   {
      var logMsg = (shortName == '*' || shortName == LOADED)
                 ? ('Import ("'+ fullName +'.*")')
                 : ('ImportAs ("'+ shortName +'", "'+ fullName +'")');
      
      log((logMsg + "...CHECKING"), params);
   }


   function Namespace(namespace, path, notation, owner)
   {
      preserveImportFailSafe();
      
      namespace = namespace || "\x3cdefault\x3e";

      log('Namespace ("' + namespace + '")', arguments);

      var script = owner || window;

      if(namespace == "\x3cdefault\x3e")
      {
         INFO.update(path, notation);
         log(INFO, arguments);
         return script;
      }

      detectCurrentModule(namespace);

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
      
      if(!path)
         nsInfo = getNamespaceInfo(namespace, notation);
      
      if(path || !nsInfo)
         nsInfo = new NamespaceInfo(path, notation, namespace);

      if(nsInfo && !nsInfoMap[namespace])
         nsInfoMap[namespace] = nsInfo;

      log(nsInfo, arguments);

      return script;
   }


   function NamespaceInfo(path, notation, fullName, shortName, version, extension, options)
   {
      this.hasOption = hasOption;
      this.toString  = toString;
      this.update    = update;

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
         return "NamespaceInfo"
            + "\r\n[ fullName: "  + this.fullName
            + "\r\n, shortName: " + this.shortName
            + "\r\n, version: "   + this.version
            + "\r\n, notation: "  + this.notation
            + "\r\n, options: "   + this.options
            + "\r\n, path: "      + this.path
            + "\r\n, uri: "       + this.uri
            + "\r\n]";
      }
      
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
      var listenerList = [ importListeners.get('')
                         , importListeners.get(fullName)
                         , importListeners.get(INTERNAL)
                         ];

      if(!listenerList[0] && !listenerList[1] && !listenerList[2])
         return;
      
      var hasListeners =  (listenerList[0] && (listenerList[0].getSize() > 0))
                       || (listenerList[1] && (listenerList[1].getSize() > 0));
      
      if(DEBUG && hasListeners)
         log(("Notify Import Listeners :: " + fullName + "..."), arguments);

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

      var listenerList = [ importListeners.get('')
                         , importListeners.get(moduleName)
                         , importListeners.get(INTERNAL)
                         ];

      if(!listenerList[0] && !listenerList[1] && !listenerList[2])
         return false;
      
      var wasRemoved = false;

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


   function SetOption(optionName, isOnOrOff)
   {
      preserveImportFailSafe();
      
      if(!optionName || optionName.constructor != String) return;
      
      isOnOrOff  = isOnOrOff == undefined ? true : isOnOrOff;
      optionName = optionName.toLowerCase();

      switch(optionName)
      {
         case    "cloak": CLOAK    = isOnOrOff; break;
         case    "debug": DEBUG    = isOnOrOff; break;
         case   "legacy": LEGACY   = isOnOrOff; break;
         case "override": OVERRIDE = isOnOrOff; break;
         case  "refresh": REFRESH  = isOnOrOff; break;
         
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


   function share(THIS)
   {
      Namespace(QNAME);
      pendingImports.add((currentModuleName = QNAME), ALIAS);
      processed.add(QNAME, ALIAS);

      this.Import    = Import;
      this.ImportAs  = ImportAs;
      this.Load      = Load;
      this.Namespace = Namespace;

      THIS.AddImportListener    = AddImportListener;
      THIS.GetVersion           = function(){ return INFO.version; };
      THIS.RemoveImportListener = RemoveImportListener;
      THIS.SetOption            = SetOption;
      THIS.ShowLog              = ShowLog;
      THIS.Unload               = $Destroy;

      shareOption(THIS, "Cloak");
      shareOption(THIS, "Debug");
      shareOption(THIS, "Legacy");
      shareOption(THIS, "Override");
      shareOption(THIS, "Refresh");

      //BACKWARDS COMPATIBILITY ------------------------------------------ START
      if(LEGACY)
      {
         THIS.DIR_NAMESPACE      = THIS.USE_PATH      = '\x2f';
         THIS.DOT_NAMESPACE      = THIS.USE_NAME      = '\x2e';
         THIS.EnableDebugging    = THIS.EnableDebug;
         this.JSImport           = Import;
         this.JSLoad             = Load;
         this.JSPackage          =
         this.Package            = Namespace;
         this.NamespaceException =
         this.PackageException   = DEPRECATED$NamespaceException;
      }
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
      var users = usage.get(fullName);

      if(!users) return;

      users = users.getAll();

      var module;
      for(var user in users)
         if(pendingImports.has(user) && (module = GetModule(user)))
            if(handleImportLoaded(pendingImports.get(user), user, module, this))
               updateDependents(user);
   }


   function DEPRECATED$NamespaceException(namespace)
   {
      this.name     = "DEPRECATED: " + QNAME + ".NamespaceException";
      this.message  = "DEPRECATED: Invalid namespace name [" + namespace + "]";
      this.toString = toString;
      
      function toString()
      {
        return "[ "+ this.name + " ] :: "+ this.message;
      }
   }
};