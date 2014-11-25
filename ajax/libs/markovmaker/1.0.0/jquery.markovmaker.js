/*! markovmaker - v1.0.0 - 2014-11-24
* https://github.com/dshahin/markovmaker
* Copyright (c) 2014 dan shahin; Licensed MIT */
(function ($) {
  var terminals = {};
  var startwords = [];
  var wordstats = {};
  var sentences = [];

  // Static method.
  $.markovmaker = function (input,options) {
    // Override default options with passed-in options.
    options = $.extend({}, $.markovmaker.options, options);
    // Return the name of your plugin plus a punctuation character.
    var newString = markov(options,input);
    return newString ;
  };

  // Static method default options.
  $.markovmaker.options = {
    punctuation: '.',
    min_length : 2,
    punctuation_marks: /\.|\;|\?|\:|\n/,
    word_splitter: /\s/
  };

  function markov(options,input){
    //options = $.extend({}, $.markovmaker.options, options);
    terminals = {}; //properties are last words in sentences
    startwords = []; //values are first words in sentences
    wordstats = {}; // the markov chain 
    
    //split the input text into sentences
    sentences = input.split(options.punctuation_marks);
    //for each sentence
    for (var i = 0; i < sentences.length; i++) {
        //split sentence into words
        var words = sentences[i].split(options.word_splitter);
        //take note of last word in sentence
        terminals[words[words.length - 1]] = true;
        //take note of first word
        startwords.push(words[0]);
        //for each word
        for (var j = 0; j < words.length - 1; j++) {
            //build an object with word as property
            //pointing to an arry of words that come after it
            var thisWord = words[j],
                nextWord = words[j + 1];
            //optimization
            if(thisWord !== '' && nextWord !== null){
                if (!wordstats.hasOwnProperty(thisWord)) {
                    //first time we've seen this word
                    //create an array with the next word in it
                    wordstats[thisWord] = [nextWord];
                } else {
                    //not first time for this word
                    //push next word into existin array
                    wordstats[thisWord].push(nextWord);
                }
            }
        }
    }
    
    //add a period to end of sentence
    var output =  make_sentence(options.min_length) ;
    return output + options.punctuation;
  }

  //given an array, return a random element
  var choice = function (a) {
      var i = Math.floor(a.length * Math.random());
      return a[i];
  };

  var make_sentence = function (min_length) {
      //pick a random starting word
      var word = choice(startwords);
      //start a new sentence
      var sentence = [word];
      //pick our word from the stats object
      while (wordstats.hasOwnProperty(word)) {
          //get the array of words that follow this word
          var next_words = wordstats[word];
          //choose one randomly
          word = choice(next_words);
          //add to our sentence
          sentence.push(word);
          //check sentence length and if we are on a terminal word
          if (sentence.length > min_length && terminals.hasOwnProperty(word)){
              break;
          }
      }
      //if sentence is too short, try again
      if (sentence.length < min_length){
        return make_sentence(min_length);
      }
      //join the words with spaces
      return sentence.join(' ');
  };

}(jQuery));
