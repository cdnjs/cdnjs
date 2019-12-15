/*
	Amplitude.js
	Version: 2.2
*/
var Amplitude = (function () {
	/*
	|--------------------------------------------------------------------------
	| Initializers
	|--------------------------------------------------------------------------
	| When the document is ready, Amplitude goes through and finds the elements
	| that should have event listeners and binds them. Next it will set up all
	| of the song time visualizations.  These visualizations simply show the
	| proportion of the song time that has elapsed with respect to the container
	| element. These are NOT the visualizations for audio frequencies that are
	| artistic.  It's a div that fills with another div representing the song time.
	*/
	document.onreadystatechange = function () {
		if( document.readyState == "complete" ){
			privateInitializeEventHandlers();
			privateInitializeSongTimeVisualizations();
		}
	}

	/*
	|--------------------------------------------------------------------------
	| Module Variables
	|--------------------------------------------------------------------------
	| These variables make Amplitude run. The config is the most important
	| containing active settings and parameters. The Web Audio API variables
	| for visualizations are below.
	*/

	/*--------------------------------------------------------------------------
		The config JSON is the global settings for ALL of Amplitude functions.
		This is global and contains all of the user preferences. The default
		settings are set, and the user overwrites them when they initialize
		Amplitude.
	--------------------------------------------------------------------------*/
	var config = {
		/*
			The audio element we will be using to handle all of the audio. This
			is the javascript version of the HTML5 audio element.
		*/
		active_song: new Audio(),
		/*
			JSON object that contains the active metadata for the song.
		*/
		active_metadata: {},
		/*
			String to hold the active album name. Used to check and see if the
			album changed and run the album changed callback.
		*/
		active_album: '',
		/*
			Contains the index of the actively playing song.
		*/
		active_index: 0,
		/*
			Set to true to autoplay the song
		*/
		autoplay: false,
		/*
			Used to determine if the album has changed and run the callback if it
			has.
		*/
		album_change: false,
		/*
			The user can set dynamic_mode to true and dynamic mode will be enabled
			allowing the user to pass a JSON representation of a song when they
			want to play it and utilize the Amplitude events to control it. The 
			user also doesn't have to config songs to use dynamic mode.
		*/
		dynamic_mode: false,
		/*
			The user can pass a JSON object with a key => value store of callbacks
			to be run at certain events.
		*/
		callbacks: {},
		/*
			Object containing all of the songs the user has passed to Amplitude
			to use.
		*/
		songs: {},
		/*
			When repeat is on, when the song ends the song will replay itself.
		*/
		repeat: false,
		/*
			When shuffled, this gets populated with the songs the user provided
			in a random order.
		*/
		shuffle_list: {},
		/*
			When shuffled is turned on this gets set to true so when traversing
			through songs Amplitude knows whether or not to use the songs object
			or the shuffle_list.
		*/
		shuffle_on: false,
		/*
			When shuffled, this index is used to let Amplitude know where it's
			at when traversing.
		*/
		shuffle_active_index: 0,
		/*
			The user can set default album art to be displayed if the song they
			set doesn't contain album art.
		*/
		default_album_art: '',
		/*
			When set to true, Amplitude will print to the console any errors
			that it runs into providing helpful feedback to the user.
		*/
		debug: false,
		/*
			When Amplitude finishes initializing, this is set to true. When set
			to true, Amplitude cannot be initialized again preventing double
			event handlers.
		*/
		initialized: false,
		/*
			By default this is true, but if the user wanted to hard code elements
			with song data, they could set this to false and Amplitude wouldn't 
			edit the now playing information in elements.
		*/
		handle_song_elements: true,
		/*
			The user can set the initial volume to a number between 0 and 1
			overridding a default of .5.
		*/
		volume: .5,
		/*
			This is set on mute so that when a user un-mutes Amplitude knows
			what to restore the volume to.
		*/
		pre_mute_volume: .5,
		/*
			This is an integer between 1 and 100 for how much the volume should
			increase when the user presses a volume up button.
		*/
		volume_increment: 5,
		/*
			This is an integer between 1 and 100 for how much the volume should
			decrease when the user presses a volume down button.
		*/
		volume_decrement: 5,
		/*
			To use visualizations with Amplitude, the user will set this to true.
			It is assumed that the user has thoroughly tested thier songs and have
			a back up plan in place if the browser doesn't support the Web Audio API.
			By doing this, we bypass a lot of unforseen errors with auto binding
			the web audio API to songs that don't need visualizations.
		*/
		use_visualizations: false,
		/*
			Handles all of the user registered visualizations if the user chooses
			to use visualizations in their design.
		*/
		visualizations: new Array(),
		/*
			Is set to the active visualization so Amplitude can detect changes
			per song if necessary.
		*/
		active_visualization: '',
		/*
			Holds the information the user defined about the current visualization,
			such as preferences.
		*/
		current_visualization: {},
		/*
			When the visualization is started, this is set to true.
		*/
		visualization_started: false,
		/*
			If the browser doesn't support visualizations, the user can provide
			a back up.  'nothing' is the default which removes the visualization
			element from the document. 'album-art' has Amplitude inject the now
			playing album art into the element that would have contained the
			visualization.
		*/
		visualization_backup: '',
		/*
			When using SoundCloud, the user will have to provide their API Client
			ID
		*/
		soundcloud_client: '',
		/*
			The user can set this to true and Amplitude will use the album art
			for the song returned from the Soundcloud API
		*/
		soundcloud_use_art: false,
		/*
			Used on config to count how many songs are from soundcloud and
			compare it to how many are ready for when to move to the rest
			of the configuration.
		*/
		soundcloud_song_count: 0,
		/*
			Used on config to count how many songs are ready so when we get
			all of the data from the SoundCloud API that we need this should
			match the SoundCloud song count meaning we can move to the rest
			of the config.
		*/
		soundcloud_songs_ready: 0,
		/*--------------------------------------------------------------------------
			These are web audio API variables.  They connect the web audio
			api to the audio source allowing for visualization extensions.
			These variables are public and to be used for extensions.
			Initializes the variables if they are available.
		--------------------------------------------------------------------------*/
		context: '',
		analyser: '',
		source: ''
	};

	/*--------------------------------------------------------------------------
		Used with SoundCloud to copy over the user config and add
		extra data so it doesn't interfere with the actual user
		config.
	--------------------------------------------------------------------------*/
	var temp_user_config = {};
	
	/*
	|--------------------------------------------------------------------------
	| PUBLIC METHODS
	|--------------------------------------------------------------------------
	| These methods are available to the developer.  They allow the developer
	| to change certain attributes if needed and configure the library.
	*/

	/*--------------------------------------------------------------------------
		The main init function.  The user will call this through 
		Amplitude.init({}) and pass in their settings.
		
		Public Accessor: Amplitude.init( user_config_json );

	 	@param user_config A JSON object of user defined values that help 
	 	configure and initialize AmplitudeJS.
	--------------------------------------------------------------------------*/
	function publicInit( user_config ){
		/*
			Checks to see if Amplitude has been initialized.
			If it hasn't then we can initialize AmplitudeJS. 
			The reason we check is so the same event handler 
			isn't bound twice to the same element.
		*/
		if( !config.initialized ){
			/*
				Initializes debugging right away so we can use it for the rest
				of the configuration.
			*/
			config.debug = ( user_config.debug != undefined ? user_config.debug : false );

			/*
				Checks for dynamic mode right away.  This will determine whether
				not having songs is a critical error or not since dynamic mode
				allows you to play songs by passing them in dynamically.
			*/
			config.dynamic_mode = ( user_config.dynamic_mode != undefined ? user_config.dynamic_mode : false );
			
			/*
				To use visualizations with Amplitude, the user will have to explicitly state
				that their player uses visualizations.  Reason being is that the AudioContext
				and other filters can really mess up functionality if the user is not prepared
				to have them operate on their audio element.  If set to true, then the
				AudioContext and the other necessary elements will be bound for the Web Audio API
				to handle the visualization processing.
			*/
			config.use_visualizations = ( user_config.use_visualizations != undefined ? user_config.use_visualizations : false );
			
			/*
				If the browser supports it and the user wants to use
				visualizations, then they can run visualizations. If
				the browser does not support the Web Audio API and the
				user has debug turned on, write to the console.
			*/
			if( window.AudioContext && config.use_visualizations ){
				config.context = new AudioContext();
				config.analyser = config.context.createAnalyser();

				config.source = config.context.createMediaElementSource( config.active_song );
				config.source.connect( config.analyser );
				
				config.analyser.connect( config.context.destination );

				config.active_song.crossOrigin = "anonymous";
			}else{
				if( !window.AudioContext ){
					privateWriteDebugMessage( 'This browser does not support the Web Audio API' );
				}
			}

			/*
				The first step in setting up Amplitude is copying over all of 
				the song objects that the user wants to use.
			*/
			var ready = false;

			/*
				This copies over all of the user defined songs and adds them
				to the amplitude config.

				First check is to see if Amplitude is in Dynamic Mode which
				means that the user will be selecting sending songs dynamically
				and using a global control set to control the functionality.
				This is the ONLY scenario that doesn't require song(s) object.
			*/
			if( !user_config.dynamic_mode ){
				/*
					Checks to see if the user defined any songs.
					If there are no song definitions, then it's 
					a critical error since Amplitude needs that to
					run.
				*/
				if( user_config.songs ){
					/*
						Makes sure the songs length is not 0, meaning
						that there is at least 1 song.
					*/
					if( user_config.songs.length != 0 ){
						/*
							Copies over the user defined songs. and prepares
							Amplitude for the rest of the configuration.
						*/
						config.songs = user_config.songs;
						ready = true;
					}else{
						privateWriteDebugMessage( 'Please add some songs, to your songs object!' );
					}
				}else{
					privateWriteDebugMessage( 'Please provide a songs object for AmplitudeJS to run!' );
				}
			}else{
				/*
					We are ready to copy over the rest of the information
					since we are in dynamic mode.
				*/
				ready = true;
			}
			

			/*
				When the preliminary config is ready, we are rady to proceed.
			*/
			if( ready ){
				/*
					Copies over the soundcloud information to the global config
					which will determine where we go from there.
				*/
				config.soundcloud_client = ( user_config.soundcloud_client != undefined ? user_config.soundcloud_client : '' );
				config.soundcloud_use_art = ( user_config.soundcloud_use_art != undefined ? user_config.soundcloud_use_art : '' );
				
				/*
					If the user provides a soundcloud client then we assume that
					there are URLs in their songs that will reference SoundcCloud.
					We then copy over the user config they provided to the 
					temp_user_config so we don't mess up the global or their configs
					and load the soundcloud information.
				*/
				if( config.soundcloud_client != '' ){
					temp_user_config = user_config;

					/*
						Load up SoundCloud for use with AmplitudeJS.
					*/
					privateLoadSoundcloud();
				}else{
					/*
						The user is not using Soundcloud with Amplitude at this point
						so we just finish the configuration with the users's preferences.
					*/
					privateSetConfig( user_config );
				}
			}
		}
	}

	/*--------------------------------------------------------------------------
		Allows the user to turn on debugging.
		
		Public Accessor: Amplitude.setDebug( bool );
		
	 	@param BOOL state Turns debugging on and off.
	--------------------------------------------------------------------------*/
	function publicSetDebug( state ){
		/*
			Sets the global config debug on or off.
		*/
		config.debug = state;
	}

	/*--------------------------------------------------------------------------
		Returns the active song meta data for the user to do what is 
		needed.
		
		Public Accessor: Amplitude.getActiveSongMetadata();
		
	 	@returns JSON Object with the active song information
	--------------------------------------------------------------------------*/
	function publicGetActiveSongMetadata(){
		return config.active_metadata;
	}

	/*--------------------------------------------------------------------------
		Registers a visualization and sets that visualization's 
		preferences. When creating a visualization, you can set certain
		preferences that the user can overwrite similar to Amplitude.

		Public Accessor: Amplitude.registerVisualization( visualization, preferences )

		@param visualzation A visualization object that gets registered
		with Amplitude

		@param preferences A JSON object of preferences relating to the
		visualization
	--------------------------------------------------------------------------*/
	function publicRegisterVisualization( visualization, preferences ){
		/*
			Adds the visualization to the global config so it knows
			it can be used when playing songs.

			getID is a public function for getting a visualization's id.
			It becomes the key to access the visualization.
		*/
		config.visualizations[ visualization.getID ] = visualization;
		
		/*
			If defined, set the visualization preferences.
			setPreferences is a public function for connecting
			to a user defined visualization.
		*/
		if( preferences != undefined ){
			visualization.setPreferences( preferences );
		}
	}

	/*--------------------------------------------------------------------------
		Changes the active visualization. Could be called from a 
		user defined dropdown or whatever way the user wants to change a
		visualization dynamically.
		
		Public Accessor: Amplitude.changeVisualization( visualization )

		@param string visualization The name of the visualization
		that should be used.
	--------------------------------------------------------------------------*/
	function publicChangeActiveVisualization( visualization ){
		/*
			First we stop the active visualization. If the visualization
			is set up correctly, it should halt all callbacks, and clear
			the amplitude-visualization element.
		*/
		privateStopVisualization();

		/*
			Next we set the active visualization in the config.
		*/
		config.active_visualization = visualization;

		/*
			We then start the visualization hooks again.  This should
			insert itself into the amplitude-visualization element
			and bind the proper hooks.
		*/
		privateStartVisualization();
	}

	/*--------------------------------------------------------------------------
		Checks to see if the current browser is capable of running
		visualizations. If the AudioContext is available, then the browser
		can play the visualization.
		
		Public Accessor: Amplitude.visualizationCapable()
		
		@returns BOOL true if the browser can play the visualization and false
		if the browser cannot.
	--------------------------------------------------------------------------*/
	function publicVisualizationCapable(){
		if ( !window.AudioContext ) {
			return false;
		}else{
			return true;
		}
	}

	/*--------------------------------------------------------------------------
		Returns a song in the songs array at that index
		
		Public Accessor: Amplitude.getSongByIndex( song_index )

		@param int index The integer for the index of the
		song in the songs array.

		@returns JSON representation for the song at a specific index.
	--------------------------------------------------------------------------*/
	function publicGetSongByIndex( index ){
		return config.songs[index];
	}

	/*--------------------------------------------------------------------------
		Adds a song to the end of the config array.  This will allow Amplitude
		to play the song in a playlist type setting.
		
		Public Accessor: Amplitude.addSong( song_json )

		@param song JSON representation of a song.

		@returns int New index of the song.
	--------------------------------------------------------------------------*/
	function publicAddSong( song ){
		config.songs.push( song );
		return config.songs.length - 1;
	}

	/*--------------------------------------------------------------------------
		When you pass a song object it plays that song right awawy.  It sets
		the active song in the config to the song you pass in and synchronizes
		the visuals.
		
		Public Accessor: Amplitude.playNow( song_json )

		@param song JSON representation of a song.
	--------------------------------------------------------------------------*/
	function publicPlayNow( song ){
		/*
			Makes sure the song object has a URL associated with it
			or there will be nothing to play.
		*/
		if( song.url ){
			config.active_song.src = song.url;
			config.active_metadata = song;
			config.active_album = song.album;
		}else{
			privateWriteDebugMessage('The song needs to have a URL!');
		}
		

		/*
			Sets the main song control status visual
		*/
		privateChangePlayPauseState('playing');

		/*
			Calls the song change method that configures everything necessary for
			Amplitude when the song changes.
		*/
		privateAfterSongChanges();

	}

	/*--------------------------------------------------------------------------
		Allows the user to play whatever the active song is directly
		through Javascript. Normally ALL of Amplitude functions that access
		the core features are called through event handlers. However when in
		dynamic mode is enabled, you will need to call this directly.

		WARNING: Accessible ONLY if dynmaic mode is turned on.

		Public Accessor: Amplitude.play();
	--------------------------------------------------------------------------*/
	function publicPlay(){
		if( config.dynamic_mode ){
			privatePlay();
		}
	}

	/*--------------------------------------------------------------------------
		Allows the user to pause whatever the active song is directly
		through Javascript. Normally ALL of Amplitude functions that access
		the core features are called through event handlers. However when in
		dynamic mode is enabled, you will need to call this directly.

		WARNING: Accessible ONLY if dynmaic mode is turned on.

		Public Accessor: Amplitude.pause();
	--------------------------------------------------------------------------*/
	function publicPause(){
		if( config.dynamic_mode ){
			privatePause();
		}
	}

	function publicGetAnalyser(){
		return config.analyser;
	}

	/*
	|--------------------------------------------------------------------------
	| INITIALIZATION FUNCTIONS
	|--------------------------------------------------------------------------
	| CALLED ON INITIALIZATION 
	| 
	| These functions are called on initialization and configure the base
	| functionality for Amplitude.  They init event handlers and set up the
	| song time visualizations.
	*/

	/*--------------------------------------------------------------------------
		Binds all AmplitudeJS event handlers to their respective elements.
		This is a special function that is ONLY called once the document
		is initialized.  If it is called more than once than more than one
		event handler will be bound to an individual element causing chaos.

		If the navigator is a mobile device, the event bound for user
		interaction is 'touchstart', otherwise it is 'click' for the majority 
		of the AmplitudeJS elements.  

		The 'input' interaction is used for the HTML5 Range song sliders.

		The events 'timeupdate' and 'ended' are bound to the javascript 
		audio element.
	--------------------------------------------------------------------------*/
	function privateInitializeEventHandlers(){
		/*
			On time update for the audio element, update visual displays that
			represent the time on either a visualized element or time display.
		*/
		config.active_song.addEventListener('timeupdate', privateUpdateTime );

		/*
			When the audio element has ended playing, we handle the song
			ending. In a single song or multiple modular song instance,
			this just synchronizes the visuals for time and song time
			visualization, but for a playlist it determines whether
			it should play the next song or not.
		*/
		config.active_song.addEventListener('ended', privateHandleSongEnded );

		/*
			Binds handlers for play classes
		*/
		var play_classes = document.getElementsByClassName("amplitude-play");

		for( var i = 0; i < play_classes.length; i++ ){
			if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
				play_classes[i].addEventListener('touchstart', privatePlayClickHandle );
			}else{
				play_classes[i].addEventListener('click', privatePlayClickHandle );
			}
		}

		/*
			Binds handlers for pause classes
		*/
		var pause_classes = document.getElementsByClassName("amplitude-pause");

		for( var i = 0; i < pause_classes.length; i++ ){
			if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
				pause_classes[i].addEventListener('touchstart', privatePauseClickHandle );
			}else{
				pause_classes[i].addEventListener('click', privatePauseClickHandle );
			}
		}

		/*
			Binds handlers for stop classes
		*/
		var stop_classes = document.getElementsByClassName("amplitude-stop");

		for( var i = 0; i < stop_classes.length; i++ ){
			if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
				stop_classes[i].addEventListener('touchstart', privateStopClickHandle );
			}else{
				stop_classes[i].addEventListener('click', privateStopClickHandle );
			}
		}

		/*
			Binds handlers for play/pause classes
		*/
		var play_pause_classes = document.getElementsByClassName("amplitude-play-pause");

		for( var i = 0; i < play_pause_classes.length; i++ ){
			if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
				play_pause_classes[i].addEventListener('touchstart', privatePlayPauseClickHandle );
			}else{
				play_pause_classes[i].addEventListener('click', privatePlayPauseClickHandle );
			}
		}

		/*
			Binds handlers for mute classes

			WARNING: If iOS, we don't do anything because iOS does not allow the
			volume to be adjusted through anything except the buttons on the side of
			the device.
		*/
		var mute_classes = document.getElementsByClassName("amplitude-mute");

		for( var i = 0; i < mute_classes.length; i++ ){
			if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
				/*
					Checks for an iOS device and displays an error message if debugging
					is turned on.
				*/
				if( /iPhone|iPad|iPod/i.test(navigator.userAgent) ) {
					privateWriteDebugMessage( 'iOS does NOT allow volume to be set through javascript: https://developer.apple.com/library/safari/documentation/AudioVideo/Conceptual/Using_HTML5_Audio_Video/Device-SpecificConsiderations/Device-SpecificConsiderations.html#//apple_ref/doc/uid/TP40009523-CH5-SW4' );
				}else{
					mute_classes[i].addEventListener('touchstart', privateMuteClickHandle );
				}
			}else{
				mute_classes[i].addEventListener('click', privateMuteClickHandle );
			}
		}

		/*
			Binds handlers for volume up classes

			WARNING: If iOS, we don't do anything because iOS does not allow the
			volume to be adjusted through anything except the buttons on the side of
			the device.
		*/
		var volume_up_classes = document.getElementsByClassName("amplitude-volume-up");

		for( var i = 0; i < volume_up_classes.length; i++ ){
			if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
				/*
					Checks for an iOS device and displays an error message if debugging
					is turned on.
				*/
				if( /iPhone|iPad|iPod/i.test(navigator.userAgent) ) {
					privateWriteDebugMessage( 'iOS does NOT allow volume to be set through javascript: https://developer.apple.com/library/safari/documentation/AudioVideo/Conceptual/Using_HTML5_Audio_Video/Device-SpecificConsiderations/Device-SpecificConsiderations.html#//apple_ref/doc/uid/TP40009523-CH5-SW4' );
				}else{
					volume_up_classes[i].addEventListener('touchstart', privateVolumeUpClickHandle );
				}
			}else{
				volume_up_classes[i].addEventListener('click', privateVolumeUpClickHandle );
			}
		}

		/*
			Binds handlers for volume down classes

			WARNING: If iOS, we don't do anything because iOS does not allow the
			volume to be adjusted through anything except the buttons on the side of
			the device.
		*/
		var volume_down_classes = document.getElementsByClassName("amplitude-volume-down");
		
		for( var i = 0; i < volume_down_classes.length; i++ ){
			if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
				/*
					Checks for an iOS device and displays an error message if debugging
					is turned on.
				*/
				if( /iPhone|iPad|iPod/i.test(navigator.userAgent) ) {
					privateWriteDebugMessage( 'iOS does NOT allow volume to be set through javascript: https://developer.apple.com/library/safari/documentation/AudioVideo/Conceptual/Using_HTML5_Audio_Video/Device-SpecificConsiderations/Device-SpecificConsiderations.html#//apple_ref/doc/uid/TP40009523-CH5-SW4' );
				}else{
					volume_down_classes[i].addEventListener('touchstart', privateVolumeDownClickHandle );
				}
			}else{
				volume_down_classes[i].addEventListener('click', privateVolumeDownClickHandle );
			}
		}

		/*
			Binds handlers for song slider classes. The song sliders are HTML 5 
			Range Elements.  This event fires everytime a slider has changed.
		*/
		var song_sliders = document.getElementsByClassName("amplitude-song-slider");

		for( var i = 0; i < song_sliders.length; i++ ){
			song_sliders[i].addEventListener('input', privateSongStatusBarInputHandle );
		}

		/*
			Binds handlers for volume slider classes. The volume sliders are HTML 5
			Range Elements. This event fires everytime a slider has changed.

			WARNING: If iOS, we don't do anything because iOS does not allow the
			volume to be adjusted through anything except the buttons on the side of
			the device.
		*/
		var volume_sliders = document.getElementsByClassName("amplitude-volume-slider");

		for( var i = 0; i < volume_sliders.length; i++ ){
			/*
				Checks for an iOS device and displays an error message if debugging
				is turned on.
			*/
			if( /iPhone|iPad|iPod/i.test(navigator.userAgent) ) {
				privateWriteDebugMessage( 'iOS does NOT allow volume to be set through javascript: https://developer.apple.com/library/safari/documentation/AudioVideo/Conceptual/Using_HTML5_Audio_Video/Device-SpecificConsiderations/Device-SpecificConsiderations.html#//apple_ref/doc/uid/TP40009523-CH5-SW4' );
			}else{
				volume_sliders[i].addEventListener('input', privateVolumeInputHandle );
			}
		}

		/*
			Binds handlers for next button classes.
		*/
		var next_classes = document.getElementsByClassName("amplitude-next");

		for( var i = 0; i < next_classes.length; i++ ){
			if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
				next_classes[i].addEventListener('touchstart', privateNextClickHandle );
			}else{
				next_classes[i].addEventListener('click', privateNextClickHandle );
			}
		}

		/*
			Binds handlers for previous button classes.
		*/
		var prev_classes = document.getElementsByClassName("amplitude-prev");

		for( var i = 0; i < prev_classes.length; i++ ){
			if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
				prev_classes[i].addEventListener('touchstart', privatePrevClickHandle );
			}else{
				prev_classes[i].addEventListener('click', privatePrevClickHandle );
			}
		}

		/*
			Binds handlers for shuffle button classes.
		*/
		var shuffle_classes = document.getElementsByClassName("amplitude-shuffle");

		for( var i = 0; i < shuffle_classes.length; i++ ){
			shuffle_classes[i].classList.remove('amplitude-shuffle-on');
			shuffle_classes[i].classList.add('amplitude-shuffle-off');

			if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
				shuffle_classes[i].addEventListener('touchstart', privateShuffleClickHandle );
			}else{
				shuffle_classes[i].addEventListener('click', privateShuffleClickHandle );
			}
		}

		/*
			Binds handlers for repeat button classes.
		*/
		var repeat_classes = document.getElementsByClassName("amplitude-repeat");

		for( var i = 0; i < repeat_classes.length; i++ ){
			repeat_classes[i].classList.remove('amplitude-repeat-on');
			repeat_classes[i].classList.add('amplitude-repeat-off');

			if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
				repeat_classes[i].addEventListener('touchstart', privateRepeatClickHandle );
			}else{
				repeat_classes[i].addEventListener('click', privateRepeatClickHandle );
			}
		}
	}

	/*--------------------------------------------------------------------------
		Sets up all of the song time visualizations.  This is the only time
		that AmplitudeJS will add an element to the page. AmplitudeJS will
		add an element inside of the song time visualization element that will
		expand proportionally to the amount of time elapsed on the active 
		audio, thus visualizing the song time.  This element is NOT user
		interactive.  To have the user scrub the time, they will have to 
		style and implement a song time slider with an HTML 5 Range Element.
	--------------------------------------------------------------------------*/
	function privateInitializeSongTimeVisualizations(){
		/*
			Sets up song time visualizations
		*/
		var song_time_visualizations = document.getElementsByClassName("amplitude-song-time-visualization");

		/*
			Iterates through all of the amplitude-song-time-visualization
			elements adding a new div with a class of
			'amplitude-song-time-visualization-status' that will expand
			inside of the 'amplitude-song-time-visualization' element.
		*/
		for( var i = 0; i < song_time_visualizations.length; i++ ){
			/*
				Creates new element
			*/
			var status = document.createElement('div');

			/*
				Adds class and attributes
			*/
			status.classList.add('amplitude-song-time-visualization-status');
			status.setAttribute( 'style', 'width: 0px' );

			/*
				Appends the element as a child element.
			*/
			song_time_visualizations[i].appendChild( status );
		}
	}

	/*
	|--------------------------------------------------------------------------
	| EVENT HANDLER FUNCTIONS
	|--------------------------------------------------------------------------
	| These functions handle the events that we bound to each element and
	| prepare for a function to be called. For example, if a click is on a song 
	| that doens't equal the index of the active song, it sets the active song 
	| to be what is needed and then play  is called. These kind of act 
	| like filters/middleware.
	*/

	/*--------------------------------------------------------------------------
		HANDLER FOR: 'amplitude-play-pause';

		Handles a click on a play/pause element.  This element toggles
		functionality based on the state of the song.

		TODO: Clean up this function and break out into helper functions
	--------------------------------------------------------------------------*/
	function privatePlayPauseClickHandle(){
		/*
			If there are multiple play/pause buttons on the screen,
			you can have them assigned to an individual song.

			With the amplitude-song-index attribute, you can assign 
			the play buttons a song to play out of the songs array.
		*/
		var playing_song_index = this.getAttribute('amplitude-song-index');

		/*
			If there is a new song to be played.  Since this handler 
			handles ALL events on a play-pause element, we have
			to check to see if there is a song that is being
			played already and the user clicked a different element
			of the same type that is supposed to play a new song.
		*/
		if( privateCheckNewSong( playing_song_index) ){
			privateChangeSong( playing_song_index );
			/*
				Sets all song status and play/pause button visuals
				to sync with the newly played song.
			*/	
			privateSetPlayPauseButtonsToPause();
			privateResetSongStatusSliders();


			privateChangePlayPauseState('playing');
			
			/*
				Starts the song visualization if there is one.
			*/
			privateStartVisualization();

			privatePlay();
		}else{
			if( config.active_song.paused ){
				
				privateChangePlayPauseState('playing');

				/*
					Starts the song visualization if there is one.
				*/
				privateStartVisualization();

				privatePlay( this.getAttribute('amplitude-song-index') );
			}else{
				privateChangePlayPauseState('paused');

				privatePause();
			}
		}
	}

	/*--------------------------------------------------------------------------
		HANDLER FOR: 'amplitude-play'

		Handles a click on a play element.

		TODO: Check to see if we should start the visualizations and run the 
		play or check to see if the song clicked is not new and paused before
		we run those otherwise it might cause an error like re-starting the
		song if play is clicked twice.
	--------------------------------------------------------------------------*/
	function privatePlayClickHandle(){
		/*
			Gets the attribute for song index so we can check if
			there is a need to change the song.  In some scenarios
			there might be multiple play classes on the page. In that
			case it is possible the user could click a different play
			class and change the song.
		*/
		var playing_song_index = this.getAttribute('amplitude-song-index');

		/*
			We set the new song if the user clicked a song with a different
			index. If it's the same as what's playing then we don't set anything. 
			If it's different we reset all song sliders.
		*/
		if( privateCheckNewSong( playing_song_index ) ){
			privateChangeSong( playing_song_index );

			privateResetSongStatusSliders();
		}

		/*
			Start the visualizations for the song.
		*/
		privateStartVisualization();
		
		/*
			Play the song through the core play function.
		*/
		privatePlay();
	}

	/*--------------------------------------------------------------------------
		HANDLER FOR: 'amplitude-pause'

		Handles a click on a pause element.

		TODO: Check to see that the pause element has an index and if that
		index matches the current song being played.  If it's different then
		we should disable it? If the user clicks on song-index=1 pause and 
		song-index=2 is being played, is it right to pause?
	--------------------------------------------------------------------------*/
	function privatePauseClickHandle(){
		/*
			Calls the core function for pause
		*/
		privatePause();
	}

	/*--------------------------------------------------------------------------
		HANDLER FOR: 'amplitude-stop'

		Handles a click on a stop element.
	--------------------------------------------------------------------------*/
	function privateStopClickHandle(){
		/*
			Calls the helper function to stop
			the visualization.
		*/
		privateStopVisualization();

		/*
			Calls the core function for stop
		*/
		privateStop();
	}

	/*--------------------------------------------------------------------------
		HANDLER FOR: 'amplitude-mute'

		Handles a click on a mute element.

		TODO: Add a class if muted to this element of amplitude-mute.  That way
		the designer can style the element if amplitude is muted like the typical
		volume with a line through it.

		TODO: Standardize the privateSetVolume parameter so it doesn't need
		to be converted by the privateSetVolume function.  Right now it converts
		up then down again which makes no sense.
	--------------------------------------------------------------------------*/
	function privateMuteClickHandle(){
		/*
			If the current volume in the config is 0, we set the volume to the 
			pre_mute level.  This means that the audio is already muted and
			needs to be restored to the pre_mute level.
			
			Otherwise, we set pre_mute volume to the current volume
			and set the config volume to 0, muting the audio.
		*/
		if( config.volume == 0 ){
			config.volume = config.pre_mute_volume;
		}else{
			config.pre_mute_volume = config.volume;
			config.volume = 0;
		}

		/*
			Calls the core function to set the volume to the computed value
			based on the user's intent.
		*/
		privateSetVolume( config.volume * 100 );

		/*
			Syncs the volume sliders so the visuals align up with the functionality.
			If the volume is at 0, then the sliders should represent that so the user
			has the right starting point.
		*/
		privateSyncVolumeSliders();
	}

	/*--------------------------------------------------------------------------
		HANDLER FOR: 'amplitude-volume-up'

		Handles a click on a volume up element.

		TODO: Standardize the privateSetVolume parameter so it doesn't need
		to be converted by the privateSetVolume function.  Right now it converts
		up then down again which makes no sense.
	--------------------------------------------------------------------------*/
	function privateVolumeUpClickHandle(){
		/*
			The volume range is from 0 to 1 for an audio element. We make this
			a base of 100 for ease of working with.

			If the new value is less than 100, we use the new calculated
			value which gets converted to the proper unit for the audio element.

			If the new value is greater than 100, we set the volume to 1 which
			is the max for the audio element.
		*/
		if( ( ( config.volume * 100 ) + config.volume_increment ) <= 100 ){
			config.volume = config.volume + ( config.volume_increment / 100 );
		}else{
			config.volume = 1;
		}

		/*
			Calls the core function to set the volume to the computed value
			based on the user's intent.
		*/
		privateSetVolume( config.volume * 100 );

		/*
			Syncs the volume sliders so the visuals align up with the functionality.
			If the volume is at 0, then the sliders should represent that so the user
			has the right starting point.
		*/
		privateSyncVolumeSliders();
	}

	/*--------------------------------------------------------------------------
		HANDLER FOR: 'amplitude-volume-down'

		Handles a click on a volume down element.

		TODO: Standardize the privateSetVolume parameter so it doesn't need
		to be converted by the privateSetVolume function.  Right now it converts
		up then down again which makes no sense.
	--------------------------------------------------------------------------*/
	function privateVolumeDownClickHandle(){
		/*
			The volume range is from 0 to 1 for an audio element. We make this
			a base of 100 for ease of working with.

			If the new value is less than 0, we use the new calculated
			value which gets converted to the proper unit for the audio element.

			If the new value is greater than 0, we set the volume to 0 which
			is the min for the audio element.
		*/
		if( ( ( config.volume * 100 ) - config.volume_decrement ) > 0 ){
			config.volume = config.volume - ( config.volume_decrement / 100 );
		}else{
			config.volume = 0;
		}
		/*
			Calls the core function to set the volume to the computed value
			based on the user's intent.
		*/
		privateSetVolume( config.volume * 100 );

		/*
			Syncs the volume sliders so the visuals align up with the functionality.
			If the volume is at 0, then the sliders should represent that so the user
			has the right starting point.
		*/
		privateSyncVolumeSliders();
	}

	/*--------------------------------------------------------------------------
		HANDLER FOR: 'amplitude-volume-slider'

		Handles an input change for a volume slider.

		TODO: Standardize the privateSetVolume parameter so it doesn't need
		to be converted by the privateSetVolume function.  Right now it converts
		up then down again which makes no sense.
	--------------------------------------------------------------------------*/
	function privateVolumeInputHandle(){
		/*
			The range slider has a range of 1 to 100 so we get the value and
			convert it to a range of 0 to 1 and set the volume.
		*/
		config.volume = ( this.value / 100 );

		/*
			Calls the core function to set the volume to the computed value
			based on the user's intent.
		*/
		privateSetVolume( this.value );

		/*
			Syncs the volume sliders so the visuals align up with the functionality.
			If the volume is at 0, then the sliders should represent that so the user
			has the right starting point.
		*/
		privateSyncVolumeSliders();
	}

	/*--------------------------------------------------------------------------
		HANDLER FOR: 'amplitude-song-slider'

		Handles an input change for a song slider.

		TODO: Make an attribute that allows for multiple main song sliders
		allowing the active playing song to be scrubbed from multiple locations
		on the page and is always in sync.
	--------------------------------------------------------------------------*/
	function privateSongStatusBarInputHandle(){
		/*
			We only adjust the time if the song is playing. It wouldn't make
			sense if we adjusted the time while it was paused.
		*/
		if( !config.active_song.paused ){
			/*
				We first check if the song slider is the only one on the page.
				If it is, we can safely assume that the slider is synced with
				the song's progression and adjust the song.
			*/
			if( this.getAttribute('amplitude-singular-song-slider') ){
				privateSetSongLocation( this.value );
			}

			/*
				If the song slider has a song index, we check to see if it matches
				the active song index. If it does, then adjust the song location.
				We do this so we can have multiple Amplitude players on the same page
				and have the slider relate to the song playing.
			*/
			if( this.getAttribute('amplitude-song-index') == config.active_index ){
				privateSetSongLocation( this.value );
			}
		}
	}

	/*--------------------------------------------------------------------------
		HANDLER FOR: 'amplitude-next'

		Handles a click for the next song.
	--------------------------------------------------------------------------*/
	function privateNextClickHandle(){
		/*
			Runs the before_next callback for the user to hook into.
		*/
		privateRunCallback('before_next');

		/*
			Stop active song since we are moving to the next song.
		*/
		privateStop();

		/*
			First we check if shuffle is on. If it is we use the shuffle array
			to select the next song. Otherwise, we go with the standard song 
			array.

			Loop around songs array if at the end. We need to check if the next
			song is within array. Otherwise we reset it to 0.

			Set new song
		*/
		if( config.shuffle_on ){
			if( parseInt( config.shuffle_active_index ) + 1 < config.shuffle_list.length ){
				/*
					Gets the new index in the shuffle array for the song we need.
				*/
				var newIndex = parseInt( config.shuffle_active_index ) + 1;

				/*
					Check new album
				*/
				privateCheckNewAlbum( config.suffle_list[ newIndex ].album );
				
				/*
					Sets the new song information in the config, so everything
					is ready to be changed.
				*/
				privateSetActiveSongInformation( newIndex, config.shuffle_on );

				/*
					Checks to see if there is a new album to be played. If there
					is we fire the after_album_change callback which allows the
					developer to handler album changes which could also mean multiple
					playlists.
				*/
				if( config.album_change ){
					privateRunCallback('after_album_change');
					config.album_change = false;
				}

				/*
					Sets the new shuffle active index to be used in the shuffled songs object.
				*/
				config.shuffle_active_index = newIndex;
			}else{
				/*
					Check new album
				*/
				privateCheckNewAlbum( config.suffle_list[0].album );

				/*
					Sets the new song information in the config, so everything
					is ready to be changed.
				*/
				privateSetActiveSongInformation( 0, config.shuffle_on );

				/*
					Checks to see if there is a new album to be played. If there
					is we fire the after_album_change callback which allows the
					developer to handler album changes which could also mean multiple
					playlists.
				*/
				if( config.album_change ){
					privateRunCallback('after_album_change');
					config.album_change = false;
				}

				/*
					Sets the new shuffle active index to be used in the shuffled songs object.
				*/
				config.shuffle_active_index = 0;
			}
		}else{
			if( parseInt(config.active_index) + 1 < config.songs.length ){

				var newIndex = parseInt( config.active_index ) + 1;
				/*
					Check new album
				*/
				privateCheckNewAlbum( config.songs[newIndex].album );

				/*
					Sets the new song information in the config, so everything
					is ready to be changed.
				*/
				privateSetActiveSongInformation( newIndex, config.shuffle_on );

				/*
					Checks to see if there is a new album to be played. If there
					is we fire the after_album_change callback which allows the
					developer to handler album changes which could also mean multiple
					playlists.
				*/
				if( config.album_change ){
					privateRunCallback('after_album_change');
					config.album_change = false;
				}

				/*
					Sets the new active index to be used with the songs object
				*/
				config.active_index = newIndex;
			}else{
				/*
					Check new album
				*/
				privateCheckNewAlbum( config.songs[0].album );
				
				/*
					Sets the new song information in the config, so everything
					is ready to be changed.
				*/
				privateSetActiveSongInformation( 0, config.shuffle_on );

				/*
					Checks to see if there is a new album to be played. If there
					is we fire the after_album_change callback which allows the
					developer to handler album changes which could also mean multiple
					playlists.
				*/
				if( config.album_change ){
					privateRunCallback('after_album_change');
					config.album_change = false;
				}
				/*
					Sets the new active index to be used with the songs object
				*/
				config.active_index = 0;
			}
		}
		
		/*
			Sets the main song control status to be in sync with the current state
			of the song.
		*/
		privateChangePlayPauseState( 'playing' );

		/*
			Runs the song change method to sync everything necessary.
		*/
		privateAfterSongChanges();

		/*
			Fires the after_next callback for users to hook into.
		*/
		privateRunCallback('after_next');
	}

	/*--------------------------------------------------------------------------
		HANDLER FOR: 'amplitude-prev'

		Handles a click for the previous song.
	--------------------------------------------------------------------------*/
	function privatePrevClickHandle(){
		/*
			Runs the before_prev callback for the user to hook into.
		*/
		privateRunCallback('before_prev');
		
		/*
			Stop active song since we are moving to the previous song.
		*/
		privateStop();

		/*
			First we check if shuffle is on. If it is we use the shuffle array to 
			select the previous song. Otherwise, we go with the sandard song array.

			Loop around songs array if at the beginning. We need to check if the next
			song is within array. Otherwise we reset it to the end of the songs.

			Set new song
		*/
		if( config.shuffle_on ){
			if( ( parseInt( config.shuffle_active_index ) - 1 ) >= 0 ){
				/*
					Gets the new index in the shuffle array for the song we need.
				*/
				var newIndex = parseInt( config.shuffle_active_index ) - 1;

				/*
					Check new album
				*/
				privateCheckNewAlbum( config.suffle_list[ newIndex ].album );

				/*
					Sets the new song information in the config, so everything
					is ready to be changed.
				*/
				privateSetActiveSongInformation( newIndex, config.shuffle_on );

				/*
					Checks to see if there is a new album to be played. If there
					is we fire the after_album_change callback which allows the
					developer to handler album changes which could also mean multiple
					playlists.
				*/
				if( config.album_change ){
					privateRunCallback('after_album_change');
					config.album_change = false;
				}

				/*
					Sets the new shuffle active index to be used in the shuffled songs object.
				*/
				config.shuffle_active_index = newIndex;
			}else{
				/*
					Gets the new index in the shuffle array for the song we need.
				*/
				var newIndex = parseInt( config.shuffle_list.length - 1 );

				/*
					Check new album
				*/
				privateCheckNewAlbum( config.suffle_list[ newIndex ].album );
				
				/*
					Sets the new song information in the config, so everything
					is ready to be changed.
				*/
				privateSetActiveSongInformation( newIndex, config.shuffle_on );

				/*
					Checks to see if there is a new album to be played. If there
					is we fire the after_album_change callback which allows the
					developer to handler album changes which could also mean multiple
					playlists.
				*/
				if( config.album_change ){
					privateRunCallback('after_album_change');
					config.album_change = false;
				}

				/*
					Sets the new shuffle active index to be used in the shuffled songs object.
				*/
				config.shuffle_active_index = newIndex;
			}
		}else{
			if( ( parseInt( config.active_index ) - 1 ) >= 0 ){

				var newIndex = parseInt( parseInt(config.active_index) - 1 );

				/*
					Check new album
				*/
				privateCheckNewAlbum( config.songs[ newIndex ].album );
				
				/*
					Sets the new song information in the config, so everything
					is ready to be changed.
				*/
				privateSetActiveSongInformation( newIndex, config.shuffle_on );

				/*
					Checks to see if there is a new album to be played. If there
					is we fire the after_album_change callback which allows the
					developer to handler album changes which could also mean multiple
					playlists.
				*/
				if( config.album_change ){
					privateRunCallback('after_album_change');
					config.album_change = false;
				}

				/*
					Sets the new active index to be used with the songs object
				*/
				config.active_index = newIndex;
			}else{

				var newIndex = config.songs.length - 1;
				/*
					Check new album
				*/
				privateCheckNewAlbum( config.songs[ newIndex ].album );
				
				/*
					Sets the new song information in the config, so everything
					is ready to be changed.
				*/
				privateSetActiveSongInformation( newIndex, config.shuffle_on );

				/*
					Checks to see if there is a new album to be played. If there
					is we fire the after_album_change callback which allows the
					developer to handler album changes which could also mean multiple
					playlists.
				*/
				if( config.album_change ){
					privateRunCallback('after_album_change');
					config.album_change = false;
				}

				/*
					Sets the new active index to be used with the songs object
				*/
				config.active_index = newIndex;
			}
		}
		
		/*
			Sets the main song control status to be in sync with the current state
			of the song.
		*/
		privateChangePlayPauseState( 'playing' );
		
		
		/*
			Runs the song change method to sync everything necessary.
		*/
		privateAfterSongChanges();

		/*
			Fires the after_prev callback for users to hook into.
		*/

		privateRunCallback('after_prev');
	}

	/*--------------------------------------------------------------------------
		HANDLER FOR: 'ended' on main audio element.

		When the song has ended, this method gets called.
		If it's a one song instance, then we don't do anything.
		If there are multiple songs, we check if shuffle is on
		or if we should use the original songs array. Then we set
		the next song and play it.
	--------------------------------------------------------------------------*/
	function privateHandleSongEnded(){
		/*
			Checks to see if repeat is on. If it's on, then we re-play the
			current song. Otherwise we begin the process of playing the
			next song in the list whether it's shuffle or regular list or
			single song.
		*/
		if( config.repeat ){
			/*
				Confirms stop of the active song
			*/
			privateStop();

			/*
				Without changing the index, just prepares the 
				next song to play.
			*/
			privateAfterSongChanges();
		}else{
			/*
				Checks to see if there is more than one song.
			*/
			if( config.songs.length > 1 ){
				/*
					Stops the active song
				*/
				privateStop();

				/*
					Checks to see if shuffle mode is turned on.
				*/
				if( config.shuffle_on ){
					/*
						Loop around shuffle array if at the end. We need to check if the next
						song is within array. Otherwise we reset it to 0.

						Set new song
					*/
					if( parseInt( config.shuffle_active_index) + 1 < config.shuffle_list.length ){
						var newIndex = parseInt( config.shuffle_active_index) + 1;

						/*
							Sets the active song information.
						*/
						privateSetActiveSongInformation( newIndex, config.shuffle_on );

						config.shuffle_active_index = parseInt(config.shuffle_active_index) + 1;
					}else{
						/*
							Sets the active song information to the beginning of the
							shuffle list
						*/
						privateSetActiveSongInformation( 0, config.shuffle_on );

						config.shuffle_active_index = 0;
					}
				}else{
					/*
						Loop around songs array if at the end. We need to check if the next
						song is within array. Otherwise we reset it to 0.

						Sets new song
					*/
					if( parseInt(config.active_index) + 1 < config.songs.length ){
						var newIndex = parseInt( config.active_index ) + 1;

						/*
							Sets the active song information
						*/
						privateSetActiveSongInformation( newIndex, config.shuffle_on );

						config.active_index = parseInt(config.active_index) + 1;
					}else{
						/*
							Sets the active song information to the beginning of the
							songs list
						*/
						privateSetActiveSongInformation( 0, config.shuffle_on );

						config.active_index = 0;
					}
				}

				/*
					Runs the song change function.
				*/
				privateAfterSongChanges();
			}else{
				/*
					If there is nothing coming up, pause the play
					button and sync the current times. This will set the play pause
					buttons to paused (stopped) state and the current times to
					0:00
				*/
				privateSetPlayPauseButtonsToPause();
				privateSyncCurrentTimes();			
			}
		}

		/*
			Fire song ended event handler.
		*/
		privateRunCallback('after_song_ended');
	}

	/*--------------------------------------------------------------------------
		HANDLER FOR: 'timeupdate' on main audio element.

		Everytime the active audio time updates, this function is called.
		It will update the visual display for everything related to the time
		and location compared to the duration of the song.

		TODO: Change all querySelector functions to querySelectorAll functions
	--------------------------------------------------------------------------*/
	function privateUpdateTime(){
		/*
			Gets the current time of the song in seconds and minutes.
		*/
		var current_seconds = ( Math.floor( config.active_song.currentTime % 60 ) < 10 ? '0' : '' ) + 
							    Math.floor( config.active_song.currentTime % 60 );

		var current_minutes = Math.floor( config.active_song.currentTime / 60 );

		/*
			Gets the current song's duration in seconds and minutes.
		*/

		var song_duration_seconds = ( Math.floor( config.active_song.duration % 60 ) < 10 ? '0' : '' ) + 
									  		Math.floor( config.active_song.duration % 60 );

		var song_duration_minutes = Math.floor( config.active_song.duration / 60 );
		
		/*
			Finds the current slider that represents the active song's time.
			If there is only one song slider, than that's the one we adjust
			to represent the song's current time, otherwise we find the one
			with the same song index as the active song.
		*/
		var current_slider = '';

		if( document.querySelector('[amplitude-singular-song-slider="true"]') ){
			current_slider = document.querySelector('[amplitude-singular-song-slider="true"]');
		}else{
			current_slider = document.querySelector('input[amplitude-song-index="'+config.active_index+'"]');
		}

		/*
			When we find the right visualization, we set the value to the percentage of 
			completion only if the song isn't live. Since it's 'infinite' if 
			it's a live source, it wouldn't make sense to update the time
			display.
		*/

		if( !config.active_metadata.live ){
			/*
				Finds the current song time visualization. If there is only one
				song time visualization, then that's the one we adjust to represent
				the current song time's visualization. Otherwise we find the one
				with the same song index as the active song.
			*/
			if( document.querySelectorAll('[amplitude-single-song-time-visualization="true"]').length > 0 ){
				current_song_time_visualization = document.querySelectorAll('[amplitude-single-song-time-visualization="true"]');

				for( var i = 0; i < current_song_time_visualization.length; i++ ){
					var current_song_time_visualization_status = current_song_time_visualization[i].querySelectorAll('.amplitude-song-time-visualization-status');
					var visualization_width = current_song_time_visualization[i].offsetWidth;

					current_song_time_visualization_status[0].setAttribute('style', 'width:' +( visualization_width * ( config.active_song.currentTime / config.active_song.duration ) ) + 'px'); 
				}
			}

			if( document.querySelectorAll('.amplitude-song-time-visualization[amplitude-song-index="'+config.active_index+'"]').length > 0 ){
				current_song_time_visualization = document.querySelectorAll('.amplitude-song-time-visualization[amplitude-song-index="'+config.active_index+'"]');
			
				for( var i = 0; i < current_song_time_visualization.length; i++ ){
					var current_song_time_visualization_status = current_song_time_visualization[i].querySelectorAll('.amplitude-song-time-visualization-status');
					var visualization_width = current_song_time_visualization[i].offsetWidth;

					current_song_time_visualization_status[0].setAttribute('style', 'width:' +( visualization_width * ( config.active_song.currentTime / config.active_song.duration ) ) + 'px'); 
				}
			}
		}


		/*
			Looks for an element with attributes that define which part of
			the time should be inserted into the html. If there is a singlular
			display, we update the singular. If there are multiple, we only do 
			the first one on the query, it wouldn't make sense to do all of them.
		*/
		if( document.querySelectorAll('[amplitude-single-current-minutes="true"]').length > 0 ){
			var mainCurrentMinuteSelectors = document.querySelectorAll('[amplitude-single-current-minutes="true"]');
			for( var i = 0; i < mainCurrentMinuteSelectors.length; i++ ){
				mainCurrentMinuteSelectors[i].innerHTML = current_minutes;
			}
		}

		if( document.querySelectorAll('.amplitude-current-minutes[amplitude-song-index="'+config.active_index+'"]').length > 0 ){
			var currentMinuteSelectors = document.querySelectorAll('.amplitude-current-minutes[amplitude-song-index="'+config.active_index+'"]');
			for( var i = 0; i < currentMinuteSelectors.length; i++ ){
				currentMinuteSelectors[i].innerHTML = current_minutes;
			}
		}

		if( document.querySelectorAll('[amplitude-single-current-seconds="true"]').length > 0 ){
			var mainCurrentSecondSelectors = document.querySelectorAll('[amplitude-single-current-seconds="true"]');
			for( var i = 0; i < mainCurrentSecondSelectors.length; i++ ){
				mainCurrentSecondSelectors[i].innerHTML = current_seconds;
			}
		}

		if( document.querySelectorAll('.amplitude-current-seconds[amplitude-song-index="'+config.active_index+'"]').length > 0 ){
			var currentSecondSelectors = document.querySelectorAll('.amplitude-current-seconds[amplitude-song-index="'+config.active_index+'"]');
			for( var i = 0; i < currentSecondSelectors.length; i++ ){
				currentSecondSelectors[i].innerHTML = current_seconds;
			}
		}
		
		if( !config.active_metadata.live ){
			if( document.querySelectorAll('[amplitude-single-duration-minutes="true"]').length > 0 ){
				var mainDurationMinuteSelectors = document.querySelectorAll('[amplitude-single-duration-minutes="true"]');
				for( var i = 0; i < mainDurationMinuteSelectors.length; i++ ){
					mainDurationMinuteSelectors[i].innerHTML = song_duration_minutes;
				}
			}

			if( document.querySelectorAll('.amplitude-duration-minutes[amplitude-song-index="'+config.active_index+'"]').length > 0 ){
				var durationMinuteSelectors = document.querySelectorAll('.amplitude-duration-minutes[amplitude-song-index="'+config.active_index+'"]');
				for( var i = 0; i < durationMinuteSelectors.length; i++ ){
					durationMinuteSelectors[i].innerHTML = song_duration_minutes;
				}
			}

			if( document.querySelectorAll('[amplitude-single-duration-seconds="true"]').length > 0 ){
				var mainDurationSecondSelectors = document.querySelectorAll('[amplitude-single-duration-seconds="true"]');
				for( var i = 0; i < mainDurationSecondSelectors.length; i++ ){
					mainDurationSecondSelectors[i].innerHTML = song_duration_seconds;
				}
			}

			if( document.querySelectorAll('.amplitude-duration-seconds[amplitude-song-index="'+config.active_index+'"]').length > 0 ){
				var durationSecondSelectors = document.querySelectorAll('.amplitude-duration-seconds[amplitude-song-index="'+config.active_index+'"]');
				for( var i = 0; i < durationSecondSelectors.length; i++ ){
					durationSecondSelectors[i].innerHTML = song_duration_seconds;
				}
			}
		}

		/*
			When we find the right slider, we set the value to the percentage of 
			completion only if the song isn't live. Since it's 'infinite' if 
			it's a live source, it wouldn't make sense to update the time
			display.
		*/
		if( !config.active_metadata.live && current_slider ){
			if( config.active_metadata.duration != undefined ){
				current_slider.value = ( ( config.active_song.currentTime / config.active_metadata.duration ) * 1000 ) * 100;
			}else{
				current_slider.value = ( config.active_song.currentTime / config.active_song.duration ) * 100;
			}	
		}
	}

	/*--------------------------------------------------------------------------
		HANDLER FOR: 'amplitude-shuffle'

		Handles a click for the shuffle element.
	--------------------------------------------------------------------------*/
	function privateShuffleClickHandle(){
		/*
			If the shuffle is already on, then swe turn it off
			and clear out the existing shuffle list. We also
			restore the active index back to 0.
		*/
		if( config.shuffle_on ){
			config.shuffle_on = false;
			config.shuffle_list = {};
			config.shuffle_active_index = 0;
		}else{
			/*
				If the shuffle is not on then we turn on shuffle
				and re-shuffle the songs.
			*/
			config.shuffle_on = true;
			privateShuffleSongs();
		}

		/*
			We then sync the visual shuffle button so it has the proper
			class representing the state of the shuffle functionality.
		*/
		privateSyncVisualShuffle();
	}

	/*--------------------------------------------------------------------------
		HANDLER FOR: 'amplitude-repeat'

		Handles a click for the repeat element.
	--------------------------------------------------------------------------*/
	function privateRepeatClickHandle(){
		/*
			If repeat is on, we turn it off. Othwerwise we turn repeat on.
		*/
		if( config.repeat ){
			config.repeat = false;
		}else{
			config.repeat = true;
		}

		privateSyncVisualRepeat();
	}

	/*
	|--------------------------------------------------------------------------
	| HELPER FUNCTIONS
	|--------------------------------------------------------------------------
	| For the sake of code clarity, these functions perform helper tasks 
	| assisting the logical functions with what they need such as setting
	| the proper song index after an event has occured.
	*/

	/*--------------------------------------------------------------------------
		Finishes the initalization of the config. Takes all of the user defined
		parameters and makes sure they override the defaults. The important
		config information is assigned in the publicInit() function.

		This function can be called from 2 different locations:
		1. Right away on init after the important settings are defined.
		2. After all of the Soundcloud URLs are resolved properly and
		soundcloud is configured.  We will need the proper URLs from Soundcloud
		to stream through Amplitude so we get those right away before we
		set the information and the active song

		@param user_config JSON representation of the user's settings when
		they init Amplitude.

		TODO: In all functions that call privateSetActiveSongInformation, have
		the active_index set there as well.

		TODO: Make sure that if the user sends a start_song that it's an integer
		and nothing else. Debug if NOT an integer.

		TODO: Make the user enter a volume between 0 and 100. It's a little
		easier sounding.

		TODO: Make sure the user enters a volume increment or decrement between
		1 and 100 to ensure something happens when they click the increment
		or decrement button.
	--------------------------------------------------------------------------*/
	function privateSetConfig( user_config ){
		/*
			If Amplitude is not in dynamic mode, we determine what the 
			start song should be. Dynamic mode doesn't have any songs on 
			config because the user will be sending them to Amplitude 
			dynamically.
		*/
		if( !config.dynamic_mode ){
			/*
				If the user provides a starting song index then we set
				the active song information to the song at that index.
			*/
			if( user_config.start_song != undefined ){
				privateSetActiveSongInformation( user_config.start_song, false );
				/*
					TODO: REMOVE Sets the user defined index.
				*/
				config.active_index = user_config.start_song;
			}else{
				privateSetActiveSongInformation( 0, false );

				/*
					TODO: REMOVE Sets the active index to the first song.
				*/
				config.active_index = 0;
			}
		}

		/*
			If live is not defined, assume it is false. The reason for
			this definition is if we play/pause we disconnect
			and re-connect to the stream so we don't fill up our cache
			with unused audio and we aren't playing outdated audio upon
			resume.
		*/
		if( config.active_metadata.live == undefined ){
			config.active_metadata.live = false;
		}

		/*
			If the user wants the song to be pre-loaded for instant
			playback, they set it to true. By default it's set to just
			load the metadata.
		*/
		config.active_song.preload = ( user_config.preload != undefined ? user_config.preload : "metadata" );
		
		/*
			Initializes the user defined callbacks. This should be a JSON
			object that contains a key->value store of the callback name
			and the name of the function the user needs to call.
		*/
		config.callbacks = ( user_config.callbacks != undefined ? user_config.callbacks : {} );

		/*
			The user can define a starting volume in a range of 0-1 with
			0 being muted and 1 being the loudest. After the config is set
			Amplitude sets the active song's volume to the volume defined
			by the user.
		*/
		config.volume = ( user_config.volume != undefined ? user_config.volume : .5 );
		config.active_song.volume = config.volume;

		/*
			The user can set the volume increment and decrement values between 1 and 100
			for when the volume up or down button is pressed.  The default is an increase
			or decrease of 5.
		*/
		config.volume_increment = ( user_config.volume_increment != undefined ? user_config.volume_increment : 5 );
		config.volume_decrement = ( user_config.volume_decrement != undefined ? user_config.volume_decrement : 5 );

		/*
			The user can turn off Amplitude handling the song elements (putting the meta data into
			certain fields when the song is playing or changed).  This would be if the user wanted
			to hard code this information which would probably be most popular in single song 
			instances.
		*/
		config.handle_song_elements = ( user_config.handle_song_elements != undefined ? user_config.handle_song_elements : true );

		/*
			If the user defines default album art, this image will display if the active
			song doesn't have album art defined.
		*/
		config.default_album_art = ( user_config.default_album_art != undefined ? user_config.default_album_art : '' );		
		
		/*
			The user can define a visualization backup to use if they are using
			visualizations (song visualizations not song time visualizations) and the
			browser doesn't support it.  This can be "nothing" meaning that the
			visualization element is removed otherwise it can be the album art
			of the song being played.
		*/
		config.visualization_backup = ( user_config.visualization_backup != undefined ? user_config.visualization_backup : 'nothing' );

		/*
			Sets initialized to true, so the user can't re-initialize
			and mess everything up.
		*/
		config.initialized = true;

		/*
			Since the user can define a start volume, we want our volume
			sliders to sync with the user defined start value.
		*/
		privateSyncVolumeSliders();

		/*
			Sets up the player if the browser doesn't have the audio context
		*/
		privateSyncNoAudioContext();

		/*
			Set all of the current time elements to 0:00 upon initialization
		*/
		privateSyncCurrentTimes();

		/*
			Syncs all of the song status sliders so the user can't set the
			HTML 5 range element to be something invalid on load like half
			way through the song by default.
		*/
		privateResetSongStatusSliders();

		privateCheckSongVisualization();

		/*
			Initialize the visual elements for the song if the user
			wants Amplitude to handle the changes. This is new 
			compared to previous versions where Amplitude automatically
			handled the song elements.
		*/
		if( config.handle_song_elements ){
			privateDisplaySongMetadata();
		}

		/*
			Removes any classes set by the user so any inconsistencies
			with start song and actual song are displayed correctly.
		*/
		privateSyncVisualPlayingContainers();

		/*
			Sets the active song container for the song that will be
			played. This adds a class to an element containing the
			visual representation of the active song .
		*/
		privateSetActiveContainer();

		/*
			Sets the temporary user conifg back to empty. We are done
			using it.
		*/
		temp_user_config = {};

		/*
			Run after init callback
		*/
		privateRunCallback("after_init");

		/*
			If the user turns on autoplay the song will play automatically.
		*/
		if( user_config.autoplay ){
			/*
				Gets the attribute for song index so we can check if
				there is a need to change the song.  In some scenarios
				there might be multiple play classes on the page. In that
				case it is possible the user could click a different play
				class and change the song.
			*/
			var playing_song_index = config.start_song;

			/*
				We set the new song if the user clicked a song with a different
				index. If it's the same as what's playing then we don't set anything. 
				If it's different we reset all song sliders.
			*/
			if( privateCheckNewSong( playing_song_index ) ){
				privateChangeSong( playing_song_index );

				privateResetSongStatusSliders();
			}

			/*
				Start the visualizations for the song.
			*/
			privateStartVisualization();
			
			/*
				If there are any play pause buttons we need
				to sync them to playing for auto play.
			*/
			privateChangePlayPauseState('playing');

			/*
				Play the song through the core play function.
			*/
			privatePlay();
		}
	}

	/*--------------------------------------------------------------------------
		Handles the back up functionality for visualizations. This happens
		if there is no AudioContext available or the song is live.

		The two settings are:
		1. "nothing" DEFAULT. It will remove the visualization element from the
		page.

		2. "album-art" Instead of the visualization, the element that would have
		container for the visualization will instead display the album
		art for the now playing song.

		TODO: Make sure this is only run if the user is using visualizations
		in their design.

		TODO: Change querySelector to querySelectorAll once again justifying
		the use of a global query all function for visual syncing.
	--------------------------------------------------------------------------*/
	function privateHandleVisualizationBackup(){
		switch( config.visualization_backup ){
			/*
				Removes the visualization element from the page.
			*/
			case "nothing":
				
				if( document.getElementById('amplitude-visualization') ){
					document.getElementById('amplitude-visualization').remove();
				}
			break;
			/*
				Sets up the old visualization element to contain the
				album art.
			*/
			case "album-art":
				/*
					Gets the old visualizationelement.
				*/
				var old_visualization = document.getElementById('amplitude-visualization');

				/*
					If there is a visualization element then we proceed.
				*/	
				if( old_visualization ){
					/*
						Gets the parent node to append the inner node to containing
						the album art.
					*/
					var parent_old_visualization = old_visualization.parentNode;

					var new_album_art = document.createElement('img');
					/*
						Sets the attribute to be the song infor for the cover
						art on the new element. Also apply the class 'amplitude-album-art'
					*/
					new_album_art.setAttribute('amplitude-song-info', 'cover');
					new_album_art.setAttribute('class', 'amplitude-album-art');

					/*
						TODO: is this the right place to do this? Shouldn't this happen
						AFTER we replace the visualization?
					*/
					if( document.querySelector('[amplitude-song-info="cover"]') ){

						if( config.active_metadata.cover_art_url != undefined){
							new_album_art.setAttribute( 'src', config.active_metadata.cover_art_url );
							document.querySelector('[amplitude-song-info="cover"]').setAttribute('src', config.active_metadata.cover_art_url);
						}else if( config.default_album_art != '' ){
							new_album_art.setAttribute( 'src', config.default_album_art );
						}else{
							new_album_art.setAttribute( 'src', '' );
						}
					}

					parent_old_visualization.replaceChild( new_album_art, old_visualization );
				}
			break;
		}
	}

	/*--------------------------------------------------------------------------
		Sets information relating to the active song.
	--------------------------------------------------------------------------*/
	function privateSetActiveSongInformation( index, shuffle ){
		if( shuffle ){
			/*
				If the current state is in shuffle mode, we set the
				active song to the song at the index in the shuffle list.
				Amplitude will also grab specific meta data from the song 
				in the shuffle list and set the attributes in the config 
				accordingly.
			*/
			config.active_song.src 	= config.shuffle_list[index].url;
			config.active_metadata 	= config.shuffle_list[index];
			config.active_album 	= config.shuffle_list[index].album;
		}else{
			/*
				If the current state is not in shuffle mode, we will
				grab the index from the songs array and set the active
				song to the source of that song. Amplitude will also 
				grab certain attributes from the song and use them
				in the config accordingly.
			*/
			config.active_song.src 	= config.songs[index].url;
			config.active_metadata 	= config.songs[index];
			config.active_album 	= config.songs[index].album;
		}
	}
	


	/*--------------------------------------------------------------------------
		Writes out debug message to the console if enabled.

		@param string message The string that gets printed to
		alert the user of a debugging error.
	--------------------------------------------------------------------------*/
	function privateWriteDebugMessage( message ){
		if( config.debug ){
			console.log( message );
		}
	}

	/*--------------------------------------------------------------------------
		Checks to see if a new song should be prepared for playing

		@param int new_song_index The integer index of the song
		that will be played. 
	--------------------------------------------------------------------------*/
	function privateCheckNewSong( new_song_index ){
		/*
			If the new song index is null, then nothing was defined, 
			so we assume it's in a single song scenario or a main control click
			and we don't need to worry about changing the song. If there was an
			index defined and the index and active_index are different then we 
			adjust the song.
		*/
		if( new_song_index != null && ( new_song_index != config.active_index ) ){
			return true;
		}else{
			return false;
		}
	}

	/*--------------------------------------------------------------------------
		Gets Amplitude ready for a song change. Syncs elements and runs
		necessary callbacks.

		@param int new_song_index The integer index of the song
		that will be played. 
	--------------------------------------------------------------------------*/
	function privateChangeSong( new_song_index ){
		/*
			Stops the currently playing song.
		*/
		privateStop();

		/*
			Checks to see if the new song is a different album.
		*/
		privateCheckNewAlbum( config.songs[new_song_index].album );

		/*
			Changes the active song index that is being played.
		*/
		config.active_index = new_song_index;

		/*
			Sets the active song information for the new song that will
			be played.
		*/
		privateSetActiveSongInformation( new_song_index, config.shuffle_on );


		if( config.album_change ){
			privateRunCallback('after_album_change');
			config.album_change = false;
		}

		

		/*
			If it's a new song and the user wants amplitude to handle
			the song elements, we need to set the information for
			the song.
		*/
		if( config.handle_song_elements ){
			privateDisplaySongMetadata();
		}

		/*
			We set the current times to 0:00 when song changes
			so all of the pages players will be synchronized.
		*/
		privateSyncCurrentTimes();

		privateCheckSongVisualization();

		privateSetActiveContainer();

	}

	/*--------------------------------------------------------------------------
		Checks to see if a new album is playing. This allows for
		multiple albums to be initialized on the same page.
		Through CSS you can show and hide albums and simulate
		multiple playlists. This method is called after there is a for
		sure change to see if the next song's album is different than
		the song that will soon to be previous' album.

		@param string new_album The string of the new album
		to see if it has changed.

		TODO: Research if we should return true/false instead of setting the
		config.

		TODO: Makes sure the song actually has an album before running.
	--------------------------------------------------------------------------*/
	function privateCheckNewAlbum( new_album ){
		/*
			If the new album isn't the same as the
			active album, we set the change to true
			and run the before_album_change callback.
		*/
		if( config.active_album != new_album ){
			config.album_change = true;
			privateRunCallback('before_album_change');
		}
	}

	/*--------------------------------------------------------------------------
		Called when a song changes. Synchronizes everything necessary on 
		the page to handle the song change.

		TODO: Check to see if using visualizations.
	--------------------------------------------------------------------------*/
	function privateAfterSongChanges(){
		/*
			After the new song is set, we see if we need to change
			the visualization. If it's different, we need to start 
			the new one.
		*/
		if( privateCheckSongVisualization() ){
			privateStartVisualization();
		}

		/*
			After the new song is set, Amplitude will update the
			visual elements containing information about the
			new song if the user wants Amplitude to.
		*/
		if( config.handle_song_elements ){
			privateDisplaySongMetadata();
		}

		/*
			Sync song status sliders. Sets them back to 0 because
			when the song is changing there won't be any songs currently
			playing.
		*/
		privateResetSongStatusSliders();

		/*
			We set the current times to 0:00 when song changes
			so all of the page's players will be synchronized.
		*/
		privateSyncCurrentTimes();

		/*
			Remove class from all containers
		*/
		privateSyncVisualPlayingContainers();

		/*
			Set new active song container by applying a class
			to the visual element containing the visual representation
			of the song that is actively playing.
		*/
		privateSetActiveContainer();

		/*
			Plays the new song.
		*/
		privatePlay();
	}

	/*--------------------------------------------------------------------------
		Shuffles songs.
		Based off of: http://www.codinghorror.com/blog/2007/12/the-danger-of-naivete.html
	--------------------------------------------------------------------------*/
	function privateShuffleSongs(){
		var shuffle_temp = new Array( config.songs.length );

		for( i = 0; i < config.songs.length; i++ ){
			shuffle_temp[i] = config.songs[i];
		}

		for( i = config.songs.length - 1; i > 0; i-- ){
			rand_num = Math.floor( ( Math.random() * config.songs.length ) + 1 );
			privateShuffleSwap( shuffle_temp, i, rand_num - 1 );
		}

		config.shuffle_list = shuffle_temp;
	}

	/*--------------------------------------------------------------------------
		Swaps and randomizes the song shuffle.

		@param JSON shuffle_list The list of songs that is going to
		be shuffled

		@param int original The original index of the song in the
		songs array.

		@param int random The randomized index that will be the
		new index of the song in the shuffle array.
	--------------------------------------------------------------------------*/
	function privateShuffleSwap( shuffle_list, original, random ){
		var temp = shuffle_list[ original ];
		shuffle_list[ original ] = shuffle_list[ random ];
		shuffle_list[ random ] = temp;
	}

	/*--------------------------------------------------------------------------
		Runs callback for specific function

		@param string The name of the call back. Also used as the index that
		the user can use in the callback array to define their callback method.
	--------------------------------------------------------------------------*/
	function privateRunCallback( callback_name ){
		if( config.callbacks[callback_name] ){
			var callback_function = window[ config.callbacks[ callback_name ] ];
			callback_function();
		}
	}

	/*--------------------------------------------------------------------------
		If there is a visualization specifically for a song, we set that
		as the active visualization. Only if one is specified, otherwise
		nothing changes and we continue using the active visualization.

		@returns BOOL Returns true if there is a specific visualization for
		the song.
	--------------------------------------------------------------------------*/
	function privateCheckSongVisualization(){
		var changed = false;

		/*
			Checks to see if the song actually has a specific visualization
			defined.
		*/
		if( config.active_metadata.visualization ){
			
			/*
				If the visualization is different and there is an active
				visualization. We must stop the active visualization
				before setting the new one.
			*/
			if( config.active_metadata.visualization != config.active_visualization && config.active_visualization != '' ){
				privateStopVisualization();
				
				/*
					Set the visualization changed to true
					so we return the status change.
				*/
				changed = true;

				/*
					Sets the active visualization to the new
					visualization that the song uses.
				*/
				config.active_visualization = config.active_metadata.visualization;
			}
		}
		/*
			Returns the status of the new song visualization.
			If there is a change it returns true and we will
			have to start the the visualization.
		*/
		return changed;
	}

	/*--------------------------------------------------------------------------
		Sets the visual elements containg the active song
		metadata
	--------------------------------------------------------------------------*/
	function privateDisplaySongMetadata(){
		/*
			Sets all elements that will contain the active song's name metadata
		*/
		if( document.querySelectorAll('[amplitude-song-info="name"]') ){
			var metaNames = document.querySelectorAll('[amplitude-song-info="name"]');
			for( i = 0; i < metaNames.length; i++ ){
				metaNames[i].innerHTML = config.active_metadata.name;
			}
		}

		/*
			Sets all elements that will contain the active song's artist metadata
		*/
		if( document.querySelectorAll('[amplitude-song-info="artist"]') ){
			var metaArtist = document.querySelectorAll('[amplitude-song-info="artist"]');
			for( i = 0; i < metaArtist.length; i++ ){
				metaArtist[i].innerHTML = config.active_metadata.artist;
			}
		}

		/*
			Sets all elements that will contain the active song's album metadata
		*/
		if( document.querySelectorAll('[amplitude-song-info="album"]') ){
			var metaAlbum = document.querySelectorAll('[amplitude-song-info="album"]');
			for( i = 0; i < metaAlbum.length; i++ ){
				metaAlbum[i].innerHTML = config.active_metadata.album;
			}
		}

		/*
			Sets all elements that will contain the active song's cover art metadata
		*/
		if( document.querySelectorAll('[amplitude-song-info="cover"]') ){
			var coverImages = document.querySelectorAll('[amplitude-song-info="cover"]');
			for( i = 0; i < coverImages.length; i++ ){
				/*
					Checks to see if first, the song has a defined cover art and uses
					that. If it does NOT have defined cover art, checks to see if there
					is a default.  Otherwise it just sets the src to '';
				*/
				if( config.active_metadata.cover_art_url != undefined){
					coverImages[i].setAttribute('src', config.active_metadata.cover_art_url);
				}else if( config.default_album_art != '' ){
					coverImages[i].setAttribute('src', config.default_album_art);
				}else{
					coverImages[i].setAttribute('src', '');
				}
			}
			
		}

		/*
			Station information for live streams
		*/

		/*
			Sets all of the elements that will contain the live stream's call sign metadata
		*/
		if( document.querySelectorAll('[amplitude-song-info="call-sign"]') ){
			var metaCallSign = document.querySelectorAll('[amplitude-song-info="call-sign"]');
			for( i = 0; i < metaCallSign.length; i++ ){
				metaCallSign[i].innerHTML = config.active_metadata.call_sign;
			}
		}

		/*
			Sets all of the elements that will contain the live stream's station name metadata
		*/
		if( document.querySelectorAll('[amplitude-song-info="station-name"]') ){
			var metaStationName = document.querySelectorAll('[amplitude-song-info="station-name"]');
			for( i = 0; i < metaStationName.length; i++ ){
				metaStationName[i].innerHTML = config.active_metadata.station_name;
			}
		}

		/*
			Sets all of the elements that will contain the live stream's location metadata
		*/
		if( document.querySelectorAll('[amplitude-song-info="location"]') ){
			var metaStationLocation = document.querySelectorAll('[amplitude-song-info="location"]');
			for( i = 0; i < metaStationLocation.length; i++ ){
				metaStationLocation[i].innerHTML = config.active_metadata.location; 
			}
		}

		/*
			Sets all of the elements that will contain the live stream's frequency metadata
		*/
		if( document.querySelectorAll('[amplitude-song-info="frequency"]') ){
			var metaStationFrequency = document.querySelectorAll('[amplitude-song-info="frequency"]');
			for( i = 0; i < metaStationFrequency.length; i++ ){
				metaStationFrequency[i].innerHTML = config.active_metadata.frequency;
			}	
		}

		/*
			Sets all of the elements that will contain the live stream's station art metadata
			TODO: Rename coverImages to stationArtImages
		*/
		if( document.querySelectorAll('[amplitude-song-info="station-art"]') ){
			var coverImages = document.querySelectorAll('[amplitude-song-info="station-art"]');
			/*
					Checks to see if first, the song has a defined station art and uses
					that. If it does NOT have defined station art, checks to see if there
					is a default.  Otherwise it just sets the src to '';
				*/
			for( i = 0; i < coverImages.length; i++ ){
				if( config.active_metadata.cover_art_url != undefined){
					coverImages[i].setAttribute('src', config.active_metadata.station_art_url);
				}else if( config.default_album_art != '' ){
					coverImages[i].setAttribute('src', config.default_album_art);
				}else{
					coverImages[i].setAttribute('src', '');
				}
			}
			
		}
	}

	/*--------------------------------------------------------------------------
		Applies the class 'amplitude-active-song-container' to the element 
		containing visual information regarding the active song.

		TODO: Make sure that when shuffling, this changes accordingly.
	--------------------------------------------------------------------------*/
	function privateSetActiveContainer(){
		var songContainers = document.getElementsByClassName('amplitude-song-container');

		/*
			Removes all of the active song containrs.
		*/
		for( i = 0; i < songContainers.length; i++ ){
			songContainers[i].classList.remove('amplitude-active-song-container');
		}

		/*
			Finds the active index and adds the active song container to the element
			that represents the song at the index. 
		*/
		if( document.querySelectorAll('.amplitude-song-container[amplitude-song-index="'+config.active_index+'"]') ){
			var songContainers = document.querySelectorAll('.amplitude-song-container[amplitude-song-index="'+config.active_index+'"]');

			for( i = 0; i < songContainers.length; i++ ){
				songContainers[i].classList.add('amplitude-active-song-container');
			}
		}
	}

	/*--------------------------------------------------------------------------
		Calls the start method on the active visualization.
	--------------------------------------------------------------------------*/
	function privateStartVisualization(){
		/*
			If the visualization is not started, and there are visualizations
			ready to be activated, we check to see if the user defined a 
			starting visualization.  If there is a starting visualization,
			then we start that one, otherwise we grab the first visualization
			defined and start that one.
		*/

		if( !config.visualization_started && Object.keys(config.visualizations).length > 0){
			if( config.active_visualization != '' ){
				config.visualizations[config.active_visualization].startVisualization(config.active_song);
				config.current_visualization = config.visualizations[config.active_visualization];
			}else{
				for(first_visualization in config.visualizations);

				config.visualizations[first_visualization].startVisualization(config.active_song);
				config.current_visualization = config.visualizations[first_visualization];
			}
			config.visualization_started = true;
		}
	}

	/*--------------------------------------------------------------------------
		Calls the stop method of the active visualization.
		If the visualization is started, we stop it.
	--------------------------------------------------------------------------*/
	function privateStopVisualization(){
		if( config.visualization_started && Object.keys(config.visualizations).length > 0){
			config.current_visualization.stopVisualization();
			config.visualization_started = false;
		}
	}

	/*
	|--------------------------------------------------------------------------
	| SOUNDCLOUD SPECIFIC HELPERS
	|--------------------------------------------------------------------------
	| These helpers wrap around the basic functions of the Soundcloud API
	| and get the information we need from SoundCloud to make the songs
	| streamable through Amplitude
	*/
	/*--------------------------------------------------------------------------
		Loads the soundcloud SDK for use with Amplitude so the user doesn't have
		to load it themselves.
		With help from: http://stackoverflow.com/questions/950087/include-a-javascript-file-in-another-javascript-file
	--------------------------------------------------------------------------*/
	function privateLoadSoundcloud(){
		var head = document.getElementsByTagName('head')[0];
		var script = document.createElement('script');

		script.type = 'text/javascript';
		/*
			URL to the remote soundcloud SDK
		*/
		script.src = 'https://connect.soundcloud.com/sdk.js';
		script.onreadystatechange = privateInitSoundcloud;
		script.onload = privateInitSoundcloud;

		head.appendChild( script );
	}

	/*--------------------------------------------------------------------------
		Initializes soundcloud with the key provided.
	--------------------------------------------------------------------------*/
	function privateInitSoundcloud(){
		/*
			Calls the SoundCloud initialize function
			from their API and sends it the client_id
			that the user passed in.
		*/
		SC.initialize({
			client_id: config.soundcloud_client
		});

		/*
			Gets the streamable URLs to run through Amplitue. This is
			VERY important since Amplitude can't stream the copy and pasted
			link from the SoundCloud page, but can resolve the streaming
			URLs from the link.
		*/
		privateGetSoundcloudStreamableURLs();
	}

	/*--------------------------------------------------------------------------
		Gets the streamable URL from the URL provided for
		all of the soundcloud links.  This will loop through
		and set all of the information for the soundcloud
		urls.
	--------------------------------------------------------------------------*/
	function privateGetSoundcloudStreamableURLs(){
		var soundcloud_regex = /^https?:\/\/(soundcloud.com|snd.sc)\/(.*)$/;
		
		for( var i = 0; i < config.songs.length; i++ ){
			/*
				If the URL matches soundcloud, we grab
				that url and get the streamable link
				if there is one.
			*/
			if( config.songs[i].url.match( soundcloud_regex ) ){
				config.soundcloud_song_count++;
				privateSoundcloudResolveStreamable(config.songs[i].url, i);
			}
		}
	}

	/*--------------------------------------------------------------------------
		Due to Soundcloud SDK being asynchronous, we need to scope the
		index of the song in another function. The privateGetSoundcloudStreamableURLs
		function does the actual iteration and scoping.
	--------------------------------------------------------------------------*/
	function privateSoundcloudResolveStreamable(url, index){
		SC.get('/resolve/?url='+url, function( sound ){
			/*
				If streamable we get the url and bind the client ID to the end
				so Amplitude can just stream the song normally. We then overwrite
				the url the user provided with the streamable URL.
			*/
			if( sound.streamable ){
				config.songs[index].url = sound.stream_url+'?client_id='+config.soundcloud_client;

				/*
					If the user want's to use soundcloud art, we overwrite the
					cover_art_url with the soundcloud artwork url.
				*/
				if( config.soundcloud_use_art ){
					config.songs[index].cover_art_url = sound.artwork_url;
				}

				/*
					Grab the extra metadata from soundcloud and bind it to the
					song.  The user can get this through the public function:
					getActiveSongMetadata
				*/
				config.songs[index].soundcloud_data = sound;
			}else{
				/*
					If not streamable, then we print a message to the user stating
					that the song with name X and artist X is not streamable. This
					gets printed ONLY if they have debug turned on.
				*/
				privateWriteDebugMessage( config.songs[index].name +' by '+config.songs[index].artist +' is not streamable by the Soundcloud API' );
			}
			/*
				Increments the song ready counter.
			*/
			config.soundcloud_songs_ready++;

			/*
				When all songs are accounted for, then amplitude is ready
				to rock and we set the rest of the config.
			*/
			if( config.soundcloud_songs_ready == config.soundcloud_song_count ){
				privateSetConfig( temp_user_config );
			}
		});
	}
	
	/*
	|--------------------------------------------------------------------------
	| VISUAL SYNCHRONIZATION METHODS
	|--------------------------------------------------------------------------
	| These methods keep the screen in sync.  For example if there are multiple
	| play/pause buttons and a song changes, we need to set all of the other
	| play/pause buttons to paused state.
	| 
	*/

	/*--------------------------------------------------------------------------
		Sets all of the play/pause buttons to the not playing state.  The 
		click handler will set the actual playing button to the playing state.
	--------------------------------------------------------------------------*/
	function privateSetPlayPauseButtonsToPause(){
		var play_pause_classes = document.getElementsByClassName("amplitude-play-pause");
		/*
			Iterates over all of the play pause classes removing
			the playing class and adding the paused class.
		*/
		for( var i = 0; i < play_pause_classes.length; i++ ){
			play_pause_classes[i].classList.add('amplitude-paused');
			play_pause_classes[i].classList.remove('amplitude-playing');
		}
	}

	/*--------------------------------------------------------------------------
		Changes the play pause state for all classes that need it. This
		iterates through all of the amplitude-play-pause classes for the 
		active index and all of the amplitude-main-play-puase attributes
		making sure everything stays in sync.
	--------------------------------------------------------------------------*/
	function privateChangePlayPauseState( state ){
		/*
			If the state is playing we set all of the classes accordingly.
		*/
		if( state == 'playing' ){
			if( document.querySelectorAll('.amplitude-play-pause[amplitude-song-index="'+config.active_index+'"]').length > 0 ){
				var currentPlayPauseControls = document.querySelectorAll('.amplitude-play-pause[amplitude-song-index="'+config.active_index+'"]');
				
				/*
					Iterates over all of the play pause controls adding the
					'amplitude-playing' classes and removing the 'amplitude-paused'
					classes.
				*/
				for( var i = 0; i < currentPlayPauseControls.length; i++ ){
					currentPlayPauseControls[i].classList.add('amplitude-playing');
					currentPlayPauseControls[i].classList.remove('amplitude-paused');
				}
			}

			/*
				Sets the main song control statuses to playing by removing the
				'amplitude-paused' class and adding the 'amplitude-playing' class.
			*/
			if( document.querySelectorAll('[amplitude-main-play-pause="true"]').length > 0 ){
				var mainControls = document.querySelectorAll('[amplitude-main-play-pause="true"]');

				for( var i = 0; i < mainControls.length; i++ ){
					mainControls[i].classList.add('amplitude-playing');
					mainControls[i].classList.remove('amplitude-paused');
				}
			}
		}

		/*
			If the state is paused, we set all of the classes accordingly.
		*/
		if( state == 'paused' ){
			if( document.querySelectorAll('.amplitude-play-pause[amplitude-song-index="'+config.active_index+'"]').length > 0 ){
				var currentPlayPauseControls = document.querySelectorAll('.amplitude-play-pause[amplitude-song-index="'+config.active_index+'"]');
				
				/*
					Iterates over all of the play pause controls adding the
					'amplitude-paused' classes and removing the 'amplitude-playing'
					classes.
				*/
				for( var i = 0; i < currentPlayPauseControls.length; i++ ){
					currentPlayPauseControls[i].classList.remove('amplitude-playing');
					currentPlayPauseControls[i].classList.add('amplitude-paused');
				}
			}

			/*
				Sets the main song control statuses to paused by removing the
				'amplitude-playing' class and adding the 'amplitude-paused' class.
			*/
			if( document.querySelectorAll('[amplitude-main-play-pause="true"]').length > 0 ){
				var mainControls = document.querySelectorAll('[amplitude-main-play-pause="true"]');

				for( var i = 0; i < mainControls.length; i++ ){
					mainControls[i].classList.add('amplitude-paused');
					mainControls[i].classList.remove('amplitude-playing');
				}
			}
		}
	}

	/*--------------------------------------------------------------------------
		Sets all of the song status sliders to 0, the time update event
		handler will adjust the one that represents the current song
		that is playing.
	--------------------------------------------------------------------------*/
	function privateResetSongStatusSliders(){
		var amplitude_song_sliders = document.getElementsByClassName("amplitude-song-slider");

		/*
			Iterate over all of the song sliders and sets them to
			0 essentially resetting them.
		*/
		for( var i = 0; i < amplitude_song_sliders.length; i++ ){
			amplitude_song_sliders[i].value = 0;
		}
	}

	/*--------------------------------------------------------------------------
		Sets all of the volume sliders to the active song's volume. 
	--------------------------------------------------------------------------*/
	function privateSyncVolumeSliders(){
		var amplitude_volume_sliders = document.getElementsByClassName("amplitude-volume-slider");

		/*
			Iterates over all of the volume sliders for the song, setting the value
			to the config value.
		*/
		for( var i = 0; i < amplitude_volume_sliders.length; i++ ){
			amplitude_volume_sliders[i].value = config.active_song.volume * 100;
		}
	}

	/*--------------------------------------------------------------------------
		Handles the situation if there is no audio context
		available
	--------------------------------------------------------------------------*/
	function privateSyncNoAudioContext(){
		if( !window.AudioContext ){
			privateHandleVisualizationBackup();
		}
	}

	/*--------------------------------------------------------------------------
		Syncs the current time displays so you can have multiple song time
		displays. When a song changes, we need the current minutes and seconds
		to go to 0:00
	--------------------------------------------------------------------------*/
	function privateSyncCurrentTimes(){
		var current_minute_times = document.getElementsByClassName("amplitude-current-minutes");

		for( var i = 0; i < current_minute_times.length; i++ ){
			current_minute_times[i].innerHTML = '0';
		}

		var current_second_times = document.getElementsByClassName("amplitude-current-seconds");

		for( var i = 0; i < current_second_times.length; i++ ){
			current_second_times[i].innerHTML = '00';
		}
	}

	/*--------------------------------------------------------------------------
		For visual playing containers, we find all containers that
		have a class of 'amplitude-song-container' and remove all of 
		the additional 'amplitude-active-song-container' classes.
		When a new song is activated, it will find the parameter
		'amplitude-song-index' and the class of 'amplitude-song-container'
		and give it the additional class 'amplitude-active-song-container'.
	--------------------------------------------------------------------------*/
	function privateSyncVisualPlayingContainers(){
		var visual_playing_containers = document.getElementsByClassName("amplitude-song-container");

		for( var i = 0; i < visual_playing_containers.length; i++ ){
			visual_playing_containers[i].classList.remove('amplitude-active-song-container');
		}
	}

	/*--------------------------------------------------------------------------
		Sets shuffle on for all of the shuffle buttons. Users
		can apply styles to the amplitude-shuffle-on and 
		amplitude-shuffle-off classes. They represent the state
		of the playlist.
	--------------------------------------------------------------------------*/
	function privateSyncVisualShuffle(){
		var shuffle_classes = document.getElementsByClassName("amplitude-shuffle");

		for( var i = 0; i < shuffle_classes.length; i++ ){
			if( config.shuffle_on ){
				shuffle_classes[i].classList.add('amplitude-shuffle-on');
				shuffle_classes[i].classList.remove('amplitude-shuffle-off');
			}else{
				shuffle_classes[i].classList.remove('amplitude-shuffle-on');
				shuffle_classes[i].classList.add('amplitude-shuffle-off');
			}
		}
	}

	/*--------------------------------------------------------------------------
		Sets repeat on for all of the repeat buttons. Users
		can apply styles to the amplitude-repeat-on and 
		amplitude-repeat-off classes. They represent the state
		of the player.
	--------------------------------------------------------------------------*/
	function privateSyncVisualRepeat(){
		var repeat_classes = document.getElementsByClassName("amplitude-repeat");

		for( var i = 0; i < repeat_classes.length; i++ ){
			if( config.repeat ){
				repeat_classes[i].classList.add('amplitude-repeat-on');
				repeat_classes[i].classList.remove('amplitude-repeat-off');
			}else{
				repeat_classes[i].classList.remove('amplitude-repeat-on');
				repeat_classes[i].classList.add('amplitude-repeat-off');
			}
		}
	}

	/*
	|--------------------------------------------------------------------------
	| CORE FUNCTIONAL METHODS
	|--------------------------------------------------------------------------
	| Interacts directly with native functions of the Audio element. Logic
	| leading up to these methods are handled by click handlers which call
	| helpers and visual synchronizers. These are the core functions of AmplitudeJS.
	| Every other function that leads to these prepare the information to be 
	| acted upon by these functions.
	*/

	/*--------------------------------------------------------------------------
		Plays the active song. If the current song is live, it reconnects
		the stream before playing.
	--------------------------------------------------------------------------*/
	function privatePlay(){
		privateRunCallback('before_play');

		if( config.active_metadata.live ){
			privateReconnectStream();
		}

		config.active_song.play();

		privateRunCallback('after_play');
	}

	/*--------------------------------------------------------------------------
		Pauses the active song. If it's live, it disconnects the stream.
	--------------------------------------------------------------------------*/
	function privatePause(){
		config.active_song.pause();
		
		if( config.active_metadata.live ){
			privateDisconnectStream();
		}
	}

	/*--------------------------------------------------------------------------
		Stops the active song by setting the current song time to 0.
		When the user resumes, it will be from the beginning.
		If it's a live stream it disconnects.
	*/
	function privateStop(){
		privateRunCallback('before_stop');

		config.active_song.currentTime = 0;
		config.active_song.pause();

		if( config.active_metadata.live ){
			privateDisconnectStream();
		}

		privateRunCallback('after_stop');
	}

	/*--------------------------------------------------------------------------
		Sets the song volume.

		@param int volume_level A number between 1 and 100 as a percentage of
		min to max for a volume level.
	--------------------------------------------------------------------------*/
	function privateSetVolume( volume_level ){
		config.active_song.volume = volume_level / 100;
	}

	/*--------------------------------------------------------------------------
		Sets the song percentage. If it's a live song, we ignore this because
		we can't skip ahead. This is an issue if you have a playlist with 
		a live source.

		@param int song_percentage A number between 1 and 100 as a percentage of
		song completion.
	--------------------------------------------------------------------------*/
	function privateSetSongLocation( song_percentage ){
		if( !config.active_metadata.live ){
			config.active_song.currentTime = ( config.active_song.duration ) * ( song_percentage / 100 );
		}
	}

	/*--------------------------------------------------------------------------
		Disconnects the live stream
	--------------------------------------------------------------------------*/
	function privateDisconnectStream(){
		config.active_song.src = '';
		config.active_song.load();
	}

	/*--------------------------------------------------------------------------
		Reconnects the live stream
	--------------------------------------------------------------------------*/
	function privateReconnectStream(){
		config.active_song.src = config.active_metadata.url;
		config.active_song.load();
	}

	/*
		Defines which methods and variables are public.
	*/
	return {
		init: publicInit,
		setDebug: publicSetDebug,
		getActiveSongMetadata: publicGetActiveSongMetadata,
		getSongByIndex: publicGetSongByIndex,
		playNow: publicPlayNow,
		play: publicPlay,
		pause: publicPause,
		registerVisualization: publicRegisterVisualization,
		visualizationCapable: publicVisualizationCapable,
		changeVisualization: publicChangeActiveVisualization,
		addSong: publicAddSong,
		analyser: publicGetAnalyser,
		active: config.active_song
	};
})();
