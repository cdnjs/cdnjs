{
	Application: {
		"onInit": function(){
			this.onInitEvent();
			this.onInitData();
		},
		"onInitEvent": function(){
			bindEvents([
				[thisform.F_Category,events.Selector.Category],
				[thisform.F_View,events.Selector.View],
				[thisform.F_Data,events.Selector.Data],
				[thisform.F_Result,events.Selector.Result],
				[thisform.F_SearchKey,events.SearchBar.F_SearchKey],
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
				[thisform.btnClearSearchResult,{
					"onclick": events.SearchBar["btnClearSearchResult"]
				}],
				[thisform.btnSearch,{
					"onclick": events.SearchBar["btnSearch"]
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
				thisform.F_View.expand(para.oViewData);
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
				thisform.F_View.expand(para.vValues);
			}
		}
	},
	SearchBar: {
		"F_SearchKey": {
			"onkeydown": function(event){
				event=event||window.event;
				if(event.keyCode==13){
					if(this.value) return thisform.btnSearch.fireEvent("onclick");
					else return thisform.btnClearSearchResult.fireEvent("onclick");
				}
			}
		},
		"btnClearSearchResult": function(){
			thisform.F_SearchKey.value="";
			this.style.display="";
			thisform.F_View.clear();
			thisform.F_Data.clear();
			if(para.oPara.hasCategory) thisform.F_Category.fireEvent("onchange");
			else thisform.F_View.expand(para.oViewData);
			isSearching=false;
			return false;
		},
		"btnSearch": function(){
			var key=thisform.F_SearchKey.value;
			if(!key){
				return thisform.btnClearSearchResult.fireEvent("onclick");
			}
			isSearching=true;
			thisform.btnClearSearchResult.style.display="inline-block";
			search(key);
			return false;
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
				thisform.F_View.clear();
				thisform.F_View.fireEvent("onchange");
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
					thisform.F_View.expand(data);
					//cache---
					var sKey=this.selectedIndex+"";
					this.options[this.selectedIndex].value=sKey;
					categoryKeys[sKey]=data;
					this.onAfterChanged();
					return;
				}else{
					thisform.F_View.expand(categoryKeys[data]);
					this.onAfterChanged();
				}
				if(dataFormat=="JSON"){
					jsdk.get(data,"",false,function(json){
						var items=json.items;
						if(!jsdk.isArray(items)) return;
						for(var i=0;i<items.length;i++){
							thisform.F_View.expand(items[i]);
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
						thisform.F_View.expand(values);
						//cache---
						var sKey=thisform.F_Category.selectedIndex+"";
						thisform.F_Category.options[thisform.F_Category.selectedIndex].value=sKey;
						categoryKeys[sKey]=values;
						this.onAfterChanged();
					},dataFormat);
				}
			},
			"onAfterChanged": function(){
				//main for iPad-----
				if(thisform.F_View.options.length==1
					&&!para.oPara.hasChildItem){
					thisform.F_View.options[0].selected=true;
					thisform.F_View.fireEvent("onchange");
				}
			}
		},
		View: {
			"onchange": function(){
				thisform.F_Data.clear();
				if(this.selectedIndex<0) return;
				var curCategory=para.oPara.hasCategory?thisform.F_Category.options[thisform.F_Category.selectedIndex]:null;
				var curItem=this.options[this.selectedIndex];
				if((para.oPara.hasChildItem||para.oPara.hasChildData)
					&&typeof(para.fnGetItemData)=="function"){
					if(para.oPara.hasChildItem){
						if(curItem.text=="<---") return;
						var vValue=para.fnGetItemData(para.oPara.hasCategory?curCategory:"",currentViewPath,curItem,this.selectedIndex);
						if(jsdk.isArray(vValue)&&vValue.length==2){
							if(vValue[0]){	//is child data
								if(jsdk.isArray(vValue[0])){
									thisform.F_Data.fill(vValue[0]);
								}else{
									thisform.F_Data.expand([vValue[0]]);
								}
							}
							if(vValue[1]&&jsdk.isArray(vValue[1])&&vValue[1].length){	//is child items
								curItem.style.color="#FD8B23";
								curItem.style.backgroundColor="#E0E0E0";
								return;
							}
						}
					}else{
						var vValue=para.fnGetItemData(para.oPara.hasCategory?curCategory:"","",curItem,this.selectedIndex);
						if(jsdk.isArray(vValue)){
							thisform.F_Data.fill(vValue);
						}else if(vValue){
							thisform.F_Data.expand([vValue]);
						}
					}
				}else {
					thisform.F_Data.expand([{text:this.options[this.selectedIndex].text,value:this.options[this.selectedIndex].value}]);
				}
				if(thisform.F_Data.options.length&&para.oPara.dspResult){
					if(!para.oPara.hasChildData&&!para.oPara.dspData) {
						thisform.F_Data.options[0].selected=true;
						thisform.F_Data.fireEvent("onchange");
					}
				}
			},
			"ondblclick": function(){
				thisform.F_Data.clear();
				if(this.selectedIndex<0) return;
				var curCategory=para.oPara.hasCategory?thisform.F_Category.options[thisform.F_Category.selectedIndex]:null;
				var curItem=this.options[this.selectedIndex];
				if((para.oPara.hasChildItem||para.oPara.hasChildData)
					&&typeof(para.fnGetItemData)=="function"){
					if(para.oPara.hasChildItem){
						if(curItem.text=="<---"){
							currentViewPathData.pop();
							curItem=currentViewPathData.pop();
							setCurrentViewPath();
							thisform.F_View.clear();
							if(!currentViewPathData.length&&!curItem){
								thisform.F_Category.fireEvent("onchange");
								return;
							}
						}
						var vValue=para.fnGetItemData(para.oPara.hasCategory?curCategory:"",currentViewPath,curItem,this.selectedIndex);
						if(jsdk.isArray(vValue)&&vValue.length==2){
							if(vValue[0]){	//is child data
								if(jsdk.isArray(vValue[0])){
									thisform.F_Data.fill(vValue[0]);
								}else{
									thisform.F_Data.expand([vValue[0]]);
								}
							}
							if(vValue[1]&&jsdk.isArray(vValue[1])&&vValue[1].length){	//is child items
								currentViewPathData.push({text: curItem.text, value: curItem.value});
								setCurrentViewPath();
								thisform.F_View.fill(["<---"]);
								thisform.F_View.expand(vValue[1]);
							}
						}
					}else{
						var vValue=para.fnGetItemData(para.oPara.hasCategory?curCategory:"","",curItem,this.selectedIndex);
						if(jsdk.isArray(vValue)){
							thisform.F_Data.fill(vValue);
						}else if(vValue){
							thisform.F_Data.expand([vValue]);
						}
					}
				}else {
					thisform.F_Data.expand([{text:this.options[this.selectedIndex].text,value:this.options[this.selectedIndex].value}]);
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
				window.returnValue=thisform.F_View.getItems(true);
			}
			window.$close();
		},
		"btnCancel": function(){
			window.$close();
		}
	}
}

