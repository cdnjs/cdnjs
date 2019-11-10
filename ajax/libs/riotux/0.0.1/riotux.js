;(function( window ) {
  
var Riotux = { 
  separate: ':',
  centralDispatcher: new GlobalObserver(),
  namespaces: [],
  stores: {},
  addStore: function (storeName, store) {
    this.stores[storeName] = store;
  },
  addNamespace: function ( observer, method) {
    this.namespaces.push(observer + ':' + method);
  },
  getNamespaces: function ( ) {
    return this.namespaces;
  },
  getStores: function ( ) {
     return this.stores;
  },
  removeStores: function () {
    this.stores = {}
  },
  getNamespace: function ( name ) {
    var namespaces = []
    this.namespaces.forEach(function ( index ) {
      var split = index.split(Riotux.separate)
      if ( split[0] === name ) {
        namespaces.push(split[1])
      }
    })
    return namespaces
  }
}
var _riot_methods = ['on','one','off','trigger']

_riot_methods.forEach(function ( api ) {
  Riotux[api] = function ( ) {
    var args = [].slice.call(arguments);
    var names = args[0].split(this.separate);
    Riotux.addNamespace(names[0], names[1]);
    this.centralDispatcher[api].apply(null, args);
  }
})

function GlobalObserver () {
  riot.observable(this);
}

if ( !window.Riotux ) {
  window.Riotux = Riotux;
}
}(window));