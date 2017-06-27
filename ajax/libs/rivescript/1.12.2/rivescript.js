(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.RiveScript = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
var Brain, RSVP, inherit_utils, utils;

utils = require("./utils");

inherit_utils = require("./inheritance");

RSVP = require("rsvp");

Brain = (function() {
  function Brain(master) {
    this.master = master;
    this.strict = master._strict;
    this.utf8 = master._utf8;
    this._currentUser = null;
  }

  Brain.prototype.say = function(message) {
    return this.master.say(message);
  };

  Brain.prototype.warn = function(message, filename, lineno) {
    return this.master.warn(message, filename, lineno);
  };

  Brain.prototype.reply = function(user, msg, scope, async) {
    var begin, reply;
    this.say("Asked to reply to [" + user + "] " + msg);
    this._currentUser = user;
    msg = this.formatMessage(msg);
    reply = "";
    if (this.master._topics.__begin__) {
      begin = this._getReply(user, "request", "begin", 0, scope);
      if (begin.indexOf("{ok}") > -1) {
        reply = this._getReply(user, msg, "normal", 0, scope);
        begin = begin.replace(/\{ok\}/g, reply);
      }
      reply = begin;
      reply = this.processTags(user, msg, reply, [], [], 0, scope);
    } else {
      reply = this._getReply(user, msg, "normal", 0, scope);
    }
    reply = this.processCallTags(reply, scope, async);
    if (!utils.isAPromise(reply)) {
      this.onAfterReply(msg, user, reply);
    } else {
      reply.then((function(_this) {
        return function(result) {
          return _this.onAfterReply(msg, user, result);
        };
      })(this));
    }
    return reply;
  };

  Brain.prototype.onAfterReply = function(msg, user, reply) {
    this.master._users[user].__history__.input.pop();
    this.master._users[user].__history__.input.unshift(msg);
    this.master._users[user].__history__.reply.pop();
    this.master._users[user].__history__.reply.unshift(reply);
    return this._currentUser = void 0;
  };

  Brain.prototype.processCallTags = function(reply, scope, async) {
    var args, argsRe, callRe, data, giveup, k, lang, m, match, matches, output, promises, subroutineName, subroutineNameMatch, text;
    reply = reply.replace(/\{__call__\}/g, "<call>");
    reply = reply.replace(/\{\/__call__\}/g, "</call>");
    callRe = /<call>([\s\S]+?)<\/call>/ig;
    argsRe = /{__call_arg__}([^{]*){\/__call_arg__}/ig;
    giveup = 0;
    matches = {};
    promises = [];
    while (true) {
      giveup++;
      if (giveup >= 50) {
        this.warn("Infinite loop looking for call tag!");
        break;
      }
      match = callRe.exec(reply);
      if (!match) {
        break;
      }
      text = utils.trim(match[1]);
      subroutineNameMatch = /(\S+)/ig.exec(text);
      subroutineName = subroutineNameMatch[0];
      args = [];
      while (true) {
        m = argsRe.exec(text);
        if (!m) {
          break;
        }
        args.push(m[1]);
      }
      matches[match[1]] = {
        text: text,
        obj: subroutineName,
        args: args
      };
    }
    for (k in matches) {
      data = matches[k];
      output = "";
      if (this.master._objlangs[data.obj]) {
        lang = this.master._objlangs[data.obj];
        if (this.master._handlers[lang]) {
          output = this.master._handlers[lang].call(this.master, data.obj, data.args, scope);
        } else {
          output = "[ERR: No Object Handler]";
        }
      } else {
        output = this.master.errors.objectNotFound;
      }
      if (utils.isAPromise(output)) {
        if (async) {
          promises.push({
            promise: output,
            text: k
          });
          continue;
        } else {
          output = "[ERR: Using async routine with reply: use replyAsync instead]";
        }
      }
      reply = this._replaceCallTags(k, output, reply);
    }
    if (!async) {
      return reply;
    } else {
      return new RSVP.Promise((function(_this) {
        return function(resolve, reject) {
          var p;
          return RSVP.all((function() {
            var j, len, results1;
            results1 = [];
            for (j = 0, len = promises.length; j < len; j++) {
              p = promises[j];
              results1.push(p.promise);
            }
            return results1;
          })()).then(function(results) {
            var i, j, ref;
            for (i = j = 0, ref = results.length; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
              reply = _this._replaceCallTags(promises[i].text, results[i], reply);
            }
            return resolve(reply);
          })["catch"](function(reason) {
            return reject(reason);
          });
        };
      })(this));
    }
  };

  Brain.prototype._replaceCallTags = function(callSignature, callResult, reply) {
    return reply.replace(new RegExp("<call>" + utils.quotemeta(callSignature) + "</call>", "i"), callResult);
  };

  Brain.prototype._parseCallArgsString = function(args) {
    var buff, c, doubleQuoteRe, flushBuffer, insideAString, j, len, result, spaceRe;
    result = [];
    buff = "";
    insideAString = false;
    spaceRe = /\s/ig;
    doubleQuoteRe = /"/ig;
    flushBuffer = function() {
      if (buff.length !== 0) {
        result.push(buff);
      }
      return buff = "";
    };
    for (j = 0, len = args.length; j < len; j++) {
      c = args[j];
      if (c.match(spaceRe) && !insideAString) {
        flushBuffer();
        continue;
      }
      if (c.match(doubleQuoteRe)) {
        if (insideAString) {
          flushBuffer();
        }
        insideAString = !insideAString;
        continue;
      }
      buff = buff + c;
    }
    flushBuffer();
    return result;
  };

  Brain.prototype._wrapArgumentsInCallTags = function(reply) {
    var a, args, argsMatch, callArgsRegEx, callRegEx, callSignatures, cs, j, l, len, len1, match, originalArgs, originalCallSignature, wrappedArgs, wrappedCallSignature;
    callRegEx = /<call>\s*(.*?)\s*<\/call>/ig;
    callArgsRegEx = /<call>\s*[^\s]+ (.*)<\/call>/ig;
    callSignatures = [];
    while (true) {
      match = callRegEx.exec(reply);
      if (!match) {
        break;
      }
      originalCallSignature = match[0];
      wrappedCallSignature = originalCallSignature;
      while (true) {
        argsMatch = callArgsRegEx.exec(originalCallSignature);
        if (!argsMatch) {
          break;
        }
        originalArgs = argsMatch[1];
        args = this._parseCallArgsString(originalArgs);
        wrappedArgs = [];
        for (j = 0, len = args.length; j < len; j++) {
          a = args[j];
          wrappedArgs.push("{__call_arg__}" + a + "{/__call_arg__}");
        }
        wrappedCallSignature = wrappedCallSignature.replace(originalArgs, wrappedArgs.join(' '));
      }
      callSignatures.push({
        original: originalCallSignature,
        wrapped: wrappedCallSignature
      });
    }
    for (l = 0, len1 = callSignatures.length; l < len1; l++) {
      cs = callSignatures[l];
      reply = reply.replace(cs.original, cs.wrapped);
    }
    return reply;
  };

  Brain.prototype._getReply = function(user, msg, context, step, scope) {
    var allTopics, botside, bucket, choice, condition, e, eq, foundMatch, giveup, halves, i, isAtomic, isMatch, j, l, lastReply, left, len, len1, len2, len3, len4, len5, match, matched, matchedTrigger, n, name, nil, o, passed, pattern, potreply, q, r, redirect, ref, ref1, ref2, ref3, ref4, ref5, ref6, regexp, rep, reply, right, row, s, stars, t, thatstars, top, topic, trig, userSide, value, weight;
    if (!this.master._sorted.topics) {
      this.warn("You forgot to call sortReplies()!");
      return "ERR: Replies Not Sorted";
    }
    if (!this.master.getUservars(user)) {
      this.master.setUservar(user, "topic", "random");
    }
    topic = this.master.getUservar(user, "topic");
    stars = [];
    thatstars = [];
    reply = "";
    if (!this.master._topics[topic]) {
      this.warn("User " + user + " was in an empty topic named '" + topic + "'");
      topic = "random";
      this.master.setUservar(user, "topic", topic);
    }
    if (step > this.master._depth) {
      return this.master.errors.deepRecursion;
    }
    if (context === "begin") {
      topic = "__begin__";
    }
    if (!this.master._users[user].__history__) {
      this.master._users[user].__history__ = {
        "input": ["undefined", "undefined", "undefined", "undefined", "undefined", "undefined", "undefined", "undefined", "undefined", "undefined"],
        "reply": ["undefined", "undefined", "undefined", "undefined", "undefined", "undefined", "undefined", "undefined", "undefined", "undefined"]
      };
    }
    if (!this.master._topics[topic]) {
      return "ERR: No default topic 'random' was found!";
    }
    matched = null;
    matchedTrigger = null;
    foundMatch = false;
    if (step === 0) {
      allTopics = [topic];
      if (this.master._topics[topic].includes || this.master._topics[topic].inherits) {
        allTopics = inherit_utils.getTopicTree(this.master, topic);
      }
      for (j = 0, len = allTopics.length; j < len; j++) {
        top = allTopics[j];
        this.say("Checking topic " + top + " for any %Previous's");
        if (this.master._sorted.thats[top].length) {
          this.say("There's a %Previous in this topic!");
          lastReply = this.master._users[user].__history__.reply[0];
          lastReply = this.formatMessage(lastReply, true);
          this.say("Last reply: " + lastReply);
          ref = this.master._sorted.thats[top];
          for (l = 0, len1 = ref.length; l < len1; l++) {
            trig = ref[l];
            pattern = trig[0];
            botside = this.triggerRegexp(user, pattern);
            this.say("Try to match lastReply (" + lastReply + ") to " + botside);
            match = lastReply.match(new RegExp("^" + botside + "$"));
            if (match) {
              this.say("Bot side matched!");
              thatstars = match;
              thatstars.shift();
              userSide = trig[1];
              regexp = this.triggerRegexp(user, userSide.trigger);
              this.say("Try to match \"" + msg + "\" against " + userSide.trigger + " (" + regexp + ")");
              isAtomic = utils.isAtomic(userSide.trigger);
              isMatch = false;
              if (isAtomic) {
                if (msg === regexp) {
                  isMatch = true;
                }
              } else {
                match = msg.match(new RegExp("^" + regexp + "$"));
                if (match) {
                  isMatch = true;
                  stars = match;
                  if (stars.length >= 1) {
                    stars.shift();
                  }
                }
              }
              if (isMatch) {
                matched = userSide;
                foundMatch = true;
                matchedTrigger = userSide.trigger;
                break;
              }
            }
          }
        } else {
          this.say("No %Previous in this topic!");
        }
      }
    }
    if (!foundMatch) {
      this.say("Searching their topic for a match...");
      ref1 = this.master._sorted.topics[topic];
      for (n = 0, len2 = ref1.length; n < len2; n++) {
        trig = ref1[n];
        pattern = trig[0];
        regexp = this.triggerRegexp(user, pattern);
        this.say("Try to match \"" + msg + "\" against " + pattern + " (" + regexp + ")");
        isAtomic = utils.isAtomic(pattern);
        isMatch = false;
        if (isAtomic) {
          if (msg === regexp) {
            isMatch = true;
          }
        } else {
          match = msg.match(new RegExp("^" + regexp + "$"));
          if (match) {
            isMatch = true;
            stars = [];
            if (match.length > 1) {
              for (i = o = 1, ref2 = match.length; 1 <= ref2 ? o <= ref2 : o >= ref2; i = 1 <= ref2 ? ++o : --o) {
                stars.push(match[i]);
              }
            }
          }
        }
        if (isMatch) {
          this.say("Found a match!");
          matched = trig[1];
          foundMatch = true;
          matchedTrigger = pattern;
          break;
        }
      }
    }
    this.master._users[user].__lastmatch__ = matchedTrigger;
    if (matched) {
      ref3 = [1];
      for (q = 0, len3 = ref3.length; q < len3; q++) {
        nil = ref3[q];
        if (matched.redirect != null) {
          this.say("Redirecting us to " + matched.redirect);
          redirect = this.processTags(user, msg, matched.redirect, stars, thatstars, step, scope);
          this.say("Pretend user said: " + redirect);
          reply = this._getReply(user, redirect, context, step + 1, scope);
          break;
        }
        ref4 = matched.condition;
        for (r = 0, len4 = ref4.length; r < len4; r++) {
          row = ref4[r];
          halves = row.split(/\s*=>\s*/);
          if (halves && halves.length === 2) {
            condition = halves[0].match(/^(.+?)\s+(==|eq|!=|ne|<>|<|<=|>|>=)\s+(.*?)$/);
            if (condition) {
              left = utils.strip(condition[1]);
              eq = condition[2];
              right = utils.strip(condition[3]);
              potreply = halves[1].trim();
              left = this.processTags(user, msg, left, stars, thatstars, step, scope);
              right = this.processTags(user, msg, right, stars, thatstars, step, scope);
              if (left.length === 0) {
                left = "undefined";
              }
              if (right.length === 0) {
                right = "undefined";
              }
              this.say("Check if " + left + " " + eq + " " + right);
              passed = false;
              if (eq === "eq" || eq === "==") {
                if (left === right) {
                  passed = true;
                }
              } else if (eq === "ne" || eq === "!=" || eq === "<>") {
                if (left !== right) {
                  passed = true;
                }
              } else {
                try {
                  left = parseInt(left);
                  right = parseInt(right);
                  if (eq === "<" && left < right) {
                    passed = true;
                  } else if (eq === "<=" && left <= right) {
                    passed = true;
                  } else if (eq === ">" && left > right) {
                    passed = true;
                  } else if (eq === ">=" && left >= right) {
                    passed = true;
                  }
                } catch (_error) {
                  e = _error;
                  this.warn("Failed to evaluate numeric condition!");
                }
              }
              if (passed) {
                reply = potreply;
                break;
              }
            }
          }
        }
        if (reply !== void 0 && reply.length > 0) {
          break;
        }
        bucket = [];
        ref5 = matched.reply;
        for (s = 0, len5 = ref5.length; s < len5; s++) {
          rep = ref5[s];
          weight = 1;
          match = rep.match(/\{weight=(\d+?)\}/i);
          if (match) {
            weight = match[1];
            if (weight <= 0) {
              this.warn("Can't have a weight <= 0!");
              weight = 1;
            }
          }
          for (i = t = 0, ref6 = weight; 0 <= ref6 ? t <= ref6 : t >= ref6; i = 0 <= ref6 ? ++t : --t) {
            bucket.push(rep);
          }
        }
        choice = parseInt(Math.random() * bucket.length);
        reply = bucket[choice];
        break;
      }
    }
    if (!foundMatch) {
      reply = this.master.errors.replyNotMatched;
    } else if (reply === void 0 || reply.length === 0) {
      reply = this.master.errors.replyNotFound;
    }
    this.say("Reply: " + reply);
    if (context === "begin") {
      match = reply.match(/\{topic=(.+?)\}/i);
      giveup = 0;
      while (match) {
        giveup++;
        if (giveup >= 50) {
          this.warn("Infinite loop looking for topic tag!");
          break;
        }
        name = match[1];
        this.master.setUservar(user, "topic", name);
        reply = reply.replace(new RegExp("{topic=" + utils.quotemeta(name) + "}", "ig"), "");
        match = reply.match(/\{topic=(.+?)\}/i);
      }
      match = reply.match(/<set (.+?)=(.+?)>/i);
      giveup = 0;
      while (match) {
        giveup++;
        if (giveup >= 50) {
          this.warn("Infinite loop looking for set tag!");
          break;
        }
        name = match[1];
        value = match[2];
        this.master.setUservar(user, name, value);
        reply = reply.replace(new RegExp("<set " + utils.quotemeta(name) + "=" + utils.quotemeta(value) + ">", "ig"), "");
        match = reply.match(/<set (.+?)=(.+?)>/i);
      }
    } else {
      reply = this.processTags(user, msg, reply, stars, thatstars, step, scope);
    }
    return reply;
  };

  Brain.prototype.formatMessage = function(msg, botreply) {
    msg = "" + msg;
    msg = msg.toLowerCase();
    msg = this.substitute(msg, "sub");
    if (this.utf8) {
      msg = msg.replace(/[\\<>]+/, "");
      if (this.master.unicodePunctuation != null) {
        msg = msg.replace(this.master.unicodePunctuation, "");
      }
      if (botreply != null) {
        msg = msg.replace(/[.?,!;:@#$%^&*()]/, "");
      }
    } else {
      msg = utils.stripNasties(msg, this.utf8);
    }
    msg = msg.trim();
    msg = msg.replace(/\s+/g, " ");
    return msg;
  };

  Brain.prototype.triggerRegexp = function(user, regexp) {
    var giveup, i, j, l, len, len1, match, n, name, opts, p, parts, pipes, ref, rep, type;
    regexp = regexp.replace(/^\*$/, "<zerowidthstar>");
    regexp = regexp.replace(/\*/g, "(.+?)");
    regexp = regexp.replace(/#/g, "(\\d+?)");
    regexp = regexp.replace(/_/g, "(\\w+?)");
    regexp = regexp.replace(/\{weight=\d+\}/g, "");
    regexp = regexp.replace(/<zerowidthstar>/g, "(.*?)");
    regexp = regexp.replace(/\|{2,}/, '|');
    regexp = regexp.replace(/(\(|\[)\|/g, '$1');
    regexp = regexp.replace(/\|(\)|\])/g, '$1');
    if (this.utf8) {
      regexp = regexp.replace(/\\@/, "\\u0040");
    }
    match = regexp.match(/\[(.+?)\]/);
    giveup = 0;
    while (match) {
      if (giveup++ > 50) {
        this.warn("Infinite loop when trying to process optionals in a trigger!");
        return "";
      }
      parts = match[1].split("|");
      opts = [];
      for (j = 0, len = parts.length; j < len; j++) {
        p = parts[j];
        opts.push("(?:\\s|\\b)+" + p + "(?:\\s|\\b)+");
      }
      pipes = opts.join("|");
      pipes = pipes.replace(new RegExp(utils.quotemeta("(.+?)"), "g"), "(?:.+?)");
      pipes = pipes.replace(new RegExp(utils.quotemeta("(\\d+?)"), "g"), "(?:\\d+?)");
      pipes = pipes.replace(new RegExp(utils.quotemeta("(\\w+?)"), "g"), "(?:\\w+?)");
      pipes = pipes.replace(/\[/g, "__lb__").replace(/\]/g, "__rb__");
      regexp = regexp.replace(new RegExp("\\s*\\[" + utils.quotemeta(match[1]) + "\\]\\s*"), "(?:" + pipes + "|(?:\\b|\\s)+)");
      match = regexp.match(/\[(.+?)\]/);
    }
    regexp = regexp.replace(/__lb__/g, "[").replace(/__rb__/g, "]");
    regexp = regexp.replace(/\\w/, "[A-Za-z]");
    giveup = 0;
    while (regexp.indexOf("@") > -1) {
      if (giveup++ > 50) {
        break;
      }
      match = regexp.match(/\@(.+?)\b/);
      if (match) {
        name = match[1];
        rep = "";
        if (this.master._array[name]) {
          rep = "(?:" + this.master._array[name].join("|") + ")";
        }
        regexp = regexp.replace(new RegExp("@" + utils.quotemeta(name) + "\\b"), rep);
      }
    }
    giveup = 0;
    while (regexp.indexOf("<bot") > -1) {
      if (giveup++ > 50) {
        break;
      }
      match = regexp.match(/<bot (.+?)>/i);
      if (match) {
        name = match[1];
        rep = '';
        if (this.master._var[name]) {
          rep = utils.stripNasties(this.master._var[name]);
        }
        regexp = regexp.replace(new RegExp("<bot " + utils.quotemeta(name) + ">"), rep.toLowerCase());
      }
    }
    giveup = 0;
    while (regexp.indexOf("<get") > -1) {
      if (giveup++ > 50) {
        break;
      }
      match = regexp.match(/<get (.+?)>/i);
      if (match) {
        name = match[1];
        rep = this.master.getUservar(user, name);
        regexp = regexp.replace(new RegExp("<get " + utils.quotemeta(name) + ">", "ig"), rep.toLowerCase());
      }
    }
    giveup = 0;
    regexp = regexp.replace(/<input>/i, "<input1>");
    regexp = regexp.replace(/<reply>/i, "<reply1>");
    while (regexp.indexOf("<input") > -1 || regexp.indexOf("<reply") > -1) {
      if (giveup++ > 50) {
        break;
      }
      ref = ["input", "reply"];
      for (l = 0, len1 = ref.length; l < len1; l++) {
        type = ref[l];
        for (i = n = 1; n <= 9; i = ++n) {
          if (regexp.indexOf("<" + type + i + ">") > -1) {
            regexp = regexp.replace(new RegExp("<" + type + i + ">", "g"), this.master._users[user].__history__[type][i]);
          }
        }
      }
    }
    if (this.utf8 && regexp.indexOf("\\u") > -1) {
      regexp = regexp.replace(/\\u([A-Fa-f0-9]{4})/, function(match, grp) {
        return String.fromCharCode(parseInt(grp, 16));
      });
    }
    return regexp;
  };

  Brain.prototype.processTags = function(user, msg, reply, st, bst, step, scope) {
    var botstars, content, data, formats, giveup, i, insert, j, l, len, match, n, name, o, output, parts, random, ref, ref1, replace, result, stars, subreply, tag, target, text, type, value;
    stars = [""];
    stars.push.apply(stars, st);
    botstars = [""];
    botstars.push.apply(botstars, bst);
    if (stars.length === 1) {
      stars.push("undefined");
    }
    if (botstars.length === 1) {
      botstars.push("undefined");
    }
    match = reply.match(/\(@([A-Za-z0-9_]+)\)/i);
    giveup = 0;
    while (match) {
      if (giveup++ > this.master._depth) {
        this.warn("Infinite loop looking for arrays in reply!");
        break;
      }
      name = match[1];
      if (this.master._array[name]) {
        result = "{random}" + this.master._array[name].join("|") + "{/random}";
      } else {
        result = "\x00@" + name + "\x00";
      }
      reply = reply.replace(new RegExp("\\(@" + utils.quotemeta(name) + "\\)", "ig"), result);
      match = reply.match(/\(@([A-Za-z0-9_]+)\)/i);
    }
    reply = reply.replace(/\x00@([A-Za-z0-9_]+)\x00/g, "(@$1)");
    reply = this._wrapArgumentsInCallTags(reply);
    reply = reply.replace(/<person>/ig, "{person}<star>{/person}");
    reply = reply.replace(/<@>/ig, "{@<star>}");
    reply = reply.replace(/<formal>/ig, "{formal}<star>{/formal}");
    reply = reply.replace(/<sentence>/ig, "{sentence}<star>{/sentence}");
    reply = reply.replace(/<uppercase>/ig, "{uppercase}<star>{/uppercase}");
    reply = reply.replace(/<lowercase>/ig, "{lowercase}<star>{/lowercase}");
    reply = reply.replace(/\{weight=\d+\}/ig, "");
    reply = reply.replace(/<star>/ig, stars[1]);
    reply = reply.replace(/<botstar>/ig, botstars[1]);
    for (i = j = 1, ref = stars.length; 1 <= ref ? j <= ref : j >= ref; i = 1 <= ref ? ++j : --j) {
      reply = reply.replace(new RegExp("<star" + i + ">", "ig"), stars[i]);
    }
    for (i = l = 1, ref1 = botstars.length; 1 <= ref1 ? l <= ref1 : l >= ref1; i = 1 <= ref1 ? ++l : --l) {
      reply = reply.replace(new RegExp("<botstar" + i + ">", "ig"), botstars[i]);
    }
    reply = reply.replace(/<input>/ig, this.master._users[user].__history__.input[0]);
    reply = reply.replace(/<reply>/ig, this.master._users[user].__history__.reply[0]);
    for (i = n = 1; n <= 9; i = ++n) {
      if (reply.indexOf("<input" + i + ">") > -1) {
        reply = reply.replace(new RegExp("<input" + i + ">", "ig"), this.master._users[user].__history__.input[i]);
      }
      if (reply.indexOf("<reply" + i + ">") > -1) {
        reply = reply.replace(new RegExp("<reply" + i + ">", "ig"), this.master._users[user].__history__.reply[i]);
      }
    }
    reply = reply.replace(/<id>/ig, user);
    reply = reply.replace(/\\s/ig, " ");
    reply = reply.replace(/\\n/ig, "\n");
    reply = reply.replace(/\\#/ig, "#");
    match = reply.match(/\{random\}(.+?)\{\/random\}/i);
    giveup = 0;
    while (match) {
      if (giveup++ > this.master._depth) {
        this.warn("Infinite loop looking for random tag!");
        break;
      }
      random = [];
      text = match[1];
      if (text.indexOf("|") > -1) {
        random = text.split("|");
      } else {
        random = text.split(" ");
      }
      output = random[parseInt(Math.random() * random.length)];
      reply = reply.replace(new RegExp("\\{random\\}" + utils.quotemeta(text) + "\\{\\/random\\}", "ig"), output);
      match = reply.match(/\{random\}(.+?)\{\/random\}/i);
    }
    formats = ["person", "formal", "sentence", "uppercase", "lowercase"];
    for (o = 0, len = formats.length; o < len; o++) {
      type = formats[o];
      match = reply.match(new RegExp("{" + type + "}(.+?){/" + type + "}", "i"));
      giveup = 0;
      while (match) {
        giveup++;
        if (giveup >= 50) {
          this.warn("Infinite loop looking for " + type + " tag!");
          break;
        }
        content = match[1];
        if (type === "person") {
          replace = this.substitute(content, "person");
        } else {
          replace = utils.stringFormat(type, content);
        }
        reply = reply.replace(new RegExp(("{" + type + "}") + utils.quotemeta(content) + ("{/" + type + "}"), "ig"), replace);
        match = reply.match(new RegExp("{" + type + "}(.+?){/" + type + "}", "i"));
      }
    }
    reply = reply.replace(/<call>/ig, "{__call__}");
    reply = reply.replace(/<\/call>/ig, "{/__call__}");
    while (true) {
      match = reply.match(/<([^<]+?)>/);
      if (!match) {
        break;
      }
      match = match[1];
      parts = match.split(" ");
      tag = parts[0].toLowerCase();
      data = "";
      if (parts.length > 1) {
        data = parts.slice(1).join(" ");
      }
      insert = "";
      if (tag === "bot" || tag === "env") {
        target = tag === "bot" ? this.master._var : this.master._global;
        if (data.indexOf("=") > -1) {
          parts = data.split("=", 2);
          this.say("Set " + tag + " variable " + parts[0] + " = " + parts[1]);
          target[parts[0]] = parts[1];
        } else {
          insert = target[data] || "undefined";
        }
      } else if (tag === "set") {
        parts = data.split("=", 2);
        this.say("Set uservar " + parts[0] + " = " + parts[1]);
        this.master.setUservar(user, parts[0], parts[1]);
      } else if (tag === "add" || tag === "sub" || tag === "mult" || tag === "div") {
        parts = data.split("=");
        name = parts[0];
        value = parts[1];
        if (this.master.getUservar(user, name) === "undefined") {
          this.master.setUservar(user, name, 0);
        }
        value = parseInt(value);
        if (isNaN(value)) {
          insert = "[ERR: Math can't '" + tag + "' non-numeric value '" + value + "']";
        } else if (isNaN(parseInt(this.master.getUservar(user, name)))) {
          insert = "[ERR: Math can't '" + tag + "' non-numeric user variable '" + name + "']";
        } else {
          result = parseInt(this.master.getUservar(user, name));
          if (tag === "add") {
            result += value;
          } else if (tag === "sub") {
            result -= value;
          } else if (tag === "mult") {
            result *= value;
          } else if (tag === "div") {
            if (value === 0) {
              insert = "[ERR: Can't Divide By Zero]";
            } else {
              result /= value;
            }
          }
          if (insert === "") {
            this.master.setUservar(user, name, result);
          }
        }
      } else if (tag === "get") {
        insert = this.master.getUservar(user, data);
      } else {
        insert = "\x00" + match + "\x01";
      }
      reply = reply.replace(new RegExp("<" + (utils.quotemeta(match)) + ">"), insert);
    }
    reply = reply.replace(/\x00/g, "<");
    reply = reply.replace(/\x01/g, ">");
    match = reply.match(/\{topic=(.+?)\}/i);
    giveup = 0;
    while (match) {
      giveup++;
      if (giveup >= 50) {
        this.warn("Infinite loop looking for topic tag!");
        break;
      }
      name = match[1];
      this.master.setUservar(user, "topic", name);
      reply = reply.replace(new RegExp("{topic=" + utils.quotemeta(name) + "}", "ig"), "");
      match = reply.match(/\{topic=(.+?)\}/i);
    }
    match = reply.match(/\{@([^\}]*?)\}/);
    giveup = 0;
    while (match) {
      giveup++;
      if (giveup >= 50) {
        this.warn("Infinite loop looking for redirect tag!");
        break;
      }
      target = match[1];
      this.say("Inline redirection to: " + target);
      subreply = this._getReply(user, target, "normal", step + 1, scope);
      reply = reply.replace(new RegExp("\\{@" + utils.quotemeta(target) + "\\}", "i"), subreply);
      match = reply.match(/\{@([^\}]*?)\}/);
    }
    return reply;
  };

  Brain.prototype.substitute = function(msg, type) {
    var cap, j, len, match, pattern, ph, pi, placeholder, qm, ref, result, subs, tries;
    result = "";
    if (!this.master._sorted[type]) {
      this.master.warn("You forgot to call sortReplies()!");
      return "";
    }
    subs = type === "sub" ? this.master._sub : this.master._person;
    ph = [];
    pi = 0;
    ref = this.master._sorted[type];
    for (j = 0, len = ref.length; j < len; j++) {
      pattern = ref[j];
      result = subs[pattern];
      qm = utils.quotemeta(pattern);
      ph.push(result);
      placeholder = "\x00" + pi + "\x00";
      pi++;
      msg = msg.replace(new RegExp("^" + qm + "$", "g"), placeholder);
      msg = msg.replace(new RegExp("^" + qm + "(\\W+)", "g"), placeholder + "$1");
      msg = msg.replace(new RegExp("(\\W+)" + qm + "(\\W+)", "g"), "$1" + placeholder + "$2");
      msg = msg.replace(new RegExp("(\\W+)" + qm + "$", "g"), "$1" + placeholder);
    }
    tries = 0;
    while (msg.indexOf("\x00") > -1) {
      tries++;
      if (tries > 50) {
        this.warn("Too many loops in substitution placeholders!");
        break;
      }
      match = msg.match("\\x00(.+?)\\x00");
      if (match) {
        cap = parseInt(match[1]);
        result = ph[cap];
        msg = msg.replace(new RegExp("\x00" + cap + "\x00", "g"), result);
      }
    }
    return msg;
  };

  return Brain;

})();

module.exports = Brain;

},{"./inheritance":2,"./utils":7,"rsvp":12}],2:[function(require,module,exports){
var getTopicTree, getTopicTriggers;

getTopicTriggers = function(rs, topic, thats, depth, inheritance, inherited) {
  var curTrig, i, inThisTopic, includes, inherits, j, len, len1, previous, ref, trigger, triggers;
  if (thats == null) {
    thats = false;
  }
  if (depth == null) {
    depth = 0;
  }
  if (inheritance == null) {
    inheritance = 0;
  }
  if (inherited == null) {
    inherited = 0;
  }
  if (depth > rs._depth) {
    rs.warn("Deep recursion while scanning topic inheritance!");
    return [];
  }
  rs.say(("Collecting trigger list for topic " + topic + " (depth=" + depth + "; ") + ("inheritance=" + inheritance + "; inherited=" + inherited + ")"));
  if (rs._topics[topic] == null) {
    rs.warn(("Inherited or included topic '" + topic + "' doesn't exist or ") + "has no triggers");
    return [];
  }
  triggers = [];
  inThisTopic = [];
  if (!thats) {
    if (rs._topics[topic] != null) {
      ref = rs._topics[topic];
      for (i = 0, len = ref.length; i < len; i++) {
        trigger = ref[i];
        inThisTopic.push([trigger.trigger, trigger]);
      }
    }
  } else {
    if (rs._thats[topic] != null) {
      for (curTrig in rs._thats[topic]) {
        if (!rs._thats[topic].hasOwnProperty(curTrig)) {
          continue;
        }
        for (previous in rs._thats[topic][curTrig]) {
          if (!rs._thats[topic][curTrig].hasOwnProperty(previous)) {
            continue;
          }
          inThisTopic.push([previous, rs._thats[topic][curTrig][previous]]);
        }
      }
    }
  }
  if (Object.keys(rs._includes[topic]).length > 0) {
    for (includes in rs._includes[topic]) {
      if (!rs._includes[topic].hasOwnProperty(includes)) {
        continue;
      }
      rs.say("Topic " + topic + " includes " + includes);
      triggers.push.apply(triggers, getTopicTriggers(rs, includes, thats, depth + 1, inheritance + 1, false));
    }
  }
  if (Object.keys(rs._inherits[topic]).length > 0) {
    for (inherits in rs._inherits[topic]) {
      if (!rs._inherits[topic].hasOwnProperty(inherits)) {
        continue;
      }
      rs.say("Topic " + topic + " inherits " + inherits);
      triggers.push.apply(triggers, getTopicTriggers(rs, inherits, thats, depth + 1, inheritance + 1, true));
    }
  }
  if (Object.keys(rs._inherits[topic]).length > 0 || inherited) {
    for (j = 0, len1 = inThisTopic.length; j < len1; j++) {
      trigger = inThisTopic[j];
      rs.say("Prefixing trigger with {inherits=" + inheritance + "} " + trigger);
      triggers.push.apply(triggers, [["{inherits=" + inheritance + "}" + trigger[0], trigger[1]]]);
    }
  } else {
    triggers.push.apply(triggers, inThisTopic);
  }
  return triggers;
};

getTopicTree = function(rs, topic, depth) {
  var includes, inherits, topics;
  if (depth == null) {
    depth = 0;
  }
  if (depth > rs._depth) {
    rs.warn("Deep recursion while scanning topic tree!");
    return [];
  }
  topics = [topic];
  for (includes in rs._topics[topic].includes) {
    if (!rs._topics[topic].includes.hasOwnProperty(includes)) {
      continue;
    }
    topics.push.apply(topics, getTopicTree(rs, includes, depth + 1));
  }
  for (inherits in rs._topics[topic].inherits) {
    if (!rs._topics[topic].inherits.hasOwnProperty(inherits)) {
      continue;
    }
    topics.push.apply(topics, getTopicTree(rs, inherits, depth + 1));
  }
  return topics;
};

exports.getTopicTriggers = getTopicTriggers;

exports.getTopicTree = getTopicTree;

},{}],3:[function(require,module,exports){
"use strict";
var JSObjectHandler;

JSObjectHandler = (function() {
  function JSObjectHandler(master) {
    this._master = master;
    this._objects = {};
  }

  JSObjectHandler.prototype.load = function(name, code) {
    var e, source;
    if (typeof code === "function") {
      return this._objects[name] = code;
    } else {
      source = "this._objects[\"" + name + "\"] = function(rs, args) {\n" + code.join("\n") + "}\n";
      try {
        return eval(source);
      } catch (_error) {
        e = _error;
        return this._master.warn("Error evaluating JavaScript object: " + e.message);
      }
    }
  };

  JSObjectHandler.prototype.call = function(rs, name, fields, scope) {
    var e, func, reply;
    if (!this._objects[name]) {
      return this._master.errors.objectNotFound;
    }
    func = this._objects[name];
    reply = "";
    try {
      reply = func.call(scope, rs, fields);
    } catch (_error) {
      e = _error;
      reply = "[ERR: Error when executing JavaScript object: " + e.message + "]";
    }
    if (reply === void 0) {
      reply = "";
    }
    return reply;
  };

  return JSObjectHandler;

})();

module.exports = JSObjectHandler;

},{}],4:[function(require,module,exports){
"use strict";
var Parser, RS_VERSION, utils;

utils = require("./utils");

RS_VERSION = "2.0";

Parser = (function() {
  function Parser(master) {
    this.master = master;
    this.strict = master._strict;
    this.utf8 = master._utf8;
  }

  Parser.prototype.say = function(message) {
    return this.master.say(message);
  };

  Parser.prototype.warn = function(message, filename, lineno) {
    return this.master.warn(message, filename, lineno);
  };

  Parser.prototype.parse = function(filename, code, onError) {
    var ast, cmd, comment, concatModes, curTrig, field, fields, halves, i, inobj, isThat, j, k, l, lang, lastcmd, left, len, len1, len2, len3, len4, li, line, lineno, lines, localOptions, lookCmd, lookahead, lp, m, mode, n, name, objBuf, objLang, objName, parts, ref, syntaxError, temp, topic, type, val, value;
    ast = {
      begin: {
        global: {},
        "var": {},
        sub: {},
        person: {},
        array: {}
      },
      topics: {},
      objects: []
    };
    topic = "random";
    lineno = 0;
    comment = false;
    inobj = false;
    objName = "";
    objLang = "";
    objBuf = [];
    curTrig = null;
    lastcmd = "";
    isThat = null;
    localOptions = {
      concat: "none"
    };
    concatModes = {
      none: "",
      newline: "\n",
      space: " "
    };
    lines = code.split("\n");
    for (lp = j = 0, len = lines.length; j < len; lp = ++j) {
      line = lines[lp];
      lineno = lp + 1;
      line = utils.strip(line);
      if (line.length === 0) {
        continue;
      }
      if (inobj) {
        if (line.indexOf("< object") > -1 || line.indexOf("<object") > -1) {
          if (objName.length > 0) {
            ast.objects.push({
              name: objName,
              language: objLang,
              code: objBuf
            });
          }
          objName = objLang = "";
          objBuf = [];
          inobj = false;
        } else {
          objBuf.push(line);
        }
        continue;
      }
      if (line.indexOf("//") === 0) {
        continue;
      } else if (line.indexOf("#") === 0) {
        this.warn("Using the # symbol for comments is deprecated", filename, lineno);
        continue;
      } else if (line.indexOf("/*") === 0) {
        if (line.indexOf("*/") > -1) {
          continue;
        }
        comment = true;
        continue;
      } else if (line.indexOf("*/") > -1) {
        comment = false;
        continue;
      }
      if (comment) {
        continue;
      }
      if (line.length < 2) {
        this.warn("Weird single-character line '" + line + "' found.", filename, lineno);
        continue;
      }
      cmd = line.substring(0, 1);
      line = utils.strip(line.substring(1));
      if (line.indexOf(" // ") > -1) {
        line = utils.strip(line.split(" // ")[0]);
      }
      syntaxError = this.checkSyntax(cmd, line);
      if (syntaxError !== "") {
        if (this.strict && typeof onError === "function") {
          onError.call(null, "Syntax error: " + syntaxError + " at " + filename + " line " + lineno + " near " + cmd + " " + line);
        } else {
          this.warn("Syntax error: " + syntaxError + " at " + filename + " line " + lineno + " near " + cmd + " " + line);
        }
      }
      if (cmd === "+") {
        isThat = null;
      }
      this.say("Cmd: " + cmd + "; line: " + line);
      ref = lines.slice(lp + 1);
      for (li = k = 0, len1 = ref.length; k < len1; li = ++k) {
        lookahead = ref[li];
        lookahead = utils.strip(lookahead);
        if (lookahead.length < 2) {
          continue;
        }
        lookCmd = lookahead.substring(0, 1);
        lookahead = utils.strip(lookahead.substring(1));
        if (lookCmd !== "%" && lookCmd !== "^") {
          break;
        }
        if (lookahead.length === 0) {
          break;
        }
        this.say("\tLookahead " + li + ": " + lookCmd + " " + lookahead);
        if (cmd === "+") {
          if (lookCmd === "%") {
            isThat = lookahead;
            break;
          } else {
            isThat = null;
          }
        }
        if (cmd === "!") {
          if (lookCmd === "^") {
            line += "<crlf>" + lookahead;
          }
          continue;
        }
        if (cmd !== "^" && lookCmd !== "%") {
          if (lookCmd === "^") {
            if (concatModes[localOptions.concat] !== void 0) {
              line += concatModes[localOptions.concat] + lookahead;
            } else {
              line += lookahead;
            }
          } else {
            break;
          }
        }
      }
      switch (cmd) {
        case "!":
          halves = line.split("=", 2);
          left = utils.strip(halves[0]).split(" ");
          value = type = name = "";
          if (halves.length === 2) {
            value = utils.strip(halves[1]);
          }
          if (left.length >= 1) {
            type = utils.strip(left[0]);
            if (left.length >= 2) {
              left.shift();
              name = utils.strip(left.join(" "));
            }
          }
          if (type !== "array") {
            value = value.replace(/<crlf>/g, "");
          }
          if (type === "version") {
            if (parseFloat(value) > parseFloat(RS_VERSION)) {
              this.warn("Unsupported RiveScript version. We only support " + RS_VERSION, filename, lineno);
              return false;
            }
            continue;
          }
          if (name.length === 0) {
            this.warn("Undefined variable name", filename, lineno);
            continue;
          }
          if (value.length === 0) {
            this.warn("Undefined variable value", filename, lineno);
            continue;
          }
          switch (type) {
            case "local":
              this.say("\tSet local parser option " + name + " = " + value);
              localOptions[name] = value;
              break;
            case "global":
              this.say("\tSet global " + name + " = " + value);
              ast.begin.global[name] = value;
              break;
            case "var":
              this.say("\tSet bot variable " + name + " = " + value);
              ast.begin["var"][name] = value;
              break;
            case "array":
              this.say("\tSet array " + name + " = " + value);
              if (value === "<undef>") {
                ast.begin.array[name] = "<undef>";
                continue;
              }
              parts = value.split("<crlf>");
              fields = [];
              for (l = 0, len2 = parts.length; l < len2; l++) {
                val = parts[l];
                if (val.indexOf("|") > -1) {
                  fields.push.apply(fields, val.split("|"));
                } else {
                  fields.push.apply(fields, val.split(" "));
                }
              }
              for (i = m = 0, len3 = fields.length; m < len3; i = ++m) {
                field = fields[i];
                fields[i] = fields[i].replace(/\\s/ig, " ");
              }
              fields = fields.filter(function(val) {
                return val !== '';
              });
              ast.begin.array[name] = fields;
              break;
            case "sub":
              this.say("\tSet substitution " + name + " = " + value);
              ast.begin.sub[name] = value;
              break;
            case "person":
              this.say("\tSet person substitution " + name + " = " + value);
              ast.begin.person[name] = value;
              break;
            default:
              this.warn("Unknown definition type " + type, filename, lineno);
          }
          break;
        case ">":
          temp = utils.strip(line).split(" ");
          type = temp.shift();
          name = "";
          fields = [];
          if (temp.length > 0) {
            name = temp.shift();
          }
          if (temp.length > 0) {
            fields = temp;
          }
          switch (type) {
            case "begin":
            case "topic":
              if (type === "begin") {
                this.say("Found the BEGIN block.");
                type = "topic";
                name = "__begin__";
              }
              this.say("Set topic to " + name);
              curTrig = null;
              topic = name;
              this.initTopic(ast.topics, topic);
              mode = "";
              if (fields.length >= 2) {
                for (n = 0, len4 = fields.length; n < len4; n++) {
                  field = fields[n];
                  if (field === "includes" || field === "inherits") {
                    mode = field;
                  } else if (mode !== "") {
                    ast.topics[topic][mode][field] = 1;
                  }
                }
              }
              break;
            case "object":
              lang = "";
              if (fields.length > 0) {
                lang = fields[0].toLowerCase();
              }
              if (lang === "") {
                this.warn("Trying to parse unknown programming language", filename, lineno);
                lang = "javascript";
              }
              objName = name;
              objLang = lang;
              objBuf = [];
              inobj = true;
              break;
            default:
              this.warn("Unknown label type " + type, filename, lineno);
          }
          break;
        case "<":
          type = line;
          if (type === "begin" || type === "topic") {
            this.say("\tEnd the topic label.");
            topic = "random";
          } else if (type === "object") {
            this.say("\tEnd the object label.");
            inobj = false;
          }
          break;
        case "+":
          this.say("\tTrigger pattern: " + line);
          this.initTopic(ast.topics, topic);
          curTrig = {
            trigger: line,
            reply: [],
            condition: [],
            redirect: null,
            previous: isThat
          };
          ast.topics[topic].triggers.push(curTrig);
          break;
        case "-":
          if (curTrig === null) {
            this.warn("Response found before trigger", filename, lineno);
            continue;
          }
          this.say("\tResponse: " + line);
          curTrig.reply.push(line);
          break;
        case "*":
          if (curTrig === null) {
            this.warn("Condition found before trigger", filename, lineno);
            continue;
          }
          this.say("\tCondition: " + line);
          curTrig.condition.push(line);
          break;
        case "%":
          continue;
        case "^":
          continue;
        case "@":
          this.say("\tRedirect response to: " + line);
          curTrig.redirect = utils.strip(line);
          break;
        default:
          this.warn("Unknown command '" + cmd + "'", filename, lineno);
      }
    }
    return ast;
  };

  Parser.prototype.stringify = function(deparsed) {
    var _writeTriggers, begin, doneRandom, func, i, includes, inherits, j, k, key, l, lang, len, len1, len2, pipes, ref, ref1, ref2, source, tagged, tagline, test, topic, topics, value;
    if (deparsed == null) {
      deparsed = this.master.deparse();
    }
    _writeTriggers = function(triggers, indent) {
      var c, id, j, k, l, len, len1, len2, output, r, ref, ref1, t;
      id = indent ? "\t" : "";
      output = [];
      for (j = 0, len = triggers.length; j < len; j++) {
        t = triggers[j];
        output.push(id + "+ " + t.trigger);
        if (t.previous) {
          output.push(id + "% " + t.previous);
        }
        if (t.condition) {
          ref = t.condition;
          for (k = 0, len1 = ref.length; k < len1; k++) {
            c = ref[k];
            output.push(id + "* " + (c.replace(/\n/mg, "\\n")));
          }
        }
        if (t.redirect) {
          output.push(id + "@ " + t.redirect);
        }
        if (t.reply) {
          ref1 = t.reply;
          for (l = 0, len2 = ref1.length; l < len2; l++) {
            r = ref1[l];
            output.push(id + "- " + (r.replace(/\n/mg, "\\n")));
          }
        }
        output.push("");
      }
      return output;
    };
    source = ["! version = 2.0", "! local concat = none", ""];
    ref = ["global", "var", "sub", "person", "array"];
    for (j = 0, len = ref.length; j < len; j++) {
      begin = ref[j];
      if ((deparsed.begin[begin] != null) && Object.keys(deparsed.begin[begin]).length) {
        ref1 = deparsed.begin[begin];
        for (key in ref1) {
          value = ref1[key];
          if (!deparsed.begin[begin].hasOwnProperty(key)) {
            continue;
          }
          if (begin !== "array") {
            source.push("! " + begin + " " + key + " = " + value);
          } else {
            pipes = " ";
            for (k = 0, len1 = value.length; k < len1; k++) {
              test = value[k];
              if (test.match(/\s+/)) {
                pipes = "|";
                break;
              }
            }
            source.push(("! " + begin + " " + key + " = ") + value.join(pipes));
          }
        }
        source.push("");
      }
    }
    if (deparsed.objects) {
      for (lang in deparsed.objects) {
        if (deparsed.objects[lang] && deparsed.objects[lang]._objects) {
          for (func in deparsed.objects[lang]._objects) {
            source.push("> object " + func + " " + lang);
            source.push(deparsed.objects[lang]._objects[func].toString().match(/function[^{]+\{\n*([\s\S]*)\}\;?\s*$/m)[1].trim().split("\n").map(function(ln) {
              return "\t" + ln;
            }).join("\n"));
            source.push("< object\n");
          }
        }
      }
    }
    if ((ref2 = deparsed.begin.triggers) != null ? ref2.length : void 0) {
      source.push("> begin\n");
      source.push.apply(source, _writeTriggers(deparsed.begin.triggers, "indent"));
      source.push("< begin\n");
    }
    topics = Object.keys(deparsed.topics).sort(function(a, b) {
      return a - b;
    });
    topics.unshift("random");
    doneRandom = false;
    for (l = 0, len2 = topics.length; l < len2; l++) {
      topic = topics[l];
      if (!deparsed.topics.hasOwnProperty(topic)) {
        continue;
      }
      if (topic === "random" && doneRandom) {
        continue;
      }
      if (topic === "random") {
        doneRandom = 1;
      }
      tagged = false;
      tagline = [];
      if (topic !== "random" || (Object.keys(deparsed.inherits[topic]).length > 0 || Object.keys(deparsed.includes[topic]).length > 0)) {
        if (topic !== "random") {
          tagged = true;
        }
        inherits = [];
        includes = [];
        for (i in deparsed.inherits[topic]) {
          if (!deparsed.inherits[topic].hasOwnProperty(i)) {
            continue;
          }
          inherits.push(i);
        }
        for (i in deparsed.includes[topic]) {
          if (!deparsed.includes[topic].hasOwnProperty(i)) {
            continue;
          }
          includes.push(i);
        }
        if (includes.length > 0) {
          includes.unshift("includes");
          tagline.push.apply(tagline, includes);
          tagged = true;
        }
        if (inherits.length > 0) {
          inherits.unshift("inherits");
          tagline.push.apply(tagline, inherits);
          tagged = true;
        }
      }
      if (tagged) {
        source.push((("> topic " + topic + " ") + tagline.join(" ")).trim() + "\n");
      }
      source.push.apply(source, _writeTriggers(deparsed.topics[topic], tagged));
      if (tagged) {
        source.push("< topic\n");
      }
    }
    return source.join("\n");
  };

  Parser.prototype.checkSyntax = function(cmd, line) {
    var angle, char, chars, curly, j, len, parens, parts, square;
    if (cmd === "!") {
      if (!line.match(/^.+(?:\s+.+|)\s*=\s*.+?$/)) {
        return "Invalid format for !Definition line: must be '! type name = value' OR '! type = value'";
      } else if (line.match(/^array/)) {
        if (line.match(/\=\s?\||\|\s?$/)) {
          return "Piped arrays can't begin or end with a |";
        } else if (line.match(/\|\|/)) {
          return "Piped arrays can't include blank entries";
        }
      }
    } else if (cmd === ">") {
      parts = line.split(/\s+/);
      if (parts[0] === "begin" && parts.length > 1) {
        return "The 'begin' label takes no additional arguments";
      } else if (parts[0] === "topic") {
        if (line.match(/[^a-z0-9_\-\s]/)) {
          return "Topics should be lowercased and contain only letters and numbers";
        }
      } else if (parts[0] === "object") {
        if (line.match(/[^A-Za-z0-9\_\-\s]/)) {
          return "Objects can only contain numbers and letters";
        }
      }
    } else if (cmd === "+" || cmd === "%" || cmd === "@") {
      parens = square = curly = angle = 0;
      if (this.utf8) {
        if (line.match(/[A-Z\\.]/)) {
          return "Triggers can't contain uppercase letters, backslashes or dots in UTF-8 mode";
        }
      } else if (line.match(/[^a-z0-9(|)\[\]*_#@{}<>=\s]/)) {
        return "Triggers may only contain lowercase letters, numbers, and these symbols: ( | ) [ ] * _ # { } < > =";
      } else if (line.match(/\(\||\|\)/)) {
        return "Piped alternations can't begin or end with a |";
      } else if (line.match(/\([^\)].+\|\|.+\)/)) {
        return "Piped alternations can't include blank entries";
      } else if (line.match(/\[\||\|\]/)) {
        return "Piped optionals can't begin or end with a |";
      } else if (line.match(/\[[^\]].+\|\|.+\]/)) {
        return "Piped optionals can't include blank entries";
      }
      chars = line.split("");
      for (j = 0, len = chars.length; j < len; j++) {
        char = chars[j];
        switch (char) {
          case "(":
            parens++;
            break;
          case ")":
            parens--;
            break;
          case "[":
            square++;
            break;
          case "]":
            square--;
            break;
          case "{":
            curly++;
            break;
          case "}":
            curly--;
            break;
          case "<":
            angle++;
            break;
          case ">":
            angle--;
        }
      }
      if (parens !== 0) {
        return "Unmatched parenthesis brackets";
      }
      if (square !== 0) {
        return "Unmatched square brackets";
      }
      if (curly !== 0) {
        return "Unmatched curly brackets";
      }
      if (angle !== 0) {
        return "Unmatched angle brackets";
      }
    } else if (cmd === "*") {
      if (!line.match(/^.+?\s*(?:==|eq|!=|ne|<>|<|<=|>|>=)\s*.+?=>.+?$/)) {
        return "Invalid format for !Condition: should be like '* value symbol value => response'";
      }
    }
    return "";
  };

  Parser.prototype.initTopic = function(topics, name) {
    if (topics[name] == null) {
      return topics[name] = {
        includes: {},
        inherits: {},
        triggers: []
      };
    }
  };

  return Parser;

})();

module.exports = Parser;

},{"./utils":7}],5:[function(require,module,exports){
"use strict";
var Brain, JSObjectHandler, Parser, RSVP, RiveScript, VERSION, inherit_utils, readDir, sorting, utils;

VERSION = "1.12.2";

Parser = require("./parser");

Brain = require("./brain");

utils = require("./utils");

sorting = require("./sorting");

inherit_utils = require("./inheritance");

JSObjectHandler = require("./lang/javascript");

RSVP = require("rsvp");

readDir = require("fs-readdir-recursive");

RiveScript = (function() {
  function RiveScript(opts) {
    var key, ref, value;
    if (opts == null) {
      opts = {};
    }
    this._debug = opts.debug ? opts.debug : false;
    this._strict = opts.strict ? opts.strict : true;
    this._depth = opts.depth ? parseInt(opts.depth) : 50;
    this._utf8 = opts.utf8 ? opts.utf8 : false;
    this._onDebug = opts.onDebug ? opts.onDebug : null;
    this.unicodePunctuation = new RegExp(/[.,!?;:]/g);
    this.errors = {
      replyNotMatched: "ERR: No Reply Matched",
      replyNotFound: "ERR: No Reply Found",
      objectNotFound: "[ERR: Object Not Found]",
      deepRecursion: "ERR: Deep Recursion Detected"
    };
    if (typeof opts.errors === "object") {
      ref = opts.errors;
      for (key in ref) {
        value = ref[key];
        if (opts.errors.hasOwnProperty(key)) {
          this.errors[key] = value;
        }
      }
    }
    this._node = {};
    this._runtime = this.runtime();
    this.parser = new Parser(this);
    this.brain = new Brain(this);
    this._pending = [];
    this._loadCount = 0;
    this._global = {};
    this._var = {};
    this._sub = {};
    this._person = {};
    this._array = {};
    this._users = {};
    this._freeze = {};
    this._includes = {};
    this._inherits = {};
    this._handlers = {};
    this._objlangs = {};
    this._topics = {};
    this._thats = {};
    this._sorted = {};
    if (typeof opts === "object") {
      if (opts.debug) {
        this._debug = true;
      }
      if (opts.strict) {
        this._strict = true;
      }
      if (opts.depth) {
        this._depth = parseInt(opts.depth);
      }
      if (opts.utf8) {
        this._utf8 = true;
      }
    }
    this._handlers.javascript = new JSObjectHandler(this);
    this.say("RiveScript Interpreter v" + VERSION + " Initialized.");
    this.say("Runtime Environment: " + this._runtime);
  }

  RiveScript.prototype.version = function() {
    return VERSION;
  };

  RiveScript.prototype.Promise = RSVP.Promise;

  RiveScript.prototype.runtime = function() {
    if (typeof window === "undefined" && typeof module === "object") {
      this._node.fs = require("fs");
      return "node";
    }
    return "web";
  };

  RiveScript.prototype.say = function(message) {
    if (this._debug !== true) {
      return;
    }
    if (this._onDebug) {
      return this._onDebug(message);
    } else {
      return console.log(message);
    }
  };

  RiveScript.prototype.warn = function(message, filename, lineno) {
    if ((filename != null) && (lineno != null)) {
      message += " at " + filename + " line " + lineno;
    }
    if (this._onDebug) {
      return this._onDebug("[WARNING] " + message);
    } else if (console) {
      if (console.error) {
        return console.error(message);
      } else {
        return console.log("[WARNING] " + message);
      }
    } else if (window) {
      return window.alert(message);
    }
  };

  RiveScript.prototype.loadFile = function(path, onSuccess, onError) {
    var file, i, len, loadCount;
    if (typeof path === "string") {
      path = [path];
    }
    loadCount = this._loadCount++;
    this._pending[loadCount] = {};
    for (i = 0, len = path.length; i < len; i++) {
      file = path[i];
      this.say("Request to load file: " + file);
      this._pending[loadCount][file] = 1;
      if (this._runtime === "web") {
        this._ajaxLoadFile(loadCount, file, onSuccess, onError);
      } else {
        this._nodeLoadFile(loadCount, file, onSuccess, onError);
      }
    }
    return loadCount;
  };

  RiveScript.prototype._ajaxLoadFile = function(loadCount, file, onSuccess, onError) {
    return $.ajax({
      url: file,
      dataType: "text",
      success: (function(_this) {
        return function(data, textStatus, xhr) {
          _this.say("Loading file " + file + " complete.");
          _this.parse(file, data, onError);
          delete _this._pending[loadCount][file];
          if (Object.keys(_this._pending[loadCount]).length === 0) {
            if (typeof onSuccess === "function") {
              return onSuccess.call(void 0, loadCount);
            }
          }
        };
      })(this),
      error: (function(_this) {
        return function(xhr, textStatus, errorThrown) {
          _this.say("Ajax error! " + textStatus + "; " + errorThrown);
          if (typeof onError === "function") {
            return onError.call(void 0, textStatus, loadCount);
          }
        };
      })(this)
    });
  };

  RiveScript.prototype._nodeLoadFile = function(loadCount, file, onSuccess, onError) {
    return this._node.fs.readFile(file, (function(_this) {
      return function(err, data) {
        if (err) {
          if (typeof onError === "function") {
            onError.call(void 0, err, loadCount);
          } else {
            _this.warn(err);
          }
          return;
        }
        _this.parse(file, "" + data, onError);
        delete _this._pending[loadCount][file];
        if (Object.keys(_this._pending[loadCount]).length === 0) {
          if (typeof onSuccess === "function") {
            return onSuccess.call(void 0, loadCount);
          }
        }
      };
    })(this));
  };

  RiveScript.prototype.loadDirectory = function(path, onSuccess, onError) {
    var loadCount, toLoad;
    if (this._runtime === "web") {
      this.warn("loadDirectory can't be used on the web!");
      return;
    }
    loadCount = this._loadCount++;
    this._pending[loadCount] = {};
    toLoad = [];
    if (onError == null) {
      onError = function() {};
    }
    return this._node.fs.stat(path, (function(_this) {
      return function(err, stats) {
        var file, files, i, j, len, len1, results;
        if (err) {
          return onError.call(void 0, err, loadCount);
        }
        if (!stats.isDirectory()) {
          return onError.call(void 0, path + " is not a directory", loadCount);
        }
        _this.say("Loading batch " + loadCount + " from directory " + path);
        files = readDir(path);
        for (i = 0, len = files.length; i < len; i++) {
          file = files[i];
          if (file.match(/\.(rive|rs)$/i)) {
            _this._pending[loadCount][path + "/" + file] = 1;
            toLoad.push(path + "/" + file);
          }
        }
        results = [];
        for (j = 0, len1 = toLoad.length; j < len1; j++) {
          file = toLoad[j];
          _this.say("Parsing file " + file + " from directory");
          results.push(_this._nodeLoadFile(loadCount, file, onSuccess, onError));
        }
        return results;
      };
    })(this));
  };

  RiveScript.prototype.stream = function(code, onError) {
    this.say("Streaming code.");
    return this.parse("stream()", code, onError);
  };

  RiveScript.prototype.parse = function(filename, code, onError) {
    var ast, data, i, internal, j, len, len1, name, object, ref, ref1, ref2, ref3, results, topic, trigger, type, value, vars;
    this.say("Parsing code!");
    ast = this.parser.parse(filename, code, onError);
    ref = ast.begin;
    for (type in ref) {
      vars = ref[type];
      if (!ast.begin.hasOwnProperty(type)) {
        continue;
      }
      internal = "_" + type;
      for (name in vars) {
        value = vars[name];
        if (!vars.hasOwnProperty(name)) {
          continue;
        }
        if (value === "<undef>") {
          delete this[internal][name];
        } else {
          this[internal][name] = value;
        }
      }
      if (this._global.debug != null) {
        this._debug = this._global.debug === "true" ? true : false;
      }
      if (this._global.depth != null) {
        this._depth = parseInt(this._global.depth) || 50;
      }
    }
    ref1 = ast.topics;
    for (topic in ref1) {
      data = ref1[topic];
      if (!ast.topics.hasOwnProperty(topic)) {
        continue;
      }
      if (this._includes[topic] == null) {
        this._includes[topic] = {};
      }
      if (this._inherits[topic] == null) {
        this._inherits[topic] = {};
      }
      utils.extend(this._includes[topic], data.includes);
      utils.extend(this._inherits[topic], data.inherits);
      if (this._topics[topic] == null) {
        this._topics[topic] = [];
      }
      ref2 = data.triggers;
      for (i = 0, len = ref2.length; i < len; i++) {
        trigger = ref2[i];
        this._topics[topic].push(trigger);
        if (trigger.previous != null) {
          if (this._thats[topic] == null) {
            this._thats[topic] = {};
          }
          if (this._thats[topic][trigger.trigger] == null) {
            this._thats[topic][trigger.trigger] = {};
          }
          this._thats[topic][trigger.trigger][trigger.previous] = trigger;
        }
      }
    }
    ref3 = ast.objects;
    results = [];
    for (j = 0, len1 = ref3.length; j < len1; j++) {
      object = ref3[j];
      if (this._handlers[object.language]) {
        this._objlangs[object.name] = object.language;
        results.push(this._handlers[object.language].load(object.name, object.code));
      } else {
        results.push(void 0);
      }
    }
    return results;
  };

  RiveScript.prototype.sortReplies = function() {
    var allTriggers, thatTriggers, topic;
    this._sorted.topics = {};
    this._sorted.thats = {};
    this.say("Sorting triggers...");
    for (topic in this._topics) {
      if (!this._topics.hasOwnProperty(topic)) {
        continue;
      }
      this.say("Analyzing topic " + topic + "...");
      allTriggers = inherit_utils.getTopicTriggers(this, topic);
      this._sorted.topics[topic] = sorting.sortTriggerSet(allTriggers, true);
      thatTriggers = inherit_utils.getTopicTriggers(this, topic, true);
      this._sorted.thats[topic] = sorting.sortTriggerSet(thatTriggers, false);
    }
    this._sorted.sub = sorting.sortList(Object.keys(this._sub));
    return this._sorted.person = sorting.sortList(Object.keys(this._person));
  };

  RiveScript.prototype.deparse = function() {
    var key, result;
    result = {
      begin: {
        global: utils.clone(this._global),
        "var": utils.clone(this._var),
        sub: utils.clone(this._sub),
        person: utils.clone(this._person),
        array: utils.clone(this._array),
        triggers: []
      },
      topics: utils.clone(this._topics),
      inherits: utils.clone(this._inherits),
      includes: utils.clone(this._includes),
      objects: {}
    };
    for (key in this._handlers) {
      result.objects[key] = {
        _objects: utils.clone(this._handlers[key]._objects)
      };
    }
    if (result.topics.__begin__ != null) {
      result.begin.triggers = result.topics.__begin__;
      delete result.topics.__begin__;
    }
    if (this._debug) {
      result.begin.global.debug = this._debug;
    }
    if (this._depth !== 50) {
      result.begin.global.depth = this._depth;
    }
    return result;
  };

  RiveScript.prototype.stringify = function(deparsed) {
    return this.parser.stringify(deparsed);
  };

  RiveScript.prototype.write = function(filename, deparsed) {
    if (this._runtime === "web") {
      this.warn("write() can't be used on the web!");
      return;
    }
    return this._node.fs.writeFile(filename, this.stringify(deparsed), function(err) {
      if (err) {
        return this.warn("Error writing to file " + filename + ": " + err);
      }
    });
  };

  RiveScript.prototype.setHandler = function(lang, obj) {
    if (obj === void 0) {
      return delete this._handlers[lang];
    } else {
      return this._handlers[lang] = obj;
    }
  };

  RiveScript.prototype.setSubroutine = function(name, code) {
    if (this._handlers.javascript) {
      this._objlangs[name] = "javascript";
      return this._handlers.javascript.load(name, code);
    }
  };

  RiveScript.prototype.setGlobal = function(name, value) {
    if (value === void 0) {
      return delete this._global[name];
    } else {
      return this._global[name] = value;
    }
  };

  RiveScript.prototype.setVariable = function(name, value) {
    if (value === void 0) {
      return delete this._var[name];
    } else {
      return this._var[name] = value;
    }
  };

  RiveScript.prototype.setSubstitution = function(name, value) {
    if (value === void 0) {
      return delete this._sub[name];
    } else {
      return this._sub[name] = value;
    }
  };

  RiveScript.prototype.setPerson = function(name, value) {
    if (value === void 0) {
      return delete this._person[name];
    } else {
      return this._person[name] = value;
    }
  };

  RiveScript.prototype.setUservar = function(user, name, value) {
    if (!this._users[user]) {
      this._users[user] = {
        topic: "random"
      };
    }
    if (value === void 0) {
      return delete this._users[user][name];
    } else {
      return this._users[user][name] = value;
    }
  };

  RiveScript.prototype.setUservars = function(user, data) {
    var key, results;
    if (!this._users[user]) {
      this._users[user] = {
        topic: "random"
      };
    }
    results = [];
    for (key in data) {
      if (!data.hasOwnProperty(key)) {
        continue;
      }
      if (data[key] === void 0) {
        results.push(delete this._users[user][key]);
      } else {
        results.push(this._users[user][key] = data[key]);
      }
    }
    return results;
  };

  RiveScript.prototype.getVariable = function(user, name) {
    if (typeof this._var[name] !== "undefined") {
      return this._var[name];
    } else {
      return "undefined";
    }
  };

  RiveScript.prototype.getUservar = function(user, name) {
    if (!this._users[user]) {
      return "undefined";
    }
    if (typeof this._users[user][name] !== "undefined") {
      return this._users[user][name];
    } else {
      return "undefined";
    }
  };

  RiveScript.prototype.getUservars = function(user) {
    if (user === void 0) {
      return utils.clone(this._users);
    } else {
      if (this._users[user] != null) {
        return utils.clone(this._users[user]);
      }
      return void 0;
    }
  };

  RiveScript.prototype.clearUservars = function(user) {
    if (user === void 0) {
      return this._users = {};
    } else {
      return delete this._users[user];
    }
  };

  RiveScript.prototype.freezeUservars = function(user) {
    if (this._users[user] != null) {
      return this._freeze[user] = utils.clone(this._users[user]);
    } else {
      return this.warn("Can't freeze vars for user " + user + ": not found!");
    }
  };

  RiveScript.prototype.thawUservars = function(user, action) {
    if (action == null) {
      action = "thaw";
    }
    if (typeof action !== "string") {
      action = "thaw";
    }
    if (this._freeze[user] == null) {
      this.warn("Can't thaw user vars: " + user + " wasn't frozen!");
      return;
    }
    if (action === "thaw") {
      this.clearUservars(user);
      this._users[user] = utils.clone(this._freeze[user]);
      return delete this._freeze[user];
    } else if (action === "discard") {
      return delete this._freeze[user];
    } else if (action === "keep") {
      this.clearUservars(user);
      return this._users[user] = utils.clone(this._freeze[user]);
    } else {
      return this.warn("Unsupported thaw action!");
    }
  };

  RiveScript.prototype.lastMatch = function(user) {
    if (this._users[user] != null) {
      return this._users[user].__lastmatch__;
    }
    return void 0;
  };

  RiveScript.prototype.currentUser = function() {
    if (this.brain._currentUser === void 0) {
      this.warn("currentUser() is intended to be called from within a JS object macro!");
    }
    return this.brain._currentUser;
  };

  RiveScript.prototype.reply = function(user, msg, scope) {
    return this.brain.reply(user, msg, scope);
  };

  RiveScript.prototype.replyAsync = function(user, msg, scope, callback) {
    var reply;
    reply = this.brain.reply(user, msg, scope, true);
    if (callback) {
      reply.then((function(_this) {
        return function(result) {
          return callback.call(_this, null, result);
        };
      })(this))["catch"]((function(_this) {
        return function(error) {
          return callback.call(_this, error, null);
        };
      })(this));
    }
    return reply;
  };

  return RiveScript;

})();

module.exports = RiveScript;

},{"./brain":1,"./inheritance":2,"./lang/javascript":3,"./parser":4,"./sorting":6,"./utils":7,"fs":9,"fs-readdir-recursive":8,"rsvp":12}],6:[function(require,module,exports){
var initSortTrack, utils;

utils = require("./utils");

exports.sortTriggerSet = function(triggers, exclude_previous, say) {
  var cnt, highest_inherits, i, inherits, ip, j, k, kind, kind_sorted, l, len, len1, len2, len3, len4, len5, m, match, n, p, pattern, pound_sorted, prior, prior_sort, ref, ref1, running, sorted_by_length, star_sorted, track, track_sorted, trig, under_sorted, weight, wordcnt;
  if (say == null) {
    say = function(what) {};
  }
  if (exclude_previous == null) {
    exclude_previous = true;
  }
  prior = {
    "0": []
  };
  for (i = 0, len = triggers.length; i < len; i++) {
    trig = triggers[i];
    if (exclude_previous && (trig[1].previous != null)) {
      continue;
    }
    match = trig[0].match(/\{weight=(\d+)\}/i);
    weight = 0;
    if (match && match[1]) {
      weight = match[1];
    }
    if (prior[weight] == null) {
      prior[weight] = [];
    }
    prior[weight].push(trig);
  }
  running = [];
  prior_sort = Object.keys(prior).sort(function(a, b) {
    return b - a;
  });
  for (j = 0, len1 = prior_sort.length; j < len1; j++) {
    p = prior_sort[j];
    say("Sorting triggers with priority " + p);
    inherits = -1;
    highest_inherits = -1;
    track = {};
    track[inherits] = initSortTrack();
    ref = prior[p];
    for (k = 0, len2 = ref.length; k < len2; k++) {
      trig = ref[k];
      pattern = trig[0];
      say("Looking at trigger: " + pattern);
      match = pattern.match(/\{inherits=(\d+)\}/i);
      if (match) {
        inherits = parseInt(match[1]);
        if (inherits > highest_inherits) {
          highest_inherits = inherits;
        }
        say("Trigger belongs to a topic that inherits other topics. Level=" + inherits);
        pattern = pattern.replace(/\{inherits=\d+\}/ig, "");
        trig[0] = pattern;
      } else {
        inherits = -1;
      }
      if (track[inherits] == null) {
        track[inherits] = initSortTrack();
      }
      if (pattern.indexOf("_") > -1) {
        cnt = utils.word_count(pattern);
        say("Has a _ wildcard with " + cnt + " words.");
        if (cnt > 0) {
          if (track[inherits].alpha[cnt] == null) {
            track[inherits].alpha[cnt] = [];
          }
          track[inherits].alpha[cnt].push(trig);
        } else {
          track[inherits].under.push(trig);
        }
      } else if (pattern.indexOf("#") > -1) {
        cnt = utils.word_count(pattern);
        say("Has a # wildcard with " + cnt + " words.");
        if (cnt > 0) {
          if (track[inherits].number[cnt] == null) {
            track[inherits].number[cnt] = [];
          }
          track[inherits].number[cnt].push(trig);
        } else {
          track[inherits].pound.push(trig);
        }
      } else if (pattern.indexOf("*") > -1) {
        cnt = utils.word_count(pattern);
        say("Has a * wildcard with " + cnt + " words.");
        if (cnt > 0) {
          if (track[inherits].wild[cnt] == null) {
            track[inherits].wild[cnt] = [];
          }
          track[inherits].wild[cnt].push(trig);
        } else {
          track[inherits].star.push(trig);
        }
      } else if (pattern.indexOf("[") > -1) {
        cnt = utils.word_count(pattern);
        say("Has optionals with " + cnt + " words.");
        if (track[inherits].option[cnt] == null) {
          track[inherits].option[cnt] = [];
        }
        track[inherits].option[cnt].push(trig);
      } else {
        cnt = utils.word_count(pattern);
        say("Totally atomic trigger with " + cnt + " words.");
        if (track[inherits].atomic[cnt] == null) {
          track[inherits].atomic[cnt] = [];
        }
        track[inherits].atomic[cnt].push(trig);
      }
    }
    track[highest_inherits + 1] = track['-1'];
    delete track['-1'];
    track_sorted = Object.keys(track).sort(function(a, b) {
      return a - b;
    });
    for (l = 0, len3 = track_sorted.length; l < len3; l++) {
      ip = track_sorted[l];
      say("ip=" + ip);
      ref1 = ["atomic", "option", "alpha", "number", "wild"];
      for (m = 0, len4 = ref1.length; m < len4; m++) {
        kind = ref1[m];
        kind_sorted = Object.keys(track[ip][kind]).sort(function(a, b) {
          return b - a;
        });
        for (n = 0, len5 = kind_sorted.length; n < len5; n++) {
          wordcnt = kind_sorted[n];
          sorted_by_length = track[ip][kind][wordcnt].sort(function(a, b) {
            return b.length - a.length;
          });
          running.push.apply(running, sorted_by_length);
        }
      }
      under_sorted = track[ip].under.sort(function(a, b) {
        return b.length - a.length;
      });
      pound_sorted = track[ip].pound.sort(function(a, b) {
        return b.length - a.length;
      });
      star_sorted = track[ip].star.sort(function(a, b) {
        return b.length - a.length;
      });
      running.push.apply(running, under_sorted);
      running.push.apply(running, pound_sorted);
      running.push.apply(running, star_sorted);
    }
  }
  return running;
};

exports.sortList = function(items) {
  var bylen, cnt, count, i, item, j, len, len1, output, sorted, track;
  track = {};
  for (i = 0, len = items.length; i < len; i++) {
    item = items[i];
    cnt = utils.word_count(item, true);
    if (track[cnt] == null) {
      track[cnt] = [];
    }
    track[cnt].push(item);
  }
  output = [];
  sorted = Object.keys(track).sort(function(a, b) {
    return b - a;
  });
  for (j = 0, len1 = sorted.length; j < len1; j++) {
    count = sorted[j];
    bylen = track[count].sort(function(a, b) {
      return b.length - a.length;
    });
    output.push.apply(output, bylen);
  }
  return output;
};

initSortTrack = function() {
  return {
    atomic: {},
    option: {},
    alpha: {},
    number: {},
    wild: {},
    pound: [],
    under: [],
    star: []
  };
};

},{"./utils":7}],7:[function(require,module,exports){
exports.strip = function(text) {
  text = text.replace(/^[\s\t]+/, "").replace(/[\s\t]+$/, "").replace(/[\x0D\x0A]+/, "");
  return text;
};

exports.trim = function(text) {
  text = text.replace(/^[\x0D\x0A\s\t]+/, "").replace(/[\x0D\x0A\s\t]+$/, "");
  return text;
};

exports.extend = function(a, b) {
  var attr, results, value;
  results = [];
  for (attr in b) {
    value = b[attr];
    if (!b.hasOwnProperty(attr)) {
      continue;
    }
    results.push(a[attr] = value);
  }
  return results;
};

exports.word_count = function(trigger, all) {
  var i, len, wc, word, words;
  words = [];
  if (all) {
    words = trigger.split(/\s+/);
  } else {
    words = trigger.split(/[\s\*\#\_\|]+/);
  }
  wc = 0;
  for (i = 0, len = words.length; i < len; i++) {
    word = words[i];
    if (word.length > 0) {
      wc++;
    }
  }
  return wc;
};

exports.stripNasties = function(string, utf8) {
  if (utf8) {
    string = string.replace(/[\\<>]+/g, "");
    return string;
  }
  string = string.replace(/[^A-Za-z0-9 ]/g, "");
  return string;
};

exports.quotemeta = function(string) {
  var char, i, len, unsafe;
  unsafe = "\\.+*?[^]$(){}=!<>|:".split("");
  for (i = 0, len = unsafe.length; i < len; i++) {
    char = unsafe[i];
    string = string.replace(new RegExp("\\" + char, "g"), "\\" + char);
  }
  return string;
};

exports.isAtomic = function(trigger) {
  var i, len, ref, special;
  ref = ["*", "#", "_", "(", "[", "<", "@"];
  for (i = 0, len = ref.length; i < len; i++) {
    special = ref[i];
    if (trigger.indexOf(special) > -1) {
      return false;
    }
  }
  return true;
};

exports.stringFormat = function(type, string) {
  var first, i, len, result, word, words;
  if (type === "uppercase") {
    return string.toUpperCase();
  } else if (type === "lowercase") {
    return string.toLowerCase();
  } else if (type === "sentence") {
    string += "";
    first = string.charAt(0).toUpperCase();
    return first + string.substring(1);
  } else if (type === "formal") {
    words = string.split(/\s+/);
    result = [];
    for (i = 0, len = words.length; i < len; i++) {
      word = words[i];
      first = word.charAt(0).toUpperCase();
      result.push(first + word.substring(1));
    }
    return result.join(" ");
  }
  return content;
};

exports.clone = function(obj) {
  var copy, key;
  if (obj === null || typeof obj !== "object") {
    return obj;
  }
  copy = obj.constructor();
  for (key in obj) {
    if (!obj.hasOwnProperty(key)) {
      continue;
    }
    copy[key] = exports.clone(obj[key]);
  }
  return copy;
};

exports.isAPromise = function(obj) {
  return obj && obj.then && obj["catch"] && obj["finally"] && typeof obj.then === 'function' && typeof obj["catch"] === 'function' && typeof obj["finally"] === 'function';
};

},{}],8:[function(require,module,exports){
var fs = require('fs')
var path = require('path')

module.exports = read

function read(root, filter, files, prefix) {
  prefix = prefix || ''
  files = files || []
  filter = filter || noDotFiles

  var dir = path.join(root, prefix)
  if (!fs.existsSync(dir)) return files
  if (fs.statSync(dir).isDirectory())
    fs.readdirSync(dir)
    .filter(filter)
    .forEach(function (name) {
      read(root, filter, files, path.join(prefix, name))
    })
  else
    files.push(prefix)

  return files
}

function noDotFiles(x) {
  return x[0] !== '.'
}


},{"fs":9,"path":10}],9:[function(require,module,exports){

},{}],10:[function(require,module,exports){
(function (process){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// resolves . and .. elements in a path array with directory names there
// must be no slashes, empty elements, or device names (c:\) in the array
// (so also no leading and trailing slashes - it does not distinguish
// relative and absolute paths)
function normalizeArray(parts, allowAboveRoot) {
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = parts.length - 1; i >= 0; i--) {
    var last = parts[i];
    if (last === '.') {
      parts.splice(i, 1);
    } else if (last === '..') {
      parts.splice(i, 1);
      up++;
    } else if (up) {
      parts.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (allowAboveRoot) {
    for (; up--; up) {
      parts.unshift('..');
    }
  }

  return parts;
}

// Split a filename into [root, dir, basename, ext], unix version
// 'root' is just a slash, or nothing.
var splitPathRe =
    /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
var splitPath = function(filename) {
  return splitPathRe.exec(filename).slice(1);
};

// path.resolve([from ...], to)
// posix version
exports.resolve = function() {
  var resolvedPath = '',
      resolvedAbsolute = false;

  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
    var path = (i >= 0) ? arguments[i] : process.cwd();

    // Skip empty and invalid entries
    if (typeof path !== 'string') {
      throw new TypeError('Arguments to path.resolve must be strings');
    } else if (!path) {
      continue;
    }

    resolvedPath = path + '/' + resolvedPath;
    resolvedAbsolute = path.charAt(0) === '/';
  }

  // At this point the path should be resolved to a full absolute path, but
  // handle relative paths to be safe (might happen when process.cwd() fails)

  // Normalize the path
  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
    return !!p;
  }), !resolvedAbsolute).join('/');

  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
};

// path.normalize(path)
// posix version
exports.normalize = function(path) {
  var isAbsolute = exports.isAbsolute(path),
      trailingSlash = substr(path, -1) === '/';

  // Normalize the path
  path = normalizeArray(filter(path.split('/'), function(p) {
    return !!p;
  }), !isAbsolute).join('/');

  if (!path && !isAbsolute) {
    path = '.';
  }
  if (path && trailingSlash) {
    path += '/';
  }

  return (isAbsolute ? '/' : '') + path;
};

// posix version
exports.isAbsolute = function(path) {
  return path.charAt(0) === '/';
};

// posix version
exports.join = function() {
  var paths = Array.prototype.slice.call(arguments, 0);
  return exports.normalize(filter(paths, function(p, index) {
    if (typeof p !== 'string') {
      throw new TypeError('Arguments to path.join must be strings');
    }
    return p;
  }).join('/'));
};


// path.relative(from, to)
// posix version
exports.relative = function(from, to) {
  from = exports.resolve(from).substr(1);
  to = exports.resolve(to).substr(1);

  function trim(arr) {
    var start = 0;
    for (; start < arr.length; start++) {
      if (arr[start] !== '') break;
    }

    var end = arr.length - 1;
    for (; end >= 0; end--) {
      if (arr[end] !== '') break;
    }

    if (start > end) return [];
    return arr.slice(start, end - start + 1);
  }

  var fromParts = trim(from.split('/'));
  var toParts = trim(to.split('/'));

  var length = Math.min(fromParts.length, toParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
    if (fromParts[i] !== toParts[i]) {
      samePartsLength = i;
      break;
    }
  }

  var outputParts = [];
  for (var i = samePartsLength; i < fromParts.length; i++) {
    outputParts.push('..');
  }

  outputParts = outputParts.concat(toParts.slice(samePartsLength));

  return outputParts.join('/');
};

exports.sep = '/';
exports.delimiter = ':';

exports.dirname = function(path) {
  var result = splitPath(path),
      root = result[0],
      dir = result[1];

  if (!root && !dir) {
    // No dirname whatsoever
    return '.';
  }

  if (dir) {
    // It has a dirname, strip trailing slash
    dir = dir.substr(0, dir.length - 1);
  }

  return root + dir;
};


exports.basename = function(path, ext) {
  var f = splitPath(path)[2];
  // TODO: make this comparison case-insensitive on windows?
  if (ext && f.substr(-1 * ext.length) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
};


exports.extname = function(path) {
  return splitPath(path)[3];
};

function filter (xs, f) {
    if (xs.filter) return xs.filter(f);
    var res = [];
    for (var i = 0; i < xs.length; i++) {
        if (f(xs[i], i, xs)) res.push(xs[i]);
    }
    return res;
}

// String.prototype.substr - negative index don't work in IE8
var substr = 'ab'.substr(-1) === 'b'
    ? function (str, start, len) { return str.substr(start, len) }
    : function (str, start, len) {
        if (start < 0) start = str.length + start;
        return str.substr(start, len);
    }
;

}).call(this,require('_process'))
},{"_process":11}],11:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};
var queue = [];
var draining = false;

function drainQueue() {
    if (draining) {
        return;
    }
    draining = true;
    var currentQueue;
    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        var i = -1;
        while (++i < len) {
            currentQueue[i]();
        }
        len = queue.length;
    }
    draining = false;
}
process.nextTick = function (fun) {
    queue.push(fun);
    if (!draining) {
        setTimeout(drainQueue, 0);
    }
};

process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

// TODO(shtylman)
process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],12:[function(require,module,exports){
(function (process,global){
/*!
 * @overview RSVP - a tiny implementation of Promises/A+.
 * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors
 * @license   Licensed under MIT license
 *            See https://raw.githubusercontent.com/tildeio/rsvp.js/master/LICENSE
 * @version   3.2.1
 */

(function() {
    "use strict";
    function lib$rsvp$utils$$objectOrFunction(x) {
      return typeof x === 'function' || (typeof x === 'object' && x !== null);
    }

    function lib$rsvp$utils$$isFunction(x) {
      return typeof x === 'function';
    }

    function lib$rsvp$utils$$isMaybeThenable(x) {
      return typeof x === 'object' && x !== null;
    }

    var lib$rsvp$utils$$_isArray;
    if (!Array.isArray) {
      lib$rsvp$utils$$_isArray = function (x) {
        return Object.prototype.toString.call(x) === '[object Array]';
      };
    } else {
      lib$rsvp$utils$$_isArray = Array.isArray;
    }

    var lib$rsvp$utils$$isArray = lib$rsvp$utils$$_isArray;

    var lib$rsvp$utils$$now = Date.now || function() { return new Date().getTime(); };

    function lib$rsvp$utils$$F() { }

    var lib$rsvp$utils$$o_create = (Object.create || function (o) {
      if (arguments.length > 1) {
        throw new Error('Second argument not supported');
      }
      if (typeof o !== 'object') {
        throw new TypeError('Argument must be an object');
      }
      lib$rsvp$utils$$F.prototype = o;
      return new lib$rsvp$utils$$F();
    });
    function lib$rsvp$events$$indexOf(callbacks, callback) {
      for (var i=0, l=callbacks.length; i<l; i++) {
        if (callbacks[i] === callback) { return i; }
      }

      return -1;
    }

    function lib$rsvp$events$$callbacksFor(object) {
      var callbacks = object._promiseCallbacks;

      if (!callbacks) {
        callbacks = object._promiseCallbacks = {};
      }

      return callbacks;
    }

    var lib$rsvp$events$$default = {

      /**
        `RSVP.EventTarget.mixin` extends an object with EventTarget methods. For
        Example:

        ```javascript
        var object = {};

        RSVP.EventTarget.mixin(object);

        object.on('finished', function(event) {
          // handle event
        });

        object.trigger('finished', { detail: value });
        ```

        `EventTarget.mixin` also works with prototypes:

        ```javascript
        var Person = function() {};
        RSVP.EventTarget.mixin(Person.prototype);

        var yehuda = new Person();
        var tom = new Person();

        yehuda.on('poke', function(event) {
          console.log('Yehuda says OW');
        });

        tom.on('poke', function(event) {
          console.log('Tom says OW');
        });

        yehuda.trigger('poke');
        tom.trigger('poke');
        ```

        @method mixin
        @for RSVP.EventTarget
        @private
        @param {Object} object object to extend with EventTarget methods
      */
      'mixin': function(object) {
        object['on']      = this['on'];
        object['off']     = this['off'];
        object['trigger'] = this['trigger'];
        object._promiseCallbacks = undefined;
        return object;
      },

      /**
        Registers a callback to be executed when `eventName` is triggered

        ```javascript
        object.on('event', function(eventInfo){
          // handle the event
        });

        object.trigger('event');
        ```

        @method on
        @for RSVP.EventTarget
        @private
        @param {String} eventName name of the event to listen for
        @param {Function} callback function to be called when the event is triggered.
      */
      'on': function(eventName, callback) {
        if (typeof callback !== 'function') {
          throw new TypeError('Callback must be a function');
        }

        var allCallbacks = lib$rsvp$events$$callbacksFor(this), callbacks;

        callbacks = allCallbacks[eventName];

        if (!callbacks) {
          callbacks = allCallbacks[eventName] = [];
        }

        if (lib$rsvp$events$$indexOf(callbacks, callback) === -1) {
          callbacks.push(callback);
        }
      },

      /**
        You can use `off` to stop firing a particular callback for an event:

        ```javascript
        function doStuff() { // do stuff! }
        object.on('stuff', doStuff);

        object.trigger('stuff'); // doStuff will be called

        // Unregister ONLY the doStuff callback
        object.off('stuff', doStuff);
        object.trigger('stuff'); // doStuff will NOT be called
        ```

        If you don't pass a `callback` argument to `off`, ALL callbacks for the
        event will not be executed when the event fires. For example:

        ```javascript
        var callback1 = function(){};
        var callback2 = function(){};

        object.on('stuff', callback1);
        object.on('stuff', callback2);

        object.trigger('stuff'); // callback1 and callback2 will be executed.

        object.off('stuff');
        object.trigger('stuff'); // callback1 and callback2 will not be executed!
        ```

        @method off
        @for RSVP.EventTarget
        @private
        @param {String} eventName event to stop listening to
        @param {Function} callback optional argument. If given, only the function
        given will be removed from the event's callback queue. If no `callback`
        argument is given, all callbacks will be removed from the event's callback
        queue.
      */
      'off': function(eventName, callback) {
        var allCallbacks = lib$rsvp$events$$callbacksFor(this), callbacks, index;

        if (!callback) {
          allCallbacks[eventName] = [];
          return;
        }

        callbacks = allCallbacks[eventName];

        index = lib$rsvp$events$$indexOf(callbacks, callback);

        if (index !== -1) { callbacks.splice(index, 1); }
      },

      /**
        Use `trigger` to fire custom events. For example:

        ```javascript
        object.on('foo', function(){
          console.log('foo event happened!');
        });
        object.trigger('foo');
        // 'foo event happened!' logged to the console
        ```

        You can also pass a value as a second argument to `trigger` that will be
        passed as an argument to all event listeners for the event:

        ```javascript
        object.on('foo', function(value){
          console.log(value.name);
        });

        object.trigger('foo', { name: 'bar' });
        // 'bar' logged to the console
        ```

        @method trigger
        @for RSVP.EventTarget
        @private
        @param {String} eventName name of the event to be triggered
        @param {*} options optional value to be passed to any event handlers for
        the given `eventName`
      */
      'trigger': function(eventName, options, label) {
        var allCallbacks = lib$rsvp$events$$callbacksFor(this), callbacks, callback;

        if (callbacks = allCallbacks[eventName]) {
          // Don't cache the callbacks.length since it may grow
          for (var i=0; i<callbacks.length; i++) {
            callback = callbacks[i];

            callback(options, label);
          }
        }
      }
    };

    var lib$rsvp$config$$config = {
      instrument: false
    };

    lib$rsvp$events$$default['mixin'](lib$rsvp$config$$config);

    function lib$rsvp$config$$configure(name, value) {
      if (name === 'onerror') {
        // handle for legacy users that expect the actual
        // error to be passed to their function added via
        // `RSVP.configure('onerror', someFunctionHere);`
        lib$rsvp$config$$config['on']('error', value);
        return;
      }

      if (arguments.length === 2) {
        lib$rsvp$config$$config[name] = value;
      } else {
        return lib$rsvp$config$$config[name];
      }
    }

    var lib$rsvp$instrument$$queue = [];

    function lib$rsvp$instrument$$scheduleFlush() {
      setTimeout(function() {
        var entry;
        for (var i = 0; i < lib$rsvp$instrument$$queue.length; i++) {
          entry = lib$rsvp$instrument$$queue[i];

          var payload = entry.payload;

          payload.guid = payload.key + payload.id;
          payload.childGuid = payload.key + payload.childId;
          if (payload.error) {
            payload.stack = payload.error.stack;
          }

          lib$rsvp$config$$config['trigger'](entry.name, entry.payload);
        }
        lib$rsvp$instrument$$queue.length = 0;
      }, 50);
    }

    function lib$rsvp$instrument$$instrument(eventName, promise, child) {
      if (1 === lib$rsvp$instrument$$queue.push({
        name: eventName,
        payload: {
          key: promise._guidKey,
          id:  promise._id,
          eventName: eventName,
          detail: promise._result,
          childId: child && child._id,
          label: promise._label,
          timeStamp: lib$rsvp$utils$$now(),
          error: lib$rsvp$config$$config["instrument-with-stack"] ? new Error(promise._label) : null
        }})) {
          lib$rsvp$instrument$$scheduleFlush();
        }
      }
    var lib$rsvp$instrument$$default = lib$rsvp$instrument$$instrument;
    function lib$rsvp$then$$then(onFulfillment, onRejection, label) {
      var parent = this;
      var state = parent._state;

      if (state === lib$rsvp$$internal$$FULFILLED && !onFulfillment || state === lib$rsvp$$internal$$REJECTED && !onRejection) {
        lib$rsvp$config$$config.instrument && lib$rsvp$instrument$$default('chained', parent, parent);
        return parent;
      }

      parent._onError = null;

      var child = new parent.constructor(lib$rsvp$$internal$$noop, label);
      var result = parent._result;

      lib$rsvp$config$$config.instrument && lib$rsvp$instrument$$default('chained', parent, child);

      if (state) {
        var callback = arguments[state - 1];
        lib$rsvp$config$$config.async(function(){
          lib$rsvp$$internal$$invokeCallback(state, child, callback, result);
        });
      } else {
        lib$rsvp$$internal$$subscribe(parent, child, onFulfillment, onRejection);
      }

      return child;
    }
    var lib$rsvp$then$$default = lib$rsvp$then$$then;
    function lib$rsvp$promise$resolve$$resolve(object, label) {
      /*jshint validthis:true */
      var Constructor = this;

      if (object && typeof object === 'object' && object.constructor === Constructor) {
        return object;
      }

      var promise = new Constructor(lib$rsvp$$internal$$noop, label);
      lib$rsvp$$internal$$resolve(promise, object);
      return promise;
    }
    var lib$rsvp$promise$resolve$$default = lib$rsvp$promise$resolve$$resolve;
    function lib$rsvp$enumerator$$makeSettledResult(state, position, value) {
      if (state === lib$rsvp$$internal$$FULFILLED) {
        return {
          state: 'fulfilled',
          value: value
        };
      } else {
         return {
          state: 'rejected',
          reason: value
        };
      }
    }

    function lib$rsvp$enumerator$$Enumerator(Constructor, input, abortOnReject, label) {
      this._instanceConstructor = Constructor;
      this.promise = new Constructor(lib$rsvp$$internal$$noop, label);
      this._abortOnReject = abortOnReject;

      if (this._validateInput(input)) {
        this._input     = input;
        this.length     = input.length;
        this._remaining = input.length;

        this._init();

        if (this.length === 0) {
          lib$rsvp$$internal$$fulfill(this.promise, this._result);
        } else {
          this.length = this.length || 0;
          this._enumerate();
          if (this._remaining === 0) {
            lib$rsvp$$internal$$fulfill(this.promise, this._result);
          }
        }
      } else {
        lib$rsvp$$internal$$reject(this.promise, this._validationError());
      }
    }

    var lib$rsvp$enumerator$$default = lib$rsvp$enumerator$$Enumerator;

    lib$rsvp$enumerator$$Enumerator.prototype._validateInput = function(input) {
      return lib$rsvp$utils$$isArray(input);
    };

    lib$rsvp$enumerator$$Enumerator.prototype._validationError = function() {
      return new Error('Array Methods must be provided an Array');
    };

    lib$rsvp$enumerator$$Enumerator.prototype._init = function() {
      this._result = new Array(this.length);
    };

    lib$rsvp$enumerator$$Enumerator.prototype._enumerate = function() {
      var length     = this.length;
      var promise    = this.promise;
      var input      = this._input;

      for (var i = 0; promise._state === lib$rsvp$$internal$$PENDING && i < length; i++) {
        this._eachEntry(input[i], i);
      }
    };

    lib$rsvp$enumerator$$Enumerator.prototype._settleMaybeThenable = function(entry, i) {
      var c = this._instanceConstructor;
      var resolve = c.resolve;

      if (resolve === lib$rsvp$promise$resolve$$default) {
        var then = lib$rsvp$$internal$$getThen(entry);

        if (then === lib$rsvp$then$$default &&
            entry._state !== lib$rsvp$$internal$$PENDING) {
          entry._onError = null;
          this._settledAt(entry._state, i, entry._result);
        } else if (typeof then !== 'function') {
          this._remaining--;
          this._result[i] = this._makeResult(lib$rsvp$$internal$$FULFILLED, i, entry);
        } else if (c === lib$rsvp$promise$$default) {
          var promise = new c(lib$rsvp$$internal$$noop);
          lib$rsvp$$internal$$handleMaybeThenable(promise, entry, then);
          this._willSettleAt(promise, i);
        } else {
          this._willSettleAt(new c(function(resolve) { resolve(entry); }), i);
        }
      } else {
        this._willSettleAt(resolve(entry), i);
      }
    };

    lib$rsvp$enumerator$$Enumerator.prototype._eachEntry = function(entry, i) {
      if (lib$rsvp$utils$$isMaybeThenable(entry)) {
        this._settleMaybeThenable(entry, i);
      } else {
        this._remaining--;
        this._result[i] = this._makeResult(lib$rsvp$$internal$$FULFILLED, i, entry);
      }
    };

    lib$rsvp$enumerator$$Enumerator.prototype._settledAt = function(state, i, value) {
      var promise = this.promise;

      if (promise._state === lib$rsvp$$internal$$PENDING) {
        this._remaining--;

        if (this._abortOnReject && state === lib$rsvp$$internal$$REJECTED) {
          lib$rsvp$$internal$$reject(promise, value);
        } else {
          this._result[i] = this._makeResult(state, i, value);
        }
      }

      if (this._remaining === 0) {
        lib$rsvp$$internal$$fulfill(promise, this._result);
      }
    };

    lib$rsvp$enumerator$$Enumerator.prototype._makeResult = function(state, i, value) {
      return value;
    };

    lib$rsvp$enumerator$$Enumerator.prototype._willSettleAt = function(promise, i) {
      var enumerator = this;

      lib$rsvp$$internal$$subscribe(promise, undefined, function(value) {
        enumerator._settledAt(lib$rsvp$$internal$$FULFILLED, i, value);
      }, function(reason) {
        enumerator._settledAt(lib$rsvp$$internal$$REJECTED, i, reason);
      });
    };
    function lib$rsvp$promise$all$$all(entries, label) {
      return new lib$rsvp$enumerator$$default(this, entries, true /* abort on reject */, label).promise;
    }
    var lib$rsvp$promise$all$$default = lib$rsvp$promise$all$$all;
    function lib$rsvp$promise$race$$race(entries, label) {
      /*jshint validthis:true */
      var Constructor = this;

      var promise = new Constructor(lib$rsvp$$internal$$noop, label);

      if (!lib$rsvp$utils$$isArray(entries)) {
        lib$rsvp$$internal$$reject(promise, new TypeError('You must pass an array to race.'));
        return promise;
      }

      var length = entries.length;

      function onFulfillment(value) {
        lib$rsvp$$internal$$resolve(promise, value);
      }

      function onRejection(reason) {
        lib$rsvp$$internal$$reject(promise, reason);
      }

      for (var i = 0; promise._state === lib$rsvp$$internal$$PENDING && i < length; i++) {
        lib$rsvp$$internal$$subscribe(Constructor.resolve(entries[i]), undefined, onFulfillment, onRejection);
      }

      return promise;
    }
    var lib$rsvp$promise$race$$default = lib$rsvp$promise$race$$race;
    function lib$rsvp$promise$reject$$reject(reason, label) {
      /*jshint validthis:true */
      var Constructor = this;
      var promise = new Constructor(lib$rsvp$$internal$$noop, label);
      lib$rsvp$$internal$$reject(promise, reason);
      return promise;
    }
    var lib$rsvp$promise$reject$$default = lib$rsvp$promise$reject$$reject;

    var lib$rsvp$promise$$guidKey = 'rsvp_' + lib$rsvp$utils$$now() + '-';
    var lib$rsvp$promise$$counter = 0;

    function lib$rsvp$promise$$needsResolver() {
      throw new TypeError('You must pass a resolver function as the first argument to the promise constructor');
    }

    function lib$rsvp$promise$$needsNew() {
      throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
    }

    function lib$rsvp$promise$$Promise(resolver, label) {
      this._id = lib$rsvp$promise$$counter++;
      this._label = label;
      this._state = undefined;
      this._result = undefined;
      this._subscribers = [];

      lib$rsvp$config$$config.instrument && lib$rsvp$instrument$$default('created', this);

      if (lib$rsvp$$internal$$noop !== resolver) {
        typeof resolver !== 'function' && lib$rsvp$promise$$needsResolver();
        this instanceof lib$rsvp$promise$$Promise ? lib$rsvp$$internal$$initializePromise(this, resolver) : lib$rsvp$promise$$needsNew();
      }
    }

    var lib$rsvp$promise$$default = lib$rsvp$promise$$Promise;

    // deprecated
    lib$rsvp$promise$$Promise.cast = lib$rsvp$promise$resolve$$default;
    lib$rsvp$promise$$Promise.all = lib$rsvp$promise$all$$default;
    lib$rsvp$promise$$Promise.race = lib$rsvp$promise$race$$default;
    lib$rsvp$promise$$Promise.resolve = lib$rsvp$promise$resolve$$default;
    lib$rsvp$promise$$Promise.reject = lib$rsvp$promise$reject$$default;

    lib$rsvp$promise$$Promise.prototype = {
      constructor: lib$rsvp$promise$$Promise,

      _guidKey: lib$rsvp$promise$$guidKey,

      _onError: function (reason) {
        var promise = this;
        lib$rsvp$config$$config.after(function() {
          if (promise._onError) {
            lib$rsvp$config$$config['trigger']('error', reason, promise._label);
          }
        });
      },

    /**
      The primary way of interacting with a promise is through its `then` method,
      which registers callbacks to receive either a promise's eventual value or the
      reason why the promise cannot be fulfilled.

      ```js
      findUser().then(function(user){
        // user is available
      }, function(reason){
        // user is unavailable, and you are given the reason why
      });
      ```

      Chaining
      --------

      The return value of `then` is itself a promise.  This second, 'downstream'
      promise is resolved with the return value of the first promise's fulfillment
      or rejection handler, or rejected if the handler throws an exception.

      ```js
      findUser().then(function (user) {
        return user.name;
      }, function (reason) {
        return 'default name';
      }).then(function (userName) {
        // If `findUser` fulfilled, `userName` will be the user's name, otherwise it
        // will be `'default name'`
      });

      findUser().then(function (user) {
        throw new Error('Found user, but still unhappy');
      }, function (reason) {
        throw new Error('`findUser` rejected and we're unhappy');
      }).then(function (value) {
        // never reached
      }, function (reason) {
        // if `findUser` fulfilled, `reason` will be 'Found user, but still unhappy'.
        // If `findUser` rejected, `reason` will be '`findUser` rejected and we're unhappy'.
      });
      ```
      If the downstream promise does not specify a rejection handler, rejection reasons will be propagated further downstream.

      ```js
      findUser().then(function (user) {
        throw new PedagogicalException('Upstream error');
      }).then(function (value) {
        // never reached
      }).then(function (value) {
        // never reached
      }, function (reason) {
        // The `PedgagocialException` is propagated all the way down to here
      });
      ```

      Assimilation
      ------------

      Sometimes the value you want to propagate to a downstream promise can only be
      retrieved asynchronously. This can be achieved by returning a promise in the
      fulfillment or rejection handler. The downstream promise will then be pending
      until the returned promise is settled. This is called *assimilation*.

      ```js
      findUser().then(function (user) {
        return findCommentsByAuthor(user);
      }).then(function (comments) {
        // The user's comments are now available
      });
      ```

      If the assimliated promise rejects, then the downstream promise will also reject.

      ```js
      findUser().then(function (user) {
        return findCommentsByAuthor(user);
      }).then(function (comments) {
        // If `findCommentsByAuthor` fulfills, we'll have the value here
      }, function (reason) {
        // If `findCommentsByAuthor` rejects, we'll have the reason here
      });
      ```

      Simple Example
      --------------

      Synchronous Example

      ```javascript
      var result;

      try {
        result = findResult();
        // success
      } catch(reason) {
        // failure
      }
      ```

      Errback Example

      ```js
      findResult(function(result, err){
        if (err) {
          // failure
        } else {
          // success
        }
      });
      ```

      Promise Example;

      ```javascript
      findResult().then(function(result){
        // success
      }, function(reason){
        // failure
      });
      ```

      Advanced Example
      --------------

      Synchronous Example

      ```javascript
      var author, books;

      try {
        author = findAuthor();
        books  = findBooksByAuthor(author);
        // success
      } catch(reason) {
        // failure
      }
      ```

      Errback Example

      ```js

      function foundBooks(books) {

      }

      function failure(reason) {

      }

      findAuthor(function(author, err){
        if (err) {
          failure(err);
          // failure
        } else {
          try {
            findBoooksByAuthor(author, function(books, err) {
              if (err) {
                failure(err);
              } else {
                try {
                  foundBooks(books);
                } catch(reason) {
                  failure(reason);
                }
              }
            });
          } catch(error) {
            failure(err);
          }
          // success
        }
      });
      ```

      Promise Example;

      ```javascript
      findAuthor().
        then(findBooksByAuthor).
        then(function(books){
          // found books
      }).catch(function(reason){
        // something went wrong
      });
      ```

      @method then
      @param {Function} onFulfillment
      @param {Function} onRejection
      @param {String} label optional string for labeling the promise.
      Useful for tooling.
      @return {Promise}
    */
      then: lib$rsvp$then$$default,

    /**
      `catch` is simply sugar for `then(undefined, onRejection)` which makes it the same
      as the catch block of a try/catch statement.

      ```js
      function findAuthor(){
        throw new Error('couldn't find that author');
      }

      // synchronous
      try {
        findAuthor();
      } catch(reason) {
        // something went wrong
      }

      // async with promises
      findAuthor().catch(function(reason){
        // something went wrong
      });
      ```

      @method catch
      @param {Function} onRejection
      @param {String} label optional string for labeling the promise.
      Useful for tooling.
      @return {Promise}
    */
      'catch': function(onRejection, label) {
        return this.then(undefined, onRejection, label);
      },

    /**
      `finally` will be invoked regardless of the promise's fate just as native
      try/catch/finally behaves

      Synchronous example:

      ```js
      findAuthor() {
        if (Math.random() > 0.5) {
          throw new Error();
        }
        return new Author();
      }

      try {
        return findAuthor(); // succeed or fail
      } catch(error) {
        return findOtherAuther();
      } finally {
        // always runs
        // doesn't affect the return value
      }
      ```

      Asynchronous example:

      ```js
      findAuthor().catch(function(reason){
        return findOtherAuther();
      }).finally(function(){
        // author was either found, or not
      });
      ```

      @method finally
      @param {Function} callback
      @param {String} label optional string for labeling the promise.
      Useful for tooling.
      @return {Promise}
    */
      'finally': function(callback, label) {
        var promise = this;
        var constructor = promise.constructor;

        return promise.then(function(value) {
          return constructor.resolve(callback()).then(function() {
            return value;
          });
        }, function(reason) {
          return constructor.resolve(callback()).then(function() {
            return constructor.reject(reason);
          });
        }, label);
      }
    };
    function  lib$rsvp$$internal$$withOwnPromise() {
      return new TypeError('A promises callback cannot return that same promise.');
    }

    function lib$rsvp$$internal$$noop() {}

    var lib$rsvp$$internal$$PENDING   = void 0;
    var lib$rsvp$$internal$$FULFILLED = 1;
    var lib$rsvp$$internal$$REJECTED  = 2;

    var lib$rsvp$$internal$$GET_THEN_ERROR = new lib$rsvp$$internal$$ErrorObject();

    function lib$rsvp$$internal$$getThen(promise) {
      try {
        return promise.then;
      } catch(error) {
        lib$rsvp$$internal$$GET_THEN_ERROR.error = error;
        return lib$rsvp$$internal$$GET_THEN_ERROR;
      }
    }

    function lib$rsvp$$internal$$tryThen(then, value, fulfillmentHandler, rejectionHandler) {
      try {
        then.call(value, fulfillmentHandler, rejectionHandler);
      } catch(e) {
        return e;
      }
    }

    function lib$rsvp$$internal$$handleForeignThenable(promise, thenable, then) {
      lib$rsvp$config$$config.async(function(promise) {
        var sealed = false;
        var error = lib$rsvp$$internal$$tryThen(then, thenable, function(value) {
          if (sealed) { return; }
          sealed = true;
          if (thenable !== value) {
            lib$rsvp$$internal$$resolve(promise, value, undefined);
          } else {
            lib$rsvp$$internal$$fulfill(promise, value);
          }
        }, function(reason) {
          if (sealed) { return; }
          sealed = true;

          lib$rsvp$$internal$$reject(promise, reason);
        }, 'Settle: ' + (promise._label || ' unknown promise'));

        if (!sealed && error) {
          sealed = true;
          lib$rsvp$$internal$$reject(promise, error);
        }
      }, promise);
    }

    function lib$rsvp$$internal$$handleOwnThenable(promise, thenable) {
      if (thenable._state === lib$rsvp$$internal$$FULFILLED) {
        lib$rsvp$$internal$$fulfill(promise, thenable._result);
      } else if (thenable._state === lib$rsvp$$internal$$REJECTED) {
        thenable._onError = null;
        lib$rsvp$$internal$$reject(promise, thenable._result);
      } else {
        lib$rsvp$$internal$$subscribe(thenable, undefined, function(value) {
          if (thenable !== value) {
            lib$rsvp$$internal$$resolve(promise, value, undefined);
          } else {
            lib$rsvp$$internal$$fulfill(promise, value);
          }
        }, function(reason) {
          lib$rsvp$$internal$$reject(promise, reason);
        });
      }
    }

    function lib$rsvp$$internal$$handleMaybeThenable(promise, maybeThenable, then) {
      if (maybeThenable.constructor === promise.constructor &&
          then === lib$rsvp$then$$default &&
          constructor.resolve === lib$rsvp$promise$resolve$$default) {
        lib$rsvp$$internal$$handleOwnThenable(promise, maybeThenable);
      } else {
        if (then === lib$rsvp$$internal$$GET_THEN_ERROR) {
          lib$rsvp$$internal$$reject(promise, lib$rsvp$$internal$$GET_THEN_ERROR.error);
        } else if (then === undefined) {
          lib$rsvp$$internal$$fulfill(promise, maybeThenable);
        } else if (lib$rsvp$utils$$isFunction(then)) {
          lib$rsvp$$internal$$handleForeignThenable(promise, maybeThenable, then);
        } else {
          lib$rsvp$$internal$$fulfill(promise, maybeThenable);
        }
      }
    }

    function lib$rsvp$$internal$$resolve(promise, value) {
      if (promise === value) {
        lib$rsvp$$internal$$fulfill(promise, value);
      } else if (lib$rsvp$utils$$objectOrFunction(value)) {
        lib$rsvp$$internal$$handleMaybeThenable(promise, value, lib$rsvp$$internal$$getThen(value));
      } else {
        lib$rsvp$$internal$$fulfill(promise, value);
      }
    }

    function lib$rsvp$$internal$$publishRejection(promise) {
      if (promise._onError) {
        promise._onError(promise._result);
      }

      lib$rsvp$$internal$$publish(promise);
    }

    function lib$rsvp$$internal$$fulfill(promise, value) {
      if (promise._state !== lib$rsvp$$internal$$PENDING) { return; }

      promise._result = value;
      promise._state = lib$rsvp$$internal$$FULFILLED;

      if (promise._subscribers.length === 0) {
        if (lib$rsvp$config$$config.instrument) {
          lib$rsvp$instrument$$default('fulfilled', promise);
        }
      } else {
        lib$rsvp$config$$config.async(lib$rsvp$$internal$$publish, promise);
      }
    }

    function lib$rsvp$$internal$$reject(promise, reason) {
      if (promise._state !== lib$rsvp$$internal$$PENDING) { return; }
      promise._state = lib$rsvp$$internal$$REJECTED;
      promise._result = reason;
      lib$rsvp$config$$config.async(lib$rsvp$$internal$$publishRejection, promise);
    }

    function lib$rsvp$$internal$$subscribe(parent, child, onFulfillment, onRejection) {
      var subscribers = parent._subscribers;
      var length = subscribers.length;

      parent._onError = null;

      subscribers[length] = child;
      subscribers[length + lib$rsvp$$internal$$FULFILLED] = onFulfillment;
      subscribers[length + lib$rsvp$$internal$$REJECTED]  = onRejection;

      if (length === 0 && parent._state) {
        lib$rsvp$config$$config.async(lib$rsvp$$internal$$publish, parent);
      }
    }

    function lib$rsvp$$internal$$publish(promise) {
      var subscribers = promise._subscribers;
      var settled = promise._state;

      if (lib$rsvp$config$$config.instrument) {
        lib$rsvp$instrument$$default(settled === lib$rsvp$$internal$$FULFILLED ? 'fulfilled' : 'rejected', promise);
      }

      if (subscribers.length === 0) { return; }

      var child, callback, detail = promise._result;

      for (var i = 0; i < subscribers.length; i += 3) {
        child = subscribers[i];
        callback = subscribers[i + settled];

        if (child) {
          lib$rsvp$$internal$$invokeCallback(settled, child, callback, detail);
        } else {
          callback(detail);
        }
      }

      promise._subscribers.length = 0;
    }

    function lib$rsvp$$internal$$ErrorObject() {
      this.error = null;
    }

    var lib$rsvp$$internal$$TRY_CATCH_ERROR = new lib$rsvp$$internal$$ErrorObject();

    function lib$rsvp$$internal$$tryCatch(callback, detail) {
      try {
        return callback(detail);
      } catch(e) {
        lib$rsvp$$internal$$TRY_CATCH_ERROR.error = e;
        return lib$rsvp$$internal$$TRY_CATCH_ERROR;
      }
    }

    function lib$rsvp$$internal$$invokeCallback(settled, promise, callback, detail) {
      var hasCallback = lib$rsvp$utils$$isFunction(callback),
          value, error, succeeded, failed;

      if (hasCallback) {
        value = lib$rsvp$$internal$$tryCatch(callback, detail);

        if (value === lib$rsvp$$internal$$TRY_CATCH_ERROR) {
          failed = true;
          error = value.error;
          value = null;
        } else {
          succeeded = true;
        }

        if (promise === value) {
          lib$rsvp$$internal$$reject(promise, lib$rsvp$$internal$$withOwnPromise());
          return;
        }

      } else {
        value = detail;
        succeeded = true;
      }

      if (promise._state !== lib$rsvp$$internal$$PENDING) {
        // noop
      } else if (hasCallback && succeeded) {
        lib$rsvp$$internal$$resolve(promise, value);
      } else if (failed) {
        lib$rsvp$$internal$$reject(promise, error);
      } else if (settled === lib$rsvp$$internal$$FULFILLED) {
        lib$rsvp$$internal$$fulfill(promise, value);
      } else if (settled === lib$rsvp$$internal$$REJECTED) {
        lib$rsvp$$internal$$reject(promise, value);
      }
    }

    function lib$rsvp$$internal$$initializePromise(promise, resolver) {
      var resolved = false;
      try {
        resolver(function resolvePromise(value){
          if (resolved) { return; }
          resolved = true;
          lib$rsvp$$internal$$resolve(promise, value);
        }, function rejectPromise(reason) {
          if (resolved) { return; }
          resolved = true;
          lib$rsvp$$internal$$reject(promise, reason);
        });
      } catch(e) {
        lib$rsvp$$internal$$reject(promise, e);
      }
    }

    function lib$rsvp$all$settled$$AllSettled(Constructor, entries, label) {
      this._superConstructor(Constructor, entries, false /* don't abort on reject */, label);
    }

    lib$rsvp$all$settled$$AllSettled.prototype = lib$rsvp$utils$$o_create(lib$rsvp$enumerator$$default.prototype);
    lib$rsvp$all$settled$$AllSettled.prototype._superConstructor = lib$rsvp$enumerator$$default;
    lib$rsvp$all$settled$$AllSettled.prototype._makeResult = lib$rsvp$enumerator$$makeSettledResult;
    lib$rsvp$all$settled$$AllSettled.prototype._validationError = function() {
      return new Error('allSettled must be called with an array');
    };

    function lib$rsvp$all$settled$$allSettled(entries, label) {
      return new lib$rsvp$all$settled$$AllSettled(lib$rsvp$promise$$default, entries, label).promise;
    }
    var lib$rsvp$all$settled$$default = lib$rsvp$all$settled$$allSettled;
    function lib$rsvp$all$$all(array, label) {
      return lib$rsvp$promise$$default.all(array, label);
    }
    var lib$rsvp$all$$default = lib$rsvp$all$$all;
    var lib$rsvp$asap$$len = 0;
    var lib$rsvp$asap$$toString = {}.toString;
    var lib$rsvp$asap$$vertxNext;
    function lib$rsvp$asap$$asap(callback, arg) {
      lib$rsvp$asap$$queue[lib$rsvp$asap$$len] = callback;
      lib$rsvp$asap$$queue[lib$rsvp$asap$$len + 1] = arg;
      lib$rsvp$asap$$len += 2;
      if (lib$rsvp$asap$$len === 2) {
        // If len is 1, that means that we need to schedule an async flush.
        // If additional callbacks are queued before the queue is flushed, they
        // will be processed by this flush that we are scheduling.
        lib$rsvp$asap$$scheduleFlush();
      }
    }

    var lib$rsvp$asap$$default = lib$rsvp$asap$$asap;

    var lib$rsvp$asap$$browserWindow = (typeof window !== 'undefined') ? window : undefined;
    var lib$rsvp$asap$$browserGlobal = lib$rsvp$asap$$browserWindow || {};
    var lib$rsvp$asap$$BrowserMutationObserver = lib$rsvp$asap$$browserGlobal.MutationObserver || lib$rsvp$asap$$browserGlobal.WebKitMutationObserver;
    var lib$rsvp$asap$$isNode = typeof self === 'undefined' &&
      typeof process !== 'undefined' && {}.toString.call(process) === '[object process]';

    // test for web worker but not in IE10
    var lib$rsvp$asap$$isWorker = typeof Uint8ClampedArray !== 'undefined' &&
      typeof importScripts !== 'undefined' &&
      typeof MessageChannel !== 'undefined';

    // node
    function lib$rsvp$asap$$useNextTick() {
      var nextTick = process.nextTick;
      // node version 0.10.x displays a deprecation warning when nextTick is used recursively
      // setImmediate should be used instead instead
      var version = process.versions.node.match(/^(?:(\d+)\.)?(?:(\d+)\.)?(\*|\d+)$/);
      if (Array.isArray(version) && version[1] === '0' && version[2] === '10') {
        nextTick = setImmediate;
      }
      return function() {
        nextTick(lib$rsvp$asap$$flush);
      };
    }

    // vertx
    function lib$rsvp$asap$$useVertxTimer() {
      return function() {
        lib$rsvp$asap$$vertxNext(lib$rsvp$asap$$flush);
      };
    }

    function lib$rsvp$asap$$useMutationObserver() {
      var iterations = 0;
      var observer = new lib$rsvp$asap$$BrowserMutationObserver(lib$rsvp$asap$$flush);
      var node = document.createTextNode('');
      observer.observe(node, { characterData: true });

      return function() {
        node.data = (iterations = ++iterations % 2);
      };
    }

    // web worker
    function lib$rsvp$asap$$useMessageChannel() {
      var channel = new MessageChannel();
      channel.port1.onmessage = lib$rsvp$asap$$flush;
      return function () {
        channel.port2.postMessage(0);
      };
    }

    function lib$rsvp$asap$$useSetTimeout() {
      return function() {
        setTimeout(lib$rsvp$asap$$flush, 1);
      };
    }

    var lib$rsvp$asap$$queue = new Array(1000);
    function lib$rsvp$asap$$flush() {
      for (var i = 0; i < lib$rsvp$asap$$len; i+=2) {
        var callback = lib$rsvp$asap$$queue[i];
        var arg = lib$rsvp$asap$$queue[i+1];

        callback(arg);

        lib$rsvp$asap$$queue[i] = undefined;
        lib$rsvp$asap$$queue[i+1] = undefined;
      }

      lib$rsvp$asap$$len = 0;
    }

    function lib$rsvp$asap$$attemptVertex() {
      try {
        var r = require;
        var vertx = r('vertx');
        lib$rsvp$asap$$vertxNext = vertx.runOnLoop || vertx.runOnContext;
        return lib$rsvp$asap$$useVertxTimer();
      } catch(e) {
        return lib$rsvp$asap$$useSetTimeout();
      }
    }

    var lib$rsvp$asap$$scheduleFlush;
    // Decide what async method to use to triggering processing of queued callbacks:
    if (lib$rsvp$asap$$isNode) {
      lib$rsvp$asap$$scheduleFlush = lib$rsvp$asap$$useNextTick();
    } else if (lib$rsvp$asap$$BrowserMutationObserver) {
      lib$rsvp$asap$$scheduleFlush = lib$rsvp$asap$$useMutationObserver();
    } else if (lib$rsvp$asap$$isWorker) {
      lib$rsvp$asap$$scheduleFlush = lib$rsvp$asap$$useMessageChannel();
    } else if (lib$rsvp$asap$$browserWindow === undefined && typeof require === 'function') {
      lib$rsvp$asap$$scheduleFlush = lib$rsvp$asap$$attemptVertex();
    } else {
      lib$rsvp$asap$$scheduleFlush = lib$rsvp$asap$$useSetTimeout();
    }
    function lib$rsvp$defer$$defer(label) {
      var deferred = {};

      deferred['promise'] = new lib$rsvp$promise$$default(function(resolve, reject) {
        deferred['resolve'] = resolve;
        deferred['reject'] = reject;
      }, label);

      return deferred;
    }
    var lib$rsvp$defer$$default = lib$rsvp$defer$$defer;
    function lib$rsvp$filter$$filter(promises, filterFn, label) {
      return lib$rsvp$promise$$default.all(promises, label).then(function(values) {
        if (!lib$rsvp$utils$$isFunction(filterFn)) {
          throw new TypeError("You must pass a function as filter's second argument.");
        }

        var length = values.length;
        var filtered = new Array(length);

        for (var i = 0; i < length; i++) {
          filtered[i] = filterFn(values[i]);
        }

        return lib$rsvp$promise$$default.all(filtered, label).then(function(filtered) {
          var results = new Array(length);
          var newLength = 0;

          for (var i = 0; i < length; i++) {
            if (filtered[i]) {
              results[newLength] = values[i];
              newLength++;
            }
          }

          results.length = newLength;

          return results;
        });
      });
    }
    var lib$rsvp$filter$$default = lib$rsvp$filter$$filter;

    function lib$rsvp$promise$hash$$PromiseHash(Constructor, object, label) {
      this._superConstructor(Constructor, object, true, label);
    }

    var lib$rsvp$promise$hash$$default = lib$rsvp$promise$hash$$PromiseHash;

    lib$rsvp$promise$hash$$PromiseHash.prototype = lib$rsvp$utils$$o_create(lib$rsvp$enumerator$$default.prototype);
    lib$rsvp$promise$hash$$PromiseHash.prototype._superConstructor = lib$rsvp$enumerator$$default;
    lib$rsvp$promise$hash$$PromiseHash.prototype._init = function() {
      this._result = {};
    };

    lib$rsvp$promise$hash$$PromiseHash.prototype._validateInput = function(input) {
      return input && typeof input === 'object';
    };

    lib$rsvp$promise$hash$$PromiseHash.prototype._validationError = function() {
      return new Error('Promise.hash must be called with an object');
    };

    lib$rsvp$promise$hash$$PromiseHash.prototype._enumerate = function() {
      var enumerator = this;
      var promise    = enumerator.promise;
      var input      = enumerator._input;
      var results    = [];

      for (var key in input) {
        if (promise._state === lib$rsvp$$internal$$PENDING && Object.prototype.hasOwnProperty.call(input, key)) {
          results.push({
            position: key,
            entry: input[key]
          });
        }
      }

      var length = results.length;
      enumerator._remaining = length;
      var result;

      for (var i = 0; promise._state === lib$rsvp$$internal$$PENDING && i < length; i++) {
        result = results[i];
        enumerator._eachEntry(result.entry, result.position);
      }
    };

    function lib$rsvp$hash$settled$$HashSettled(Constructor, object, label) {
      this._superConstructor(Constructor, object, false, label);
    }

    lib$rsvp$hash$settled$$HashSettled.prototype = lib$rsvp$utils$$o_create(lib$rsvp$promise$hash$$default.prototype);
    lib$rsvp$hash$settled$$HashSettled.prototype._superConstructor = lib$rsvp$enumerator$$default;
    lib$rsvp$hash$settled$$HashSettled.prototype._makeResult = lib$rsvp$enumerator$$makeSettledResult;

    lib$rsvp$hash$settled$$HashSettled.prototype._validationError = function() {
      return new Error('hashSettled must be called with an object');
    };

    function lib$rsvp$hash$settled$$hashSettled(object, label) {
      return new lib$rsvp$hash$settled$$HashSettled(lib$rsvp$promise$$default, object, label).promise;
    }
    var lib$rsvp$hash$settled$$default = lib$rsvp$hash$settled$$hashSettled;
    function lib$rsvp$hash$$hash(object, label) {
      return new lib$rsvp$promise$hash$$default(lib$rsvp$promise$$default, object, label).promise;
    }
    var lib$rsvp$hash$$default = lib$rsvp$hash$$hash;
    function lib$rsvp$map$$map(promises, mapFn, label) {
      return lib$rsvp$promise$$default.all(promises, label).then(function(values) {
        if (!lib$rsvp$utils$$isFunction(mapFn)) {
          throw new TypeError("You must pass a function as map's second argument.");
        }

        var length = values.length;
        var results = new Array(length);

        for (var i = 0; i < length; i++) {
          results[i] = mapFn(values[i]);
        }

        return lib$rsvp$promise$$default.all(results, label);
      });
    }
    var lib$rsvp$map$$default = lib$rsvp$map$$map;

    function lib$rsvp$node$$Result() {
      this.value = undefined;
    }

    var lib$rsvp$node$$ERROR = new lib$rsvp$node$$Result();
    var lib$rsvp$node$$GET_THEN_ERROR = new lib$rsvp$node$$Result();

    function lib$rsvp$node$$getThen(obj) {
      try {
       return obj.then;
      } catch(error) {
        lib$rsvp$node$$ERROR.value= error;
        return lib$rsvp$node$$ERROR;
      }
    }


    function lib$rsvp$node$$tryApply(f, s, a) {
      try {
        f.apply(s, a);
      } catch(error) {
        lib$rsvp$node$$ERROR.value = error;
        return lib$rsvp$node$$ERROR;
      }
    }

    function lib$rsvp$node$$makeObject(_, argumentNames) {
      var obj = {};
      var name;
      var i;
      var length = _.length;
      var args = new Array(length);

      for (var x = 0; x < length; x++) {
        args[x] = _[x];
      }

      for (i = 0; i < argumentNames.length; i++) {
        name = argumentNames[i];
        obj[name] = args[i + 1];
      }

      return obj;
    }

    function lib$rsvp$node$$arrayResult(_) {
      var length = _.length;
      var args = new Array(length - 1);

      for (var i = 1; i < length; i++) {
        args[i - 1] = _[i];
      }

      return args;
    }

    function lib$rsvp$node$$wrapThenable(then, promise) {
      return {
        then: function(onFulFillment, onRejection) {
          return then.call(promise, onFulFillment, onRejection);
        }
      };
    }

    function lib$rsvp$node$$denodeify(nodeFunc, options) {
      var fn = function() {
        var self = this;
        var l = arguments.length;
        var args = new Array(l + 1);
        var arg;
        var promiseInput = false;

        for (var i = 0; i < l; ++i) {
          arg = arguments[i];

          if (!promiseInput) {
            // TODO: clean this up
            promiseInput = lib$rsvp$node$$needsPromiseInput(arg);
            if (promiseInput === lib$rsvp$node$$GET_THEN_ERROR) {
              var p = new lib$rsvp$promise$$default(lib$rsvp$$internal$$noop);
              lib$rsvp$$internal$$reject(p, lib$rsvp$node$$GET_THEN_ERROR.value);
              return p;
            } else if (promiseInput && promiseInput !== true) {
              arg = lib$rsvp$node$$wrapThenable(promiseInput, arg);
            }
          }
          args[i] = arg;
        }

        var promise = new lib$rsvp$promise$$default(lib$rsvp$$internal$$noop);

        args[l] = function(err, val) {
          if (err)
            lib$rsvp$$internal$$reject(promise, err);
          else if (options === undefined)
            lib$rsvp$$internal$$resolve(promise, val);
          else if (options === true)
            lib$rsvp$$internal$$resolve(promise, lib$rsvp$node$$arrayResult(arguments));
          else if (lib$rsvp$utils$$isArray(options))
            lib$rsvp$$internal$$resolve(promise, lib$rsvp$node$$makeObject(arguments, options));
          else
            lib$rsvp$$internal$$resolve(promise, val);
        };

        if (promiseInput) {
          return lib$rsvp$node$$handlePromiseInput(promise, args, nodeFunc, self);
        } else {
          return lib$rsvp$node$$handleValueInput(promise, args, nodeFunc, self);
        }
      };

      fn.__proto__ = nodeFunc;

      return fn;
    }

    var lib$rsvp$node$$default = lib$rsvp$node$$denodeify;

    function lib$rsvp$node$$handleValueInput(promise, args, nodeFunc, self) {
      var result = lib$rsvp$node$$tryApply(nodeFunc, self, args);
      if (result === lib$rsvp$node$$ERROR) {
        lib$rsvp$$internal$$reject(promise, result.value);
      }
      return promise;
    }

    function lib$rsvp$node$$handlePromiseInput(promise, args, nodeFunc, self){
      return lib$rsvp$promise$$default.all(args).then(function(args){
        var result = lib$rsvp$node$$tryApply(nodeFunc, self, args);
        if (result === lib$rsvp$node$$ERROR) {
          lib$rsvp$$internal$$reject(promise, result.value);
        }
        return promise;
      });
    }

    function lib$rsvp$node$$needsPromiseInput(arg) {
      if (arg && typeof arg === 'object') {
        if (arg.constructor === lib$rsvp$promise$$default) {
          return true;
        } else {
          return lib$rsvp$node$$getThen(arg);
        }
      } else {
        return false;
      }
    }
    var lib$rsvp$platform$$platform;

    /* global self */
    if (typeof self === 'object') {
      lib$rsvp$platform$$platform = self;

    /* global global */
    } else if (typeof global === 'object') {
      lib$rsvp$platform$$platform = global;
    } else {
      throw new Error('no global: `self` or `global` found');
    }

    var lib$rsvp$platform$$default = lib$rsvp$platform$$platform;
    function lib$rsvp$race$$race(array, label) {
      return lib$rsvp$promise$$default.race(array, label);
    }
    var lib$rsvp$race$$default = lib$rsvp$race$$race;
    function lib$rsvp$reject$$reject(reason, label) {
      return lib$rsvp$promise$$default.reject(reason, label);
    }
    var lib$rsvp$reject$$default = lib$rsvp$reject$$reject;
    function lib$rsvp$resolve$$resolve(value, label) {
      return lib$rsvp$promise$$default.resolve(value, label);
    }
    var lib$rsvp$resolve$$default = lib$rsvp$resolve$$resolve;
    function lib$rsvp$rethrow$$rethrow(reason) {
      setTimeout(function() {
        throw reason;
      });
      throw reason;
    }
    var lib$rsvp$rethrow$$default = lib$rsvp$rethrow$$rethrow;

    // defaults
    lib$rsvp$config$$config.async = lib$rsvp$asap$$default;
    lib$rsvp$config$$config.after = function(cb) {
      setTimeout(cb, 0);
    };
    var lib$rsvp$$cast = lib$rsvp$resolve$$default;
    function lib$rsvp$$async(callback, arg) {
      lib$rsvp$config$$config.async(callback, arg);
    }

    function lib$rsvp$$on() {
      lib$rsvp$config$$config['on'].apply(lib$rsvp$config$$config, arguments);
    }

    function lib$rsvp$$off() {
      lib$rsvp$config$$config['off'].apply(lib$rsvp$config$$config, arguments);
    }

    // Set up instrumentation through `window.__PROMISE_INTRUMENTATION__`
    if (typeof window !== 'undefined' && typeof window['__PROMISE_INSTRUMENTATION__'] === 'object') {
      var lib$rsvp$$callbacks = window['__PROMISE_INSTRUMENTATION__'];
      lib$rsvp$config$$configure('instrument', true);
      for (var lib$rsvp$$eventName in lib$rsvp$$callbacks) {
        if (lib$rsvp$$callbacks.hasOwnProperty(lib$rsvp$$eventName)) {
          lib$rsvp$$on(lib$rsvp$$eventName, lib$rsvp$$callbacks[lib$rsvp$$eventName]);
        }
      }
    }

    var lib$rsvp$umd$$RSVP = {
      'race': lib$rsvp$race$$default,
      'Promise': lib$rsvp$promise$$default,
      'allSettled': lib$rsvp$all$settled$$default,
      'hash': lib$rsvp$hash$$default,
      'hashSettled': lib$rsvp$hash$settled$$default,
      'denodeify': lib$rsvp$node$$default,
      'on': lib$rsvp$$on,
      'off': lib$rsvp$$off,
      'map': lib$rsvp$map$$default,
      'filter': lib$rsvp$filter$$default,
      'resolve': lib$rsvp$resolve$$default,
      'reject': lib$rsvp$reject$$default,
      'all': lib$rsvp$all$$default,
      'rethrow': lib$rsvp$rethrow$$default,
      'defer': lib$rsvp$defer$$default,
      'EventTarget': lib$rsvp$events$$default,
      'configure': lib$rsvp$config$$configure,
      'async': lib$rsvp$$async
    };

    /* global define:true module:true window: true */
    if (typeof define === 'function' && define['amd']) {
      define(function() { return lib$rsvp$umd$$RSVP; });
    } else if (typeof module !== 'undefined' && module['exports']) {
      module['exports'] = lib$rsvp$umd$$RSVP;
    } else if (typeof lib$rsvp$platform$$default !== 'undefined') {
      lib$rsvp$platform$$default['RSVP'] = lib$rsvp$umd$$RSVP;
    }
}).call(this);


}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"_process":11}]},{},[5])(5)
});