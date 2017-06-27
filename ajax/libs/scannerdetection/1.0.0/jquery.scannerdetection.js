/*
 * jQuery Scanner Detection
 *
 * Copyright (c) 2013 Julien Maurel
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Project home:
 * https://github.com/julien-maurel/jQuery-Scanner-Detection
 *
 * Version: 1.0.0
 *
 */
(function($){
    $.fn.scannerDetection=function(options){

        // If string given, call onComplete callback
        if(typeof options==="string"){
            this.each(function(){
                $(this).data('scannerDetection').options.onComplete.call(this,options);
            });
            return this;
        }

        var defaults={
            onComplete:function(){}, // Callback after detection of a successfull scanning (scanned string in parameter)
            onError:false, // Callback after detection of a unsuccessfull scanning (scanned string in parameter)
            onReceive:false, // Callback after receive a char (scanned char in parameter)
            timeBeforeScanTest:100, // Wait duration (ms) after keypress event to check if scanning is finished
            avgTimeByChar:30, // Average time (ms) between 2 chars. Used to do difference between keyboard typing and scanning
            minLength:6, // Minimum length for a scanning
            endChar:[9,13], // Chars to remove and means end of scanning
            stopPropagation:false, // Stop immediate propagation on keypress event
            preventDefault:false, // Prevent default action on keypress event
        };
        if(typeof options==="function"){
            options={onComplete:options}
        }
        options=$.extend({},defaults,options);

        this.each(function(){
            var self=this, $self=$(self), firstCharTime=0, lastCharTime=0, stringWriting='', callIsScanner=false, testTimer=false;
            var initScannerDetection=function(){
                firstCharTime=0;
                stringWriting='';
            };
            var isScanner=function(){
                // If all condition are good (length, time...), call the callback and re-initialize the plugin for next scanning
                // Else, just re-initialize
                if(stringWriting.length>=options.minLength && lastCharTime-firstCharTime<stringWriting.length*options.avgTimeByChar){
                    options.onComplete.call(self,stringWriting);
                    initScannerDetection();
                    return true;
                }else{
                    if(options.onError) options.onError.call(self,stringWriting);
                    initScannerDetection();
                    return false;
                }
            }
            $self.data('scannerDetection',{options:options}).unbind('.scannerDetection').bind('keypress.scannerDetection',function(e){
                if(options.stopPropagation) e.stopImmediatePropagation();
                if(options.preventDefault) e.preventDefault();

                if(firstCharTime && options.endChar.indexOf(e.which)!==-1){
                    e.preventDefault();
                    e.stopImmediatePropagation();
                    callIsScanner=true;
                }else{
                    stringWriting+=String.fromCharCode(e.which);
                    callIsScanner=false;
                }

                if(!firstCharTime){
                    firstCharTime=e.timeStamp;
                }
                lastCharTime=e.timeStamp;

                if(testTimer) clearTimeout(testTimer);
                if(callIsScanner){
                    isScanner();
                    testTimer=false;
                }else{
                    testTimer=setTimeout(isScanner,options.timeBeforeScanTest);
                }
                
                if(options.onReceive) options.onReceive.call(self,e.which);
            });
        });
        return this;
    }
})(jQuery);
