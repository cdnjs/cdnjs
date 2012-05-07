
// creates an empty namespace
Namespace('com.sandbox');

// creates or use a namespace and fill it with the specified properties
Namespace('com.sandbox', {

	Console: {
		log: function(message) {
			var element = document.getElementById('console');
			element.innerHTML = element.innerHTML + message + '<br />';
		}
	}
	
});

// calls Console using the fully qualified name (fqn)
com.sandbox.Console.log('hello world');

// imports all properties from com.sandbox into the global space
Namespace.use('com.sandbox.*');
Console.log('unpacked hello world');

// includes com/sandbox/SayHiClass.js
// as we use a callback, file is loaded asynchronously
Namespace.include('com.sandbox.SayHiClass', function() {
	new com.sandbox.SayHiClass();
});

// auto includes com/sandbox/MyNameIsClass.js file and imports MyNameIsClass into the global space
// unpack() will use include(). will be async as we use a callback
Namespace.use('com.sandbox.MyNameIsClass', function() {
	new MyNameIsClass('peter');
});

// imports all properties from com.sandbox.classes after including the file com/sandbox/classes.js
// the use() identifier can also be relative to the identifier used in from() by starting 
// with a dot (would be .* in this case)
Namespace.from('com.sandbox.classes').use('com.sandbox.classes.*', function() {
	new MyClass1();
	new MyClass2();
});

// register a listener for the includeError event
Namespace.addEventListener('includeError', function(event) {
	Console.log('an error occured loading ' + event.identifier);
});
// try to include an inexistant file
Namespace.include('com.sandbox.toto');

