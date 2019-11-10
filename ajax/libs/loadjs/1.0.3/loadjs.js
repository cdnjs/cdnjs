loadjs = (function () {
/**
 * Global dependencies.
 * @global {Object} document - DOM
 */

var devnull = function() {},
    bundleIdCache = {},
    bundleResultCache = {},
    bundleCallbackQueue = {};


/**
 * Subscribe to bundle load event.
 * @param {string[]} bundleIds - Bundle ids
 * @param {Function} callbackFn - The callback function
 */
function subscribe(bundleIds, callbackFn) {
  // listify
  bundleIds = bundleIds.push ? bundleIds : [bundleIds];
  
  var depsNotFound = [],
      i = bundleIds.length,
      numWaiting = i,
      fn, bundleId, r, q;

  // define callback function
  fn = function(bundleId, pathsNotFound) {
    if (pathsNotFound.length) depsNotFound.push(bundleId);

    numWaiting--;
    if (!numWaiting) callbackFn(depsNotFound);
  };
  
  // register callback
  while (i--) {
    bundleId = bundleIds[i];
    
    // execute callback if in result cache
    r = bundleResultCache[bundleId];
    if (r) {
      fn(bundleId, r);
      continue;
    }
    
    // add to callback queue
    q = bundleCallbackQueue[bundleId] = bundleCallbackQueue[bundleId] || [];
    q.push(fn);
  }
}


/**
 * Publish bundle load event.
 * @param {string} bundleId - Bundle id
 * @param {string[]} pathsNotFound - List of files not found
 */
function publish(bundleId, pathsNotFound) {
  // exit if id isn't defined
  if (!bundleId) return;
  
  var q = bundleCallbackQueue[bundleId];
  
  // cache result
  bundleResultCache[bundleId] = pathsNotFound;
  
  // exit if queue is empty
  if (!q) return;
  
  // empty callback queue
  while (q.length) {
    q[0](bundleId, pathsNotFound);
    q.splice(0, 1);
  }
}


/**
 * Load individual JavaScript file.
 * @param {string} path - The file path
 * @param {Function} callbackFn - The callback function
 */
function loadScript(path, callbackFn) {
  var doc = document,
      s = doc.createElement('script');

  s.src = path;
  
  s.onload = s.onerror = function(ev) {
    // execute callback
    callbackFn(path, ev.type);
  };
  
  // add to document
  doc.head.appendChild(s);
}


/**
 * Load multiple JavaScript files.
 * @param {string[]} paths - The file paths
 * @param {Function} callbackFn - The callback function
 */
function loadScripts(paths, callbackFn) {
  // listify paths
  paths = paths.push ? paths : [paths];
  
  var i = paths.length, numWaiting = i, pathsNotFound = [], fn;
  
  // define callback function
  fn = function(path, result) {
    // handle error
    if (result[0] == 'e') pathsNotFound.push(path);
    
    numWaiting--;
    if (!numWaiting) callbackFn(pathsNotFound);
  };
  
  // load scripts
  while (i--) loadScript(paths[i], fn);
}


/**
 * Initiate script load and register bundle.
 * @param {(string|string[])} paths - The file paths
 * @param {(string|Function)} [arg1] - The bundleId or success callback
 * @param {Function} [arg2] - The success or fail callback
 * @param {Function} [arg3] - The fail callback
 */
function loadjs(paths, arg1, arg2, arg3) {
  var bundleId, successFn, failFn;
  
  // bundleId
  if (arg1 && !arg1.call) bundleId = arg1;
  
  // successFn, failFn
  successFn = bundleId ? arg2 : arg1;
  failFn = bundleId ? arg3 : arg2;
  
  // throw error if bundle is already defined
  if (bundleId) {
    if (bundleId in bundleIdCache) {
      throw new Error("LoadJS: Bundle already defined");
    } else {
      bundleIdCache[bundleId] = true;
    }
  }
  
  // load scripts
  loadScripts(paths, function(pathsNotFound) {
    if (pathsNotFound.length) (failFn || devnull)(pathsNotFound);
    else (successFn || devnull)();
    
    // publish bundle load event
    publish(bundleId, pathsNotFound);
  });
}


/**
 * Execute callbacks when dependencies have been satisfied.
 * @param {(string|string[])} deps - List of bundle ids
 * @param {Function} [successFn] - Success callback
 * @param {Function} [failFn] - Fail callback
 */
loadjs.ready = function (deps, successFn, failFn) {
  // subscribe to bundle load event
  subscribe(deps, function(depsNotFound) {
    // execute callbacks
    if (depsNotFound.length) (failFn || devnull)(depsNotFound);
    else (successFn || devnull)();
  });
  
  return loadjs;
};


/**
 * Manually satisfy bundle dependencies.
 * @param {string} bundleId - The bundle id
 */
loadjs.done = function done(bundleId) {
  publish(bundleId, []);
};


// export
return loadjs;

})();
