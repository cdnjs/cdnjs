// Library for handling binary HTTP posts on behalf of the browser

package
{	
	import flash.events.Event;
	import flash.events.HTTPStatusEvent;
	import flash.events.IOErrorEvent;
	import flash.events.SecurityErrorEvent;
	import flash.external.ExternalInterface;
	import flash.net.URLLoader;
	import flash.net.URLLoaderDataFormat;
	import flash.net.URLRequest;
	import flash.net.URLRequestHeader;
	import flash.net.URLRequestMethod;
	import flash.utils.ByteArray;
	
	import mx.utils.Base64Encoder;
	
	public class BinaryPostLib {
		
		private var connections:Object= {};
		
		
		// if the Javascript container defines a function called
		// debugPolyfill() that returns true, debugging messages
		// will be turned on. Check the flash trace facility output
		// log file to see them.
		public var debug:Boolean = false;

		public function BinaryPostLib() {
			
			debug = !!ExternalInterface.call("debugPolyfill");
			this.debugTrace("Polyfill debugging turned on");
			
			// handle startup
			registerCallbacks();

			// Mark plugin as loaded and open for business
			this.debugTrace("Calling javascript to register polyfil");
			ExternalInterface.call("Ext.data.flash.BinaryXhr.flashPluginActivated");
			this.debugTrace("Returned from javascript registering polyfill");
			//trace("Registered callbacks");
		}
		
		private function registerCallbacks():void {
			ExternalInterface.addCallback("postBinary", postBinary);
			ExternalInterface.addCallback("abortRequest", abortRequest);
			ExternalInterface.addCallback("isAlive", isAlive);
		}
		
		public function abortRequest(javascriptId:Object):void {
			var req:Object = this.connections[javascriptId];
			this.debugTrace("Aborting request: " + req);
			try {
				req["urlLoader"].close();
			} catch (error:Error) {
				// We don't care about errors. Its either stopped, or it was not streaming.
				//trace("Error closing connection: " + error.toString());
			}
			delete this.connections[javascriptId];
		}
		
		public function postBinary(req:Object):Object {
			var i:Number, h:String, headers:Array;
			
			this.debugTrace("Initiating connection to: " + req.url);
			// Store this object for later reference
			this.connections[req["javascriptId"]] = req;
			
			// Create a place holder for the response:
			req["resp"] = {};
			
			// convert the data array to a ByteAray for sending
			this.debugTrace("Body length: " + req["body"].length);
			var ba:ByteArray = new ByteArray();
			for (i = 0; i < req["body"].length; i++) {
				ba.writeByte(req["body"][i]);
			}
			
			
			// construct the request
			var request:URLRequest = new URLRequest();
			request.url = req.url;
			// Assume POST since we can't add binary data to a GET
			request.method = URLRequestMethod.POST;
			
			// Request headers
			// Note : Request headers will only be supported by POST, not by GET. Flash limitation.
			headers = [];
			for (h in req.requestHeaders) {
				if (h == "Content-Type") {
					request.contentType = req.requestHeaders[h];
					//trace("Content type: " + req.requestHeaders[h]);
				} else {
					headers.push(new URLRequestHeader(h, req.requestHeaders[h]));
					//trace("Header: " + h + ": " + req.requestHeaders[h]);
				}
			}
			
			// authentication
			if (req.user) {
				var encoder:Base64Encoder = new Base64Encoder();
				encoder.encode(req.user + ":" + (req.password || ""));
				headers.push(new URLRequestHeader("Authorization", "Basic " + encoder.toString()));
			}
			// finally add all headers in
			request.requestHeaders = headers;
						
			// Add data
			request.data = ba; 

			var loader:URLLoader = new URLLoader(); 
			req["urlLoader"] = loader; // keep it around
			
			// 2DO: when to use binary return values?
			loader.dataFormat = URLLoaderDataFormat.BINARY;
			// Register all events we care about
			loader.addEventListener(Event.COMPLETE, httpEventHandler);
			loader.addEventListener(HTTPStatusEvent.HTTP_STATUS, httpEventHandler);
			loader.addEventListener(IOErrorEvent.IO_ERROR, httpEventHandler);
			loader.addEventListener(Event.OPEN, httpEventHandler);
			loader.addEventListener(SecurityErrorEvent.SECURITY_ERROR, httpEventHandler);
			
			try {
				this.debugTrace("Initiating request");
				loader.load(request);
			} catch (error:SecurityError) {
				// Don't worry about a security error here. We'll be getting the event and handle it there
				//trace("Ignore: Security error occured: " + error.toString());
			} catch (error:Error) {
				this.debugTrace("Got an error trying to URLLoader.load: " + error.toString());
				req.resp = {status:0, text:error.toString()};
				completeConnection(req); // Connection is done
			}

			return null;
		}
		
		private function httpEventHandler(event:Event):void {
			var req:Object = null, i:Number, loader:URLLoader, javascriptId:Object;
			// First, find which request this is for:
			loader = URLLoader(event.target);
			this.debugTrace("Got event " + event.type + " for target: " + event.target);
			for (i in this.connections) {
				if (this.connections[i]["urlLoader"] == event.target) {
					req = this.connections[i];
					break;
				}
			}
			if (req == null) {
				this.debugTrace("Error: Got event " + event.type + " for UNKNOWN target: " + event.target);
				return;
			}
			// get the id for later reporting
			javascriptId = req["javascriptId"];
			// Handle event:
			if (event is HTTPStatusEvent) {
				// for now, record the responses
				var hse:HTTPStatusEvent = HTTPStatusEvent(event);
				this.debugTrace("HSE: " + hse.toString());
				req.resp.status = hse.status;
				return;
			}
			if (event is IOErrorEvent) {
				var ioe:IOErrorEvent = IOErrorEvent(event);
				this.debugTrace("IOE: " + ioe.toString());
				req.resp.errorID = ioe.errorID;
				req.resp.text = ioe.text;
				req.resp.type = ioe.type;
				req.resp.reason="error";
				completeConnection(req);
				return;
			}
			if (event is SecurityErrorEvent) {
				var see:SecurityErrorEvent = SecurityErrorEvent(event);
				this.debugTrace("SEE: " + see.toString());
				req.resp.errorID = see.errorID;
				req.resp.text = see.text;
				req.resp.type = see.type;
				req.resp.reason="securityError";
				completeConnection(req);
				return;				
			}
			if (event.type == Event.OPEN) { // Open is not its own event
				this.debugTrace("Connection open event");
				reportState(javascriptId, 1); // open				
				return;
			}
			if (event.type == Event.COMPLETE) { // Complete is not its own event
				// This means the request now has the data. Convert it to a byte array
				var arr:Array;
				this.debugTrace("Download complete, received " + loader.bytesTotal + " bytes.");
				arr = [];
				for (i = 0; i < loader.bytesTotal; i++) {
					arr.push(loader.data[i]);
				}
				// And place in the response object
				req.resp.data = arr;
				req.resp.reason="complete";
				completeConnection(req);
				return;
			}	
			this.debugTrace("Unkown event received: " + event.toString());
		}

		private function completeConnection(req):void {
			var javascriptId:Object = req["javascriptId"];
			reportState(javascriptId, 4, req.resp); // readyState 4 (complete)
			delete this.connections[javascriptId];
		}
		
		// report status and optional data back to JavaScript
		private function reportState(javascriptId, state, data=undefined):void {
			this.debugTrace("Reporting readyState " + state + " to Javascript");
			if (data !== undefined) {
				ExternalInterface.call("Ext.data.flash.BinaryXhr.onFlashStateChange", javascriptId, state, data);
			} else {
				ExternalInterface.call("Ext.data.flash.BinaryXhr.onFlashStateChange", javascriptId, state);
			}
		}
		
		// Always returns true. If it exists, the flash object is live
		public function isAlive():Boolean {
			return true;
		}

		public function debugTrace(msg:String):void {
			if (this.debug) {
				trace(msg);
				// If Ext not defined, nothign will happen, otherwise:
				ExternalInterface.call("Ext.log.info", "Polyfill: " + msg);
			}
		}
	}

}