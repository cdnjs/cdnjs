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
 * Version: 1.2
 *
 */
(function($){
    $.fn.scannerDetection=function(options){

        // If string given, call onComplete callback
        if(typeof options==="string"){
            this.each(function(){
                this.scannerDetectionTest(options);
            });
            return this;
        }
		
	// If false (boolean) given, deinitialize plugin
	if(options === false){
	    this.each(function(){
		this.scannerDetectionOff();
	    });
	    return this;
	}

        var defaults={
            onComplete:false, // Callback after detection of a successfull scanning (scanned string in parameter)
            onError:false, // Callback after detection of a unsuccessfull scanning (scanned string in parameter)
            onReceive:false, // Callback after receive a char (scanned char in parameter)
	    timeBeforeScanTest:100, // Wait duration (ms) after keypress event to check if scanning is finished
            avgTimeByChar:30, // Average time (ms) between 2 chars. Used to do difference between keyboard typing and scanning
            minLength:6, // Minimum length for a scanning
            endChar:[9,13], // Chars to remove and means end of scanning
	    startChar:[], // Chars to remove and means start of scanning
	    ignoreIfFocusOn:false, // do not handle scans if the currently focused element matches this selector
	    scanButtonKeyCode:0, // Key code of the scanner hardware button (if the scanner button a acts as a key itself) 
	    scanButtonLongPressThreshold:3, // How many times the hardware button should issue a pressed event before a barcode is read to detect a longpress
            onScanButtonLongPressed:false, // Callback after detection of a successfull scan while the scan button was pressed and held down
            stopPropagation:false, // Stop immediate propagation on keypress event
            preventDefault:false // Prevent default action on keypress event
        };
        if(typeof options==="function"){
            options={onComplete:options}
        }
        if(typeof options!=="object"){
            options=$.extend({},defaults);
        }else{
            options=$.extend({},defaults,options);
        }
        
        this.each(function(){
            var self=this, $self=$(self), firstCharTime=0, lastCharTime=0, stringWriting='', callIsScanner=false, testTimer=false, scanButtonCounter=0;
            var initScannerDetection=function(){
                firstCharTime=0;
                stringWriting='';
		scanButtonCounter=0;
            };
	    self.scannerDetectionOff=function(){
		$self.unbind('keydown.scannerDetection');
		$self.unbind('keypress.scannerDetection');
	    }
	    self.isFocusOnIgnoredElement=function(){
                if(!options.ignoreIfFocusOn) return false;
		if(typeof options.ignoreIfFocusOn === 'string') return $(':focus').is(options.ignoreIfFocusOn);
	        if(typeof options.ignoreIfFocusOn === 'object' && options.ignoreIfFocusOn.length){
		    var focused=$(':focus');
		    for(var i=0; i<options.ignoreIfFocusOn.length; i++){
			if(focused.is(options.ignoreIfFocusOn[i])){
			    return true;
			}
		    }
		}
		return false;
	    }
            self.scannerDetectionTest=function(s){
                // If string is given, test it
                if(s){
                    firstCharTime=lastCharTime=0;
                    stringWriting=s;
                }

		if (!scanButtonCounter){
		    scanButtonCounter = 1;
		}

                // If all condition are good (length, time...), call the callback and re-initialize the plugin for next scanning
                // Else, just re-initialize
                if(stringWriting.length>=options.minLength && lastCharTime-firstCharTime<stringWriting.length*options.avgTimeByChar){
		    if(options.onScanButtonLongPressed && scanButtonCounter > options.scanButtonLongPressThreshold) options.onScanButtonLongPressed.call(self,stringWriting,scanButtonCounter);
                    else if(options.onComplete) options.onComplete.call(self,stringWriting,scanButtonCounter);
                    $self.trigger('scannerDetectionComplete',{string:stringWriting});
                    initScannerDetection();
                    return true;
                }else{
                    if(options.onError) options.onError.call(self,stringWriting);
                    $self.trigger('scannerDetectionError',{string:stringWriting});
                    initScannerDetection();
                    return false;
                }
            }
            $self.data('scannerDetection',{options:options}).unbind('.scannerDetection').bind('keydown.scannerDetection',function(e){
                // If it's just the button of the scanner, ignore it and wait for the real input
		if(options.scanButtonKeyCode && e.which==options.scanButtonKeyCode) {
                    scanButtonCounter++;
                    // Cancel default
                    e.preventDefault();
                    e.stopImmediatePropagation();
                }
		// Add event on keydown because keypress is not triggered for non character keys (tab, up, down...)
                // So need that to check endChar and startChar (that is often tab or enter) and call keypress if necessary
                else if((firstCharTime && options.endChar.indexOf(e.which)!==-1) 
			|| (!firstCharTime && options.startChar.indexOf(e.which)!==-1)){
                    // Clone event, set type and trigger it
                    var e2=jQuery.Event('keypress',e);
                    e2.type='keypress.scannerDetection';
                    $self.triggerHandler(e2);
                    // Cancel default
                    e.preventDefault();
                    e.stopImmediatePropagation();
                }
            }).bind('keypress.scannerDetection',function(e){
		if (this.isFocusOnIgnoredElement()) return;
                if(options.stopPropagation) e.stopImmediatePropagation();
                if(options.preventDefault) e.preventDefault();

                if(firstCharTime && options.endChar.indexOf(e.which)!==-1){
                    e.preventDefault();
                    e.stopImmediatePropagation();
                    callIsScanner=true;
                }else if(!firstCharTime && options.startChar.indexOf(e.which)!==-1){
                    e.preventDefault();
                    e.stopImmediatePropagation();
		    callIsScanner=false;
		}else{
                    stringWriting+=String.fromCharCode(e.which);
                    callIsScanner=false;
                }

                if(!firstCharTime){
                    firstCharTime=Date.now();
                }
                lastCharTime=Date.now();

                if(testTimer) clearTimeout(testTimer);
                if(callIsScanner){
                    self.scannerDetectionTest();
                    testTimer=false;
                }else{
                    testTimer=setTimeout(self.scannerDetectionTest,options.timeBeforeScanTest);
                }

                if(options.onReceive) options.onReceive.call(self,e);
                $self.trigger('scannerDetectionReceive',{evt:e});
            });
        });
        return this;
    }
})(jQuery);
