YUI.add('file', function(Y) {

    /**
     * The File class provides a wrapper for a file pointer, either through an HTML5 
     * implementation or as a reference to a file pointer stored in Flash. The File wrapper 
     * also implements the mechanics for uploading a file and tracking its progress.
     * @module file
     * @main file
     * @since 3.5.0
     */     

    
 var Win = Y.config.win;

 if (Win && Win.File && Win.FormData && Win.XMLHttpRequest) {
    Y.File = Y.FileHTML5;
 }

 else {
    Y.File = Y.FileFlash;
 }


}, '@VERSION@' ,{requires:['file-flash', 'file-html5']});
