/* SPF 24 (v2.4.0) | (c) 2012-2016 Google Inc. | License: MIT */
(function(){function $spf$bind$$($fn$$, $self$$1$$, $var_args$$28$$) {
  var $args$$ = Array.prototype.slice.call(arguments, 2);
  return function() {
    var $newArgs$$ = $args$$.slice();
    $newArgs$$.push.apply($newArgs$$, arguments);
    return $fn$$.apply($self$$1$$, $newArgs$$);
  };
}
function $spf$execute$$($fn$$1$$, $var_args$$29$$) {
  if ($fn$$1$$) {
    var $args$$1$$ = Array.prototype.slice.call(arguments, 1);
    try {
      return $fn$$1$$.apply(null, $args$$1$$);
    } catch ($err$$) {
      return $err$$;
    }
  }
}
function $spf$dispatch$$($name$$47$$, $opt_detail$$) {
  if (document.createEvent) {
    var $evt$$21$$ = document.createEvent("CustomEvent");
    $evt$$21$$.initCustomEvent($name$$47$$, !0, !0, $opt_detail$$);
    return document.dispatchEvent($evt$$21$$);
  }
  return!0;
}
var $spf$now$$ = window.performance && window.performance.timing && window.performance.now ? function() {
  return window.performance.timing.navigationStart + window.performance.now();
} : function() {
  return(new Date).getTime();
};
function $spf$nullFunction$$() {
}
;function $spf$state$set$$($key$$16$$, $value$$52$$) {
  return $spf$state$values_$$[$key$$16$$] = $value$$52$$;
}
var $spf$state$values_$$ = window._spf_state || {};
window._spf_state = $spf$state$values_$$;
var $spf$config$defaults$$ = {"animation-class":"spf-animate", "animation-duration":425, "cache-lifetime":6E5, "cache-max":50, "cache-unified":!1, "link-class":"spf-link", "nolink-class":"spf-nolink", "navigate-limit":20, "navigate-lifetime":864E5, "reload-identifier":null, "request-timeout":0, "url-identifier":"?spf=__type__"}, $spf$config$values$$ = {};
"config" in $spf$state$values_$$ || $spf$state$set$$("config", $spf$config$values$$);
$spf$config$values$$ = $spf$state$values_$$.config;
function $spf$debug$debug$$($var_args$$30$$) {
  $spf$debug$isLevelEnabled$$($spf$debug$Level$DEBUG$$) && $spf$debug$log$$($spf$debug$Level$DEBUG$$, arguments);
}
function $spf$debug$info$$($var_args$$31$$) {
  $spf$debug$isLevelEnabled$$($spf$debug$Level$INFO$$) && $spf$debug$log$$($spf$debug$Level$INFO$$, arguments);
}
function $spf$debug$warn$$($var_args$$32$$) {
  $spf$debug$isLevelEnabled$$($spf$debug$Level$WARN$$) && $spf$debug$log$$($spf$debug$Level$WARN$$, arguments);
}
function $spf$debug$error$$($var_args$$33$$) {
  $spf$debug$isLevelEnabled$$($spf$debug$Level$ERROR$$) && $spf$debug$log$$($spf$debug$Level$ERROR$$, arguments);
}
function $spf$debug$log$$($method$$1$$, $args$$2$$) {
  if (window.console) {
    $args$$2$$ = Array.prototype.slice.call($args$$2$$);
    var $current$$ = $spf$now$$(), $overall$$ = $spf$debug$formatDuration$$($spf$debug$start_$$, $current$$);
    $spf$debug$split_$$ ? $args$$2$$.unshift($overall$$ + "/" + $spf$debug$formatDuration$$($spf$debug$split_$$, $current$$) + ":") : $args$$2$$.unshift($overall$$ + ":");
    $spf$debug$direct_$$ ? ($args$$2$$.unshift("[spf]"), window.console[$method$$1$$].apply(window.console, $args$$2$$)) : ($args$$2$$.unshift("[spf - " + $method$$1$$ + "]"), window.console.log($args$$2$$.join(" ")));
  }
}
function $spf$debug$formatDuration$$($start$$6$$, $end$$3$$) {
  var $dur$$ = ($end$$3$$ - $start$$6$$) / 1E3;
  $dur$$.toFixed && ($dur$$ = $dur$$.toFixed(3));
  return $dur$$ + "s";
}
function $spf$debug$isLevelEnabled$$($level$$7$$) {
  return $spf$debug$levels_$$[$level$$7$$] >= $spf$debug$levels_$$.debug;
}
var $spf$debug$start_$$ = $spf$now$$(), $spf$debug$split_$$ = 0, $spf$debug$direct_$$ = !(!window.console || !window.console.debug), $spf$debug$levels_$$ = {debug:1, info:2, warn:3, error:4}, $spf$debug$Level$DEBUG$$ = "debug", $spf$debug$Level$INFO$$ = "info", $spf$debug$Level$WARN$$ = "warn", $spf$debug$Level$ERROR$$ = "error";
function $spf$dom$query$$($selector$$1$$, $opt_root$$) {
  var $root$$2$$ = $opt_root$$ || document;
  return $root$$2$$.querySelectorAll ? $root$$2$$.querySelectorAll($selector$$1$$) : [];
}
function $spf$dom$getAncestor$$($element$$6$$, $matcher$$, $opt_parent$$) {
  for (;$element$$6$$;) {
    if ($matcher$$($element$$6$$)) {
      return $element$$6$$;
    }
    if ($opt_parent$$ && $element$$6$$ == $opt_parent$$) {
      break;
    }
    $element$$6$$ = $element$$6$$.parentNode;
  }
  return null;
}
function $spf$dom$createIframe$$($opt_id$$, $doc_opt_document$$, $opt_callback$$6$$) {
  $doc_opt_document$$ = $doc_opt_document$$ || document;
  var $iframeEl$$ = $doc_opt_document$$.createElement("iframe");
  $iframeEl$$.id = $opt_id$$ || "";
  $iframeEl$$.src = 'javascript:""';
  $iframeEl$$.style.display = "none";
  $opt_callback$$6$$ && ($iframeEl$$.onload = $spf$bind$$($opt_callback$$6$$, null, $iframeEl$$));
  $doc_opt_document$$.body.appendChild($iframeEl$$);
  return $iframeEl$$;
}
;function $spf$history$replace$$($opt_url$$4$$, $opt_state$$1$$, $opt_doCallback$$1$$) {
  var $state$$1$$ = null, $currentState$$ = window.history.state;
  if ($currentState$$) {
    var $state$$1$$ = {}, $key$$19$$;
    for ($key$$19$$ in $currentState$$) {
      $state$$1$$[$key$$19$$] = $currentState$$[$key$$19$$];
    }
  }
  if ($opt_state$$1$$) {
    for ($key$$19$$ in $state$$1$$ = $state$$1$$ || {}, $opt_state$$1$$) {
      $state$$1$$[$key$$19$$] = $opt_state$$1$$[$key$$19$$];
    }
  }
  $spf$debug$info$$("history.replace ", $opt_url$$4$$);
  $spf$history$push_$$(!0, $opt_url$$4$$, $state$$1$$, $opt_doCallback$$1$$);
}
function $spf$history$push_$$($pushState$$inline_20_replace$$, $opt_url$$5_url$$12$$, $opt_state$$2_state$$2$$, $callback$$32_opt_doCallback$$2$$) {
  if ($opt_url$$5_url$$12$$ || $opt_state$$2_state$$2$$) {
    $opt_url$$5_url$$12$$ = $opt_url$$5_url$$12$$ || window.location.href;
    $opt_state$$2_state$$2$$ = $opt_state$$2_state$$2$$ || {};
    var $timestamp$$ = $spf$now$$();
    $spf$state$set$$("history-timestamp", $timestamp$$);
    $opt_state$$2_state$$2$$["spf-timestamp"] = $timestamp$$;
    if ($pushState$$inline_20_replace$$) {
      $spf$history$doReplaceState_$$($opt_state$$2_state$$2$$, $opt_url$$5_url$$12$$), $spf$debug$debug$$("    replaceState:  ", "url=", $opt_url$$5_url$$12$$, "state=", $opt_state$$2_state$$2$$);
    } else {
      $pushState$$inline_20_replace$$ = $spf$history$getIframe$$().contentWindow.history.pushState;
      if ("function" == typeof $pushState$$inline_20_replace$$) {
        $pushState$$inline_20_replace$$.call(window.history, $opt_state$$2_state$$2$$, "", $opt_url$$5_url$$12$$);
      } else {
        throw Error("history.pushState is not a function.");
      }
      $spf$debug$debug$$("    pushState:  ", "url=", $opt_url$$5_url$$12$$, "state=", $opt_state$$2_state$$2$$);
    }
    $spf$state$set$$("history-url", $opt_url$$5_url$$12$$);
    $callback$$32_opt_doCallback$$2$$ && ($callback$$32_opt_doCallback$$2$$ = $spf$state$values_$$["history-callback"]) && $callback$$32_opt_doCallback$$2$$($opt_url$$5_url$$12$$, $opt_state$$2_state$$2$$);
  }
}
function $spf$history$pop_$$($evt$$22_state$$3$$) {
  var $url$$13$$ = window.location.href;
  $spf$debug$info$$("history.pop ", "url=", $url$$13$$, "evt=", $evt$$22_state$$3$$);
  if ($spf$state$values_$$["history-ignore-pop"]) {
    $spf$state$set$$("history-ignore-pop", !1);
  } else {
    if ($evt$$22_state$$3$$.state) {
      $evt$$22_state$$3$$ = $evt$$22_state$$3$$.state;
      var $callback$$33_timestamp$$1$$ = $evt$$22_state$$3$$["spf-timestamp"];
      $url$$13$$ == $spf$state$values_$$["history-url"] ? ($spf$state$set$$("history-timestamp", $callback$$33_timestamp$$1$$), $spf$history$doReplaceState_$$($evt$$22_state$$3$$, $url$$13$$), $spf$debug$debug$$("    replaceState:  ", "url=", $url$$13$$, "state=", $evt$$22_state$$3$$)) : ($evt$$22_state$$3$$["spf-back"] = $callback$$33_timestamp$$1$$ < parseInt($spf$state$values_$$["history-timestamp"], 10), $evt$$22_state$$3$$["spf-current"] = $spf$state$values_$$["history-url"], $spf$state$set$$("history-timestamp", 
      $callback$$33_timestamp$$1$$), $spf$state$set$$("history-url", $url$$13$$), ($callback$$33_timestamp$$1$$ = $spf$state$values_$$["history-callback"]) && $callback$$33_timestamp$$1$$($url$$13$$, $evt$$22_state$$3$$));
    }
  }
}
function $spf$history$doReplaceState_$$($data$$27$$, $opt_url$$7$$) {
  var $replaceState$$ = $spf$history$getIframe$$().contentWindow.history.replaceState;
  if ("function" == typeof $replaceState$$) {
    $replaceState$$.call(window.history, $data$$27$$, "", $opt_url$$7$$);
  } else {
    throw Error("history.replaceState is not a function");
  }
}
function $spf$history$getIframe$$() {
  var $frame$$ = document.getElementById("history-iframe");
  $frame$$ || ($frame$$ = $spf$dom$createIframe$$("history-iframe"));
  return $frame$$;
}
;function $spf$array$each$$($arr$$8$$, $fn$$2$$) {
  if ($arr$$8$$.forEach) {
    $arr$$8$$.forEach($fn$$2$$, void 0);
  } else {
    for (var $i$$3$$ = 0, $l$$ = $arr$$8$$.length;$i$$3$$ < $l$$;$i$$3$$++) {
      $i$$3$$ in $arr$$8$$ && $fn$$2$$.call(void 0, $arr$$8$$[$i$$3$$], $i$$3$$, $arr$$8$$);
    }
  }
}
function $spf$array$every$$($arr$$9$$, $fn$$3$$) {
  if ($arr$$9$$.every) {
    return $arr$$9$$.every($fn$$3$$, void 0);
  }
  for (var $i$$4$$ = 0, $l$$1$$ = $arr$$9$$.length;$i$$4$$ < $l$$1$$;$i$$4$$++) {
    if ($i$$4$$ in $arr$$9$$ && !$fn$$3$$.call(void 0, $arr$$9$$[$i$$4$$], $i$$4$$, $arr$$9$$)) {
      return!1;
    }
  }
  return!0;
}
function $spf$array$some$$($arr$$10$$, $fn$$4$$) {
  if ($arr$$10$$.some) {
    return $arr$$10$$.some($fn$$4$$, void 0);
  }
  for (var $i$$5$$ = 0, $l$$2$$ = $arr$$10$$.length;$i$$5$$ < $l$$2$$;$i$$5$$++) {
    if ($i$$5$$ in $arr$$10$$ && $fn$$4$$.call(void 0, $arr$$10$$[$i$$5$$], $i$$5$$, $arr$$10$$)) {
      return!0;
    }
  }
  return!1;
}
function $spf$array$filter$$($arr$$11$$, $fn$$5$$) {
  if ($arr$$11$$.filter) {
    return $arr$$11$$.filter($fn$$5$$, void 0);
  }
  var $res$$ = [];
  $spf$array$each$$($arr$$11$$, function($a$$, $i$$6$$, $arr$$12$$) {
    $fn$$5$$.call(void 0, $a$$, $i$$6$$, $arr$$12$$) && $res$$.push($a$$);
  });
  return $res$$;
}
function $spf$array$map$$($arr$$14$$, $fn$$6$$) {
  if ($arr$$14$$.map) {
    return $arr$$14$$.map($fn$$6$$, void 0);
  }
  var $res$$1$$ = [];
  $res$$1$$.length = $arr$$14$$.length;
  $spf$array$each$$($arr$$14$$, function($a$$1$$, $i$$8$$, $arr$$15$$) {
    $res$$1$$[$i$$8$$] = $fn$$6$$.call(void 0, $a$$1$$, $i$$8$$, $arr$$15$$);
  });
  return $res$$1$$;
}
function $spf$array$toArray$$($val$$1$$) {
  return "[object Array]" == Object.prototype.toString.call($val$$1$$) ? $val$$1$$ : [$val$$1$$];
}
;function $spf$cache$remove$$($key$$22$$) {
  var $storage$$2$$ = $spf$cache$storage_$$();
  $key$$22$$ in $storage$$2$$ && delete $storage$$2$$[$key$$22$$];
}
function $spf$cache$collect$$() {
  var $storage$$3_storage$$inline_22$$ = $spf$cache$storage_$$(), $extra$$inline_24_key$$23_max$$inline_23$$;
  for ($extra$$inline_24_key$$23_max$$inline_23$$ in $storage$$3_storage$$inline_22$$) {
    $spf$cache$valid_$$($storage$$3_storage$$inline_22$$[$extra$$inline_24_key$$23_max$$inline_23$$]) || delete $storage$$3_storage$$inline_22$$[$extra$$inline_24_key$$23_max$$inline_23$$];
  }
  $storage$$3_storage$$inline_22$$ = $spf$cache$storage_$$();
  $extra$$inline_24_key$$23_max$$inline_23$$ = parseInt($spf$config$values$$["cache-max"], 10);
  $extra$$inline_24_key$$23_max$$inline_23$$ = isNaN($extra$$inline_24_key$$23_max$$inline_23$$) ? Infinity : $extra$$inline_24_key$$23_max$$inline_23$$;
  $extra$$inline_24_key$$23_max$$inline_23$$ = Object.keys($storage$$3_storage$$inline_22$$).length - $extra$$inline_24_key$$23_max$$inline_23$$;
  if (!(0 >= $extra$$inline_24_key$$23_max$$inline_23$$)) {
    for (var $i$$inline_25$$ = 0;$i$$inline_25$$ < $extra$$inline_24_key$$23_max$$inline_23$$;$i$$inline_25$$++) {
      var $JSCompiler_object_inline_count_0$$inline_26$$ = Infinity, $JSCompiler_object_inline_key_1$$inline_27$$, $key$$inline_28$$;
      for ($key$$inline_28$$ in $storage$$3_storage$$inline_22$$) {
        $storage$$3_storage$$inline_22$$[$key$$inline_28$$].count < $JSCompiler_object_inline_count_0$$inline_26$$ && ($JSCompiler_object_inline_key_1$$inline_27$$ = $key$$inline_28$$, $JSCompiler_object_inline_count_0$$inline_26$$ = $storage$$3_storage$$inline_22$$[$key$$inline_28$$].count);
      }
      delete $storage$$3_storage$$inline_22$$[$JSCompiler_object_inline_key_1$$inline_27$$];
    }
  }
}
function $spf$cache$valid_$$($timestamp$$2_unit$$2$$) {
  if (!($timestamp$$2_unit$$2$$ && "data" in $timestamp$$2_unit$$2$$)) {
    return!1;
  }
  var $lifetime$$1$$ = $timestamp$$2_unit$$2$$.life, $lifetime$$1$$ = isNaN($lifetime$$1$$) ? Infinity : $lifetime$$1$$;
  $timestamp$$2_unit$$2$$ = $timestamp$$2_unit$$2$$.time;
  return $spf$now$$() - $timestamp$$2_unit$$2$$ < $lifetime$$1$$;
}
function $spf$cache$updateCount_$$($unit$$4$$) {
  var $count$$8$$ = parseInt($spf$state$values_$$["cache-counter"], 10) || 0;
  $count$$8$$++;
  $spf$state$set$$("cache-counter", $count$$8$$);
  $unit$$4$$.count = $count$$8$$;
}
function $spf$cache$storage_$$($opt_storage$$) {
  return!$opt_storage$$ && "cache-storage" in $spf$state$values_$$ ? $spf$state$values_$$["cache-storage"] : $spf$state$set$$("cache-storage", $opt_storage$$ || {});
}
;function $spf$dom$classlist$get$$($node$$2$$) {
  return $node$$2$$.classList ? $node$$2$$.classList : $node$$2$$.className && $node$$2$$.className.match(/\S+/g) || [];
}
function $spf$dom$classlist$contains$$($node$$3$$, $cls$$) {
  if ($cls$$) {
    if ($node$$3$$.classList) {
      return $node$$3$$.classList.contains($cls$$);
    }
    var $classes$$ = $spf$dom$classlist$get$$($node$$3$$);
    return $spf$array$some$$($classes$$, function($item$$) {
      return $item$$ == $cls$$;
    });
  }
  return!1;
}
function $spf$dom$classlist$add$$($node$$4$$, $cls$$1$$) {
  $cls$$1$$ && ($node$$4$$.classList ? $node$$4$$.classList.add($cls$$1$$) : $spf$dom$classlist$contains$$($node$$4$$, $cls$$1$$) || ($node$$4$$.className += " " + $cls$$1$$));
}
function $spf$dom$classlist$remove$$($node$$5$$, $cls$$2$$) {
  if ($cls$$2$$) {
    if ($node$$5$$.classList) {
      $node$$5$$.classList.remove($cls$$2$$);
    } else {
      var $classes$$1_newClasses$$ = $spf$dom$classlist$get$$($node$$5$$), $classes$$1_newClasses$$ = $spf$array$filter$$($classes$$1_newClasses$$, function($item$$1$$) {
        return $item$$1$$ != $cls$$2$$;
      });
      $node$$5$$.className = $classes$$1_newClasses$$.join(" ");
    }
  }
}
;function $spf$dom$dataset$set$$($val$$3$$) {
  var $node$$7$$ = document.body;
  $node$$7$$.dataset ? $node$$7$$.dataset.spfName = $val$$3$$ : $node$$7$$.setAttribute("data-" + "spfName".replace(/([A-Z])/g, "-$1").toLowerCase(), $val$$3$$);
}
;function $spf$string$endsWith$$($str$$9$$, $suffix$$) {
  var $l$$3$$ = $str$$9$$.length - $suffix$$.length;
  return 0 <= $l$$3$$ && $str$$9$$.indexOf($suffix$$, $l$$3$$) == $l$$3$$;
}
function $spf$string$isString$$($val$$4$$) {
  return "[object String]" == Object.prototype.toString.call($val$$4$$);
}
var $spf$string$trim$$ = String.prototype.trim ? function($str$$10$$) {
  return $str$$10$$.trim();
} : function($str$$11$$) {
  return $str$$11$$.replace(/^\s+|\s+$/g, "");
};
function $spf$string$partition$$($str$$12$$, $sep$$) {
  var $arr$$16$$ = $str$$12$$.split($sep$$), $nosep$$ = 1 == $arr$$16$$.length;
  return[$arr$$16$$[0], $nosep$$ ? "" : $sep$$, $nosep$$ ? "" : $arr$$16$$.slice(1).join($sep$$)];
}
;function $spf$async$handleMessage_$$($evt$$23$$) {
  $evt$$23$$.data && $spf$string$isString$$($evt$$23$$.data) && 0 == $evt$$23$$.data.lastIndexOf($spf$async$PREFIX_$$, 0) && $spf$async$run_$$($evt$$23$$.data.substring($spf$async$PREFIX_$$.length));
}
function $spf$async$run_$$($uid$$3$$) {
  var $fn$$8$$ = $spf$async$defers_$$[$uid$$3$$];
  $fn$$8$$ && (delete $spf$async$defers_$$[$uid$$3$$], $fn$$8$$());
}
function $spf$async$addListener_$$($fn$$9$$) {
  window.addEventListener ? window.addEventListener("message", $fn$$9$$, !1) : window.attachEvent && window.attachEvent("onmessage", $fn$$9$$);
}
function $spf$async$removeListener_$$($fn$$10$$) {
  window.removeEventListener ? window.removeEventListener("message", $fn$$10$$, !1) : window.detachEvent && window.detachEvent("onmessage", $fn$$10$$);
}
var $spf$async$POSTMESSAGE_SUPPORTED_$$ = function() {
  function $listener$$42$$() {
    $supported$$ = !1;
  }
  if (!window.postMessage) {
    return!1;
  }
  var $supported$$ = !0;
  $spf$async$addListener_$$($listener$$42$$);
  window.postMessage("", "*");
  $spf$async$removeListener_$$($listener$$42$$);
  return $supported$$;
}(), $spf$async$PREFIX_$$ = "spf:", $spf$async$defers_$$ = {};
"async-defers" in $spf$state$values_$$ || $spf$state$set$$("async-defers", $spf$async$defers_$$);
$spf$async$defers_$$ = $spf$state$values_$$["async-defers"];
$spf$async$POSTMESSAGE_SUPPORTED_$$ && ("async-listener" in $spf$state$values_$$ && $spf$async$removeListener_$$($spf$state$values_$$["async-listener"]), $spf$async$addListener_$$($spf$async$handleMessage_$$), $spf$state$set$$("async-listener", $spf$async$handleMessage_$$));
function $spf$pubsub$subscribe$$($topic$$, $fn$$11$$) {
  $topic$$ && $fn$$11$$ && ($topic$$ in $spf$pubsub$subscriptions$$ || ($spf$pubsub$subscriptions$$[$topic$$] = []), $spf$pubsub$subscriptions$$[$topic$$].push($fn$$11$$));
}
function $spf$pubsub$unsubscribe$$($topic$$1$$, $fn$$12$$) {
  $topic$$1$$ in $spf$pubsub$subscriptions$$ && $fn$$12$$ && $spf$array$every$$($spf$pubsub$subscriptions$$[$topic$$1$$], function($subFn$$, $i$$11$$, $arr$$17$$) {
    return $subFn$$ == $fn$$12$$ ? ($arr$$17$$[$i$$11$$] = null, !1) : !0;
  });
}
function $spf$pubsub$publish_$$($topic$$4$$) {
  $topic$$4$$ in $spf$pubsub$subscriptions$$ && $spf$array$each$$($spf$pubsub$subscriptions$$[$topic$$4$$], function($subFn$$1$$, $i$$12$$, $arr$$18$$) {
    $arr$$18$$[$i$$12$$] = null;
    $subFn$$1$$ && $subFn$$1$$();
  });
}
var $spf$pubsub$subscriptions$$ = {};
"ps-s" in $spf$state$values_$$ || $spf$state$set$$("ps-s", $spf$pubsub$subscriptions$$);
$spf$pubsub$subscriptions$$ = $spf$state$values_$$["ps-s"];
function $spf$tasks$add$$($key$$28$$, $fn$$13$$, $opt_delay$$) {
  var $queue$$ = $spf$tasks$queues_$$[$key$$28$$];
  return $key$$28$$ && $fn$$13$$ ? ($queue$$ || ($queue$$ = $spf$tasks$queues_$$[$key$$28$$] = {items:[], $scheduledKey$:0, $timeoutKey$:0, $semaphore$:1}), $queue$$.items.push({$fn$:$fn$$13$$, $delay$:$opt_delay$$ || 0})) : $queue$$ && $queue$$.items.length || 0;
}
function $spf$tasks$run$$($key$$29$$, $opt_sync$$) {
  var $queue$$1$$ = $spf$tasks$queues_$$[$key$$29$$];
  if ($queue$$1$$) {
    var $active$$ = !!$queue$$1$$.$scheduledKey$ || !!$queue$$1$$.$timeoutKey$;
    0 < $queue$$1$$.$semaphore$ && ($opt_sync$$ || !$active$$) && $spf$tasks$do_$$($key$$29$$, $opt_sync$$);
  }
}
function $spf$tasks$suspend$$($key$$30_queue$$2$$) {
  ($key$$30_queue$$2$$ = $spf$tasks$queues_$$[$key$$30_queue$$2$$]) && $key$$30_queue$$2$$.$semaphore$--;
}
function $spf$tasks$resume$$($key$$31$$, $opt_sync$$1$$) {
  var $queue$$3$$ = $spf$tasks$queues_$$[$key$$31$$];
  $queue$$3$$ && ($queue$$3$$.$semaphore$++, $spf$tasks$run$$($key$$31$$, $opt_sync$$1$$));
}
function $spf$tasks$cancel$$($key$$32$$) {
  var $queue$$4$$ = $spf$tasks$queues_$$[$key$$32$$];
  $queue$$4$$ && ($spf$tasks$clearAsyncTasks_$$($queue$$4$$), delete $spf$tasks$queues_$$[$key$$32$$]);
}
function $spf$tasks$do_$$($key$$34$$, $opt_sync$$2$$) {
  var $queue$$5$$ = $spf$tasks$queues_$$[$key$$34$$];
  if ($queue$$5$$ && ($spf$tasks$clearAsyncTasks_$$($queue$$5$$), 0 < $queue$$5$$.$semaphore$ && $queue$$5$$.items.length)) {
    var $task$$1$$ = $queue$$5$$.items[0];
    if ($task$$1$$) {
      var $step$$ = $spf$bind$$(function($nextFn$$, $taskFn$$) {
        $taskFn$$();
        $nextFn$$();
      }, null, $spf$bind$$($spf$tasks$do_$$, null, $key$$34$$, $opt_sync$$2$$));
      $opt_sync$$2$$ ? ($queue$$5$$.items.shift(), $step$$($task$$1$$.$fn$)) : $spf$tasks$scheduleTask_$$($queue$$5$$, $task$$1$$, $step$$);
    }
  }
}
function $spf$tasks$scheduleTask_$$($queue$$6$$, $addTask_scheduler_task$$2$$, $fn$$14_step$$1$$) {
  $addTask_scheduler_task$$2$$.$delay$ ? ($fn$$14_step$$1$$ = $spf$bind$$($fn$$14_step$$1$$, null, $spf$nullFunction$$), $queue$$6$$.$timeoutKey$ = setTimeout($fn$$14_step$$1$$, $addTask_scheduler_task$$2$$.$delay$), $addTask_scheduler_task$$2$$.$delay$ = 0) : ($queue$$6$$.items.shift(), $fn$$14_step$$1$$ = $spf$bind$$($fn$$14_step$$1$$, null, $addTask_scheduler_task$$2$$.$fn$), ($addTask_scheduler_task$$2$$ = ($addTask_scheduler_task$$2$$ = $spf$config$values$$["advanced-task-scheduler"]) && $addTask_scheduler_task$$2$$.addTask) ? 
  $queue$$6$$.$scheduledKey$ = $addTask_scheduler_task$$2$$($fn$$14_step$$1$$) : $queue$$6$$.$timeoutKey$ = setTimeout($fn$$14_step$$1$$, 0));
}
function $spf$tasks$clearAsyncTasks_$$($queue$$7$$) {
  if ($queue$$7$$.$scheduledKey$) {
    var $cancelTask_scheduler$$1$$ = $spf$config$values$$["advanced-task-scheduler"];
    ($cancelTask_scheduler$$1$$ = $cancelTask_scheduler$$1$$ && $cancelTask_scheduler$$1$$.cancelTask) && $cancelTask_scheduler$$1$$($queue$$7$$.$scheduledKey$);
    $queue$$7$$.$scheduledKey$ = 0;
  }
  $queue$$7$$.$timeoutKey$ && (clearTimeout($queue$$7$$.$timeoutKey$), $queue$$7$$.$timeoutKey$ = 0);
}
var $spf$tasks$queues_$$ = {};
function $spf$url$utils$$($url$$14_utils$$) {
  var $aEl$$ = document.createElement("a");
  $aEl$$.href = $url$$14_utils$$;
  $aEl$$.href = $aEl$$.href;
  $url$$14_utils$$ = {href:$aEl$$.href, protocol:$aEl$$.protocol, host:$aEl$$.host, hostname:$aEl$$.hostname, port:$aEl$$.port, pathname:$aEl$$.pathname, search:$aEl$$.search, hash:$aEl$$.hash, $username$:$aEl$$.$username$, $password$:$aEl$$.$password$};
  $url$$14_utils$$.origin = $url$$14_utils$$.protocol + "//" + $url$$14_utils$$.host;
  $url$$14_utils$$.pathname && "/" == $url$$14_utils$$.pathname[0] || ($url$$14_utils$$.pathname = "/" + $url$$14_utils$$.pathname);
  return $url$$14_utils$$;
}
function $spf$url$absolute$$($relative$$, $opt_keepHash$$) {
  var $utils$$1$$ = $spf$url$utils$$($relative$$);
  return $opt_keepHash$$ ? $utils$$1$$.href : $spf$string$partition$$($utils$$1$$.href, "#")[0];
}
function $spf$url$removeParameters$$($url$$19$$, $parameters$$1$$) {
  var $result$$2$$ = $spf$string$partition$$($url$$19$$, "#");
  $url$$19$$ = $result$$2$$[0];
  $spf$array$each$$($parameters$$1$$, function($param$$3$$) {
    $url$$19$$ = $url$$19$$.replace(new RegExp("([?&])" + $param$$3$$ + "(?:=[^&]*)?(?:(?=[&])|$)", "g"), function($_$$, $delim$$1$$) {
      return "?" == $delim$$1$$ ? $delim$$1$$ : "";
    });
  });
  $spf$string$endsWith$$($url$$19$$, "?") && ($url$$19$$ = $url$$19$$.slice(0, -1));
  return $url$$19$$ + $result$$2$$[1] + $result$$2$$[2];
}
function $spf$url$appendPersistentParameters$$($url$$20$$) {
  var $parameterConfig$$ = $spf$config$values$$["advanced-persistent-parameters"] || "", $result$$3$$ = $spf$string$partition$$($url$$20$$, "#");
  $url$$20$$ = $result$$3$$[0];
  var $delim$$2$$ = -1 != $url$$20$$.indexOf("?") ? "&" : "?";
  return $url$$20$$ + ($parameterConfig$$ ? $delim$$2$$ + $parameterConfig$$ : "") + $result$$3$$[1] + $result$$3$$[2];
}
;function $spf$net$resource$load$$($el_type$$78$$, $url$$23$$, $name$$52$$, $check_opt_fn$$) {
  $spf$debug$debug$$("resource.load", $el_type$$78$$, $url$$23$$, $name$$52$$);
  var $isJS_key$$inline_32_prevName$$ = $el_type$$78$$ == $spf$net$resource$Type$JS$$;
  $url$$23$$ = $spf$net$resource$canonicalize$$($el_type$$78$$, $url$$23$$);
  var $pseudonym$$ = $name$$52$$ || "^" + $url$$23$$, $topic$$6$$ = $spf$net$resource$key$$($el_type$$78$$, $pseudonym$$), $prevUrl$$;
  $name$$52$$ && ($prevUrl$$ = $spf$net$resource$url$get$$($el_type$$78$$, $name$$52$$)) && $url$$23$$ != $prevUrl$$ && ($spf$dispatch$$($isJS_key$$inline_32_prevName$$ ? "spfjsbeforeunload" : "spfcssbeforeunload", {name:$name$$52$$, url:$prevUrl$$}), $spf$net$resource$unloadPrepare_$$($el_type$$78$$, $name$$52$$, $prevUrl$$), $spf$pubsub$subscribe$$($topic$$6$$, $spf$bind$$($spf$net$resource$unloadComplete_$$, null, $el_type$$78$$, $name$$52$$, $prevUrl$$)));
  $isJS_key$$inline_32_prevName$$ = $spf$net$resource$key$$($el_type$$78$$, $url$$23$$);
  if (($isJS_key$$inline_32_prevName$$ = $spf$net$resource$name_$$[$isJS_key$$inline_32_prevName$$]) && $pseudonym$$ != $isJS_key$$inline_32_prevName$$) {
    var $key$$inline_36_key$$inline_40_key$$inline_48_oldTopic$$inline_42$$ = $spf$net$resource$key$$($el_type$$78$$, $isJS_key$$inline_32_prevName$$);
    delete $spf$net$resource$url_$$[$key$$inline_36_key$$inline_40_key$$inline_48_oldTopic$$inline_42$$];
    $key$$inline_36_key$$inline_40_key$$inline_48_oldTopic$$inline_42$$ = $spf$net$resource$key$$($el_type$$78$$, $url$$23$$);
    delete $spf$net$resource$name_$$[$key$$inline_36_key$$inline_40_key$$inline_48_oldTopic$$inline_42$$];
    ($key$$inline_36_key$$inline_40_key$$inline_48_oldTopic$$inline_42$$ = $spf$net$resource$key$$($el_type$$78$$, $isJS_key$$inline_32_prevName$$)) && $topic$$6$$ && $key$$inline_36_key$$inline_40_key$$inline_48_oldTopic$$inline_42$$ in $spf$pubsub$subscriptions$$ && ($spf$pubsub$subscriptions$$[$topic$$6$$] = ($spf$pubsub$subscriptions$$[$topic$$6$$] || []).concat($spf$pubsub$subscriptions$$[$key$$inline_36_key$$inline_40_key$$inline_48_oldTopic$$inline_42$$]), delete $spf$pubsub$subscriptions$$[$key$$inline_36_key$$inline_40_key$$inline_48_oldTopic$$inline_42$$]);
  }
  $key$$inline_36_key$$inline_40_key$$inline_48_oldTopic$$inline_42$$ = $spf$net$resource$key$$($el_type$$78$$, $url$$23$$);
  $spf$net$resource$name_$$[$key$$inline_36_key$$inline_40_key$$inline_48_oldTopic$$inline_42$$] = $pseudonym$$;
  $spf$net$resource$url$set$$($el_type$$78$$, $pseudonym$$, $url$$23$$);
  $spf$debug$debug$$("  subscribing callback", $topic$$6$$);
  $spf$pubsub$subscribe$$($topic$$6$$, $check_opt_fn$$);
  $check_opt_fn$$ = $spf$bind$$($spf$net$resource$check$$, null, $el_type$$78$$);
  $spf$net$resource$status$get$$($el_type$$78$$, $url$$23$$) ? ($isJS_key$$inline_32_prevName$$ && $pseudonym$$ != $isJS_key$$inline_32_prevName$$ && ($el_type$$78$$ = $spf$net$resource$find$$($el_type$$78$$, $url$$23$$)) && $el_type$$78$$.setAttribute("name", $name$$52$$ || ""), $check_opt_fn$$()) : ($el_type$$78$$ = $spf$net$resource$create$$($el_type$$78$$, $url$$23$$, $check_opt_fn$$, void 0, void 0, $prevUrl$$)) && $name$$52$$ && $el_type$$78$$.setAttribute("name", $name$$52$$);
}
function $spf$net$resource$unload$$($type$$79$$, $name$$53$$) {
  $spf$debug$warn$$("resource.unload", $type$$79$$, $name$$53$$);
  var $url$$24$$ = $spf$net$resource$url$get$$($type$$79$$, $name$$53$$);
  $spf$net$resource$unloadPrepare_$$($type$$79$$, $name$$53$$, $url$$24$$);
  $spf$net$resource$unloadComplete_$$($type$$79$$, $name$$53$$, $url$$24$$);
}
function $spf$net$resource$unloadPrepare_$$($topic$$7_type$$80$$, $name$$54$$, $key$$inline_56_url$$25$$) {
  $spf$debug$debug$$("  > resource.unloadPrepare_", $topic$$7_type$$80$$, $key$$inline_56_url$$25$$);
  var $key$$inline_52$$ = $spf$net$resource$key$$($topic$$7_type$$80$$, $name$$54$$);
  delete $spf$net$resource$url_$$[$key$$inline_52$$];
  $key$$inline_56_url$$25$$ && ($key$$inline_56_url$$25$$ = $spf$net$resource$key$$($topic$$7_type$$80$$, $key$$inline_56_url$$25$$), delete $spf$net$resource$name_$$[$key$$inline_56_url$$25$$]);
  $topic$$7_type$$80$$ = $spf$net$resource$key$$($topic$$7_type$$80$$, $name$$54$$);
  $spf$debug$debug$$("  clearing callbacks for", $topic$$7_type$$80$$);
  delete $spf$pubsub$subscriptions$$[$topic$$7_type$$80$$];
}
function $spf$net$resource$unloadComplete_$$($type$$81$$, $name$$55$$, $url$$26$$) {
  var $isJS$$1$$ = $type$$81$$ == $spf$net$resource$Type$JS$$;
  $url$$26$$ && ($spf$debug$debug$$("  > resource.unloadComplete_", $type$$81$$, $url$$26$$), $spf$dispatch$$($isJS$$1$$ ? "spfjsunload" : "spfcssunload", {name:$name$$55$$, url:$url$$26$$}), $spf$net$resource$destroy$$($type$$81$$, $url$$26$$));
}
function $spf$net$resource$check$$($type$$82$$) {
  $spf$debug$debug$$("resource.check", $type$$82$$);
  var $prefix$$4$$ = $spf$net$resource$key$$($type$$82$$, ""), $topic$$8$$;
  for ($topic$$8$$ in $spf$pubsub$subscriptions$$) {
    if (0 == $topic$$8$$.indexOf($prefix$$4$$)) {
      var $names$$ = $topic$$8$$.substring($prefix$$4$$.length).split("|"), $ready$$ = $spf$array$every$$($names$$, $spf$bind$$($spf$net$resource$url$loaded$$, null, $type$$82$$));
      $spf$debug$debug$$(" ", $topic$$8$$, "->", $names$$, "=", $ready$$);
      $ready$$ && ($spf$debug$debug$$("  publishing", $topic$$8$$), $spf$pubsub$publish_$$($topic$$8$$));
    }
  }
}
function $spf$net$resource$create$$($type$$83$$, $url$$27$$, $opt_callback$$7$$, $doc$$1_opt_document$$1_targetEl$$, $opt_statusGroup$$, $opt_prevUrl_prevEl$$) {
  function $next$$1$$() {
    $spf$debug$debug$$("resource.create", $type$$83$$, $url$$27$$, "done");
    $spf$net$resource$status$get$$($type$$83$$, $url$$27$$, $opt_statusGroup$$) && ($spf$debug$debug$$("resource.create", $type$$83$$, $url$$27$$, "loaded"), $spf$net$resource$status$set$$($spf$net$resource$State$LOADED$$, $type$$83$$, $url$$27$$, $opt_statusGroup$$));
    $opt_callback$$7$$ && setTimeout($opt_callback$$7$$, 0);
    return null;
  }
  $spf$debug$debug$$("resource.create", $type$$83$$, $url$$27$$, "loading");
  var $isJS$$2$$ = $type$$83$$ == $spf$net$resource$Type$JS$$;
  $url$$27$$ = $spf$net$resource$canonicalize$$($type$$83$$, $url$$27$$);
  $spf$net$resource$status$set$$($spf$net$resource$State$LOADING$$, $type$$83$$, $url$$27$$, $opt_statusGroup$$);
  $doc$$1_opt_document$$1_targetEl$$ = $doc$$1_opt_document$$1_targetEl$$ || document;
  var $el$$1$$ = $doc$$1_opt_document$$1_targetEl$$.createElement($isJS$$2$$ ? "script" : "link");
  if (!$url$$27$$) {
    return $next$$1$$();
  }
  var $label$$4$$ = $spf$net$resource$label$$($url$$27$$);
  $el$$1$$.className = $spf$net$resource$key$$($type$$83$$, $label$$4$$);
  "onload" in $el$$1$$ ? $el$$1$$.onerror = $el$$1$$.onload = $next$$1$$ : $el$$1$$.onreadystatechange = function $$el$$1$$$onreadystatechange$() {
    /^c|loade/.test($el$$1$$.readyState) && $next$$1$$();
  };
  $doc$$1_opt_document$$1_targetEl$$ = $doc$$1_opt_document$$1_targetEl$$.getElementsByTagName("head")[0] || $doc$$1_opt_document$$1_targetEl$$.body;
  $isJS$$2$$ ? ($el$$1$$.async = !0, $el$$1$$.src = $url$$27$$, $doc$$1_opt_document$$1_targetEl$$.insertBefore($el$$1$$, $doc$$1_opt_document$$1_targetEl$$.firstChild)) : ($el$$1$$.rel = "stylesheet", $el$$1$$.href = $url$$27$$, ($opt_prevUrl_prevEl$$ = $opt_prevUrl_prevEl$$ ? $spf$net$resource$find$$($type$$83$$, $opt_prevUrl_prevEl$$, $doc$$1_opt_document$$1_targetEl$$) : null) ? $doc$$1_opt_document$$1_targetEl$$.insertBefore($el$$1$$, $opt_prevUrl_prevEl$$) : $doc$$1_opt_document$$1_targetEl$$.appendChild($el$$1$$));
  return $el$$1$$;
}
function $spf$net$resource$destroy$$($type$$84$$, $url$$28$$) {
  $url$$28$$ = $spf$net$resource$canonicalize$$($type$$84$$, $url$$28$$);
  var $el$$2_key$$inline_62$$ = $spf$net$resource$find$$($type$$84$$, $url$$28$$, void 0);
  $el$$2_key$$inline_62$$ && $el$$2_key$$inline_62$$.parentNode && $el$$2_key$$inline_62$$.parentNode.removeChild($el$$2_key$$inline_62$$);
  $el$$2_key$$inline_62$$ = $spf$net$resource$key$$($type$$84$$, $url$$28$$);
  delete $spf$net$resource$status_$$[$el$$2_key$$inline_62$$];
}
function $spf$net$resource$find$$($selector$$2_type$$85$$, $label$$5_url$$29$$, $opt_root$$1$$) {
  $label$$5_url$$29$$ = $spf$net$resource$label$$($label$$5_url$$29$$);
  $selector$$2_type$$85$$ = "." + $spf$net$resource$key$$($selector$$2_type$$85$$, $label$$5_url$$29$$);
  return $spf$dom$query$$($selector$$2_type$$85$$, $opt_root$$1$$)[0];
}
function $spf$net$resource$discover$$($type$$86$$) {
  $spf$debug$debug$$("resource.discover", $type$$86$$);
  var $isJS$$3$$ = $type$$86$$ == $spf$net$resource$Type$JS$$, $els$$1$$ = [];
  $spf$array$each$$($spf$dom$query$$($isJS$$3$$ ? "script[src]" : 'link[rel~="stylesheet"]'), function($el$$3$$) {
    var $url$$30$$ = $isJS$$3$$ ? $el$$3$$.src : $el$$3$$.href, $url$$30$$ = $spf$net$resource$canonicalize$$($type$$86$$, $url$$30$$);
    if (!$spf$net$resource$status$get$$($type$$86$$, $url$$30$$)) {
      $spf$net$resource$status$set$$($spf$net$resource$State$LOADED$$, $type$$86$$, $url$$30$$);
      var $cls$$4_label$$6$$ = $spf$net$resource$label$$($url$$30$$), $cls$$4_label$$6$$ = $spf$net$resource$key$$($type$$86$$, $cls$$4_label$$6$$);
      $spf$dom$classlist$add$$($el$$3$$, $cls$$4_label$$6$$);
      var $name$$56$$ = $el$$3$$.getAttribute("name");
      if ($name$$56$$) {
        var $key$$inline_67$$ = $spf$net$resource$key$$($type$$86$$, $url$$30$$);
        $spf$net$resource$name_$$[$key$$inline_67$$] = $name$$56$$;
        $spf$net$resource$url$set$$($type$$86$$, $name$$56$$, $url$$30$$);
      }
      $els$$1$$.push($el$$3$$);
      $spf$debug$debug$$("  found", $url$$30$$, $cls$$4_label$$6$$, $name$$56$$);
    }
  });
}
function $spf$net$resource$prefetch$$($next$$2_type$$87$$, $url$$31$$, $opt_force$$1$$) {
  if ($url$$31$$ && ($url$$31$$ = $spf$net$resource$canonicalize$$($next$$2_type$$87$$, $url$$31$$), $opt_force$$1$$ || !$spf$net$resource$status$get$$($next$$2_type$$87$$, $url$$31$$))) {
    if ($opt_force$$1$$ && $next$$2_type$$87$$ == $spf$net$resource$Type$IMG$$) {
      $spf$net$resource$preconnect_$$($url$$31$$);
    } else {
      var $el$$4_label$$7$$ = $spf$net$resource$label$$($url$$31$$), $id$$5$$ = $spf$net$resource$key$$($next$$2_type$$87$$, $el$$4_label$$7$$), $key$$36$$ = $spf$net$resource$key$$($next$$2_type$$87$$, "prefetch"), $el$$4_label$$7$$ = document.getElementById($key$$36$$);
      if (!$el$$4_label$$7$$) {
        $el$$4_label$$7$$ = $spf$dom$createIframe$$($key$$36$$, null, function($el$$5$$) {
          $el$$5$$.title = $key$$36$$;
          $spf$tasks$run$$($key$$36$$, !0);
        });
      } else {
        if (!$opt_force$$1$$ && $el$$4_label$$7$$.contentWindow.document.getElementById($id$$5$$)) {
          return;
        }
      }
      $next$$2_type$$87$$ = $spf$bind$$($spf$net$resource$prefetch_$$, null, $el$$4_label$$7$$, $next$$2_type$$87$$, $url$$31$$, $id$$5$$, $key$$36$$);
      $el$$4_label$$7$$.title ? $next$$2_type$$87$$() : $spf$tasks$add$$($key$$36$$, $next$$2_type$$87$$);
    }
  }
}
function $spf$net$resource$prefetch_$$($doc$$2_el$$6$$, $type$$88$$, $url$$32$$, $id$$6$$, $group$$) {
  var $isJS$$4$$ = $type$$88$$ == $spf$net$resource$Type$JS$$, $isCSS$$ = $type$$88$$ == $spf$net$resource$Type$CSS$$;
  $doc$$2_el$$6$$ = $doc$$2_el$$6$$.contentWindow.document;
  var $fetchEl$$ = $doc$$2_el$$6$$.getElementById($id$$6$$);
  $fetchEl$$ && $fetchEl$$.parentNode.removeChild($fetchEl$$);
  $isJS$$4$$ ? ($fetchEl$$ = $doc$$2_el$$6$$.createElement("object"), $spf$net$resource$IS_IE$$ ? $doc$$2_el$$6$$.createElement("script").src = $url$$32$$ : $fetchEl$$.data = $url$$32$$, $fetchEl$$.id = $id$$6$$, $doc$$2_el$$6$$.body.appendChild($fetchEl$$)) : $isCSS$$ ? ($fetchEl$$ = $spf$net$resource$create$$($type$$88$$, $url$$32$$, null, $doc$$2_el$$6$$, $group$$), $fetchEl$$.id = $id$$6$$) : ($fetchEl$$ = $doc$$2_el$$6$$.createElement("img"), $spf$net$resource$IS_IE$$ && ($url$$32$$ = $url$$32$$ + 
  "#" + $spf$now$$()), $fetchEl$$.src = $url$$32$$, $fetchEl$$.id = $id$$6$$, $doc$$2_el$$6$$.body.appendChild($fetchEl$$));
}
function $spf$net$resource$preconnect_$$($url$$33$$) {
  var $img$$2$$ = new Image;
  $spf$net$resource$IS_IE$$ && ($url$$33$$ = $url$$33$$ + "#" + $spf$now$$());
  $img$$2$$.src = $url$$33$$;
}
function $spf$net$resource$eval$$($type$$89$$, $el$$7_text$$10$$, $name$$57$$) {
  for (var $previous$$ = $spf$net$resource$url$get$$($type$$89$$, $name$$57$$), $cls$$5_id$$7_label$$8_str$$inline_69$$ = $el$$7_text$$10$$.replace(/\s/g, ""), $cls$$5_id$$7_label$$8_str$$inline_69$$ = $cls$$5_id$$7_label$$8_str$$inline_69$$ || "", $result$$inline_70$$ = 0, $i$$inline_71$$ = 0, $l$$inline_72$$ = $cls$$5_id$$7_label$$8_str$$inline_69$$.length;$i$$inline_71$$ < $l$$inline_72$$;++$i$$inline_71$$) {
    $result$$inline_70$$ = 31 * $result$$inline_70$$ + $cls$$5_id$$7_label$$8_str$$inline_69$$.charCodeAt($i$$inline_71$$), $result$$inline_70$$ %= 4294967296;
  }
  $cls$$5_id$$7_label$$8_str$$inline_69$$ = "hash-" + $result$$inline_70$$;
  $spf$net$resource$url$set$$($type$$89$$, $name$$57$$, $cls$$5_id$$7_label$$8_str$$inline_69$$);
  !$spf$net$resource$status$loaded$$($type$$89$$, $cls$$5_id$$7_label$$8_str$$inline_69$$) && ($el$$7_text$$10$$ = $spf$net$resource$exec$$($type$$89$$, $el$$7_text$$10$$)) && ($spf$net$resource$status$set$$($spf$net$resource$State$LOADED$$, $type$$89$$, $cls$$5_id$$7_label$$8_str$$inline_69$$), $el$$7_text$$10$$ && ($cls$$5_id$$7_label$$8_str$$inline_69$$ = $spf$net$resource$label$$($cls$$5_id$$7_label$$8_str$$inline_69$$), $cls$$5_id$$7_label$$8_str$$inline_69$$ = $spf$net$resource$key$$($type$$89$$, 
  $cls$$5_id$$7_label$$8_str$$inline_69$$), $el$$7_text$$10$$.className = $cls$$5_id$$7_label$$8_str$$inline_69$$, $el$$7_text$$10$$.setAttribute("name", $name$$57$$)), ($previous$$ = $previous$$ && $previous$$[0]) && $spf$net$resource$destroy$$($type$$89$$, $previous$$));
}
function $spf$net$resource$exec$$($type$$90$$, $text$$11$$) {
  $text$$11$$ = $spf$string$trim$$($text$$11$$);
  if (!$text$$11$$) {
    return null;
  }
  var $targetEl$$1$$ = document.getElementsByTagName("head")[0] || document.body, $el$$8$$;
  $type$$90$$ == $spf$net$resource$Type$JS$$ ? ($el$$8$$ = document.createElement("script"), $el$$8$$.text = $text$$11$$, $targetEl$$1$$.appendChild($el$$8$$)) : ($el$$8$$ = document.createElement("style"), $targetEl$$1$$.appendChild($el$$8$$), "styleSheet" in $el$$8$$ ? $el$$8$$.styleSheet.cssText = $text$$11$$ : $el$$8$$.appendChild(document.createTextNode($text$$11$$)));
  return $el$$8$$;
}
function $spf$net$resource$canonicalize$$($type$$92$$, $url$$34$$) {
  var $key$$38_paths$$1$$ = "rsrc-p-" + $type$$92$$;
  if ($url$$34$$) {
    var $index$$45$$ = $url$$34$$.indexOf("//");
    if (0 > $index$$45$$) {
      if (0 == $url$$34$$.lastIndexOf("hash-", 0)) {
        return $url$$34$$;
      }
      $key$$38_paths$$1$$ = $spf$state$values_$$[$key$$38_paths$$1$$] || "";
      if ($spf$string$isString$$($key$$38_paths$$1$$)) {
        $url$$34$$ = $key$$38_paths$$1$$ + $url$$34$$;
      } else {
        for (var $p$$ in $key$$38_paths$$1$$) {
          $url$$34$$ = $url$$34$$.replace($p$$, $key$$38_paths$$1$$[$p$$]);
        }
      }
      $type$$92$$ != $spf$net$resource$Type$IMG$$ && ($url$$34$$ = 0 > $url$$34$$.indexOf("." + $type$$92$$) ? $url$$34$$ + "." + $type$$92$$ : $url$$34$$);
      $url$$34$$ = $spf$url$absolute$$($url$$34$$);
    } else {
      0 == $index$$45$$ && ($url$$34$$ = $spf$url$absolute$$($url$$34$$));
    }
  }
  return $url$$34$$;
}
function $spf$net$resource$key$$($type$$93$$, $label$$9$$, $opt_group$$) {
  return $type$$93$$ + "-" + $label$$9$$ + ($opt_group$$ ? "-" + $opt_group$$ : "");
}
function $spf$net$resource$label$$($url$$35$$) {
  return $url$$35$$ ? String($url$$35$$).replace(/[^\w]/g, "") : "";
}
function $spf$net$resource$status$set$$($status$$, $key$$39_type$$94$$, $url$$36$$, $opt_group$$1$$) {
  $key$$39_type$$94$$ = $spf$net$resource$key$$($key$$39_type$$94$$, $url$$36$$, $opt_group$$1$$);
  $spf$net$resource$status_$$[$key$$39_type$$94$$] = $status$$;
}
function $spf$net$resource$status$get$$($key$$40_type$$95$$, $url$$37$$, $opt_group$$2$$) {
  $key$$40_type$$95$$ = $spf$net$resource$key$$($key$$40_type$$95$$, $url$$37$$, $opt_group$$2$$);
  return $spf$net$resource$status_$$[$key$$40_type$$95$$];
}
function $spf$net$resource$status$loaded$$($type$$97$$, $url$$39$$) {
  var $status$$1$$ = $spf$net$resource$status$get$$($type$$97$$, $url$$39$$);
  return "" == $url$$39$$ || $status$$1$$ == $spf$net$resource$State$LOADED$$;
}
function $spf$net$resource$url$set$$($key$$45_type$$101$$, $name$$59$$, $url$$43$$) {
  $key$$45_type$$101$$ = $spf$net$resource$key$$($key$$45_type$$101$$, $name$$59$$);
  $spf$net$resource$url_$$[$key$$45_type$$101$$] = $url$$43$$;
}
function $spf$net$resource$url$get$$($type$$102$$, $name$$60$$) {
  var $key$$46$$ = $spf$net$resource$key$$($type$$102$$, $name$$60$$);
  return $spf$net$resource$url_$$[$key$$46$$];
}
function $spf$net$resource$url$loaded$$($type$$104$$, $name$$62$$) {
  var $url$$45$$ = $spf$net$resource$url$get$$($type$$104$$, $name$$62$$);
  return void 0 != $url$$45$$ && $spf$net$resource$status$loaded$$($type$$104$$, $url$$45$$);
}
var $spf$net$resource$status_$$ = {}, $spf$net$resource$name_$$ = {}, $spf$net$resource$url_$$ = {}, $spf$net$resource$IS_IE$$ = -1 != navigator.userAgent.indexOf(" Trident/"), $spf$net$resource$State$LOADING$$ = 1, $spf$net$resource$State$LOADED$$ = 2, $spf$net$resource$Type$CSS$$ = "css", $spf$net$resource$Type$IMG$$ = "img", $spf$net$resource$Type$JS$$ = "js";
"rsrc-s" in $spf$state$values_$$ || $spf$state$set$$("rsrc-s", $spf$net$resource$status_$$);
$spf$net$resource$status_$$ = $spf$state$values_$$["rsrc-s"];
"rsrc-n" in $spf$state$values_$$ || $spf$state$set$$("rsrc-n", $spf$net$resource$name_$$);
$spf$net$resource$name_$$ = $spf$state$values_$$["rsrc-n"];
"rsrc-u" in $spf$state$values_$$ || $spf$state$set$$("rsrc-u", $spf$net$resource$url_$$);
$spf$net$resource$url_$$ = $spf$state$values_$$["rsrc-u"];
function $spf$net$connect$preconnect$$($urls$$) {
  $urls$$ = $spf$array$toArray$$($urls$$);
  $spf$array$each$$($urls$$, function($url$$46$$) {
    $spf$net$resource$prefetch$$($spf$net$resource$Type$IMG$$, $url$$46$$, !0);
  });
}
;function $spf$net$script$load$$($url$$47$$, $name$$63$$, $opt_fn$$1$$) {
  $spf$net$resource$load$$($spf$net$resource$Type$JS$$, $url$$47$$, $name$$63$$, $opt_fn$$1$$);
}
function $spf$net$script$unload$$($name$$64$$) {
  $spf$net$resource$unload$$($spf$net$resource$Type$JS$$, $name$$64$$);
}
function $spf$net$script$get$$($url$$48$$, $opt_fn$$2$$) {
  $spf$net$resource$create$$($spf$net$resource$Type$JS$$, $url$$48$$, $opt_fn$$2$$);
}
function $spf$net$script$prefetch$$($urls$$1$$) {
  $urls$$1$$ = $spf$array$toArray$$($urls$$1$$);
  $spf$array$each$$($urls$$1$$, function($url$$49$$) {
    $spf$net$resource$prefetch$$($spf$net$resource$Type$JS$$, $url$$49$$);
  });
}
function $spf$net$script$ready$$($names$$1_topic$$9$$, $opt_fn$$3$$, $opt_require$$) {
  $names$$1_topic$$9$$ = $spf$array$toArray$$($names$$1_topic$$9$$);
  $spf$debug$debug$$("script.ready", $names$$1_topic$$9$$);
  $names$$1_topic$$9$$ = $spf$array$filter$$($names$$1_topic$$9$$, function($name$$65$$) {
    return!!$name$$65$$;
  });
  var $unknown$$ = [];
  $spf$array$each$$($names$$1_topic$$9$$, function($name$$66$$) {
    void 0 == $spf$net$resource$url$get$$($spf$net$resource$Type$JS$$, $name$$66$$) && $unknown$$.push($name$$66$$);
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
  $names$$3$$ = $spf$array$toArray$$($names$$3$$);
  $spf$array$each$$($names$$3$$, function($name$$68$$) {
    if ($name$$68$$) {
      var $url$$50$$ = $spf$net$script$url_$$[$name$$68$$] || $name$$68$$, $url$$50$$ = $spf$net$resource$canonicalize$$($spf$net$resource$Type$JS$$, $url$$50$$), $previous$$1$$ = $spf$net$resource$url$get$$($spf$net$resource$Type$JS$$, $name$$68$$);
      $previous$$1$$ && $url$$50$$ != $previous$$1$$ && $spf$net$script$unrequire$$($name$$68$$);
    }
  });
  $spf$net$script$ready$$($names$$3$$, $opt_fn$$4$$, $spf$net$script$require_$$);
}
function $spf$net$script$require_$$($names$$4$$) {
  $spf$array$each$$($names$$4$$, function($name$$69$$) {
    function $next$$3$$() {
      $spf$net$script$load$$($url$$51$$, $name$$69$$);
    }
    var $deps$$ = $spf$net$script$deps_$$[$name$$69$$], $url$$51$$ = $spf$net$script$url_$$[$name$$69$$] || $name$$69$$;
    $deps$$ ? $spf$net$script$require$$($deps$$, $next$$3$$) : $next$$3$$();
  });
}
function $spf$net$script$unrequire$$($names$$5$$) {
  $spf$debug$debug$$("script.unrequire", $names$$5$$);
  $names$$5$$ = $spf$array$toArray$$($names$$5$$);
  $spf$array$each$$($names$$5$$, function($name$$70$$) {
    var $descendants$$ = [], $dep$$;
    for ($dep$$ in $spf$net$script$deps_$$) {
      var $list$$ = $spf$net$script$deps_$$[$dep$$], $list$$ = $spf$array$toArray$$($list$$);
      $spf$array$each$$($list$$, function($l$$5$$) {
        $l$$5$$ == $name$$70$$ && $descendants$$.push($dep$$);
      });
    }
    $spf$array$each$$($descendants$$, function($descend$$) {
      $spf$net$script$unrequire$$($descend$$);
    });
    $spf$net$script$unload$$($name$$70$$);
  });
}
function $spf$net$script$eval$$($text$$12$$, $name$$71$$) {
  $spf$net$resource$eval$$($spf$net$resource$Type$JS$$, $text$$12$$, $name$$71$$);
}
function $spf$net$script$exec$$($text$$13$$) {
  $spf$net$resource$exec$$($spf$net$resource$Type$JS$$, $text$$13$$);
}
var $spf$net$script$deps_$$ = {};
"js-d" in $spf$state$values_$$ || $spf$state$set$$("js-d", $spf$net$script$deps_$$);
var $spf$net$script$deps_$$ = $spf$state$values_$$["js-d"], $spf$net$script$url_$$ = {};
"js-u" in $spf$state$values_$$ || $spf$state$set$$("js-u", $spf$net$script$url_$$);
$spf$net$script$url_$$ = $spf$state$values_$$["js-u"];
function $spf$net$style$load$$($url$$52$$, $name$$73$$, $opt_fn$$5$$) {
  $spf$net$resource$load$$($spf$net$resource$Type$CSS$$, $url$$52$$, $name$$73$$, $opt_fn$$5$$);
}
function $spf$net$style$get$$($url$$53$$, $opt_fn$$6$$) {
  $spf$net$resource$create$$($spf$net$resource$Type$CSS$$, $url$$53$$, $opt_fn$$6$$);
}
function $spf$net$style$prefetch$$($urls$$2$$) {
  $urls$$2$$ = $spf$array$toArray$$($urls$$2$$);
  $spf$array$each$$($urls$$2$$, function($url$$54$$) {
    $spf$net$resource$prefetch$$($spf$net$resource$Type$CSS$$, $url$$54$$);
  });
}
;function $spf$nav$response$parse$$($response_text$$16$$, $opt_multipart_parts$$1$$, $opt_lastDitch$$) {
  if ($opt_multipart_parts$$1$$) {
    $opt_multipart_parts$$1$$ = [];
    var $chunk_extra$$1$$, $start$$8$$ = 0;
    $opt_lastDitch$$ && ($response_text$$16$$ += "\r\n");
    var $finish$$ = $response_text$$16$$.indexOf($spf$nav$response$Token$BEGIN$$, $start$$8$$);
    for (-1 < $finish$$ && ($start$$8$$ = $finish$$ + $spf$nav$response$Token$BEGIN$$.length);-1 < ($finish$$ = $response_text$$16$$.indexOf($spf$nav$response$Token$DELIMITER$$, $start$$8$$));) {
      $chunk_extra$$1$$ = $spf$string$trim$$($response_text$$16$$.substring($start$$8$$, $finish$$)), $start$$8$$ = $finish$$ + $spf$nav$response$Token$DELIMITER$$.length, $chunk_extra$$1$$ && $opt_multipart_parts$$1$$.push(JSON.parse($chunk_extra$$1$$));
    }
    $finish$$ = $response_text$$16$$.indexOf($spf$nav$response$Token$END$$, $start$$8$$);
    -1 < $finish$$ && ($chunk_extra$$1$$ = $spf$string$trim$$($response_text$$16$$.substring($start$$8$$, $finish$$)), $start$$8$$ = $finish$$ + $spf$nav$response$Token$END$$.length, $chunk_extra$$1$$ && $opt_multipart_parts$$1$$.push(JSON.parse($chunk_extra$$1$$)));
    $chunk_extra$$1$$ = "";
    $response_text$$16$$.length > $start$$8$$ && ($chunk_extra$$1$$ = $response_text$$16$$.substring($start$$8$$), $opt_lastDitch$$ && $spf$string$endsWith$$($chunk_extra$$1$$, "\r\n") && ($chunk_extra$$1$$ = $chunk_extra$$1$$.substring(0, $chunk_extra$$1$$.length - 2)));
    $opt_multipart_parts$$1$$ = $spf$nav$response$extract$$($opt_multipart_parts$$1$$);
    return{$parts$:$opt_multipart_parts$$1$$, $extra$:$chunk_extra$$1$$};
  }
  $response_text$$16$$ = JSON.parse($response_text$$16$$);
  $opt_multipart_parts$$1$$ = $spf$nav$response$extract$$($spf$array$toArray$$($response_text$$16$$));
  return{$parts$:$opt_multipart_parts$$1$$, $extra$:""};
}
function $spf$nav$response$process$$($url$$55$$, $response$$1$$, $opt_info$$, $opt_callback$$8$$) {
  $spf$debug$info$$("nav.response.process ", $response$$1$$, $opt_info$$);
  var $isNavigate$$ = $opt_info$$ && 0 == $opt_info$$.type.lastIndexOf("navigate", 0), $isReverse$$ = $opt_info$$ && $opt_info$$.reverse, $hasPosition$$ = $opt_info$$ && !!$opt_info$$.position, $hasScrolled$$ = $opt_info$$ && $opt_info$$.$scrolled$, $name$$76$$ = $response$$1$$.name || "", $key$$48$$ = "process " + $spf$url$absolute$$($url$$55$$), $sync$$ = !$spf$config$values$$["experimental-process-async"], $fn$$17_num$$5$$;
  $fn$$17_num$$5$$ = 0;
  $response$$1$$.timing || ($response$$1$$.timing = {});
  $response$$1$$.title && (document.title = $response$$1$$.title);
  $isNavigate$$ && $response$$1$$.url && $spf$url$absolute$$($response$$1$$.url) != $spf$url$absolute$$(window.location.href) && ($spf$debug$debug$$("  update history with response url"), $spf$history$replace$$($response$$1$$.url + window.location.hash));
  $response$$1$$.head && ($fn$$17_num$$5$$ = $spf$bind$$(function($head$$, $timing$$) {
    var $extracted$$ = $spf$nav$response$extract_$$($head$$);
    $spf$nav$response$preinstallLinks_$$($extracted$$);
    $spf$nav$response$installStyles_$$($extracted$$);
    $spf$debug$debug$$("    head css");
    $spf$tasks$suspend$$($key$$48$$);
    $spf$nav$response$installScripts_$$($extracted$$, function() {
      $timing$$.spfProcessHead = $spf$now$$();
      $spf$debug$debug$$("    head js");
      $spf$tasks$resume$$($key$$48$$, $sync$$);
      $spf$debug$debug$$("  process task done: head");
    });
  }, null, $response$$1$$.head, $response$$1$$.timing), $fn$$17_num$$5$$ = $spf$tasks$add$$($key$$48$$, $fn$$17_num$$5$$), $spf$debug$debug$$("  process task queued: head", $fn$$17_num$$5$$));
  $response$$1$$.attr && ($fn$$17_num$$5$$ = $spf$bind$$(function($attrs$$, $timing$$1$$) {
    for (var $id$$9$$ in $attrs$$) {
      var $el$$11_element$$inline_76$$ = document.getElementById($id$$9$$);
      if ($el$$11_element$$inline_76$$) {
        var $attributes$$inline_77$$ = $attrs$$[$id$$9$$], $name$$inline_78$$ = void 0;
        for ($name$$inline_78$$ in $attributes$$inline_77$$) {
          var $value$$inline_79$$ = $attributes$$inline_77$$[$name$$inline_78$$];
          "class" == $name$$inline_78$$ ? $el$$11_element$$inline_76$$.className = $value$$inline_79$$ : "style" == $name$$inline_78$$ ? $el$$11_element$$inline_76$$.style.cssText = $value$$inline_79$$ : ($el$$11_element$$inline_76$$.setAttribute($name$$inline_78$$, $value$$inline_79$$), "value" == $name$$inline_78$$ && ($el$$11_element$$inline_76$$[$name$$inline_78$$] = $value$$inline_79$$));
        }
        $spf$debug$debug$$("    attr set", $id$$9$$);
      }
    }
    $timing$$1$$.spfProcessAttr = $spf$now$$();
    $spf$debug$debug$$("  process task done: attr");
  }, null, $response$$1$$.attr, $response$$1$$.timing), $fn$$17_num$$5$$ = $spf$tasks$add$$($key$$48$$, $fn$$17_num$$5$$), $spf$debug$debug$$("  process task queued: attr", $fn$$17_num$$5$$));
  var $fragments_numFragments$$ = $response$$1$$.body || {}, $numBeforeFragments$$ = $fn$$17_num$$5$$, $id$$8$$;
  for ($id$$8$$ in $fragments_numFragments$$) {
    $fn$$17_num$$5$$ = $spf$bind$$(function($id$$10$$, $body$$1$$) {
      var $animation_el$$12$$ = document.getElementById($id$$10$$);
      if ($animation_el$$12$$) {
        !$isNavigate$$ || $hasPosition$$ || $hasScrolled$$ || ($spf$state$set$$("nav-scroll-position", null), $spf$state$set$$("nav-scroll-url", null), $spf$debug$debug$$("    scrolling to top"), window.scroll(0, 0), $hasScrolled$$ = !0, $opt_info$$ && ($opt_info$$.$scrolled$ = !0));
        var $extracted$$1$$ = $spf$nav$response$extract_$$($body$$1$$);
        $spf$nav$response$installStyles_$$($extracted$$1$$);
        var $installScripts$$ = function $$installScripts$$$() {
          $spf$tasks$suspend$$($key$$48$$);
          $spf$nav$response$installScripts_$$($extracted$$1$$, function() {
            $spf$tasks$resume$$($key$$48$$, $sync$$);
            $spf$debug$debug$$("  process task done: body", $id$$10$$);
          });
        }, $animationClass_htmlHandler$$ = $spf$config$values$$["animation-class"];
        $spf$nav$response$CAN_ANIMATE_$$ && $spf$dom$classlist$contains$$($animation_el$$12$$, $animationClass_htmlHandler$$) ? ($animation_el$$12$$ = new $spf$nav$response$Animation_$$($animation_el$$12$$, $extracted$$1$$.html, $animationClass_htmlHandler$$, $name$$76$$, !!$isReverse$$), $spf$tasks$suspend$$($key$$48$$), $spf$tasks$run$$($animation_el$$12$$.key, !0), $spf$tasks$add$$($animation_el$$12$$.key, $spf$bind$$($spf$nav$response$prepareAnimation_$$, null, $animation_el$$12$$), 0), $spf$debug$debug$$("  process queued prepare animation", 
        $id$$10$$), $spf$tasks$add$$($animation_el$$12$$.key, $spf$bind$$($spf$nav$response$runAnimation_$$, null, $animation_el$$12$$), 17), $spf$debug$debug$$("  process queued run animation", $id$$10$$), $spf$tasks$add$$($animation_el$$12$$.key, $spf$bind$$($spf$nav$response$completeAnimation_$$, null, $animation_el$$12$$), $animation_el$$12$$.duration), $spf$debug$debug$$("  process queued complete animation", $id$$10$$), $spf$tasks$add$$($animation_el$$12$$.key, $spf$bind$$(function() {
          $installScripts$$();
          $spf$tasks$resume$$($key$$48$$, $sync$$);
        }, null), 0), $spf$tasks$run$$($animation_el$$12$$.key)) : ($animationClass_htmlHandler$$ = $spf$config$values$$["experimental-html-handler"]) ? ($spf$tasks$suspend$$($key$$48$$), $animationClass_htmlHandler$$($extracted$$1$$.html, $animation_el$$12$$, function() {
          $installScripts$$();
          $spf$tasks$resume$$($key$$48$$, $sync$$);
        })) : ($animation_el$$12$$.innerHTML = $extracted$$1$$.html, $installScripts$$());
      }
    }, null, $id$$8$$, $fragments_numFragments$$[$id$$8$$], $response$$1$$.timing), $fn$$17_num$$5$$ = $spf$tasks$add$$($key$$48$$, $fn$$17_num$$5$$), $spf$debug$debug$$("  process task queued: body", $id$$8$$, $fn$$17_num$$5$$);
  }
  $fragments_numFragments$$ = $fn$$17_num$$5$$ - $numBeforeFragments$$;
  $response$$1$$.foot ? ($fn$$17_num$$5$$ = $spf$bind$$(function($extracted$$2_foot$$, $timing$$3$$, $numFragments$$1$$) {
    $numFragments$$1$$ && ($timing$$3$$.spfProcessBody = $spf$now$$());
    $extracted$$2_foot$$ = $spf$nav$response$extract_$$($extracted$$2_foot$$);
    $spf$nav$response$installStyles_$$($extracted$$2_foot$$);
    $spf$debug$debug$$("    foot css");
    $spf$tasks$suspend$$($key$$48$$);
    $spf$nav$response$installScripts_$$($extracted$$2_foot$$, function() {
      $timing$$3$$.spfProcessFoot = $spf$now$$();
      $spf$debug$debug$$("    foot js");
      $spf$tasks$resume$$($key$$48$$, $sync$$);
      $spf$debug$debug$$("  process task done: foot");
    });
  }, null, $response$$1$$.foot, $response$$1$$.timing, $fragments_numFragments$$), $fn$$17_num$$5$$ = $spf$tasks$add$$($key$$48$$, $fn$$17_num$$5$$), $spf$debug$debug$$("  process task queued: foot", $fn$$17_num$$5$$)) : $fragments_numFragments$$ && ($fn$$17_num$$5$$ = $spf$bind$$(function($timing$$4$$) {
    $timing$$4$$.spfProcessBody = $spf$now$$();
    $spf$debug$debug$$("  process task done: timing-for-body");
  }, null, $response$$1$$.timing), $fn$$17_num$$5$$ = $spf$tasks$add$$($key$$48$$, $fn$$17_num$$5$$), $spf$debug$debug$$("  process task queued: timing-for-body", $fn$$17_num$$5$$));
  $opt_callback$$8$$ && ($fn$$17_num$$5$$ = $spf$tasks$add$$($key$$48$$, $spf$bind$$($opt_callback$$8$$, null, $url$$55$$, $response$$1$$)), $spf$debug$debug$$("  process task queued: callback", $fn$$17_num$$5$$));
  $spf$debug$debug$$("  process run", $key$$48$$, $sync$$);
  $spf$tasks$run$$($key$$48$$, $sync$$);
}
function $spf$nav$response$preprocess$$($url$$56$$, $response$$2$$, $key$$49_opt_info$$1$$, $opt_callback$$9$$) {
  $spf$debug$info$$("nav.response.preprocess ", $response$$2$$);
  $key$$49_opt_info$$1$$ = "preprocess " + $spf$url$absolute$$($url$$56$$);
  var $fn$$18$$;
  $response$$2$$.head && ($fn$$18$$ = $spf$bind$$(function($extracted$$3_head$$1$$) {
    $extracted$$3_head$$1$$ = $spf$nav$response$extract_$$($extracted$$3_head$$1$$);
    $spf$nav$response$preinstallLinks_$$($extracted$$3_head$$1$$);
    $spf$nav$response$preinstallStyles_$$($extracted$$3_head$$1$$);
    $spf$nav$response$preinstallScripts_$$($extracted$$3_head$$1$$);
    $spf$debug$debug$$("  preprocess task done: head");
  }, null, $response$$2$$.head), $spf$tasks$add$$($key$$49_opt_info$$1$$, $fn$$18$$), $spf$debug$debug$$("  preprocess task queued: head"));
  var $fragments$$1$$ = $response$$2$$.body || {}, $id$$11$$;
  for ($id$$11$$ in $fragments$$1$$) {
    $fragments$$1$$[$id$$11$$] && ($fn$$18$$ = $spf$bind$$(function($id$$12$$, $body$$2$$) {
      var $extracted$$4$$ = $spf$nav$response$extract_$$($body$$2$$);
      $spf$nav$response$preinstallStyles_$$($extracted$$4$$);
      $spf$nav$response$preinstallScripts_$$($extracted$$4$$);
      $spf$debug$debug$$("    body js", $id$$12$$);
      $spf$debug$debug$$("  preprocess task done: body", $id$$12$$);
    }, null, $id$$11$$, $fragments$$1$$[$id$$11$$]), $spf$tasks$add$$($key$$49_opt_info$$1$$, $fn$$18$$), $spf$debug$debug$$("  preprocess task queued: body", $id$$11$$));
  }
  $response$$2$$.foot && ($fn$$18$$ = $spf$bind$$(function($extracted$$5_foot$$1$$) {
    $extracted$$5_foot$$1$$ = $spf$nav$response$extract_$$($extracted$$5_foot$$1$$);
    $spf$nav$response$preinstallStyles_$$($extracted$$5_foot$$1$$);
    $spf$nav$response$preinstallScripts_$$($extracted$$5_foot$$1$$);
    $spf$debug$debug$$("  preprocess task done: foot");
  }, null, $response$$2$$.foot), $spf$tasks$add$$($key$$49_opt_info$$1$$, $fn$$18$$), $spf$debug$debug$$("  preprocess task queued: foot"));
  $opt_callback$$9$$ && ($spf$tasks$add$$($key$$49_opt_info$$1$$, $spf$bind$$($opt_callback$$9$$, null, $url$$56$$, $response$$2$$)), $spf$debug$debug$$("  preprocess task queued: callback"));
  $spf$tasks$run$$($key$$49_opt_info$$1$$);
}
function $spf$nav$response$prepareAnimation_$$($data$$30$$) {
  $spf$dom$classlist$add$$($data$$30$$.element, $data$$30$$.$dirClass$);
  $spf$dom$classlist$add$$($data$$30$$.element, $data$$30$$.$fromClass$);
  $spf$dom$classlist$add$$($data$$30$$.element, $data$$30$$.$toClass$);
  $spf$dom$classlist$add$$($data$$30$$.element, $data$$30$$.$startClass$);
  $spf$dom$classlist$add$$($data$$30$$.element, $data$$30$$.$startClassDeprecated$);
  $data$$30$$.$oldEl$ = document.createElement("div");
  $data$$30$$.$oldEl$.className = $data$$30$$.$oldClass$;
  var $element$$inline_81_refNode$$inline_86_refNode$$inline_89$$ = $data$$30$$.element, $container$$inline_82$$ = $data$$30$$.$oldEl$;
  if ($container$$inline_82$$) {
    for (var $child$$inline_83$$;$child$$inline_83$$ = $element$$inline_81_refNode$$inline_86_refNode$$inline_89$$.firstChild;) {
      $container$$inline_82$$.appendChild($child$$inline_83$$);
    }
    $element$$inline_81_refNode$$inline_86_refNode$$inline_89$$.appendChild($container$$inline_82$$);
  }
  $data$$30$$.$newEl$ = document.createElement("div");
  $data$$30$$.$newEl$.className = $data$$30$$.$newClass$;
  $data$$30$$.$newEl$.innerHTML = $data$$30$$.$html$;
  $data$$30$$.reverse ? ($element$$inline_81_refNode$$inline_86_refNode$$inline_89$$ = $data$$30$$.$oldEl$, $element$$inline_81_refNode$$inline_86_refNode$$inline_89$$.parentNode.insertBefore($data$$30$$.$newEl$, $element$$inline_81_refNode$$inline_86_refNode$$inline_89$$)) : ($element$$inline_81_refNode$$inline_86_refNode$$inline_89$$ = $data$$30$$.$oldEl$, $element$$inline_81_refNode$$inline_86_refNode$$inline_89$$.parentNode.insertBefore($data$$30$$.$newEl$, $element$$inline_81_refNode$$inline_86_refNode$$inline_89$$.nextSibling));
  $spf$debug$debug$$("  process done prepare animation", $data$$30$$.element.id);
}
function $spf$nav$response$runAnimation_$$($data$$31$$) {
  $spf$dom$classlist$remove$$($data$$31$$.element, $data$$31$$.$startClass$);
  $spf$dom$classlist$remove$$($data$$31$$.element, $data$$31$$.$startClassDeprecated$);
  $spf$dom$classlist$add$$($data$$31$$.element, $data$$31$$.$endClass$);
  $spf$dom$classlist$add$$($data$$31$$.element, $data$$31$$.$endClassDeprecated$);
  $spf$debug$debug$$("  process done run animation", $data$$31$$.element.id);
}
function $spf$nav$response$completeAnimation_$$($data$$32$$) {
  $data$$32$$.element.removeChild($data$$32$$.$oldEl$);
  var $element$$inline_91$$ = $data$$32$$.$newEl$, $child$$inline_92$$, $parent$$inline_93$$ = $element$$inline_91$$.parentNode;
  if ($parent$$inline_93$$ && 11 != $parent$$inline_93$$.nodeType) {
    if ($element$$inline_91$$.removeNode) {
      $element$$inline_91$$.removeNode(!1);
    } else {
      for (;$child$$inline_92$$ = $element$$inline_91$$.firstChild;) {
        $parent$$inline_93$$.insertBefore($child$$inline_92$$, $element$$inline_91$$);
      }
      $parent$$inline_93$$.removeChild($element$$inline_91$$);
    }
  }
  $spf$dom$classlist$remove$$($data$$32$$.element, $data$$32$$.$endClass$);
  $spf$dom$classlist$remove$$($data$$32$$.element, $data$$32$$.$endClassDeprecated$);
  $spf$dom$classlist$remove$$($data$$32$$.element, $data$$32$$.$fromClass$);
  $spf$dom$classlist$remove$$($data$$32$$.element, $data$$32$$.$toClass$);
  $spf$dom$classlist$remove$$($data$$32$$.element, $data$$32$$.$dirClass$);
  $spf$debug$debug$$("  process done complete animation", $data$$32$$.element.id);
}
function $spf$nav$response$extract$$($response$$3$$) {
  $spf$debug$debug$$("spf.nav.response.extract", $response$$3$$);
  $spf$array$each$$($spf$array$toArray$$($response$$3$$), function($part$$) {
    if ($part$$) {
      $part$$.head && ($part$$.head = $spf$nav$response$extract_$$($part$$.head));
      if ($part$$.body) {
        for (var $id$$13$$ in $part$$.body) {
          $part$$.body[$id$$13$$] = $spf$nav$response$extract_$$($part$$.body[$id$$13$$]);
        }
      }
      $part$$.foot && ($part$$.foot = $spf$nav$response$extract_$$($part$$.foot));
    }
  });
  return $response$$3$$;
}
function $spf$nav$response$extract_$$($frag$$) {
  var $result$$4$$ = new $spf$nav$response$Extraction_$$;
  if (!$frag$$) {
    return $result$$4$$;
  }
  if (!$spf$string$isString$$($frag$$)) {
    return $frag$$.scripts && $spf$array$each$$($frag$$.scripts, function($script$$) {
      $result$$4$$.scripts.push({url:$script$$.url || "", text:$script$$.text || "", name:$script$$.name || "", async:$script$$.async || !1});
    }), $frag$$.styles && $spf$array$each$$($frag$$.styles, function($style$$) {
      $result$$4$$.styles.push({url:$style$$.url || "", text:$style$$.text || "", name:$style$$.name || ""});
    }), $frag$$.links && $spf$array$each$$($frag$$.links, function($link$$) {
      "spf-preconnect" == $link$$.rel && $result$$4$$.links.push({url:$link$$.url || "", rel:$link$$.rel || ""});
    }), $result$$4$$.html = $frag$$.html || "", $result$$4$$;
  }
  $frag$$ = $frag$$.replace($spf$nav$response$ElementRegEx$SCRIPT_STYLE$$, function($full$$, $name$$77_tag$$1$$, $attr_inject_type$$126$$, $text$$17$$) {
    if ("script" == $name$$77_tag$$1$$) {
      $name$$77_tag$$1$$ = ($name$$77_tag$$1$$ = $attr_inject_type$$126$$.match($spf$nav$response$AttributeRegEx$NAME$$)) ? $name$$77_tag$$1$$[1] : "";
      var $url$$57$$ = $attr_inject_type$$126$$.match($spf$nav$response$AttributeRegEx$SRC$$), $url$$57$$ = $url$$57$$ ? $url$$57$$[1] : "", $async$$ = $spf$nav$response$AttributeRegEx$ASYNC$$.test($attr_inject_type$$126$$);
      $attr_inject_type$$126$$ = $spf$nav$response$AttributeRegEx$TYPE$$.exec($attr_inject_type$$126$$);
      return($attr_inject_type$$126$$ = !$attr_inject_type$$126$$ || -1 != $attr_inject_type$$126$$[1].indexOf("/javascript") || -1 != $attr_inject_type$$126$$[1].indexOf("/x-javascript") || -1 != $attr_inject_type$$126$$[1].indexOf("/ecmascript")) ? ($result$$4$$.scripts.push({url:$url$$57$$, text:$text$$17$$, name:$name$$77_tag$$1$$, async:$async$$}), "") : $full$$;
    }
    return "style" == $name$$77_tag$$1$$ && ($name$$77_tag$$1$$ = ($name$$77_tag$$1$$ = $attr_inject_type$$126$$.match($spf$nav$response$AttributeRegEx$NAME$$)) ? $name$$77_tag$$1$$[1] : "", $attr_inject_type$$126$$ = $spf$nav$response$AttributeRegEx$TYPE$$.exec($attr_inject_type$$126$$), $attr_inject_type$$126$$ = !$attr_inject_type$$126$$ || -1 != $attr_inject_type$$126$$[1].indexOf("text/css")) ? ($result$$4$$.styles.push({url:"", text:$text$$17$$, name:$name$$77_tag$$1$$}), "") : $full$$;
  });
  $frag$$ = $frag$$.replace($spf$nav$response$ElementRegEx$LINK$$, function($full$$1$$, $attr$$1$$) {
    var $name$$78_rel$$ = $attr$$1$$.match($spf$nav$response$AttributeRegEx$REL$$), $name$$78_rel$$ = $name$$78_rel$$ ? $name$$78_rel$$[1] : "";
    if ("stylesheet" == $name$$78_rel$$) {
      var $name$$78_rel$$ = ($name$$78_rel$$ = $attr$$1$$.match($spf$nav$response$AttributeRegEx$NAME$$)) ? $name$$78_rel$$[1] : "", $url$$58$$ = $attr$$1$$.match($spf$nav$response$AttributeRegEx$HREF$$), $url$$58$$ = $url$$58$$ ? $url$$58$$[1] : "";
      $result$$4$$.styles.push({url:$url$$58$$, text:"", name:$name$$78_rel$$});
      return "";
    }
    return "spf-preconnect" == $name$$78_rel$$ ? ($url$$58$$ = ($url$$58$$ = $attr$$1$$.match($spf$nav$response$AttributeRegEx$HREF$$)) ? $url$$58$$[1] : "", $result$$4$$.links.push({url:$url$$58$$, rel:$name$$78_rel$$}), "") : $full$$1$$;
  });
  $result$$4$$.html = $frag$$;
  return $result$$4$$;
}
function $spf$nav$response$installScripts_$$($result$$5$$, $opt_callback$$10$$) {
  if (0 >= $result$$5$$.scripts.length) {
    $opt_callback$$10$$ && $opt_callback$$10$$();
  } else {
    var $index$$46$$ = -1, $next$$4$$ = function $$next$$4$$$() {
      $index$$46$$++;
      if ($index$$46$$ < $result$$5$$.scripts.length) {
        var $item$$2$$ = $result$$5$$.scripts[$index$$46$$], $fn$$19$$ = function $$fn$$19$$$() {
        };
        $item$$2$$.url ? $fn$$19$$ = $item$$2$$.name ? $spf$bind$$($spf$net$script$load$$, null, $item$$2$$.url, $item$$2$$.name) : $spf$bind$$($spf$net$script$get$$, null, $item$$2$$.url) : $item$$2$$.text && ($fn$$19$$ = $item$$2$$.name ? $spf$bind$$($spf$net$script$eval$$, null, $item$$2$$.text, $item$$2$$.name) : $spf$bind$$($spf$net$script$exec$$, null, $item$$2$$.text));
        $item$$2$$.url && !$item$$2$$.async ? $fn$$19$$($next$$4$$) : ($fn$$19$$(), $next$$4$$());
      } else {
        $opt_callback$$10$$ && $opt_callback$$10$$();
      }
    };
    $next$$4$$();
  }
}
function $spf$nav$response$preinstallScripts_$$($result$$6_urls$$3$$) {
  0 >= $result$$6_urls$$3$$.scripts.length || ($result$$6_urls$$3$$ = $spf$array$map$$($result$$6_urls$$3$$.scripts, function($item$$3$$) {
    return $item$$3$$.url;
  }), $spf$net$script$prefetch$$($result$$6_urls$$3$$));
}
function $spf$nav$response$installStyles_$$($result$$7$$) {
  0 >= $result$$7$$.styles.length || $spf$array$each$$($result$$7$$.styles, function($item$$4$$) {
    $item$$4$$.url ? $item$$4$$.name ? $spf$net$style$load$$($item$$4$$.url, $item$$4$$.name) : $spf$net$style$get$$($item$$4$$.url) : $item$$4$$.text && ($item$$4$$.name ? $spf$net$resource$eval$$($spf$net$resource$Type$CSS$$, $item$$4$$.text, $item$$4$$.name) : $spf$net$resource$exec$$($spf$net$resource$Type$CSS$$, $item$$4$$.text));
  });
}
function $spf$nav$response$preinstallStyles_$$($result$$8_urls$$4$$) {
  0 >= $result$$8_urls$$4$$.styles.length || ($result$$8_urls$$4$$ = $spf$array$map$$($result$$8_urls$$4$$.styles, function($item$$5$$) {
    return $item$$5$$.url;
  }), $spf$net$style$prefetch$$($result$$8_urls$$4$$));
}
function $spf$nav$response$preinstallLinks_$$($result$$10_urls$$5$$) {
  0 >= $result$$10_urls$$5$$.links.length || ($result$$10_urls$$5$$ = $spf$array$map$$($result$$10_urls$$5$$.links, function($item$$6$$) {
    return "spf-preconnect" == $item$$6$$.rel ? $item$$6$$.url : "";
  }), $spf$net$connect$preconnect$$($result$$10_urls$$5$$));
}
function $spf$nav$response$Animation_$$($el$$13$$, $html_node$$inline_100_prevName$$1$$, $cls$$6$$, $name$$79$$, $reverse$$) {
  var $duration_uid$$inline_104$$ = parseInt($spf$config$values$$["animation-duration"], 10);
  this.element = $el$$13$$;
  this.$html$ = $html_node$$inline_100_prevName$$1$$;
  this.duration = $duration_uid$$inline_104$$;
  this.reverse = $reverse$$;
  $html_node$$inline_100_prevName$$1$$ = document.body;
  $html_node$$inline_100_prevName$$1$$ = ($html_node$$inline_100_prevName$$1$$.dataset ? $html_node$$inline_100_prevName$$1$$.dataset.spfName : $html_node$$inline_100_prevName$$1$$.getAttribute("data-" + "spfName".replace(/([A-Z])/g, "-$1").toLowerCase())) || "";
  $duration_uid$$inline_104$$ = parseInt($spf$state$values_$$.uid, 10) || 0;
  $duration_uid$$inline_104$$++;
  this.key = $el$$13$$["spf-key"] || ($el$$13$$["spf-key"] = "" + $spf$state$set$$("uid", $duration_uid$$inline_104$$));
  this.$fromClass$ = $html_node$$inline_100_prevName$$1$$ && $cls$$6$$ + "-from-" + $html_node$$inline_100_prevName$$1$$;
  this.$toClass$ = $name$$79$$ && $cls$$6$$ + "-to-" + $name$$79$$;
  this.$oldEl$ = null;
  this.$oldClass$ = $cls$$6$$ + "-old";
  this.$newEl$ = null;
  this.$newClass$ = $cls$$6$$ + "-new";
  this.$dirClass$ = $cls$$6$$ + ($reverse$$ ? "-reverse" : "-forward");
  this.$startClass$ = $cls$$6$$ + "-start";
  this.$startClassDeprecated$ = this.$dirClass$ + "-start";
  this.$endClass$ = $cls$$6$$ + "-end";
  this.$endClassDeprecated$ = this.$dirClass$ + "-end";
}
function $spf$nav$response$Extraction_$$() {
  this.html = "";
  this.scripts = [];
  this.styles = [];
  this.links = [];
}
var $spf$nav$response$CAN_ANIMATE_$$ = function() {
  var $testEl$$ = document.createElement("div");
  return "transition" in $testEl$$.style ? !0 : $spf$array$some$$(["webkit", "Moz", "Ms", "O", "Khtml"], function($prefix$$5$$) {
    return $prefix$$5$$ + "Transition" in $testEl$$.style;
  });
}(), $spf$nav$response$ElementRegEx$LINK$$ = /\x3clink([\s\S]*?)\x3e/ig, $spf$nav$response$ElementRegEx$SCRIPT_STYLE$$ = /\x3c(script|style)([\s\S]*?)\x3e([\s\S]*?)\x3c\/\1\x3e/ig, $spf$nav$response$AttributeRegEx$ASYNC$$ = /(?:\s|^)async(?:\s|=|$)/i, $spf$nav$response$AttributeRegEx$HREF$$ = /(?:\s|^)href\s*=\s*["']?([^\s"']+)/i, $spf$nav$response$AttributeRegEx$NAME$$ = /(?:\s|^)name\s*=\s*["']?([^\s"']+)/i, $spf$nav$response$AttributeRegEx$REL$$ = /(?:\s|^)rel\s*=\s*["']?([^\s"']+)/i, $spf$nav$response$AttributeRegEx$SRC$$ = 
/(?:\s|^)src\s*=\s*["']?([^\s"']+)/i, $spf$nav$response$AttributeRegEx$TYPE$$ = /(?:\s|^)type\s*=\s*["']([^"']+)["']/i, $spf$nav$response$Token$BEGIN$$ = "[\r\n", $spf$nav$response$Token$DELIMITER$$ = ",\r\n", $spf$nav$response$Token$END$$ = "]\r\n";
function $spf$net$xhr$send$$($addContentTypeFormUrlEncoded_method$$2$$, $url$$61$$, $data$$34$$, $opt_options$$17$$) {
  var $options$$4$$ = $opt_options$$17$$ || {}, $chunked$$ = !1, $offset$$14$$ = 0, $timer$$, $xhr$$ = new XMLHttpRequest;
  $xhr$$.open($addContentTypeFormUrlEncoded_method$$2$$, $url$$61$$, !0);
  $xhr$$.timing = {};
  var $xhr_abort$$ = $xhr$$.abort;
  $xhr$$.abort = function $$xhr$$$abort$() {
    clearTimeout($timer$$);
    $xhr$$.onreadystatechange = null;
    $xhr_abort$$.call($xhr$$);
  };
  $xhr$$.onreadystatechange = function $$xhr$$$onreadystatechange$() {
    var $chunk$$1_firefoxSpdy$$inline_107_timing$$5$$ = $xhr$$.timing;
    if ($xhr$$.readyState == $spf$net$xhr$State$HEADERS_RECEIVED$$) {
      $chunk$$1_firefoxSpdy$$inline_107_timing$$5$$.responseStart = $chunk$$1_firefoxSpdy$$inline_107_timing$$5$$.responseStart || $spf$now$$();
      if ("json" == $xhr$$.responseType) {
        $chunked$$ = !1;
      } else {
        if (-1 < ($xhr$$.getResponseHeader("Transfer-Encoding") || "").toLowerCase().indexOf("chunked")) {
          $chunked$$ = !0;
        } else {
          var $chunk$$1_firefoxSpdy$$inline_107_timing$$5$$ = $xhr$$.getResponseHeader("X-Firefox-Spdy"), $chromeSpdy$$inline_109_loadTimes$$inline_108$$ = window.chrome && chrome.loadTimes && chrome.loadTimes(), $chromeSpdy$$inline_109_loadTimes$$inline_108$$ = $chromeSpdy$$inline_109_loadTimes$$inline_108$$ && $chromeSpdy$$inline_109_loadTimes$$inline_108$$.wasFetchedViaSpdy;
          $chunked$$ = !(!$chunk$$1_firefoxSpdy$$inline_107_timing$$5$$ && !$chromeSpdy$$inline_109_loadTimes$$inline_108$$);
        }
      }
      $options$$4$$.$onHeaders$ && $options$$4$$.$onHeaders$($xhr$$);
    } else {
      $xhr$$.readyState == $spf$net$xhr$State$LOADING$$ ? $chunked$$ && $options$$4$$.$onChunk$ && ($chunk$$1_firefoxSpdy$$inline_107_timing$$5$$ = $xhr$$.responseText.substring($offset$$14$$), $offset$$14$$ = $xhr$$.responseText.length, $options$$4$$.$onChunk$($xhr$$, $chunk$$1_firefoxSpdy$$inline_107_timing$$5$$)) : $xhr$$.readyState == $spf$net$xhr$State$DONE$$ && ($chunk$$1_firefoxSpdy$$inline_107_timing$$5$$.responseEnd = $chunk$$1_firefoxSpdy$$inline_107_timing$$5$$.responseEnd || $spf$now$$(), 
      window.performance && window.performance.getEntriesByName && ($xhr$$.resourceTiming = window.performance.getEntriesByName($url$$61$$).pop()), $chunked$$ && $options$$4$$.$onChunk$ && $xhr$$.responseText.length > $offset$$14$$ && ($chunk$$1_firefoxSpdy$$inline_107_timing$$5$$ = $xhr$$.responseText.substring($offset$$14$$), $offset$$14$$ = $xhr$$.responseText.length, $options$$4$$.$onChunk$($xhr$$, $chunk$$1_firefoxSpdy$$inline_107_timing$$5$$)), clearTimeout($timer$$), $options$$4$$.$onDone$ && 
      $options$$4$$.$onDone$($xhr$$));
    }
  };
  "responseType" in $xhr$$ && "json" == $options$$4$$.responseType && ($xhr$$.responseType = "json");
  $addContentTypeFormUrlEncoded_method$$2$$ = "POST" == $addContentTypeFormUrlEncoded_method$$2$$;
  if ($options$$4$$.headers) {
    for (var $key$$50$$ in $options$$4$$.headers) {
      $xhr$$.setRequestHeader($key$$50$$, $options$$4$$.headers[$key$$50$$]), "content-type" == $key$$50$$.toLowerCase() && ($addContentTypeFormUrlEncoded_method$$2$$ = !1);
    }
  }
  $addContentTypeFormUrlEncoded_method$$2$$ && $xhr$$.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  0 < $options$$4$$.$timeoutMs$ && ($timer$$ = setTimeout(function() {
    $xhr$$.abort();
    $options$$4$$.$onTimeout$ && $options$$4$$.$onTimeout$($xhr$$);
  }, $options$$4$$.$timeoutMs$));
  $xhr$$.timing.fetchStart = $spf$now$$();
  $xhr$$.send($data$$34$$);
  return $xhr$$;
}
var $spf$net$xhr$State$HEADERS_RECEIVED$$ = 2, $spf$net$xhr$State$LOADING$$ = 3, $spf$net$xhr$State$DONE$$ = 4;
function $spf$nav$request$send$$($url$$62$$, $opt_options$$18$$) {
  $spf$debug$debug$$("nav.request.send ", $url$$62$$, $opt_options$$18$$);
  var $fn$$inline_123_options$$5$$ = $opt_options$$18$$ || {};
  $fn$$inline_123_options$$5$$.method = (($fn$$inline_123_options$$5$$.method || "GET") + "").toUpperCase();
  $fn$$inline_123_options$$5$$.type = $fn$$inline_123_options$$5$$.type || "request";
  var $path$$inline_116_timing$$6_url$$inline_111$$ = $url$$62$$, $ident$$inline_113_requestUrl_uid$$inline_200$$ = $spf$config$values$$["url-identifier"] || "";
  if ($ident$$inline_113_requestUrl_uid$$inline_200$$) {
    var $ident$$inline_113_requestUrl_uid$$inline_200$$ = $ident$$inline_113_requestUrl_uid$$inline_200$$.replace("__type__", $fn$$inline_123_options$$5$$.type || ""), $hashParts$$inline_114_hashVal$$inline_120$$ = $spf$string$partition$$($path$$inline_116_timing$$6_url$$inline_111$$, "#"), $configHeaders_handleComplete_queryParts$$inline_115_queryVal$$inline_118$$ = $spf$string$partition$$($hashParts$$inline_114_hashVal$$inline_120$$[0], "?"), $path$$inline_116_timing$$6_url$$inline_111$$ = $configHeaders_handleComplete_queryParts$$inline_115_queryVal$$inline_118$$[0], 
    $cacheKey_cached_headers_querySep$$inline_117$$ = $configHeaders_handleComplete_queryParts$$inline_115_queryVal$$inline_118$$[1], $configHeaders_handleComplete_queryParts$$inline_115_queryVal$$inline_118$$ = $configHeaders_handleComplete_queryParts$$inline_115_queryVal$$inline_118$$[2], $hashSep$$inline_119_value$$56$$ = $hashParts$$inline_114_hashVal$$inline_120$$[1], $hashParts$$inline_114_hashVal$$inline_120$$ = $hashParts$$inline_114_hashVal$$inline_120$$[2];
    if (0 == $ident$$inline_113_requestUrl_uid$$inline_200$$.lastIndexOf("?", 0)) {
      $cacheKey_cached_headers_querySep$$inline_117$$ && ($ident$$inline_113_requestUrl_uid$$inline_200$$ = $ident$$inline_113_requestUrl_uid$$inline_200$$.replace("?", "&")), $configHeaders_handleComplete_queryParts$$inline_115_queryVal$$inline_118$$ += $ident$$inline_113_requestUrl_uid$$inline_200$$;
    } else {
      if (0 == $ident$$inline_113_requestUrl_uid$$inline_200$$.lastIndexOf(".", 0)) {
        if ($spf$string$endsWith$$($path$$inline_116_timing$$6_url$$inline_111$$, "/")) {
          $ident$$inline_113_requestUrl_uid$$inline_200$$ = "index" + $ident$$inline_113_requestUrl_uid$$inline_200$$;
        } else {
          var $ext$$inline_121$$ = $path$$inline_116_timing$$6_url$$inline_111$$.lastIndexOf(".");
          -1 < $ext$$inline_121$$ && ($path$$inline_116_timing$$6_url$$inline_111$$ = $path$$inline_116_timing$$6_url$$inline_111$$.substring(0, $ext$$inline_121$$));
        }
      } else {
        $spf$string$endsWith$$($path$$inline_116_timing$$6_url$$inline_111$$, "/") && 0 == $ident$$inline_113_requestUrl_uid$$inline_200$$.lastIndexOf("/", 0) && ($ident$$inline_113_requestUrl_uid$$inline_200$$ = $ident$$inline_113_requestUrl_uid$$inline_200$$.substring(1));
      }
      $path$$inline_116_timing$$6_url$$inline_111$$ += $ident$$inline_113_requestUrl_uid$$inline_200$$;
    }
    $path$$inline_116_timing$$6_url$$inline_111$$ = $path$$inline_116_timing$$6_url$$inline_111$$ + $cacheKey_cached_headers_querySep$$inline_117$$ + $configHeaders_handleComplete_queryParts$$inline_115_queryVal$$inline_118$$ + $hashSep$$inline_119_value$$56$$ + $hashParts$$inline_114_hashVal$$inline_120$$;
  }
  $ident$$inline_113_requestUrl_uid$$inline_200$$ = $spf$url$absolute$$($path$$inline_116_timing$$6_url$$inline_111$$);
  $spf$debug$debug$$("    request url ", $ident$$inline_113_requestUrl_uid$$inline_200$$);
  $path$$inline_116_timing$$6_url$$inline_111$$ = {};
  $path$$inline_116_timing$$6_url$$inline_111$$.spfUrl = $ident$$inline_113_requestUrl_uid$$inline_200$$;
  $path$$inline_116_timing$$6_url$$inline_111$$.startTime = $spf$now$$();
  $path$$inline_116_timing$$6_url$$inline_111$$.fetchStart = $path$$inline_116_timing$$6_url$$inline_111$$.startTime;
  $cacheKey_cached_headers_querySep$$inline_117$$ = $spf$nav$request$getCacheKey_$$($url$$62$$, $fn$$inline_123_options$$5$$.current, null, $fn$$inline_123_options$$5$$.type, !1);
  $cacheKey_cached_headers_querySep$$inline_117$$ = $spf$nav$request$getCacheObject_$$($cacheKey_cached_headers_querySep$$inline_117$$, $fn$$inline_123_options$$5$$.current);
  $path$$inline_116_timing$$6_url$$inline_111$$.spfPrefetched = !!$cacheKey_cached_headers_querySep$$inline_117$$ && "prefetch" == $cacheKey_cached_headers_querySep$$inline_117$$.type;
  $path$$inline_116_timing$$6_url$$inline_111$$.spfCached = !!$cacheKey_cached_headers_querySep$$inline_117$$;
  if ($cacheKey_cached_headers_querySep$$inline_117$$) {
    var $fn$$inline_123_options$$5$$ = $spf$bind$$($spf$nav$request$handleResponseFromCache_$$, null, $url$$62$$, $fn$$inline_123_options$$5$$, $path$$inline_116_timing$$6_url$$inline_111$$, $cacheKey_cached_headers_querySep$$inline_117$$.key, $cacheKey_cached_headers_querySep$$inline_117$$.response), $chunking_headerId_key$$51_state$$inline_199_uid$$inline_124_xhrOpts$$;
    $chunking_headerId_key$$51_state$$inline_199_uid$$inline_124_xhrOpts$$ = window._spf_state = window._spf_state || {};
    $ident$$inline_113_requestUrl_uid$$inline_200$$ = parseInt($chunking_headerId_key$$51_state$$inline_199_uid$$inline_124_xhrOpts$$.uid, 10) || 0;
    $ident$$inline_113_requestUrl_uid$$inline_200$$++;
    $chunking_headerId_key$$51_state$$inline_199_uid$$inline_124_xhrOpts$$ = $chunking_headerId_key$$51_state$$inline_199_uid$$inline_124_xhrOpts$$.uid = $ident$$inline_113_requestUrl_uid$$inline_200$$;
    $spf$async$defers_$$[$chunking_headerId_key$$51_state$$inline_199_uid$$inline_124_xhrOpts$$] = $fn$$inline_123_options$$5$$;
    $spf$async$POSTMESSAGE_SUPPORTED_$$ ? window.postMessage($spf$async$PREFIX_$$ + $chunking_headerId_key$$51_state$$inline_199_uid$$inline_124_xhrOpts$$, "*") : window.setTimeout($spf$bind$$($spf$async$run_$$, null, $chunking_headerId_key$$51_state$$inline_199_uid$$inline_124_xhrOpts$$), 0);
    return null;
  }
  $spf$debug$debug$$("    sending XHR");
  $cacheKey_cached_headers_querySep$$inline_117$$ = {};
  if ($configHeaders_handleComplete_queryParts$$inline_115_queryVal$$inline_118$$ = $spf$config$values$$["request-headers"]) {
    for ($chunking_headerId_key$$51_state$$inline_199_uid$$inline_124_xhrOpts$$ in $configHeaders_handleComplete_queryParts$$inline_115_queryVal$$inline_118$$) {
      $hashSep$$inline_119_value$$56$$ = $configHeaders_handleComplete_queryParts$$inline_115_queryVal$$inline_118$$[$chunking_headerId_key$$51_state$$inline_199_uid$$inline_124_xhrOpts$$], $cacheKey_cached_headers_querySep$$inline_117$$[$chunking_headerId_key$$51_state$$inline_199_uid$$inline_124_xhrOpts$$] = null == $hashSep$$inline_119_value$$56$$ ? "" : $hashSep$$inline_119_value$$56$$;
    }
  }
  if ($fn$$inline_123_options$$5$$.headers) {
    for ($chunking_headerId_key$$51_state$$inline_199_uid$$inline_124_xhrOpts$$ in $fn$$inline_123_options$$5$$.headers) {
      $hashSep$$inline_119_value$$56$$ = $fn$$inline_123_options$$5$$.headers[$chunking_headerId_key$$51_state$$inline_199_uid$$inline_124_xhrOpts$$], $cacheKey_cached_headers_querySep$$inline_117$$[$chunking_headerId_key$$51_state$$inline_199_uid$$inline_124_xhrOpts$$] = null == $hashSep$$inline_119_value$$56$$ ? "" : $hashSep$$inline_119_value$$56$$;
    }
  }
  null != $fn$$inline_123_options$$5$$.$referer$ && ($cacheKey_cached_headers_querySep$$inline_117$$["X-SPF-Referer"] = $fn$$inline_123_options$$5$$.$referer$);
  null != $fn$$inline_123_options$$5$$.current && ($cacheKey_cached_headers_querySep$$inline_117$$["X-SPF-Previous"] = $fn$$inline_123_options$$5$$.current);
  if ($chunking_headerId_key$$51_state$$inline_199_uid$$inline_124_xhrOpts$$ = $spf$config$values$$["advanced-header-identifier"]) {
    $cacheKey_cached_headers_querySep$$inline_117$$["X-SPF-Request"] = $chunking_headerId_key$$51_state$$inline_199_uid$$inline_124_xhrOpts$$.replace("__type__", $fn$$inline_123_options$$5$$.type), $cacheKey_cached_headers_querySep$$inline_117$$.Accept = "application/json";
  }
  $chunking_headerId_key$$51_state$$inline_199_uid$$inline_124_xhrOpts$$ = new $spf$nav$request$Chunking_$$;
  $configHeaders_handleComplete_queryParts$$inline_115_queryVal$$inline_118$$ = $spf$bind$$($spf$nav$request$handleCompleteFromXHR_$$, null, $url$$62$$, $fn$$inline_123_options$$5$$, $path$$inline_116_timing$$6_url$$inline_111$$, $chunking_headerId_key$$51_state$$inline_199_uid$$inline_124_xhrOpts$$);
  $chunking_headerId_key$$51_state$$inline_199_uid$$inline_124_xhrOpts$$ = {headers:$cacheKey_cached_headers_querySep$$inline_117$$, $timeoutMs$:$spf$config$values$$["request-timeout"], $onHeaders$:$spf$bind$$($spf$nav$request$handleHeadersFromXHR_$$, null, $url$$62$$, $chunking_headerId_key$$51_state$$inline_199_uid$$inline_124_xhrOpts$$), $onChunk$:$spf$bind$$($spf$nav$request$handleChunkFromXHR_$$, null, $url$$62$$, $fn$$inline_123_options$$5$$, $path$$inline_116_timing$$6_url$$inline_111$$, $chunking_headerId_key$$51_state$$inline_199_uid$$inline_124_xhrOpts$$), 
  $onDone$:$configHeaders_handleComplete_queryParts$$inline_115_queryVal$$inline_118$$, $onTimeout$:$configHeaders_handleComplete_queryParts$$inline_115_queryVal$$inline_118$$};
  $spf$config$values$$["advanced-response-type-json"] && ($chunking_headerId_key$$51_state$$inline_199_uid$$inline_124_xhrOpts$$.responseType = "json");
  return "POST" == $fn$$inline_123_options$$5$$.method ? $spf$net$xhr$send$$("POST", $ident$$inline_113_requestUrl_uid$$inline_200$$, $fn$$inline_123_options$$5$$.$postData$, $chunking_headerId_key$$51_state$$inline_199_uid$$inline_124_xhrOpts$$) : $spf$net$xhr$send$$("GET", $ident$$inline_113_requestUrl_uid$$inline_200$$, null, $chunking_headerId_key$$51_state$$inline_199_uid$$inline_124_xhrOpts$$);
}
function $spf$nav$request$handleResponseFromCache_$$($url$$63$$, $options$$6$$, $timing$$7$$, $cacheKey$$1$$, $response$$5$$) {
  $spf$debug$debug$$("nav.request.handleResponseFromCache_ ", $url$$63$$, $response$$5$$);
  var $updateCache$$ = !1;
  $timing$$7$$.responseStart = $timing$$7$$.responseEnd = $spf$now$$();
  $options$$6$$.type && 0 == $options$$6$$.type.lastIndexOf("navigate", 0) && ($timing$$7$$.navigationStart = $timing$$7$$.startTime, $spf$config$values$$["cache-unified"] || ($spf$cache$remove$$($cacheKey$$1$$), $updateCache$$ = !0));
  $options$$6$$.$onPart$ && "multipart" == $response$$5$$.type && $spf$array$each$$($response$$5$$.parts, function($part$$1$$) {
    $part$$1$$.timing || ($part$$1$$.timing = {});
    $part$$1$$.timing.spfCached = !!$timing$$7$$.spfCached;
    $part$$1$$.timing.spfPrefetched = !!$timing$$7$$.spfPrefetched;
    $options$$6$$.$onPart$($url$$63$$, $part$$1$$);
  });
  $spf$nav$request$done_$$($url$$63$$, $options$$6$$, $timing$$7$$, $response$$5$$, $updateCache$$);
}
function $spf$nav$request$handleHeadersFromXHR_$$($multipart_url$$64$$, $chunking$$1$$, $xhr$$3$$) {
  $spf$debug$debug$$("nav.request.handleHeadersFromXHR_ ", $multipart_url$$64$$, $xhr$$3$$);
  $multipart_url$$64$$ = -1 != ($xhr$$3$$.getResponseHeader("X-SPF-Response-Type") || "").toLowerCase().indexOf("multipart");
  $spf$debug$debug$$("    response is", ($multipart_url$$64$$ ? "" : "non-") + "multipart");
  $chunking$$1$$.$multipart$ = $multipart_url$$64$$;
}
function $spf$nav$request$handleChunkFromXHR_$$($url$$65$$, $options$$7$$, $timing$$8$$, $chunking$$2$$, $xhr$$4$$, $chunk$$2_text$$18$$, $opt_lastDitch$$1$$) {
  $spf$debug$debug$$("nav.request.handleChunkFromXHR_ ", $url$$65$$, {extra:$chunking$$2$$.$extra$, chunk:$chunk$$2_text$$18$$});
  if ($chunking$$2$$.$multipart$) {
    $chunk$$2_text$$18$$ = $chunking$$2$$.$extra$ + $chunk$$2_text$$18$$;
    var $parsed$$;
    try {
      $parsed$$ = $spf$nav$response$parse$$($chunk$$2_text$$18$$, !0, $opt_lastDitch$$1$$);
    } catch ($err$$2$$) {
      $spf$debug$debug$$("    JSON parse failed", $chunk$$2_text$$18$$);
      $xhr$$4$$.abort();
      $options$$7$$.$onError$ && $options$$7$$.$onError$($url$$65$$, $err$$2$$, $xhr$$4$$);
      return;
    }
    $options$$7$$.$onPart$ && $spf$array$each$$($parsed$$.$parts$, function($part$$2$$) {
      $spf$debug$debug$$("    parsed part", $part$$2$$);
      $part$$2$$.timing || ($part$$2$$.timing = {});
      $part$$2$$.timing.spfCached = !!$timing$$8$$.spfCached;
      $part$$2$$.timing.spfPrefetched = !!$timing$$8$$.spfPrefetched;
      $options$$7$$.$onPart$($url$$65$$, $part$$2$$);
    });
    $chunking$$2$$.complete = $chunking$$2$$.complete.concat($parsed$$.$parts$);
    $chunking$$2$$.$extra$ = $parsed$$.$extra$;
  } else {
    $spf$debug$debug$$("    skipping non-multipart response");
  }
}
function $spf$nav$request$handleCompleteFromXHR_$$($url$$66$$, $options$$8$$, $timing$$9$$, $chunking$$3_i$$13$$, $part$$3_xhr$$5$$) {
  "json" == $part$$3_xhr$$5$$.responseType ? $spf$debug$debug$$("nav.request.handleCompleteFromXHR_ ", $url$$66$$, $part$$3_xhr$$5$$.response) : $spf$debug$debug$$("nav.request.handleCompleteFromXHR_ ", $url$$66$$, {extra:$chunking$$3_i$$13$$.$extra$, complete:$part$$3_xhr$$5$$.responseText});
  if ($part$$3_xhr$$5$$.timing) {
    for (var $navigationStart_t$$ in $part$$3_xhr$$5$$.timing) {
      $timing$$9$$[$navigationStart_t$$] = $part$$3_xhr$$5$$.timing[$navigationStart_t$$];
    }
  }
  if ($part$$3_xhr$$5$$.resourceTiming) {
    if ("load" == $options$$8$$.type) {
      for (var $key$$52_value$$57$$ in $part$$3_xhr$$5$$.resourceTiming) {
        $timing$$9$$[$key$$52_value$$57$$] = $part$$3_xhr$$5$$.resourceTiming[$key$$52_value$$57$$];
      }
    } else {
      if (window.performance && window.performance.timing && ($navigationStart_t$$ = window.performance.timing.navigationStart, $navigationStart_t$$ + $part$$3_xhr$$5$$.resourceTiming.startTime >= $timing$$9$$.startTime)) {
        for (var $metric$$ in $part$$3_xhr$$5$$.resourceTiming) {
          $key$$52_value$$57$$ = $part$$3_xhr$$5$$.resourceTiming[$metric$$], void 0 !== $key$$52_value$$57$$ && ($spf$string$endsWith$$($metric$$, "Start") || $spf$string$endsWith$$($metric$$, "End") || "startTime" == $metric$$) && ($timing$$9$$[$metric$$] = $navigationStart_t$$ + Math.round($key$$52_value$$57$$));
        }
      }
    }
  }
  "load" != $options$$8$$.type && ($timing$$9$$.navigationStart = $timing$$9$$.startTime);
  $chunking$$3_i$$13$$.complete.length && ($chunking$$3_i$$13$$.$extra$ = $spf$string$trim$$($chunking$$3_i$$13$$.$extra$), $chunking$$3_i$$13$$.$extra$ && $spf$nav$request$handleChunkFromXHR_$$($url$$66$$, $options$$8$$, $timing$$9$$, $chunking$$3_i$$13$$, $part$$3_xhr$$5$$, "", !0));
  var $parts$$4_response$$6$$;
  if ("json" == $part$$3_xhr$$5$$.responseType) {
    if (!$part$$3_xhr$$5$$.response) {
      $spf$debug$debug$$("    JSON parse failed");
      $options$$8$$.$onError$ && $options$$8$$.$onError$($url$$66$$, Error("JSON response parsing failed"), $part$$3_xhr$$5$$);
      return;
    }
    $parts$$4_response$$6$$ = $spf$nav$response$extract$$($spf$array$toArray$$($part$$3_xhr$$5$$.response));
  } else {
    try {
      $parts$$4_response$$6$$ = $spf$nav$response$parse$$($part$$3_xhr$$5$$.responseText).$parts$;
    } catch ($err$$3$$) {
      $spf$debug$debug$$("    JSON parse failed");
      $options$$8$$.$onError$ && $options$$8$$.$onError$($url$$66$$, $err$$3$$, $part$$3_xhr$$5$$);
      return;
    }
  }
  if ($options$$8$$.$onPart$ && 1 < $parts$$4_response$$6$$.length) {
    for ($chunking$$3_i$$13$$ = $chunking$$3_i$$13$$.complete.length;$chunking$$3_i$$13$$ < $parts$$4_response$$6$$.length;$chunking$$3_i$$13$$++) {
      $spf$debug$debug$$("    parsed part", $parts$$4_response$$6$$[$chunking$$3_i$$13$$]), $part$$3_xhr$$5$$ = $parts$$4_response$$6$$[$chunking$$3_i$$13$$], $part$$3_xhr$$5$$.timing || ($part$$3_xhr$$5$$.timing = {}), $part$$3_xhr$$5$$.timing.spfCached = !!$timing$$9$$.spfCached, $part$$3_xhr$$5$$.timing.spfPrefetched = !!$timing$$9$$.spfPrefetched, $options$$8$$.$onPart$($url$$66$$, $part$$3_xhr$$5$$);
    }
  }
  if (1 < $parts$$4_response$$6$$.length) {
    var $cacheType$$;
    $spf$array$each$$($parts$$4_response$$6$$, function($part$$4$$) {
      $part$$4$$.cacheType && ($cacheType$$ = $part$$4$$.cacheType);
    });
    $parts$$4_response$$6$$ = {parts:$parts$$4_response$$6$$, type:"multipart"};
    $cacheType$$ && ($parts$$4_response$$6$$.cacheType = $cacheType$$);
  } else {
    $parts$$4_response$$6$$ = 1 == $parts$$4_response$$6$$.length ? $parts$$4_response$$6$$[0] : {};
  }
  $spf$nav$request$done_$$($url$$66$$, $options$$8$$, $timing$$9$$, $parts$$4_response$$6$$, !0);
}
function $spf$nav$request$done_$$($url$$67$$, $options$$9$$, $timing$$10$$, $response$$7$$, $cache_cacheKey$$2$$) {
  $spf$debug$debug$$("nav.request.done_", $url$$67$$, $options$$9$$, $timing$$10$$, $response$$7$$, $cache_cacheKey$$2$$);
  if ($cache_cacheKey$$2$$ && "POST" != $options$$9$$.method && ($cache_cacheKey$$2$$ = $spf$nav$request$getCacheKey_$$($url$$67$$, $options$$9$$.current, $response$$7$$.cacheType, $options$$9$$.type, !0))) {
    $response$$7$$.cacheKey = $cache_cacheKey$$2$$;
    var $data$$inline_203_unit$$inline_224$$ = {response:$response$$7$$, type:$options$$9$$.type || ""}, $lifetime$$inline_204$$ = parseInt($spf$config$values$$["cache-lifetime"], 10), $JSCompiler_temp_const$$220_max$$inline_205$$ = parseInt($spf$config$values$$["cache-max"], 10);
    0 >= $lifetime$$inline_204$$ || 0 >= $JSCompiler_temp_const$$220_max$$inline_205$$ || ($JSCompiler_temp_const$$220_max$$inline_205$$ = $spf$cache$storage_$$(), $data$$inline_203_unit$$inline_224$$ = {data:$data$$inline_203_unit$$inline_224$$, life:$lifetime$$inline_204$$, time:$spf$now$$(), count:0}, $spf$cache$updateCount_$$($data$$inline_203_unit$$inline_224$$), $JSCompiler_temp_const$$220_max$$inline_205$$[$cache_cacheKey$$2$$] = $data$$inline_203_unit$$inline_224$$, setTimeout($spf$cache$collect$$, 
    1E3));
  }
  $response$$7$$.timing = $timing$$10$$;
  $options$$9$$.$onSuccess$ && $options$$9$$.$onSuccess$($url$$67$$, $response$$7$$);
}
function $spf$nav$request$getCacheKey_$$($absoluteUrl_url$$68$$, $opt_current$$, $opt_cacheType$$, $opt_requestType$$, $opt_set$$) {
  $absoluteUrl_url$$68$$ = $spf$url$absolute$$($absoluteUrl_url$$68$$);
  var $cacheKey$$3$$;
  $spf$config$values$$["cache-unified"] ? $cacheKey$$3$$ = $absoluteUrl_url$$68$$ : "navigate-back" == $opt_requestType$$ || "navigate-forward" == $opt_requestType$$ ? $cacheKey$$3$$ = "history " + $absoluteUrl_url$$68$$ : "navigate" == $opt_requestType$$ ? $cacheKey$$3$$ = ($opt_set$$ ? "history " : "prefetch ") + $absoluteUrl_url$$68$$ : "prefetch" == $opt_requestType$$ && ($cacheKey$$3$$ = $opt_set$$ ? "prefetch " + $absoluteUrl_url$$68$$ : "");
  $opt_current$$ && "url" == $opt_cacheType$$ ? $cacheKey$$3$$ += " previous " + $opt_current$$ : $opt_current$$ && "path" == $opt_cacheType$$ && ($cacheKey$$3$$ += " previous " + $spf$url$utils$$($opt_current$$).pathname);
  return $cacheKey$$3$$ || "";
}
function $spf$nav$request$getCacheObject_$$($cacheKey$$4$$, $opt_current$$1$$) {
  var $keys$$ = [];
  $opt_current$$1$$ && ($keys$$.push($cacheKey$$4$$ + " previous " + $opt_current$$1$$), $keys$$.push($cacheKey$$4$$ + " previous " + $spf$url$utils$$($opt_current$$1$$).pathname));
  $keys$$.push($cacheKey$$4$$);
  var $cacheValue$$ = null;
  $spf$array$some$$($keys$$, function($key$$53$$) {
    var $obj$$21_storage$$inline_131_unit$$inline_132$$;
    a: {
      $obj$$21_storage$$inline_131_unit$$inline_132$$ = $spf$cache$storage_$$();
      if ($key$$53$$ in $obj$$21_storage$$inline_131_unit$$inline_132$$) {
        $obj$$21_storage$$inline_131_unit$$inline_132$$ = $obj$$21_storage$$inline_131_unit$$inline_132$$[$key$$53$$];
        if ($spf$cache$valid_$$($obj$$21_storage$$inline_131_unit$$inline_132$$)) {
          $spf$cache$updateCount_$$($obj$$21_storage$$inline_131_unit$$inline_132$$);
          $obj$$21_storage$$inline_131_unit$$inline_132$$ = $obj$$21_storage$$inline_131_unit$$inline_132$$.data;
          break a;
        }
        $spf$cache$remove$$($key$$53$$);
      }
      $obj$$21_storage$$inline_131_unit$$inline_132$$ = void 0;
    }
    $obj$$21_storage$$inline_131_unit$$inline_132$$ && ($cacheValue$$ = {key:$key$$53$$, response:$obj$$21_storage$$inline_131_unit$$inline_132$$.response, type:$obj$$21_storage$$inline_131_unit$$inline_132$$.type});
    return!!$obj$$21_storage$$inline_131_unit$$inline_132$$;
  });
  return $cacheValue$$;
}
function $spf$nav$request$Chunking_$$() {
  this.$multipart$ = !1;
  this.$extra$ = "";
  this.complete = [];
}
;function $spf$nav$getAncestorWithLinkClass_$$($element$$8$$) {
  return $spf$dom$getAncestor$$($element$$8$$, function($node$$8$$) {
    return $spf$dom$classlist$contains$$($node$$8$$, $spf$config$values$$["link-class"]);
  });
}
function $spf$nav$getAncestorWithNoLinkClass_$$($element$$9$$) {
  return $spf$dom$getAncestor$$($element$$9$$, function($node$$9$$) {
    return $spf$dom$classlist$contains$$($node$$9$$, $spf$config$values$$["nolink-class"]);
  });
}
function $spf$nav$getAncestorWithHref_$$($element$$10$$, $parent$$3$$) {
  return $spf$dom$getAncestor$$($element$$10$$, function($node$$10$$) {
    return $node$$10$$.href && "img" != $node$$10$$.tagName.toLowerCase();
  }, $parent$$3$$);
}
function $spf$nav$getEventURL_$$($evt$$26_target$$39$$) {
  if ($evt$$26_target$$39$$.metaKey || $evt$$26_target$$39$$.altKey || $evt$$26_target$$39$$.ctrlKey || $evt$$26_target$$39$$.shiftKey) {
    return $spf$debug$debug$$("    ignoring click with modifier key"), null;
  }
  if (0 < $evt$$26_target$$39$$.button) {
    return $spf$debug$debug$$("    ignoring click with alternate button"), null;
  }
  var $linkEl$$ = $spf$nav$getAncestorWithLinkClass_$$($evt$$26_target$$39$$.target);
  if (!$linkEl$$) {
    return $spf$debug$debug$$("    ignoring click without link class"), null;
  }
  if ($spf$config$values$$["nolink-class"] && $spf$nav$getAncestorWithNoLinkClass_$$($evt$$26_target$$39$$.target)) {
    return $spf$debug$debug$$("    ignoring click with nolink class"), null;
  }
  $evt$$26_target$$39$$ = $spf$nav$getAncestorWithHref_$$($evt$$26_target$$39$$.target, $linkEl$$);
  return $evt$$26_target$$39$$ ? $evt$$26_target$$39$$.href : ($spf$debug$debug$$("    ignoring click without href parent"), null);
}
function $spf$nav$isAllowed_$$($url$$69$$) {
  return $spf$url$utils$$($url$$69$$).origin != $spf$url$utils$$(window.location.href).origin ? ($spf$debug$warn$$("destination not same-origin"), !1) : !0;
}
function $spf$nav$isEligible_$$() {
  if (!$spf$state$values_$$["nav-init"]) {
    return $spf$debug$warn$$("navigation not initialized"), !1;
  }
  var $age$$1_count$$9_timestamp$$3$$ = parseInt($spf$state$values_$$["nav-counter"], 10) || 0;
  $age$$1_count$$9_timestamp$$3$$++;
  var $lifetime$$3_limit$$ = parseInt($spf$config$values$$["navigate-limit"], 10), $lifetime$$3_limit$$ = isNaN($lifetime$$3_limit$$) ? Infinity : $lifetime$$3_limit$$;
  if ($age$$1_count$$9_timestamp$$3$$ > $lifetime$$3_limit$$) {
    return $spf$debug$warn$$("navigation limit reached"), !1;
  }
  $age$$1_count$$9_timestamp$$3$$ = parseInt($spf$state$values_$$["nav-init-time"], 10);
  $age$$1_count$$9_timestamp$$3$$--;
  $age$$1_count$$9_timestamp$$3$$ = $spf$now$$() - $age$$1_count$$9_timestamp$$3$$;
  $lifetime$$3_limit$$ = parseInt($spf$config$values$$["navigate-lifetime"], 10);
  $lifetime$$3_limit$$ = isNaN($lifetime$$3_limit$$) ? Infinity : $lifetime$$3_limit$$;
  return $age$$1_count$$9_timestamp$$3$$ > $lifetime$$3_limit$$ ? ($spf$debug$warn$$("navigation lifetime reached"), !1) : !0;
}
function $spf$nav$isNavigable_$$($url$$71$$, $opt_current$$2$$) {
  var $absoluteCurrent_current$$2$$ = $opt_current$$2$$ || window.location.href;
  if (-1 != $url$$71$$.indexOf("#")) {
    var $absoluteUrl$$1$$ = $spf$url$absolute$$($url$$71$$), $absoluteCurrent_current$$2$$ = $spf$url$absolute$$($absoluteCurrent_current$$2$$);
    if ($absoluteUrl$$1$$ == $absoluteCurrent_current$$2$$) {
      return $spf$debug$debug$$("    not handling hash-based navigation"), !1;
    }
  }
  return!0;
}
function $spf$nav$handleClick_$$($evt$$27$$) {
  $spf$debug$debug$$("nav.handleClick ", "evt=", $evt$$27$$);
  if (!$evt$$27$$.defaultPrevented) {
    var $url$$72$$ = $spf$nav$getEventURL_$$($evt$$27$$);
    $url$$72$$ && ($url$$72$$ = $spf$url$appendPersistentParameters$$($url$$72$$), $spf$nav$isAllowed_$$($url$$72$$) && $spf$nav$isEligible_$$() && $spf$dispatch$$("spfclick", {url:$url$$72$$, target:$evt$$27$$.target}) && ($spf$nav$navigate_$$($url$$72$$, {}, new $spf$nav$Info$$), $evt$$27$$.preventDefault()));
  }
}
function $spf$nav$handleMouseDown_$$($evt$$28$$) {
  $spf$debug$debug$$("nav.handleMouseDown ", "evt=", $evt$$28$$);
  var $url$$73$$ = $spf$nav$getEventURL_$$($evt$$28$$);
  $url$$73$$ && setTimeout(function() {
    $spf$nav$prefetch$$($url$$73$$);
  }, 0);
}
function $spf$nav$handleScroll_$$() {
  var $position_position$$inline_134$$;
  $position_position$$inline_134$$ = $spf$state$values_$$["nav-scroll-position"] || null;
  var $url$$inline_135$$ = $spf$state$values_$$["nav-scroll-url"] || "";
  $position_position$$inline_134$$ = $position_position$$inline_134$$ && $url$$inline_135$$ == window.location.href ? $position_position$$inline_134$$ : null;
  $spf$nav$clearScrollTempPosition_$$();
  $position_position$$inline_134$$ && ($spf$debug$debug$$("    returning to saved scroll temp position", $position_position$$inline_134$$), window.scroll.apply(null, $position_position$$inline_134$$));
}
function $spf$nav$handleHistory_$$($url$$74$$, $opt_state$$3$$) {
  $spf$debug$debug$$("nav.handleHistory ", "(url=", $url$$74$$, "state=", $opt_state$$3$$, ")");
  var $info$$1$$ = new $spf$nav$Info$$({current:$opt_state$$3$$ && $opt_state$$3$$["spf-current"], history:!0, position:$opt_state$$3$$ && $opt_state$$3$$["spf-position"], $referer$:$opt_state$$3$$ && $opt_state$$3$$["spf-referer"], reverse:!(!$opt_state$$3$$ || !$opt_state$$3$$["spf-back"])}), $position$$inline_137_reloadId$$ = $spf$config$values$$["reload-identifier"];
  $position$$inline_137_reloadId$$ && ($url$$74$$ = $spf$url$removeParameters$$($url$$74$$, [$position$$inline_137_reloadId$$]));
  $spf$nav$isAllowed_$$($url$$74$$) ? $spf$nav$isEligible_$$() ? $spf$dispatch$$("spfhistory", {url:$url$$74$$, referer:$info$$1$$.$referer$, previous:$info$$1$$.current}) && ($info$$1$$.position && ($position$$inline_137_reloadId$$ = [window.pageXOffset, window.pageYOffset], $spf$debug$debug$$("    saving scroll temp position", $position$$inline_137_reloadId$$), $spf$state$set$$("nav-scroll-position", $position$$inline_137_reloadId$$), $spf$state$set$$("nav-scroll-url", window.location.href)), $spf$nav$navigate_$$($url$$74$$, 
  {}, $info$$1$$)) : $spf$nav$reload$$($url$$74$$, $spf$nav$ReloadReason$INELIGIBLE$$) : $spf$nav$reload$$($url$$74$$, $spf$nav$ReloadReason$FORBIDDEN$$);
}
function $spf$nav$navigate_$$($url$$76$$, $options$$13_xhr$$inline_156$$, $info$$3$$) {
  $spf$debug$info$$("nav.navigate_ ", $url$$76$$, $options$$13_xhr$$inline_156$$, $info$$3$$);
  $spf$nav$cancel$$();
  if ($spf$nav$isNavigable_$$($url$$76$$, $info$$3$$.current)) {
    if ($spf$nav$dispatchRequest_$$($url$$76$$, $info$$3$$.$referer$, $info$$3$$.current, $options$$13_xhr$$inline_156$$)) {
      $spf$state$set$$("nav-counter", (parseInt($spf$state$values_$$["nav-counter"], 10) || 0) + 1);
      $spf$nav$cancelAllPrefetchesExcept$$($url$$76$$);
      var $absoluteUrl$$2_handleError$$inline_153_prefetchXhr_preprocessKey$$inline_147$$ = $spf$url$absolute$$($url$$76$$), $handlePart$$inline_154_opt_skipKey$$inline_139_promoteKey$$inline_148$$ = "preprocess " + $spf$url$absolute$$($absoluteUrl$$2_handleError$$inline_153_prefetchXhr_preprocessKey$$inline_147$$), $handleSuccess$$inline_155_key$$inline_142$$;
      for ($handleSuccess$$inline_155_key$$inline_142$$ in $spf$tasks$queues_$$) {
        $handlePart$$inline_154_opt_skipKey$$inline_139_promoteKey$$inline_148$$ != $handleSuccess$$inline_155_key$$inline_142$$ && 0 == $handleSuccess$$inline_155_key$$inline_142$$.lastIndexOf("preprocess", 0) && $spf$tasks$cancel$$($handleSuccess$$inline_155_key$$inline_142$$);
      }
      $absoluteUrl$$2_handleError$$inline_153_prefetchXhr_preprocessKey$$inline_147$$ = $spf$nav$prefetches_$$()[$absoluteUrl$$2_handleError$$inline_153_prefetchXhr_preprocessKey$$inline_147$$];
      $spf$state$set$$("nav-request", $absoluteUrl$$2_handleError$$inline_153_prefetchXhr_preprocessKey$$inline_147$$);
      $spf$state$set$$("nav-promote", null);
      $spf$state$set$$("nav-promote-time", null);
      $absoluteUrl$$2_handleError$$inline_153_prefetchXhr_preprocessKey$$inline_147$$ && 4 != $absoluteUrl$$2_handleError$$inline_153_prefetchXhr_preprocessKey$$inline_147$$.readyState ? ($spf$debug$debug$$("nav.navigatePromotePrefetch_ ", $url$$76$$), $absoluteUrl$$2_handleError$$inline_153_prefetchXhr_preprocessKey$$inline_147$$ = "preprocess " + $spf$url$absolute$$($url$$76$$), $handlePart$$inline_154_opt_skipKey$$inline_139_promoteKey$$inline_148$$ = "promote " + $spf$url$absolute$$($url$$76$$), 
      $spf$state$set$$("nav-promote", $url$$76$$), $spf$state$set$$("nav-promote-time", $spf$now$$()), $spf$tasks$cancel$$($absoluteUrl$$2_handleError$$inline_153_prefetchXhr_preprocessKey$$inline_147$$), $spf$tasks$run$$($handlePart$$inline_154_opt_skipKey$$inline_139_promoteKey$$inline_148$$, !0), $info$$3$$.history || $spf$nav$navigateAddHistory_$$($url$$76$$, $info$$3$$.$referer$, $spf$bind$$($spf$nav$handleNavigateError_$$, null, $options$$13_xhr$$inline_156$$))) : ($absoluteUrl$$2_handleError$$inline_153_prefetchXhr_preprocessKey$$inline_147$$ = 
      $spf$bind$$($spf$nav$handleNavigateError_$$, null, $options$$13_xhr$$inline_156$$), $handlePart$$inline_154_opt_skipKey$$inline_139_promoteKey$$inline_148$$ = $spf$bind$$($spf$nav$handleNavigatePart_$$, null, $options$$13_xhr$$inline_156$$, $info$$3$$), $handleSuccess$$inline_155_key$$inline_142$$ = $spf$bind$$($spf$nav$handleNavigateSuccess_$$, null, $options$$13_xhr$$inline_156$$, $info$$3$$), $spf$config$values$$["advanced-navigate-persist-timing"] || $spf$nav$clearResourceTimings_$$(), 
      $info$$3$$.type = "navigate", $info$$3$$.history && ($info$$3$$.type += $info$$3$$.reverse ? "-back" : "-forward"), $options$$13_xhr$$inline_156$$ = $spf$nav$request$send$$($url$$76$$, {method:$options$$13_xhr$$inline_156$$.method, headers:$options$$13_xhr$$inline_156$$.headers, $onPart$:$handlePart$$inline_154_opt_skipKey$$inline_139_promoteKey$$inline_148$$, $onError$:$absoluteUrl$$2_handleError$$inline_153_prefetchXhr_preprocessKey$$inline_147$$, $onSuccess$:$handleSuccess$$inline_155_key$$inline_142$$, 
      $postData$:$options$$13_xhr$$inline_156$$.postData, type:$info$$3$$.type, current:$info$$3$$.current, $referer$:$info$$3$$.$referer$}), $spf$state$set$$("nav-request", $options$$13_xhr$$inline_156$$), $info$$3$$.history || $spf$nav$navigateAddHistory_$$($url$$76$$, $info$$3$$.$referer$, $absoluteUrl$$2_handleError$$inline_153_prefetchXhr_preprocessKey$$inline_147$$));
    } else {
      $spf$nav$reload$$($url$$76$$, $spf$nav$ReloadReason$REQUEST_CANCELED$$);
    }
  } else {
    $spf$debug$debug$$("non-navigable, just scroll"), $info$$3$$.history || $spf$nav$navigateAddHistory_$$($url$$76$$, $info$$3$$.$referer$, $spf$bind$$($spf$nav$handleNavigateError_$$, null, $options$$13_xhr$$inline_156$$)), $spf$nav$navigateScroll_$$($url$$76$$, $info$$3$$);
  }
}
function $spf$nav$navigateScroll_$$($url$$79$$, $info$$6$$) {
  if ($info$$6$$.position) {
    $spf$debug$debug$$("    clearing scroll temp position"), $spf$nav$clearScrollTempPosition_$$(), $spf$debug$debug$$("    scrolling to position", $info$$6$$.position), window.scroll.apply(null, $info$$6$$.position), $info$$6$$.$scrolled$ = !0;
  } else {
    var $result$$11$$ = $spf$string$partition$$($url$$79$$, "#");
    if ($result$$11$$[2]) {
      var $el$$14$$ = document.getElementById($result$$11$$[2]);
      $el$$14$$ && ($spf$debug$debug$$("    clearing scroll temp position"), $spf$nav$clearScrollTempPosition_$$(), $spf$debug$debug$$("    scrolling into view", $result$$11$$[2]), $el$$14$$.scrollIntoView(), $info$$6$$.$scrolled$ = !0);
    } else {
      $info$$6$$.$scrolled$ || ($spf$debug$debug$$("    clearing scroll temp position"), $spf$nav$clearScrollTempPosition_$$(), $spf$debug$debug$$("    scrolling to top"), window.scroll(0, 0), $info$$6$$.$scrolled$ = !0);
    }
  }
}
function $spf$nav$navigateAddHistory_$$($url$$80$$, $opt_state$$inline_159_referer$$, $handleError$$3$$) {
  try {
    var $position$$1$$ = [window.pageXOffset, window.pageYOffset], $updateState$$ = {"spf-position":$position$$1$$};
    $spf$debug$debug$$("    updating history to scroll position", $position$$1$$);
    $spf$history$replace$$(null, $updateState$$);
    $spf$url$absolute$$($url$$80$$, !0) != window.location.href && ($opt_state$$inline_159_referer$$ = {"spf-referer":$opt_state$$inline_159_referer$$}, $spf$debug$info$$("history.add ", $url$$80$$), $spf$history$push_$$(!1, $url$$80$$, $opt_state$$inline_159_referer$$, void 0));
  } catch ($err$$4$$) {
    $spf$nav$cancel$$(), $spf$debug$error$$("error caught, redirecting ", "(url=", $url$$80$$, "err=", $err$$4$$, ")"), $handleError$$3$$($url$$80$$, $err$$4$$);
  }
}
function $spf$nav$handleNavigateError_$$($options$$16$$, $url$$81$$, $err$$5$$, $opt_xhr$$) {
  $spf$debug$warn$$("navigate error", "(url=", $url$$81$$, ")");
  $spf$state$set$$("nav-request", null);
  $spf$nav$dispatchError_$$($url$$81$$, $err$$5$$, $options$$16$$, void 0, $opt_xhr$$) && $spf$nav$reload$$($url$$81$$, $spf$nav$ReloadReason$ERROR$$, $err$$5$$);
}
function $spf$nav$handleNavigatePart_$$($options$$17$$, $info$$7$$, $url$$82$$, $partial$$) {
  if ($spf$nav$dispatchPartProcess_$$($url$$82$$, $partial$$, $options$$17$$)) {
    if ($partial$$.reload) {
      $spf$nav$reload$$($url$$82$$, $spf$nav$ReloadReason$RESPONSE_RECEIVED$$);
    } else {
      if ($partial$$.redirect) {
        $spf$nav$handleNavigateRedirect_$$($options$$17$$, $partial$$.redirect);
      } else {
        try {
          $spf$nav$response$process$$($url$$82$$, $partial$$, $info$$7$$, function() {
            $spf$nav$dispatchPartDone_$$($url$$82$$, $partial$$, $options$$17$$);
          });
        } catch ($err$$6$$) {
          $spf$debug$debug$$("    failed to process part", $partial$$), $spf$nav$handleNavigateError_$$($options$$17$$, $url$$82$$, $err$$6$$);
        }
      }
    }
  } else {
    $spf$nav$reload$$($url$$82$$, $spf$nav$ReloadReason$PART_PROCESS_CANCELED$$);
  }
}
function $spf$nav$handleNavigateSuccess_$$($options$$18$$, $info$$8$$, $url$$83$$, $response$$9$$) {
  $spf$state$set$$("nav-request", null);
  if ($spf$state$values_$$["nav-promote"] == $info$$8$$.$original$) {
    var $timing$$11$$ = $response$$9$$.timing || {};
    $timing$$11$$.navigationStart = $spf$state$values_$$["nav-promote-time"];
    $timing$$11$$.spfPrefetched = !0;
  }
  var $multipart$$1$$ = "multipart" == $response$$9$$.type;
  if (!$multipart$$1$$) {
    if (!$spf$nav$dispatchProcess_$$($url$$83$$, $response$$9$$, $options$$18$$)) {
      $spf$nav$reload$$($url$$83$$, $spf$nav$ReloadReason$PROCESS_CANCELED$$);
      return;
    }
    if ($response$$9$$.reload) {
      $spf$nav$reload$$($url$$83$$, $spf$nav$ReloadReason$RESPONSE_RECEIVED$$);
      return;
    }
    if ($response$$9$$.redirect) {
      $spf$nav$handleNavigateRedirect_$$($options$$18$$, $response$$9$$.redirect);
      return;
    }
  }
  try {
    $spf$nav$response$process$$($url$$83$$, $multipart$$1$$ ? {} : $response$$9$$, $info$$8$$, function() {
      var $name$$80$$ = $response$$9$$.name || "";
      $multipart$$1$$ && $spf$array$each$$($response$$9$$.parts, function($part$$5$$) {
        $name$$80$$ = $part$$5$$.name || $name$$80$$;
      });
      $spf$dom$dataset$set$$($name$$80$$);
      $spf$nav$navigateScroll_$$($url$$83$$, $info$$8$$);
      $spf$nav$dispatchDone_$$($url$$83$$, $response$$9$$, $options$$18$$);
    });
  } catch ($err$$7$$) {
    $spf$debug$debug$$("    failed to process response", $response$$9$$), $spf$nav$handleNavigateError_$$($options$$18$$, $url$$83$$, $err$$7$$);
  }
}
function $spf$nav$handleNavigateRedirect_$$($options$$19$$, $redirectUrl$$) {
  try {
    $redirectUrl$$ += window.location.hash, $spf$history$replace$$($redirectUrl$$, null, !0);
  } catch ($err$$8$$) {
    $spf$nav$cancel$$(), $spf$debug$error$$("error caught, reloading ", "(url=", $redirectUrl$$, "err=", $err$$8$$, ")"), $spf$nav$handleNavigateError_$$($options$$19$$, $redirectUrl$$, $err$$8$$);
  }
}
function $spf$nav$cancel$$() {
  var $xhr$$7$$ = $spf$state$values_$$["nav-request"];
  $xhr$$7$$ && ($spf$debug$warn$$("aborting previous navigate ", "xhr=", $xhr$$7$$), $xhr$$7$$.abort(), $spf$state$set$$("nav-request", null));
}
function $spf$nav$callback$$($fn$$20$$, $var_args$$36$$) {
  var $args$$4_val$$5$$;
  $fn$$20$$ && ($args$$4_val$$5$$ = Array.prototype.slice.call(arguments), $args$$4_val$$5$$[0] = $fn$$20$$, $args$$4_val$$5$$ = $spf$execute$$.apply(null, $args$$4_val$$5$$), $args$$4_val$$5$$ instanceof Error && $spf$debug$error$$("error in callback (url=", window.location.href, "err=", $args$$4_val$$5$$, ")"));
  return!1 !== $args$$4_val$$5$$;
}
function $spf$nav$reload$$($url$$84$$, $reason$$, $err$$9_opt_err$$) {
  $err$$9_opt_err$$ = $err$$9_opt_err$$ ? $err$$9_opt_err$$.message : "";
  $spf$debug$warn$$("reloading (", "url=", $url$$84$$, "reason=", $reason$$, "error=", $err$$9_opt_err$$, ")");
  $spf$nav$cancel$$();
  $spf$nav$cancelAllPrefetchesExcept$$();
  var $logReason$$ = $reason$$;
  $err$$9_opt_err$$ && ($logReason$$ += " Message: " + $err$$9_opt_err$$);
  $spf$dispatch$$("spfreload", {url:$url$$84$$, reason:$logReason$$});
  var $current$$3$$ = window.location.href;
  $spf$config$values$$["experimental-remove-history"] && $current$$3$$ == $url$$84$$ && ($spf$state$set$$("history-ignore-pop", !0), window.history.back());
  setTimeout(function() {
    var $reloadId$$1_url$$inline_166$$ = $spf$config$values$$["reload-identifier"];
    if ($reloadId$$1_url$$inline_166$$) {
      var $params$$ = {};
      $params$$[$reloadId$$1_url$$inline_166$$] = encodeURIComponent($reason$$);
      var $reloadId$$1_url$$inline_166$$ = $url$$84$$, $result$$inline_168$$ = $spf$string$partition$$($reloadId$$1_url$$inline_166$$, "#"), $reloadId$$1_url$$inline_166$$ = $result$$inline_168$$[0], $delim$$inline_169$$ = -1 != $reloadId$$1_url$$inline_166$$.indexOf("?") ? "&" : "?", $key$$inline_170$$;
      for ($key$$inline_170$$ in $params$$) {
        $reloadId$$1_url$$inline_166$$ += $delim$$inline_169$$ + $key$$inline_170$$, $params$$[$key$$inline_170$$] && ($reloadId$$1_url$$inline_166$$ += "=" + $params$$[$key$$inline_170$$]), $delim$$inline_169$$ = "&";
      }
      $url$$84$$ = $reloadId$$1_url$$inline_166$$ + $result$$inline_168$$[1] + $result$$inline_168$$[2];
    }
    window.location.href = $url$$84$$;
    $spf$nav$isNavigable_$$($url$$84$$, $current$$3$$) || window.location.reload();
  }, 0);
}
function $spf$nav$load_$$($url$$86$$, $options$$21$$, $info$$10$$) {
  $spf$debug$info$$("nav.load ", $url$$86$$, $options$$21$$, $info$$10$$);
  $info$$10$$.$original$ = $info$$10$$.$original$ || $url$$86$$;
  if ($spf$nav$dispatchRequest_$$($url$$86$$, void 0, void 0, $options$$21$$, !0)) {
    var $handleError$$4$$ = $spf$bind$$($spf$nav$handleLoadError_$$, null, !1, $options$$21$$, $info$$10$$), $handlePart$$1$$ = $spf$bind$$($spf$nav$handleLoadPart_$$, null, !1, $options$$21$$, $info$$10$$), $handleSuccess$$1$$ = $spf$bind$$($spf$nav$handleLoadSuccess_$$, null, !1, $options$$21$$, $info$$10$$);
    $info$$10$$.type = "load";
    $spf$nav$request$send$$($url$$86$$, {method:$options$$21$$.method, headers:$options$$21$$.headers, $onPart$:$handlePart$$1$$, $onError$:$handleError$$4$$, $onSuccess$:$handleSuccess$$1$$, $postData$:$options$$21$$.postData, type:$info$$10$$.type});
  }
}
function $spf$nav$prefetch$$($url$$87$$, $opt_options$$21$$) {
  $url$$87$$ = $spf$url$appendPersistentParameters$$($url$$87$$);
  $spf$nav$prefetch_$$($url$$87$$, $opt_options$$21$$ || {}, new $spf$nav$Info$$);
}
function $spf$nav$prefetch_$$($absoluteUrl$$inline_174_url$$88$$, $options$$23_xhr$$inline_173$$, $info$$12$$) {
  $spf$debug$info$$("nav.prefetch ", $absoluteUrl$$inline_174_url$$88$$, $options$$23_xhr$$inline_173$$, $info$$12$$);
  $info$$12$$.$original$ = $info$$12$$.$original$ || $absoluteUrl$$inline_174_url$$88$$;
  if ($spf$nav$dispatchRequest_$$($absoluteUrl$$inline_174_url$$88$$, void 0, void 0, $options$$23_xhr$$inline_173$$, !0)) {
    var $handleError$$5$$ = $spf$bind$$($spf$nav$handleLoadError_$$, null, !0, $options$$23_xhr$$inline_173$$, $info$$12$$), $handlePart$$2$$ = $spf$bind$$($spf$nav$handleLoadPart_$$, null, !0, $options$$23_xhr$$inline_173$$, $info$$12$$), $handleSuccess$$2$$ = $spf$bind$$($spf$nav$handleLoadSuccess_$$, null, !0, $options$$23_xhr$$inline_173$$, $info$$12$$);
    $info$$12$$.type = "prefetch";
    $options$$23_xhr$$inline_173$$ = $spf$nav$request$send$$($absoluteUrl$$inline_174_url$$88$$, {method:$options$$23_xhr$$inline_173$$.method, headers:$options$$23_xhr$$inline_173$$.headers, $onPart$:$handlePart$$2$$, $onError$:$handleError$$5$$, $onSuccess$:$handleSuccess$$2$$, $postData$:$options$$23_xhr$$inline_173$$.postData, type:$info$$12$$.type, current:$info$$12$$.current});
    $spf$debug$debug$$("nav.addPrefetch ", $absoluteUrl$$inline_174_url$$88$$, $options$$23_xhr$$inline_173$$);
    $absoluteUrl$$inline_174_url$$88$$ = $spf$url$absolute$$($absoluteUrl$$inline_174_url$$88$$);
    $spf$nav$prefetches_$$()[$absoluteUrl$$inline_174_url$$88$$] = $options$$23_xhr$$inline_173$$;
  }
}
function $spf$nav$handleLoadError_$$($isPrefetch$$, $options$$24$$, $info$$13$$, $url$$89$$, $err$$10$$) {
  $spf$debug$warn$$($isPrefetch$$ ? "prefetch" : "load", "error", "(url=", $url$$89$$, ")");
  $isPrefetch$$ && $spf$nav$removePrefetch$$($url$$89$$);
  $isPrefetch$$ && $spf$state$values_$$["nav-promote"] == $info$$13$$.$original$ ? $spf$nav$handleNavigateError_$$($options$$24$$, $url$$89$$, $err$$10$$) : $spf$nav$dispatchError_$$($url$$89$$, $err$$10$$, $options$$24$$, !0);
}
function $spf$nav$handleLoadPart_$$($isPrefetch$$1$$, $options$$25$$, $info$$14$$, $url$$90$$, $partial$$1$$) {
  if ($spf$nav$dispatchPartProcess_$$($url$$90$$, $partial$$1$$, $options$$25$$, !0)) {
    if ($partial$$1$$.reload) {
      if (!$isPrefetch$$1$$) {
        return;
      }
      if ($spf$state$values_$$["nav-promote"] == $info$$14$$.$original$) {
        $spf$nav$reload$$($url$$90$$, $spf$nav$ReloadReason$RESPONSE_RECEIVED$$);
        return;
      }
    }
    if ($partial$$1$$.redirect) {
      $spf$nav$handleLoadRedirect_$$($isPrefetch$$1$$, $options$$25$$, $info$$14$$, $partial$$1$$.redirect);
    } else {
      if ($isPrefetch$$1$$) {
        var $fn$$21$$ = $spf$bind$$($spf$nav$handleNavigatePart_$$, null, $options$$25$$, $info$$14$$, $url$$90$$, $partial$$1$$), $promoteKey$$1$$ = "promote " + $spf$url$absolute$$($info$$14$$.$original$);
        $spf$tasks$add$$($promoteKey$$1$$, $fn$$21$$);
        if ($spf$state$values_$$["nav-promote"] == $info$$14$$.$original$) {
          $spf$tasks$run$$($promoteKey$$1$$, !0);
          return;
        }
      }
      ($isPrefetch$$1$$ ? $spf$nav$response$preprocess$$ : $spf$nav$response$process$$)($url$$90$$, $partial$$1$$, $info$$14$$, function() {
        $spf$nav$dispatchPartDone_$$($url$$90$$, $partial$$1$$, $options$$25$$, !0);
      });
    }
  }
}
function $spf$nav$handleLoadSuccess_$$($isPrefetch$$2$$, $options$$26$$, $info$$15$$, $url$$91$$, $response$$10$$) {
  var $multipart$$2$$ = "multipart" == $response$$10$$.type;
  if (!$multipart$$2$$) {
    if (!$spf$nav$dispatchProcess_$$($url$$91$$, $response$$10$$, $options$$26$$, !0)) {
      $spf$nav$reload$$($url$$91$$, $spf$nav$ReloadReason$PROCESS_CANCELED$$);
      return;
    }
    if ($response$$10$$.reload) {
      if (!$isPrefetch$$2$$) {
        return;
      }
      if ($spf$state$values_$$["nav-promote"] == $info$$15$$.$original$) {
        $spf$nav$reload$$($url$$91$$, $spf$nav$ReloadReason$RESPONSE_RECEIVED$$);
        return;
      }
    }
    if ($response$$10$$.redirect) {
      $spf$nav$handleLoadRedirect_$$($isPrefetch$$2$$, $options$$26$$, $info$$15$$, $response$$10$$.redirect);
      return;
    }
  }
  var $processFn$$1_promoteKey$$2$$ = "promote " + $spf$url$absolute$$($info$$15$$.$original$);
  if ($isPrefetch$$2$$) {
    $spf$nav$removePrefetch$$($url$$91$$);
    if ($spf$state$values_$$["nav-promote"] == $info$$15$$.$original$) {
      $spf$tasks$add$$($processFn$$1_promoteKey$$2$$, $spf$bind$$($spf$nav$handleNavigateSuccess_$$, null, $options$$26$$, $info$$15$$, $url$$91$$, $response$$10$$));
      $spf$tasks$run$$($processFn$$1_promoteKey$$2$$, !0);
      return;
    }
    $spf$tasks$cancel$$($processFn$$1_promoteKey$$2$$);
  }
  $processFn$$1_promoteKey$$2$$ = $isPrefetch$$2$$ ? $spf$nav$response$preprocess$$ : $spf$nav$response$process$$;
  try {
    $processFn$$1_promoteKey$$2$$($url$$91$$, $multipart$$2$$ ? {} : $response$$10$$, $info$$15$$, function() {
      $spf$nav$dispatchDone_$$($url$$91$$, $response$$10$$, $options$$26$$, !0);
    });
  } catch ($err$$11$$) {
    $spf$debug$debug$$("    failed to process response", $response$$10$$), $spf$nav$handleLoadError_$$($isPrefetch$$2$$, $options$$26$$, $info$$15$$, $url$$91$$, $err$$11$$);
  }
}
function $spf$nav$handleLoadRedirect_$$($isPrefetch$$3_redirectFn$$, $options$$27$$, $info$$16$$, $redirectUrl$$1$$) {
  $isPrefetch$$3_redirectFn$$ = $isPrefetch$$3_redirectFn$$ ? $spf$nav$prefetch_$$ : $spf$nav$load_$$;
  var $redirectOpts$$ = {};
  $spf$array$each$$([$spf$nav$Callback$ERROR$$, $spf$nav$Callback$REQUEST$$, $spf$nav$Callback$PART_PROCESS$$, $spf$nav$Callback$PART_DONE$$, $spf$nav$Callback$PROCESS$$, $spf$nav$Callback$DONE$$], function($key$$54$$) {
    $redirectOpts$$[$key$$54$$] = $options$$27$$[$key$$54$$];
  });
  $isPrefetch$$3_redirectFn$$($redirectUrl$$1$$, $redirectOpts$$, $info$$16$$);
}
function $spf$nav$dispatchError_$$($detail$$3_url$$93$$, $err$$12$$, $opt_options$$22_proceed$$, $opt_noEvents$$, $opt_xhr$$1$$) {
  $detail$$3_url$$93$$ = {url:$detail$$3_url$$93$$, err:$err$$12$$, xhr:$opt_xhr$$1$$};
  ($opt_options$$22_proceed$$ = $spf$nav$callback$$(($opt_options$$22_proceed$$ || {})[$spf$nav$Callback$ERROR$$], $detail$$3_url$$93$$)) && !$opt_noEvents$$ && ($opt_options$$22_proceed$$ = $spf$dispatch$$("spferror", $detail$$3_url$$93$$));
  return $opt_options$$22_proceed$$;
}
function $spf$nav$dispatchRequest_$$($detail$$7_url$$97$$, $referer$$1$$, $previous$$2$$, $opt_options$$23_proceed$$1$$, $opt_noEvents$$1$$) {
  $detail$$7_url$$97$$ = {url:$detail$$7_url$$97$$, referer:$referer$$1$$, previous:$previous$$2$$};
  ($opt_options$$23_proceed$$1$$ = $spf$nav$callback$$(($opt_options$$23_proceed$$1$$ || {})[$spf$nav$Callback$REQUEST$$], $detail$$7_url$$97$$)) && !$opt_noEvents$$1$$ && ($opt_options$$23_proceed$$1$$ = $spf$dispatch$$("spfrequest", $detail$$7_url$$97$$));
  return $opt_options$$23_proceed$$1$$;
}
function $spf$nav$dispatchPartProcess_$$($detail$$8_url$$98$$, $partial$$2$$, $opt_options$$24_proceed$$2$$, $opt_noEvents$$2$$) {
  $detail$$8_url$$98$$ = {url:$detail$$8_url$$98$$, part:$partial$$2$$};
  ($opt_options$$24_proceed$$2$$ = $spf$nav$callback$$(($opt_options$$24_proceed$$2$$ || {})[$spf$nav$Callback$PART_PROCESS$$], $detail$$8_url$$98$$)) && !$opt_noEvents$$2$$ && ($opt_options$$24_proceed$$2$$ = $spf$dispatch$$("spfpartprocess", $detail$$8_url$$98$$));
  return $opt_options$$24_proceed$$2$$;
}
function $spf$nav$dispatchPartDone_$$($detail$$9_url$$99$$, $partial$$3$$, $opt_options$$25$$, $opt_noEvents$$3$$) {
  $detail$$9_url$$99$$ = {url:$detail$$9_url$$99$$, part:$partial$$3$$};
  $spf$nav$callback$$(($opt_options$$25$$ || {})[$spf$nav$Callback$PART_DONE$$], $detail$$9_url$$99$$) && !$opt_noEvents$$3$$ && $spf$dispatch$$("spfpartdone", $detail$$9_url$$99$$);
}
function $spf$nav$dispatchProcess_$$($detail$$10_url$$100$$, $response$$12$$, $opt_options$$26_proceed$$4$$, $opt_noEvents$$4$$) {
  $detail$$10_url$$100$$ = {url:$detail$$10_url$$100$$, response:$response$$12$$};
  ($opt_options$$26_proceed$$4$$ = $spf$nav$callback$$(($opt_options$$26_proceed$$4$$ || {})[$spf$nav$Callback$PROCESS$$], $detail$$10_url$$100$$)) && !$opt_noEvents$$4$$ && ($opt_options$$26_proceed$$4$$ = $spf$dispatch$$("spfprocess", $detail$$10_url$$100$$));
  return $opt_options$$26_proceed$$4$$;
}
function $spf$nav$dispatchDone_$$($detail$$11_url$$101$$, $response$$13$$, $opt_options$$27$$, $opt_noEvents$$5$$) {
  $detail$$11_url$$101$$ = {url:$detail$$11_url$$101$$, response:$response$$13$$};
  $spf$nav$callback$$(($opt_options$$27$$ || {})[$spf$nav$Callback$DONE$$], $detail$$11_url$$101$$) && !$opt_noEvents$$5$$ && $spf$dispatch$$("spfdone", $detail$$11_url$$101$$);
}
function $spf$nav$removePrefetch$$($absoluteUrl$$4_url$$105$$) {
  $spf$debug$debug$$("nav.removePrefetch ", $absoluteUrl$$4_url$$105$$);
  $absoluteUrl$$4_url$$105$$ = $spf$url$absolute$$($absoluteUrl$$4_url$$105$$);
  var $prefetches$$2$$ = $spf$nav$prefetches_$$(), $prefetchXhr$$1$$ = $prefetches$$2$$[$absoluteUrl$$4_url$$105$$];
  $prefetchXhr$$1$$ && $prefetchXhr$$1$$.abort();
  delete $prefetches$$2$$[$absoluteUrl$$4_url$$105$$];
}
function $spf$nav$cancelAllPrefetchesExcept$$($absoluteUrl$$5_opt_skipUrl$$) {
  $spf$debug$debug$$("nav.cancelAllPrefetchesExcept", $absoluteUrl$$5_opt_skipUrl$$);
  var $prefetches$$3$$ = $spf$nav$prefetches_$$();
  $absoluteUrl$$5_opt_skipUrl$$ = $absoluteUrl$$5_opt_skipUrl$$ && $spf$url$absolute$$($absoluteUrl$$5_opt_skipUrl$$);
  for (var $key$$55$$ in $prefetches$$3$$) {
    $absoluteUrl$$5_opt_skipUrl$$ != $key$$55$$ && $spf$nav$removePrefetch$$($key$$55$$);
  }
}
var $spf$nav$clearResourceTimings_$$, $clearResourceTimings$$inline_176$$ = window.performance && (window.performance.clearResourceTimings || window.performance.webkitClearResourceTimings || window.performance.mozClearResourceTimings || window.performance.msClearResourceTimings || window.performance.oClearResourceTimings);
$spf$nav$clearResourceTimings_$$ = $clearResourceTimings$$inline_176$$ ? $spf$bind$$($clearResourceTimings$$inline_176$$, window.performance) : $spf$nullFunction$$;
function $spf$nav$prefetches_$$() {
  return "nav-prefetches" in $spf$state$values_$$ ? $spf$state$values_$$["nav-prefetches"] : $spf$state$set$$("nav-prefetches", {});
}
function $spf$nav$clearScrollTempPosition_$$() {
  $spf$state$set$$("nav-scroll-position", null);
  $spf$state$set$$("nav-scroll-url", null);
}
function $spf$nav$Info$$($opt_info$$2$$) {
  $opt_info$$2$$ = $opt_info$$2$$ || {};
  this.current = $opt_info$$2$$.history && $opt_info$$2$$.current ? $opt_info$$2$$.current : window.location.href;
  this.history = !!$opt_info$$2$$.history;
  this.$original$ = $opt_info$$2$$.$original$ || "";
  this.position = $opt_info$$2$$.position || null;
  this.$referer$ = void 0 != $opt_info$$2$$.$referer$ ? $opt_info$$2$$.$referer$ : window.location.href;
  this.reverse = !!$opt_info$$2$$.reverse;
  this.$scrolled$ = !!$opt_info$$2$$.$scrolled$;
  this.type = $opt_info$$2$$.type || "";
}
var $spf$nav$Callback$ERROR$$ = "onError", $spf$nav$Callback$REQUEST$$ = "onRequest", $spf$nav$Callback$PART_PROCESS$$ = "onPartProcess", $spf$nav$Callback$PART_DONE$$ = "onPartDone", $spf$nav$Callback$PROCESS$$ = "onProcess", $spf$nav$Callback$DONE$$ = "onDone", $spf$nav$ReloadReason$INELIGIBLE$$ = "1: Navigation not initialized or limit reached.", $spf$nav$ReloadReason$REQUEST_CANCELED$$ = "2: Navigation canceled by the request event.", $spf$nav$ReloadReason$PART_PROCESS_CANCELED$$ = "3: Navigation canceled by the partprocess event.", 
$spf$nav$ReloadReason$PROCESS_CANCELED$$ = "4: Navigation canceled by the process event.", $spf$nav$ReloadReason$RESPONSE_RECEIVED$$ = "5: Reload response received.", $spf$nav$ReloadReason$FORBIDDEN$$ = "9: Destination forbidden by same-origin security.", $spf$nav$ReloadReason$ERROR$$ = "10: An uncaught error occurred processing.";
function $spf$main$discover_$$() {
  $spf$net$resource$discover$$($spf$net$resource$Type$JS$$);
  $spf$net$resource$discover$$($spf$net$resource$Type$CSS$$);
  "complete" == document.readyState && (document.removeEventListener ? document.removeEventListener("DOMContentLoaded", $spf$main$discover_$$, !1) : document.detachEvent && document.detachEvent("onreadystatechange", $spf$main$discover_$$));
}
document.addEventListener ? document.addEventListener("DOMContentLoaded", $spf$main$discover_$$, !1) : document.attachEvent && document.attachEvent("onreadystatechange", $spf$main$discover_$$);
$spf$main$discover_$$();
var $spf$main$api_$$ = {init:function($config$$inline_181_opt_config$$1_url$$inline_215$$) {
  var $enable$$ = !("function" != typeof window.history.pushState && !$spf$history$getIframe$$().contentWindow.history.pushState);
  $spf$debug$info$$("main.init ", "enable=", $enable$$);
  $config$$inline_181_opt_config$$1_url$$inline_215$$ = $config$$inline_181_opt_config$$1_url$$inline_215$$ || {};
  for (var $errorCallback$$inline_214_key$$inline_182$$ in $spf$config$defaults$$) {
    $spf$config$values$$[$errorCallback$$inline_214_key$$inline_182$$] = $errorCallback$$inline_214_key$$inline_182$$ in $config$$inline_181_opt_config$$1_url$$inline_215$$ ? $config$$inline_181_opt_config$$1_url$$inline_215$$[$errorCallback$$inline_214_key$$inline_182$$] : $spf$config$defaults$$[$errorCallback$$inline_214_key$$inline_182$$];
  }
  for ($errorCallback$$inline_214_key$$inline_182$$ in $config$$inline_181_opt_config$$1_url$$inline_215$$) {
    $errorCallback$$inline_214_key$$inline_182$$ in $spf$config$defaults$$ || ($spf$config$values$$[$errorCallback$$inline_214_key$$inline_182$$] = $config$$inline_181_opt_config$$1_url$$inline_215$$[$errorCallback$$inline_214_key$$inline_182$$]);
  }
  if ($enable$$) {
    $errorCallback$$inline_214_key$$inline_182$$ = $spf$nav$dispatchError_$$;
    if (!$spf$state$values_$$["history-init"] && window.addEventListener) {
      $config$$inline_181_opt_config$$1_url$$inline_215$$ = window.location.href;
      window.addEventListener("popstate", $spf$history$pop_$$, !1);
      $spf$state$set$$("history-init", !0);
      $spf$state$set$$("history-callback", $spf$nav$handleHistory_$$);
      $spf$state$set$$("history-error-callback", $errorCallback$$inline_214_key$$inline_182$$);
      $spf$state$set$$("history-listener", $spf$history$pop_$$);
      $spf$state$set$$("history-url", $config$$inline_181_opt_config$$1_url$$inline_215$$);
      $spf$state$set$$("history-timestamp", $spf$now$$());
      var $historyState$$inline_216$$ = {"spf-referer":document.referrer};
      try {
        $spf$history$replace$$($config$$inline_181_opt_config$$1_url$$inline_215$$, $historyState$$inline_216$$);
      } catch ($err$$inline_217$$) {
        $errorCallback$$inline_214_key$$inline_182$$ && $errorCallback$$inline_214_key$$inline_182$$($config$$inline_181_opt_config$$1_url$$inline_215$$, $err$$inline_217$$);
      }
    }
    !$spf$state$values_$$["nav-init"] && document.addEventListener && ($spf$state$set$$("nav-init", !0), $spf$state$set$$("nav-init-time", $spf$now$$()), $spf$state$set$$("nav-counter", 0), document.addEventListener("click", $spf$nav$handleClick_$$, !1), $spf$state$set$$("nav-listener", $spf$nav$handleClick_$$), !$spf$config$values$$["experimental-prefetch-mousedown"] || "ontouchstart" in window || 0 < window.navigator.maxTouchPoints || 0 < window.navigator.msMaxTouchPoints || (document.addEventListener("mousedown", 
    $spf$nav$handleMouseDown_$$, !1), $spf$state$set$$("nav-mousedown-listener", $spf$nav$handleMouseDown_$$)), document.addEventListener("scroll", $spf$nav$handleScroll_$$, !1), $spf$state$set$$("nav-scroll-listener", $spf$nav$handleScroll_$$));
  }
  return $enable$$;
}, dispose:function() {
  "undefined" != typeof History && History.prototype.pushState && ($spf$nav$cancel$$(), $spf$state$values_$$["nav-init"] && (document.removeEventListener && (document.removeEventListener("click", $spf$state$values_$$["nav-listener"], !1), document.removeEventListener("mousedown", $spf$state$values_$$["nav-mousedown-listener"], !1), document.removeEventListener("scroll", $spf$state$values_$$["nav-scroll-listener"], !1)), $spf$state$set$$("nav-listener", null), $spf$state$set$$("nav-mousedown-listener", 
  null), $spf$state$set$$("nav-scroll-listener", null), $spf$state$set$$("nav-scroll-position", null), $spf$state$set$$("nav-scroll-url", null), $spf$state$set$$("nav-init", !1), $spf$state$set$$("nav-init-time", null), $spf$state$set$$("nav-counter", null)), $spf$state$values_$$["history-init"] && (window.removeEventListener && window.removeEventListener("popstate", $spf$state$values_$$["history-listener"], !1), $spf$state$set$$("history-init", !1), $spf$state$set$$("history-callback", null), $spf$state$set$$("history-error-callback", 
  null), $spf$state$set$$("history-listener", null), $spf$state$set$$("history-url", null), $spf$state$set$$("history-timestamp", 0)));
  for (var $key$$inline_186$$ in $spf$config$values$$) {
    delete $spf$config$values$$[$key$$inline_186$$];
  }
}, navigate:function($url$$75$$, $opt_options$$19$$) {
  $spf$debug$debug$$("nav.navigate ", "(url=", $url$$75$$, "options=", $opt_options$$19$$, ")");
  $url$$75$$ && ($url$$75$$ = $spf$url$appendPersistentParameters$$($url$$75$$), $spf$nav$isAllowed_$$($url$$75$$) ? $spf$nav$isEligible_$$() ? $spf$nav$navigate_$$($url$$75$$, $opt_options$$19$$ || {}, new $spf$nav$Info$$) : $spf$nav$reload$$($url$$75$$, $spf$nav$ReloadReason$INELIGIBLE$$) : $spf$nav$reload$$($url$$75$$, $spf$nav$ReloadReason$FORBIDDEN$$));
}, load:function($url$$85$$, $opt_options$$20$$) {
  $url$$85$$ = $spf$url$appendPersistentParameters$$($url$$85$$);
  $spf$nav$load_$$($url$$85$$, $opt_options$$20$$ || {}, new $spf$nav$Info$$);
}, prefetch:$spf$nav$prefetch$$, process:function($response$$11$$, $opt_callback$$11$$) {
  function $done$$($index$$47$$, $max$$3$$, $_$$1$$, $resp$$) {
    $index$$47$$ == $max$$3$$ && $opt_callback$$11$$ && $opt_callback$$11$$($resp$$);
  }
  var $url$$92$$ = window.location.href;
  if ("multipart" == $response$$11$$.type) {
    var $parts$$6$$ = $response$$11$$.parts, $max$$2$$ = $parts$$6$$.length - 1;
    $spf$array$each$$($parts$$6$$, function($part$$6$$, $index$$48$$) {
      $spf$nav$response$process$$($url$$92$$, $part$$6$$, null, $spf$bind$$($done$$, null, $index$$48$$, $max$$2$$));
    });
  } else {
    $spf$nav$response$process$$($url$$92$$, $response$$11$$, null, $spf$bind$$($done$$, null, 0, 0));
  }
}}, $spf$main$extra_$$ = {cache:{remove:$spf$cache$remove$$, clear:function() {
  $spf$cache$storage_$$({});
}}, script:{load:$spf$net$script$load$$, get:$spf$net$script$get$$, ready:$spf$net$script$ready$$, done:function($name$$67$$) {
  $spf$net$resource$url$set$$($spf$net$resource$Type$JS$$, $name$$67$$, "");
  $spf$net$resource$check$$($spf$net$resource$Type$JS$$);
}, require:$spf$net$script$require$$, declare:function($deps$$1$$, $opt_urls$$) {
  if ($deps$$1$$) {
    for (var $name$$72$$ in $deps$$1$$) {
      $spf$net$script$deps_$$[$name$$72$$] = $deps$$1$$[$name$$72$$];
    }
    if ($opt_urls$$) {
      for ($name$$72$$ in $opt_urls$$) {
        $spf$net$script$url_$$[$name$$72$$] = $opt_urls$$[$name$$72$$];
      }
    }
  }
}, path:function($paths$$2$$) {
  $spf$state$set$$("rsrc-p-" + $spf$net$resource$Type$JS$$, $paths$$2$$);
}, unload:$spf$net$script$unload$$, ignore:function($names$$2$$, $fn$$16$$) {
  $names$$2$$ = $spf$array$toArray$$($names$$2$$);
  $spf$debug$debug$$("script.ignore", $names$$2$$);
  var $topic$$10$$ = $spf$net$resource$key$$($spf$net$resource$Type$JS$$, $names$$2$$.sort().join("|"));
  $spf$debug$debug$$("  unsubscribing", $topic$$10$$);
  $spf$pubsub$unsubscribe$$($topic$$10$$, $fn$$16$$);
}, unrequire:$spf$net$script$unrequire$$, prefetch:$spf$net$script$prefetch$$}, style:{load:$spf$net$style$load$$, get:$spf$net$style$get$$, unload:function($name$$74$$) {
  $spf$net$resource$unload$$($spf$net$resource$Type$CSS$$, $name$$74$$);
}, path:function($paths$$3$$) {
  $spf$state$set$$("rsrc-p-" + $spf$net$resource$Type$CSS$$, $paths$$3$$);
}, prefetch:$spf$net$style$prefetch$$}}, $api$$ = this.spf = this.spf || {}, $fn1$$;
for ($fn1$$ in $spf$main$api_$$) {
  $api$$[$fn1$$] = $spf$main$api_$$[$fn1$$];
}
for (var $ns$$ in $spf$main$extra_$$) {
  for (var $fn2$$ in $spf$main$extra_$$[$ns$$]) {
    $api$$[$ns$$] = $api$$[$ns$$] || {}, $api$$[$ns$$][$fn2$$] = $spf$main$extra_$$[$ns$$][$fn2$$];
  }
}
$spf$dispatch$$("spfready");
if(typeof define=='function'&&define.amd)define(spf);else if(typeof exports=='object')for(var f in spf)exports[f]=spf[f];})();

