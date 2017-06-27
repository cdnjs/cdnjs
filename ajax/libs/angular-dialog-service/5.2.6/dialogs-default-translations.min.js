/**
 * angular-dialog-service - A service to handle common dialog types in a web application.  Built on top of Angular-Bootstrap's modal
 * @version v5.2.5
 * @author Michael Conroy, michael.e.conroy@gmail.com
 * @license MIT, http://www.opensource.org/licenses/MIT
 */
angular.module("dialogs.default-translations",["pascalprecht.translate"]).config(["$translateProvider",function(n){n.translations("en-US",{DIALOGS_ERROR:"Error",DIALOGS_ERROR_MSG:"An unknown error has occurred.",DIALOGS_CLOSE:"Close",DIALOGS_PLEASE_WAIT:"Please Wait",DIALOGS_PLEASE_WAIT_ELIPS:"Please Wait...",DIALOGS_PLEASE_WAIT_MSG:"Waiting on operation to complete.",DIALOGS_PERCENT_COMPLETE:"% Complete",DIALOGS_NOTIFICATION:"Notification",DIALOGS_NOTIFICATION_MSG:"Unknown application notification.",DIALOGS_CONFIRMATION:"Confirmation",DIALOGS_CONFIRMATION_MSG:"Confirmation required.",DIALOGS_OK:"OK",DIALOGS_YES:"Yes",DIALOGS_NO:"No"}),n.preferredLanguage("en-US")}]);