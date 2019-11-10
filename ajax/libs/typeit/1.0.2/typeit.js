/**
 * jQuery TypeIt
 * @author Alex MacArthur (http://macarthur.me)
 * @copyright 2015 Alex MacArthur
 * @description Types out a given string or strings.
 */

 (function($){

   // the actual jQuery function
   $.fn.typeIt = function(options){
     return this.each(function(){
       $(this).data("typeit", new $.fn.typeIt.typeItClass($(this), options));
     });
   };

   // create the class
   $.fn.typeIt.typeItClass = function(theElement, options){
    // plugin default settings
    this.defaults = {
       whatToType:'This is the default string. Please replace this string with your own.',
       typeSpeed: 200,
       lifeLike: false,
       showCursor: true,
       breakLines: true,
       breakWait: 500,
       delayStart: 100
     };

    this.dataDefaults = {
     whatToType : theElement.data('typeitWhattotype'),
     typeSpeed: theElement.data('typeitSpeed'),
     lifeLike: theElement.data('typeitLifelike'),
     showCursor: theElement.data('typeitShowcursor'),
     breakLines: theElement.data('typeitBreaklines'),
     breakWait: theElement.data('typeitBreakWait'),
     delayStart : theElement.data('typeitDelayStart')
    };

    this.theElement = theElement;
    this.settings = $.extend({}, this.defaults, options, this.dataDefaults);
    this.typeCount = 0;
    this.deleteCount = 0;
    this.stringCount = 0;
    this.stringPlaceCount = 0;
    this.phraseLength = 0;
    this.cursor = '';
    this.deleteTimeout = null;
    this.typeTimeout = null;

    this.init(theElement);
   };

   // create a new prototype
   var _proto = $.fn.typeIt.typeItClass.prototype;

   // initialize the plugin
   _proto.init = function(theElement){

     this.stringArray = this.settings.whatToType;
     // check if the value is an array or just a string
     if(Object.prototype.toString.call(this.stringArray) !== '[object Array]'){
       // since it's not already an array, turn it into one, since later functionality depends on it being one
       this.stringArray = '["' + this.stringArray + '"]';
       this.stringArray = JSON.parse(this.stringArray);
     }
     this.mergedStrings = this.stringArray.join('');
     this.stringLengths = {};
     this.phraseLength = this.stringLengths[this.stringCount];

     // get the string lengths and save to array
     for(j=0; j < this.stringArray.length; j++){
        this.stringLengths[j] = this.stringArray[j].length;
        theElement.append('<span class="ti-container" style="font-size:inherit;"></span>');
     }

     // if breakLines is false, then we for sure only need ONE ti-container even if there multiple strings, so make sure of that
     if(this.settings.breakLines === false) {
        theElement.find('.ti-container').remove();
        theElement.append('<span class="ti-container" style="font-size:inherit;"></span>');
     }

     theElement.css('display','inline-block');

     // start to type the string(s)
     if(this.settings.showCursor === true) {

      $(this.theElement).find('.ti-container:nth-child(1)').addClass('active-container').append('<span class="ti-letter" style="font-size: inherit;"><span class="ti-cursor">|</span></span>');
      setTimeout(function() {
        this.typeLoop();
      }.bind(this), this.settings.delayStart);
     } else {
        this.typeLoop();
     }

   };

   _proto.typeLoop = function(){

    // set the length of the phrase for this time around
    this.phraseLength = this.stringLengths[this.stringCount];

    // if settings say so, turn on the blinking cursor
    if(this.settings.showCursor === true && this.mergedStrings[this.typeCount+this.stringPlaceCount] != ' '){
      this.cursor = '<span class="ti-cursor">|</span>';
    } else {
      this.cursor = '';
    }

     // make it human-like if specified in the settings
    if(this.settings.lifeLike === true){
      this.delayTime = this.settings.typeSpeed*Math.random();
    } else {
      this.delayTime = this.settings.typeSpeed;
    }

    this.typeTimeout = setTimeout(function () {

      // append the string of letters to the respective .ti-container
      // use find() so that we select the class only for the element on which we're instantiated

      if(this.settings.breakLines === true) {
        $(this.theElement).find('.ti-container:nth-child(' + (this.stringCount + 1) + ')').addClass('active-container').append('<span class="ti-letter" style="font-size: inherit;">' + this.mergedStrings[this.typeCount+this.stringPlaceCount] + this.cursor + '</span>');
      } else {
        $(this.theElement).find('.ti-container').append('<span class="ti-letter" style="font-size: inherit;">' + this.mergedStrings[this.typeCount+this.stringPlaceCount] + this.cursor + '</span>');
      }

      this.typeCount++;
      if (this.typeCount < this.phraseLength) {
        // type out the string
        this.typeLoop(this.stringLengths[this.stringCount]);
        // if there are no more characters to print and there is more than one string to be typed, delete the string just printed
      } else if(this.stringArray.length > 1) {
        // update the this.stringPlaceCount so that we're appending starting at the correct spot in the merged string
        this.stringPlaceCount = this.stringPlaceCount + this.phraseLength;
        // reset this.typeCount in case this function needs to be reused
        this.typeCount = 0;
        // if we're not on the last string, then continue to delete, unless the user wants to break lines
        if((this.stringCount+1 < this.stringArray.length) && this.settings.breakLines === false){

          setTimeout(function(){
            this.deleteLoop();
          }.bind(this), this.settings.breakWait);

        // if breakLines is true and we still have strings left to type, break it and continue
        } else if (this.stringCount+1 < this.stringArray.length && this.settings.breakLines === true){
          this.stringCount++;

          setTimeout(function(){

            // remove any 'active-container' classes fromt the elements
            $(this.theElement).find('.ti-container').removeClass('active-container');
            
            // give 'active-container' class to next container, so the cursor can start blinking
            $(this.theElement).find('.ti-container:nth-child(' + (this.stringCount + 1) + ')').addClass('active-container').append('<span class="ti-letter">' + this.cursor + '</span>');

            // after another slight delay, continue typing the next string
            setTimeout(function(){
              this.typeLoop();
            }.bind(this), this.settings.breakWait);

          }.bind(this), this.settings.breakWait);

        }
      }
    }.bind(this), this.delayTime);

   };

   _proto.deleteLoop = function() {

    this.deleteTimeout = setTimeout(function () {
       // find the .ti-container and delete the last letter in that parent over and over again
       $(this.theElement).find('.ti-container').find('.ti-letter:last-child').remove();
       // if there are still characters in the string, run the function again
       this.deleteCount++;
       if (this.deleteCount < this.phraseLength) {
         this.deleteLoop();
       } else if(this.stringArray[this.stringCount+1] !== undefined){
         this.deleteCount = 0;
         this.stringCount++;
         this.typeLoop();
       }
       // make backspacing much quicker by dividing delayTime (arbitrarily) by three
     }.bind(this), this.delayTime/3);
   };

  // stop the plugin from typing or deleting stuff whenever you
   _proto.stopTyping = function() {
      clearTimeout(this.typeTimeout);
      clearTimeout(this.deleteTimeout);
   };

 }(jQuery));
