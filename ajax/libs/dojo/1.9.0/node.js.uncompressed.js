define("dojo/node", ["./has"], function(has){
	if(! 0 ){
		throw new Error("node plugin failed to load because environment is not Node.js");
	}

	return {
		// summary:
		//		This AMD plugin module allows native Node.js modules to be loaded by AMD modules using the Dojo
		//		loader. Note that this plugin will not work with AMD loaders other than the Dojo loader.
		// example:
		//	|	require(["dojo/node!fs"], function(fs){
		//	|		var fileData = fs.readFileSync("foo.txt", "utf-8");
		//	|	});

		load: function(/*string*/ id, /*Function*/ require, /*Function*/ load){
			// summary:
			//		Standard AMD plugin interface. See https://github.com/amdjs/amdjs-api/wiki/Loader-Plugins
			//		for information.

			if(!require.nodeRequire){
				throw new Error("Cannot find native require function");
			}

			load((function(id, require){
				var oldDefine = define,
					result;

				// Some modules may attempt to detect an AMD loader via define and define.amd.  This can cause issues
				// when other CommonJS modules attempt to load them via the standard node require().  If define is
				// temporarily moved into another variable, it will prevent modules from detecting AMD in this fashion.
				define = undefined;

				try {
					result = require(id);
				} finally {
					define = oldDefine;
				}
				return result;
			})(id, require.nodeRequire));
		},

		normalize: function (/**string*/ id) {
			if (id.charAt(0) === '.') {
				id = require.baseUrl + id;
			}

			return id;
		}
	};
});
