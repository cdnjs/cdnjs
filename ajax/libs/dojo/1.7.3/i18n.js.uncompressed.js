define("dojo/i18n", ["./_base/kernel", "require", "./has", "./_base/array", "./_base/config", "./_base/lang", "./_base/xhr", "./json"],
	function(dojo, require, has, array, config, lang, xhr, json) {
	// module:
	//		dojo/i18n
	// summary:
	//		This module implements the !dojo/i18n plugin and the v1.6- i18n API
	// description:
	//		We choose to include our own plugin to leverage functionality already contained in dojo
	//		and thereby reduce the size of the plugin compared to various loader implementations. Also, this
	//		allows foreign AMD loaders to be used without their plugins.


	has.add("dojo-preload-i18n-Api",
		// if true, define the preload localizations machinery
		1
	);

	true || has.add("dojo-v1x-i18n-Api",
		// if true, define the v1.x i18n functions
		1
	);

	var
		thisModule= dojo.i18n=
			// the dojo.i18n module
			{},

		nlsRe=
			// regexp for reconstructing the master bundle name from parts of the regexp match
			// nlsRe.exec("foo/bar/baz/nls/en-ca/foo") gives:
			// ["foo/bar/baz/nls/en-ca/foo", "foo/bar/baz/nls/", "/", "/", "en-ca", "foo"]
			// nlsRe.exec("foo/bar/baz/nls/foo") gives:
			// ["foo/bar/baz/nls/foo", "foo/bar/baz/nls/", "/", "/", "foo", ""]
			// so, if match[5] is blank, it means this is the top bundle definition.
			// courtesy of http://requirejs.org
			/(^.*(^|\/)nls)(\/|$)([^\/]*)\/?([^\/]*)/,

		getAvailableLocales= function(
			root,
			locale,
			bundlePath,
			bundleName
		){
			// return a vector of module ids containing all available locales with respect to the target locale
			// For example, assuming:
			//	 * the root bundle indicates specific bundles for "fr" and "fr-ca",
			//	 * bundlePath is "myPackage/nls"
			//	 * bundleName is "myBundle"
			// Then a locale argument of "fr-ca" would return
			//	 ["myPackage/nls/myBundle", "myPackage/nls/fr/myBundle", "myPackage/nls/fr-ca/myBundle"]
			// Notice that bundles are returned least-specific to most-specific, starting with the root.
			//
			// If root===false indicates we're working with a pre-AMD i18n bundle that doesn't tell about the available locales;
			// therefore, assume everything is available and get 404 errors that indicate a particular localization is not available
			//

			for(var result= [bundlePath + bundleName], localeParts= locale.split("-"), current= "", i= 0; i<localeParts.length; i++){
				current+= (current ? "-" : "") + localeParts[i];
				if(!root || root[current]){
					result.push(bundlePath + current + "/" + bundleName);
				}
			}
			return result;
		},

		cache= {},

		getL10nName= dojo.getL10nName = function(moduleName, bundleName, locale){
			locale = locale ? locale.toLowerCase() : dojo.locale;
			moduleName = "dojo/i18n!" + moduleName.replace(/\./g, "/");
			bundleName = bundleName.replace(/\./g, "/");
			return (/root/i.test(locale)) ?
				(moduleName + "/nls/" + bundleName) :
				(moduleName + "/nls/" + locale + "/" + bundleName);
		},

		doLoad = function(require, bundlePathAndName, bundlePath, bundleName, locale, load){
			// get the root bundle which instructs which other bundles are required to construct the localized bundle
			require([bundlePathAndName], function(root){
				var current= lang.clone(root.root),
					availableLocales= getAvailableLocales(!root._v1x && root, locale, bundlePath, bundleName);
				require(availableLocales, function(){
					for (var i= 1; i<availableLocales.length; i++){
						current= lang.mixin(lang.clone(current), arguments[i]);
					}
					// target may not have been resolve (e.g., maybe only "fr" exists when "fr-ca" was requested)
					var target= bundlePathAndName + "/" + locale;
					cache[target]= current;
					load();
				});
			});
		},

		normalize = function(id, toAbsMid){
			// id may be relative
			// preload has form *preload*<path>/nls/<module>*<flattened locales> and
			// therefore never looks like a relative
			return /^\./.test(id) ? toAbsMid(id) : id;
		},

		getLocalesToLoad = function(targetLocale){
			var list = config.extraLocale || [];
			list = lang.isArray(list) ? list : [list];
			list.push(targetLocale);
			return list;
		},

		load = function(id, require, load){
			//
			// id is in one of the following formats
			//
			//	1. <path>/nls/<bundle>
			//		=> load the bundle, localized to config.locale; load all bundles localized to
			//      config.extraLocale (if any); return the loaded bundle localized to config.locale.
			//
			//  2. <path>/nls/<locale>/<bundle>
			//		=> load then return the bundle localized to <locale>
			//
			//  3. *preload*<path>/nls/<module>*<JSON array of available locales>
			//		=> for config.locale and all config.extraLocale, load all bundles found
			//		   in the best-matching bundle rollup. A value of 1 is returned, which
			//         is meaningless other than to say the plugin is executing the requested
			//         preloads
			//
			// In cases 1 and 2, <path> is always normalized to an absolute module id upon entry; see
			// normalize. In case 3, it <path> is assumed to be absolue; this is arranged by the builder.
			//
			// To load a bundle means to insert the bundle into the plugin's cache and publish the bundle
			// value to the loader. Given <path>, <bundle>, and a particular <locale>, the cache key
			//
			//   <path>/nls/<bundle>/<locale>
			//
			// will hold the value. Similarly, then plugin will publish this value to the loader by
			//
			//   define("<path>/nls/<bundle>/<locale>", <bundle-value>);
			//
			// Given this algorithm, other machinery can provide fast load paths be preplacing
			// values in the plugin's cache, which is public. When a load is demanded the
			// cache is inspected before starting any loading. Explicitly placing values in the plugin
			// cache is an advanced/experimental feature that should not be needed; use at your own risk.
			//
			// For the normal AMD algorithm, the root bundle is loaded first, which instructs the
			// plugin what additional localized bundles are required for a particular locale. These
			// additional locales are loaded and a mix of the root and each progressively-specific
			// locale is returned. For example:
			//
			// 1. The client demands "dojo/i18n!some/path/nls/someBundle
			//
			// 2. The loader demands load(some/path/nls/someBundle)
			//
			// 3. This plugin require's "some/path/nls/someBundle", which is the root bundle.
			//
			// 4. Assuming config.locale is "ab-cd-ef" and the root bundle indicates that localizations
			//    are available for "ab" and "ab-cd-ef" (note the missing "ab-cd", then the plugin
			//    requires "some/path/nls/ab/someBundle" and "some/path/nls/ab-cd-ef/someBundle"
			//
			// 5. Upon receiving all required bundles, the plugin constructs the value of the bundle
			//    ab-cd-ef as...
			//
			//      mixin(mixin(mixin({}, require("some/path/nls/someBundle"),
			//        require("some/path/nls/ab/someBundle")),
			//          require("some/path/nls/ab-cd-ef/someBundle"));
			//
			//    This value is inserted into the cache and published to the loader at the
			//    key/module-id some/path/nls/someBundle/ab-cd-ef.
			//
			// The special preload signature (case 3) instructs the plugin to stop servicing all normal requests
			// (further preload requests will be serviced) until all ongoing preloading has completed.
			//
			// The preload signature instructs the plugin that a special rollup module is available that contains
			// one or more flattened, localized bundles. The JSON array of available locales indicates which locales
			// are available. Here is an example:
			//
			//   *preload*some/path/nls/someModule*["root", "ab", "ab-cd-ef"]
			//
			// This indicates the following rollup modules are available:
			//
			//   some/path/nls/someModule_ROOT
			//   some/path/nls/someModule_ab
			//   some/path/nls/someModule_ab-cd-ef
			//
			// Each of these modules is a normal AMD module that contains one or more flattened bundles in a hash.
			// For example, assume someModule contained the bundles some/bundle/path/someBundle and
			// some/bundle/path/someOtherBundle, then some/path/nls/someModule_ab would be expressed as folllows:
			//
			// define({
			//   some/bundle/path/someBundle:<value of someBundle, flattened with respect to locale ab>,
			//   some/bundle/path/someOtherBundle:<value of someOtherBundle, flattened with respect to locale ab>,
			// });
			//
			// E.g., given this design, preloading for locale=="ab" can execute the following algorithm:
			//
			// require(["some/path/nls/someModule_ab"], function(rollup){
			//   for(var p in rollup){
			//     var id = p + "/ab",
			//     cache[id] = rollup[p];
			//     define(id, rollup[p]);
			//   }
			// });
			//
			// Similarly, if "ab-cd" is requested, the algorithm can determine that "ab" is the best available and
			// load accordingly.
			//
			// The builder will write such rollups for every layer if a non-empty localeList  profile property is
			// provided. Further, the builder will include the following cache entry in the cache associated with
			// any layer.
			//
			//   "*now":function(r){r(['dojo/i18n!*preload*<path>/nls/<module>*<JSON array of available locales>']);}
			//
			// The *now special cache module instructs the loader to apply the provided function to context-require
			// with respect to the particular layer being defined. This causes the plugin to hold all normal service
			// requests until all preloading is complete.
			//
			// Notice that this algorithm is rarely better than the standard AMD load algorithm. Consider the normal case
			// where the target locale has a single segment and a layer depends on a single bundle:
			//
			// Without Preloads:
			//
			//   1. Layer loads root bundle.
			//   2. bundle is demanded; plugin loads single localized bundle.
			//
			// With Preloads:
			//
			//   1. Layer causes preloading of target bundle.
			//   2. bundle is demanded; service is delayed until preloading complete; bundle is returned.
			//
			// In each case a single transaction is required to load the target bundle. In cases where multiple bundles
			// are required and/or the locale has multiple segments, preloads still requires a single transaction whereas
			// the normal path requires an additional transaction for each additional bundle/locale-segment. However all
			// of these additional transactions can be done concurrently. Owing to this analysis, the entire preloading
			// algorithm can be discard during a build by setting the has feature dojo-preload-i18n-Api to false.
			//
			if(has("dojo-preload-i18n-Api")){
				var split = id.split("*"),
					preloadDemand = split[1]=="preload";
				if(preloadDemand){
					if(!cache[id]){
						// use cache[id] to prevent multiple preloads of the same preload; this shouldn't happen, but
						// who knows what over-aggressive human optimizers may attempt
						cache[id] = 1;
						preloadL10n(split[2], json.parse(split[3]), 1);
					}
					// don't stall the loader!
					load(1);
				}
				if(preloadDemand || waitForPreloads(id, require, load)){
					return;
				}
			}

			var match= nlsRe.exec(id),
				bundlePath= match[1] + "/",
				bundleName= match[5] || match[4],
				bundlePathAndName= bundlePath + bundleName,
				localeSpecified = (match[5] && match[4]),
				targetLocale=  localeSpecified || dojo.locale,
				loadTarget= bundlePathAndName + "/" + targetLocale,
				loadList = localeSpecified ? [targetLocale] : getLocalesToLoad(targetLocale),
				remaining = loadList.length,
				finish = function(){
					if(!--remaining){
						load(lang.delegate(cache[loadTarget]));
					}
				};
			array.forEach(loadList, function(locale){
				var target = bundlePathAndName + "/" + locale;
				if(has("dojo-preload-i18n-Api")){
					checkForLegacyModules(target);
				}
				if(!cache[target]){
					doLoad(require, bundlePathAndName, bundlePath, bundleName, locale, finish);
				}else{
					finish();
				}
			});
		};

	if(has("dojo-unit-tests")){
		var unitTests = thisModule.unitTests = [];
	}

	if(has("dojo-preload-i18n-Api") || 1){
		var normalizeLocale = thisModule.normalizeLocale= function(locale){
				var result = locale ? locale.toLowerCase() : dojo.locale;
				return result == "root" ? "ROOT" : result;
			},

			isXd = function(mid){
				return (1 && 1) ?
					require.isXdUrl(require.toUrl(mid + ".js")) :
					true;
			},

			preloading = 0,

			preloadWaitQueue = [],

			preloadL10n = thisModule._preloadLocalizations = function(/*String*/bundlePrefix, /*Array*/localesGenerated, /*boolean*/ guaranteedAmdFormat){
				//	summary:
				//		Load available flattened resource bundles associated with a particular module for dojo.locale and all dojo.config.extraLocale (if any)
				//
				//  descirption:
				//		Only called by built layer files. The entire locale hierarchy is loaded. For example,
				//		if locale=="ab-cd", then ROOT, "ab", and "ab-cd" are loaded. This is different than v1.6-
				//		in that the v1.6- would lonly load ab-cd...which was *always* flattened.
				//
				//		If guaranteedAmdFormat is true, then the module can be loaded with require thereby circumventing the detection algorithm
				//		and the extra possible extra transaction.
				//

				function forEachLocale(locale, func){
					// given locale= "ab-cd-ef", calls func on "ab-cd-ef", "ab-cd", "ab", "ROOT"; stops calling the first time func returns truthy
					var parts = locale.split("-");
					while(parts.length){
						if(func(parts.join("-"))){
							return true;
						}
						parts.pop();
					}
					return func("ROOT");
				}

				function preload(locale){
					locale = normalizeLocale(locale);
					forEachLocale(locale, function(loc){
						if(array.indexOf(localesGenerated, loc)>=0){
							var mid = bundlePrefix.replace(/\./g, "/")+"_"+loc;
							preloading++;
							(isXd(mid) || guaranteedAmdFormat ? require : syncRequire)([mid], function(rollup){
								for(var p in rollup){
									cache[p + "/" + locale] = rollup[p];
								}
								--preloading;
								while(!preloading && preloadWaitQueue.length){
									load.apply(null, preloadWaitQueue.shift());
								}
							});
							return true;
						}
						return false;
					});
				}

				preload();
				array.forEach(dojo.config.extraLocale, preload);
			},

			waitForPreloads = function(id, require, load){
				if(preloading){
					preloadWaitQueue.push([id, require, load]);
				}
				return preloading;
			};
	}

	if(1){
		// this code path assumes the dojo loader and won't work with a standard AMD loader
		var evalBundle=
				// use the function ctor to keep the minifiers away (also come close to global scope, but this is secondary)
				new Function(
					"__bundle",                // the bundle to evalutate
					"__checkForLegacyModules", // a function that checks if __bundle defined __mid in the global space
					"__mid",                   // the mid that __bundle is intended to define

					// returns one of:
					//		1 => the bundle was an AMD bundle
					//		a legacy bundle object that is the value of __mid
					//		instance of Error => could not figure out how to evaluate bundle

					  // used to detect when __bundle calls define
					  "var define = function(){define.called = 1;},"
					+ "    require = function(){define.called = 1;};"

					+ "try{"
					+		"define.called = 0;"
					+		"eval(__bundle);"
					+		"if(define.called==1)"
								// bundle called define; therefore signal it's an AMD bundle
					+			"return 1;"

					+		"if((__checkForLegacyModules = __checkForLegacyModules(__mid)))"
								// bundle was probably a v1.6- built NLS flattened NLS bundle that defined __mid in the global space
					+			"return __checkForLegacyModules;"

					+ "}catch(e){}"
					// evaulating the bundle was *neither* an AMD *nor* a legacy flattened bundle
					// either way, re-eval *after* surrounding with parentheses

					+ "try{"
					+ 		"return eval('('+__bundle+')');"
					+ "}catch(e){"
					+ 		"return e;"
					+ "}"
				),

			syncRequire= function(deps, callback){
				var results= [];
				array.forEach(deps, function(mid){
					var url= require.toUrl(mid + ".js");

					function load(text){
						var result = evalBundle(text, checkForLegacyModules, mid);
						if(result===1){
							// the bundle was an AMD module; re-inject it through the normal AMD path
							// we gotta do this since it could be an anonymous module and simply evaluating
							// the text here won't provide the loader with the context to know what
							// module is being defined()'d. With browser caching, this should be free; further
							// this entire code path can be circumvented by using the AMD format to begin with
							require([mid], function(bundle){
								results.push(cache[url]= bundle);
							});
						}else{
							if(result instanceof Error){
								console.error("failed to evaluate i18n bundle; url=" + url, result);
								result = {};
							}
							// nls/<locale>/<bundle-name> indicates not the root.
							results.push(cache[url] = (/nls\/[^\/]+\/[^\/]+$/.test(url) ? result : {root:result, _v1x:1}));
						}
					}

					if(cache[url]){
						results.push(cache[url]);
					}else{
						var bundle= require.syncLoadNls(mid);
						// don't need to check for legacy since syncLoadNls returns a module if the module
						// (1) was already loaded, or (2) was in the cache. In case 1, if syncRequire is called
						// from getLocalization --> load, then load will have called checkForLegacyModules() before
						// calling syncRequire; if syncRequire is called from preloadLocalizations, then we
						// don't care about checkForLegacyModules() because that will be done when a particular
						// bundle is actually demanded. In case 2, checkForLegacyModules() is never relevant
						// because cached modules are always v1.7+ built modules.
						if(bundle){
							results.push(bundle);
						}else{
							if(!xhr){
								try{
									require.getText(url, true, load);
								}catch(e){
									results.push(cache[url]= {});
								}
							}else{
								xhr.get({
									url:url,
									sync:true,
									load:load,
									error:function(){
										results.push(cache[url]= {});
									}
								});
							}
						}
					}
				});
				callback && callback.apply(null, results);
			},

			checkForLegacyModules = function(target){
				// legacy code may have already loaded [e.g] the raw bundle x/y/z at x.y.z; when true, push into the cache
				for(var result, names = target.split("/"), object = dojo.global[names[0]], i = 1; object && i<names.length-1; object = object[names[i++]]){}
				if(object){
					result = object[names[i]];
					if(!result){
						// fallback for incorrect bundle build of 1.6
						result = object[names[i].replace(/-/g,"_")];
					}
					if(result){
						cache[target] = result;
					}
				}
				return result;
			};

		thisModule.getLocalization= function(moduleName, bundleName, locale){
			var result,
				l10nName= getL10nName(moduleName, bundleName, locale).substring(10);
			load(l10nName, (!isXd(l10nName) ? syncRequire : require), function(result_){ result= result_; });
			return result;
		};

		if(has("dojo-unit-tests")){
			unitTests.push(function(doh){
				doh.register("tests.i18n.unit", function(t){
					var check;

					check = evalBundle("{prop:1}");
					t.is({prop:1}, check); t.is(undefined, check[1]);

					check = evalBundle("({prop:1})");
					t.is({prop:1}, check); t.is(undefined, check[1]);

					check = evalBundle("{'prop-x':1}");
					t.is({'prop-x':1}, check); t.is(undefined, check[1]);

					check = evalBundle("({'prop-x':1})");
					t.is({'prop-x':1}, check); t.is(undefined, check[1]);

					check = evalBundle("define({'prop-x':1})");
					t.is(1, check);

					check = evalBundle("this is total nonsense and should throw an error");
					t.is(check instanceof Error, true);
				});
			});
		}
	}

	return lang.mixin(thisModule, {
		dynamic:true,
		normalize:normalize,
		load:load,
		cache:cache
	});
});
