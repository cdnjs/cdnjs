function HTMLSelect(){}
HTMLSelect.prototype.expand=function(values){
	if(!jsdk.isArray(values)) values=[values];
	for(var i=0,iLen=Math.min(1000,values.length);i<iLen;i++){
		var item=values[i];
		if(!item){
			continue;
		}else if(jsdk.isArray(item)){
			//none---
		}else if(typeof(item)=="object"){
			item=[item.text,item.value==undefined?item.text:item.value];
		}else if(typeof(item)=="string"){
			item=[item.split("|")[0],item.split("|").pop()];
		}
		if(this.find(item[1],1)<0){
			this.options[this.options.length]=new Option(item[0],item[1]);
		}
	}
}
HTMLSelect.prototype.fill=function(values){
	this.clear();
	this.expand(values);
}
HTMLSelect.prototype.clear=function(){
	for(var i=this.options.length-1;i>=0;i--){
		this.removeChild(this.options[i]);
	}
}
HTMLSelect.prototype.getItems=function(isSelected){
	var values=[];
	for(var i=0;i<this.options.length;i++){
		var item=this.options[i];
		if(!isSelected){
			values.push({ text: item.text, value: item.value});
		}else if(item.selected){
			values.push({ text: item.text, value: item.value});
		}
	}
	return values;
}
HTMLSelect.prototype.selectItems=function(vValues){
	if(!vValues) return;
	if(typeof(vValues=="string")){
		vValues=[vValues];
	}else if(!jsdk.isArray(vValues)){
		vValues=[vValues];
	}
	for(var i=0;i<vValues.length;i++){
		var value=vValues[i];
		if(!value){
			continue;
		}else if(typeof(value)=="object"){
			value=[value.text,value.value==undefined?value.text:value.value];
		}else if(typeof(value)=="string"){
			value=[value.split("|")[0],value.split("|").pop()];
		}
		var index=this.find(value[1],1);
		if(index>=0) this.options[index].selected=true;
	}
}
HTMLSelect.prototype.deleteItems=function(){
	var options=this.options;
	for(var i=options.length-1;i>=0;i--){
		var item=options[i];
		if(item.selected){
			this.removeChild(item);
		}
	}
}
HTMLSelect.prototype.find=function(value,iOptions){
	for(var i=this.options.length-1;i>=0;i--){
		var item=this.options[i];
		if(iOptions==0&&item.text==value){
			return i;
		}else if(iOptions==1&&item.value==value){
			return i;
		}
	}
	return -1;
}
HTMLSelect.prototype.moveUpItems=function(){
	var options=this.options;
	if(options.length>0&&options[0].selected) return;
	for(var i=0,iLen=options.length;i<iLen;i++){
		var item=options[i];
		if(item.selected&&i>0){
			var prevItem=options[i-1];		
			if(!prevItem.selected) this.insertBefore(item,prevItem);
		}
	}
}
HTMLSelect.prototype.moveDownItems=function(){
	var options=this.options;
	if(options.length>0&&options[options.length-1].selected) return;
	for(var iLen=options.length,i=iLen-1;i>=0;i--){
		var item=options[i];
		if(item.selected&&i<iLen-2){
			this.insertBefore(item,options[i+2]);
		}else if(item.selected&&i<iLen-1){
			this.appendChild(item);
		}
	}
}
HTMLSelect.prototype.moveItemsToTop=function(){
	var options=this.options;
	var first=options.length>0?options[0]:null;
	if(first&&first.selected) return;
	for(var i=0,iLen=options.length;i<iLen;i++){
		var item=options[i];
		if(item.selected&&i>0){	
			this.insertBefore(item,first);
		}
	}
}
HTMLSelect.prototype.moveItemsToBottom=function(){
	var options=this.options;
	var newFirst=null;
	if(options.length>0&&options[options.length-1].selected) return;
	for(var iLen=options.length,i=iLen-1;i>=0;i--){
		var item=options[i];
		if(newFirst&&newFirst.selected&&item.selected&&i<iLen-2){
			newFirst=this.insertBefore(item,newFirst);
		}else if(item.selected&&i<iLen-1){
			newFirst=this.appendChild(item);
		}
	}
}