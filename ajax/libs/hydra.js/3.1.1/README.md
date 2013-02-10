# Hydra.js
Hidra.js is a module manager oriented system.

## Updated to version 3.1.1

[Changelog](https://raw.github.com/tcorral/Hydra.js/master/changelog.txt)

## Description

Hydra.js is the library that will help you to scale your app.
Hydra.js is a framework that gives you the tools to write your application using modules or widgets and make easy to work with them.

Hydra.js uses a decoupled architecture that:

* Allows you to change your base framework without change the modules or widget code.
* Allow the modules communicate with each other without knowing which modules are loaded.
* Can be easily extended with new features.

### Some benefits:

* No known module to other modules
 * If something is wrong in one module, the other modules will continue working.
* Notifying an action will be called on all the modules that will be listening this action.
* A module can be extended
 * If you have a module that is working well you can extend it to change his behavior without losing is original behavior.
* Allows multi-instance modules
* Allows set private variables to be used inside of modules.
* Can be used in url threaded application as in an Ajax threaded application.
* You can test your modules with any Unit Testing Framework.
* Only 2.37KB when [Gzipped](https://github.com/tcorral/Hydra.js/raw/master/versions/hydra.min.js.gz) 2.83KB if you add BasicErrorHandler and Deferred plugins.

[Project Web](http://tcorral.github.com/Hydra.js)

[API documentation](http://tcorral.github.com/Hydra.js/apis/Hydra.js_API_v3.1.0/index.html)

[Examples](http://tcorral.github.com/Hydra.js/examples/index.html) to see for yourself!

## Usage

### Before using it:
Insert in your code:

	<script type="text/javascript" src="/path/to/your/js/libs/Hydra.js"></script>

### Setting variables
	Hydra.module.setVars({
		gaq: _gaq,
		list: document.getElementById( "list" )
	});
Setting the variables in this way this variables will be accessible as the last argument in init module method if needed you can access
to this variables object using getVars (See 'Getting variables')
*Tip. This method not only set variables, if the object has been set before the new variables will be merged with the previous object. *

### Getting variables
	var oVars = Hydra.module.getVars();
Returns the object with the private variables set using setVars (See 'Setting variables')

### Create a module
	Hydra.module.register( 'moduleId', function( bus )
	{
		return {
			init: function ( oData ) {}
		};
	});

### Extend a module overriding the base module
To extend a module you will need to register the base module before extends it.

	Hydra.module.extend( 'moduleId', function( bus )
	{
		return {
			init: function ( oData ) {}
		};
	});

### Extend a module creating a new module
To extend a module you will need to register the base module before extends it.

	Hydra.module.extend( 'moduleId', 'newModuleId', function( bus )
	{
		return {
			init: function ( oData ) {}
		};
	});

This extension allows access the parent methods as classical inheritance.

### Access parent methods

Register base module:

	Hydra.module.register( 'moduleId', function( bus )
	{
		return {
			init: function ( oData ) {},
			changeTitle: function( sTitle ){
					document.title = sTitle;
			}
		};
	});

Create the new module using "extend":

	Hydra.module.extend( 'moduleId', 'newModuleId', function( bus )
	{
		return {
			init: function ( oData ) {},
			changeTitle: function( sTitle ){
					sTitle += " " + new Date().getTime();
					// This is the way of access parent methods.
					this.__super__.call( "changeTitle", [sTitle] );
			}
		};
	});


#### When listening events
	Hydra.module.register( 'moduleId', function( bus )
	{
		return {
			events : {
                'channel: {
                    'item:action1': function ( oData ) {}
                }
            },
			init: function ( oData ) {

				/* The subscribing of events is done by Hydra inside the core.
				 * bus.subscribe( this );
				 */
			}
		};
	});

### Publishing actions
To use the action manager you have accessible using "bus".

The publish method expect three arguments, but only the first two are mandatory, the channel name and the event name

	Hydra.bus.publish( 'channel_name', 'event_name', data );

*Tip: 'global' channel is created by default to use it if you want to communicate with other modules that are not related with a specific channel. *

	Hydra.module.register( 'moduleId', function( bus )
	{
		return {
			events : {
			    'channel: {
			        'item:action1': function ( oData ) {}
			    }
			},
			init: function ( oData ) {
                $( "#button" ).click( function(){
                    bus.publish( 'channel', 'item:action1', {} );
                });
			}
		};
	});

If you need compatibility with the previous event manager called Action, you can add it in your code to maintain compatibility with previous version's code. You can download it from: [Action](https://github.com/tcorral/Hydra_Extensions/tree/master/Sandbox) 


## Documentation

[Project Web](http://tcorral.github.com/Hydra.js)

[API documentation](http://tcorral.github.com/Hydra.js/apis/Hydra.js_API_v2.5.0/index.html)

[Examples](http://tcorral.github.com/Hydra.js/examples/index.html) to see for yourself!

## License

Hydra.js is licensed under the MIT license.

## Agreements

Hydra was inspired by Nicholas Zakas presentation.

* [Scalable Javascript Application](http://www.slideshare.net/nzakas/scalable-javascript-application-architecture)
