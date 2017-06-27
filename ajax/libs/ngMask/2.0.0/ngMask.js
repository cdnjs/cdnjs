'use strict';

angular.module('ngMask', []);'use strict';

angular.module('ngMask')
  .directive('mask', ['$log', 'PatternService', 'SelectorService', function($log, PatternService, SelectorService){
    return {
      restrict: 'A',
      require: 'ngModel',
      compile: function($element, $attrs){ 
        return {
          post: function($scope, $element, $attrs, controller, transcludeFn){
            var patternService = PatternService.create(),
                patterns       = patternService.getPatterns(),
                mask           = patternService.generateMask($attrs.mask, $attrs.repeat),
                element        = $element,
                separators     = $attrs.clean === "true" ? patternService.generateSeparators(mask, patterns) : undefined;

            function parser(values) {
              if(!values){ return undefined; }

              var array_mask  = mask.split(''),
                  input       = patternService.compose(mask, values.toString(), patterns).substr(0, mask.length),
                  invalid     = false,
                  output      = '';

              for(var i=0; i<input.length; i++){
                var pattern  = patterns[array_mask[i]],
                    value    = input[i];

                if(pattern && !pattern.test(value)){
                  invalid = true;
                  //break;
                  //output  += ' ';
                  output += value;
                } else if(!pattern || (pattern && pattern.test(value))){
                  output += value;
                }
              }

              if(invalid || (output.length < mask.length)){
                controller.$setValidity('mask', false);
              } else {
                controller.$setValidity('mask', true);
              }

              if(values !== output){
                controller.$setViewValue(output, 'input');
                controller.$render();
              }

              if(!separators){
                return output;
              } else {
                return output.replace(RegExp(('[' + separators.join('') + ']'), 'gi'), '');
              }
            }

            $element.on('focus input click keydown paste', function() {
              SelectorService.setCaretPosition(this, mask, this.value, patterns);
            });

            controller.$parsers.push(parser);

            // Register the watch to observe remote loading or promised data
            // Deregister calling returned function
            var watcher = $scope.$watch($attrs.ngModel, function (newValue, oldValue) {
              if (angular.isDefined(newValue)) {
                parser(newValue);
                watcher();
              }
            });

            // $evalAsync from a directive, it should run after the DOM has been manipulated by Angular, but before the browser renders
            // $evalAsync from a controller, it should run before the DOM has been manipulated by Angular (and before the browser renders) -- rarely do you want this
            // using $timeout, it should run after the DOM has been manipulated by Angular, and after the browser renders (which may cause flicker in some cases)
            if($attrs.ngValue) {
              $scope.$evalAsync(function( $scope ) {
                parser($attrs.ngValue);
              });
            }
          }
        }
      }
    }
  }]);'use strict';

angular.module('ngMask')
  .factory('ComparatorService', [function(){
    function minLength(a, b){
      return a.length < b.length ? a.length : b.length;
    }

    function maxLength(a, b){
      return a.length > b.length ? a.length : b.length;
    }

    return {
      min: minLength,
      max: maxLength
    }
  }]);'use strict';

angular.module('ngMask')
  .factory('PatternService', ['ComparatorService', function(ComparatorService){
    function createPatternService(){
      var patterns = {
          '9': /[0-9]/,
          '8': /[0-8]/,
          '7': /[0-7]/,
          '6': /[0-6]/,
          '5': /[0-5]/,
          '4': /[0-4]/,
          '3': /[0-3]/,
          '2': /[0-2]/,
          '1': /[0-1]/,
          '0': /[0]/,
          '*': /./,
          'w': /\w/,
          'W': /\w/,
          'd': /\d/,
          'D': /\D/,
          's': /\s/,
          'S': /\S/,
          'b': /\b/,
          'A': /[A-Z]/,
          'a': /[a-z]/,
          'Z': /[A-ZÇÀÁÂÃÈÉÊẼÌÍÎĨÒÓÔÕÙÚÛŨ]/,
          'z': /[a-zçáàãâéèêẽíìĩîóòôõúùũüû]/,
          '@': /[a-zA-Z]/,
          '#': /[a-zA-ZçáàãâéèêẽíìĩîóòôõúùũüûÇÀÁÂÃÈÉÊẼÌÍÎĨÒÓÔÕÙÚÛŨ]/,
          '%': /[0-9a-zA-zçáàãâéèêẽíìĩîóòôõúùũüûÇÀÁÂÃÈÉÊẼÌÍÎĨÒÓÔÕÙÚÛŨ]/
        },
        optionals = [],
        full_pattern, mask, separators;

      function generateSeparators(mask, patterns){
        var output = []

        for(var i=0; i<mask.length; i++){
          var pattern = patterns[mask[i]];

          if(!pattern){
            output.push(('\\' + mask[i]));
          }
        }

        separators = output;
        return output;
      }

      function removeQuestionMark(mk){
        var output = "";
        if(mk && (mk.indexOf('?') > -1)){
          var index = mk.indexOf('?'),
              array_mask = mk.split('');

          optionals.push(index);
          array_mask.splice(index, 1);
          output = array_mask.join('');
          output = removeQuestionMark(output);
        } else {
          output = mk;
        }

        return output;
      }

      function generateFullPattern(){
        var patt = '';

        mask = removeQuestionMark(mask);
        for(var i=0; i<mask.length; i++){
          var pattern = patterns[mask[i]];

          if(optionals.indexOf(i) > -1){
            patt += pattern + '?';
          } else {
            patt += pattern;
          }
        }

        full_pattern = RegExp(patt.replace(/\//g, ''));
        return mask;
      }

      function generateMask(mk, repeat){
        var output = '';

        if(mk.length === 1 && repeat){
          for(var i=0; i<parseInt(repeat); i++){
            output += mk;
          }
        } else {
          output = mk;
        }

        mask = output;
        return output;
      }

      function getPatterns(){
        return patterns;
      }

      function getSeparators(){
        return separators;
      }

      function getMask(){
        return mask;
      }

      function getOptionals(){
        return optionals;
      }

      function getFullPattern(){
        return full_pattern;
      }

      function compose(mask, values, patterns){
        var val = values,
            length = ComparatorService.min(mask, values);

        for(var i=0; i<length; i++){
          var pattern = patterns[mask[i]];

          if(!pattern && (val[i] !== mask[i])){
            var tmp = val.split('');
            tmp.splice(i, 0, mask[i]);

            val = compose(mask, tmp.join(''), patterns);
            break;
          }
        }

        return val;
      }

      return {
        getPatterns: getPatterns,
        getSeparators: getSeparators,
        getMask: getMask,
        getFullPattern: getFullPattern,
        getOptionals: getOptionals,
        generateMask: generateMask,
        generateSeparators: generateSeparators,
        compose: compose
      }
    }

    return {
      create: createPatternService
    }

  }]);'use strict';

angular.module('ngMask')
  .factory('SelectorService', [function(){
    function wrongPosition(type, mask, values, patterns){
      if(!values){ return 0; }

      var pos = undefined;

      for(var i=0; i<values.length; i++){
        var value   = values[i],
            pattern = patterns[mask[i]];

        if(pattern && !pattern.test(value)){
          pos = i;

          if(type === 'first'){
            break;
          }
        }
      }

      return (pos === undefined) ? values.length : pos;
    }

    function getFirstWrongPosition(mask, values, patterns){
      return wrongPosition('first', mask, values, patterns);
    }

    function getLastWrongPosition(mask, values, patterns){
      return wrongPosition('last', mask, values, patterns);
    }

    function setSelectionRange(input, selectionStart, selectionEnd){
      if (input.setSelectionRange) {
        input.focus();
        input.setSelectionRange(selectionStart, selectionEnd);
      } else if (input.createTextRange) {
        var range = input.createTextRange();
        range.collapse(true);
        range.moveEnd('character', selectionEnd);
        range.moveStart('character', selectionStart);
        range.select();
      }
    }

    function setCaretPosition(element, mask, values, patterns){
      // Set cursor on first wrong element
      var pos = getFirstWrongPosition(mask, values, patterns);
      setSelectionRange(element, pos, (pos+1));
    }

    return {
      setCaretPosition: setCaretPosition,
      setSelectionRange: setSelectionRange
    }
  }]);