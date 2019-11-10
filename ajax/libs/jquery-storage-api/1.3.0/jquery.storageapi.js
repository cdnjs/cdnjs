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
 * Version: 1.3.0
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
          ret[vi]=JSON.parse(s.getItem(vi));
        }catch(e){
          ret[vi]=s.getItem(vi);
        }
      }
      return ret;
    }else if(l==2){
      try{
        return JSON.parse(s.getItem(a1));
      }catch(e){
        return s.getItem(a1);
      }
    }else{
      try{
        ret=JSON.parse(s.getItem(a1));
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
        if(!$.isPlainObject(vi)) s.setItem(i,vi);
        else s.setItem(i,JSON.stringify(vi));
      }
      return a1;
    }else if(l==3 && !$.isPlainObject(a2)){
      s.setItem(a1,a2);
      return a2;
    }else if(l==3){
      s.setItem(a1,JSON.stringify(a2));
      return a2;
    }else{
      try{
        to_store=JSON.parse(s.getItem(a1));
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
      s.setItem(a1,JSON.stringify(to_store));
      return to_store;
    }
  }

  // Delete a variable in a storage. Infinite arguments to be able to delete property in objects
  // If second argument is an array, each property is deleted
  function _remove(storage){
    var l=arguments.length,s=window[storage],a=arguments,a1=a[1],to_store,tmp;
    if(l<2) throw new Error('Minimum 2 parameters must be given');
    else if($.isArray(a1)){
      for(var i in a1){
        s.removeItem(a1[i]);
      }
      return true;
    }else if(l==2){
      s.removeItem(a1);
      return true;
    }else{
      try{
        to_store=tmp=JSON.parse(s.getItem(a1));
      }catch(e){
        throw new ReferenceError(a1+' is not defined in this storage');
      }
      for(var i=2;i<l-1;i++){
        tmp=tmp[a[i]];
        if(tmp===undefined) throw new ReferenceError([].slice.call(a,1,i).join('.')+' is not defined in this storage');
      }
      delete tmp[a[i]];
      s.setItem(a1,JSON.stringify(to_store));
      return true;
    }
  }

  // Delete all variables in a storage
  function _removeAll(storage){
    for(var i in window[storage]){
      window[storage].removeItem(i);
    }
  }

  // Create new namespace storage
  function _createNamespace(name){
    if(!name || typeof name!="string") throw new Error('First parameter must be a string');
    if(!window.localStorage.getItem(name)) window.localStorage.setItem(name,'{}');
    if(!window.sessionStorage.getItem(name)) window.sessionStorage.setItem(name,'{}');
    var ns={
      localStorage:$.extend({},$.localStorage,{_ns:name}),
      sessionStorage:$.extend({},$.localStorage,{_ns:name})
    };
    if($.cookie){
      if(!window.cookieStorage.getItem(name)) window.cookieStorage.setItem(name,'{}');
      ns.cookieStorage=$.extend({},$.cookieStorage,{_ns:name});
    }
    return ns;
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
	var r=_set.apply(this,a);
	if(this._ns) return r[a0];
        else return r;
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
    remove:function(){
      var l=arguments.length,a=arguments,a0=a[0],vi;
      if(l<1) throw new Error('Minimum 1 parameter must be given');
      if(!$.isArray(a0)){
        var p=[this._type];
        if(this._ns) p.push(this._ns);
        [].unshift.apply(a,p);
        return _remove.apply(this,a);
      }else if(this._ns){
        for(var i in a0){
          _remove(this._type,this._ns,a0[i]);
        }
        return true;
      }else{
        return _remove(this._type,a0);
      }
    },
    // Delete all variable
    removeAll:function(){
      if(this._ns){
        _set(this._type,this._ns,{});
        return true;
      }else{
        return _removeAll(this._type);
      }
    }
  };

  // Use jquery.cookie for compatibility with old browsers and give access to cookieStorage
  if($.cookie){
    // sessionStorage is valid for one window/tab. To simulate that with cookie, we set a name for the window and use it for the name of the cookie
    if(!window.name) window.name=Math.floor(Math.random()*100000000);
    var cookie_storage={
      _prefix:'',
      _expires:null,
      setItem:function(n,v){
	$.cookie(this._prefix+n,v,{expires:this._expires});
      },
      getItem:function(n){
	return $.cookie(this._prefix+n);
      },
      removeItem:function(n){
	return $.removeCookie(this._prefix+n);
      },
      setExpires:function(e){
	this._expires=e;
	return this;
      }
    };
    if(!window.localStorage){
      window.localStorage=$.extend({},cookie_storage,{_prefix:'ls_',_expires:365*10});
      window.sessionStorage=$.extend({},cookie_storage,{_prefix:'ss_'+window.name+'_'});
    }
    window.cookieStorage=$.extend({},cookie_storage);
    // cookieStorage API
    $.cookieStorage=$.extend({},storage,{_type:'cookieStorage',setExpires:function(e){window.cookieStorage.setExpires(e); return this;}});
  }
  
  // Get a new API on a namespace
  $.initNamespaceStorage=function(ns){ return _createNamespace(ns); };
  // localStorage API
  $.localStorage=$.extend({},storage,{_type:'localStorage'});
  // sessionStorage API
  $.sessionStorage=$.extend({},storage,{_type:'sessionStorage'});
})(jQuery);
