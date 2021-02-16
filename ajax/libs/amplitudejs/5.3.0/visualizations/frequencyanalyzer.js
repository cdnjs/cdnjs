function FrequencyAnalyzerVisualization(){
	/*
		Define the ID of your visualization. This is used to apply
		visualizations to songs, playlists, and default. It is a JSON
		key so make sure you use `_`
	*/
	this.id = 'frequency_analyzer_visualization';

	/*
		Define a clean name for your visualization.
	*/
	this.name = 'Frequency Analyzer Visualization';

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
        width: 500,
        height: 500,
        inherit: true,
        type: 'gradient',
        red: 50,
        green: 240,
        blue: 50
	}

	/*
		Initialize the analyser for the visualization. This will be set when the
		visualization is started.
	*/
	this.analyser = '';
    
    this.canvas = document.createElement('canvas');

    this.canvasHeight = '';
    this.canvasWidth = '';

    this.buffer = '';
    this.audioArray = '';
    this.context = '';

    this.barWidth = '';
    this.barHeight = '';

    this.x = 0;

    this.requestAnimation = '';

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

        if( this.preferences.inherit ){
			this.preferences.width = this.container.offsetWidth;
			this.preferences.height = this.container.offsetHeight;
        }
        
        this.canvas.height = this.preferences.height;
        this.canvas.width = this.preferences.width;

        this.analyser.fftSize       = 256;
        
        this.canvasHeight = this.canvas.height;
        this.canvasWidth = this.canvas.width;

        this.buffer = this.analyser.frequencyBinCount;
        this.audioArray = new Uint8Array( this.buffer );
        
        this.context = this.canvas.getContext("2d");
        
        this.barWidth = ( this.canvasWidth / this.buffer ) * 2;
        
        this.container.appendChild( this.canvas );

        switch( this.preferences.type ){
            case 'gradient':
                this.renderGradientAnimation();
            break;
            case 'dynamic':
                this.renderDynamicColorAnimation();
            break;
            case 'single':
                this.renderSingleColorAnimation();
            break;
        }
        
    }

    this.renderGradientAnimation = function( ){
        this.requestAnimation = requestAnimationFrame( this.renderGradientAnimation.bind(this) );
        this.x = 0;

        this.analyser.getByteFrequencyData( this.audioArray );
        this.context.fillStyle = "black";
        this.context.fillRect(0, 0, this.canvasWidth, this.canvasHeight );

        var gradient = this.context.createLinearGradient(0, 0, 0, this.canvasHeight);
        gradient.addColorStop(1, '#00ff00');
        gradient.addColorStop(0.5, '#ff8000');
        gradient.addColorStop(0, '#e60000');

        for (var i = 0; i < this.buffer; i++) {
            this.barHeight  = this.audioArray[i] - 50;

            this.context.fillStyle = gradient;
            this.context.fillRect(this.x, this.canvasHeight - this.canvasWidth, this.barWidth, this.barHeight);

            this.x += this.barWidth + 1;
        }
    }

    this.renderDynamicColorAnimation = function( ){
        this.requestAnimation = requestAnimationFrame( this.renderDynamicColorAnimation.bind(this) );

        this.x = 0;

        this.analyser.getByteFrequencyData( this.audioArray );
        this.context.fillStyle = '#000';
        this.context.fillRect( 0, 0, this.canvasWidth, this.canvasHeight );

        for( var i = 0; i < this.buffer; i++ ){
            this.barHeight = ( this.audioArray[i] / 2 );

            this.preferences.red = 100 * ( i / this.buffer );
            this.preferences.blue = 150;
            this.preferences.green = this.barHeight + 100 * ( i / this.buffer );

            this.context.fillStyle = 'rgb(' + this.preferences.red + ', ' + this.preferences.green + ', ' + this.preferences.blue + ')';
            this.context.fillRect( this.x, this.canvasHeight - this.barHeight, this.barWidth, this.barHeight );

            this.x += this.barWidth + 1;
        }
    }

    this.renderSingleColorAnimation = function(){
        this.requestAnimation = requestAnimationFrame( this.renderSingleColorAnimation.bind( this ) );

        this.x = 0;

        this.analyser.getByteFrequencyData( this.audioArray );
        this.context.fillStyle = '#000';
        this.context.fillRect( 0, 0, this.canvasWidth, this.canvasHeight );

        for( var i = 0; i < this.buffer; i++ ){
            this.barHeight = ( this.audioArray[i] / 2 );

            this.context.fillStyle = 'rgb(' + this.preferences.red + ', ' + this.preferences.green + ', ' + this.preferences.blue + ')';
            this.context.fillRect( this.x, this.canvasHeight - this.barHeight, this.barWidth, this.barHeight );

            this.x += this.barWidth + 1;
        }
    }

	/*
		Stop the visualization. Do not over write this. This gets called when the
		visualization is stopped so there's no infinite loops in memory. You should
		clear all animation frames and all timed callbacks here.

		This will clear the container as well so when the visualization starts again
		it can be different than before if needed.
	*/
	this.stopVisualization = function(){
        cancelAnimationFrame( this.requestAnimation );
		this.container.innerHTML = '';
	}
}