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
 * Version: 1.1.1
 *
 */
(function($){
  // Get a variable in a storage. Infinite arguments to be able to get property in objects
  // If second argument is an array, return an object with each property
  function _get(storage){
    var l=arguments.length,s=window[storage],a=arguments,a1=a[1],vi,ret;
    if(l<2) throw new Error('Minimum 2 parameters must be given');
    else if($.isArray(a1)){
      ret={};
      for(var i in a1){
        vi=a1[i];
        try{
          ret[vi]=JSON.parse(s[vi]);
        }catch(e){
          ret[vi]=s[vi];
        }
      }
      return ret;
    }else if(l==2){
      try{
        return JSON.parse(s[a1]);
      }catch(e){
        return s[a1];
      }
    }else{
      try{
        ret=JSON.parse(s[a1]);
      }catch(e){
        throw new ReferenceError(a1+' is not defined in this storage');
      }
      for(var i=2;i<l-1;i++){
        ret=ret[a[i]];
        if(ret===undefined) throw new ReferenceError([].slice.call(a,1,i+1).join('.')+' is not defined in this storage');
      }
      return ret[a[i]];
    }
  }

  // Set a variable in a storage. Infinite arguments to be able to set property in objects.
  // If second argument is an object, each property is set
  function _set(storage){
    var l=arguments.length,s=window[storage],a=arguments,a1=a[1],a2=a[2],vi,to_store={},tmp;
    if(l<2 || !$.isPlainObject(a1) && l<3) throw new Error('Minimum 3 parameters must be given or second parameter must be an object');
    else if($.isPlainObject(a1)){
      for(var i in a1){
        vi=a1[i];
        if(!$.isPlainObject(vi)) s[i]=vi;
        else s[i]=JSON.stringify(vi);
      }
      return a1;
    }else if(l==3 && !$.isPlainObject(a2)){
      s[a1]=a2;
      return a2;
    }else if(l==3){
      s[a1]=JSON.stringify(a2);
      return a2;
    }else{
      try{
        to_store=JSON.parse(s[a1]);
      }catch(e){
        to_store={};
      }
      tmp=to_store;
      for(var i=2;i<l-2;i++){
        vi=a[i];
        if(!tmp[vi] || !$.isPlainObject(tmp[vi])) tmp[vi]={};
        tmp=tmp[vi];
      }
      tmp[a[i]]=a[i+1];
      s[a1]=JSON.stringify(to_store);
      return to_store;
    }
  }

  // Delete a variable in a storage. Infinite arguments to be able to delete property in objects
  // If second argument is an array, each property is deleted
  function _delete(storage){
    var l=arguments.length,s=window[storage],a=arguments,a1=a[1],to_store,tmp;
    if(l<2) throw new Error('Minimum 2 parameters must be given');
    else if($.isArray(a1)){
      for(var i in a1){
        delete s[a1[i]];
      }
      return true;
    }else if(l==2){
      delete s[a1];
      return true;
    }else{
      try{
        to_store=tmp=JSON.parse(s[a1]);
      }catch(e){
        throw new ReferenceError(a1+' is not defined in this storage');
      }
      for(var i=2;i<l-1;i++){
        tmp=tmp[a[i]];
        if(tmp===undefined) throw new ReferenceError([].slice.call(a,1,i).join('.')+' is not defined in this storage');
      }
      delete tmp[a[i]];
      s[a1]=JSON.stringify(to_store);
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
    if(!window.localStorage[name]) window.localStorage[name]='{}';
    if(!window.sessionStorage[name]) window.sessionStorage[name]='{}';
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
      var l=arguments.length,a=arguments,a0=a[0],vi;
      if(!$.isArray(a0)){
        var p = [this._type];
        if(this._ns) p.push(this._ns);
        [].unshift.apply(a,p);
        return _get.apply(this, a);
      }else if(this._ns){
        var ret={};
        for(var i in a0){
          vi=a0[i];
          ret[vi]=_get(this._type,this._ns,vi);
        }
        return ret;
      }else{
        return _get(this._type,a0);
      }
    },
    // Set a variable
    set:function(){
      var l=arguments.length,a=arguments,a0=a[0],vi;
      if(l<1 || !$.isPlainObject(a0) && l<2) throw new Error('Minimum 2 parameters must be given or first parameter must be an object');
      if(!$.isPlainObject(a0)){
        var p=[this._type];
        if(this._ns) p.push(this._ns);
        [].unshift.apply(a,p);
        return _set.apply(this,a);
      }else if(this._ns){
        for(var i in a0){
          _set(this._type,this._ns,i,a0[i]);
        }
        return a0;
      }else{
        return _set(this._type,a0);
      }
    },
    // Delete a variable. 
    delete:function(){
      var l=arguments.length,a=arguments,a0=a[0],vi;
      if(l<1) throw new Error('Minimum 1 parameter must be given');
      if(!$.isArray(a0)){
        var p=[this._type];
        if(this._ns) p.push(this._ns);
        [].unshift.apply(a,p);
        return _delete.apply(this,a);
      }else if(this._ns){
        for(var i in a0){
          _delete(this._type,this._ns,a0[i]);
        }
        return true;
      }else{
        return _delete(this._type,a0);
      }
    },
    deleteAll:function(){
      if(this._ns){
        _set(this._type,this._ns,{});
        return true;
      }else{
        return _deleteAll(this._type);
      }
    }
  };

  // Get a new API on a namespace
  $.initNamespaceStorage=function(ns){ return _createNamespace(ns); };
  // localStorage API
  $.localStorage=$.extend({},storage,{_type:'localStorage'});
  // sessionStorage API
  $.sessionStorage=$.extend({},storage,{_type:'sessionStorage'});
})(jQuery);
