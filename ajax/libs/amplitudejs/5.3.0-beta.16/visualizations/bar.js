/**
 * Simple visualization that shows the waveforms as a bar graph
 */
function BarVisualization(){
	/*
		Define the ID, name, and initialize the container. These are a part
		of the visualization template and are necessary.
	*/
	this.id = 'bar_visualization';
	this.name = 'Bar Visualization';
	this.container = '';

	/**
	 * Define the preferences for the visualization
	 */
	this.preferences = {
		bar_color: '#ff0000',
		width: 500,
		height: 200,
		inherit: true,
		spacer_width: 10,
		bar_width: 5,
		offset: 100,
		cutoff: 23
	}

	/*
		Intiialize the analyser used to generate the visualization.
	*/
	this.analyser = '';

	/*
		Initialize the local canvas height, canvas width, context, canvas
		and request animation variables.
	*/
	this.canvasHeight = '';
	this.canvasWidth = '';
	this.ctx = '';
	this.canvas = '';
	this.requestAnimation = '';

	/**
	 * Get the ID of the visualization.
	 */
	this.getID = function(){
		return this.id;
	}

	/**
	 * Get the name of the visualization.
	 */
	this.getName = function(){
		return this.name;
	}

	/**
	 * Set the preferences for the visualization.
	 *
	 * @param {object} userPreferences - The user preferences for the visualization.
	 */
	this.setPreferences = function( userPreferences ){
		for( var key in this.preferences ){
			if( userPreferences[ key ] != undefined) {
				this.preferences[key] = userPreferences[key];
			}
		}
	}

	/**
	 * Start the visualization.
	 *
	 * @param {Node} element - The element that will contain the visualization.
	 */
	this.startVisualization = function( element ){
		/*
			Set the analyser to the Amplitude analyser.
		*/
		this.analyser = Amplitude.getAnalyser();

		/*
			Set the container to the element passed in.
		*/
		this.container = element;

		/*
			Build a canvas element we can draw on for the visualization.
		*/
		this.canvas = document.createElement('canvas');

		/*
			If the user wants the size of the canvas to be the size of the container,
			set the width and height of the visualization to the width and height
			of the container.
		*/
		if( this.preferences.inherit ){
			this.preferences.width = this.container.offsetWidth;
			this.preferences.height = this.container.offsetHeight;
		}

		/*
			Set the width and height of the canvas element in the container.
		*/
		this.canvas.setAttribute('width', this.preferences.width);
		this.canvas.setAttribute('height', this.preferences.height);

		/*
			Get the 2D context of the canvas and append the canvas to the container.
		*/
		this.ctx = this.canvas.getContext('2d');
		this.container.appendChild( this.canvas );

		/*
			Set the local canvas height and canvas width variables to the width
			and height of the canvas. We will use these later.
		*/
		this.canvasHeight = this.canvas.height;
		this.canvasWidth = this.canvas.width;

		/*
			Kick off the visualization.
		*/
		this.rafCallback();
	}

	/**
	 * Stops the visualization and clears the container.
	 */
	this.stopVisualization = function(){
		window.cancelAnimationFrame( this.requestAnimation );
		this.container.innerHTML = '';
	}

	/**
	 * The callback that draws the visualization based on the frequency of the song.
	 */
	this.rafCallback = function( ){
		/*
			Builds an animation frame that updates the visualization to what is
			in the frequency.
		*/
		this.requestAnimation = window.requestAnimationFrame( this.rafCallback.bind(this), this.canvas );

		/*
			Get the frequency data from the analyser.
		*/
		let freqByteData = new Uint8Array( this.analyser.frequencyBinCount );
		this.analyser.getByteFrequencyData( freqByteData );

		/*
			Compute how many bars we need to have
		*/
		let numberOfBars = Math.round( this.canvasWidth / this.preferences.spacer_width );

		/*
			Build the rectangle for each of the elements in the visualization.
		*/
		this.ctx.clearRect( 0, 0, this.canvasWidth, this.canvasHeight );
		this.ctx.fillStyle = this.preferences.bar_color;
		this.ctx.lineCap = 'round';

		/*
			Iterate over how many bars we need and draw the height based
			off of the magnitude of the wave we are displaying
		*/
		for( let i = 0; i < numberOfBars; i++ ){
			let magnitude = freqByteData[ i + this.preferences.offset ];

			this.ctx.fillRect( i * this.preferences.spacer_width, this.canvasHeight, this.preferences.bar_width, -magnitude );
		}
	}
}
