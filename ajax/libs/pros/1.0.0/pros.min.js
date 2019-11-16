/*MIT License

Copyright (c) 2019 gutsmine

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.*/

/*pros prototype
usage "pros(data).property"
*/

class value {

static idvalue(data){

  return document.getElementById(data);

}

static classvalue(data){

  return document.getElementByClass(data);
}
static namevalue(data){

  return document.getElementByName(data);
  }
 }

 class pros{
 static getid(data){
  return document.getElementById(data);
}
  static getclass(data){
   return document.getElementByclass(data);
}
 static getname(data){
   document.getElementByname(data);
}
 static loop(times, func, arg){
 for(var i=0; i=times; ++i){
 if(arg == null || arg == undefined || arg == ""){
   func();
}else{
   func(arg);
  }
 }
}
 static click(elem, func, arg){
elem.onclick=function(){
  if(arg == null || arg == undefined || arg ==""){
   func();
}else{
   func(arg);
  }
 }
}
 static change(elem, func, arg){
 elem.addEventlistener("change",(event)=>{
 if(arg == null || arg == undefined || arg ==""){
   func();
}else{
   func(arg);
  }
 });
}
 static keyup(elem, func, arg){
 elem.addEventlistener("keyup", event=>{
 if(event.isComposing){
 if(data == null || data == undefined || data==""){
   func();
}else{
   func(arg);
   }
  }
 });
}
 static inhtml(data, text){
   data.innerHTML = text;
}
 static newobj(name, data){
   return {data};
}
 static addvar(name, data){
   return name.push(data)
}
 static newlist(name, data){
   var name = this.data1;
   var data = this.data2;
   return [data];
}
 static margevar(name, var1, var2){
   var name = this.data1;
   var var1 = this.data2;
   var var2 = this.data3;
  return var1 + var2;
 }
 static getvalue(data, type){
 if(type='id'){
 return value.idvalue(data);
}else if(type='class'){
return value.classvalue(data);
}else if(type='name'){
return value.namevalue(data);
   }
  }
 }
var isNode = (typeof process !== "undefined" && typeof require !== "undefined");

if ( isNode) {
  module.exports = new pros();
}
