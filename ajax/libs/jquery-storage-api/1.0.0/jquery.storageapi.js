/*
 * jQuery Storage API Plugin
 *
 * Copyright (c) 2013 Julien Maurel
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Project home:
 * https://github.com/julien-maurel/jQuery-Storage-API
 *
 * Version: 1.0.0
 *
 */
(function($){
  // Get a variable in a storage. Infinite arguments to be able to get property in objects
  function _get(storage){
    var l=arguments.length,s=window[storage],a=arguments,ret;
    if(l<2) throw new Error('Minimum 2 parameters must be given');
    else if(l==2){
      try{
        return JSON.parse(s[a[1]]);
      }catch(e){
        return s[a[1]];
      }
    }else{
      try{
        ret=JSON.parse(s[a[1]]);
      }catch(e){
        throw new ReferenceError(a[1]+' is not defined in this storage');
      }
      for(var i=2;i<l-1;i++){
        ret=ret[a[i]];
        if(ret===undefined) throw new ReferenceError([].slice.call(a,1,i).join('.')+' is not defined in this storage');
      }
      return ret[a[i]];
    }
  }

  // Set a variable in a storage. Infinite arguments to be able to set property in objects
  function _set(storage){
    var l=arguments.length,s=window[storage],a=arguments,to_store={},tmp;
    if(l<3) throw new Error('Minimum 3 parameters must be given');
    else if(l==3 && !$.isPlainObject(a[2])){
      s[a[1]]=a[2];
      return a[2];
    }else if(l==3){
      s[a[1]]=JSON.stringify(a[2]);
      return a[2];
    }else{
      try{
        to_store=JSON.parse(s[a[1]]);
      }catch(e){
        to_store={};
      }
      tmp=to_store;
      for(var i=2;i<l-2;i++){
        if(!tmp[a[i]] || !$.isPlainObject(tmp[a[i]])) tmp[a[i]]={};
        tmp=tmp[a[i]];
      }
      tmp[a[i]]=a[i+1];
      s[a[1]]=JSON.stringify(to_store);
      return to_store;
    }
  }

  // Delete a variable in a storage. Infinite arguments to be able to delete property in objects
  function _delete(storage){
    var l=arguments.length,s=window[storage],a=arguments,to_store,tmp;
    if(l<2) throw new Error('Minimum 2 parameters must be given');
    else if(l==2){
      delete s[a[1]];
      return true;
    }else{
      try{
        to_store=tmp=JSON.parse(s[a[1]]);
      }catch(e){
        throw new ReferenceError(a[1]+' is not defined in this storage');
      }
      for(var i=2;i<l-1;i++){
        tmp=tmp[a[i]];
        if(tmp===undefined) throw new ReferenceError([].slice.call(a,1,i).join('.')+' is not defined in this storage');
      }
      delete tmp[a[i]];
      s[a[1]]=JSON.stringify(to_store);
      return true;
    }
  }

  // Delete all variables in a storage
  function _deleteAll(storage){
    for(var i in window[storage]){
      delete window[storage][i];
    }
  }

  // Create new object to a namespace in a storage
  function _createNamespace(name){
    if(!name || typeof name!="string") throw new Error('First parameter must be a string');
    return {
      localStorage:$.extend({},storage,{_type:'localStorage',_ns:name}),
      sessionStorage:$.extend({},storage,{_type:'sessionStorage',_ns:name})
    };
  }

  // Namespace object
  var storage={
    _type:'',
    _ns:'',
    // Get a variable. If no parameters and storage have a namespace, return all namespace
    get:function(){
      var p = [this._type];
      if(this._ns) p.push(this._ns);
      [].unshift.apply(arguments,p);
      return _get.apply(this, arguments);
    },
    // Set a variable
    set:function(){
      if(arguments.length<2) throw new Error('Minimum 2 parameters must be given');
      var p = [this._type];
      if(this._ns) p.push(this._ns);
      [].unshift.apply(arguments,p);
      return _set.apply(this, arguments);
    },
    // Delete a variable. 
    delete:function(){
      if(arguments.length<1) throw new Error('Minimum 1 parameter must be given');
      var p = [this._type];
      if(this._ns) p.push(this._ns);
      [].unshift.apply(arguments,p);
      return _delete.apply(this, arguments);
    },
    deleteAll:function(){
      if(this._ns){
        return _delete(this._type,this._ns);
      }else{
        return  _deleteAll(this._type);
      }
    }
  }

  // Get a new api on a namespace
  $.initNamespaceStorage=function(ns){
    return _createNamespace(ns);
  }
  // localStorage API
  $.localStorage=$.extend({},storage,{_type:'localStorage'});
  // sessionStorage API
  $.sessionStorage=$.extend({},storage,{_type:'sessionStorage'});
})(jQuery);
