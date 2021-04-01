/*
	This is a template for how to build a visualization for
	AmplitudeJS.  The visualization should be modular contain
	the methods and variables outlined. You can add any additional
	methods or variables inside of the object.
*/

/*
	Replace 'VisualizationObjectName' with the proper object
	name for your visualization.
*/
function VisualizationObjectName(){
	/*
		Define the ID of your visualization. This is used to apply
		visualizations to songs, playlists, and default. It is a JSON
		key so make sure you use `_`
	*/
	this.id = 'visualization_id';

	/*
		Define a clean name for your visualization.
	*/
	this.name = 'Visualization Name';

	/*
		Initialize the container. This will get set to the element passed in
		when you start the visualization.
	*/
	this.container = '';

	/*
		Define any settings that your visualization will need. This is JSON so
		make sure it's clearly defined and standards are followed. These shoudl be
		able to be overwritten by the user when they pass in their preferences.
	*/
	this.preferences = {

	}

	/*
		Initialize the analyser for the visualization. This will be set when the
		visualization is started.
	*/
	this.analyser = '';

	/*
		Returns the ID of the visualization. Do not overwrite this, this is necessary
		for registering the visualization.
	*/
	this.getID = function(){
		return this.id;
	}

	/*
		Returns the name of the visualization.
	*/
	this.getName = function(){
		return this.name;
	}

	/*
		Merge the user defined preferences with the preferences for the visualization.
	*/
	this.setPreferences = function( userPreferences ){
		for( var key in this.preferences ){
			if( userPreferences[ key ] != undefined) {
				this.preferences[key] = userPreferences[key];
			}
		}
	}

	/*
		Start the visualization. Do not over write this. This is how the visualization
		gets kicked into gear. The element passed in is the container element where you
		will insert canvas' or whatever works.
	*/
	this.startVisualization = function( element ){
		this.analyser = Amplitude.getAnalyser();

		this.container = element;

		/*
			Your code here
		*/
	}

	/*
		Stop the visualization. Do not over write this. This gets called when the
		visualization is stopped so there's no infinite loops in memory. You should
		clear all animation frames and all timed callbacks here.

		This will clear the container as well so when the visualization starts again
		it can be different than before if needed.
	*/
	this.stopVisualization = function(){
		this.container.innerHTML = '';
	}
}
