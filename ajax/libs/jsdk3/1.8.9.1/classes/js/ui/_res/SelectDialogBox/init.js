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
function expandView(treeView,items){
	if(!jsdk.isArray(items)) items=[items];
	for(var i=0;i<items.length;i++){
		var item=items[i];
		if(!item){
			continue;
		}else if(jsdk.isArray(item)){
			//none---
		}else if(typeof(item)=="object"){
			item=[item.text,item.value==undefined?item.text:item.value];
		}else if(typeof(item)=="string"){
			item=[item.split("|")[0],item.split("|").pop()];
		}
		treeView.addItem(item[0],item[1],"","","","",getViewMenu);
	}
}
function getViewMenu(relPath){
	var thisform=document.forms[0];
	var curCategory=para.oPara.hasCategory?thisform.F_Category.options[thisform.F_Category.selectedIndex]:null;
	var values=para.fnGetItemData(para.oPara.hasCategory?curCategory:"",this.getParent().getFullPath(),this,-1).pop();
	for(var i=0;i<values.length;i++){
		if(jsdk.isArray(values[i])){
			//none---
		}else if(values[i].constructor==String){
			values[i]=values[i].split("|");
		}else{
			values[i]=[values[i].text,""];
		}
	} 
	return values;
}
function getViewValues(treeView){

}
function setViewValues(treeView,vValues){

}
function clearEmptyView(treeView){
	treeView.removeAll();
	jsdk.dom("#F_Data#")[0].clear();
}
function setCurrentViewPath(){
	currentViewPath=currentViewPathData.map(function(item){
		return item.text;
	}).join(para.oPara.pathSeparator||"\\");
}
var categoryKeys={};
var currentViewPathData=[];
var currentViewPath="";
var view={};
window.onload=function(){
	var thisform=document.forms[0],events;
	jsdk.Outline.setStyleSkin("std");
	jsdk.HTMLForm.applyInstance(thisform,"copy");
	HTMLSelect.applyInstance(thisform.F_Category,"copy");
	HTMLSelect.applyInstance(thisform.F_Data,"copy");
	HTMLSelect.applyInstance(thisform.F_Result,"copy");
	jsdk.get("event.js","",true,function(sCode){
		events=eval("(function(){return "+sCode+"})()");
		events.Application.onInit();
	},"text");
}