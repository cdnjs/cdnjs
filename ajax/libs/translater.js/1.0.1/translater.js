;(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.Translater = factory();
  }
}(this, function() {
var Translater = function(option,callback){
    // 默认给URL参数 ?lang=en
    this.lang_name = (option && option.lang) || 'default';
    // 回调函数
    this.callback = callback || function(){};
    this.langs = getElems() || []
}

Translater.prototype = {
    setLang:function(name){
        var langs = this.langs;
        this.lang_name = name;
        for (var i = 0; i < langs.length; i++) {
            if(langs[i]['lang-'+name]) 
                langs[i].element.nodeValue = langs[i]['lang-'+name];
        }
    }
}

// 获取所有节点里面的注释信息
// 返回一个数组
function getElems(){
    // var str = document.getElementById("box").innerHTML;
    // var str1 = str.replace(/<.*>(.*)<.*>/i,"$1"); 
    // var str2 = str.replace(/^.*<!--(.*)-->.*$/,"$1");
    var elems = getTextNodes(document);
    var emptyArray = [];
    var translateData = new Object()
    // console.log("elems::",elems);
    for (var i = 0; i < elems.length; i++) {
        elems[i].nodeValue = trim(elems[i].nodeValue)
        if(elems[i].nodeValue !== ''){
            translateData = translater(elems[i])

            if(Object.getOwnPropertyNames(translateData).length>2)
                emptyArray.push( translateData );
        };
    }
    return emptyArray;
}

// 序列化翻译数据
function translater(elm,langData){
    langData = langData||{};

    var name = 'lang-default',value=elm.nodeValue,
        fragmentRE = /^\{\w+\}/;

    if(elm.nodeType === 8 && fragmentRE.test(value)){
        // 获取花括号内容
        name = value.match(fragmentRE)[0];
        // 去掉花括号
        name = 'lang-' + (name?name.replace(/\{([^\ ]*)\}/g, "$1"):'');
        // 获取好括号后面的内容
        value = value.replace(fragmentRE,"")
        if(trim(value) !== '') langData[name] = value;
    }

    if(trim(value) !== '' && !langData['lang-default']){
        langData[name] = value;  
        langData.element = elm;
    } 

    var nextElm = elm.nextSibling;
    if(nextElm&&nextElm.nodeType !== 1){
        translater(nextElm,langData)
    };
    return langData;
}

//过滤左右的空格以及换行符
function trim(text) {
    return "" + (null == text ? "" : (text + "").replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "").replace(/[\r\n]+/g,""));
}

//兼容的获取文本节点的简单方案
var getTextNodes = window.NodeFilter?function(e){
    //支持TreeWalker的浏览器
    var r=[],o,s;
    s=document.createTreeWalker(e,NodeFilter.SHOW_TEXT,null,null);
    while(o=s.nextNode()){
      if(o.parentElement.tagName !== 'SCRIPT' 
        && o.parentElement.tagName !== 'STYLE') {
          r.push(o); //遍历迭代器
      }
    }   
    return r;
}:function(e){
    //不支持的需要遍历
    switch(e.nodeType){
      //注释节点直接返回
      case 3:return [e]; 
      case 1:;case 9: 
        //文档或元素需要遍历子节点
        var i,s=e.childNodes,result=[];
        if(e.tagName!== 'SCRIPT' && e.tagName!== 'STYLE'){
            for(i=0;i<s.length;i++)
            getTextNodes(s[i]) && result.push(getTextNodes(s[i]));
            //合并子数组   
            return Array.prototype.concat.apply([],result); 
        }
    };
};
return Translater;
}));
