if(para.oPara.hasChildData&&!para.oPara.dspData) para.oPara.dspData=true;
if(!para.oPara.hasChildData) para.oPara.dspData=false;

function bindEvents(vElements,eventsMap){
	var elements=[];
	if(!jsdk.isArray(vElements)){
		elements.push([vElements,eventsMap]);
	}else{
		elements=vElements;
	}
	for(var i=0;i<elements.length;i++){
		var element=elements[i][0];
		var eventsMap=elements[i][1];
		for(var eventName in eventsMap){
			if(eventsMap.hasOwnProperty(eventName)){ 
				element[eventName]=eventsMap[eventName];
			}
		}
	}
}
function setCurrentViewPath(){
	currentViewPath=currentViewPathData.map(function(item){
		return item.text;
	}).join(para.oPara.pathSeparator||"\\");
}
function getItemData(sPath,curItem){
	var thisform=document.forms[0];
	var category=para.oPara.hasCategory?thisform.F_Category.options[thisform.F_Category.selectedIndex]:null;
	if(!sPath){
		var cateValue=category&&category.value||"";
		var viewdata=!category?para.oViewData:categoryKeys[cateValue];
		return viewdata;
	}else if(typeof(para.fnGetItemData)=="function"){
		var path1=sPath.leftBack(para.oPara.pathSeparator||"\\");
		var title1=sPath.word(para.oPara.pathSeparator||"\\",-1);
		return para.fnGetItemData(category,!para.oPara.hasChildItem?"":path1,curItem);
	}else{
		return [];
	}
}
function searchItemData(items,keys,count){
	var retItems=[];
	count=count||100;
	for(var i=0;retItems.length<count&&i<items.length;i++){
		var item=items[i];
		var items1=[];
		if(!item){
			continue;
		}else if(jsdk.isArray(item)){
			item1=item;
		}else if(typeof(item)=="object"){
			item1=[item.text,item.value==undefined?item.text:item.value];
		}else if(typeof(item)=="string"){
			item1=[item.split("|")[0],item.split("|").pop()];
		}
		if(keys.some(function(keys1){
				return keys1.every(function(keyvalue){
					return item1[0].toLowerCase().indexOf(keyvalue)>=0;
				});
			})){
			retItems[retItems.length]=item1;	
		}
	}
	return retItems.slice(0,count);
}
function searchSubItems(sPath,curItem,keys,count){
	var alldata=getItemData(sPath,curItem);
	if(!para.oPara.hasChildItem){
		if(!para.oPara.hasChildData){
			var itemdata=alldata;
			var items=[];
		}else{
			var itemdata=!sPath?[]:[].concat(alldata);
			var items=!sPath?alldata:[];
		}
	}else{
		var itemdata=!sPath?[]:alldata[0];
		var items=!sPath?alldata:alldata[1];
	}
	var retItems=[];
	if(!keys.length) return items;
	count=count||100;
	if(itemdata.length) retItems.append(searchItemData(itemdata,keys,count));
	for(var i=0;(retItems.length<count)&&(i<items.length);i++){
		var item=items[i];
		var items1=[];
		if(!item){
			continue;
		}else if(jsdk.isArray(item)){
			item1=item;
		}else if(typeof(item)=="object"){
			item1=[item.text,item.value==undefined?item.text:item.value];
		}else if(typeof(item)=="string"){
			item1=[item.split("|")[0],item.split("|").pop()];
		}
		var subItems=searchSubItems([sPath,item1[0]].trim().join("\\"),{text:item1[0],value:item1[1]},keys,count-retItems.length);
		retItems.append(subItems);
	}
	return retItems.slice(0,count);
}
function search(key){
	var thisform=document.forms[0];
	var keys=key.toLowerCase().split(" | ").trim().map(function(item){
		return item.split(" ").trim();
	});
	var list=para.oPara.dspData?thisform.F_Data:thisform.F_View;
	if(!key) return;
	thisform.F_View.clear();
	thisform.F_View.fireEvent("onchange");
	thisform.F_Data.clear();
	var items=searchSubItems("","",keys,100);
	list.expand(items);
}
function clearSearchResult(){
	var thisform=document.forms[0];
	thisform.F_SearchKey.value="";
	thisform.btnClearSearchResult.style.display="";
	thisform.F_View.clear();
	thisform.F_Data.clear();
	isSearching=false;
}
var categoryKeys={};
var currentViewPathData=[];
var currentViewPath="";
var isSearching=false;
window.onload=function(){
	var thisform=document.forms[0],events;
	jsdk.HTMLForm.applyInstance(thisform,"copy");
	HTMLSelect.applyInstance(thisform.F_Category,"copy");
	HTMLSelect.applyInstance(thisform.F_View,"copy");
	HTMLSelect.applyInstance(thisform.F_Data,"copy");
	HTMLSelect.applyInstance(thisform.F_Result,"copy");
	jsdk.get("event1.js","",false,function(sCode){ 
		events=eval("(function(){return "+sCode+"})()");
		events.Application.onInit();
	},"text");
}