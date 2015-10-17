/*
	Copyright (c) 2004-2012, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/

//>>built
define("dojo/node",["dojo/has"],function(_1){
if(!0){
throw new Error("node plugin failed to load because environment is not Node.js");
}
return {load:function(id,_2,_3){
if(!_2.nodeRequire){
throw new Error("Cannot find native require function");
}
_3(_2.nodeRequire(id));
}};
});
