/*
SPF 2.0.0-beta.2
(c) 2012-2014 Google, Inc.
License: MIT
*/
(function(){function $spf$bind$$($fn$$1$$, $self$$1$$, $var_args$$27$$) {
  var $args$$ = Array.prototype.slice.call(arguments, 2);
  return function() {
    var $newArgs$$ = $args$$.slice();
    $newArgs$$.push.apply($newArgs$$, arguments);
    return $fn$$1$$.apply($self$$1$$, $newArgs$$);
  };
}
function $spf$dispatch$$($name$$47$$, $opt_detail$$) {
  if (document.createEvent) {
    var $evt$$21$$ = document.createEvent("CustomEvent");
    $evt$$21$$.initCustomEvent($name$$47$$, !0, !0, $opt_detail$$);
    document.dispatchEvent($evt$$21$$);
  }
}
;var $spf$state$values_$$ = window._spf_state || {};
window._spf_state = $spf$state$values_$$;
var $spf$config$values$$ = {};
"config" in $spf$state$values_$$ || ($spf$state$values_$$.config = $spf$config$values$$);
$spf$config$values$$ = $spf$state$values_$$.config;
function $spf$array$each$$($arr$$10$$, $fn$$3$$) {
  if ($arr$$10$$.forEach) {
    $arr$$10$$.forEach($fn$$3$$, void 0);
  } else {
    for (var $i$$3$$ = 0, $l$$ = $arr$$10$$.length;$i$$3$$ < $l$$;$i$$3$$++) {
      $i$$3$$ in $arr$$10$$ && $fn$$3$$.call(void 0, $arr$$10$$[$i$$3$$], $i$$3$$, $arr$$10$$);
    }
  }
}
function $spf$array$every$$($arr$$11$$, $fn$$4$$) {
  if ($arr$$11$$.every) {
    return $arr$$11$$.every($fn$$4$$, void 0);
  }
  for (var $i$$4$$ = 0, $l$$1$$ = $arr$$11$$.length;$i$$4$$ < $l$$1$$;$i$$4$$++) {
    if ($i$$4$$ in $arr$$11$$ && !$fn$$4$$.call(void 0, $arr$$11$$[$i$$4$$], $i$$4$$, $arr$$11$$)) {
      return!1;
    }
  }
  return!0;
}
function $spf$array$isArray$$($val$$2$$) {
  return "[object Array]" == Object.prototype.toString.call($val$$2$$);
}
;function $spf$debug$debug$$($var_args$$29$$) {
  $spf$debug$levels_$$[$spf$debug$Level$DEBUG$$] >= $spf$debug$levels_$$.debug && $spf$debug$log$$($spf$debug$Level$DEBUG$$, arguments);
}
function $spf$debug$warn$$($var_args$$31$$) {
  $spf$debug$levels_$$[$spf$debug$Level$WARN$$] >= $spf$debug$levels_$$.debug && $spf$debug$log$$($spf$debug$Level$WARN$$, arguments);
}
function $spf$debug$log$$($method$$1$$, $args$$2$$) {
  if (window.console) {
    $args$$2$$ = Array.prototype.slice.call($args$$2$$);
    var $current$$ = (new Date).getTime(), $overall$$ = $spf$debug$formatDuration$$($spf$debug$start_$$, $current$$);
    $spf$debug$split_$$ ? $args$$2$$.unshift($overall$$ + "/" + $spf$debug$formatDuration$$($spf$debug$split_$$, $current$$) + ":") : $args$$2$$.unshift($overall$$ + ":");
    $spf$debug$direct_$$ ? ($args$$2$$.unshift("[spf]"), window.console[$method$$1$$].apply(window.console, $args$$2$$)) : ($args$$2$$.unshift("[spf - " + $method$$1$$ + "]"), window.console.log($args$$2$$.join(" ")));
  }
}
function $spf$debug$formatDuration$$($start$$7$$, $end$$3$$) {
  var $dur$$ = ($end$$3$$ - $start$$7$$) / 1E3;
  $dur$$.toFixed && ($dur$$ = $dur$$.toFixed(3));
  return $dur$$ + "s";
}
var $spf$debug$start_$$ = (new Date).getTime(), $spf$debug$split_$$ = 0, $spf$debug$direct_$$ = !(!window.console || !window.console.debug), $spf$debug$levels_$$ = {debug:1, info:2, warn:3, error:4}, $spf$debug$Level$DEBUG$$ = "debug", $spf$debug$Level$WARN$$ = "warn";
function $spf$dom$query$$($selector$$1$$) {
  var $doc$$ = document;
  return $doc$$.querySelectorAll ? $doc$$.querySelectorAll($selector$$1$$) : [];
}
;function $spf$pubsub$subscribe$$($topic$$, $fn$$7$$) {
  $topic$$ && $fn$$7$$ && ($topic$$ in $spf$pubsub$subscriptions$$ || ($spf$pubsub$subscriptions$$[$topic$$] = []), $spf$pubsub$subscriptions$$[$topic$$].push($fn$$7$$));
}
function $spf$pubsub$publish_$$($topic$$4$$) {
  $topic$$4$$ in $spf$pubsub$subscriptions$$ && $spf$array$each$$($spf$pubsub$subscriptions$$[$topic$$4$$], function($subFn$$1$$, $i$$11$$, $arr$$18$$) {
    $arr$$18$$[$i$$11$$] = null;
    $subFn$$1$$ && $subFn$$1$$();
  });
}
function $spf$pubsub$rename$$($oldTopic$$, $newTopic$$) {
  $oldTopic$$ && $newTopic$$ && $oldTopic$$ in $spf$pubsub$subscriptions$$ && ($spf$pubsub$subscriptions$$[$newTopic$$] = ($spf$pubsub$subscriptions$$[$newTopic$$] || []).concat($spf$pubsub$subscriptions$$[$oldTopic$$]), delete $spf$pubsub$subscriptions$$[$oldTopic$$]);
}
var $spf$pubsub$subscriptions$$ = {};
"ps-s" in $spf$state$values_$$ || ($spf$state$values_$$["ps-s"] = $spf$pubsub$subscriptions$$);
$spf$pubsub$subscriptions$$ = $spf$state$values_$$["ps-s"];
function $spf$url$absolute$$($relative$$) {
  var $aEl$$inline_6$$ = document.createElement("a");
  $aEl$$inline_6$$.href = $relative$$;
  $aEl$$inline_6$$.href = $aEl$$inline_6$$.href;
  return $aEl$$inline_6$$.href.split("#")[0];
}
;function $spf$net$resource$load$$($el$$1_url$$18$$, $name$$52$$, $check_opt_fn$$) {
  var $type$$73$$ = $spf$net$resource$Type$JS$$;
  $spf$debug$debug$$("resource.load", $type$$73$$, $el$$1_url$$18$$, $name$$52$$);
  var $isJS_prevName_prevTopic$$ = $type$$73$$ == $spf$net$resource$Type$JS$$;
  if ($spf$array$isArray$$($el$$1_url$$18$$)) {
    var $urls$$ = $el$$1_url$$18$$;
    setTimeout(function() {
      throw Error($type$$73$$ + ' load for "' + $name$$52$$ + '" called with too many urls ' + $urls$$ + "; pass only one string");
    }, 0);
    $el$$1_url$$18$$ = $el$$1_url$$18$$[0];
  }
  $el$$1_url$$18$$ = $spf$net$resource$canonicalize$$($type$$73$$, $el$$1_url$$18$$);
  var $pseudonym$$ = $name$$52$$ || "^" + $el$$1_url$$18$$, $topic$$6$$ = $spf$net$resource$key$$($type$$73$$, $pseudonym$$);
  if ($name$$52$$) {
    var $prevUrl$$ = $spf$net$resource$url$get$$($type$$73$$, $name$$52$$);
    $prevUrl$$ && $el$$1_url$$18$$ != $prevUrl$$ && ($spf$dispatch$$($isJS_prevName_prevTopic$$ ? "spfjsbeforeunload" : "spfcssbeforeunload", {name:$name$$52$$, urls:[$prevUrl$$], url:$prevUrl$$}), $spf$net$resource$unloadPrepare_$$($type$$73$$, $name$$52$$, $prevUrl$$), $spf$pubsub$subscribe$$($topic$$6$$, $spf$bind$$($spf$net$resource$unloadComplete_$$, null, $type$$73$$, $name$$52$$, $prevUrl$$)));
  }
  ($isJS_prevName_prevTopic$$ = $spf$net$resource$name$get$$($type$$73$$, $el$$1_url$$18$$)) && $pseudonym$$ != $isJS_prevName_prevTopic$$ && ($spf$net$resource$url$clear$$($type$$73$$, $isJS_prevName_prevTopic$$), $spf$net$resource$name$clear$$($type$$73$$, $el$$1_url$$18$$), $isJS_prevName_prevTopic$$ = $spf$net$resource$key$$($type$$73$$, $isJS_prevName_prevTopic$$), $spf$pubsub$rename$$($isJS_prevName_prevTopic$$, $topic$$6$$));
  $spf$net$resource$name$set$$($type$$73$$, $el$$1_url$$18$$, $pseudonym$$);
  $spf$net$resource$url$set$$($type$$73$$, $pseudonym$$, $el$$1_url$$18$$);
  $spf$debug$debug$$("  subscribing callback", $topic$$6$$);
  $spf$pubsub$subscribe$$($topic$$6$$, $check_opt_fn$$);
  $check_opt_fn$$ = $spf$bind$$($spf$net$resource$check$$, null, $type$$73$$);
  $spf$net$resource$status$get$$($type$$73$$, $el$$1_url$$18$$) ? $check_opt_fn$$() : ($el$$1_url$$18$$ = $spf$net$resource$create$$($type$$73$$, $el$$1_url$$18$$, $check_opt_fn$$)) && $name$$52$$ && $el$$1_url$$18$$.setAttribute("name", $name$$52$$);
}
function $spf$net$resource$unload$$($name$$53$$) {
  var $type$$74$$ = $spf$net$resource$Type$JS$$;
  $spf$debug$warn$$("resource.unload", $type$$74$$, $name$$53$$);
  var $url$$19$$ = $spf$net$resource$url$get$$($type$$74$$, $name$$53$$);
  $spf$net$resource$unloadPrepare_$$($type$$74$$, $name$$53$$, $url$$19$$);
  $spf$net$resource$unloadComplete_$$($type$$74$$, $name$$53$$, $url$$19$$);
}
function $spf$net$resource$unloadPrepare_$$($topic$$7_type$$75$$, $name$$54$$, $url$$20$$) {
  $spf$debug$debug$$("  > resource.unloadPrepare_", $topic$$7_type$$75$$, $url$$20$$);
  $spf$net$resource$url$clear$$($topic$$7_type$$75$$, $name$$54$$);
  $url$$20$$ && $spf$net$resource$name$clear$$($topic$$7_type$$75$$, $url$$20$$);
  $topic$$7_type$$75$$ = $spf$net$resource$key$$($topic$$7_type$$75$$, $name$$54$$);
  $spf$debug$debug$$("  clearing callbacks for", $topic$$7_type$$75$$);
  delete $spf$pubsub$subscriptions$$[$topic$$7_type$$75$$];
}
function $spf$net$resource$unloadComplete_$$($type$$76$$, $name$$55$$, $url$$21$$) {
  var $isJS$$1$$ = $type$$76$$ == $spf$net$resource$Type$JS$$;
  $url$$21$$ && ($spf$debug$debug$$("  > resource.unloadComplete_", $type$$76$$, $url$$21$$), $spf$dispatch$$($isJS$$1$$ ? "spfjsunload" : "spfcssunload", {name:$name$$55$$, urls:[$url$$21$$], url:$url$$21$$}), $spf$net$resource$destroy$$($type$$76$$, $url$$21$$));
}
function $spf$net$resource$check$$($type$$77$$) {
  $spf$debug$debug$$("resource.check", $type$$77$$);
  var $prefix$$4$$ = $spf$net$resource$key$$($type$$77$$, ""), $topic$$8$$;
  for ($topic$$8$$ in $spf$pubsub$subscriptions$$) {
    if (0 == $topic$$8$$.indexOf($prefix$$4$$)) {
      var $names$$ = $topic$$8$$.substring($prefix$$4$$.length).split("|"), $ready$$ = $spf$array$every$$($names$$, $spf$bind$$($spf$net$resource$url$loaded$$, null, $type$$77$$));
      $spf$debug$debug$$(" ", $topic$$8$$, "->", $names$$, "=", $ready$$);
      $ready$$ && ($spf$debug$debug$$("  publishing", $topic$$8$$), $spf$pubsub$publish_$$($topic$$8$$));
    }
  }
}
function $spf$net$resource$create$$($type$$78$$, $url$$22$$, $opt_callback$$7$$) {
  function $next$$1$$() {
    $spf$debug$debug$$("resource.create", $type$$78$$, $url$$22$$, "done");
    $spf$net$resource$status$get$$($type$$78$$, $url$$22$$, void 0) && ($spf$debug$debug$$("resource.create", $type$$78$$, $url$$22$$, "loaded"), $spf$net$resource$status$set$$($spf$net$resource$State$LOADED$$, $type$$78$$, $url$$22$$));
    $opt_callback$$7$$ && setTimeout($opt_callback$$7$$, 0);
    return null;
  }
  $spf$debug$debug$$("resource.create", $type$$78$$, $url$$22$$, "loading");
  var $isJS$$2$$ = $type$$78$$ == $spf$net$resource$Type$JS$$;
  $url$$22$$ = $spf$net$resource$canonicalize$$($type$$78$$, $url$$22$$);
  $spf$net$resource$status$set$$($spf$net$resource$State$LOADING$$, $type$$78$$, $url$$22$$);
  var $doc$$2_head$$ = document, $el$$2$$ = $doc$$2_head$$.createElement($isJS$$2$$ ? "script" : "link");
  if (!$url$$22$$) {
    return $next$$1$$();
  }
  var $label$$4$$ = $url$$22$$ ? String($url$$22$$).replace(/[^\w]/g, "") : "";
  $el$$2$$.className = $spf$net$resource$key$$($type$$78$$, $label$$4$$);
  "onload" in $el$$2$$ ? $el$$2$$.onerror = $el$$2$$.onload = $next$$1$$ : $el$$2$$.onreadystatechange = function $$el$$2$$$onreadystatechange$() {
    /^c|loade/.test($el$$2$$.readyState) && $next$$1$$();
  };
  $doc$$2_head$$ = $doc$$2_head$$.getElementsByTagName("head")[0];
  $isJS$$2$$ ? ($el$$2$$.async = !0, $el$$2$$.src = $url$$22$$, $doc$$2_head$$.insertBefore($el$$2$$, $doc$$2_head$$.firstChild)) : ($el$$2$$.rel = "stylesheet", $el$$2$$.href = $url$$22$$, $doc$$2_head$$.appendChild($el$$2$$));
  return $el$$2$$;
}
function $spf$net$resource$destroy$$($type$$79$$, $url$$23$$) {
  var $cls$$3_els_label$$5$$ = ($url$$23$$ = $spf$net$resource$canonicalize$$($type$$79$$, $url$$23$$)) ? String($url$$23$$).replace(/[^\w]/g, "") : "", $cls$$3_els_label$$5$$ = $spf$net$resource$key$$($type$$79$$, $cls$$3_els_label$$5$$), $cls$$3_els_label$$5$$ = $spf$dom$query$$("." + $cls$$3_els_label$$5$$);
  $spf$array$each$$($cls$$3_els_label$$5$$, function($el$$3$$) {
    $el$$3$$ && $el$$3$$.parentNode && $el$$3$$.parentNode.removeChild($el$$3$$);
  });
  $spf$net$resource$status$clear$$($type$$79$$, $url$$23$$);
}
function $spf$net$resource$canonicalize$$($type$$86$$, $url$$27$$) {
  var $key$$29_paths$$1$$ = "rsrc-p-" + $type$$86$$;
  if ($url$$27$$) {
    var $index$$45$$ = $url$$27$$.indexOf("//");
    if (0 > $index$$45$$) {
      if (0 == $url$$27$$.lastIndexOf("hash-", 0)) {
        return $url$$27$$;
      }
      $key$$29_paths$$1$$ = $spf$state$values_$$[$key$$29_paths$$1$$] || "";
      if ("[object String]" == Object.prototype.toString.call($key$$29_paths$$1$$)) {
        $url$$27$$ = $key$$29_paths$$1$$ + $url$$27$$;
      } else {
        for (var $p$$ in $key$$29_paths$$1$$) {
          $url$$27$$ = $url$$27$$.replace($p$$, $key$$29_paths$$1$$[$p$$]);
        }
      }
      $url$$27$$ = 0 > $url$$27$$.indexOf("." + $type$$86$$) ? $url$$27$$ + "." + $type$$86$$ : $url$$27$$;
      $url$$27$$ = $spf$url$absolute$$($url$$27$$);
    } else {
      0 == $index$$45$$ && ($url$$27$$ = $spf$url$absolute$$($url$$27$$));
    }
  }
  return $url$$27$$;
}
function $spf$net$resource$key$$($type$$87$$, $label$$9$$, $opt_group$$) {
  return $type$$87$$ + "-" + $label$$9$$ + ($opt_group$$ ? "-" + $opt_group$$ : "");
}
function $spf$net$resource$status$set$$($status$$, $key$$30_type$$88$$, $url$$29$$) {
  $key$$30_type$$88$$ = $spf$net$resource$key$$($key$$30_type$$88$$, $url$$29$$, void 0);
  $spf$net$resource$status_$$[$key$$30_type$$88$$] = $status$$;
}
function $spf$net$resource$status$get$$($key$$31_type$$89$$, $url$$30$$, $opt_group$$2$$) {
  $key$$31_type$$89$$ = $spf$net$resource$key$$($key$$31_type$$89$$, $url$$30$$, $opt_group$$2$$);
  return $spf$net$resource$status_$$[$key$$31_type$$89$$];
}
function $spf$net$resource$status$clear$$($type$$90$$, $url$$31$$) {
  var $key$$32$$ = $spf$net$resource$key$$($type$$90$$, $url$$31$$);
  delete $spf$net$resource$status_$$[$key$$32$$];
}
function $spf$net$resource$name$set$$($key$$33_type$$92$$, $url$$33$$, $name$$58$$) {
  $key$$33_type$$92$$ = $spf$net$resource$key$$($key$$33_type$$92$$, $url$$33$$);
  $spf$net$resource$name_$$[$key$$33_type$$92$$] = $name$$58$$;
}
function $spf$net$resource$name$get$$($type$$93$$, $url$$34$$) {
  var $key$$34$$ = $spf$net$resource$key$$($type$$93$$, $url$$34$$);
  return $spf$net$resource$name_$$[$key$$34$$];
}
function $spf$net$resource$name$clear$$($type$$94$$, $url$$35$$) {
  var $key$$35$$ = $spf$net$resource$key$$($type$$94$$, $url$$35$$);
  delete $spf$net$resource$name_$$[$key$$35$$];
}
function $spf$net$resource$url$set$$($key$$36_type$$95$$, $name$$59$$, $url$$36$$) {
  $key$$36_type$$95$$ = $spf$net$resource$key$$($key$$36_type$$95$$, $name$$59$$);
  $spf$net$resource$url_$$[$key$$36_type$$95$$] = $url$$36$$;
}
function $spf$net$resource$url$get$$($type$$96$$, $name$$60$$) {
  var $key$$37_url$$37$$ = $spf$net$resource$key$$($type$$96$$, $name$$60$$), $key$$37_url$$37$$ = $spf$net$resource$url_$$[$key$$37_url$$37$$];
  $spf$array$isArray$$($key$$37_url$$37$$) && ($key$$37_url$$37$$ = $key$$37_url$$37$$[0]);
  return $key$$37_url$$37$$;
}
function $spf$net$resource$url$clear$$($type$$97$$, $name$$61$$) {
  var $key$$38$$ = $spf$net$resource$key$$($type$$97$$, $name$$61$$);
  delete $spf$net$resource$url_$$[$key$$38$$];
}
function $spf$net$resource$url$loaded$$($type$$98$$, $name$$62$$) {
  var $url$$38$$ = $spf$net$resource$url$get$$($type$$98$$, $name$$62$$), $JSCompiler_temp$$1_JSCompiler_temp$$2_status$$inline_20$$;
  !($JSCompiler_temp$$1_JSCompiler_temp$$2_status$$inline_20$$ = "" == $name$$62$$) && ($JSCompiler_temp$$1_JSCompiler_temp$$2_status$$inline_20$$ = void 0 != $url$$38$$) && ($JSCompiler_temp$$1_JSCompiler_temp$$2_status$$inline_20$$ = $spf$net$resource$status$get$$($type$$98$$, $url$$38$$), $JSCompiler_temp$$1_JSCompiler_temp$$2_status$$inline_20$$ = "" == $url$$38$$ || $JSCompiler_temp$$1_JSCompiler_temp$$2_status$$inline_20$$ == $spf$net$resource$State$LOADED$$);
  return $JSCompiler_temp$$1_JSCompiler_temp$$2_status$$inline_20$$;
}
var $spf$net$resource$status_$$ = {}, $spf$net$resource$name_$$ = {}, $spf$net$resource$url_$$ = {}, $spf$net$resource$State$LOADING$$ = 1, $spf$net$resource$State$LOADED$$ = 2, $spf$net$resource$Type$JS$$ = "js";
"rsrc-s" in $spf$state$values_$$ || ($spf$state$values_$$["rsrc-s"] = $spf$net$resource$status_$$);
$spf$net$resource$status_$$ = $spf$state$values_$$["rsrc-s"];
"rsrc-n" in $spf$state$values_$$ || ($spf$state$values_$$["rsrc-n"] = $spf$net$resource$name_$$);
$spf$net$resource$name_$$ = $spf$state$values_$$["rsrc-n"];
"rsrc-u" in $spf$state$values_$$ || ($spf$state$values_$$["rsrc-u"] = $spf$net$resource$url_$$);
$spf$net$resource$url_$$ = $spf$state$values_$$["rsrc-u"];
function $spf$net$script$ready$$($names$$1_topic$$9$$, $opt_fn$$3$$, $opt_require$$) {
  $names$$1_topic$$9$$ = $spf$array$isArray$$($names$$1_topic$$9$$) ? $names$$1_topic$$9$$ : [$names$$1_topic$$9$$];
  $spf$debug$debug$$("script.ready", $names$$1_topic$$9$$);
  var $unknown$$ = [];
  $spf$array$each$$($names$$1_topic$$9$$, function($name$$65$$) {
    $name$$65$$ && void 0 == $spf$net$resource$url$get$$($spf$net$resource$Type$JS$$, $name$$65$$) && $unknown$$.push($name$$65$$);
  });
  var $known$$ = !$unknown$$.length;
  if ($opt_fn$$3$$) {
    var $ready$$1$$ = $spf$array$every$$($names$$1_topic$$9$$, $spf$bind$$($spf$net$resource$url$loaded$$, null, $spf$net$resource$Type$JS$$));
    $known$$ && $ready$$1$$ ? $opt_fn$$3$$() : ($names$$1_topic$$9$$ = $spf$net$resource$key$$($spf$net$resource$Type$JS$$, $names$$1_topic$$9$$.sort().join("|")), $spf$debug$debug$$("  subscribing", $names$$1_topic$$9$$), $spf$pubsub$subscribe$$($names$$1_topic$$9$$, $opt_fn$$3$$));
  }
  $opt_require$$ && !$known$$ && $opt_require$$($unknown$$);
}
function $spf$net$script$require$$($names$$3$$, $opt_fn$$4$$) {
  $spf$debug$debug$$("script.require", $names$$3$$);
  $names$$3$$ = $spf$array$isArray$$($names$$3$$) ? $names$$3$$ : [$names$$3$$];
  $spf$array$each$$($names$$3$$, function($name$$67$$) {
    if ($name$$67$$) {
      var $url$$42$$ = $spf$net$script$url_$$[$name$$67$$] || $name$$67$$;
      $spf$array$isArray$$($url$$42$$) && ($url$$42$$ = $url$$42$$[0]);
      var $url$$42$$ = $spf$net$resource$canonicalize$$($spf$net$resource$Type$JS$$, $url$$42$$), $previous$$1$$ = $spf$net$resource$url$get$$($spf$net$resource$Type$JS$$, $name$$67$$);
      $previous$$1$$ && $url$$42$$ != $previous$$1$$ && $spf$net$script$unrequire$$($name$$67$$);
    }
  });
  $spf$net$script$ready$$($names$$3$$, $opt_fn$$4$$, $spf$net$script$require_$$);
}
function $spf$net$script$require_$$($names$$4$$) {
  $spf$array$each$$($names$$4$$, function($name$$68$$) {
    function $next$$3$$() {
      $spf$net$resource$load$$($url$$43$$, $name$$68$$, void 0);
    }
    var $deps$$ = $spf$net$script$deps_$$[$name$$68$$], $url$$43$$ = $spf$net$script$url_$$[$name$$68$$] || $name$$68$$;
    $spf$array$isArray$$($url$$43$$) && ($url$$43$$ = $url$$43$$[0]);
    $deps$$ ? $spf$net$script$require$$($deps$$, $next$$3$$) : $next$$3$$();
  });
}
function $spf$net$script$unrequire$$($names$$5$$) {
  $spf$debug$debug$$("script.unrequire", $names$$5$$);
  $names$$5$$ = $spf$array$isArray$$($names$$5$$) ? $names$$5$$ : [$names$$5$$];
  $spf$array$each$$($names$$5$$, function($name$$69$$) {
    var $descendants$$ = [], $dep$$;
    for ($dep$$ in $spf$net$script$deps_$$) {
      var $list$$ = $spf$net$script$deps_$$[$dep$$], $list$$ = $spf$array$isArray$$($list$$) ? $list$$ : [$list$$];
      $spf$array$each$$($list$$, function($l$$6$$) {
        $l$$6$$ == $name$$69$$ && $descendants$$.push($dep$$);
      });
    }
    $spf$array$each$$($descendants$$, function($descend$$) {
      $spf$net$script$unrequire$$($descend$$);
    });
    $spf$net$resource$unload$$($name$$69$$);
  });
}
var $spf$net$script$deps_$$ = {};
"js-d" in $spf$state$values_$$ || ($spf$state$values_$$["js-d"] = $spf$net$script$deps_$$);
var $spf$net$script$deps_$$ = $spf$state$values_$$["js-d"], $spf$net$script$url_$$ = {};
"js-u" in $spf$state$values_$$ || ($spf$state$values_$$["js-u"] = $spf$net$script$url_$$);
$spf$net$script$url_$$ = $spf$state$values_$$["js-u"];
var $spf$bootloader$api_$$ = {script:{load:function($url$$39$$, $name$$63$$, $opt_fn$$1$$) {
  $spf$net$resource$load$$($url$$39$$, $name$$63$$, $opt_fn$$1$$);
}, get:function($url$$40$$, $opt_fn$$2$$) {
  $spf$net$resource$create$$($spf$net$resource$Type$JS$$, $url$$40$$, $opt_fn$$2$$);
}, ready:$spf$net$script$ready$$, done:function($name$$66$$) {
  $spf$net$resource$url$set$$($spf$net$resource$Type$JS$$, $name$$66$$, "");
  $spf$net$resource$check$$($spf$net$resource$Type$JS$$);
}, require:$spf$net$script$require$$, declare:function($deps$$1$$, $opt_urls$$) {
  if ($deps$$1$$) {
    for (var $name$$71$$ in $deps$$1$$) {
      $spf$net$script$deps_$$[$name$$71$$] = $deps$$1$$[$name$$71$$];
    }
    if ($opt_urls$$) {
      for ($name$$71$$ in $opt_urls$$) {
        $spf$net$script$url_$$[$name$$71$$] = $opt_urls$$[$name$$71$$];
      }
    }
  }
}, path:function($paths$$2$$) {
  $spf$state$values_$$["rsrc-p-" + $spf$net$resource$Type$JS$$] = $paths$$2$$;
}}}, $api$$ = this.spf = this.spf || {}, $fn$$;
for ($fn$$ in $spf$bootloader$api_$$) {
  $api$$[$fn$$] = $spf$bootloader$api_$$[$fn$$];
}
;})();
