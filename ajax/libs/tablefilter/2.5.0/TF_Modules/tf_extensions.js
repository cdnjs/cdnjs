/*------------------------------------------------------------------------
	- HTML Table Filter Generator 
	- Extensions loading feature v1.0
	- By Max Guglielmi (tablefilter.free.fr)
	- Licensed under the MIT License
-------------------------------------------------------------------------*/

TF.prototype.LoadExtensions = function()
{
	if(!this.Ext){
		/*** TF extensions ***/
		var o = this;
		this.Ext = {
			list: {},
			add: function(extName, extDesc, extPath, extCallBack)
			{
				var file = extPath.split('/')[extPath.split('/').length-1];
				var re = new RegExp(file);
				var path = extPath.replace(re,'');
				o.Ext.list[extName] = { 
					name: extName,
					description: extDesc,
					file: file,
					path: path,
					callback: extCallBack
				};
			}
		};
	}
	this.EvtManager(this.Evt.name.loadextensions);
}

TF.prototype._LoadExtensions = function()
/*====================================================
	- loads TF extensions
=====================================================*/
{
	if(!this.hasExtensions) return;
	if(tf_IsArray(this.extensions.name) && tf_IsArray(this.extensions.src)){
		var ext = this.extensions;
		for(var e=0; e<ext.name.length; e++){
			var extPath = ext.src[e];
			var extName = ext.name[e];
			var extInit = (ext.initialize && ext.initialize[e]) ? ext.initialize[e] : null;
			var extDesc = (ext.description && ext.description[e] ) ? ext.description[e] : null;
			
			//Registers extension 
			this.Ext.add(extName, extDesc, extPath, extInit);
			if(tf_IsImported(extPath)) extInit.call(null,this);
			else this.IncludeFile(extName, extPath, extInit);
		}
	}
}