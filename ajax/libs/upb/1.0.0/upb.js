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

function pad(n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}
function pad2(n, c) {
    n = String(n);
	if (n.length < 1) {
		return c + '' + c;
	}
	else if (n.length < 2) {
		return c + '' + n;
	}
	else {
		return n;
	}
}

var validCommands = [
	"20", "activate",
	"21", "deactivate",
	"22", "goto",
	"23", "fadeStart",
	"24", "fadeStop",
	"25", "blink",
	"27", "toggle",
];
exports.validCommands = validCommands;

var defaultCommand = {
	source: 255,
	sendx: 1,
	ackPulse: false,
	idPulse: false,
	ackMsg: false,
	powerlineRepeater: false,
	sendTime: 1
};
exports.defaultCommand = defaultCommand;

function checksum(command) {
	command.checksum = parseInt(command.hex.ctrlWord.fullByte1.slice(0,2), 16);
	command.checksum += parseInt(command.hex.ctrlWord.fullByte2.slice(0,2), 16);
	command.checksum += parseInt(command.hex.network.slice(0,2), 16);
	command.checksum += parseInt(command.hex.id.slice(0,2), 16);
	command.checksum += parseInt(command.hex.source.slice(0,2), 16);
	command.checksum += parseInt(command.hex.msg.slice(0,2), 16);
	if (command.hex.level) { command.checksum += parseInt(command.hex.level.slice(0,2), 16); }
	if (command.hex.rate) { command.checksum += parseInt(command.hex.rate.slice(0,2), 16); }
	if (command.hex.blinkRate) { command.checksum += parseInt(command.hex.blinkRate.slice(0,2), 16); }
	if (command.hex.toggleCount) { command.checksum += parseInt(command.hex.toggleCount.slice(0,2), 16); }
	if (command.hex.toggleRate) { command.checksum += parseInt(command.hex.toggleRate.slice(0,2), 16); }
	if (command.hex.channel) { command.checksum += parseInt(command.hex.channel.slice(0,2), 16); }
	command.checksum = parseInt((~command.checksum + 1 >>> 0)).toString(16); // See https://coderwall.com/p/327jiw/2-s-complement-in-javascript
	command.checksum = command.checksum.substr(command.checksum.length -2); // See https://coderwall.com/p/327jiw/2-s-complement-in-javascript
	return command.checksum;
}
exports.checksum = checksum;

function generate(command, callbackFinal) {// generate(commandInputAsJSON, function(commandJSON, err){});

	if (!command.network) { callbackFinal(null, "No network id specified!"); }
	if (!command.id) { callbackFinal(null, "No link or device id specified!"); }
	if (!command.type) { callbackFinal(null, "No id type specified!"); }
	if (!command.cmd) { callbackFinal(null, "No command specified!"); }
	if (!validCommands.contains(command.cmd)) {
		if (!Object.keys(validCommands).contains(command.cmd)) {
			callbackFinal(null, "Invalid command specified! Please us the correct command name or number.");
		}
	}
	if (command.powerlineRepeater && !(command.powerlineRepeater == 1 || command.powerlineRepeater == 2 || command.powerlineRepeater == 4 || command.powerlineRepeater == 'false')) { callbackFinal(null, "Power line repeater argument only accepts 1, 2, 4, or false!"); }
	if (command.level > 100 || command.level < 0) { callbackFinal(null, "Level can only be values 0 through 100! Inequality: -1 < L < 101 where variable 'L' is level."); }
	if (command.sendTime && command.sendTime > command.sendx) { callbackFinal(null, "Number of time sent (sendTime) cannot be greater than total number of times sent (sendx)!"); }
	
	command.ctrlWord = {};
	command.ctrlWord.byte1 = 0;
	command.ctrlWord.byte2 = 0;
	command.words = 7;
	command.ctrlWord.byte3 = 0;
	command.ctrlWord.byte4 = 0;
	
	command.hex = {};
	command.hex.network = parseInt(command.network).toString(16);
	command.hex.id = parseInt(command.id).toString(16);
	command.hex.source = parseInt(command.source).toString(16);
	
	if (command.cmd == "activate" || command.cmd == 20) { command.msg = 20; command.cmd = "activate"; }
	if (command.cmd == "deactivate" || command.cmd == 21) { command.msg = 21; command.cmd = "deactivate"; }
	if (command.cmd == "goto" || command.cmd == 22) { command.msg = 22; command.cmd = "goto"; }
	if (command.cmd == "fadeStart" || command.cmd == 23) { command.msg = 23; command.cmd = "fadeStart"; }
	if (command.cmd == "fadeStop" || command.cmd == 24) { command.msg = 24; command.cmd = "fadeStop"; }
	if (command.cmd == "blink" || command.cmd == 25) { command.msg = 25; command.cmd = "blink"; }
	if (command.cmd == "toggle" || command.cmd == 27) { command.msg = 27; command.cmd = "toggle"; }
	command.hex.msg = parseInt(command.msg, 16).toString(16);
	
	if ((command.cmd == "goto" || command.cmd == "fadeStart") && !command.level) { callbackFinal(null, "No level specified! A level must be specified with goto and fadeStart."); }
	if (command.cmd == "blink" && !command.blinkRate) { callbackFinal(null, "No blink rate specified!"); }
	if (command.cmd == "toggle" && !command.toggleCount) { callbackFinal(null, "No toggle count specified!"); }
	
	if (command.level && (command.cmd == "goto" || command.cmd == "fadeStart" || command.cmd == "fadeStop" || command.cmd == "toggle")) { // Add level
		command.words++;
		command.hex.level = parseInt(command.level).toString(16);
	}
	if (command.rate && (command.cmd == "goto" || command.cmd == "fadeStart" || command.cmd == "toggle")) { // Add rate
		command.words++;
		command.hex.rate = parseInt(command.rate).toString(16);
	}
	if (command.cmd == "blink") { // Add blink rate
		command.words++;
		command.hex.blinkRate = parseInt(command.blinkRate).toString(16);
	}
	if (command.cmd == "toggle") { // Add toggle count
		command.words++;
		command.hex.toggleCount = parseInt(command.toggleCount).toString(16);
	}
	if (command.toggleRate && command.cmd == "toggle") { // Add toggle rate
		command.words++;
		command.hex.toggleRate = parseInt(command.toggleRate).toString(16);
	}
	if (command.channel && command.type == "device" && (command.cmd == "goto" || command.cmd == "fadeStart" || command.cmd == "blink" || command.cmd == "toggle")) { // Add channel
		command.words++;
		command.hex.cannel = parseInt(command.channel).toString(16);
	}
	
	if (command.type == "link") { command.ctrlWord.byte1 += 8; }
	if (command.powerlineRepeater == 1) { command.ctrlWord.byte1 += 2; }
	else if (command.powerlineRepeater == 2) { command.ctrlWord.byte1 += 4; }
	else if (command.powerlineRepeater == 4) { command.ctrlWord.byte1 += 6; }
	
	command.ctrlWord.byte2 = command.words;
	
	if (command.ackPulse == true) { command.ctrlWord.byte3 += 1; }
	if (command.idPulse == true) { command.ctrlWord.byte3 += 2; }
	if (command.ackMsg == true) { command.ctrlWord.byte3 += 4; }
	
	if (command.sendx == 2) { command.ctrlWord.byte4 += 4; }
	else if (command.sendx == 3) { command.ctrlWord.byte4 += 8; }
	else if (command.sendx == 4) { command.ctrlWord.byte4 += 12; }
	if (command.sendTime == 2) { command.ctrlWord.byte4 += 1; }
	else if (command.sendTime == 3) { command.ctrlWord.byte4 += 2; }
	else if (command.sendTime == 4) { command.ctrlWord.byte4 += 3; }
	
	command.hex.ctrlWord = {};
	command.hex.ctrlWord.byte1 = parseInt(command.ctrlWord.byte1).toString(16);
	command.hex.ctrlWord.byte2 = parseInt(command.words).toString(16);
	command.hex.ctrlWord.byte3 = parseInt(command.ctrlWord.byte3).toString(16);
	command.hex.ctrlWord.byte4 = parseInt(command.ctrlWord.byte4).toString(16);
	command.hex.ctrlWord.fullByte1 = command.hex.ctrlWord.byte1 + command.hex.ctrlWord.byte2;
	command.hex.ctrlWord.fullByte2 = command.hex.ctrlWord.byte3 + command.hex.ctrlWord.byte4;
	
	command.generated = command.hex.ctrlWord.fullByte1;
	command.generated += command.hex.ctrlWord.fullByte2;
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
	
	command.checksum = checksum(command);
	command.generated += pad(command.checksum, 2, 0);
	
	command.generated = command.generated.toUpperCase();
	
	callbackFinal(command, null);
}
exports.generate = generate;

function decode(commandGenerated, callbackFinal) { // decode(commandInputAsStr, function(commandDecodedJSON, err){});
	command = {};
	command.generated = commandGenerated;
	callbackFinal(command, "This feature has not been implemented yet!");
}
exports.decode = decode;