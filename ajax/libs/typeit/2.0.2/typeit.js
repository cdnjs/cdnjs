/**
 * jQuery TypeIt
 * @author Alex MacArthur (http://macarthur.me)
 * @version 2.0.2
 * @copyright 2016 Alex MacArthur
 * @description Types out a given string or strings.
 */

 (function($, undefined){

  var proto;

  // the actual jQuery function
  $.fn.typeIt = function(options, callback){
  // now call a callback function
   return this.each(function(){
     $(this).data("typeit", new $.fn.typeIt.typeItClass($(this), options, callback));
   });
  };

 // create the class
$.fn.typeIt.typeItClass = function(theElement, options, callback){

  /* VARIABLES THAT WON'T CHANGE BETWEEN RUNS */

  // default settings
  this.defaults = {
    whatToType:'You probably want to use your own string.',
    typeSpeed: 100,
    lifeLike: true,
    showCursor: true,
    breakLines: true,
    breakDelay: 750,
    startDelay: 250,
    loop: false,
    loopDelay: 750
   };

  // data-typeit-* settings
  this.dataAttDefaults = {
   whatToType: theElement.data('typeitWhattotype'),
   typeSpeed: theElement.data('typeitTypespeed'),
   lifeLike: theElement.data('typeitLifelike'),
   showCursor: theElement.data('typeitShowcursor'),
   breakLines: theElement.data('typeitBreaklines'),
   breakDelay: theElement.data('typeitBreakdelay'),
   startDelay: theElement.data('typeitStartdelay'),
   loop: theElement.data('typeitLoop'),
   loopDelay: theElement.data('typeitLoopdelay')
  };

  // the settings for the plugin instance
  this.settings = {};
  // merge settings into this.settings object
  $.extend(this.settings, this.defaults, options, this.dataAttDefaults);
  // the element that holds the text
  this.theElement = theElement;
  // callback function that executes after strings have been printed
  this.callback = callback;
  // let 'r rip
  this.init(options);
 };

 // create a new prototype
 _proto = $.fn.typeIt.typeItClass.prototype;

 _proto.init = function(options){

  // the place we're at in the big merged string
  this.stringPlaceCount = 0;
  // the length of the current string being handled
  this.phraseLength = 0;
  // array that holds whatToType string(s)
  this.stringArray = [];
  // the index of the string we're handling
  this.stringArrayIndex = 0;
  // the index of the character we're currently printing
  this.stringArrayCharacterIndex = 0;
  // hold where we need to replace characters because of HTML tags
  this.contentStartEnd = [];
  // the index for the string within an HTML tag
  this.contentStartEndIndex = 0;
  // the span of characters for the string inside an HTML tag
  this.contentStartEndSpan = 0;
  // holds whether we're currently printing inside HTML tags
  this.printingInTag = false;
  // the specific character we're currently appending
  this.characterToAppend = null;
  // the current ti-text-container we're dealing
  this.thisTiTextContainer = null;
  // the current string we're handling
  this.thisString = null;
  // the particular HTML tag we're handling
  this.thisTag = null;
  // array holding the length of each string
  this.stringLengths = [];
  // the string we're currently deleting
  this.stringToDelete = null;
  // the timeout responsible for typing/adding characters
  this.typeTimeout = null;
  // the timeout responsible for deleting characters
  this.deleteTimeout = null;
  // the span of the range a type speed is allowed to be randomized
  this.typeSpeedRangeSpan = null;
  // the minimum of a randomized type speed
  this.typeSpeedMin = null;
  // the maximum of a randomized type speed
  this.typeSpeedMax = null;


  // make sure the callback function is all good
  if(this.validateCallbackFunction() === false){ return false; }
  // string override
  this.testForElementStringOverride();
  // process the whatToType data to get it so we can use it
  this.processWhatToType();
  // add all the elements & classes we'll be needing
  this.setupDOMComponents();
  // start to type the string(s) after the specified delay
  setTimeout(function() {
    this.typeLoop();
  }.bind(this), this.settings.startDelay);

 };

 _proto.testForElementStringOverride = function() {
  // if there's a string already typed in the element, replace whatToType with it
  if(this.theElement.text().length > 0) {
    this.settings.whatToType = this.theElement.text().trim();
  }
  
 };

_proto.setupDOMComponents = function() {

  // clear out the element in case we're looping
  this.theElement.html('');

  // get the string lengths and save to array, set up ti-containers for each string
  for(j=0; j < this.stringArray.length; j++){
    this.stringLengths[j] = this.stringArray[j].length;
    // set up the number of ti-containers we'll need to hold the strings
    this.theElement.append('<span class="ti-container"><span class="ti-text-container ti-cursor"></span></span>');
  }

  // add .active-container to the first .ti-text-container so the cursor starts blinking before a string is printed
  this.theElement.find('.ti-container:first-child').find('.ti-text-container').addClass('active-container');

  // if breakLines is false, then we for sure only need ONE ti-container even if there multiple strings, so make sure of that
  if(this.settings.breakLines === false) {
    this.theElement.find('.ti-container').remove();
    this.theElement.append('<span class="ti-container"><span class="ti-text-container ti-cursor"></span></span>');
  }

  // if showCursor is false, then remove the ti-cursor class
  if(this.settings.showCursor === false) {
    this.theElement.find('.ti-text-container').removeClass('ti-cursor');
  }
 };

_proto.processWhatToType = function() {

  // check if the value is an array or just a string
  if(Object.prototype.toString.call(this.settings.whatToType) !== '[object Array]'){

    // since it's not already an array, turn it into one, since later functionality depends on it being one
    this.stringArray = '["' + this.settings.whatToType + '"]';
    this.stringArray = JSON.parse(this.stringArray);

    // if it is an array, clone it 
  } else {

    // clone what to typed, so we don't modify the original strings in case we loop
    this.stringArrayTemp = $.extend( {}, this.settings.whatToType );
    // convert cloned object to array
    this.stringArrayTemp = $.map(this.stringArrayTemp, function(value, index) {
      return [value];
    });

    // get the right values and put into stringArray so it's formatted correctly for processing
    for(var h = 0; h < this.stringArrayTemp.length; h++) {
      this.stringArray.push(this.stringArrayTemp[h]);
    }
  }

  // turn each string into sub arrays
  for(var i = 0; i < this.stringArray.length; i++) {
    this.contentStartEnd = [];
    this.contentStartEndIndex = 0;
    this.contentStartEndSpan = 0;
    // turn each string into sub array
    this.stringArray[i] = this.stringArray[i].split('');
    // find the location of HTML tag
    for(var j = 0, subArray = this.stringArray[i]; j < subArray.length; j++) {
      if(subArray[j] === '<') {
        this.contentStartEnd[this.contentStartEndIndex] = [];
        this.contentStartEnd[this.contentStartEndIndex][0] = j;
      }
      if(subArray[j] === '>') {
        this.contentStartEnd[this.contentStartEndIndex][1] = j;
        this.contentStartEndIndex++;
      }
    }

    // merge individual tag characters into single array index
    for(var positionIndex = 0; positionIndex < this.contentStartEnd.length; positionIndex++) {

      // move those tag pieces into a single array item
      for (var l = this.contentStartEnd[positionIndex][0]; l < this.contentStartEnd[positionIndex][1]; l++) {
        this.stringArray[i][this.contentStartEnd[positionIndex][0]] = this.stringArray[i][this.contentStartEnd[positionIndex][0]] + this.stringArray[i][l+1];
      }
    }

    // cut array items based on the start/end positions we know, but move back the start point each time by the number of items we previously removed
    for( var m = 0; m < this.contentStartEnd.length; m++ ) {

      var startPos = this.contentStartEnd[m][0]+1;
      this.stringArray[i].splice(startPos, this.contentStartEnd[m][1] - this.contentStartEnd[m][0]);
      var span = this.contentStartEnd[m][1] - this.contentStartEnd[m][0];

      // go through and update the start and positions by the span length we just cut
      for(var n = 0; n < this.contentStartEnd.length; n++) {
        this.contentStartEnd[n][0] = this.contentStartEnd[n][0] - span;
        this.contentStartEnd[n][1] = this.contentStartEnd[n][1] - span;
      }
    }
  }

};

_proto.validateCallbackFunction = function() {

  // if undefined, assign blank callback
  if(typeof this.callback === 'undefined') {
    this.callback = function(){return true;};
  }
  
 };

 _proto.randomizeTypeSpeed = function() {
    // make it human-like if specified in the settings
  if(this.settings.lifeLike === true){
    // set to 50% of the actual type speed, so the randomization goes no further than that ratio
    this.typeSpeedRangeSpan = this.settings.typeSpeed/2;
    this.typeSpeedMin = this.settings.typeSpeed-this.typeSpeedRangeSpan;
    this.typeSpeedMax = this.settings.typeSpeed+this.typeSpeedRangeSpan;
    this.delayTime = Math.abs(Math.random() * (this.typeSpeedMax - this.typeSpeedMin) + this.typeSpeedMin);
  } else {
    this.delayTime = this.settings.typeSpeed;
  }
 };

_proto.typeLoop = function(){

  // get this particular string we're printing
  this.thisString = this.stringArray[this.stringArrayIndex];
  // set the length of the current phrase being typed
  this.phraseLength = this.thisString.length;

  // start the typing timeout
  this.typeTimeout = setTimeout(function () {

    this.randomizeTypeSpeed();

    // the the specific character we're printing
    this.characterToAppend = this.stringArray[this.stringArrayIndex][this.stringArrayCharacterIndex];

    // if it's an HTML tag, do stuff
    if(this.characterToAppend.indexOf('<') !== -1 && this.characterToAppend.indexOf('</') === -1){
      this.contentStartEndIndex = 0;

      // get the start & end positions of the actual string within the HTML tags
      this.contentStartEnd[0] = this.stringArrayCharacterIndex + 1;
      for(var t = this.stringArrayCharacterIndex; t < this.thisString.length; t++){
        if(this.thisString[t].indexOf('</') !== -1) {
          // set the ending of the string segment in an HTML tag
          this.contentStartEnd[1] = t - 1;
          // as soon as we hit a match for a closing character
          break;
        }
      }
      this.contentStartEndSpan = this.contentStartEnd[1] - this.contentStartEnd[0];

      // create a DOM node from the string we get
      this.thisTag = $($.parseHTML(this.characterToAppend));
      // set the current character to append to the tag we just created, so that we can create it in the DOM
      this.characterToAppend = this.thisTag;
      // append the tag
      this.appendTheCharacter();
      // set this to true so we know we're currently printing inside an HTML tag
      this.printingInTag = true;

    }

    this.appendTheCharacter();

    this.stringArrayCharacterIndex++;

    // there are still characters to be typed, so repeat function
    if (this.stringArrayCharacterIndex < this.phraseLength) {

      this.typeLoop();

    // there are no more characters to print and there is more than one string to be typed, so delete the string just printed
    } else if(this.stringArray.length > 1) {

      // reset this.stringArrayCharacterIndex since we're done using it for this string
      this.stringArrayCharacterIndex = 0;

      // update the this.stringPlaceCount so that we're appending starting at the correct spot in the merged string
      this.stringPlaceCount = this.stringPlaceCount + this.phraseLength;

      // if the this.stringArrayIndex is the same as the number of strings we started with, we're done, so call the callback function
      if(this.stringArrayIndex + 1 === this.stringArray.length) {

        // multiple strings ending
        this.endOfStringsFork();

        // if we're not on the last string, then move on to to delete, unless the user wants to break lines
      } else if((this.stringArrayIndex + 1 < this.stringArray.length) && this.settings.breakLines === false){

        setTimeout(function(){
          this.deleteLoop();
        }.bind(this), this.settings.breakDelay);

      // if breakLines is true and we still have strings left to type, break it and continue with the next string
      } else if (this.stringArrayIndex + 1 < this.stringArray.length && this.settings.breakLines === true){
        // before starting the next string, make sure the index has been bumped up
        this.stringArrayIndex++;

        setTimeout(function(){

          // remove any 'active-container' classes fromt the elements
          this.theElement.find('.ti-text-container').removeClass('active-container');

          // give 'active-container' class to next container, so the cursor can start blinking
          this.theElement.find('.ti-text-container:eq('+ this.stringArrayIndex +')').addClass('active-container');

          // after another slight delay, continue typing the next string
          setTimeout(function(){
            this.typeLoop();
          }.bind(this), this.settings.breakDelay);

        }.bind(this), this.settings.breakDelay);

      }

      // since there are no more strings to be typed, we're done and can call the callback function
    } else {
      // single string ending
      this.endOfStringsFork();
    }

  }.bind(this), this.delayTime);

 };

 _proto.endOfStringsFork = function() {
  if(this.settings.loop === true){
    // delete the remaining string
    setTimeout(function(){
      this.deleteLoop();
    }.bind(this), this.settings.loopDelay);
  } else {
    this.callback();
  }
};

 _proto.appendTheCharacter = function() {
  // if breakLines is set to true, add the 'active-container' class to the next .ti-text-container in the list.
  if(this.settings.breakLines === true) {
    this.thisTiTextContainer = this.theElement.find('.ti-text-container:eq('+ this.stringArrayIndex +')');
    this.thisTiTextContainer.addClass('active-container');
  } else {
    this.thisTiTextContainer = this.theElement.find('.ti-text-container');
    this.thisTiTextContainer.addClass('active-container');
  }

  // append the character to the HTML tag if we're printing in a tag, or else just append the character
  this.appendToHTMLTag(function(){
      this.thisTiTextContainer.append(this.characterToAppend);
    }.bind(this));
};

_proto.appendToHTMLTag = function(notInTagFunction) {

  if(this.printingInTag === true) {
    // resave the character to append
    this.characterToAppend = this.thisString[this.contentStartEnd[0] + this.contentStartEndIndex];
    // append to the latest tag (the one we just printed) in the element
    $(this.thisTag, this.theElement).last().append(this.characterToAppend);
    // if we're at the end of the string segment, turn off printingInTag
    this.printingInTag = (this.contentStartEnd[1] === this.contentStartEnd[0] + this.contentStartEndIndex - 1) ? false : true;
    this.contentStartEndIndex++;
  } else {
    notInTagFunction();
  }
};

_proto.deleteLoop = function(undefined) {

  // set the current ti-text-container
  this.thisTiTextContainer = this.theElement.find('.ti-text-container');

  this.deleteTimeout = setTimeout(function () {

    // randomize the delete speed, if applicable
    this.randomizeTypeSpeed();

    // get the string
    this.stringToDelete = this.thisTiTextContainer.last().html();

    // convert to array
    this.arrayToDelete = (typeof this.arrayToDelete !== undefined) ? this.stringToDelete.split("") : [];

    // loop over array 
    for (var n = this.arrayToDelete.length-1; n > -1; n--) {

      // TAG HANDLING
      if(this.arrayToDelete[n] === '>') {

        // find the beginning tag piece
        for(var o = n-1; o > -1; o--) {

          // find the opening piece
          // o = position of opening piece
          if(this.arrayToDelete[o] === '<') {

            // if the next piece before it isn't an HTML tag, just delete the text in between
            if(this.arrayToDelete[o-1] !== '>') {
              // remove character right before HTML tag begins and escape the loop
              this.arrayToDelete.splice(o-1, 1);
              break;
            }
          }
        }
        break;
      } 
      // REGULAR CHARACTER HANDLING
      else {
        // remove the character and escape the loop
        this.arrayToDelete.splice(n, 1);
        break;
      }
    }

    // repopulate the element with the shortened string so it looks like it's being deleted
    this.thisTiTextContainer.last().html(this.arrayToDelete.join(''));

    // if nothing left, clear out the emtpy HTML tags
    if(this.thisTiTextContainer.last().text().length === 0){
      this.thisTiTextContainer.last().html('');
    } 

    // if characters are still in the string, run the function again
    if (this.thisTiTextContainer.last().text().length > 0) {
      this.deleteLoop();
      // if there are still strings in the array, go back to typing.
    } else if(this.stringArray[this.stringArrayIndex+1] !== undefined){
      this.stringArrayIndex++;
      this.typeLoop();

    // that was the last string in the array, so now just check if loop is enabled
    } else if (this.settings.loop === true){

      // if there are multiple strings that have been typed, remove the current one and repeat deleteLoop
      if(this.thisTiTextContainer.length > 1) {
        // remove the current container so we don't fill it with junk
        this.thisTiTextContainer.last().remove();
        // make sure the NEW last container has 'active-container' status
        // need to use find() again instead of stored selection because that stored selection is now outdated since we just removed a container
        this.theElement.find('.ti-text-container').last().addClass('active-container');
        this.deleteLoop();
      } else {
        // otherwise, re-run the whole thing again
        this.init();
      }

    }

    // make backspacing much quicker by dividing delayTime (arbitrarily) by three
  }.bind(this), this.delayTime/3);
};

  // stop the plugin from typing or deleting stuff whenever it's called
  _proto.stop = function() {
    clearTimeout(this.typeTimeout);
    clearTimeout(this.deleteTimeout);
  };

}(jQuery));
