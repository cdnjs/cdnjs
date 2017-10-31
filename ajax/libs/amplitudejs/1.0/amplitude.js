/*
	Version: 1.1
	Author: Dan Pastori
	Company: 521 Dimensions
*/

/*
|--------------------------------------------------------------------------
| Defaults for Amplitude
|--------------------------------------------------------------------------
|	amplitude_active_song
|		This is the current song playing. No matter if it's playlist or
|		single song, this is the reference.
|
|	amplitude_volume
|		The song volume ranges between 0 and 1 which correspond accordingly 
|		to 0% to 100%
|
|	amplitude_pre_mute_volume
|		Handles the last volume that was set on amplitude so when the
|		current song is un-muted it goes back to the volume it was
|		previously at.
|
|	amplitude_list_playing_index
|		Saves the current index of the song that's playing so it can 
|		be referenced for visual display updates.
|
|	amplitude_auto_play
|		If autoplay is set to true, amplitude will start playing the start
|		song on page load.
|
|	amplitude_songs
|		JSON object containing all of the songs that amplitude uses
|
|	amplitude_shuffle
|		If shuffle is turned on, this is set to true. Amplitude uses
|		the shuffle_list if this is set to true.
|
|	amplitude_shuffle_list
|		The container for the songs when they are shuffled.  After
|		shuffle this list is populated and is used in the next and
|		previous calls.		
|
|	amplitude_start_song
|		Initial start song allows for the user to start a song out
|		of the song list. If not defined, plays the first song on 
|		the list.
|
|	amplitude_volume_up_amount
|		When the user presses the volume up button, how much does
|		it increase. Defaults to 10 since it's a 1-100 range for
|		volume.
|
|	amplitude_volume_down_amount
|		When the user presses the volume down button, how much does
|		it decrease. Defaults to 10 since it's a 1-100 range for
|		volume.
|	
|	amplitude_continue_next
|
|	amplitude_active_song_information
|
|	**********************
|	All callbacks are null unless defined by the user. This should
|	just be the string representation of the function name.
|
|	amplitude_before_play_callback
|		Called before the play function is called.	
|
|	amplitude_after_play_callback
|		Called after the play function is called.
|
|	amplitude_before_stop_callback
|		Called before the stop function is called.
|		
|	amplitude_after_stop_callback
|		Called after the stop function is called.
|
|	amplitude_before_next_callback
|		Called before the next function is called for
|		the next song.
|
|	amplitude_after_next_callback
|		Called after the next function is called.
|
|	amplitude_before_prev_callback
|		Called before the previous function is called.
|
|	amplitude_after_prev_callback
|		Called after the previous function is called.
|
|	amplitude_before_pause_callback
|		Called before the pause function is called.
|
|	amplitude_after_pause_callback
|		Called after the pause function is called.
|
|	amplitude_before_shuffle_callback
|		Called before the shuffle function is called.
|
|	amplitude_after_shuffle_callback
|		Called after the shuffle function is called.
|
|	amplitude_before_volume_change_callback
|		Called before the volume is changed.
|
|	amplitude_after_volume_change_callback
|		Called after the volume is changed.
|
|	amplitude_before_mute_callback
|		Called before the mute function is called.
|
|	amplitude_after_mute_callback
|		Called after the mute function is called.
|
|	amplitude_before_time_update_callback
|		Called before time is updated.
|
|	amplitude_after_time_update_callback
|		Called after time is updated.
|
|	amplitude_before_song_information_set_callback
|		Called before song information is set.
|
|	amplitude_after_song_information_set_callback
|		Called after song information is set.
|	
|	amplitude_before_song_added_callback
|		Called before song is added to the songs array
|
|	amplitude_after_song_added_callback
|		Called after a song is added to the songs array
*/


var amplitude_active_config = {
	"amplitude_active_song": null,
	"amplitude_volume": .5,
	"amplitude_pre_mute_volume": .5,

	"amplitude_list_playing_index": null,
	"amplitude_auto_play": false,
	"amplitude_songs": {},
        "amplitude_playlist_index": 0,

	"amplitude_shuffle": false,
	"amplitude_shuffle_list": {},

	"amplitude_start_song": null,
	"amplitude_volume_up_amount": 10,
	"amplitude_volume_down_amount": 10,
	"amplitude_continue_next": false,

	"amplitude_active_song_information": {},

	"amplitude_before_play_callback": null,
	"amplitude_after_play_callback": null,

	"amplitude_before_stop_callback": null,
	"amplitude_after_stop_callback": null,

	"amplitude_before_next_callback": null,
	"amplitude_after_next_callback": null,

	"amplitude_before_prev_callback": null,
	"amplitude_after_prev_callback": null,

	"amplitude_before_pause_callback": null,
	"amplitude_after_pause_callback": null,

	"amplitude_before_shuffle_callback": null,
	"amplitude_after_shuffle_callback": null,

	"amplitude_before_volume_change_callback": null,
	"amplitude_after_volume_change_callback": null,

	"amplitude_before_mute_callback": null,
	"amplitude_after_mute_callback": null,

	"amplitude_before_time_update_callback": null,
	"amplitude_after_time_update_callback": null,

	"amplitude_before_song_information_set_callback": null,
	"amplitude_after_song_information_set_callback": null,

	"amplitude_before_song_added_callback": null,
	"amplitude_after_song_added_callback": null
};

/*
|--------------------------------------------------------------------------
| Active Song Information
|--------------------------------------------------------------------------
| Contains the information for the active song. This makes it accessible
| to the application utilizing AmplitudeJS
|	
|	cover_art_url
|	
|	artist
|
|	album
|
|	song_title
|
|	song_url
|	
|	live
|
|	visual_id
|
|
*/
var amplitude_active_song_information = { };

/*
|--------------------------------------------------------------------------
| Initializers
|--------------------------------------------------------------------------
| Sets up amplitude on load. 
|	
|	hook_amplitude_functions
|		Calls the method that binds a group of events to the onload of the
|		window function.  This will pick up the amplitude elements and bind
|		them to certain events.
|		
|		Thanks to: http://www.htmlgoodies.com/beyond/javascript/article.php/3724571/Using-Multiple-JavaScript-Onload-Functions.htm
|
|	amplitude_configuration
|		Sets up amplitude to work with the user config provided. This sets
|		up songs and 
|
|	amplitude_web_desktop
|		Binds events to elements for clicks
|	
|	amplitude_web_mobile
|		Binds events to elements for touch
|
|	
*/

hook_amplitude_functions( amplitude_configure_variables );

//If mobile, bind touch events, otherwise bind click.
if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
	hook_amplitude_functions( amplitude_web_mobile );
}else{
	hook_amplitude_functions( amplitude_web_desktop );
}

hook_amplitude_functions( amplitude_start );

function hook_amplitude_functions( func ) {
  if (document.readyState === "complete") {
    func();
  } else {
    var oldonload = window.onload;
    
    if (typeof window.onload != 'function') {
      window.onload = func;
    } else {
      window.onload = function() {
        if (oldonload) {
          oldonload();
        }
        func();
      }
    }
  }
}

/*
|--------------------------------------------------------------------------
| Initialize
|--------------------------------------------------------------------------
| Configures the environment based off of the users preferences.
|	
*/
function amplitude_configure_variables(){
	//http://www.binarytides.com/using-html5-audio-element-javascript/
	amplitude_active_config.amplitude_active_song = new Audio( );

	//Binds the time updating for the active song. Used for display and time tracking.
	amplitude_bind_time_update();

	//Sets the internal config songs 
	if( amplitude_config.amplitude_songs != undefined ){
		amplitude_active_config.amplitude_songs = amplitude_config.amplitude_songs;
	}

	//Sets the default volume
	if( amplitude_config.amplitude_volume != undefined ){
		amplitude_active_config.amplitude_volume = amplitude_config.amplitude_volume / 100;
		amplitude_active_config.amplitude_pre_mute_volume = amplitude_config.amplitude_volume / 100;

		if(document.getElementById('amplitude-volume-slider')){
			document.getElementById('amplitude-volume-slider').value = amplitude_active_config.amplitude_volume * 100;
		}

		amplitude_active_config.amplitude_active_song.volume = amplitude_active_config.amplitude_volume;
	}

	if( amplitude_config.amplitude_pre_mute_volume != undefined ){
		amplitude_active_config.amplitude_pre_mute_volume = amplitude_config.amplitude_pre_mute_volume;
	}

	if( amplitude_config.amplitude_auto_play != undefined ){
		amplitude_active_config.amplitude_auto_play = amplitude_config.amplitude_auto_play;
	}

	if( amplitude_config.amplitude_start_song != undefined ){
		amplitude_active_config.amplitude_start_song = amplitude_config.amplitude_start_song;
	}

	if( amplitude_config.amplitude_before_play_callback != undefined ){
		amplitude_active_config.amplitude_before_play_callback = amplitude_config.amplitude_before_play_callback;
	}

	if( amplitude_config.amplitude_after_play_callback != undefined ){
		amplitude_active_config.amplitude_after_play_callback = amplitude_config.amplitude_after_play_callback;
	}

	if( amplitude_config.amplitude_before_stop_callback != undefined ){
		amplitude_active_config.amplitude_before_stop_callback = amplitude_config.amplitude_before_stop_callback;
	}

	if( amplitude_config.amplitude_after_stop_callback != undefined ){
		amplitude_active_config.amplitude_after_stop_callback = amplitude_config.amplitude_after_stop_callback;
	}

	if( amplitude_config.amplitude_before_next_callback != undefined ){
		amplitude_active_config.amplitude_before_next_callback = amplitude_config.amplitude_before_next_callback;
	}

	if( amplitude_config.amplitude_after_next_callback != undefined ){
		amplitude_active_config.amplitude_after_next_callback = amplitude_config.amplitude_after_next_callback;
	}

	if( amplitude_config.amplitude_before_prev_callback != undefined ){
		amplitude_active_config.amplitude_before_prev_callback = amplitude_config.amplitude_before_prev_callback;
	}

	if( amplitude_config.amplitude_after_prev_callback != undefined ){
		amplitude_active_config.amplitude_after_prev_callback = amplitude_config.amplitude_after_prev_callback;
	}

	if( amplitude_config.amplitude_after_pause_callback != undefined ){
		amplitude_active_config.amplitude_after_pause_callback = amplitude_config.amplitude_after_pause_callback;
	}

	if( amplitude_config.amplitude_before_pause_callback != undefined ){
		amplitude_active_config.amplitude_before_pause_callback = amplitude_config.amplitude_before_pause_callback;
	}

	if( amplitude_config.amplitude_after_shuffle_callback != undefined ){
		amplitude_active_config.amplitude_after_shuffle_callback = amplitude_config.amplitude_after_shuffle_callback;
	}

	if( amplitude_config.amplitude_before_shuffle_callback != undefined ){
		amplitude_active_config.amplitude_before_shuffle_callback = amplitude_config.amplitude_before_shuffle_callback;
	}

	if( amplitude_config.amplitude_before_volume_change_callback != undefined ){
		amplitude_active_config.amplitude_before_volume_change_callback = amplitude_config.amplitude_before_volume_change_callback;
	}

	if( amplitude_config.amplitude_after_volume_change_callback != undefined ){
		amplitude_active_config.amplitude_after_volume_change_callback = amplitude_config.amplitude_after_volume_change_callback;
	}

	if( amplitude_config.amplitude_before_mute_callback != undefined ){
		amplitude_active_config.amplitude_before_mute_callback = amplitude_config.amplitude_before_mute_callback;
	}

	if( amplitude_config.amplitude_after_mute_callback != undefined ){
		amplitude_active_config.amplitude_after_mute_callback = amplitude_config.amplitude_after_mute_callback;
	}

	if( amplitude_config.amplitude_before_time_update_callback != undefined ){
		amplitude_active_config.amplitude_before_time_update_callback = amplitude_config.amplitude_before_time_update_callback;
	}

	if( amplitude_config.amplitude_after_time_update_callback != undefined ){
		amplitude_active_config.amplitude_after_time_update_callback = amplitude_config.amplitude_after_time_update_callback;
	}

	if( amplitude_config.amplitude_before_song_information_set_callback != undefined ){
		amplitude_active_config.amplitude_before_song_information_set_callback = amplitude_config.amplitude_before_song_information_set_callback;
	}

	if( amplitude_config.amplitude_after_song_information_set_callback != undefined ){
		amplitude_active_config.amplitude_after_song_information_set_callback = amplitude_config.amplitude_after_song_information_set_callback;
	}

	if( amplitude_config.amplitude_before_song_added_callback != undefined ){
		amplitude_active_config.amplitude_before_song_added_callback = amplitude_config.amplitude_before_song_added_callback;
	}

	if( amplitude_config.amplitude_after_song_added_callback != undefined ){
		amplitude_active_config.amplitude_after_song_added_callback = amplitude_config.amplitude_after_song_added_callback;
	}

	if( amplitude_config.amplitude_volume_up_amount != undefined ){
		amplitude_active_config.amplitude_volume_up_amount = amplitude_config.amplitude_volume_up_amount;
	}

	if( amplitude_config.amplitude_volume_down_amount != undefined ){
		amplitude_active_config.amplitude_volume_down_amount = amplitude_config.amplitude_volume_down_amount;
	}

	if( amplitude_config.amplitude_continue_next != undefined ){
		amplitude_active_config.amplitude_continue_next = amplitude_config.amplitude_continue_next;
	}

	if( amplitude_active_config.amplitude_start_song != null ){

		amplitude_active_config.amplitude_active_song.src = amplitude_active_config.amplitude_songs[amplitude_active_config.amplitude_start_song].url;
		amplitude_set_active_song_information( amplitude_active_config.amplitude_songs[amplitude_active_config.amplitude_start_song] );
		amplitude_active_config.amplitude_list_playing_index = amplitude_active_config.amplitude_start_song;

		if( amplitude_active_config.amplitude_start_song.live == 'undefined' ){
			amplitude_active_config.amplitude_start_song.live = false;
		}

	}else{
		if( amplitude_active_config.amplitude_songs.length != 0 ){
			amplitude_active_config.amplitude_active_song.src = amplitude_active_config.amplitude_songs[0].url;
			amplitude_set_active_song_information( amplitude_active_config.amplitude_songs[0] );
			amplitude_active_config.amplitude_list_playing_index = 0;
		}else{
			console.log("Please define a an array of songs!");
		}
	}

	amplitude_bind_song_additions();
}


/*
|--------------------------------------------------------------------------
| Web Desktop Event Handlers
|--------------------------------------------------------------------------
| Binds Amplitude events for web desktop ( click events )
|	List of IDs that AmplitudeJS looks for to bind events to:
|
|	amplitude-play
|	
|	amplitude-stop
|
|	amplitude-pause
|
|	amplitude-play-pause
|
|	amplitude-mute
|
|	amplitude-shuffle
|
|	amplitude-next
|
|	amplitude-previous
|
|	amplitude-song-slider
|
|	amplitude-volume-slider
|
|	amplitude-volume-up
|
|	amplitude-volume-down
|
|	"ended" event listener
|
|	amplitude-play-pause classes
|
|	amplitude-song-slider classes
|
*/
function amplitude_web_desktop() {
	//Sets the Play button functionality
	if(document.getElementById('amplitude-play')){
		document.getElementById('amplitude-play').addEventListener('click', function() {
			//Need to add information regarding what we should play. AKA amplitude-playlist-song or amplitude-song
			amplitude_play_song();
		});
	}

	//Sets the Stop button functionality
	if(document.getElementById('amplitude-stop')){
		document.getElementById('amplitude-stop').addEventListener('click', function(){
			amplitude_stop_song();
		});
	}

	//Sets the Pause button functionality
	if(document.getElementById('amplitude-pause')){
		document.getElementById('amplitude-pause').addEventListener('click', function() {
			amplitude_pause_song();
		});
	}

	//Sets the Play/Pause toggle functionality
	if(document.getElementById('amplitude-play-pause')){
		document.getElementById('amplitude-play-pause').addEventListener('click', function(){
			if ( amplitude_active_config.amplitude_active_song.paused ){
				var amplitude_play_pause_button_new_class = ' amplitude-playing';

				this.className = this.className.replace('amplitude-paused', '');

				this.className = this.className.replace(amplitude_play_pause_button_new_class, '');
				this.className = this.className + amplitude_play_pause_button_new_class;
			}else{

				var amplitude_play_pause_button_new_class = ' amplitude-paused';

				this.className = this.className.replace('amplitude-playing', '');

				this.className = this.className.replace(amplitude_play_pause_button_new_class, '');
				this.className = this.className + amplitude_play_pause_button_new_class;		
			}   
			amplitude_play_pause();
		});
	}
	
	//Mute button functionality
	if(document.getElementById('amplitude-mute')){
		document.getElementById('amplitude-mute').addEventListener('click', function(obj){
			amplitude_mute();
		});
	}

	//Initializes shuffle button
	if(document.getElementById('amplitude-shuffle')){
		document.getElementById("amplitude-shuffle").classList.add('amplitude-shuffle-off');

		document.getElementById('amplitude-shuffle').addEventListener('click', function(){
			if( amplitude_active_config.amplitude_shuffle ){
				this.classList.add('amplitude-shuffle-off');
				this.classList.remove('amplitude-shuffle-on');
			}else{
				this.classList.add('amplitude-shuffle-on');
				this.classList.remove('amplitude-shuffle-off');
			}
			amplitude_shuffle_playlist();
		});
	}

	//Initializes next button
	if(document.getElementById('amplitude-next')){
		document.getElementById('amplitude-next').addEventListener('click', function(){
			amplitude_next_song();
		});
	}

	//Initializes previous button
	if(document.getElementById('amplitude-previous')){
		document.getElementById('amplitude-previous').addEventListener('click', function(){
			amplitude_previous_song();
		});
	}

	//Initializes the song slider
	if(document.getElementById('amplitude-song-slider')){
		document.getElementById('amplitude-song-slider').addEventListener('input', amplitude_handle_song_sliders);
	}

	//Initializes the song volume slider
	if(document.getElementById('amplitude-volume-slider')){
		document.getElementById('amplitude-volume-slider').addEventListener('input', function(){
			amplitude_volume_update( this.value );
		});
	}
	//Sets the volume up button functionality
	if(document.getElementById('amplitude-volume-up')){
		document.getElementById('amplitude-volume-up').addEventListener('click', function(){
			amplitude_change_volume( 'up' ); 
		});
	}

	//Sets the volume down button functionality
	if(document.getElementById('amplitude-volume-down')){
		document.getElementById('amplitude-volume-down').addEventListener('click', function(){
			amplitude_change_volume( 'down' ); 
		});
	}

	//Binds to ending of a song if the user wants to continue to the next song upon completion.
	if( amplitude_active_config.amplitude_continue_next ){
		amplitude_active_config.amplitude_active_song.addEventListener("ended", function() {
			amplitude_next_song();
		});
	}

	//Binds play_pause to the classes for multiple play and pause for multiple songs and playlist
	var amplitude_play_pause_classes = document.getElementsByClassName("amplitude-play-pause");

    for( var i = 0; i < amplitude_play_pause_classes.length; i++ ){
        amplitude_play_pause_classes[i].addEventListener('click', amplitude_handle_play_pause_classes );
    }

    //Binds to multiple track sliders for multiple song integrations
    var amplitude_song_sliders = document.getElementsByClassName("amplitude-song-slider");

    for( var i = 0; i < amplitude_song_sliders.length; i++ ){
    	amplitude_song_sliders[i].addEventListener('input', amplitude_handle_song_sliders );
    }

    //Binds multiple mute buttons for multiple song integrations
    var amplitude_mute_buttons = document.getElementsByClassName("amplitude-mute");

    for( var i = 0; i < amplitude_mute_buttons.length; i++ ){
    	amplitude_mute_buttons[i].addEventListener('click', amplitude_handle_mute_classes );
    }

    /*
    amplitude_active_config.amplitude_playlist.sort(function(a, b) {
		return compareStrings(a.name, b.name);
	});
    console.log( amplitude_active_config.amplitude_playlist );
    */
}

/*
|--------------------------------------------------------------------------
| Web Mobile Event Handlers
|--------------------------------------------------------------------------
| Binds Amplitude events for web mobile ( touchstart events )
|	List of IDs that AmplitudeJS looks for to bind events to:
|	
|	amplitude-play
|
|	amplitude-stop
|
|	amplitude-pause
|
|	amplitude-play-pause
|
|	amplitude-mute
|
|	amplitude-shuffle
|
|	amplitude-next
|
|	amplitude-previous
|
|	amplitude-song-slider
|
|	amplitude-volume-slider
|
|	amplitude-volume-up
|
|	amplitude-volume-down
|
|	"ended" event listener
|
|	amplitude-play-pause classes
|
|	amplitude-song-slider classes
|
*/
function amplitude_web_mobile( ){
	//Sets the Play button functionality
	if(document.getElementById('amplitude-play')){
		document.getElementById('amplitude-play').addEventListener('touchstart', function() {
			//Need to add information regarding what we should play. AKA amplitude-playlist-song or amplitude-song
			amplitude_play_song();
		});
	}

	//Sets the Stop button functionality
	if(document.getElementById('amplitude-stop')){
		document.getElementById('amplitude-stop').addEventListener('touchstart', function(){
			amplitude_stop_song();
		});
	}

	//Sets the Pause button functionality
	if(document.getElementById('amplitude-pause')){
		document.getElementById('amplitude-pause').addEventListener('touchstart', function() {
			amplitude_pause_song();
		});
	}

	//Sets the Play/Pause toggle functionality
	if(document.getElementById('amplitude-play-pause')){
		document.getElementById('amplitude-play-pause').addEventListener('touchstart', function(){
			if ( amplitude_active_config.amplitude_active_song.paused ){
				var amplitude_play_pause_button_new_class = ' amplitude-playing';

				this.className = this.className.replace('amplitude-paused', '');

				this.className = this.className.replace(amplitude_play_pause_button_new_class, '');
				this.className = this.className + amplitude_play_pause_button_new_class;
			}else{

				var amplitude_play_pause_button_new_class = ' amplitude-paused';

				this.className = this.className.replace('amplitude-playing', '');

				this.className = this.className.replace(amplitude_play_pause_button_new_class, '');
				this.className = this.className + amplitude_play_pause_button_new_class;		
			}   
			amplitude_play_pause();
		});
	}
	
	//Mute button functionality
	if(document.getElementById('amplitude-mute')){
		if( /iPhone|iPad|iPod/i.test(navigator.userAgent) ) {
			console.log( 'iOS does NOT allow volume to be set through javascript: https://developer.apple.com/library/safari/documentation/AudioVideo/Conceptual/Using_HTML5_Audio_Video/Device-SpecificConsiderations/Device-SpecificConsiderations.html#//apple_ref/doc/uid/TP40009523-CH5-SW4' );
		}else{
			document.getElementById('amplitude-mute').addEventListener('touchstart', function(obj){
				amplitude_mute();
			});
		}
	}

	//Initializes shuffle button
	if(document.getElementById('amplitude-shuffle')){
		document.getElementById("amplitude-shuffle").classList.add('amplitude-shuffle-off');

		document.getElementById('amplitude-shuffle').addEventListener('touchstart', function(){
			if( amplitude_active_config.amplitude_shuffle ){
				this.classList.add('amplitude-shuffle-off');
				this.classList.remove('amplitude-shuffle-on');
			}else{
				this.classList.add('amplitude-shuffle-on');
				this.classList.remove('amplitude-shuffle-off');
			}
			amplitude_shuffle_playlist();
		});
	}

	//Initializes next button
	if(document.getElementById('amplitude-next')){
		document.getElementById('amplitude-next').addEventListener('touchstart', function(){
			amplitude_next_song();
		});
	}

	//Initializes previous button
	if(document.getElementById('amplitude-previous')){
		document.getElementById('amplitude-previous').addEventListener('touchstart', function(){
			amplitude_previous_song();
		});
	}

	//Initializes the song slider
	if(document.getElementById('amplitude-song-slider')){
		document.getElementById('amplitude-song-slider').addEventListener('input', amplitude_handle_song_sliders);
	}

	//Initializes the song volume slider
	if(document.getElementById('amplitude-volume-slider')){
		if( /iPhone|iPad|iPod/i.test(navigator.userAgent) ) {
			console.log( 'iOS does NOT allow volume to be set through javascript: https://developer.apple.com/library/safari/documentation/AudioVideo/Conceptual/Using_HTML5_Audio_Video/Device-SpecificConsiderations/Device-SpecificConsiderations.html#//apple_ref/doc/uid/TP40009523-CH5-SW4' );
		}else{
			document.getElementById('amplitude-volume-slider').addEventListener('input', function(){
				amplitude_volume_update( this.value );
			});
		}
	}
	//Sets the volume up button functionality
	if(document.getElementById('amplitude-volume-up')){
		if( /iPhone|iPad|iPod/i.test(navigator.userAgent) ) {
			console.log( 'iOS does NOT allow volume to be set through javascript: https://developer.apple.com/library/safari/documentation/AudioVideo/Conceptual/Using_HTML5_Audio_Video/Device-SpecificConsiderations/Device-SpecificConsiderations.html#//apple_ref/doc/uid/TP40009523-CH5-SW4' );
		}else{
			document.getElementById('amplitude-volume-up').addEventListener('touchstart', function(){
				amplitude_change_volume( 'up' ); 
			});
		}
	}

	//Sets the volume down button functionality
	if(document.getElementById('amplitude-volume-down')){
		if( /iPhone|iPad|iPod/i.test(navigator.userAgent) ) {
			console.log( 'iOS does NOT allow volume to be set through javascript: https://developer.apple.com/library/safari/documentation/AudioVideo/Conceptual/Using_HTML5_Audio_Video/Device-SpecificConsiderations/Device-SpecificConsiderations.html#//apple_ref/doc/uid/TP40009523-CH5-SW4' );
		}else{
			document.getElementById('amplitude-volume-down').addEventListener('touchstart', function(){
				amplitude_change_volume( 'down' ); 
			});
		}
	}

	//Binds to ending of a song if the user wants to continue to the next song upon completion.
	if( amplitude_active_config.amplitude_continue_next ){
		amplitude_active_config.amplitude_active_song.addEventListener("ended", function() {
			amplitude_next_song();
		});
	}

	//Binds play_pause to the classes for multiple play and pause for multiple songs and playlist
	var amplitude_play_pause_classes = document.getElementsByClassName("amplitude-play-pause");

    for( var i = 0; i < amplitude_play_pause_classes.length; i++ ){
        amplitude_play_pause_classes[i].addEventListener('touchstart', amplitude_handle_play_pause_classes );
    }

     //Binds to multiple track sliders for multiple song integrations
    var amplitude_song_sliders = document.getElementsByClassName("amplitude-song-slider");

    for( var i = 0; i < amplitude_song_sliders.length; i++ ){
    	amplitude_song_sliders[i].addEventListener('input', amplitude_handle_song_sliders );
    }
}

/*
|--------------------------------------------------------------------------
| Start
|--------------------------------------------------------------------------
| Begins Amplitude functionality
|	
*/

function amplitude_start(){
	if( document.getElementById('amplitude-song-time-visualization') ){
		document.getElementById('amplitude-song-time-visualization').innerHTML = '<div id="amplitude-song-time-visualization-status"></div>';
		document.getElementById('amplitude-song-time-visualization-status').setAttribute( "style", "width:0px"); 
	}

	var amplitude_song_time_visualizations = document.getElementsByClassName("amplitude-song-time-visualization");

	for( var i = 0; i < amplitude_song_time_visualizations.length; i++ ){
		amplitude_song_time_visualizations[i].innerHTML = '<div class="amplitude-song-time-visualization-status"></div>';
	}

	var amplitude_song_time_visualizations_status = document.getElementsByClassName("amplitude-song-time-visualization-status");

	for( var i = 0; i < amplitude_song_time_visualizations_status.length; i++ ){
		amplitude_song_time_visualizations_status[i].setAttribute( "style", "width:0px");
	}

	if( amplitude_active_config.amplitude_auto_play ){
		amplitude_play_pause();
	}
}

/*
|--------------------------------------------------------------------------
| Amplitude Play Function
|--------------------------------------------------------------------------
| Plays the active amplitude song.
*/

function amplitude_play_song(){
	//Before play is called
	if( amplitude_active_config.amplitude_before_play_callback ){
		var amplitude_before_play_callback_function = window[amplitude_active_config.amplitude_before_play_callback];
		amplitude_before_play_callback_function();
	}

	if( amplitude_active_config.amplitude_active_song_information.live != 'undefined' && amplitude_active_config.amplitude_active_song_information.live ){
		amplitude_reconnect_stream();
	}
	
	var amplitude_song_sliders = document.getElementsByClassName("amplitude-song-slider");

    for( var i = 0; i < amplitude_song_sliders.length; i++ ){
    	if( amplitude_song_sliders[i].getAttribute('amplitude-song-slider-index') != amplitude_active_config.amplitude_list_playing_index){
    		amplitude_song_sliders[i].value = 0;

			var current_song_time_visualizations = document.getElementsByClassName('amplitude-song-time-visualization-status');

			for( var i = 0; i < current_song_time_visualizations.length; i++ ){
				current_song_time_visualizations[i].setAttribute("style","width:0px"); 
			}
    	}
    }

	amplitude_active_config.amplitude_active_song.play();
	amplitude_set_song_info();

	//After play is called
	if( amplitude_active_config.amplitude_after_play_callback ){
		var amplitude_after_play_callback_function = window[amplitude_active_config.amplitude_after_play_callback];
		amplitude_after_play_callback_function();
	}
}

/*
|--------------------------------------------------------------------------
| Amplitude Stop Song
|--------------------------------------------------------------------------
| Stops song by setting the current time to 0 and pausing the song.
| 
*/
function amplitude_stop_song(){
	//Before stop is called
	if( amplitude_active_config.amplitude_before_stop_callback ){
		var amplitude_before_stop_callback_function = window[amplitude_active_config.amplitude_before_stop_callback];
		amplitude_before_stop_callback_function();
	}

	amplitude_active_config.amplitude_active_song.currentTime = 0;
	amplitude_active_config.amplitude_active_song.pause();

	if(typeof amplitude_active_config.amplitude_active_song.live != 'undefined'){
		if( amplitude_active_config.amplitude_active_song.live ){
			amplitude_disconnect_stream();
		}
	}

	//After stop is called
	if( amplitude_active_config.amplitude_after_stop_callback ){
		var amplitude_after_stop_callback_function = window[amplitude_active_config.amplitude_after_stop_callback];
		amplitude_after_stop_callback_function();
	}
}

/*
|--------------------------------------------------------------------------
| Amplitude Pause Function
|--------------------------------------------------------------------------
| Pauses the song. If the song is live, the stream is disconnected.
*/
function amplitude_pause_song(){
	//Fires pause callback
	if( amplitude_active_config.amplitude_before_pause_callback ){
		var amplitude_before_pause_callback_function = window[amplitude_active_config.amplitude_before_pause_callback];
		amplitude_before_pause_callback_function();
	}

	amplitude_active_config.amplitude_active_song.pause();
	if( amplitude_active_config.amplitude_active_song_information.live ){
		amplitude_disconnect_stream();
	}

	if( amplitude_active_config.amplitude_after_pause_callback ){
		var amplitude_after_pause_callback_function = window[amplitude_active_config.amplitude_after_pause_callback];
		amplitude_after_pause_callback_function();
	}
}

/*
|--------------------------------------------------------------------------
| Amplitude Play/Pause Function
|--------------------------------------------------------------------------
| Play and pause function determines whether or not the song is paused or not.
| If it's paused, the play function is called. If it's playing, the pause function is called.
*/
function amplitude_play_pause(){
	//Checks to see if the song is paused, if it is, play it from where it left off otherwise pause it.
	if ( amplitude_active_config.amplitude_active_song.paused ){	
		amplitude_play_song();
		var current_now_playing_list_item = document.querySelector('[amplitude-song-index="'+amplitude_active_config.amplitude_list_playing_index+'"]');

		if( current_now_playing_list_item != null ){
			current_now_playing_list_item.classList.add('amplitude-list-playing');
			current_now_playing_list_item.classList.remove('amplitude-list-paused');
		}
	}else{
		amplitude_pause_song();
		var current_now_playing_list_item = document.querySelector('[amplitude-song-index="'+amplitude_active_config.amplitude_list_playing_index+'"]');
		
		if( current_now_playing_list_item != null ){
			current_now_playing_list_item.classList.add('amplitude-list-paused');
			current_now_playing_list_item.classList.remove('amplitude-list-playing');
		}
	}   
}

/*
|--------------------------------------------------------------------------
| Amplitude Update Time
|--------------------------------------------------------------------------
| Updates the current time function so it reflects where the user is in the song.
| This function is called whenever the time is updated.  This keeps the visual in sync with the actual time.
*/

function amplitude_update_time(){
	if( amplitude_active_config.amplitude_before_time_update_callback ){
		var amplitude_before_time_update_callback_function = window[amplitude_active_config.amplitude_before_time_update_callback];
		amplitude_before_time_update_callback_function();
	}

	var amplitude_current_seconds = ( Math.floor( amplitude_active_config.amplitude_active_song.currentTime % 60 ) < 10 ? '0' : '' ) + Math.floor( amplitude_active_config.amplitude_active_song.currentTime % 60 );
	var amplitude_current_minutes = Math.floor( amplitude_active_config.amplitude_active_song.currentTime / 60 );

	var amplitude_song_duration_minutes = Math.floor( amplitude_active_config.amplitude_active_song.duration / 60 );
	var amplitude_song_duration_seconds = ( Math.floor( amplitude_active_config.amplitude_active_song.duration % 60 ) < 10 ? '0' : '' ) + Math.floor( amplitude_active_config.amplitude_active_song.duration % 60 );

	//Sets the current song location compared to the song duration.
	if( document.getElementById( 'amplitude-current-time' ) ){
		document.getElementById( 'amplitude-current-time' ).innerHTML = amplitude_current_minutes + ":" + amplitude_current_seconds;
	}
	
	if( document.getElementById( 'amplitude-audio-duration' ) ){
		if( !isNaN( amplitude_song_duration_minutes ) ){
			document.getElementById( 'amplitude-audio-duration' ).innerHTML =  amplitude_song_duration_minutes + ":" + amplitude_song_duration_seconds;
		}
	}

	if( document.getElementById( 'amplitude-song-slider' ) ){
		document.getElementById( 'amplitude-song-slider' ).value = ( amplitude_active_config.amplitude_active_song.currentTime / amplitude_active_config.amplitude_active_song.duration ) * 100;
	}

	if( document.getElementById( 'amplitude-song-time-visualization') ){
		var visualization_width = document.getElementById('amplitude-song-time-visualization').offsetWidth;

		document.getElementById('amplitude-song-time-visualization-status').setAttribute("style","width:"+( visualization_width * ( amplitude_active_config.amplitude_active_song.currentTime / amplitude_active_config.amplitude_active_song.duration ) ) + 'px'); 
	}

	var current_song_time_visualization = document.querySelector('[amplitude-song-time-visualization-index="'+amplitude_active_config.amplitude_list_playing_index+'"]');

	if( current_song_time_visualization != null ){
		var visualization_width = current_song_time_visualization.offsetWidth;

		current_song_time_visualization.firstChild.setAttribute("style","width:"+( visualization_width * ( amplitude_active_config.amplitude_active_song.currentTime / amplitude_active_config.amplitude_active_song.duration ) ) + 'px'); 
	}

	//Multiple songs have multiple sources of control.
	if( amplitude_active_config.amplitude_songs.length > 1 ){
		var current_now_playing_song_slider = document.querySelector('[amplitude-song-slider-index="'+amplitude_active_config.amplitude_list_playing_index+'"]');

		if( current_now_playing_song_slider != null ){
			current_now_playing_song_slider.value = ( amplitude_active_config.amplitude_active_song.currentTime / amplitude_active_config.amplitude_active_song.duration ) * 100;
		}

		var current_time_display = document.querySelector('[amplitude-current-time-index="'+amplitude_active_config.amplitude_list_playing_index+'"]');
		if( current_time_display != null ){
			current_time_display.innerHTML = amplitude_current_minutes + ":" + amplitude_current_seconds;
		}

		var current_song_duration = document.querySelector('[amplitude-audio-duration-index="'+amplitude_active_config.amplitude_list_playing_index+'"]');
		if( current_song_duration != null ){
			if( !isNaN(amplitude_song_duration_minutes) ){
				current_song_duration.innerHTML = amplitude_song_duration_minutes + ":" + amplitude_song_duration_seconds;
			}
		}
	}


	if( amplitude_active_config.amplitude_after_time_update_callback ){
		var amplitude_after_time_update_callback_function = window[amplitude_active_config.amplitude_after_time_update_callback];
		amplitude_after_time_update_callback_function();
	}
}

/*
|--------------------------------------------------------------------------
| Amplitude Volume Update
|--------------------------------------------------------------------------
| Updates the volume to a number passed in
*/

function amplitude_volume_update( number ){
	if( amplitude_active_config.amplitude_before_volume_change_callback ){
		var amplitude_before_volume_change_callback_function = window[amplitude_active_config.amplitude_before_volume_change_callback];
		amplitude_before_volume_change_callback_function();
	}

	amplitude_active_config.amplitude_active_song.volume = number / 100;

	amplitude_active_config.amplitude_volume = number / 100;

	if( amplitude_active_config.amplitude_after_volume_change_callback ){
		var amplitude_after_volume_change_callback_function = window[amplitude_active_config.amplitude_after_volume_change_callback];
		amplitude_after_volume_change_callback_function();
	}
}

/*
|--------------------------------------------------------------------------
| Amplitude Volume Update
|--------------------------------------------------------------------------
| Changes the volume up or down a specific number
*/

function amplitude_change_volume( direction ){

	if( amplitude_active_config.amplitude_volume >= 0 && direction == "down" ){
		if( ( ( amplitude_active_config.amplitude_volume * 100 ) - amplitude_active_config.amplitude_volume_down_amount ) > 0 ){
			amplitude_volume_update( ( ( amplitude_active_config.amplitude_volume * 100 ) - amplitude_active_config.amplitude_volume_down_amount ) );
		}else{
			amplitude_volume_update( 0 );
		}
	}

	if( amplitude_active_config.amplitude_volume <= 1 && direction == "up" ){
		if( ( ( amplitude_active_config.amplitude_volume * 100 ) + amplitude_active_config.amplitude_volume_up_amount ) < 100 ){
			amplitude_volume_update( ( ( amplitude_active_config.amplitude_volume * 100 ) + amplitude_active_config.amplitude_volume_up_amount ) );
		}else{
			amplitude_volume_update( 100 );
		}
	}

	if( document.getElementById('amplitude-volume-slider')){
		document.getElementById('amplitude-volume-slider').value = ( amplitude_active_config.amplitude_volume * 100 );
	}

}

/*
|--------------------------------------------------------------------------
| Amplitude Set Active Song Information
|--------------------------------------------------------------------------
| Sets the active song information to be accessed by the users
*/
function amplitude_set_active_song_information( song ){
	if( amplitude_active_config.amplitude_before_song_information_set_callback ){
		var amplitude_before_song_information_set_callback_function = window[amplitude_active_config.amplitude_before_song_information_set_callback];
		amplitude_before_song_information_set_callback_function();
	}

	if( song.name != 'undefined' ){
		amplitude_active_config.amplitude_active_song_information.song_title = song.name;
	}else{
		amplitude_active_config.amplitude_active_song_information.song_title = '';
	}

	if( song.aritst != 'undefined' ){
		amplitude_active_config.amplitude_active_song_information.artist = song.artist;
	}else{
		amplitude_active_config.amplitude_active_song_information.artist = '';
	}

	if( song.cover_art_url != 'undefined' ){
		amplitude_active_config.amplitude_active_song_information.cover_art_url = song.cover_art_url;
	}else{
		amplitude_active_config.amplitude_active_song_information.cover_art_url = '';
	}

	if( song.album != 'undefined' ){
		amplitude_active_config.amplitude_active_song_information.album = song.album;
	}else{
		amplitude_active_config.amplitude_active_song_information.album = '';
	}

	if( song.live != 'undefined' ){
		amplitude_active_config.amplitude_active_song_information.live = song.live;
	}else{
		amplitude_active_config.amplitude_active_song_information.live = false;
	}

	if( song.url != 'undefined' ){
		amplitude_active_config.amplitude_active_song_information.url = song.url;
	}else{
		amplitude_active_config.amplitude_active_song_information.url = '';
	}

	if( song.visual_id != 'undefined' ){
		amplitude_active_config.amplitude_active_song_information.visual_id = song.visual_id;
	}else{
		amplitude_active_config.amplitude_active_song_information.visual_id = '';
	}

	amplitude_active_song_information = amplitude_active_config.amplitude_active_song_information;

	if( amplitude_active_config.amplitude_after_song_information_set_callback ){
		var amplitude_after_song_information_set_callback_function = window[amplitude_active_config.amplitude_after_song_information_set_callback];
		amplitude_after_song_information_set_callback_function();
	}
}

/*
|--------------------------------------------------------------------------
| Amplitude Set Location
|--------------------------------------------------------------------------
| Sets the location of the song based off of the location of the slider.
*/
function amplitude_set_song_position( value ){
	amplitude_active_config.amplitude_active_song.currentTime = amplitude_active_config.amplitude_active_song.duration * ( value / 100 );
}


/*
|--------------------------------------------------------------------------
| Amplitude Mute
|--------------------------------------------------------------------------
| Mutes the audio
| 
*/
function amplitude_mute(){
	if( amplitude_active_config.amplitude_before_mute_callback ){
		var amplitude_before_mute_callback_function = window[amplitude_active_config.amplitude_before_mute_callback];
		amplitude_before_mute_callback_function();
	}

	if( amplitude_active_config.amplitude_volume == 0){
		amplitude_active_config.amplitude_volume = amplitude_active_config.amplitude_pre_mute_volume;
	}else{
		amplitude_active_config.amplitude_pre_mute_volume = amplitude_active_config.amplitude_volume;
		amplitude_active_config.amplitude_volume = 0;
	}

	amplitude_volume_update( amplitude_active_config.amplitude_volume * 100 );
	if( document.getElementById('amplitude-volume-slider')){
		document.getElementById('amplitude-volume-slider').value = ( amplitude_active_config.amplitude_volume * 100 );
	}

	if( amplitude_active_config.amplitude_after_mute_callback ){
		var amplitude_after_mute_callback_function = window[amplitude_active_config.amplitude_after_mute_callback];
		amplitude_after_mute_callback_function();
	}
}

/*
|--------------------------------------------------------------------------
| Amplitude Set Song Info
|--------------------------------------------------------------------------
| Sets the song info from the amplitude_active_song_information array so it can be 
| displayed when the song is changed.
| 
*/
function amplitude_set_song_info() {
	//Sets the information regarding the song playing.
	if(document.getElementById('amplitude-now-playing-artist')){
		document.getElementById('amplitude-now-playing-artist').innerHTML = amplitude_active_config.amplitude_active_song_information.artist;
	}

	if(document.getElementById('amplitude-now-playing-title')){
		document.getElementById('amplitude-now-playing-title').innerHTML = amplitude_active_config.amplitude_active_song_information.song_title;
	}

	if(document.getElementById('amplitude-now-playing-album')){
		document.getElementById('amplitude-now-playing-album').innerHTML = amplitude_active_config.amplitude_active_song_information.album;
	}
	
	//Add Default image
	if(document.getElementById('amplitude-album-art')){
		if( amplitude_active_config.amplitude_active_song_information.cover_art_url != null){
			document.getElementById('amplitude-album-art').innerHTML ='<img src="'+amplitude_active_config.amplitude_active_song_information.cover_art_url+'" class="amplitude-album-art-image"/>';
		}
	}

	var current_now_playing_item = document.getElementsByClassName('amplitude-now-playing');

	if( current_now_playing_item.length > 0 ){
		current_now_playing_item[0].classList.remove('amplitude-now-playing');
	}

	if( amplitude_active_config.amplitude_active_song_information.visual_id != undefined ){
		if( document.getElementById( amplitude_active_config.amplitude_active_song_information.visual_id ) ){
			document.getElementById( amplitude_active_config.amplitude_active_song_information.visual_id ).classList.add('amplitude-now-playing');
		}
	}
}


/*
|--------------------------------------------------------------------------
| Amplitude Next Song
|--------------------------------------------------------------------------
| Handles next song click.
| 
*/
function amplitude_next_song() {
	if( amplitude_active_config.amplitude_before_next_callback ){
		var amplitude_before_next_callback_function = window[amplitude_active_config.amplitude_before_next_callback];
		amplitude_before_next_callback_function();
	}
	//If ths shuffle is activated, then go to next song in the shuffle array. Otherwise go down the playlist.
	if( amplitude_active_config.amplitude_shuffle ){
		if( typeof amplitude_active_config.amplitude_shuffle_list[ parseInt( amplitude_active_config.amplitude_playlist_index ) + 1 ] != 'undefined' ){
			amplitude_active_config.amplitude_active_song.src = amplitude_active_config.amplitude_shuffle_list[ parseInt( amplitude_active_config.amplitude_playlist_index ) + 1 ].url;
			amplitude_active_config.amplitude_list_playing_index = amplitude_active_config.amplitude_shuffle_list[ parseInt( amplitude_active_config.amplitude_playlist_index ) + 1 ].original;
			amplitude_active_config.amplitude_playlist_index = parseInt( amplitude_active_config.amplitude_playlist_index ) + 1;

		}else{
			amplitude_active_config.amplitude_active_song.src = amplitude_active_config.amplitude_shuffle_list[0].url;
			amplitude_active_config.amplitude_playlist_index = 0;

			amplitude_active_config.amplitude_list_playing_index = amplitude_active_config.amplitude_shuffle_list[0].original;
		}

		amplitude_set_active_song_information( amplitude_active_config.amplitude_shuffle_list[ parseInt( amplitude_active_config.amplitude_playlist_index ) ] );
		amplitude_play_song();
	}else{
		if ( typeof amplitude_active_config.amplitude_songs[ parseInt( amplitude_active_config.amplitude_playlist_index ) + 1 ] != 'undefined' ) {
			amplitude_active_config.amplitude_active_song.src = amplitude_active_config.amplitude_songs[ parseInt( amplitude_active_config.amplitude_playlist_index ) + 1 ].url;
			amplitude_active_config.amplitude_playlist_index = parseInt( amplitude_active_config.amplitude_playlist_index ) + 1;
		}else{
			amplitude_active_config.amplitude_active_song.src = amplitude_active_config.amplitude_songs[0].url;
			amplitude_active_config.amplitude_playlist_index = 0;
		}

		amplitude_set_active_song_information( amplitude_active_config.amplitude_songs[ parseInt( amplitude_active_config.amplitude_playlist_index ) ] );
		amplitude_play_song();


		amplitude_active_config.amplitude_list_playing_index = parseInt( amplitude_active_config.amplitude_playlist_index );
	}


	amplitude_set_play_pause();
	amplitude_set_playlist_play_pause();

	if( amplitude_active_config.amplitude_after_next_callback ){
		var amplitude_after_next_callback_function = window[amplitude_active_config.amplitude_after_next_callback];
		amplitude_after_next_callback_function();
	}
}

/*
|--------------------------------------------------------------------------
| Amplitude Previous Song
|--------------------------------------------------------------------------
| Handles previous song click.
| 
*/
function amplitude_previous_song() {
	if( amplitude_active_config.amplitude_before_prev_callback ){
		var amplitude_before_prev_callback_function = window[amplitude_active_config.amplitude_before_prev_callback];
		amplitude_before_prev_callback_function();
	}
	//If the shuffle is activated, then go to the previous song in the shuffle array.  Otherwise go back in the playlist.
	if( amplitude_active_config.amplitude_shuffle ){
		if( typeof amplitude_active_config.amplitude_shuffle_list[ parseInt( amplitude_active_config.amplitude_playlist_index ) - 1 ] != 'undefined' ){
			amplitude_active_config.amplitude_active_song.src = amplitude_active_config.amplitude_shuffle_list[ parseInt( amplitude_active_config.amplitude_playlist_index ) - 1 ].url;
			amplitude_active_config.amplitude_list_playing_index = amplitude_active_config.amplitude_shuffle_list[ parseInt( amplitude_active_config.amplitude_playlist_index ) - 1 ].original;
			amplitude_active_config.amplitude_playlist_index = ( parseInt( amplitude_active_config.amplitude_playlist_index ) - 1 );
		}else{
			amplitude_active_config.amplitude_active_song.src = amplitude_active_config.amplitude_shuffle_list[ amplitude_active_config.amplitude_shuffle_list.length - 1 ].url;
			amplitude_active_config.amplitude_playlist_index = ( amplitude_active_config.amplitude_shuffle_list.length - 1 );

			amplitude_active_config.amplitude_list_playing_index = amplitude_active_config.amplitude_shuffle_list[( amplitude_active_config.amplitude_shuffle_list.length - 1 )].original;
		}
		amplitude_set_active_song_information( amplitude_active_config.amplitude_shuffle_list[ parseInt( amplitude_active_config.amplitude_playlist_index ) ] );
		amplitude_play_song();
	}else{
		if ( typeof amplitude_active_config.amplitude_songs[ parseInt( amplitude_active_config.amplitude_playlist_index ) - 1 ] != 'undefined' ) {
			amplitude_active_config.amplitude_active_song.src = amplitude_active_config.amplitude_songs[ parseInt( amplitude_active_config.amplitude_playlist_index ) - 1 ].url;
			amplitude_active_config.amplitude_playlist_index = ( parseInt( amplitude_active_config.amplitude_playlist_index ) - 1 );
		}else{
			amplitude_active_config.amplitude_active_song.src = amplitude_active_config.amplitude_songs[ amplitude_active_config.amplitude_songs.length - 1].url;
			amplitude_active_config.amplitude_playlist_index = ( amplitude_active_config.amplitude_songs.length - 1 );
		}

		amplitude_set_active_song_information( amplitude_active_config.amplitude_songs[ parseInt( amplitude_active_config.amplitude_playlist_index ) ] );
		amplitude_play_song();

		amplitude_active_config.amplitude_list_playing_index = parseInt( amplitude_active_config.amplitude_playlist_index );
	}
	
	
	amplitude_set_play_pause();
	amplitude_set_playlist_play_pause();

	if( amplitude_active_config.amplitude_after_prev_callback ){
		var amplitude_after_prev_callback_function = window[amplitude_active_config.amplitude_after_prev_callback];
		amplitude_after_prev_callback_function();
	}
}

/*
|--------------------------------------------------------------------------
| Amplitude Set Playlist Play Pause
|--------------------------------------------------------------------------
| After next or previous, we need to visually update the playlist display
| accordingly.
| 
*/
function amplitude_set_playlist_play_pause(){
	var amplitude_play_pause_classes = document.getElementsByClassName("amplitude-play-pause");

	for( var i = 0; i < amplitude_play_pause_classes.length; i++ ){
    	var amplitude_play_pause_button_new_class = ' amplitude-list-paused';

		amplitude_play_pause_classes[i].className = amplitude_play_pause_classes[i].className.replace('amplitude-list-playing', '');

		amplitude_play_pause_classes[i].className = amplitude_play_pause_classes[i].className.replace(amplitude_play_pause_button_new_class, '');
		amplitude_play_pause_classes[i].className = amplitude_play_pause_classes[i].className + amplitude_play_pause_button_new_class;
    }

	var current_now_playing_list_item = document.querySelector('[amplitude-song-index="'+amplitude_active_config.amplitude_list_playing_index+'"]');

	if( current_now_playing_list_item != null ){
		current_now_playing_list_item.classList.add('amplitude-list-playing');
		current_now_playing_list_item.classList.remove('amplitude-list-paused');
	}
}

/*
|--------------------------------------------------------------------------
| Amplitude Set Play Pause
|--------------------------------------------------------------------------
| After next or previous, we need to visually update the play pause display
| 
*/
function amplitude_set_play_pause(){
	var play_pause_button = document.getElementById('amplitude-play-pause');

	if( play_pause_button != undefined ){
		if ( amplitude_active_config.amplitude_active_song.paused ){
			var amplitude_play_pause_button_new_class = ' amplitude-paused';

			play_pause_button.className = play_pause_button.className.replace('amplitude-playing', '');

			play_pause_button.className = play_pause_button.className.replace(amplitude_play_pause_button_new_class, '');
			play_pause_button.className = play_pause_button.className + amplitude_play_pause_button_new_class;
		}else{

			var amplitude_play_pause_button_new_class = ' amplitude-playing';

			play_pause_button.className = play_pause_button.className.replace('amplitude-paused', '');

			play_pause_button.className = play_pause_button.className.replace(amplitude_play_pause_button_new_class, '');
			play_pause_button.className = play_pause_button.className + amplitude_play_pause_button_new_class;		
		} 
	}
}
/*
|--------------------------------------------------------------------------
| Amplitude Shuffle Playlist
|--------------------------------------------------------------------------
| Handles the shuffling function.
| 
*/
function amplitude_shuffle_playlist(){
	//If the shuffle button is activated when clicked, turn it off.
	if( amplitude_active_config.amplitude_shuffle ){
		amplitude_active_config.amplitude_shuffle = false;
		amplitude_active_config.amplitude_shuffle_list = {};
		
	}else{
		amplitude_active_config.amplitude_shuffle = true;
		amplitude_shuffle_songs();
	}
}

/*
|--------------------------------------------------------------------------
| Shuffle Songs
|--------------------------------------------------------------------------
| Shuffles songs.
| Based off of: http://www.codinghorror.com/blog/2007/12/the-danger-of-naivete.html
| 
*/
function amplitude_shuffle_songs(){
	if( amplitude_active_config.amplitude_before_shuffle_callback ){
		var amplitude_before_shuffle_callback_function = window[amplitude_active_config.amplitude_before_shuffle_callback];
		amplitude_before_shuffle_callback_function();
	}
	var amplitude_shuffle_playlist_temp = new Array( amplitude_active_config.amplitude_songs.length );

	for ( i = 0; i < amplitude_active_config.amplitude_songs.length; i++ ) {
		amplitude_shuffle_playlist_temp[i] = amplitude_active_config.amplitude_songs[i];
		amplitude_shuffle_playlist_temp[i]['original'] = i;
	}

	for ( i = amplitude_active_config.amplitude_songs.length - 1; i > 0; i-- ){
		var amplitude_rand_num = Math.floor( ( Math.random() * amplitude_active_config.amplitude_songs.length ) + 1 );
		amplitude_shuffle_swap( amplitude_shuffle_playlist_temp, i, amplitude_rand_num - 1 );
	}

	amplitude_active_config.amplitude_shuffle_list = amplitude_shuffle_playlist_temp;

	if( amplitude_active_config.amplitude_after_shuffle_callback ){
		var amplitude_after_shuffle_callback_function = window[amplitude_active_config.amplitude_after_shuffle_callback];
		amplitude_after_shuffle_callback_function();
	}
}

/*
|--------------------------------------------------------------------------
| Shuffle Swap
|--------------------------------------------------------------------------
| Swaps out certain array indexes.
| Helper for the shuffle_songs function
| 
*/
function amplitude_shuffle_swap(shuffle_list, original, random) {
	var temp = shuffle_list[ original ];
	shuffle_list[ original ] = shuffle_list[ random ];
	shuffle_list[ random ] = temp;
}

/*
|--------------------------------------------------------------------------
| Binds Time
|--------------------------------------------------------------------------
| When the audio track time changes, the time elements get updated.
| 
*/
function amplitude_bind_time_update(){
	amplitude_active_config.amplitude_active_song.addEventListener('timeupdate', function(){
		amplitude_update_time();
	});
}


/*
|--------------------------------------------------------------------------
| Prepares list play pause
|--------------------------------------------------------------------------
| Prepares an item out of a list to be played. Fired from a class instead of
| an ID
| 
*/
function amplitude_prepare_list_play_pause( index ){
	if( index != amplitude_active_config.amplitude_list_playing_index ){
		amplitude_active_config.amplitude_active_song.src = amplitude_active_config.amplitude_songs[ index ].url;
		amplitude_set_active_song_information( amplitude_active_config.amplitude_songs[ index ] );
	}

	amplitude_active_config.amplitude_list_playing_index = index;
	
	if( amplitude_active_config.amplitude_active_song.paused ){
		amplitude_play_song();
		if( document.getElementById('amplitude-play-pause') ){
			var amplitude_play_pause_button_new_class = 'amplitude-playing';

			document.getElementById('amplitude-play-pause').className = document.getElementById('amplitude-play-pause').className.replace('amplitude-paused', '');

			document.getElementById('amplitude-play-pause').className = document.getElementById('amplitude-play-pause').className.replace(amplitude_play_pause_button_new_class, '');
			document.getElementById('amplitude-play-pause').className = document.getElementById('amplitude-play-pause').className + amplitude_play_pause_button_new_class;
		}
	}else{
		amplitude_pause_song();
		if( document.getElementById('amplitude-play-pause') ){
			var amplitude_play_pause_button_new_class = 'amplitude-paused';

			document.getElementById('amplitude-play-pause').className = document.getElementById('amplitude-play-pause').className.replace('amplitude-playing', '');

			document.getElementById('amplitude-play-pause').className = document.getElementById('amplitude-play-pause').className.replace(amplitude_play_pause_button_new_class, '');
			document.getElementById('amplitude-play-pause').className = document.getElementById('amplitude-play-pause').className + amplitude_play_pause_button_new_class;
		}
	}
}

/*
|--------------------------------------------------------------------------
| Add Song
|--------------------------------------------------------------------------
| Dynamically adds a song to the playlist or song list.
| 
*/
function amplitude_add_song( song ){
	amplitude_active_config.amplitude_songs.push( song );
	return amplitude_active_config.amplitude_songs.length - 1;
}

/*
|--------------------------------------------------------------------------
| Bind Song Additions
|--------------------------------------------------------------------------
| Called when there is a node inserted into the document. If it's not
| an amplitude album art image (the only other time amplitude inserts
| into the DOM), then rebind the classes for play and pause and song sliders.
| We remove any existing listeners first so everything is updated.
| 
*/
function amplitude_bind_song_additions(){
	document.addEventListener('DOMNodeInserted', function( e ){

		if( e.target.classList != undefined && e.target.classList[0] != 'amplitude-album-art-image' ){
			var amplitude_play_pause_classes = document.getElementsByClassName("amplitude-play-pause");

	  		for( var i = 0; i < amplitude_play_pause_classes.length; i++ ){
	  			if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
	  				amplitude_play_pause_classes[i].removeEventListener('touchstart', amplitude_handle_play_pause_classes );

	        		amplitude_play_pause_classes[i].addEventListener('touchstart', amplitude_handle_play_pause_classes );
	  			}else{
	  				amplitude_play_pause_classes[i].removeEventListener('click', amplitude_handle_play_pause_classes );

	        		amplitude_play_pause_classes[i].addEventListener('click', amplitude_handle_play_pause_classes );
	        	}
			}

			var amplitude_song_sliders = document.getElementsByClassName("amplitude-song-slider");

		    for( var i = 0; i < amplitude_song_sliders.length; i++ ){
		    	amplitude_song_sliders[i].removeEventListener('input', amplitude_handle_song_sliders );
		    	amplitude_song_sliders[i].addEventListener('input', amplitude_handle_song_sliders );
		    }

		    //Binds multiple mute buttons for multiple song integrations
		    var amplitude_mute_buttons = document.getElementsByClassName("amplitude-mute");

		    for( var i = 0; i < amplitude_mute_buttons.length; i++ ){
		    	amplitude_mute_buttons[i].removeEventListener('input', amplitude_handle_mute_classes );
		    	amplitude_mute_buttons[i].addEventListener('click', amplitude_handle_mute_classes );
		    }
		}
	});
	
}

/*
|--------------------------------------------------------------------------
| Handle Play Pause classes
|--------------------------------------------------------------------------
| When a play pause class is clicked, it determines whether the song should
| play or pause and which elements to update.
| 
*/
function amplitude_handle_play_pause_classes( ){
	var amplitude_play_pause_classes = document.getElementsByClassName("amplitude-play-pause");
			        	
	//If the songs change then we set all visual elements to pause.
	if( this.getAttribute('amplitude-song-index') != amplitude_active_config.amplitude_list_playing_index ){
		for( var i = 0; i < amplitude_play_pause_classes.length; i++ ){
	    	var amplitude_play_pause_button_new_class = ' amplitude-list-paused';

			amplitude_play_pause_classes[i].className = amplitude_play_pause_classes[i].className.replace(' amplitude-list-playing', '');

			amplitude_play_pause_classes[i].className = amplitude_play_pause_classes[i].className.replace(amplitude_play_pause_button_new_class, '');
			amplitude_play_pause_classes[i].className = amplitude_play_pause_classes[i].className + amplitude_play_pause_button_new_class;
	    }
	    //Force set new click to playing. All other classes will be paused.
	    var amplitude_play_pause_button_new_class = ' amplitude-list-playing';

		this.className = this.className.replace(' amplitude-list-paused', '');

		this.className = this.className.replace(amplitude_play_pause_button_new_class, '');
		this.className = this.className + amplitude_play_pause_button_new_class;
	}else{

	    if( amplitude_active_config.amplitude_active_song.paused ){
			var amplitude_play_pause_button_new_class = ' amplitude-list-playing';

			this.className = this.className.replace(' amplitude-list-paused', '');

			this.className = this.className.replace(amplitude_play_pause_button_new_class, '');
			this.className = this.className + amplitude_play_pause_button_new_class;
		}else{
			var amplitude_play_pause_button_new_class = ' amplitude-list-paused';

			this.className = this.className.replace(' amplitude-list-playing', '');

			this.className = this.className.replace(amplitude_play_pause_button_new_class, '');
			this.className = this.className + amplitude_play_pause_button_new_class;
		}
	}
	amplitude_prepare_list_play_pause( this.getAttribute('amplitude-song-index') );
}
/*
|--------------------------------------------------------------------------
| Handle Mute classes
|--------------------------------------------------------------------------
| When a mute button is clicked, handle mute functionality
| 
*/
function amplitude_handle_mute_classes(){
	if( amplitude_active_config.amplitude_before_mute_callback ){
		var amplitude_before_mute_callback_function = window[amplitude_active_config.amplitude_before_mute_callback];
		amplitude_before_mute_callback_function();
	}

	if( amplitude_active_config.amplitude_volume == 0){
		amplitude_active_config.amplitude_volume = amplitude_active_config.amplitude_pre_mute_volume;
	}else{
		amplitude_active_config.amplitude_pre_mute_volume = amplitude_active_config.amplitude_volume;
		amplitude_active_config.amplitude_volume = 0;
	}

	amplitude_volume_update( amplitude_active_config.amplitude_volume * 100 );
	if( document.getElementById('amplitude-volume-slider')){
		document.getElementById('amplitude-volume-slider').value = ( amplitude_active_config.amplitude_volume * 100 );
	}

	if( amplitude_active_config.amplitude_after_mute_callback ){
		var amplitude_after_mute_callback_function = window[amplitude_active_config.amplitude_after_mute_callback];
		amplitude_after_mute_callback_function();
	}
}
/*
|--------------------------------------------------------------------------
| Handle Song Sliders
|--------------------------------------------------------------------------
| Sets the song position based off of which track is playing and adjusted.
| 
*/
function amplitude_handle_song_sliders(){
	amplitude_set_song_position( this.value );
}

/*
|--------------------------------------------------------------------------
| Disconnects from a live stream
|--------------------------------------------------------------------------
| By disconnecting from the live stream (called from stop) the buffering
| stops so the user doesn't download an insane amount of data if they aren't
| listening to the live stream.
| Thanks to help from: http://blog.pearce.org.nz/2010/11/how-to-stop-video-or-audio-element.html
| 
*/

function amplitude_disconnect_stream(){
	amplitude_active_config.amplitude_active_song.pause();
	amplitude_active_config.amplitude_active_song.src = ""; 
	amplitude_active_config.amplitude_active_song.load(); 
}
/*
|--------------------------------------------------------------------------
| Reconnect from a live stream
|--------------------------------------------------------------------------
| Reconnects to a live stream when a user clicks play. This is so the user
| doesn't get a load of buffering when they aren't listening. Reconnects
| when the user clicks play.
| 
*/
function amplitude_reconnect_stream(){
	amplitude_active_config.amplitude_active_song.src = amplitude_active_config.amplitude_active_song_information.url; 
	amplitude_active_config.amplitude_active_song.load();
}

/*
function compareStrings(a, b) {
	// Assuming you want case-insensitive comparison
	a = a.toLowerCase();
	b = b.toLowerCase();

	return (a < b) ? -1 : (a > b) ? 1 : 0;
}



function amplitude_live_callback_hooks(){
if(typeof amplitude_config != 'undefined'){
if(typeof amplitude_config.amplitude_live_checkup != 'undefined'){
if((typeof amplitude_config.amplitude_live_checkup.checkup_interval != 'undefined') && (typeof amplitude_config.amplitude_live_checkup.checkup_function != 'undefined') ) {
setInterval(function(){
var amplitude_checkup_function = window[amplitude_config.amplitude_live_checkup.checkup_function];
amplitude_checkup_function(); 
}, amplitude_config.amplitude_live_checkup.checkup_interval);
}
}
}
}
*/
