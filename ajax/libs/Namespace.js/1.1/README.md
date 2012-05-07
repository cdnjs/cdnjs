# Namespace.js

Namespace.js is a small javascript script which provide namespacing utilities. 
It is framework independent. It also allows you to remotely include files.

Features:

 *  Simple API
 *  Framework independent
 *  Remote file loading (synchronously or async)
 *  Tested against Firefox 3.x, Safari 3.x, IE 6/7 and Opera 9.5
 *  Highly configurable
 *  Events
 *  Optionally add methods to native objects

Documentation available at http://wiki.github.com/maximebf/Namespace.js/

## Examples

    Namespace('foo.bar');
    foo.bar.myFunction = function() {};
    
    Namespace('com.example', {
        MyClass: function() { return {}; }
    });
    var obj = new com.example.MyClass();
    
    Namespace.use('com.example.MyClass');
    var obj2 = new MyClass();
    
    // include com/example/RemoteClass.js
    Namespace.include('com.example.RemoteClass');
    var obj3 = new com.example.RemoteClass();
    
    Namespace.registerNativeExtensions();
    'com.foo.bar'.namespace();
