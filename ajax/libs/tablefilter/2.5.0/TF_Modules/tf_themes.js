/*------------------------------------------------------------------------
	- HTML Table Filter Generator 
	- Themes loading feature v1.2
	- By Max Guglielmi (tablefilter.free.fr)
	- Licensed under the MIT License
-------------------------------------------------------------------------*/

TF.prototype.LoadThemes = function()
{
	this.EvtManager(this.Evt.name.loadthemes);
}

TF.prototype._LoadThemes = function()
/*====================================================
	- loads TF themes
=====================================================*/
{
	if(!this.hasThemes) return;
	if(!this.Thm){
		/*** TF themes ***/
		var o = this;
		this.Thm = {
			list: {},
			add: function(thmName, thmDesc, thmPath, thmCallBack)
			{
				var file = thmPath.split('/')[thmPath.split('/').length-1];
				var re = new RegExp(file);
				var path = thmPath.replace(re,'');
				o.Thm.list[thmName] = { 
					name: thmName,
					description: thmDesc,
					file: file,
					path: path,
					callback: thmCallBack
				};
			}
		};
	}
	
	if(this.enableDefaultTheme){//Default theme config
		this.themes = {
			name:['DefaultTheme'],
			src:[this.themesPath+'Default/TF_Default.css'], 
			description:['Default Theme']
		};
		this.Thm.add('DefaultTheme', this.themesPath+'Default/TF_Default.css', 'Default Theme');
	}
	if(tf_IsArray(this.themes.name) && tf_IsArray(this.themes.src)){
		var thm = this.themes;
		for(var i=0; i<thm.name.length; i++){
			var thmPath = thm.src[i];
			var thmName = thm.name[i];
			var thmInit = (thm.initialize && thm.initialize[i]) ? thm.initialize[i] : null;
			var thmDesc = (thm.description && thm.description[i] ) ? thm.description[i] : null;
			
			//Registers theme 
			this.Thm.add(thmName, thmDesc, thmPath, thmInit);
			
			if(!tf_IsImported(thmPath,'link')) 
				this.IncludeFile(thmName, thmPath, null, 'link');
			if(tf_IsFn(thmInit)) thmInit.call(null,this);
		}
	}
	
	//Some elements need to be overriden for theme
	var f =this.fObj;
	//Reset button
	f.btn_reset_text = null;
	f.btn_reset_html = '<input type="button" value="" class="'+this.btnResetCssClass+'" title="Clear filters" />';
	
	//Paging buttons		
	f.btn_prev_page_html = '<input type="button" value="" class="'+this.btnPageCssClass+' previousPage" title="Previous page" />';
	f.btn_next_page_html = '<input type="button" value="" class="'+this.btnPageCssClass+' nextPage" title="Next page" />';
	f.btn_first_page_html = '<input type="button" value="" class="'+this.btnPageCssClass+' firstPage" title="First page" />';
	f.btn_last_page_html = '<input type="button" value="" class="'+this.btnPageCssClass+' lastPage" title="Last page" />';
	
	//Loader
	f.loader = true;
	f.loader_html = '<div class="defaultLoader"></div>';
	f.loader_text = null;
}