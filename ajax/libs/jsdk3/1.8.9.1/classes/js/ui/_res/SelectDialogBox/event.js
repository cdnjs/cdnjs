{
	Application: {
		"onInit": function(){
			view=new jsdk.Outline(jsdk.dom("#F_View")[0]);
			this.onInitEvent();
			view.onReady();
			this.onInitData();
		},
		"onInitEvent": function(){
			bindEvents([
				[thisform.F_Category,events.Selector.Category],
				[view,events.Selector.View],
				[thisform.F_Data,events.Selector.Data],
				[thisform.F_Result,events.Selector.Result],
				[jsdk.dom("#btnDelete")[0],{
					"onclick": events.ToolsBar["btnDelete"]
				}],
				[jsdk.dom("#btnClear")[0],{
					"onclick": events.ToolsBar["btnClear"]
				}],
				[jsdk.dom("#btnTop")[0],{
					"onclick": events.ToolsBar["btnTop"]
				}],
				[jsdk.dom("#btnUp")[0],{
					"onclick": events.ToolsBar["btnUp"]
				}],
				[jsdk.dom("#btnDown")[0],{
					"onclick": events.ToolsBar["btnDown"]
				}],
				[jsdk.dom("#btnBottom")[0],{
					"onclick": events.ToolsBar["btnBottom"]
				}],
				[thisform.btnOK,{
					"onclick": events.ActionBar["btnOK"]
				}],
				[thisform.btnCancel,{
					"onclick": events.ActionBar["btnCancel"]
				}]
			]);
		},
		"onInitData": function(){
			switch(typeof(para.oViewData)){
				case "object":
					break;
				case "string":
					if(para.oViewData.indexOf("url(json):")==0){
						var sUrl=para.oViewData.right("url(json):");
						sUrl=jsdk.getURIFullPath(para.opener.document.location.pathname.leftBack("/"),sUrl,"/").replace(/^\/[a-z]\:/gi,"");
						para.oViewData=jsdk.get(sUrl,"",false,"","JSON").items;
					}else if(para.oViewData.indexOf("url(xml):")==0){
						var sUrl=para.oViewData.right("url(xml):");
						sUrl=jsdk.getURIFullPath(para.opener.document.location.pathname.leftBack("/"),sUrl,"/").replace(/^\/[a-z]\:/gi,"");
						var xml=jsdk.get(sUrl,"",false,"","XML");
						para.oViewData=[];
						var nodes=xml.documentElement.$childNodes||xml.documentElement.childNodes;
						for(var i=0;i<nodes.length;i++){
							para.oViewData.push({ text: nodes[i].getAttribute("text"), value: nodes[i].getAttribute("value")});
						}
					}
					break;
				case "function":
					para.oViewData=para.oViewData();
					break;
			}
			if(!para.oPara.hasCategory){
				expandView(view,para.oViewData);
			}else{
				thisform.F_Category.onInit();
			}
			if(!para.vValues){
				//none---
			}else if(!jsdk.isArray(para.vValues)){
				para.vValues=[para.vValues];
			}else if(!para.oPara.isMultiple){
				para.vValues=para.vValues.slice(0,1);
			}
			if(para.oPara.dspResult){
				thisform.F_Result.fill(para.vValues);
			}else if(!para.oPara.dspData&&!para.oPara.hasCategory){
				setViewValues(treeView,para.vValues);
			}
		}
	},
	Selector: {
		Category: {
			"onInit": function(){
				if(para.oDspTexts.category){
					this.expand(["--"+para.oDspTexts.category+"--|"]);
				}
				var values=[];
				for(var i=0;i<para.oViewData.length;i++){
					if(typeof(para.oViewData[i])=="object"
						&&typeof(para.oViewData[i].value)=="function") {
						values.push({ text: para.oViewData[i].text, value: "javascript: para.oViewData["+i+"].value();"});
					}else{
						values.push(para.oViewData[i]);
					}
				}
				this.expand(values);
				var index=this.find(para.oPara.defaultCategory,0);
				if(index>=0) {
					this.options[index].selected=true;
					this.fireEvent("onchange");
				}
			},
			"onchange": function(){
				currentViewPathData=[];
				currentViewPath="";
				clearEmptyView(view);
				if(this.selectedIndex<0) return;
				var data=this.options[this.selectedIndex].value;
				if(data==""){
					return;
				}else if(data.indexOf("url(json):")==0){
					data=data.right("url(json):");
					data=jsdk.getURIFullPath(para.opener.document.location.pathname.leftBack("/"),data,"/").replace(/^\/[a-z]\:/gi,"");
					var dataFormat="JSON";
				}else if(data.indexOf("url(xml):")==0){
					data=data.right("url(xml):");
					data=jsdk.getURIFullPath(para.opener.document.location.pathname.leftBack("/"),data,"/").replace(/^\/[a-z]\:/gi,"");
					var dataFormat="XML";
				}else if(data.indexOf("javascript:")==0){
					data=data.right("javascript:");
					data=(new Function("return "+data+"; "))();
					expandView(view,data);
					//cache---
					var sKey=this.selectedIndex+"";
					this.options[this.selectedIndex].value=sKey;
					categoryKeys[sKey]=data;
					this.onAfterChanged();
					return;
				}else{
					expandView(view,categoryKeys[data]);
					this.onAfterChanged();
				}
				if(dataFormat=="JSON"){
					jsdk.get(data,"",false,function(json){
						var items=json.items;
						if(!jsdk.isArray(items)) return;
						for(var i=0;i<items.length;i++){
							expandView(view,items[i]);
						}
						//cache---
						var sKey=thisform.F_Category.selectedIndex+"";
						thisform.F_Category.options[thisform.F_Category.selectedIndex].value=sKey;
						categoryKeys[sKey]=items;
						this.onAfterChanged();
					},dataFormat);
				}else if(dataFormat=="XML"){
					jsdk.get(data,"",false,function(xml){
						if(!xml||!xml.documentElement) return;
						var items=xml.documentElement.$childNodes||xml.documentElement.childNodes;
						var values=[];
						for(var i=0;i<items.length;i++){
							values.push({ text: items[i].getAttribute("text"), value: items[i].getAttribute("value")});
						}
						expandView(view,values);
						//cache---
						var sKey=thisform.F_Category.selectedIndex+"";
						thisform.F_Category.options[thisform.F_Category.selectedIndex].value=sKey;
						categoryKeys[sKey]=values;
						this.onAfterChanged();
					},dataFormat);
				}

			},
			"onAfterChanged": function(){
				//------
			}
		},
		View: {
			"onReady": function(){
				var openerUrlPath=window.opener.location.pathname.replace(/^\/[a-z]\:/i,"").leftBack("/");
				if(para.oPara.icon.folder) this.setIcon("folder",jsdk.getURIFullPath(openerUrlPath,para.oPara.icon.folder,"/"));
				if(para.oPara.icon.openedFolder) this.setIcon("openedFolder",jsdk.getURIFullPath(openerUrlPath,para.oPara.icon.openedFolder,"/"));
				if(para.oPara.icon.file) this.setIcon("file",jsdk.getURIFullPath(openerUrlPath,para.oPara.icon.file,"/"));
				if(para.oPara.pathSeparator) this.setPathSeparator(para.oPara.pathSeparator);
				this.setUseIcon(true);
				this.setIsSelectMode(true);
			},
			"onActivatedItem": function(curItem){
				var curCategory=para.oPara.hasCategory?thisform.F_Category.options[thisform.F_Category.selectedIndex]:null;
				if((para.oPara.hasChildItem||para.oPara.hasChildData)
					&&typeof(para.fnGetItemData)=="function"){
					if(para.oPara.hasChildItem){
						var vValue=para.fnGetItemData(para.oPara.hasCategory?curCategory:"",curItem.getParent().getFullPath(),curItem,-1);
						if(jsdk.isArray(vValue)&&vValue.length==2){
							if(vValue[0]){	//is child data
								if(jsdk.isArray(vValue[0])){
									thisform.F_Data.fill(vValue[0]);
								}else{
									thisform.F_Data.expand([vValue[0]]);
								}
							}
						}
					}else{
						var vValue=para.fnGetItemData(para.oPara.hasCategory?curCategory:"","",curItem,-1);
						if(jsdk.isArray(vValue)){
							thisform.F_Data.fill(vValue);
						}else if(vValue){
							thisform.F_Data.expand([vValue]);
						}
					}
				}else {
					thisform.F_Data.expand([{text:curItem.getTitle(),value:curItem.getData()}]);
				}
				if(thisform.F_Data.options.length&&para.oPara.dspResult){
					if(!para.oPara.hasChildData&&!para.oPara.dspData) {
						thisform.F_Data.options[0].selected=true;
						thisform.F_Data.fireEvent("onchange");
					}
				}
			}
		},
		Data: {
			"onchange": function(){
				for(var i=0;i<this.options.length;i++){
					var item=this.options[i];
					if(item.selected&&para.oPara.dspResult){
						if(!para.oPara.isMultiple) thisform.F_Result.clear();
						thisform.F_Result.expand([[item.text,item.value]]);
					}
				}
			},
			"ondblclick": function(){
				if(this.selectedIndex<0) return;
				var item=this.options[this.selectedIndex];
				if(!para.oPara.isMultiple) thisform.F_Result.clear();
				thisform.F_Result.expand([[item.text,item.value]]);
			}
		},
		Result: {
			//fix bug, only for IE7
			"onresize": function(){
				if(jsdk.Browser.Engine.version==3.1){
					return function(){
						this.setAttribute("className","list");
					}
				}else{
					return function(){};
				}
			}(),
			"ondblclick": function(){
				if(this.selectedIndex<0) return;
				this.removeChild(this.options[this.selectedIndex]);
			}
		}
	},
	ToolsBar: {
		"btnDelete": function(){
			thisform.F_Result.deleteItems();
		},
		"btnClear": function(){
			thisform.F_Result.clear();
		},
		"btnTop": function(){
			thisform.F_Result.moveItemsToTop();
		},
		"btnUp": function(){
			thisform.F_Result.moveUpItems();
		},
		"btnDown": function(){
			thisform.F_Result.moveDownItems();
		},
		"btnBottom": function(){
			thisform.F_Result.moveItemsToBottom();
		}
	},
	ActionBar: {
		"btnOK": function(){
			if(para.oPara.dspResult){
				window.returnValue=thisform.F_Result.getItems(false);
			}else if(para.oPara.dspData){
				window.returnValue=thisform.F_Result.getItems(true);
			}else{
				window.returnValue=getViewValues(view,1);
			}
			window.$close();
		},
		"btnCancel": function(){
			window.$close();
		}
	}
}

