package
{
	import flash.display.Sprite;
	import flash.external.ExternalInterface;
		
	public class FlashPlugin extends Sprite
	{
		public var binaryPostLib:BinaryPostLib;
		
		public function FlashPlugin()
		{
			//trace("hello world!");
			
			// Make it visible for debugging
			var child:Sprite = new Sprite();
			draw(child);
			addChild(child);
			
			// Load libraries here:
			binaryPostLib = new BinaryPostLib();
			
			//testIt();
			
		}
	
		// draw square for debugging
		private function draw(sprite:Sprite):void {
			sprite.graphics.beginFill(0x1010ff);
			sprite.graphics.drawRect(0, 0, 100, 100);
			sprite.graphics.endFill();
		}
		
		private function testIt():void {
			var req:Object = {
				method: "GET",
					url: "/samples/messagebroker/amf",
					//user: "eran",
					password: "davidov",
					mimeType: "application/x-amf",
					requestHeaders: {"Content-Type": "application/x-amf"},
					body: [0,1,2,3],
					javascriptId: 5
			};
			this.binaryPostLib.postBinary(req);

		}
	}
}