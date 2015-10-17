// upb.js by the DaAwesomeP

// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
(function () {
	var upb = {};
	// global on the server, window in the browser
	var root, previous_upb;
	root = this;
	if (root != null) {
		previous_upb = root.upb;
	}
	upb.noConflict = function () {
		root.upb = previous_upb;
		return upb;
	};
	
	function pad(n, width, z) {
	  z = z || '0';
	  n = n + '';
	  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
	}
	function contains(a, obj) {
		var i = a.length;
		while (i--) {
			if (a[i] === obj) {
				return true;
			}
		}
		return false;
	}

	upb.validCommands = [
		"20", "activate",
		"21", "deactivate",
		"22", "goto",
		"23", "fadeStart",
		"24", "fadeStop",
		"25", "blink",
		"26", "indicate",
		"27", "toggle",
		"30", "reportState",
		"31", "storeState",
		"80", "ackResponse",
		"85", "setupTimeReport",
		"86", "deviceStateReport",
		"87", "deviceStatusReport",
		"8F", "deviceSignatureReport",
		"90", "registerValuesReport",
		"91", "RAMvaluesReport",
		"92", "rawDataReport",
		"93", "heartbeatReport"
	];

	upb.defaultCommand = {
		source: 255,
		sendx: 1,
		sendTime: 1,
		ackPulse: false,
		idPulse: false,
		ackMsg: false,
		powerlineRepeater: 0
	};

	upb.generateChecksum = function(commandCheck) {
		var checksum = parseInt(commandCheck.hex.ctrlWord.byte1.slice(0,2), 16);
		checksum += parseInt(commandCheck.hex.ctrlWord.byte2.slice(0,2), 16);
		checksum += parseInt(commandCheck.hex.network.slice(0,2), 16);
		checksum += parseInt(commandCheck.hex.id.slice(0,2), 16);
		checksum += parseInt(commandCheck.hex.source.slice(0,2), 16);
		checksum += parseInt(commandCheck.hex.msg.slice(0,2), 16);
		if (commandCheck.hex.level) { checksum += parseInt(commandCheck.hex.level.slice(0,2), 16); }
		if (commandCheck.hex.rate) { checksum += parseInt(commandCheck.hex.rate.slice(0,2), 16); }
		if (commandCheck.hex.blinkRate) { checksum += parseInt(commandCheck.hex.blinkRate.slice(0,2), 16); }
		if (commandCheck.hex.toggleCount) { checksum += parseInt(commandCheck.hex.toggleCount.slice(0,2), 16); }
		if (commandCheck.hex.toggleRate) { checksum += parseInt(commandCheck.hex.toggleRate.slice(0,2), 16); }
		if (commandCheck.hex.channel) { checksum += parseInt(commandCheck.hex.channel.slice(0,2), 16); }
		checksum = parseInt((~checksum + 1 >>> 0)).toString(16); // See https://coderwall.com/p/327jiw/2-s-complement-in-javascript
		checksum = checksum.substr(checksum.length-2);
		return checksum;
	};

	upb.generate = function (command, callbackFinal) {// generate(commandInputAsJSON, function(commandJSON, err){});
		if (!command.network) { callbackFinal(null, new Error ("No network id specified!")); }
		if (!command.id) { callbackFinal(null, new Error ("No link or device id specified!")); }
		if (!command.type) { callbackFinal(null, new Error ("No id type specified!")); }
		if (!command.cmd) { callbackFinal(null, new Error ("No command specified!")); }
		if (!contains(upb.validCommands, (String(command.cmd))) || command.cmd === '1') {
			callbackFinal(null, new Error ("Invalid command specified! Please us the correct command name or number."));
		}
		if (command.powerlineRepeater === 0) { command.powerlineRepeater = false; }
		if (command.powerlineRepeater === true || command.powerlineRepeater === 'true') { command.powerlineRepeater = 1; }
		if (command.powerlineRepeater && !(command.powerlineRepeater === 1 || command.powerlineRepeater === 2 || command.powerlineRepeater === 4 || command.powerlineRepeater === false || command.powerlineRepeater === 0)) { callbackFinal(null, new Error ("Power line repeater argument only accepts 1, 2, 4, or false!")); }
		if (command.level > 100 || command.level < 0) { callbackFinal(null, new Error ("Level can only be values 0 through 100! Inequality: -1 < L < 101 where variable 'L' is level.")); }
		if (command.sendTime && command.sendTime > command.sendx) { callbackFinal(null, new Error ("Number of time sent (sendTime) cannot be greater than total number of times sent (sendx)!")); }
		if (!command.source) { command.source = 255; }
		
		command.ctrlWord = {};
		command.ctrlWord.nibble1 = 0;
		command.ctrlWord.nibble2 = 0;
		command.words = 7;
		command.ctrlWord.nibble3 = 0;
		command.ctrlWord.nibble4 = 0;
		
		command.hex = {};
		command.hex.network = parseInt(command.network).toString(16);
		command.hex.id = parseInt(command.id).toString(16);
		command.hex.source = parseInt(command.source).toString(16);
		
		if (command.cmd === 20 || command.cmd === '20' || command.cmd == "activate") {command.cmd = "activate"; command.msg = 20;}
		else if (command.cmd === 21 || command.cmd === '21' || command.cmd == "deactivate") {command.msg = 21; command.cmd = "deactivate";}
		else if (command.cmd === 22 || command.cmd === '22' || command.cmd == "goto") {command.msg = 22; command.cmd = "goto";}
		else if (command.cmd === 23 || command.cmd === '23' || command.cmd == "fadeStart") {command.msg = 23; command.cmd = "fadeStart";}
		else if (command.cmd === 24 || command.cmd === '24' || command.cmd == "fadeStop") {command.msg = 24; command.cmd = "fadeStop";}
		else if (command.cmd === 25 || command.cmd === '25' || command.cmd == "blink") {command.msg = 25; command.cmd = "blink";}
		else if (command.cmd === 26 || command.cmd === '26' || command.cmd == "indicate") {command.msg = 26; command.cmd = "indicate";}
		else if (command.cmd === 27 || command.cmd === '27' || command.cmd == "toggle") {command.msg = 27; command.cmd = "toggle";}
		else if (command.cmd === 30 || command.cmd === '30' || command.cmd == "reportState") {command.msg = 30; command.cmd = "reportState";}
		else if (command.cmd === 31 || command.cmd === '31' || command.cmd == "storeState") {command.msg = 31; command.cmd = "storeState";}
		else if (command.cmd === 80 || command.cmd === '80' || command.cmd == "ackResponse") {command.msg = 80; command.cmd = "ackResponse";}
		else if (command.cmd === 85 || command.cmd === '85' || command.cmd == "setupTimeReport") {command.msg = 85; command.cmd = "setupTimeReport";}
		else if (command.cmd === 86 || command.cmd === '86' || command.cmd == "deviceStateReport") {command.msg = 86; command.cmd = "deviceStateReport";}
		else if (command.cmd === 87 || command.cmd === '87' || command.cmd == "deviceStatusReport") {command.msg = 87; command.cmd = "deviceStatusReport";}
		else if (command.cmd === '8F' || command.cmd == "deviceSignatureReport") {command.msg = '8F'; command.cmd = "deviceSignatureReport";}
		else if (command.cmd === 90 || command.cmd === '90' || command.cmd == "registerValuesReport") {command.msg = 90; command.cmd = "registerValuesReport";}
		else if (command.cmd === 91 || command.cmd === '91' || command.cmd == "RAMvaluesReport") {command.msg = 91; command.cmd = "RAMvaluesReport";}
		else if (command.cmd === 92 || command.cmd === '92' || command.cmd == "rawDataReport") {command.msg = 92; command.cmd = "rawDataReport";}
		else if (command.cmd === 93 || command.cmd === '93' || command.cmd == "heartbeatReport") {command.msg = 93; command.cmd = "heartbeatReport";}
		command.hex.msg = parseInt(command.msg, 16).toString(16);
		
		if ((command.cmd === "goto" || command.cmd === "fadeStart" || command.cmd === "deviceStateReport") && !command.level) { callbackFinal(null, new Error ("No level specified! A level must be specified with goto, fadeStart, and deviceStateReport.")); }
		if (command.cmd === "blink" && !command.blinkRate) { callbackFinal(null, new Error ("No blink rate specified!")); }
		if (command.cmd === "toggle" && !command.toggleCount) { callbackFinal(null, new Error ("No toggle count specified!")); }
		
		if (command.level && (command.cmd === "goto" || command.cmd === "fadeStart" || command.cmd === "fadeStop" || command.cmd === "indicate")) { // Add level
			command.words++;
			command.hex.level = parseInt(command.level).toString(16);
		}
		if (command.rate && command.level && (command.cmd === "goto" || command.cmd === "fadeStart" || command.cmd === "indicate")) { // Add rate
			command.words++;
			command.hex.rate = parseInt(command.rate).toString(16);
		}
		if (command.cmd === "blink") { // Add blink rate
			command.words++;
			command.hex.blinkRate = parseInt(command.blinkRate).toString(16);
		}
		if (command.cmd === "toggle") { // Add toggle count
			command.words++;
			command.hex.toggleCount = parseInt(command.toggleCount).toString(16);
		}
		if (command.toggleRate && command.cmd === "toggle") { // Add toggle rate
			command.words++;
			command.hex.toggleRate = parseInt(command.toggleRate).toString(16);
		}
		if (command.channel && command.type === "device" && command.rate && (command.cmd === "goto" || command.cmd === "fadeStart" || command.cmd === "blink" || command.cmd === "toggle" || command.cmd === "indicate")) { // Add channel
			command.words++;
			command.hex.channel = parseInt(command.channel).toString(16);
		}
		
		if (command.type === "link") { command.ctrlWord.nibble1 += 8; }
		if (command.powerlineRepeater === 1) { command.ctrlWord.nibble1 += 2; }
		else if (command.powerlineRepeater === 2) { command.ctrlWord.nibble1 += 4; }
		else if (command.powerlineRepeater === 4) { command.ctrlWord.nibble1 += 6; }
		
		command.ctrlWord.nibble2 = command.words;
		
		if (command.ackPulse === true) { command.ctrlWord.nibble3 += 1; }
		if (command.idPulse === true) { command.ctrlWord.nibble3 += 2; }
		if (command.ackMsg === true) { command.ctrlWord.nibble3 += 4; }
		
		if (command.sendx === 2) { command.ctrlWord.nibble4 += 4; }
		else if (command.sendx === 3) { command.ctrlWord.nibble4 += 8; }
		else if (command.sendx === 4) { command.ctrlWord.nibble4 += 12; }
		if (command.sendTime === 2) { command.ctrlWord.nibble4 += 1; }
		else if (command.sendTime === 3) { command.ctrlWord.nibble4 += 2; }
		else if (command.sendTime === 4) { command.ctrlWord.nibble4 += 3; }
		
		command.hex.ctrlWord = {};
		command.hex.ctrlWord.nibble1 = parseInt(command.ctrlWord.nibble1).toString(16);
		command.hex.ctrlWord.nibble2 = parseInt(command.words).toString(16);
		command.hex.ctrlWord.nibble3 = parseInt(command.ctrlWord.nibble3).toString(16);
		command.hex.ctrlWord.nibble4 = parseInt(command.ctrlWord.nibble4).toString(16);
		command.hex.ctrlWord.byte1 = command.hex.ctrlWord.nibble1 + command.hex.ctrlWord.nibble2;
		command.hex.ctrlWord.byte2 = command.hex.ctrlWord.nibble3 + command.hex.ctrlWord.nibble4;
		
		command.generated = command.hex.ctrlWord.byte1;
		command.generated += command.hex.ctrlWord.byte2;
		command.generated += pad(command.hex.network, 2, 0);
		command.generated += pad(command.hex.id, 2, 0);
		command.generated += pad(command.hex.source, 2, 0);
		command.generated += pad(command.msg, 2, 0);
		if (command.hex.level) { command.generated += pad(command.hex.level, 2, 0); }
		if (command.hex.rate) { command.generated += pad(command.hex.rate, 2, 0); }
		if (command.hex.blinkRate) { command.generated += pad(command.hex.blinkRate, 2, 0); }
		if (command.hex.toggleCount) { command.generated += pad(command.hex.toggleCount, 2, 0); }
		if (command.hex.toggleRate) { command.generated += pad(command.hex.toggleRate, 2, 0); }
		if (command.hex.channel) { command.generated += pad(command.hex.channel, 2, 0); }
		
		command.checksum = upb.generateChecksum(command);
		command.generated += pad(command.checksum, 2, 0);
		
		command.generated = command.generated.toUpperCase();
		
		callbackFinal(command, null);
	};

	upb.decode = function (commandGenerated, callbackFinal) { // decode(commandInputAsStr, function(commandDecodedJSON, err){});
		var command = upb.defaultCommand;
		command.hex = {};
		command.generated = commandGenerated.toUpperCase();
		
		command.hex.ctrlWord = {};
		command.hex.ctrlWord.byte1 = command.generated.substring(0,2).toString(16);
		command.hex.ctrlWord.byte2 = command.generated.substring(2,4).toString(16);
		command.hex.ctrlWord.nibble1 = command.generated.substring(0,1).toString(16);
		command.hex.ctrlWord.nibble2 = command.generated.substring(1,2).toString(16);
		command.hex.ctrlWord.nibble3 = command.generated.substring(2,3).toString(16);
		command.hex.ctrlWord.nibble4 = command.generated.substring(3,4).toString(16);
		
		command.ctrlWord = {};
		command.ctrlWord.nibble1 = parseInt(command.hex.ctrlWord.nibble1, 16);
		command.ctrlWord.nibble2 = parseInt(command.hex.ctrlWord.nibble2, 16);
		command.ctrlWord.nibble3 = parseInt(command.hex.ctrlWord.nibble3, 16);
		command.ctrlWord.nibble4 = parseInt(command.hex.ctrlWord.nibble4, 16);
		
		if (command.ctrlWord.nibble1 >= 8) {
			command.type = "link";
			command.powerlineRepeater = command.ctrlWord.nibble1 - 8;
		}
		else {
			command.type = "device";
			command.powerlineRepeater = command.ctrlWord.nibble1;
		}
		if (command.powerlineRepeater === false || command.powerlineRepeater === 0) { command.powerlineRepeater = 0; }
		else if (command.powerlineRepeater === 2) { command.powerlineRepeater = 1; }
		else if (command.powerlineRepeater === 4) { command.powerlineRepeater = 2; }
		else if (command.powerlineRepeater === 6) { command.powerlineRepeater = 4; }
		else { callbackFinal(null, new Error ("Invalid command! Powerline repeater argument can only be 1, 2, or 4 which translates into 2, 4, or 6.")); }
		
		command.words = command.ctrlWord.nibble2;
		if (command.generated.length/2 !== command.words) {
			callbackFinal(null, new Error ("Invalid command! Word count doesn't add up.'"));
		}
		
		if (command.ctrlWord.nibble3 === 1) { command.ackPulse = true; }
		if (command.ctrlWord.nibble3 === 2) { command.idPulse = true; }
		if (command.ctrlWord.nibble3 == 3) { command.ackPulse = true; command.idPulse = true; }
		if (command.ctrlWord.nibble3 === 4) { command.ackMsg = true; }
		if (command.ctrlWord.nibble3 === 5) { command.ackPulse = true; command.ackMsg = true; }
		if (command.ctrlWord.nibble3 === 6) { command.idPulse = true; command.ackMsg = true; }
		if (command.ctrlWord.nibble3 === 7) { command.ackPulse = true; command.idPulse = true; command.ackMsg = true; }
		if (command.ctrlWord.nibble3 > 7) { callbackFinal(null, new Error ("Invalid command! Any number greater than seven cannot be an Acknowledge Pulse, ID Pulse, or Acknowledge Message.")); }
		
		if (command.ctrlWord.nibble4 === 0) { command.sendx = 1; command.sendTime = 1; }
		else if (command.ctrlWord.nibble4 === 4) { command.sendx = 2; command.sendTime = 1; }
		else if (command.ctrlWord.nibble4 === 5) { command.sendx = 2; command.sendTime = 2; }
		else if (command.ctrlWord.nibble4 === 8) { command.sendx = 3; command.sendTime = 1; }
		else if (command.ctrlWord.nibble4 === 9) { command.sendx = 3; command.sendTime = 2; }
		else if (command.ctrlWord.nibble4 === 10) { command.sendx = 3; command.sendTime = 3; }
		else if (command.ctrlWord.nibble4 === 12) { command.sendx = 4; command.sendTime = 1; }
		else if (command.ctrlWord.nibble4 === 12) { command.sendx = 4; command.sendTime = 2; }
		else if (command.ctrlWord.nibble4 === 13) { command.sendx = 4; command.sendTime = 3; }
		else if (command.ctrlWord.nibble4 === 14) { command.sendx = 4; command.sendTime = 4; }
		else { callbackFinal(null, new Error ("Invalid command! Send time is greater than total sent times.")); }
		
		command.hex.network = command.generated.substring(4,6).toString(16);
		command.network = parseInt(command.hex.network, 16);
		command.hex.id = command.generated.substring(6,8).toString(16);
		command.id = parseInt(command.hex.id, 16);
		command.hex.source = command.generated.substring(8,10).toString(16);
		command.source = parseInt(command.hex.source, 16);
		command.msg = command.generated.substring(10,12).toString(16);
		
		if (command.msg == 20) { command.cmd = "activate"; }
		else if (command.msg === 21) { command.cmd = "deactivate"; }
		else if (command.msg === 22) { command.cmd = "goto"; }
		else if (command.msg === 23) { command.cmd = "fadeStart"; }
		else if (command.msg === 24) { command.cmd = "fadeStop"; }
		else if (command.msg === 25) { command.cmd = "blink"; }
		else if (command.msg === 26) { command.cmd = "indicate"; }
		else if (command.msg === 27) { command.cmd = "toggle"; }
		else if (command.msg === 30) { command.cmd = "reportState"; }
		else if (command.msg === 31) { command.cmd = "storeState"; }
		else if (command.msg === 80) { command.cmd = "ackResponse"; }
		else if (command.msg === 85) { command.cmd = "setupTimeReport"; }
		else if (command.msg === 86) { command.cmd = "deviceStateReport"; }
		else if (command.msg === 87) { command.cmd = "deviceStatusReport"; }
		else if (command.msg === '8F') { command.cmd = "deviceSignatureReport"; }
		else if (command.msg === 90) { command.cmd = "registerValuesReport"; }
		else if (command.msg === 91) { command.cmd = "RAMvaluesReport"; }
		else if (command.msg === 92) { command.cmd = "rawDataReport"; }
		else if (command.msg === 93) { command.cmd = "heartbeatReport"; }
		else { calbackFinal(null, "An unknown command was specified!"); }
		command.hex.msg = parseInt(command.msg, 16).toString(16);
		
		command.checksum = command.generated.slice(-2).toString(16);
		
		if (command.words > 7 && command.checksum !== String(command.generated.substring(12,14)) && (command.cmd === "goto" || command.cmd === "fadeStart" || command.cmd === "fadeStop" || command.cmd === "deviceStateReport" || command.cmd === "indicate")) { // Add level
			command.hex.level = command.generated.substring(12,14).toString(16);
			command.level = parseInt(command.hex.level, 16);
		}
		if (command.words > 8 && command.checksum !== String(command.generated.substring(12,14)) && command.level && (command.cmd === "goto" || command.cmd === "fadeStart" || command.cmd === "indicate")) { // Add rate
			command.hex.rate = command.generated.substring(14,16).toString(16);
			command.rate = parseInt(command.hex.rate, 16);
		}
		if (command.words > 7 && command.cmd === "blink") { // Add blink rate
			command.hex.blinkRate = command.generated.substring(12,14).toString(16);
			command.blinkRate = parseInt(command.hex.blinkRate, 16);
		}
		if (command.words > 7 && command.cmd === "toggle") { // Add toggle count
			command.hex.toggleCount = command.generated.substring(12,14).toString(16);
			command.toggleCount = parseInt(command.hex.toggleCount, 16);
		}
		if (command.words > 8 && command.cmd === "toggle") { // Add toggle rate
			command.hex.toggleRate = command.generated.substring(14,16).toString(16);
			command.toggleRate = parseInt(command.hex.toggleRate, 16);
		}
		if (command.words > 9 && command.checksum !== String(command.generated.substring(12,14)) && command.rate && command.type === "device" && (command.cmd === "goto" || command.cmd === "fadeStart" || command.cmd === "toggle" || command.cmd === "indicate")) { // Add channel
			command.hex.channel = command.generated.substring(16,18).toString(16);
			command.channel = parseInt(command.hex.channel, 16);
		}
		if (command.words > 8 && command.checksum !== String(command.generated.substring(14,16)) && command.blinkRate && command.type === "device" && command.cmd === "blink") { // Add blink channel
			command.hex.channel = command.generated.substring(16,18).toString(16);
			command.channel = parseInt(command.hex.channel, 16);
		}
		
		if ((command.cmd === "goto" || command.cmd === "fadeStart") && !command.level) { callbackFinal(null, new Error ("Invalid command! No level specified. A level must be specified with goto and fadeStart.")); }
		if (command.cmd === "blink" && !command.blinkRate) { callbackFinal(null, new Error ("No blink rate specified. Blink rate must be specified with the blink command.")); }
		if (command.cmd === "toggle" && !command.toggleCount) { callbackFinal(null, new Error ("Invalid command! No toggle count specified. Toggle count must be specified with the toggle command.")); }
		
		callbackFinal(command, null);
	};
	
	// Node.js
	if (typeof module !== 'undefined' && module.exports) {
		module.exports = upb;
	}
	// AMD / RequireJS
	else if (typeof define !== 'undefined' && define.amd) {
		define([], function () {
			return upb;
		});
	}
	// included directly via <script> tag
	else {
		root.upb = upb;
	}
}());