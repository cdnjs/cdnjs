/*
	Amplitude.js
	Version: 2.1
*/
var Amplitude = (function () {
	/*
	|--------------------------------------------------------------------------
	| Initializers
	|--------------------------------------------------------------------------
	| When the document is ready, Amplitude goes through and finds the elements
	| that should have event listeners and binds them.
	| 
	*/

	document.onreadystatechange = function () {
		if( document.readyState == "complete" ){
			privateInitializeEventHandlers();
		}
	}

	/*
	|--------------------------------------------------------------------------
	| Module Variables
	|--------------------------------------------------------------------------
	| These variables make Amplitude run. The config is the most important
	| containing active settings and parameters. The Web Audio API variables
	| for visualizations are below.
	| 
	*/
	var config = {
		active_song: new Audio(),
		active_metadata: {},
		active_album: '',
		active_index: 0,
		album_change: false,
		callbacks: {},
		songs: {},
		shuffle_list: {},
		shuffle_on: false,
		shuffle_active_index: 0,
		default_album_art: '',
		debug: false,
		initialized: false,
		handle_song_elements: true,
		volume: .5,
		pre_mute_volume: .5,
		volume_increment: 5,
		volume_decrement: 5,
		visualizations: new Array(),
		active_visualization: '',
		current_visualization: {},
		visualization_started: false,
		visualization_backup: '',
		song_ended_callback: '',
		soundcloud_client: '',
		soundcloud_use_art: false,
		soundcloud_song_count: 0,
		soundcloud_songs_ready: 0
	};



	var temp_user_config = {};
	/*
		These are web audio API variables.  They connect the web audio
		api to the audio source allowing for visualization extensions.
		These variables are public and to be used for extensions.
		Initializes the variables if they are available.
	*/
	var context, analyser, source;
	
	if( window.AudioContext ){
		context = new AudioContext();
		
		analyser = context.createAnalyser();
		source = context.createMediaElementSource( config.active_song );
		
		source.connect( analyser );
		analyser.connect( context.destination );
	}

	/*
	|--------------------------------------------------------------------------
	| Public Methods
	|--------------------------------------------------------------------------
	| These methods are available to the developer.  They allow the developer
	| to change certain attributes if needed and configure the library.
	| 
	| @param user_config A JSON object of defined values that help configure
	| and initialize AmplitudeJS.
	*/
	function publicInit( user_config ){
		if( !config.initialized ){
			/*
				Initializes debugging right away so we can use it for the rest
				of the configuration.
			*/
			config.debug = ( user_config.debug != undefined ? user_config.debug : false );

			var ready = false;
			/*
				Set config songs. 
			*/
			if( user_config.songs ){
				if( user_config.songs.length != 0 ){
					config.songs = user_config.songs;
					ready = true;
				}else{
					privateWriteDebugMessage( 'Please add some songs, to your songs object!' );
				}
			}else{
				privateWriteDebugMessage( 'Please provide a songs object for AmplitudeJS to run!' );
			}


			if( ready ){
				/*
					Loads the soundcloud SDK
				*/
				config.soundcloud_client = ( user_config.soundcloud_client != undefined ? user_config.soundcloud_client : '' );
				config.soundcloud_use_art = ( user_config.soundcloud_use_art != undefined ? user_config.soundcloud_use_art : '' );
				
				if( config.soundcloud_client != '' ){
					temp_user_config = user_config;
					privateLoadSoundcloud();
				}else{
					privateSetConfig( user_config );
				}

				
			}
		}
	}

	/*
		Can dynamically change the state of debugging.

		@param BOOL state Turns debugging on and off.
	*/
	function publicSetDebug( state ){
		config.debug = state;
	}

	/*
		Returns the active song meta data for the user to do what is 
		needed.
	*/
	function publicGetActiveSongMetadata(){
		return config.active_metadata;
	}

	/*
		Registers a visualization and sets that visualization's 
		preferences

		@param visualzation A visualization object that gets registered
		with AmplitudeJS

		@param preferences A JSON object of preferences relating to the
		visualization
	*/
	function publicRegisterVisualization( visualization, preferences ){
		config.visualizations[visualization.getID] = visualization;
		if( preferences != undefined ){
			visualization.setPreferences( preferences );
		}
	}

	/*
		Changes the active visualization. Could be called from a 
		user defined dropdown or something.

		@param string visualization The name of the visualization
		that should be used.
	*/
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

	/*
		Checks to see if the current browser is capable of running
		visualizations.
	*/
	function publicVisualizationCapable(){
		if (!window.AudioContext) {
			return false;
		}else{
			return true;
		}
	}

	/*
		Returns a song in the songs array at that index

		@param int index The integer for the index of the
		song in the songs array.
	*/
	function publicGetSongByIndex( index ){
		return config.songs[index];
	}

	/*
		Adds a song to the end of the config array.

		@param song JSON representation of a song.

		@returns int New index of the song.
	
	*/
	function publicAddSong( song ){
		config.songs.push( song );
		return config.songs.length - 1;
	}

	/*
		Plays a song right away.
	*/
	function publicPlayNow( song ){
		config.active_song.src = song.url;
		config.active_metadata = song;
		config.active_album = song.album;


		/*
			Sets the main song control status visual
		*/
		if( document.querySelector('[amplitude-main-play-pause="true"]') ){
			main_control = document.querySelector('[amplitude-main-play-pause="true"]');
			main_control.classList.add('amplitude-playing');
			main_control.classList.remove('amplitude-paused');
		}

		privateSongChange();

	}

	/*
	|--------------------------------------------------------------------------
	| Functional Methods
	|--------------------------------------------------------------------------
	| Interacts directly with native functions of the Audio element. Logic
	| leading up to these methods are handled by click handlers. These
	| are the core functions of AmplitudeJS.
	| 
	*/

	/*
		Plays the active song. If the current song is live, it reconnects
		the stream before playing.
	*/
	function privatePlay(){
		privateRunCallback('before_play');

		if( config.active_metadata.live ){
			privateReconnectStream();
		}

		config.active_song.play();

		privateRunCallback('after_play');
	}

	/*
		Pauses the active song. If it's live, it disconnects the stream.
	*/
	function privatePause(){
		config.active_song.pause();

		if( config.active_metadata.live ){
			privateDisconnectStream();
		}
	}

	/*
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

	/*	
		Sets the song volume.

		@param int volume_level A number between 1 and 100 as a percentage of
		min to max for a volume level.
	*/
	function privateSetVolume( volume_level ){
		config.active_song.volume = volume_level / 100;
	}

	/*
		Sets the song percentage. If it's a live song, we ignore this because
		we can't skip ahead. This is an issue if you have a playlist with 
		a live source.

		@param int song_percentage A number between 1 and 100 as a percentage of
		song completion.
	*/
	function privateSetSongLocation( song_percentage ){
		if( !config.active_metadata.live ){
			config.active_song.currentTime = ( config.active_song.duration ) * ( song_percentage / 100 );
		}
	}

	/*
		Disconnects the live stream
	*/
	function privateDisconnectStream(){
		config.active_song.src = '';
		config.active_song.load();
	}

	/*
		Reconnects the live stream
	*/
	function privateReconnectStream(){
		config.active_song.src = config.active_metadata.url;
		config.active_song.load();
	}

	/*
	|--------------------------------------------------------------------------
	| Event Handlers
	|--------------------------------------------------------------------------
	| Event handlers handle the logic to prepare for a function to be called.
	| For example, if a click is on a song that doens't equal the index of the
	| active song, it sets the active song to be what is needed and then play 
	| is called. These kind of act like filters/middleware.
	| 
	*/
	function privatePlayPauseClickHandle(){
		/*
			If there are multiple play/pause buttons on the screen,
			you can have them assigned to an individual song.

			With the amplitude-song-index attribute, you can assign 
			the play buttons a song to play out of the songs array.
		*/
		var playing_song_index = this.getAttribute('amplitude-song-index');
		/*
			If there is a new song to be played, we auto play it. Otherwise we play and
			pause the active song.
		*/
		if( privateCheckNewSong( playing_song_index) ){
			/*
				Sets all song status and play/pause button visuals
				to sync with the newly played song.
			*/	
			privateSyncPlayPauseButtons();
			privateSyncSongStatusSliders();

			this.classList.add('amplitude-playing');
			this.classList.remove('amplitude-paused');

			/*
				Sets the main song control status visual
			*/
			if( document.querySelector('[amplitude-main-play-pause="true"]') ){
				main_control = document.querySelector('[amplitude-main-play-pause="true"]');
				main_control.classList.add('amplitude-playing');
				main_control.classList.remove('amplitude-paused');
			}

			/*
				Starts the song visualization if there is one.
			*/
			privateStartVisualization();

			privatePlay();
		}else{
			if( config.active_song.paused ){
				this.classList.add('amplitude-playing');
				this.classList.remove('amplitude-paused');

				/*
					Sets the main song control status visual
				*/
				if( document.querySelector('[amplitude-main-play-pause="true"]') ){
					main_control = document.querySelector('[amplitude-main-play-pause="true"]');
					main_control.classList.add('amplitude-playing');
					main_control.classList.remove('amplitude-paused');
				}
				/*
					Starts the song visualization if there is one.
				*/
				privateStartVisualization();

				privatePlay( this.getAttribute('amplitude-song-index') );
			}else{
				this.classList.add('amplitude-paused');
				this.classList.remove('amplitude-playing');

				/*
					Sets the main song control status visual
				*/
				if( document.querySelector('[amplitude-main-play-pause="true"]') ){
					main_control = document.querySelector('[amplitude-main-play-pause="true"]');
					main_control.classList.add('amplitude-paused');
					main_control.classList.remove('amplitude-playing');
				}

				privatePause();
			}
		}


	}

	function privatePlayClickHandle(){
		var playing_song_index = this.getAttribute('amplitude-song-index');

		/*
			We set the new song if there is an attribute stating that
			we should play a new index. If it's the same as what's playing
			then we don't set anything. If it's different we reset all song
			sliders.
		*/
		if( privateCheckNewSong( playing_song_index ) ){
			privateSyncSongStatusSliders();
		}
		privateStartVisualization();
		
		privatePlay();
	}

	function privatePauseClickHandle(){
		privatePause();
	}

	function privateStopClickHandle(){
		privateStopVisualization();

		privateStop();
	}

	function privateMuteClickHandle(){
		/*
			If 0 existing, we set the volume to pre_mute level
			otherwise, we set pre_mute volume to the current volume
			and set the current volume to 0.
		*/
		if( config.volume == 0 ){
			config.volume = config.pre_mute_volume;
		}else{
			config.pre_mute_volume = config.volume;
			config.volume = 0;
		}

		//If called on iOS and Debug, then let user know why not working.
		privateSetVolume( config.volume * 100 );

		privateSyncVolumeSliders();
	}

	function privateVolumeUpClickHandle(){
		/*
			If the new value is less than 100, we use the new calculated
			value, otherwise we set it to the highest range of 1.
		*/
		if( ( ( config.volume * 100 ) + config.volume_increment ) <= 100 ){
			config.volume = config.volume + ( config.volume_increment / 100 );
		}else{
			config.volume = 1;
		}

		privateSetVolume( config.volume * 100 );

		privateSyncVolumeSliders();
	}

	function privateVolumeDownClickHandle(){
		/*
			If the new value is greater than 0, we use the new calculated
			value, otherwise we set it to the lowest of 0.
		*/
		if( ( ( config.volume * 100 ) - config.volume_decrement ) > 0 ){
			config.volume = config.volume - ( config.volume_decrement / 100 );
		}else{
			config.volume = 0;
		}

		privateSetVolume( config.volume * 100 );

		privateSyncVolumeSliders();
	}

	function privateVolumeInputHandle(){
		/*
			Sets volume both visually and in the config depending on the
			input from the volume slider.
		*/
		config.volume = ( this.value / 100 );

		privateSetVolume( this.value );

		privateSyncVolumeSliders();
	}

	function privateSongStatusBarInputHandle(){
		/*
			We only adjust the time if the song is playing.
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

	function privateNextClickHandle(){
		privateRunCallback('before_next');
		/*
			Stop active song
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
			if( parseInt(config.shuffle_active_index) + 1 < config.shuffle_list.length ){
				/*
					Check new album
				*/
				privateCheckNewAlbum( config.suffle_list[parseInt(config.shuffle_active_index) + 1].album );
				config.active_song.src = config.shuffle_list[parseInt(config.shuffle_active_index) + 1].url;
				config.active_metadata = config.shuffle_list[parseInt(config.shuffle_active_index) + 1];
				config.active_album = config.shuffle_list[parseInt(config.shuffle_active_index) + 1].album;

				if( config.album_change ){
					privateRunCallback('after_album_change');
					config.album_change = false;
				}

				config.shuffle_active_index = parseInt(config.shuffle_active_index) + 1;
			}else{
				/*
					Check new album
				*/
				privateCheckNewAlbum( config.suffle_list[0].album );
				config.active_song.src = config.shuffle_list[0].url;
				config.active_metadata = config.shuffle_list[0];
				config.active_album = config.shuffle_list[0].album;

				if( config.album_change ){
					privateRunCallback('after_album_change');
					config.album_change = false;
				}

				config.shuffle_active_index = 0;
			}
		}else{
			if( parseInt(config.active_index) + 1 < config.songs.length ){
				/*
					Check new album
				*/
				privateCheckNewAlbum( config.songs[parseInt(config.active_index) + 1].album );
				config.active_song.src = config.songs[parseInt(config.active_index) + 1].url;
				config.active_metadata = config.songs[parseInt(config.active_index) + 1];
				config.active_album = config.songs[parseInt(config.active_index) + 1].album;

				if( config.album_change ){
					privateRunCallback('after_album_change');
					config.album_change = false;
				}

				config.active_index = parseInt(config.active_index) + 1;
			}else{
				/*
					Check new album
				*/
				privateCheckNewAlbum( config.songs[0].album );
				config.active_song.src = config.songs[0].url;
				config.active_metadata = config.songs[0];
				config.active_album = config.songs[0].album;

				if( config.album_change ){
					privateRunCallback('after_album_change');
					config.album_change = false;
				}

				config.active_index = 0;
			}
		}
		
		/*
			Sets the main song control status visual
		*/
		if( document.querySelector('[amplitude-main-play-pause="true"]') ){
			main_control = document.querySelector('[amplitude-main-play-pause="true"]');
			main_control.classList.add('amplitude-playing');
			main_control.classList.remove('amplitude-paused');
		}

		privateSongChange();

		privateRunCallback('after_next');
	}

	function privatePrevClickHandle(){
		privateRunCallback('before_prev');
		/*
			Stop active song
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
			if( ( parseInt(config.shuffle_active_index) - 1 ) >= 0 ){
				/*
					Check new album
				*/
				privateCheckNewAlbum( config.suffle_list[parseInt(config.shuffle_active_index) - 1].album );
				config.active_song.src = config.shuffle_list[parseInt(config.shuffle_active_index) - 1].url;
				config.active_metadata = config.shuffle_list[parseInt(config.shuffle_active_index) - 1];
				config.active_album = config.shuffle_list[parseInt(config.shuffle_active_index) - 1].album;

				if( config.album_change ){
					privateRunCallback('after_album_change');
					config.album_change = false;
				}

				config.shuffle_active_index = parseInt(config.shuffle_active_index) - 1;
			}else{
				/*
					Check new album
				*/
				privateCheckNewAlbum( config.suffle_list[parseInt(config.shuffle_list.length - 1)].album );
				config.active_song.src = config.shuffle_list[parseInt(config.shuffle_list.length - 1)].url;
				config.active_metadata = config.shuffle_list[parseInt(config.shuffle_list.length - 1)];
				config.active_album = config.shuffle_list[parseInt(config.shuffle_list.length - 1)].album;

				if( config.album_change ){
					privateRunCallback('after_album_change');
					config.album_change = false;
				}

				config.shuffle_active_index = parseInt(config.shuffle_list.length) - 1;
			}
		}else{
			if( ( parseInt(config.active_index) - 1 ) >= 0 ){
				/*
					Check new album
				*/
				privateCheckNewAlbum( config.songs[parseInt(config.active_index) - 1].album );
				config.active_song.src = config.songs[parseInt(config.active_index) - 1].url;
				config.active_metadata = config.songs[parseInt(config.active_index) - 1];
				config.active_album = config.songs[parseInt(config.active_index) - 1].album;

				if( config.album_change ){
					privateRunCallback('after_album_change');
					config.album_change = false;
				}

				config.active_index = parseInt(config.active_index) - 1;
			}else{
				/*
					Check new album
				*/
				privateCheckNewAlbum( config.songs[config.songs.length - 1].album );
				config.active_song.src = config.songs[config.songs.length - 1].url;
				config.active_metadata = config.songs[config.songs.length - 1];
				config.active_album = config.songs[config.songs.length - 1].album;

				if( config.album_change ){
					privateRunCallback('after_album_change');
					config.album_change = false;
				}

				config.active_index = parseInt(config.songs.length) - 1;
			}
		}
		
		/*
			Sets the main song control status visual
		*/
		if( document.querySelector('[amplitude-main-play-pause="true"]') ){
			main_control = document.querySelector('[amplitude-main-play-pause="true"]');
			main_control.classList.add('amplitude-playing');
			main_control.classList.remove('amplitude-paused');
		}
		
		privateSongChange();

		privateRunCallback('after_prev');
	}

	function privateShuffleClickHandle(){
		if( config.shuffle_on ){
			config.shuffle_on = false;
			config.shuffle_list = {};
			config.shuffle_active_index = 0;
		}else{
			config.shuffle_on = true;
			privateShuffleSongs();
		}

		privateSyncVisualShuffle();
	}

	/*
	|--------------------------------------------------------------------------
	| Visual Synchronization Methods
	|--------------------------------------------------------------------------
	| These methods keep the screen in sync.  For example if there are multiple
	| play/pause buttons and a song changes, we need to set all of the other
	| play/pause buttons to paused state.
	| 
	*/

	/*
		Sets all of the play/pause buttons to the not playing state.  The 
		click handler will set the actual playing button to the playing state.
	*/
	function privateSyncPlayPauseButtons(){
		var play_pause_classes = document.getElementsByClassName("amplitude-play-pause");


		for( var i = 0; i < play_pause_classes.length; i++ ){
			play_pause_classes[i].classList.add('amplitude-paused');
			play_pause_classes[i].classList.remove('amplitude-playing');
		}
	}

	/*
		Sets all of the song status sliders to 0, the time update event
		handler will adjust the one that represents the current song
		that is playing.
	*/
	function privateSyncSongStatusSliders(){
		var amplitude_song_sliders = document.getElementsByClassName("amplitude-song-slider");

		for( var i = 0; i < amplitude_song_sliders.length; i++ ){
			amplitude_song_sliders[i].value = 0;
		}
	}

	/*
		Sets all of the volume sliders to the active song's volume. In theory
		there should only be one volume slider per page.
	*/
	function privateSyncVolumeSliders(){
		var amplitude_volume_sliders = document.getElementsByClassName("amplitude-volume-slider");

		for( var i = 0; i < amplitude_volume_sliders.length; i++ ){
			amplitude_volume_sliders[i].value = config.active_song.volume * 100;
		}
	}

	/*
		Handles the situation if there is no audio context
		available
	*/
	function privateSyncNoAudioContext(){
		if( !window.AudioContext ){
			privateHandleVisualizationBackup();
		}
	}

	function privateHandleVisualizationBackup(){
		switch( config.visualization_backup ){
			case "nothing":
				if( document.getElementById('amplitude-visualization') ){
					document.getElementById('amplitude-visualization').remove();
				}
			break;
			case "album-art":
				var old_visualization = document.getElementById('amplitude-visualization');
				if( old_visualization ){
					var parent_old_visualization = old_visualization.parentNode;

					var new_album_art = document.createElement('img');
					new_album_art.setAttribute('amplitude-song-info', 'cover');
					new_album_art.setAttribute('class', 'amplitude-album-art');

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
	/*
		Syncs the current time displays so you can have multiple song time
		displays. When a song changes, we need the current minutes and seconds
		to go to 0:00
	*/
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

	/*
		For visual playing containers, we find all containers that
		have a class of 'amplitude-song-container' and remove all of 
		the additional 'amplitude-active-song-container' classes.
		When a new song is activated, it will find the parameter
		'amplitude-song-index' and the class of 'amplitude-song-container'
		and give it the additional class 'amplitude-active-song-container'.
	*/
	function privateSyncVisualPlayingContainers(){
		var visual_playing_containers = document.getElementsByClassName("amplitude-song-container");

		for( var i = 0; i < visual_playing_containers.length; i++ ){
			visual_playing_containers[i].classList.remove('amplitude-active-song-container');
		}
	}

	/*
		Sets shuffle on for all of the shuffle buttons. Users
		can apply styles to the amplitude-shuffle-on and 
		amplitude-shuffle-off classes. They represent the state
		of the playlist.
	*/
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

	/*
	|--------------------------------------------------------------------------
	| Helper Functions
	|--------------------------------------------------------------------------
	| For the sake of code clarity, these functions perform helper tasks take 
	| care of logic and other tasks.
	| 
	*/
	/*
		Finishes the initalization of the config. If there is soundcloud usage,
		we have to go through and set up all of the URLs appropriately for 
		soundcloud usage. 
	*/
	function privateSetConfig( user_config ){
		/*
			Checks if the user defined a start song and sets that as the active
			song, otherwise sets the first song in the list.
		*/
		if( user_config.start_song != undefined ){
			config.active_song.src = config.songs[user_config.start_song].url;
			config.active_metadata = config.songs[user_config.start_song];
			config.active_album = config.songs[user_config.start_song].album;
			config.active_index = user_config.start_song;
		}else{
			config.active_song.src = config.songs[0].url;
			config.active_metadata = config.songs[0];
			config.active_album = config.songs[0].album;
			config.active_index = 0;
		}

		/*
			If live is not defined, assume it is false. The reason for
			this definition is here, is if we play/pause we disconnect
			and re-connect to the stream so we don't fill up our cache
			with unused audio and we aren't playing outdated audio upon
			resume.
		*/
		if( config.active_metadata.live == undefined ){
			config.active_metadata.live = false;
		}




		/*
			If the user wants the song to be pre-loaded for instant
			playback, they set it to true. By default it's set to false.
		*/
		config.active_song.preload = ( user_config.preload != undefined ? user_config.preload : "metadata" );
		
		/*
			Initializes user-defined presets.
		*/
		config.callbacks = ( user_config.callbacks != undefined ? user_config.callbacks : {} );
		config.volume = ( user_config.volume != undefined ? user_config.volume : .5 );
		config.visualization_backup = ( user_config.visualization_backup != undefined ? user_config.visualization_backup : 'nothing' );
		config.pre_mute_volume = ( user_config.volume != undefined ? user_config.volume : .5 );
		config.volume_increment = ( user_config.volume_increment != undefined ? user_config.volume_increment : 5 );
		config.volume_decrement = ( user_config.volume_decrement != undefined ? user_config.volume_decrement : 5 );

		config.default_album_art = ( user_config.default_album_art != undefined ? user_config.default_album_art : '' );
		config.active_song.volume = config.volume;

		config.handle_song_elements = ( user_config.handle_song_elements != undefined ? user_config.handle_song_elements : true );

		config.song_ended_callback = ( user_config.song_ended_callback != undefined ? user_config.song_ended_callback : '' );
		
		/*
			If the song is live, we disable visualizaitons.  Visualizations
			will most likely not work with Live audio due to cors violations.
		*/
		if( !config.active_metadata.live ){
			config.active_song.crossOrigin = "anonymous";
		}else{
			/*
				If live, remove visualization element.
			*/
			privateHandleVisualizationBackup();

			source.disconnect(0);
			analyser.disconnect(0);
			
			context.close();
		}

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

		privateSyncSongStatusSliders();

		privateCheckSongVisualization();
		/*
			Initialize the visual elements for the song if the user
			wants Amplitude to handle the changes. This is new 
			compared to previous versions where Amplitude automatically
			handled the song elements.
		*/
		if( config.handle_song_elements ){
			privateSetSongInfo();
		}

		/*
			Removes any classes set by the user so any inconsistencies
			with start song and actual song are displayed correctly.
		*/
		privateSyncVisualPlayingContainers();

		/*
			Sets the active song container for the song that will be
			played
		*/
		privateSetActiveContainer();

		temp_user_config = {};
	}

	/*
		Writes out debug message to the console if enabled.

		@param string message The string that gets printed to
		alert the user of a debugging error.
	*/
	function privateWriteDebugMessage( message ){
		if( config.debug ){
			console.log( message );
		}
	}
	/*
		Checks to see if a new song should be prepared for playing

		@param int playing_song_index The integer index of the song
		that will be played. 
	*/
	function privateCheckNewSong( playing_song_index ){
		/*
			If the new song index is null, then nothing was defined, 
			so we assume it's in a single song scenario and we don't
			change the song. If the indexes are different then we adjust 
			the song.
		*/
		if( playing_song_index != null && ( playing_song_index != config.active_index ) ){
			privateStop();

			privateCheckNewAlbum( config.songs[playing_song_index].album );

			config.active_song.src = config.songs[playing_song_index].url;
			config.active_metadata = config.songs[playing_song_index];
			config.active_album = config.songs[playing_song_index].album;

			if( config.album_change ){
				privateRunCallback('after_album_change');
				config.album_change = false;
			}

			config.active_index = playing_song_index;

			/*
				If it's a new song and the user wants amplitude to handle
				the song elements, we need to set the information for
				the song.
			*/
			if( config.handle_song_elements ){
				privateSetSongInfo();
			}

			/*
				We set the current times to 0:00 when song changes
				so all of the pages players will be synchronized.
			*/
			privateSyncCurrentTimes();

			privateCheckSongVisualization();

			privateSetActiveContainer();
			return true;
		}else{
			return false;
		}
	}

	/*
		Checks to see if a new album is playing. This allows for
		multiple albums to be initialized on the same page.
		Through CSS you can show and hide albums and simulate
		multiple playlists.

		@param string new_album The string of the new album
		to see if it has changed.
	*/
	function privateCheckNewAlbum( new_album ){
		if( config.active_album != new_album ){
			config.album_change = true;
			privateRunCallback('before_album_change');
		}
	}

	/*
		Called when a song changes.
	*/
	function privateSongChange(){
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
			visual elements containing ifnormation regarding the
			new song if the user wants Amplitude to.
		*/
		if( config.handle_song_elements ){
			privateSetSongInfo();
		}

		/*
			Sync song status sliders
		*/
		privateSyncSongStatusSliders();

		/*
			We set the current times to 0:00 when song changes
			so all of the pages players will be synchronized.
		*/
		privateSyncCurrentTimes();

		/*
			Remove class from all containers
		*/
		privateSyncVisualPlayingContainers();

		/*
			Set new active song container
		*/

		privateSetActiveContainer();
		/*
			Play new song
		*/
		privatePlay();
	}

	/*
		If there is a visualization specifically for a song, we set that
		as the active visualization. Only if one is specified, otherwise
		nothing changes and we continue using the active visualization.
	*/
	function privateCheckSongVisualization(){
		var changed = false;

		if( config.active_metadata.visualization ){
			/*
				If the visualization is different and there is an active
				visualization. We must stop the active visualization
				before setting the new one.
			*/
			if( config.active_metadata.visualization != config.active_visualization && config.active_visualization != '' ){
				privateStopVisualization();
				changed = true;
			}
			config.active_visualization = config.active_metadata.visualization;
		}

		return changed;
	}

	/*
		When the song has ended, this method gets called.
		If it's a one song instance, then we don't do anything.
		If there are multiple songs, we check if shuffle is on
		or if we should use the original songs array. Then we set
		the next song and play it.
	*/
	function privateHandleSongEnded(){
		if( config.songs.length > 1 ){
			/*
				Stop active song
			*/
			privateStop();

			if( config.shuffle_on ){
				/*
					Loop around shuffle array if at the end. We need to check if the next
					song is within array. Otherwise we reset it to 0.

					Set new song
				*/
				if( parseInt( config.shuffle_active_index) + 1 < config.shuffle_list.length ){
					config.active_song.src = config.shuffle_list[parseInt(config.shuffle_active_index) + 1].url;
					config.active_metadata = config.shuffle_list[parseInt(config.shuffle_active_index) + 1];
					config.shuffle_active_index = parseInt(config.shuffle_active_index) + 1;
				}else{
					config.active_song.src = config.shuffle_list[0].url;
					config.active_metadata = config.shuffle_list[0];
					config.shuffle_active_index = 0;
				}
			}else{
				/*
					Loop around songs array if at the end. We need to check if the next
					song is within array. Otherwise we reset it to 0.

					Set new song
				*/
				if( parseInt(config.active_index) + 1 < config.songs.length ){
					config.active_song.src = config.songs[parseInt(config.active_index) + 1].url;
					config.active_metadata = config.songs[parseInt(config.active_index) + 1];
					config.active_index = parseInt(config.active_index) + 1;
				}else{
					config.active_song.src = config.songs[0].url;
					config.active_metadata = config.songs[0];
					config.active_index = 0;
				}
			}

			privateSongChange();
		}

		/*
			Fire song ended event handler.
		*/
		privateRunCallback('after_song_ended');
	}

	/*
		Fires when the song time is updated.
	*/
	function privateUpdateTime(){
		/*
			Gets the current time of the song in seconds and minutes.
		*/
		var current_seconds = ( Math.floor( config.active_song.currentTime % 60 ) < 10 ? '0' : '' ) + 
							    Math.floor( config.active_song.currentTime % 60 );

		var current_minutes = Math.floor( config.active_song.currentTime / 60 );
		
		/*
			Soundcloud stream on safari doesn't return the song duration
			as a finite number. So we grab the duration from soundcloud and
			bind it to the meta data. We always use the metadata from
			soundcloud to prevent loading issues and duration calculation.
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
			Finds the current song time visualization. If there is only one
			song time visualization, then that's the one we adjust to represent
			the current song time's visualization. Otherwise we find the one
			with the same song index as the active song.
		*/

		var current_song_time_visualization = '';

		if( document.querySelector('[amplitude-single-song-time-visualization="true"]') ){
			current_song_time_visualization = document.querySelector('[amplitude-single-song-time-visualization="true"]');
		}else{
			current_song_time_visualization = document.querySelector('.amplitude-song-time-visualization[amplitude-song-index="'+config.active_index+'"]');
		}

		/*
			Looks for an element with attributes that define which part of
			the time should be inserted into the html. If there is a singlular
			display, we update the singular. If there are multiple, we only do 
			the first one on the query, it wouldn't make sense to do all of them.
		*/
		if( document.querySelector('[amplitude-single-current-minutes="true"]') ){
			document.querySelector('[amplitude-single-current-minutes="true"]').innerHTML = current_minutes;
		}else if( document.querySelector('.amplitude-current-minutes[amplitude-song-index="'+config.active_index+'"]') ){
			document.querySelector('.amplitude-current-minutes[amplitude-song-index="'+config.active_index+'"]').innerHTML = current_minutes;
		}

		if( document.querySelector('[amplitude-single-current-seconds="true"]') ){
			document.querySelector('[amplitude-single-current-seconds="true"]').innerHTML = current_seconds;
		}else if( document.querySelector('.amplitude-current-seconds[amplitude-song-index="'+config.active_index+'"]') ){
			document.querySelector('.amplitude-current-seconds[amplitude-song-index="'+config.active_index+'"]').innerHTML = current_seconds;
		}
		
		if( !config.active_metadata.live ){
			if( document.querySelector('[amplitude-single-duration-seconds="true"]') ){
				document.querySelector('[amplitude-single-duration-seconds="true"]').innerHTML = song_duration_seconds;
			}else if( document.querySelector('.amplitude-duration-seconds[amplitude-song-index="'+config.active_index+'"]') ){
				document.querySelector('.amplitude-duration-seconds[amplitude-song-index="'+config.active_index+'"]').innerHTML = song_duration_seconds;
			}

			if( document.querySelector('[amplitude-single-duration-minutes="true"]') ){
				document.querySelector('[amplitude-single-duration-minutes="true"]').innerHTML = song_duration_minutes;
			}else if( document.querySelector('.amplitude-duration-minutes[amplitude-song-index="'+config.active_index+'"]') ){
				document.querySelector('.amplitude-duration-minutes[amplitude-song-index="'+config.active_index+'"]').innerHTML = song_duration_minutes;
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

		/*
			When we find the right visualization, we set the value to the percentage of 
			completion only if the song isn't live. Since it's 'infinite' if 
			it's a live source, it wouldn't make sense to update the time
			display.
		*/

		if( !config.active_metadata.live && current_song_time_visualization ){
			var current_song_time_visualization_status = current_song_time_visualization.querySelectorAll('.amplitude-song-time-visualization-status');
			var visualization_width = current_song_time_visualization.offsetWidth;

			current_song_time_visualization_status[0].setAttribute('style', 'width:' +( visualization_width * ( config.active_song.currentTime / config.active_song.duration ) ) + 'px'); 
		}

	}

	/*
		Calls the start method on the active visualization.
	*/
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

	/*
		Calls the stop method of the active visualization.
		If the visualization is started, we stop it.
	*/
	function privateStopVisualization(){
		if( config.visualization_started && Object.keys(config.visualizations).length > 0){
			config.current_visualization.stopVisualization();
			config.visualization_started = false;
		}
	}

	/*
		Sets the visual elements containg the active song
		information.
	*/
	function privateSetSongInfo(){
		if( document.querySelector('[amplitude-song-info="name"]') ){
			document.querySelector('[amplitude-song-info="name"]').innerHTML = config.active_metadata.name;
		}

		if( document.querySelector('[amplitude-song-info="artist"]') ){
			document.querySelector('[amplitude-song-info="artist"]').innerHTML = config.active_metadata.artist;
		}

		if( document.querySelector('[amplitude-song-info="album"]') ){
			document.querySelector('[amplitude-song-info="album"]').innerHTML = config.active_metadata.album;
		}

		if( document.querySelector('[amplitude-song-info="cover"]') ){
			var coverImages = document.querySelectorAll('[amplitude-song-info="cover"]');
			for( i = 0; i < coverImages.length; i++ ){
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

		if( document.querySelector('[amplitude-song-info="call-sign"]') ){
			document.querySelector('[amplitude-song-info="call-sign"]').innerHTML = config.active_metadata.call_sign;
		}

		if( document.querySelector('[amplitude-song-info="station-name"]') ){
			document.querySelector('[amplitude-song-info="station-name"]').innerHTML = config.active_metadata.station_name;
		}

		if( document.querySelector('[amplitude-song-info="location"]') ){
			document.querySelector('[amplitude-song-info="location"]').innerHTML = config.active_metadata.location;
		}

		if( document.querySelector('[amplitude-song-info="frequency"]') ){
			document.querySelector('[amplitude-song-info="frequency"]').innerHTML = config.active_metadata.frequency;
		}

		if( document.querySelector('[amplitude-song-info="station-art"]') ){
			var coverImages = document.querySelectorAll('[amplitude-song-info="station-art"]');
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

	function privateSetActiveContainer(){
		var song_containers = document.getElementsByClassName('amplitude-song-container');
		for( i = 0; i < song_containers.length; i++ ){
			song_containers[i].classList.remove('amplitude-active-song-container');
		}
		if( document.querySelector('.amplitude-song-container[amplitude-song-index="'+config.active_index+'"]') ){
			document.querySelector('.amplitude-song-container[amplitude-song-index="'+config.active_index+'"]').classList.add('amplitude-active-song-container');
		}
	}

	/*
		Shuffles songs.
		Based off of: http://www.codinghorror.com/blog/2007/12/the-danger-of-naivete.html
	*/

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

	/*
		Swaps and randomizes the song shuffle.

		@param JSON shuffle_list The list of songs that is going to
		be shuffled

		@param int original The original index of the song in the
		songs array.

		@param int random The randomized index that will be the
		new index of the song in the shuffle array.
	*/
	function privateShuffleSwap( shuffle_list, original, random ){
		var temp = shuffle_list[ original ];
		shuffle_list[ original ] = shuffle_list[ random ];
		shuffle_list[ random ] = temp;
	}

	/*
		Runs callback for specific function
	*/
	function privateRunCallback( callback_name ){
		if( config.callbacks[callback_name] ){
			var callback_function = window[ config.callbacks[callback_name] ];
			callback_function();
		}
	}

	/*
	|--------------------------------------------------------------------------
	| Soundcloud specific helpers
	|--------------------------------------------------------------------------
	| These helpers wrap around the basic functions of the Soundcloud API
	| 
	*/
	/*
		Loads the soundcloud sdk.  
		With help from: http://stackoverflow.com/questions/950087/include-a-javascript-file-in-another-javascript-file
	*/
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

	/*
		Initializes soundcloud with the key provided.
	*/
	function privateInitSoundcloud(){
		SC.initialize({
			client_id: config.soundcloud_client
		});
		privateGetSoundcloudStreamableURLs();
	}

	/*
		Gets the streamable URL from the URL provided for
		all of the soundcloud links.  This will loop through
		and set all of the information for the soundcloud
		urls.
	*/
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

	/*
		Due to Soundcloud SDK being asynchronous, we need to scope the
		index of the song in another function.
	*/
	function privateSoundcloudResolveStreamable(url, index){
		SC.get('/resolve/?url='+url, function( sound ){
			if( sound.streamable ){
				config.songs[index].url = sound.stream_url+'?client_id='+config.soundcloud_client;

				if( config.soundcloud_use_art ){
					config.songs[index].cover_art_url = sound.artwork_url;
				}

				config.songs[index].soundcloud_data = sound;
			}else{
				if( config.debug ){
					privateWriteDebugMessage( config.songs[index].name +' by '+config.songs[index].artist +' is not streamable by the Soundcloud API' );
				}
			}
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
	| Bind Event Handlers
	|--------------------------------------------------------------------------
	| Binds event handlers to all of the AmplitudeJS elements.
	| 
	*/
	function privateInitializeEventHandlers(){
		/*
			On time update, update visual displays
		*/
		config.active_song.addEventListener('timeupdate', privateUpdateTime );

		/*
			Handles what to do when the song has ended.
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
		*/
		var mute_classes = document.getElementsByClassName("amplitude-mute");

		for( var i = 0; i < mute_classes.length; i++ ){
			if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
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
		*/
		var volume_up_classes = document.getElementsByClassName("amplitude-volume-up");

		for( var i = 0; i < volume_up_classes.length; i++ ){
			if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
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
		*/
		var volume_down_classes = document.getElementsByClassName("amplitude-volume-down");
		
		for( var i = 0; i < volume_down_classes.length; i++ ){
			if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
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
			Binds handlers for song slider classes
		*/
		var song_sliders = document.getElementsByClassName("amplitude-song-slider");

		for( var i = 0; i < song_sliders.length; i++ ){
			song_sliders[i].addEventListener('input', privateSongStatusBarInputHandle );
		}

		/*
			Binds handlers for volume slider classes
		*/
		var volume_sliders = document.getElementsByClassName("amplitude-volume-slider");

		for( var i = 0; i < volume_sliders.length; i++ ){
			if( /iPhone|iPad|iPod/i.test(navigator.userAgent) ) {
				privateWriteDebugMessage( 'iOS does NOT allow volume to be set through javascript: https://developer.apple.com/library/safari/documentation/AudioVideo/Conceptual/Using_HTML5_Audio_Video/Device-SpecificConsiderations/Device-SpecificConsiderations.html#//apple_ref/doc/uid/TP40009523-CH5-SW4' );
			}else{
				volume_sliders[i].addEventListener('input', privateVolumeInputHandle );
			}
		}

		/*
			Binds handlers for next button classes
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
			Binds handlers for previous button classes
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
			Binds handlers for shuffle button
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
			Sets up song time visualizations
		*/
		var song_time_visualizations = document.getElementsByClassName("amplitude-song-time-visualization");

		for( var i = 0; i < song_time_visualizations.length; i++ ){
			var status = document.createElement('div');

			status.classList.add('amplitude-song-time-visualization-status');
			status.setAttribute( 'style', 'width: 0px' );

			song_time_visualizations[i].appendChild( status );
		}

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
		registerVisualization: publicRegisterVisualization,
		visualizationCapable: publicVisualizationCapable,
		changeVisualization: publicChangeActiveVisualization,
		addSong: publicAddSong,
		analyser: analyser,
		source: source,
		active: config.active_song
	};

})();
