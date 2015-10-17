/*
SPF 22 (v2.2.0)
(c) 2012-2014 Google, Inc.
License: MIT
*/
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
function $spf$now$$() {
  return(new Date).getTime();
}
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
function $spf$dom$query$$($selector$$1$$, $opt_document$$) {
  var $doc$$ = $opt_document$$ || document;
  return $doc$$.querySelectorAll ? $doc$$.querySelectorAll($selector$$1$$) : [];
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
function $spf$dom$createIframe$$($opt_id$$, $doc$$1_opt_document$$1$$, $opt_callback$$6$$) {
  $doc$$1_opt_document$$1$$ = $doc$$1_opt_document$$1$$ || document;
  var $iframeEl$$ = $doc$$1_opt_document$$1$$.createElement("iframe");
  $iframeEl$$.id = $opt_id$$ || "";
  $iframeEl$$.src = 'javascript:""';
  $iframeEl$$.style.display = "none";
  $opt_callback$$6$$ && ($iframeEl$$.onload = $spf$bind$$($opt_callback$$6$$, null, $iframeEl$$));
  $doc$$1_opt_document$$1$$.body.appendChild($iframeEl$$);
  return $iframeEl$$;
}
;function $spf$history$replace$$($opt_url$$4$$, $opt_state$$1$$, $opt_doCallback$$1$$) {
  var $state$$ = null, $currentState$$ = window.history.state;
  if ($currentState$$) {
    var $state$$ = {}, $key$$19$$;
    for ($key$$19$$ in $currentState$$) {
      $state$$[$key$$19$$] = $currentState$$[$key$$19$$];
    }
  }
  if ($opt_state$$1$$) {
    for ($key$$19$$ in $state$$ = $state$$ || {}, $opt_state$$1$$) {
      $state$$[$key$$19$$] = $opt_state$$1$$[$key$$19$$];
    }
  }
  $spf$debug$info$$("history.replace ", $opt_url$$4$$);
  $spf$history$push_$$(!0, $opt_url$$4$$, $state$$, $opt_doCallback$$1$$);
}
function $spf$history$push_$$($pushState$$inline_21_replace$$, $opt_url$$5_url$$12$$, $opt_state$$2_state$$1$$, $callback$$32_opt_doCallback$$2$$) {
  if ($opt_url$$5_url$$12$$ || $opt_state$$2_state$$1$$) {
    $opt_url$$5_url$$12$$ = $opt_url$$5_url$$12$$ || window.location.href;
    $opt_state$$2_state$$1$$ = $opt_state$$2_state$$1$$ || {};
    var $timestamp$$ = $spf$now$$();
    $spf$state$set$$("history-timestamp", $timestamp$$);
    $opt_state$$2_state$$1$$["spf-timestamp"] = $timestamp$$;
    if ($pushState$$inline_21_replace$$) {
      $spf$history$doReplaceState_$$($opt_state$$2_state$$1$$, $opt_url$$5_url$$12$$), $spf$debug$debug$$("    replaceState:  ", "url=", $opt_url$$5_url$$12$$, "state=", $opt_state$$2_state$$1$$);
    } else {
      $pushState$$inline_21_replace$$ = $spf$history$getIframe$$().contentWindow.history.pushState;
      if ("function" == typeof $pushState$$inline_21_replace$$) {
        $pushState$$inline_21_replace$$.call(window.history, $opt_state$$2_state$$1$$, "", $opt_url$$5_url$$12$$);
      } else {
        throw Error("history.pushState is not a function.");
      }
      $spf$debug$debug$$("    pushState:  ", "url=", $opt_url$$5_url$$12$$, "state=", $opt_state$$2_state$$1$$);
    }
    $spf$state$set$$("history-url", $opt_url$$5_url$$12$$);
    $callback$$32_opt_doCallback$$2$$ && ($callback$$32_opt_doCallback$$2$$ = $spf$state$values_$$["history-callback"]) && $callback$$32_opt_doCallback$$2$$($opt_url$$5_url$$12$$, $opt_state$$2_state$$1$$);
  }
}
function $spf$history$pop_$$($evt$$22_state$$2$$) {
  var $url$$13$$ = window.location.href;
  $spf$debug$info$$("history.pop ", "url=", $url$$13$$, "evt=", $evt$$22_state$$2$$);
  if ($spf$state$values_$$["history-ignore-pop"]) {
    $spf$state$set$$("history-ignore-pop", !1);
  } else {
    if ($evt$$22_state$$2$$.state) {
      $evt$$22_state$$2$$ = $evt$$22_state$$2$$.state;
      var $callback$$33_timestamp$$1$$ = $evt$$22_state$$2$$["spf-timestamp"];
      $url$$13$$ == $spf$state$values_$$["history-url"] ? ($spf$state$set$$("history-timestamp", $callback$$33_timestamp$$1$$), $spf$history$doReplaceState_$$($evt$$22_state$$2$$, $url$$13$$), $spf$debug$debug$$("    replaceState:  ", "url=", $url$$13$$, "state=", $evt$$22_state$$2$$)) : ($evt$$22_state$$2$$["spf-back"] = $callback$$33_timestamp$$1$$ < parseInt($spf$state$values_$$["history-timestamp"], 10), $evt$$22_state$$2$$["spf-current"] = $spf$state$values_$$["history-url"], $spf$state$set$$("history-timestamp", 
      $callback$$33_timestamp$$1$$), $spf$state$set$$("history-url", $url$$13$$), ($callback$$33_timestamp$$1$$ = $spf$state$values_$$["history-callback"]) && $callback$$33_timestamp$$1$$($url$$13$$, $evt$$22_state$$2$$));
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
function $spf$array$filter$$($arr$$10$$, $fn$$4$$) {
  if ($arr$$10$$.filter) {
    return $arr$$10$$.filter($fn$$4$$, void 0);
  }
  var $res$$ = [];
  $spf$array$each$$($arr$$10$$, function($a$$, $i$$5$$, $arr$$11$$) {
    $fn$$4$$.call(void 0, $a$$, $i$$5$$, $arr$$11$$) && $res$$.push($a$$);
  });
  return $res$$;
}
function $spf$array$map$$($arr$$13$$, $fn$$5$$) {
  if ($arr$$13$$.map) {
    return $arr$$13$$.map($fn$$5$$, void 0);
  }
  var $res$$1$$ = [];
  $res$$1$$.length = $arr$$13$$.length;
  $spf$array$each$$($arr$$13$$, function($a$$1$$, $i$$7$$, $arr$$14$$) {
    $res$$1$$[$i$$7$$] = $fn$$5$$.call(void 0, $a$$1$$, $i$$7$$, $arr$$14$$);
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
  var $storage$$3_storage$$inline_23$$ = $spf$cache$storage_$$(), $extra$$inline_25_key$$23_max$$inline_24$$;
  for ($extra$$inline_25_key$$23_max$$inline_24$$ in $storage$$3_storage$$inline_23$$) {
    $spf$cache$valid_$$($storage$$3_storage$$inline_23$$[$extra$$inline_25_key$$23_max$$inline_24$$]) || delete $storage$$3_storage$$inline_23$$[$extra$$inline_25_key$$23_max$$inline_24$$];
  }
  $storage$$3_storage$$inline_23$$ = $spf$cache$storage_$$();
  $extra$$inline_25_key$$23_max$$inline_24$$ = parseInt($spf$config$values$$["cache-max"], 10);
  $extra$$inline_25_key$$23_max$$inline_24$$ = isNaN($extra$$inline_25_key$$23_max$$inline_24$$) ? Infinity : $extra$$inline_25_key$$23_max$$inline_24$$;
  $extra$$inline_25_key$$23_max$$inline_24$$ = Object.keys($storage$$3_storage$$inline_23$$).length - $extra$$inline_25_key$$23_max$$inline_24$$;
  if (!(0 >= $extra$$inline_25_key$$23_max$$inline_24$$)) {
    for (var $i$$inline_26$$ = 0;$i$$inline_26$$ < $extra$$inline_25_key$$23_max$$inline_24$$;$i$$inline_26$$++) {
      var $JSCompiler_object_inline_count_0$$inline_27$$ = Infinity, $JSCompiler_object_inline_key_1$$inline_28$$, $key$$inline_29$$;
      for ($key$$inline_29$$ in $storage$$3_storage$$inline_23$$) {
        $storage$$3_storage$$inline_23$$[$key$$inline_29$$].count < $JSCompiler_object_inline_count_0$$inline_27$$ && ($JSCompiler_object_inline_key_1$$inline_28$$ = $key$$inline_29$$, $JSCompiler_object_inline_count_0$$inline_27$$ = $storage$$3_storage$$inline_23$$[$key$$inline_29$$].count);
      }
      delete $storage$$3_storage$$inline_23$$[$JSCompiler_object_inline_key_1$$inline_28$$];
    }
  }
}
function $spf$cache$valid_$$($unit$$2$$) {
  if (!($unit$$2$$ && "data" in $unit$$2$$)) {
    return!1;
  }
  var $lifetime$$1$$ = $unit$$2$$.life, $lifetime$$1$$ = isNaN($lifetime$$1$$) ? Infinity : $lifetime$$1$$;
  return $spf$now$$() - $unit$$2$$.time < $lifetime$$1$$;
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
    for (var $classes$$ = $spf$dom$classlist$get$$($node$$3$$), $i$$9$$ = 0, $l$$2$$ = $classes$$.length;$i$$9$$ < $l$$2$$;$i$$9$$++) {
      if ($classes$$[$i$$9$$] == $cls$$) {
        return!0;
      }
    }
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
      for (var $classes$$1$$ = $spf$dom$classlist$get$$($node$$5$$), $newClasses$$ = [], $i$$10$$ = 0, $l$$3$$ = $classes$$1$$.length;$i$$10$$ < $l$$3$$;$i$$10$$++) {
        $classes$$1$$[$i$$10$$] != $cls$$2$$ && $newClasses$$.push($classes$$1$$[$i$$10$$]);
      }
      $node$$5$$.className = $newClasses$$.join(" ");
    }
  }
}
;function $spf$pubsub$subscribe$$($topic$$, $fn$$6$$) {
  $topic$$ && $fn$$6$$ && ($topic$$ in $spf$pubsub$subscriptions$$ || ($spf$pubsub$subscriptions$$[$topic$$] = []), $spf$pubsub$subscriptions$$[$topic$$].push($fn$$6$$));
}
function $spf$pubsub$unsubscribe$$($topic$$1$$, $fn$$7$$) {
  $topic$$1$$ in $spf$pubsub$subscriptions$$ && $fn$$7$$ && $spf$array$every$$($spf$pubsub$subscriptions$$[$topic$$1$$], function($subFn$$, $i$$11$$, $arr$$15$$) {
    return $subFn$$ == $fn$$7$$ ? ($arr$$15$$[$i$$11$$] = null, !1) : !0;
  });
}
function $spf$pubsub$publish_$$($topic$$4$$) {
  $topic$$4$$ in $spf$pubsub$subscriptions$$ && $spf$array$each$$($spf$pubsub$subscriptions$$[$topic$$4$$], function($subFn$$1$$, $i$$12$$, $arr$$16$$) {
    $arr$$16$$[$i$$12$$] = null;
    $subFn$$1$$ && $subFn$$1$$();
  });
}
var $spf$pubsub$subscriptions$$ = {};
"ps-s" in $spf$state$values_$$ || $spf$state$set$$("ps-s", $spf$pubsub$subscriptions$$);
$spf$pubsub$subscriptions$$ = $spf$state$values_$$["ps-s"];
function $spf$string$endsWith$$($str$$9$$, $suffix$$) {
  var $l$$4$$ = $str$$9$$.length - $suffix$$.length;
  return 0 <= $l$$4$$ && $str$$9$$.indexOf($suffix$$, $l$$4$$) == $l$$4$$;
}
var $spf$string$trim$$ = String.prototype.trim ? function($str$$10$$) {
  return $str$$10$$.trim();
} : function($str$$11$$) {
  return $str$$11$$.replace(/^\s+|\s+$/g, "");
};
function $spf$string$partition$$($str$$12$$, $sep$$) {
  var $arr$$17$$ = $str$$12$$.split($sep$$), $nosep$$ = 1 == $arr$$17$$.length;
  return[$arr$$17$$[0], $nosep$$ ? "" : $sep$$, $nosep$$ ? "" : $arr$$17$$.slice(1).join($sep$$)];
}
;function $spf$tasks$add$$($key$$28$$, $fn$$8$$, $opt_delay$$) {
  var $queue$$ = $spf$tasks$queues_$$[$key$$28$$];
  return $key$$28$$ && $fn$$8$$ ? ($queue$$ || ($queue$$ = $spf$tasks$queues_$$[$key$$28$$] = {items:[], $scheduledKey$:0, $timeoutKey$:0, $semaphore$:1}), $queue$$.items.push({$fn$:$fn$$8$$, $delay$:$opt_delay$$ || 0})) : $queue$$ && $queue$$.items.length || 0;
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
function $spf$tasks$scheduleTask_$$($queue$$6$$, $addTask_scheduler_task$$2$$, $fn$$9_step$$1$$) {
  $addTask_scheduler_task$$2$$.$delay$ ? ($fn$$9_step$$1$$ = $spf$bind$$($fn$$9_step$$1$$, null, $spf$nullFunction$$), $queue$$6$$.$timeoutKey$ = setTimeout($fn$$9_step$$1$$, $addTask_scheduler_task$$2$$.$delay$), $addTask_scheduler_task$$2$$.$delay$ = 0) : ($queue$$6$$.items.shift(), $fn$$9_step$$1$$ = $spf$bind$$($fn$$9_step$$1$$, null, $addTask_scheduler_task$$2$$.$fn$), ($addTask_scheduler_task$$2$$ = ($addTask_scheduler_task$$2$$ = $spf$config$values$$["advanced-task-scheduler"]) && $addTask_scheduler_task$$2$$.addTask) ? 
  $queue$$6$$.$scheduledKey$ = $addTask_scheduler_task$$2$$($fn$$9_step$$1$$) : $queue$$6$$.$timeoutKey$ = setTimeout($fn$$9_step$$1$$, 0));
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
  for (var $i$$14$$ = 0;$i$$14$$ < $parameters$$1$$.length;$i$$14$$++) {
    $url$$19$$ = $url$$19$$.replace(new RegExp("([?&])" + $parameters$$1$$[$i$$14$$] + "(?:=[^&]*)?(?:(?=[&])|$)", "g"), function($_$$, $delim$$1$$) {
      return "?" == $delim$$1$$ ? $delim$$1$$ : "";
    });
  }
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
  var $isJS_key$$inline_33_prevName$$ = $el_type$$78$$ == $spf$net$resource$Type$JS$$;
  $url$$23$$ = $spf$net$resource$canonicalize$$($el_type$$78$$, $url$$23$$);
  var $pseudonym$$ = $name$$52$$ || "^" + $url$$23$$, $topic$$6$$ = $spf$net$resource$key$$($el_type$$78$$, $pseudonym$$), $prevUrl$$;
  $name$$52$$ && ($prevUrl$$ = $spf$net$resource$url$get$$($el_type$$78$$, $name$$52$$)) && $url$$23$$ != $prevUrl$$ && ($spf$dispatch$$($isJS_key$$inline_33_prevName$$ ? "spfjsbeforeunload" : "spfcssbeforeunload", {name:$name$$52$$, url:$prevUrl$$}), $spf$net$resource$unloadPrepare_$$($el_type$$78$$, $name$$52$$, $prevUrl$$), $spf$pubsub$subscribe$$($topic$$6$$, $spf$bind$$($spf$net$resource$unloadComplete_$$, null, $el_type$$78$$, $name$$52$$, $prevUrl$$)));
  $isJS_key$$inline_33_prevName$$ = $spf$net$resource$key$$($el_type$$78$$, $url$$23$$);
  if (($isJS_key$$inline_33_prevName$$ = $spf$net$resource$name_$$[$isJS_key$$inline_33_prevName$$]) && $pseudonym$$ != $isJS_key$$inline_33_prevName$$) {
    var $key$$inline_37_key$$inline_41_key$$inline_49_oldTopic$$inline_43$$ = $spf$net$resource$key$$($el_type$$78$$, $isJS_key$$inline_33_prevName$$);
    delete $spf$net$resource$url_$$[$key$$inline_37_key$$inline_41_key$$inline_49_oldTopic$$inline_43$$];
    $key$$inline_37_key$$inline_41_key$$inline_49_oldTopic$$inline_43$$ = $spf$net$resource$key$$($el_type$$78$$, $url$$23$$);
    delete $spf$net$resource$name_$$[$key$$inline_37_key$$inline_41_key$$inline_49_oldTopic$$inline_43$$];
    ($key$$inline_37_key$$inline_41_key$$inline_49_oldTopic$$inline_43$$ = $spf$net$resource$key$$($el_type$$78$$, $isJS_key$$inline_33_prevName$$)) && $topic$$6$$ && $key$$inline_37_key$$inline_41_key$$inline_49_oldTopic$$inline_43$$ in $spf$pubsub$subscriptions$$ && ($spf$pubsub$subscriptions$$[$topic$$6$$] = ($spf$pubsub$subscriptions$$[$topic$$6$$] || []).concat($spf$pubsub$subscriptions$$[$key$$inline_37_key$$inline_41_key$$inline_49_oldTopic$$inline_43$$]), delete $spf$pubsub$subscriptions$$[$key$$inline_37_key$$inline_41_key$$inline_49_oldTopic$$inline_43$$]);
  }
  $key$$inline_37_key$$inline_41_key$$inline_49_oldTopic$$inline_43$$ = $spf$net$resource$key$$($el_type$$78$$, $url$$23$$);
  $spf$net$resource$name_$$[$key$$inline_37_key$$inline_41_key$$inline_49_oldTopic$$inline_43$$] = $pseudonym$$;
  $spf$net$resource$url$set$$($el_type$$78$$, $pseudonym$$, $url$$23$$);
  $spf$debug$debug$$("  subscribing callback", $topic$$6$$);
  $spf$pubsub$subscribe$$($topic$$6$$, $check_opt_fn$$);
  $check_opt_fn$$ = $spf$bind$$($spf$net$resource$check$$, null, $el_type$$78$$);
  $spf$net$resource$status$get$$($el_type$$78$$, $url$$23$$) ? ($isJS_key$$inline_33_prevName$$ && $pseudonym$$ != $isJS_key$$inline_33_prevName$$ && ($el_type$$78$$ = $spf$net$resource$find$$($el_type$$78$$, $url$$23$$)) && $el_type$$78$$.setAttribute("name", $name$$52$$ || ""), $check_opt_fn$$()) : ($el_type$$78$$ = $spf$net$resource$create$$($el_type$$78$$, $url$$23$$, $check_opt_fn$$, void 0, void 0, $prevUrl$$)) && $name$$52$$ && $el_type$$78$$.setAttribute("name", $name$$52$$);
}
function $spf$net$resource$unload$$($type$$79$$, $name$$53$$) {
  $spf$debug$warn$$("resource.unload", $type$$79$$, $name$$53$$);
  var $url$$24$$ = $spf$net$resource$url$get$$($type$$79$$, $name$$53$$);
  $spf$net$resource$unloadPrepare_$$($type$$79$$, $name$$53$$, $url$$24$$);
  $spf$net$resource$unloadComplete_$$($type$$79$$, $name$$53$$, $url$$24$$);
}
function $spf$net$resource$unloadPrepare_$$($topic$$7_type$$80$$, $name$$54$$, $key$$inline_57_url$$25$$) {
  $spf$debug$debug$$("  > resource.unloadPrepare_", $topic$$7_type$$80$$, $key$$inline_57_url$$25$$);
  var $key$$inline_53$$ = $spf$net$resource$key$$($topic$$7_type$$80$$, $name$$54$$);
  delete $spf$net$resource$url_$$[$key$$inline_53$$];
  $key$$inline_57_url$$25$$ && ($key$$inline_57_url$$25$$ = $spf$net$resource$key$$($topic$$7_type$$80$$, $key$$inline_57_url$$25$$), delete $spf$net$resource$name_$$[$key$$inline_57_url$$25$$]);
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
function $spf$net$resource$create$$($type$$83$$, $url$$27$$, $opt_callback$$7$$, $doc$$2_opt_document$$2_targetEl$$, $opt_statusGroup$$, $opt_prevUrl_prevEl$$) {
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
  $doc$$2_opt_document$$2_targetEl$$ = $doc$$2_opt_document$$2_targetEl$$ || document;
  var $el$$1$$ = $doc$$2_opt_document$$2_targetEl$$.createElement($isJS$$2$$ ? "script" : "link");
  if (!$url$$27$$) {
    return $next$$1$$();
  }
  var $label$$4$$ = $spf$net$resource$label$$($url$$27$$);
  $el$$1$$.className = $spf$net$resource$key$$($type$$83$$, $label$$4$$);
  "onload" in $el$$1$$ ? $el$$1$$.onerror = $el$$1$$.onload = $next$$1$$ : $el$$1$$.onreadystatechange = function $$el$$1$$$onreadystatechange$() {
    /^c|loade/.test($el$$1$$.readyState) && $next$$1$$();
  };
  $doc$$2_opt_document$$2_targetEl$$ = $doc$$2_opt_document$$2_targetEl$$.getElementsByTagName("head")[0] || $doc$$2_opt_document$$2_targetEl$$.body;
  $isJS$$2$$ ? ($el$$1$$.async = !0, $el$$1$$.src = $url$$27$$, $doc$$2_opt_document$$2_targetEl$$.insertBefore($el$$1$$, $doc$$2_opt_document$$2_targetEl$$.firstChild)) : ($el$$1$$.rel = "stylesheet", $el$$1$$.href = $url$$27$$, ($opt_prevUrl_prevEl$$ = $opt_prevUrl_prevEl$$ && $spf$net$resource$find$$($type$$83$$, $opt_prevUrl_prevEl$$, $doc$$2_opt_document$$2_targetEl$$)) ? $doc$$2_opt_document$$2_targetEl$$.insertBefore($el$$1$$, $opt_prevUrl_prevEl$$) : $doc$$2_opt_document$$2_targetEl$$.appendChild($el$$1$$));
  return $el$$1$$;
}
function $spf$net$resource$destroy$$($type$$84$$, $url$$28$$) {
  $url$$28$$ = $spf$net$resource$canonicalize$$($type$$84$$, $url$$28$$);
  var $el$$2_key$$inline_63$$ = $spf$net$resource$find$$($type$$84$$, $url$$28$$, void 0);
  $el$$2_key$$inline_63$$ && $el$$2_key$$inline_63$$.parentNode && $el$$2_key$$inline_63$$.parentNode.removeChild($el$$2_key$$inline_63$$);
  $el$$2_key$$inline_63$$ = $spf$net$resource$key$$($type$$84$$, $url$$28$$);
  delete $spf$net$resource$status_$$[$el$$2_key$$inline_63$$];
}
function $spf$net$resource$find$$($selector$$2_type$$85$$, $label$$5_url$$29$$, $opt_document$$4$$) {
  $label$$5_url$$29$$ = $spf$net$resource$label$$($label$$5_url$$29$$);
  $selector$$2_type$$85$$ = "." + $spf$net$resource$key$$($selector$$2_type$$85$$, $label$$5_url$$29$$);
  return $spf$dom$query$$($selector$$2_type$$85$$, $opt_document$$4$$)[0];
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
        var $key$$inline_68$$ = $spf$net$resource$key$$($type$$86$$, $url$$30$$);
        $spf$net$resource$name_$$[$key$$inline_68$$] = $name$$56$$;
        $spf$net$resource$url$set$$($type$$86$$, $name$$56$$, $url$$30$$);
      }
      $els$$1$$.push($el$$3$$);
      $spf$debug$debug$$("  found", $url$$30$$, $cls$$4_label$$6$$, $name$$56$$);
    }
  });
}
function $spf$net$resource$prefetch$$($type$$87$$, $url$$31$$) {
  if ($url$$31$$ && ($url$$31$$ = $spf$net$resource$canonicalize$$($type$$87$$, $url$$31$$), !$spf$net$resource$status$get$$($type$$87$$, $url$$31$$))) {
    var $el$$4_label$$7$$ = $spf$net$resource$label$$($url$$31$$), $id$$5_next$$2$$ = $spf$net$resource$key$$($type$$87$$, $el$$4_label$$7$$), $key$$36$$ = $spf$net$resource$key$$($type$$87$$, "prefetch"), $el$$4_label$$7$$ = document.getElementById($key$$36$$);
    if (!$el$$4_label$$7$$) {
      $el$$4_label$$7$$ = $spf$dom$createIframe$$($key$$36$$, null, function($el$$5$$) {
        $el$$5$$.title = $key$$36$$;
        $spf$tasks$run$$($key$$36$$, !0);
      });
    } else {
      if ($el$$4_label$$7$$.contentWindow.document.getElementById($id$$5_next$$2$$)) {
        return;
      }
    }
    $id$$5_next$$2$$ = $spf$bind$$($spf$net$resource$prefetch_$$, null, $el$$4_label$$7$$, $type$$87$$, $url$$31$$, $id$$5_next$$2$$, $key$$36$$);
    $el$$4_label$$7$$.title ? $id$$5_next$$2$$() : $spf$tasks$add$$($key$$36$$, $id$$5_next$$2$$);
  }
}
function $spf$net$resource$prefetch_$$($doc$$3_el$$6$$, $fetchEl_type$$88$$, $url$$32$$, $id$$6$$, $group$$) {
  var $isCSS$$ = $fetchEl_type$$88$$ == $spf$net$resource$Type$CSS$$;
  $doc$$3_el$$6$$ = $doc$$3_el$$6$$.contentWindow.document;
  $fetchEl_type$$88$$ == $spf$net$resource$Type$JS$$ ? ($fetchEl_type$$88$$ = $doc$$3_el$$6$$.createElement("object"), $spf$net$resource$IS_IE$$ ? $doc$$3_el$$6$$.createElement("script").src = $url$$32$$ : $fetchEl_type$$88$$.data = $url$$32$$, $fetchEl_type$$88$$.id = $id$$6$$, $doc$$3_el$$6$$.body.appendChild($fetchEl_type$$88$$)) : $isCSS$$ ? ($fetchEl_type$$88$$ = $spf$net$resource$create$$($fetchEl_type$$88$$, $url$$32$$, null, $doc$$3_el$$6$$, $group$$), $fetchEl_type$$88$$.id = $id$$6$$) : 
  ($fetchEl_type$$88$$ = $doc$$3_el$$6$$.createElement("img"), $fetchEl_type$$88$$.src = $url$$32$$, $fetchEl_type$$88$$.id = $id$$6$$, $doc$$3_el$$6$$.body.appendChild($fetchEl_type$$88$$));
}
function $spf$net$resource$eval$$($type$$89$$, $el$$7_text$$10$$, $name$$57$$) {
  for (var $previous$$ = $spf$net$resource$url$get$$($type$$89$$, $name$$57$$), $cls$$5_id$$7_label$$8_str$$inline_70$$ = $el$$7_text$$10$$.replace(/\s/g, ""), $cls$$5_id$$7_label$$8_str$$inline_70$$ = $cls$$5_id$$7_label$$8_str$$inline_70$$ || "", $result$$inline_71$$ = 0, $i$$inline_72$$ = 0, $l$$inline_73$$ = $cls$$5_id$$7_label$$8_str$$inline_70$$.length;$i$$inline_72$$ < $l$$inline_73$$;++$i$$inline_72$$) {
    $result$$inline_71$$ = 31 * $result$$inline_71$$ + $cls$$5_id$$7_label$$8_str$$inline_70$$.charCodeAt($i$$inline_72$$), $result$$inline_71$$ %= 4294967296;
  }
  $cls$$5_id$$7_label$$8_str$$inline_70$$ = "hash-" + $result$$inline_71$$;
  $spf$net$resource$url$set$$($type$$89$$, $name$$57$$, $cls$$5_id$$7_label$$8_str$$inline_70$$);
  !$spf$net$resource$status$loaded$$($type$$89$$, $cls$$5_id$$7_label$$8_str$$inline_70$$) && ($el$$7_text$$10$$ = $spf$net$resource$exec$$($type$$89$$, $el$$7_text$$10$$)) && ($spf$net$resource$status$set$$($spf$net$resource$State$LOADED$$, $type$$89$$, $cls$$5_id$$7_label$$8_str$$inline_70$$), $el$$7_text$$10$$ && ($cls$$5_id$$7_label$$8_str$$inline_70$$ = $spf$net$resource$label$$($cls$$5_id$$7_label$$8_str$$inline_70$$), $cls$$5_id$$7_label$$8_str$$inline_70$$ = $spf$net$resource$key$$($type$$89$$, 
  $cls$$5_id$$7_label$$8_str$$inline_70$$), $el$$7_text$$10$$.className = $cls$$5_id$$7_label$$8_str$$inline_70$$, $el$$7_text$$10$$.setAttribute("name", $name$$57$$)), ($previous$$ = $previous$$ && $previous$$[0]) && $spf$net$resource$destroy$$($type$$89$$, $previous$$));
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
function $spf$net$resource$canonicalize$$($type$$92$$, $url$$33$$) {
  var $key$$38_paths$$1$$ = "rsrc-p-" + $type$$92$$;
  if ($url$$33$$) {
    var $index$$45$$ = $url$$33$$.indexOf("//");
    if (0 > $index$$45$$) {
      if (0 == $url$$33$$.lastIndexOf("hash-", 0)) {
        return $url$$33$$;
      }
      $key$$38_paths$$1$$ = $spf$state$values_$$[$key$$38_paths$$1$$] || "";
      if ("[object String]" == Object.prototype.toString.call($key$$38_paths$$1$$)) {
        $url$$33$$ = $key$$38_paths$$1$$ + $url$$33$$;
      } else {
        for (var $p$$ in $key$$38_paths$$1$$) {
          $url$$33$$ = $url$$33$$.replace($p$$, $key$$38_paths$$1$$[$p$$]);
        }
      }
      $url$$33$$ = 0 > $url$$33$$.indexOf("." + $type$$92$$) ? $url$$33$$ + "." + $type$$92$$ : $url$$33$$;
      $url$$33$$ = $spf$url$absolute$$($url$$33$$);
    } else {
      0 == $index$$45$$ && ($url$$33$$ = $spf$url$absolute$$($url$$33$$));
    }
  }
  return $url$$33$$;
}
function $spf$net$resource$key$$($type$$93$$, $label$$9$$, $opt_group$$) {
  return $type$$93$$ + "-" + $label$$9$$ + ($opt_group$$ ? "-" + $opt_group$$ : "");
}
function $spf$net$resource$label$$($url$$34$$) {
  return $url$$34$$ ? String($url$$34$$).replace(/[^\w]/g, "") : "";
}
function $spf$net$resource$status$set$$($status$$, $key$$39_type$$94$$, $url$$35$$, $opt_group$$1$$) {
  $key$$39_type$$94$$ = $spf$net$resource$key$$($key$$39_type$$94$$, $url$$35$$, $opt_group$$1$$);
  $spf$net$resource$status_$$[$key$$39_type$$94$$] = $status$$;
}
function $spf$net$resource$status$get$$($key$$40_type$$95$$, $url$$36$$, $opt_group$$2$$) {
  $key$$40_type$$95$$ = $spf$net$resource$key$$($key$$40_type$$95$$, $url$$36$$, $opt_group$$2$$);
  return $spf$net$resource$status_$$[$key$$40_type$$95$$];
}
function $spf$net$resource$status$loaded$$($type$$97$$, $url$$38$$) {
  var $status$$1$$ = $spf$net$resource$status$get$$($type$$97$$, $url$$38$$);
  return "" == $url$$38$$ || $status$$1$$ == $spf$net$resource$State$LOADED$$;
}
function $spf$net$resource$url$set$$($key$$45_type$$101$$, $name$$59$$, $url$$42$$) {
  $key$$45_type$$101$$ = $spf$net$resource$key$$($key$$45_type$$101$$, $name$$59$$);
  $spf$net$resource$url_$$[$key$$45_type$$101$$] = $url$$42$$;
}
function $spf$net$resource$url$get$$($type$$102$$, $name$$60$$) {
  var $key$$46$$ = $spf$net$resource$key$$($type$$102$$, $name$$60$$);
  return $spf$net$resource$url_$$[$key$$46$$];
}
function $spf$net$resource$url$loaded$$($type$$104$$, $name$$62$$) {
  var $url$$44$$ = $spf$net$resource$url$get$$($type$$104$$, $name$$62$$);
  return void 0 != $url$$44$$ && $spf$net$resource$status$loaded$$($type$$104$$, $url$$44$$);
}
var $spf$net$resource$status_$$ = {}, $spf$net$resource$name_$$ = {}, $spf$net$resource$url_$$ = {}, $spf$net$resource$IS_IE$$ = -1 != navigator.userAgent.indexOf(" Trident/"), $spf$net$resource$State$LOADING$$ = 1, $spf$net$resource$State$LOADED$$ = 2, $spf$net$resource$Type$CSS$$ = "css", $spf$net$resource$Type$JS$$ = "js";
"rsrc-s" in $spf$state$values_$$ || $spf$state$set$$("rsrc-s", $spf$net$resource$status_$$);
$spf$net$resource$status_$$ = $spf$state$values_$$["rsrc-s"];
"rsrc-n" in $spf$state$values_$$ || $spf$state$set$$("rsrc-n", $spf$net$resource$name_$$);
$spf$net$resource$name_$$ = $spf$state$values_$$["rsrc-n"];
"rsrc-u" in $spf$state$values_$$ || $spf$state$set$$("rsrc-u", $spf$net$resource$url_$$);
$spf$net$resource$url_$$ = $spf$state$values_$$["rsrc-u"];
function $spf$net$connect$preconnect$$($urls$$) {
  $urls$$ = $spf$array$toArray$$($urls$$);
  $spf$array$each$$($urls$$, function($url$$45$$) {
    $spf$net$resource$prefetch$$("img", $url$$45$$);
  });
}
;function $spf$net$script$load$$($url$$46$$, $name$$63$$, $opt_fn$$1$$) {
  $spf$net$resource$load$$($spf$net$resource$Type$JS$$, $url$$46$$, $name$$63$$, $opt_fn$$1$$);
}
function $spf$net$script$unload$$($name$$64$$) {
  $spf$net$resource$unload$$($spf$net$resource$Type$JS$$, $name$$64$$);
}
function $spf$net$script$get$$($url$$47$$, $opt_fn$$2$$) {
  $spf$net$resource$create$$($spf$net$resource$Type$JS$$, $url$$47$$, $opt_fn$$2$$);
}
function $spf$net$script$prefetch$$($urls$$1$$) {
  $urls$$1$$ = $spf$array$toArray$$($urls$$1$$);
  $spf$array$each$$($urls$$1$$, function($url$$48$$) {
    $spf$net$resource$prefetch$$($spf$net$resource$Type$JS$$, $url$$48$$);
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
      var $url$$49$$ = $spf$net$script$url_$$[$name$$68$$] || $name$$68$$, $url$$49$$ = $spf$net$resource$canonicalize$$($spf$net$resource$Type$JS$$, $url$$49$$), $previous$$1$$ = $spf$net$resource$url$get$$($spf$net$resource$Type$JS$$, $name$$68$$);
      $previous$$1$$ && $url$$49$$ != $previous$$1$$ && $spf$net$script$unrequire$$($name$$68$$);
    }
  });
  $spf$net$script$ready$$($names$$3$$, $opt_fn$$4$$, $spf$net$script$require_$$);
}
function $spf$net$script$require_$$($names$$4$$) {
  $spf$array$each$$($names$$4$$, function($name$$69$$) {
    function $next$$3$$() {
      $spf$net$script$load$$($url$$50$$, $name$$69$$);
    }
    var $deps$$ = $spf$net$script$deps_$$[$name$$69$$], $url$$50$$ = $spf$net$script$url_$$[$name$$69$$] || $name$$69$$;
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
      $spf$array$each$$($list$$, function($l$$6$$) {
        $l$$6$$ == $name$$70$$ && $descendants$$.push($dep$$);
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
function $spf$net$style$load$$($url$$51$$, $name$$73$$, $opt_fn$$5$$) {
  $spf$net$resource$load$$($spf$net$resource$Type$CSS$$, $url$$51$$, $name$$73$$, $opt_fn$$5$$);
}
function $spf$net$style$get$$($url$$52$$, $opt_fn$$6$$) {
  $spf$net$resource$create$$($spf$net$resource$Type$CSS$$, $url$$52$$, $opt_fn$$6$$);
}
function $spf$net$style$prefetch$$($urls$$2$$) {
  $urls$$2$$ = $spf$array$toArray$$($urls$$2$$);
  $spf$array$each$$($urls$$2$$, function($url$$53$$) {
    $spf$net$resource$prefetch$$($spf$net$resource$Type$CSS$$, $url$$53$$);
  });
}
;function $spf$nav$response$parse$$($i$$15_response_text$$16$$, $opt_multipart_parts$$1$$, $opt_lastDitch$$) {
  if ($opt_multipart_parts$$1$$) {
    $opt_multipart_parts$$1$$ = [];
    var $chunk_extra$$1$$, $start$$8$$ = 0;
    $opt_lastDitch$$ && ($i$$15_response_text$$16$$ += "\r\n");
    var $finish$$ = $i$$15_response_text$$16$$.indexOf($spf$nav$response$Token$BEGIN$$, $start$$8$$);
    for (-1 < $finish$$ && ($start$$8$$ = $finish$$ + $spf$nav$response$Token$BEGIN$$.length);-1 < ($finish$$ = $i$$15_response_text$$16$$.indexOf($spf$nav$response$Token$DELIMITER$$, $start$$8$$));) {
      $chunk_extra$$1$$ = $spf$string$trim$$($i$$15_response_text$$16$$.substring($start$$8$$, $finish$$)), $start$$8$$ = $finish$$ + $spf$nav$response$Token$DELIMITER$$.length, $chunk_extra$$1$$ && $opt_multipart_parts$$1$$.push(JSON.parse($chunk_extra$$1$$));
    }
    $finish$$ = $i$$15_response_text$$16$$.indexOf($spf$nav$response$Token$END$$, $start$$8$$);
    -1 < $finish$$ && ($chunk_extra$$1$$ = $spf$string$trim$$($i$$15_response_text$$16$$.substring($start$$8$$, $finish$$)), $start$$8$$ = $finish$$ + $spf$nav$response$Token$END$$.length, $chunk_extra$$1$$ && $opt_multipart_parts$$1$$.push(JSON.parse($chunk_extra$$1$$)));
    $chunk_extra$$1$$ = "";
    $i$$15_response_text$$16$$.length > $start$$8$$ && ($chunk_extra$$1$$ = $i$$15_response_text$$16$$.substring($start$$8$$), $opt_lastDitch$$ && $spf$string$endsWith$$($chunk_extra$$1$$, "\r\n") && ($chunk_extra$$1$$ = $chunk_extra$$1$$.substring(0, $chunk_extra$$1$$.length - 2)));
    if ($spf$config$values$$["experimental-parse-extract"]) {
      for ($i$$15_response_text$$16$$ = 0;$i$$15_response_text$$16$$ < $opt_multipart_parts$$1$$.length;$i$$15_response_text$$16$$++) {
        $opt_multipart_parts$$1$$[$i$$15_response_text$$16$$] = $spf$nav$response$extract$$($opt_multipart_parts$$1$$[$i$$15_response_text$$16$$]);
      }
    }
    return{$parts$:$opt_multipart_parts$$1$$, $extra$:$chunk_extra$$1$$};
  }
  $i$$15_response_text$$16$$ = JSON.parse($i$$15_response_text$$16$$);
  $opt_multipart_parts$$1$$ = "number" == typeof $i$$15_response_text$$16$$.length ? $i$$15_response_text$$16$$ : [$i$$15_response_text$$16$$];
  if ($spf$config$values$$["experimental-parse-extract"]) {
    for ($i$$15_response_text$$16$$ = 0;$i$$15_response_text$$16$$ < $opt_multipart_parts$$1$$.length;$i$$15_response_text$$16$$++) {
      $opt_multipart_parts$$1$$[$i$$15_response_text$$16$$] = $spf$nav$response$extract$$($opt_multipart_parts$$1$$[$i$$15_response_text$$16$$]);
    }
  }
  return{$parts$:$opt_multipart_parts$$1$$, $extra$:""};
}
function $spf$nav$response$process$$($url$$54$$, $response$$1$$, $opt_info$$, $opt_callback$$8$$) {
  $spf$debug$info$$("nav.response.process ", $response$$1$$, $opt_info$$);
  var $isNavigate$$ = $opt_info$$ && 0 == $opt_info$$.type.lastIndexOf("navigate", 0), $isReverse$$ = $opt_info$$ && $opt_info$$.reverse, $hasPosition$$ = $opt_info$$ && !!$opt_info$$.position, $hasScrolled$$ = $opt_info$$ && $opt_info$$.$scrolled$, $name$$76$$ = $response$$1$$.name || "", $key$$48$$ = "process " + $spf$url$absolute$$($url$$54$$), $sync$$ = !$spf$config$values$$["experimental-process-async"], $fn$$12_num$$5$$;
  $fn$$12_num$$5$$ = 0;
  $response$$1$$.timing || ($response$$1$$.timing = {});
  $response$$1$$.title && (document.title = $response$$1$$.title);
  $isNavigate$$ && $response$$1$$.url && $spf$url$absolute$$($response$$1$$.url) != $spf$url$absolute$$(window.location.href) && ($spf$debug$debug$$("  update history with response url"), $spf$history$replace$$($response$$1$$.url + window.location.hash));
  $response$$1$$.head && ($fn$$12_num$$5$$ = $spf$bind$$(function($head$$, $timing$$) {
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
  }, null, $response$$1$$.head, $response$$1$$.timing), $fn$$12_num$$5$$ = $spf$tasks$add$$($key$$48$$, $fn$$12_num$$5$$), $spf$debug$debug$$("  process task queued: head", $fn$$12_num$$5$$));
  $response$$1$$.attr && ($fn$$12_num$$5$$ = $spf$bind$$(function($attrs$$, $timing$$1$$) {
    for (var $id$$9$$ in $attrs$$) {
      var $el$$11_element$$inline_77$$ = document.getElementById($id$$9$$);
      if ($el$$11_element$$inline_77$$) {
        var $attributes$$inline_78$$ = $attrs$$[$id$$9$$], $name$$inline_79$$ = void 0;
        for ($name$$inline_79$$ in $attributes$$inline_78$$) {
          var $value$$inline_80$$ = $attributes$$inline_78$$[$name$$inline_79$$];
          "class" == $name$$inline_79$$ ? $el$$11_element$$inline_77$$.className = $value$$inline_80$$ : "style" == $name$$inline_79$$ ? $el$$11_element$$inline_77$$.style.cssText = $value$$inline_80$$ : $el$$11_element$$inline_77$$.setAttribute($name$$inline_79$$, $value$$inline_80$$);
        }
        $spf$debug$debug$$("    attr set", $id$$9$$);
      }
    }
    $timing$$1$$.spfProcessAttr = $spf$now$$();
    $spf$debug$debug$$("  process task done: attr");
  }, null, $response$$1$$.attr, $response$$1$$.timing), $fn$$12_num$$5$$ = $spf$tasks$add$$($key$$48$$, $fn$$12_num$$5$$), $spf$debug$debug$$("  process task queued: attr", $fn$$12_num$$5$$));
  var $fragments_numFragments$$ = $response$$1$$.body || {}, $numBeforeFragments$$ = $fn$$12_num$$5$$, $id$$8$$;
  for ($id$$8$$ in $fragments_numFragments$$) {
    $fn$$12_num$$5$$ = $spf$bind$$(function($id$$10$$, $body$$1$$) {
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
    }, null, $id$$8$$, $fragments_numFragments$$[$id$$8$$], $response$$1$$.timing), $fn$$12_num$$5$$ = $spf$tasks$add$$($key$$48$$, $fn$$12_num$$5$$), $spf$debug$debug$$("  process task queued: body", $id$$8$$, $fn$$12_num$$5$$);
  }
  $fragments_numFragments$$ = $fn$$12_num$$5$$ - $numBeforeFragments$$;
  $response$$1$$.foot ? ($fn$$12_num$$5$$ = $spf$bind$$(function($extracted$$2_foot$$, $timing$$3$$, $numFragments$$1$$) {
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
  }, null, $response$$1$$.foot, $response$$1$$.timing, $fragments_numFragments$$), $fn$$12_num$$5$$ = $spf$tasks$add$$($key$$48$$, $fn$$12_num$$5$$), $spf$debug$debug$$("  process task queued: foot", $fn$$12_num$$5$$)) : $fragments_numFragments$$ && ($fn$$12_num$$5$$ = $spf$bind$$(function($timing$$4$$) {
    $timing$$4$$.spfProcessBody = $spf$now$$();
    $spf$debug$debug$$("  process task done: timing-for-body");
  }, null, $response$$1$$.timing), $fn$$12_num$$5$$ = $spf$tasks$add$$($key$$48$$, $fn$$12_num$$5$$), $spf$debug$debug$$("  process task queued: timing-for-body", $fn$$12_num$$5$$));
  $opt_callback$$8$$ && ($fn$$12_num$$5$$ = $spf$tasks$add$$($key$$48$$, $spf$bind$$($opt_callback$$8$$, null, $url$$54$$, $response$$1$$)), $spf$debug$debug$$("  process task queued: callback", $fn$$12_num$$5$$));
  $spf$debug$debug$$("  process run", $key$$48$$, $sync$$);
  $spf$tasks$run$$($key$$48$$, $sync$$);
}
function $spf$nav$response$preprocess$$($url$$55$$, $response$$2$$, $key$$49_opt_info$$1$$, $opt_callback$$9$$) {
  $spf$debug$info$$("nav.response.preprocess ", $response$$2$$);
  $key$$49_opt_info$$1$$ = "preprocess " + $spf$url$absolute$$($url$$55$$);
  var $fn$$13$$;
  $response$$2$$.head && ($fn$$13$$ = $spf$bind$$(function($extracted$$3_head$$1$$) {
    $extracted$$3_head$$1$$ = $spf$nav$response$extract_$$($extracted$$3_head$$1$$);
    $spf$nav$response$preinstallLinks_$$($extracted$$3_head$$1$$);
    $spf$nav$response$preinstallStyles_$$($extracted$$3_head$$1$$);
    $spf$nav$response$preinstallScripts_$$($extracted$$3_head$$1$$);
    $spf$debug$debug$$("  preprocess task done: head");
  }, null, $response$$2$$.head), $spf$tasks$add$$($key$$49_opt_info$$1$$, $fn$$13$$), $spf$debug$debug$$("  preprocess task queued: head"));
  var $fragments$$1$$ = $response$$2$$.body || {}, $id$$11$$;
  for ($id$$11$$ in $fragments$$1$$) {
    $fragments$$1$$[$id$$11$$] && ($fn$$13$$ = $spf$bind$$(function($id$$12$$, $body$$2$$) {
      var $extracted$$4$$ = $spf$nav$response$extract_$$($body$$2$$);
      $spf$nav$response$preinstallStyles_$$($extracted$$4$$);
      $spf$nav$response$preinstallScripts_$$($extracted$$4$$);
      $spf$debug$debug$$("    body js", $id$$12$$);
      $spf$debug$debug$$("  preprocess task done: body", $id$$12$$);
    }, null, $id$$11$$, $fragments$$1$$[$id$$11$$]), $spf$tasks$add$$($key$$49_opt_info$$1$$, $fn$$13$$), $spf$debug$debug$$("  preprocess task queued: body", $id$$11$$));
  }
  $response$$2$$.foot && ($fn$$13$$ = $spf$bind$$(function($extracted$$5_foot$$1$$) {
    $extracted$$5_foot$$1$$ = $spf$nav$response$extract_$$($extracted$$5_foot$$1$$);
    $spf$nav$response$preinstallStyles_$$($extracted$$5_foot$$1$$);
    $spf$nav$response$preinstallScripts_$$($extracted$$5_foot$$1$$);
    $spf$debug$debug$$("  preprocess task done: foot");
  }, null, $response$$2$$.foot), $spf$tasks$add$$($key$$49_opt_info$$1$$, $fn$$13$$), $spf$debug$debug$$("  preprocess task queued: foot"));
  $opt_callback$$9$$ && ($spf$tasks$add$$($key$$49_opt_info$$1$$, $spf$bind$$($opt_callback$$9$$, null, $url$$55$$, $response$$2$$)), $spf$debug$debug$$("  preprocess task queued: callback"));
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
  var $element$$inline_82_refNode$$inline_87_refNode$$inline_90$$ = $data$$30$$.element, $container$$inline_83$$ = $data$$30$$.$oldEl$;
  if ($container$$inline_83$$) {
    for (var $child$$inline_84$$;$child$$inline_84$$ = $element$$inline_82_refNode$$inline_87_refNode$$inline_90$$.firstChild;) {
      $container$$inline_83$$.appendChild($child$$inline_84$$);
    }
    $element$$inline_82_refNode$$inline_87_refNode$$inline_90$$.appendChild($container$$inline_83$$);
  }
  $data$$30$$.$newEl$ = document.createElement("div");
  $data$$30$$.$newEl$.className = $data$$30$$.$newClass$;
  $data$$30$$.$newEl$.innerHTML = $data$$30$$.$html$;
  $data$$30$$.reverse ? ($element$$inline_82_refNode$$inline_87_refNode$$inline_90$$ = $data$$30$$.$oldEl$, $element$$inline_82_refNode$$inline_87_refNode$$inline_90$$.parentNode.insertBefore($data$$30$$.$newEl$, $element$$inline_82_refNode$$inline_87_refNode$$inline_90$$)) : ($element$$inline_82_refNode$$inline_87_refNode$$inline_90$$ = $data$$30$$.$oldEl$, $element$$inline_82_refNode$$inline_87_refNode$$inline_90$$.parentNode.insertBefore($data$$30$$.$newEl$, $element$$inline_82_refNode$$inline_87_refNode$$inline_90$$.nextSibling));
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
  var $element$$inline_92$$ = $data$$32$$.$newEl$, $child$$inline_93$$, $parent$$inline_94$$ = $element$$inline_92$$.parentNode;
  if ($parent$$inline_94$$ && 11 != $parent$$inline_94$$.nodeType) {
    if ($element$$inline_92$$.removeNode) {
      $element$$inline_92$$.removeNode(!1);
    } else {
      for (;$child$$inline_93$$ = $element$$inline_92$$.firstChild;) {
        $parent$$inline_94$$.insertBefore($child$$inline_93$$, $element$$inline_92$$);
      }
      $parent$$inline_94$$.removeChild($element$$inline_92$$);
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
  $response$$3$$.head && ($response$$3$$.head = $spf$nav$response$extract_$$($response$$3$$.head));
  if ($response$$3$$.body) {
    for (var $id$$13$$ in $response$$3$$.body) {
      $response$$3$$.body[$id$$13$$] = $spf$nav$response$extract_$$($response$$3$$.body[$id$$13$$]);
    }
  }
  $response$$3$$.foot && ($response$$3$$.foot = $spf$nav$response$extract_$$($response$$3$$.foot));
  return $response$$3$$;
}
function $spf$nav$response$extract_$$($frag$$) {
  var $result$$4$$ = new $spf$nav$response$Extraction_$$;
  if (!$frag$$) {
    return $result$$4$$;
  }
  if ("[object String]" != Object.prototype.toString.call($frag$$)) {
    return $frag$$.scripts && $spf$array$each$$($frag$$.scripts, function($script$$) {
      $result$$4$$.scripts.push({url:$script$$.url || "", text:$script$$.text || "", name:$script$$.name || "", async:$script$$.async || !1});
    }), $frag$$.styles && $spf$array$each$$($frag$$.styles, function($style$$) {
      $result$$4$$.styles.push({url:$style$$.url || "", text:$style$$.text || "", name:$style$$.name || ""});
    }), $frag$$.links && $spf$config$values$$["experimental-preconnect"] && $spf$array$each$$($frag$$.links, function($link$$) {
      "spf-preconnect" == $link$$.rel && $result$$4$$.links.push({url:$link$$.url || "", rel:$link$$.rel || ""});
    }), $result$$4$$.html = $frag$$.html || "", $result$$4$$;
  }
  $frag$$ = $frag$$.replace($spf$nav$response$ElementRegEx$SCRIPT_STYLE$$, function($full_name$$77$$, $tag$$1_url$$56$$, $async_attr$$, $text$$17$$) {
    return "script" == $tag$$1_url$$56$$ ? ($full_name$$77$$ = ($full_name$$77$$ = $async_attr$$.match($spf$nav$response$AttributeRegEx$NAME$$)) ? $full_name$$77$$[1] : "", $tag$$1_url$$56$$ = ($tag$$1_url$$56$$ = $async_attr$$.match($spf$nav$response$AttributeRegEx$SRC$$)) ? $tag$$1_url$$56$$[1] : "", $async_attr$$ = $spf$nav$response$AttributeRegEx$ASYNC$$.test($async_attr$$), $result$$4$$.scripts.push({url:$tag$$1_url$$56$$, text:$text$$17$$, name:$full_name$$77$$, async:$async_attr$$}), "") : 
    "style" == $tag$$1_url$$56$$ ? ($full_name$$77$$ = ($full_name$$77$$ = $async_attr$$.match($spf$nav$response$AttributeRegEx$NAME$$)) ? $full_name$$77$$[1] : "", $result$$4$$.styles.push({url:"", text:$text$$17$$, name:$full_name$$77$$}), "") : $full_name$$77$$;
  });
  $frag$$ = $frag$$.replace($spf$nav$response$ElementRegEx$LINK$$, function($full$$1$$, $attr$$1$$) {
    var $name$$78_rel$$ = $attr$$1$$.match($spf$nav$response$AttributeRegEx$REL$$), $name$$78_rel$$ = $name$$78_rel$$ ? $name$$78_rel$$[1] : "";
    if ("stylesheet" == $name$$78_rel$$) {
      var $name$$78_rel$$ = ($name$$78_rel$$ = $attr$$1$$.match($spf$nav$response$AttributeRegEx$NAME$$)) ? $name$$78_rel$$[1] : "", $url$$57$$ = $attr$$1$$.match($spf$nav$response$AttributeRegEx$HREF$$), $url$$57$$ = $url$$57$$ ? $url$$57$$[1] : "";
      $result$$4$$.styles.push({url:$url$$57$$, text:"", name:$name$$78_rel$$});
      return "";
    }
    return "spf-preconnect" == $name$$78_rel$$ && $spf$config$values$$["experimental-preconnect"] ? ($url$$57$$ = ($url$$57$$ = $attr$$1$$.match($spf$nav$response$AttributeRegEx$HREF$$)) ? $url$$57$$[1] : "", $result$$4$$.links.push({url:$url$$57$$, rel:$name$$78_rel$$}), "") : $full$$1$$;
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
        var $item$$ = $result$$5$$.scripts[$index$$46$$], $fn$$14$$ = function $$fn$$14$$$() {
        };
        $item$$.url ? $fn$$14$$ = $item$$.name ? $spf$bind$$($spf$net$script$load$$, null, $item$$.url, $item$$.name) : $spf$bind$$($spf$net$script$get$$, null, $item$$.url) : $item$$.text && ($fn$$14$$ = $item$$.name ? $spf$bind$$($spf$net$script$eval$$, null, $item$$.text, $item$$.name) : $spf$bind$$($spf$net$script$exec$$, null, $item$$.text));
        $item$$.url && !$item$$.async ? $fn$$14$$($next$$4$$) : ($fn$$14$$(), $next$$4$$());
      } else {
        $opt_callback$$10$$ && $opt_callback$$10$$();
      }
    };
    $next$$4$$();
  }
}
function $spf$nav$response$preinstallScripts_$$($result$$6_urls$$3$$) {
  0 >= $result$$6_urls$$3$$.scripts.length || ($result$$6_urls$$3$$ = $spf$array$map$$($result$$6_urls$$3$$.scripts, function($item$$1$$) {
    return $item$$1$$.url;
  }), $spf$net$script$prefetch$$($result$$6_urls$$3$$));
}
function $spf$nav$response$installStyles_$$($result$$7$$) {
  if (!(0 >= $result$$7$$.styles.length)) {
    for (var $i$$16$$ = 0, $l$$7$$ = $result$$7$$.styles.length;$i$$16$$ < $l$$7$$;$i$$16$$++) {
      var $item$$2$$ = $result$$7$$.styles[$i$$16$$];
      $item$$2$$.url ? $item$$2$$.name ? $spf$net$style$load$$($item$$2$$.url, $item$$2$$.name) : $spf$net$style$get$$($item$$2$$.url) : $item$$2$$.text && ($item$$2$$.name ? $spf$net$resource$eval$$($spf$net$resource$Type$CSS$$, $item$$2$$.text, $item$$2$$.name) : $spf$net$resource$exec$$($spf$net$resource$Type$CSS$$, $item$$2$$.text));
    }
  }
}
function $spf$nav$response$preinstallStyles_$$($result$$8_urls$$4$$) {
  0 >= $result$$8_urls$$4$$.styles.length || ($result$$8_urls$$4$$ = $spf$array$map$$($result$$8_urls$$4$$.styles, function($item$$3$$) {
    return $item$$3$$.url;
  }), $spf$net$style$prefetch$$($result$$8_urls$$4$$));
}
function $spf$nav$response$preinstallLinks_$$($result$$10_urls$$5$$) {
  0 >= $result$$10_urls$$5$$.links.length || ($result$$10_urls$$5$$ = $spf$array$map$$($result$$10_urls$$5$$.links, function($item$$4$$) {
    return "spf-preconnect" == $item$$4$$.rel ? $item$$4$$.url : "";
  }), $spf$net$connect$preconnect$$($result$$10_urls$$5$$));
}
function $spf$nav$response$Animation_$$($el$$13$$, $html_node$$inline_101_prevName$$1$$, $cls$$6$$, $name$$79$$, $reverse$$) {
  var $duration_uid$$inline_105$$ = parseInt($spf$config$values$$["animation-duration"], 10);
  this.element = $el$$13$$;
  this.$html$ = $html_node$$inline_101_prevName$$1$$;
  this.duration = $duration_uid$$inline_105$$;
  this.reverse = $reverse$$;
  $html_node$$inline_101_prevName$$1$$ = document.body;
  $html_node$$inline_101_prevName$$1$$ = ($html_node$$inline_101_prevName$$1$$.dataset ? $html_node$$inline_101_prevName$$1$$.dataset.spfName : $html_node$$inline_101_prevName$$1$$.getAttribute("data-" + "spfName".replace(/([A-Z])/g, "-$1").toLowerCase())) || "";
  $duration_uid$$inline_105$$ = parseInt($spf$state$values_$$.uid, 10) || 0;
  $duration_uid$$inline_105$$++;
  this.key = $el$$13$$["spf-key"] || ($el$$13$$["spf-key"] = "" + $spf$state$set$$("uid", $duration_uid$$inline_105$$));
  this.$fromClass$ = $html_node$$inline_101_prevName$$1$$ && $cls$$6$$ + "-from-" + $html_node$$inline_101_prevName$$1$$;
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
  if ("transition" in $testEl$$.style) {
    return!0;
  }
  for (var $prefixes$$ = ["webkit", "Moz", "Ms", "O", "Khtml"], $i$$17$$ = 0, $l$$8$$ = $prefixes$$.length;$i$$17$$ < $l$$8$$;$i$$17$$++) {
    if ($prefixes$$[$i$$17$$] + "Transition" in $testEl$$.style) {
      return!0;
    }
  }
  return!1;
}(), $spf$nav$response$ElementRegEx$LINK$$ = /\x3clink([\s\S]*?)\x3e/ig, $spf$nav$response$ElementRegEx$SCRIPT_STYLE$$ = /\x3c(script|style)([\s\S]*?)\x3e([\s\S]*?)\x3c\/\1\x3e/ig, $spf$nav$response$AttributeRegEx$ASYNC$$ = /(?:\s|^)async(?:\s|=|$)/i, $spf$nav$response$AttributeRegEx$HREF$$ = /(?:\s|^)href\s*=\s*["']?([^\s"']+)/i, $spf$nav$response$AttributeRegEx$NAME$$ = /(?:\s|^)name\s*=\s*["']?([^\s"']+)/i, $spf$nav$response$AttributeRegEx$REL$$ = /(?:\s|^)rel\s*=\s*["']?([^\s"']+)/i, $spf$nav$response$AttributeRegEx$SRC$$ = 
/(?:\s|^)src\s*=\s*["']?([^\s"']+)/i, $spf$nav$response$Token$BEGIN$$ = "[\r\n", $spf$nav$response$Token$DELIMITER$$ = ",\r\n", $spf$nav$response$Token$END$$ = "]\r\n";
function $spf$net$xhr$send$$($addContentType_method$$2$$, $url$$60$$, $data$$34$$, $opt_options$$17$$) {
  var $options$$4$$ = $opt_options$$17$$ || {}, $chunked$$ = !1, $offset$$14$$ = 0, $timer$$, $xhr$$ = new XMLHttpRequest;
  $xhr$$.open($addContentType_method$$2$$, $url$$60$$, !0);
  $xhr$$.timing = {};
  var $xhr_abort$$ = $xhr$$.abort;
  $xhr$$.abort = function $$xhr$$$abort$() {
    clearTimeout($timer$$);
    $xhr$$.onreadystatechange = null;
    $xhr_abort$$.call($xhr$$);
  };
  $xhr$$.onreadystatechange = function $$xhr$$$onreadystatechange$() {
    var $chunk$$1_firefoxSpdy_timing$$5$$ = $xhr$$.timing;
    if ($xhr$$.readyState == $spf$net$xhr$State$HEADERS_RECEIVED$$) {
      $chunk$$1_firefoxSpdy_timing$$5$$.responseStart = $chunk$$1_firefoxSpdy_timing$$5$$.responseStart || $spf$now$$();
      $chunked$$ = -1 < ($xhr$$.getResponseHeader("Transfer-Encoding") || "").toLowerCase().indexOf("chunked");
      if (!$chunked$$) {
        var $chunk$$1_firefoxSpdy_timing$$5$$ = $xhr$$.getResponseHeader("X-Firefox-Spdy"), $chromeSpdy_loadTimes$$ = window.chrome && chrome.loadTimes && chrome.loadTimes(), $chromeSpdy_loadTimes$$ = $chromeSpdy_loadTimes$$ && $chromeSpdy_loadTimes$$.wasFetchedViaSpdy;
        $chunked$$ = !(!$chunk$$1_firefoxSpdy_timing$$5$$ && !$chromeSpdy_loadTimes$$);
      }
      $options$$4$$.$onHeaders$ && $options$$4$$.$onHeaders$($xhr$$);
    } else {
      $xhr$$.readyState == $spf$net$xhr$State$LOADING$$ ? $chunked$$ && $options$$4$$.$onChunk$ && ($chunk$$1_firefoxSpdy_timing$$5$$ = $xhr$$.responseText.substring($offset$$14$$), $offset$$14$$ = $xhr$$.responseText.length, $options$$4$$.$onChunk$($xhr$$, $chunk$$1_firefoxSpdy_timing$$5$$)) : $xhr$$.readyState == $spf$net$xhr$State$DONE$$ && ($chunk$$1_firefoxSpdy_timing$$5$$.responseEnd = $chunk$$1_firefoxSpdy_timing$$5$$.responseEnd || $spf$now$$(), window.performance && window.performance.getEntriesByName && 
      ($xhr$$.resourceTiming = window.performance.getEntriesByName($url$$60$$).pop()), $chunked$$ && $options$$4$$.$onChunk$ && $xhr$$.responseText.length > $offset$$14$$ && ($chunk$$1_firefoxSpdy_timing$$5$$ = $xhr$$.responseText.substring($offset$$14$$), $offset$$14$$ = $xhr$$.responseText.length, $options$$4$$.$onChunk$($xhr$$, $chunk$$1_firefoxSpdy_timing$$5$$)), clearTimeout($timer$$), $options$$4$$.$onDone$ && $options$$4$$.$onDone$($xhr$$));
    }
  };
  $addContentType_method$$2$$ = "POST" == $addContentType_method$$2$$;
  if ($options$$4$$.headers) {
    for (var $key$$50$$ in $options$$4$$.headers) {
      $xhr$$.setRequestHeader($key$$50$$, $options$$4$$.headers[$key$$50$$]), "content-type" == $key$$50$$.toLowerCase() && ($addContentType_method$$2$$ = !1);
    }
  }
  $addContentType_method$$2$$ && $xhr$$.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  0 < $options$$4$$.$timeoutMs$ && ($timer$$ = setTimeout(function() {
    $xhr$$.abort();
    $options$$4$$.$onTimeout$ && $options$$4$$.$onTimeout$($xhr$$);
  }, $options$$4$$.$timeoutMs$));
  $xhr$$.timing.fetchStart = $spf$now$$();
  $xhr$$.send($data$$34$$);
  return $xhr$$;
}
var $spf$net$xhr$State$HEADERS_RECEIVED$$ = 2, $spf$net$xhr$State$LOADING$$ = 3, $spf$net$xhr$State$DONE$$ = 4;
function $spf$nav$request$send$$($url$$61$$, $opt_options$$18$$) {
  $spf$debug$debug$$("nav.request.send ", $url$$61$$, $opt_options$$18$$);
  var $options$$5$$ = $opt_options$$18$$ || {};
  $options$$5$$.method = (($options$$5$$.method || "GET") + "").toUpperCase();
  $options$$5$$.type = $options$$5$$.type || "request";
  var $handleComplete_path$$inline_112_timing$$6_url$$inline_107_xhrOpts$$ = $url$$61$$, $ident$$inline_109_requestUrl$$ = $spf$config$values$$["url-identifier"] || "";
  if ($ident$$inline_109_requestUrl$$) {
    var $ident$$inline_109_requestUrl$$ = $ident$$inline_109_requestUrl$$.replace("__type__", $options$$5$$.type || ""), $cached$$inline_124_hashParts$$inline_110_hashVal$$inline_116_key$$inline_205$$ = $spf$string$partition$$($handleComplete_path$$inline_112_timing$$6_url$$inline_107_xhrOpts$$, "#"), $cacheKey$$inline_119_chunking_headerId_i$$inline_122_queryParts$$inline_111_queryVal$$inline_114$$ = $spf$string$partition$$($cached$$inline_124_hashParts$$inline_110_hashVal$$inline_116_key$$inline_205$$[0], 
    "?"), $handleComplete_path$$inline_112_timing$$6_url$$inline_107_xhrOpts$$ = $cacheKey$$inline_119_chunking_headerId_i$$inline_122_queryParts$$inline_111_queryVal$$inline_114$$[0], $cached_headers_keys$$inline_121_querySep$$inline_113$$ = $cacheKey$$inline_119_chunking_headerId_i$$inline_122_queryParts$$inline_111_queryVal$$inline_114$$[1], $cacheKey$$inline_119_chunking_headerId_i$$inline_122_queryParts$$inline_111_queryVal$$inline_114$$ = $cacheKey$$inline_119_chunking_headerId_i$$inline_122_queryParts$$inline_111_queryVal$$inline_114$$[2], 
    $hashSep$$inline_115_l$$inline_123_opt_current$$inline_120$$ = $cached$$inline_124_hashParts$$inline_110_hashVal$$inline_116_key$$inline_205$$[1], $cached$$inline_124_hashParts$$inline_110_hashVal$$inline_116_key$$inline_205$$ = $cached$$inline_124_hashParts$$inline_110_hashVal$$inline_116_key$$inline_205$$[2];
    if (0 == $ident$$inline_109_requestUrl$$.lastIndexOf("?", 0)) {
      $cached_headers_keys$$inline_121_querySep$$inline_113$$ && ($ident$$inline_109_requestUrl$$ = $ident$$inline_109_requestUrl$$.replace("?", "&")), $cacheKey$$inline_119_chunking_headerId_i$$inline_122_queryParts$$inline_111_queryVal$$inline_114$$ += $ident$$inline_109_requestUrl$$;
    } else {
      if (0 == $ident$$inline_109_requestUrl$$.lastIndexOf(".", 0)) {
        if ($spf$string$endsWith$$($handleComplete_path$$inline_112_timing$$6_url$$inline_107_xhrOpts$$, "/")) {
          $ident$$inline_109_requestUrl$$ = "index" + $ident$$inline_109_requestUrl$$;
        } else {
          var $ext$$inline_117_storage$$inline_206_unit$$inline_207$$ = $handleComplete_path$$inline_112_timing$$6_url$$inline_107_xhrOpts$$.lastIndexOf(".");
          -1 < $ext$$inline_117_storage$$inline_206_unit$$inline_207$$ && ($handleComplete_path$$inline_112_timing$$6_url$$inline_107_xhrOpts$$ = $handleComplete_path$$inline_112_timing$$6_url$$inline_107_xhrOpts$$.substring(0, $ext$$inline_117_storage$$inline_206_unit$$inline_207$$));
        }
      } else {
        $spf$string$endsWith$$($handleComplete_path$$inline_112_timing$$6_url$$inline_107_xhrOpts$$, "/") && 0 == $ident$$inline_109_requestUrl$$.lastIndexOf("/", 0) && ($ident$$inline_109_requestUrl$$ = $ident$$inline_109_requestUrl$$.substring(1));
      }
      $handleComplete_path$$inline_112_timing$$6_url$$inline_107_xhrOpts$$ += $ident$$inline_109_requestUrl$$;
    }
    $handleComplete_path$$inline_112_timing$$6_url$$inline_107_xhrOpts$$ = $handleComplete_path$$inline_112_timing$$6_url$$inline_107_xhrOpts$$ + $cached_headers_keys$$inline_121_querySep$$inline_113$$ + $cacheKey$$inline_119_chunking_headerId_i$$inline_122_queryParts$$inline_111_queryVal$$inline_114$$ + $hashSep$$inline_115_l$$inline_123_opt_current$$inline_120$$ + $cached$$inline_124_hashParts$$inline_110_hashVal$$inline_116_key$$inline_205$$;
  }
  $ident$$inline_109_requestUrl$$ = $spf$url$absolute$$($handleComplete_path$$inline_112_timing$$6_url$$inline_107_xhrOpts$$);
  $spf$debug$debug$$("    request url ", $ident$$inline_109_requestUrl$$);
  $handleComplete_path$$inline_112_timing$$6_url$$inline_107_xhrOpts$$ = {};
  $handleComplete_path$$inline_112_timing$$6_url$$inline_107_xhrOpts$$.spfUrl = $ident$$inline_109_requestUrl$$;
  $handleComplete_path$$inline_112_timing$$6_url$$inline_107_xhrOpts$$.startTime = $spf$now$$();
  $handleComplete_path$$inline_112_timing$$6_url$$inline_107_xhrOpts$$.fetchStart = $handleComplete_path$$inline_112_timing$$6_url$$inline_107_xhrOpts$$.startTime;
  a: {
    $cacheKey$$inline_119_chunking_headerId_i$$inline_122_queryParts$$inline_111_queryVal$$inline_114$$ = $spf$nav$request$getCacheKey_$$($url$$61$$, $options$$5$$.current, null, $options$$5$$.type, !1);
    $hashSep$$inline_115_l$$inline_123_opt_current$$inline_120$$ = $options$$5$$.current;
    $cached_headers_keys$$inline_121_querySep$$inline_113$$ = [];
    $hashSep$$inline_115_l$$inline_123_opt_current$$inline_120$$ && ($cached_headers_keys$$inline_121_querySep$$inline_113$$.push($cacheKey$$inline_119_chunking_headerId_i$$inline_122_queryParts$$inline_111_queryVal$$inline_114$$ + " previous " + $hashSep$$inline_115_l$$inline_123_opt_current$$inline_120$$), $cached_headers_keys$$inline_121_querySep$$inline_113$$.push($cacheKey$$inline_119_chunking_headerId_i$$inline_122_queryParts$$inline_111_queryVal$$inline_114$$ + " previous " + $spf$url$utils$$($hashSep$$inline_115_l$$inline_123_opt_current$$inline_120$$).pathname));
    $cached_headers_keys$$inline_121_querySep$$inline_113$$.push($cacheKey$$inline_119_chunking_headerId_i$$inline_122_queryParts$$inline_111_queryVal$$inline_114$$);
    $cacheKey$$inline_119_chunking_headerId_i$$inline_122_queryParts$$inline_111_queryVal$$inline_114$$ = 0;
    for ($hashSep$$inline_115_l$$inline_123_opt_current$$inline_120$$ = $cached_headers_keys$$inline_121_querySep$$inline_113$$.length;$cacheKey$$inline_119_chunking_headerId_i$$inline_122_queryParts$$inline_111_queryVal$$inline_114$$ < $hashSep$$inline_115_l$$inline_123_opt_current$$inline_120$$;$cacheKey$$inline_119_chunking_headerId_i$$inline_122_queryParts$$inline_111_queryVal$$inline_114$$++) {
      b: {
        $cached$$inline_124_hashParts$$inline_110_hashVal$$inline_116_key$$inline_205$$ = $cached_headers_keys$$inline_121_querySep$$inline_113$$[$cacheKey$$inline_119_chunking_headerId_i$$inline_122_queryParts$$inline_111_queryVal$$inline_114$$];
        $ext$$inline_117_storage$$inline_206_unit$$inline_207$$ = $spf$cache$storage_$$();
        if ($cached$$inline_124_hashParts$$inline_110_hashVal$$inline_116_key$$inline_205$$ in $ext$$inline_117_storage$$inline_206_unit$$inline_207$$) {
          $ext$$inline_117_storage$$inline_206_unit$$inline_207$$ = $ext$$inline_117_storage$$inline_206_unit$$inline_207$$[$cached$$inline_124_hashParts$$inline_110_hashVal$$inline_116_key$$inline_205$$];
          if ($spf$cache$valid_$$($ext$$inline_117_storage$$inline_206_unit$$inline_207$$)) {
            $spf$cache$updateCount_$$($ext$$inline_117_storage$$inline_206_unit$$inline_207$$);
            $cached$$inline_124_hashParts$$inline_110_hashVal$$inline_116_key$$inline_205$$ = $ext$$inline_117_storage$$inline_206_unit$$inline_207$$.data;
            break b;
          }
          $spf$cache$remove$$($cached$$inline_124_hashParts$$inline_110_hashVal$$inline_116_key$$inline_205$$);
        }
        $cached$$inline_124_hashParts$$inline_110_hashVal$$inline_116_key$$inline_205$$ = void 0;
      }
      if ($cached$$inline_124_hashParts$$inline_110_hashVal$$inline_116_key$$inline_205$$) {
        $cached_headers_keys$$inline_121_querySep$$inline_113$$ = {key:$cached_headers_keys$$inline_121_querySep$$inline_113$$[$cacheKey$$inline_119_chunking_headerId_i$$inline_122_queryParts$$inline_111_queryVal$$inline_114$$], response:$cached$$inline_124_hashParts$$inline_110_hashVal$$inline_116_key$$inline_205$$.response, type:$cached$$inline_124_hashParts$$inline_110_hashVal$$inline_116_key$$inline_205$$.type};
        break a;
      }
    }
    $cached_headers_keys$$inline_121_querySep$$inline_113$$ = null;
  }
  $handleComplete_path$$inline_112_timing$$6_url$$inline_107_xhrOpts$$.spfPrefetched = !!$cached_headers_keys$$inline_121_querySep$$inline_113$$ && "prefetch" == $cached_headers_keys$$inline_121_querySep$$inline_113$$.type;
  $handleComplete_path$$inline_112_timing$$6_url$$inline_107_xhrOpts$$.spfCached = !!$cached_headers_keys$$inline_121_querySep$$inline_113$$;
  if ($cached_headers_keys$$inline_121_querySep$$inline_113$$) {
    return setTimeout($spf$bind$$($spf$nav$request$handleResponseFromCache_$$, null, $url$$61$$, $options$$5$$, $handleComplete_path$$inline_112_timing$$6_url$$inline_107_xhrOpts$$, $cached_headers_keys$$inline_121_querySep$$inline_113$$.key, $cached_headers_keys$$inline_121_querySep$$inline_113$$.response), 0), null;
  }
  $spf$debug$debug$$("    sending XHR");
  $cached_headers_keys$$inline_121_querySep$$inline_113$$ = {};
  void 0 != $options$$5$$.$referer$ && ($cached_headers_keys$$inline_121_querySep$$inline_113$$["X-SPF-Referer"] = $options$$5$$.$referer$);
  $options$$5$$.current && ($cached_headers_keys$$inline_121_querySep$$inline_113$$["X-SPF-Previous"] = $options$$5$$.current);
  if ($cacheKey$$inline_119_chunking_headerId_i$$inline_122_queryParts$$inline_111_queryVal$$inline_114$$ = $spf$config$values$$["advanced-header-identifier"]) {
    $cached_headers_keys$$inline_121_querySep$$inline_113$$["X-SPF-Request"] = $cacheKey$$inline_119_chunking_headerId_i$$inline_122_queryParts$$inline_111_queryVal$$inline_114$$.replace("__type__", $options$$5$$.type), $cached_headers_keys$$inline_121_querySep$$inline_113$$.Accept = "application/json";
  }
  $cacheKey$$inline_119_chunking_headerId_i$$inline_122_queryParts$$inline_111_queryVal$$inline_114$$ = new $spf$nav$request$Chunking_$$;
  $handleComplete_path$$inline_112_timing$$6_url$$inline_107_xhrOpts$$ = $spf$bind$$($spf$nav$request$handleCompleteFromXHR_$$, null, $url$$61$$, $options$$5$$, $handleComplete_path$$inline_112_timing$$6_url$$inline_107_xhrOpts$$, $cacheKey$$inline_119_chunking_headerId_i$$inline_122_queryParts$$inline_111_queryVal$$inline_114$$);
  $handleComplete_path$$inline_112_timing$$6_url$$inline_107_xhrOpts$$ = {headers:$cached_headers_keys$$inline_121_querySep$$inline_113$$, $timeoutMs$:$spf$config$values$$["request-timeout"], $onHeaders$:$spf$bind$$($spf$nav$request$handleHeadersFromXHR_$$, null, $url$$61$$, $cacheKey$$inline_119_chunking_headerId_i$$inline_122_queryParts$$inline_111_queryVal$$inline_114$$), $onChunk$:$spf$bind$$($spf$nav$request$handleChunkFromXHR_$$, null, $url$$61$$, $options$$5$$, $cacheKey$$inline_119_chunking_headerId_i$$inline_122_queryParts$$inline_111_queryVal$$inline_114$$), 
  $onDone$:$handleComplete_path$$inline_112_timing$$6_url$$inline_107_xhrOpts$$, $onTimeout$:$handleComplete_path$$inline_112_timing$$6_url$$inline_107_xhrOpts$$};
  return "POST" == $options$$5$$.method ? $spf$net$xhr$send$$("POST", $ident$$inline_109_requestUrl$$, $options$$5$$.$postData$, $handleComplete_path$$inline_112_timing$$6_url$$inline_107_xhrOpts$$) : $spf$net$xhr$send$$("GET", $ident$$inline_109_requestUrl$$, null, $handleComplete_path$$inline_112_timing$$6_url$$inline_107_xhrOpts$$);
}
function $spf$nav$request$handleResponseFromCache_$$($url$$62$$, $options$$6$$, $timing$$7$$, $cacheKey$$1_parts$$2$$, $response$$5$$) {
  $spf$debug$debug$$("nav.request.handleResponseFromCache_ ", $url$$62$$, $response$$5$$);
  var $updateCache$$ = !1;
  $timing$$7$$.responseStart = $timing$$7$$.responseEnd = $spf$now$$();
  $options$$6$$.type && 0 == $options$$6$$.type.lastIndexOf("navigate", 0) && ($timing$$7$$.navigationStart = $timing$$7$$.startTime, $spf$config$values$$["cache-unified"] || ($spf$cache$remove$$($cacheKey$$1_parts$$2$$), $updateCache$$ = !0));
  if ($options$$6$$.$onPart$ && "multipart" == $response$$5$$.type) {
    $cacheKey$$1_parts$$2$$ = $response$$5$$.parts;
    for (var $i$$18$$ = 0;$i$$18$$ < $cacheKey$$1_parts$$2$$.length;$i$$18$$++) {
      $options$$6$$.$onPart$($url$$62$$, $cacheKey$$1_parts$$2$$[$i$$18$$]);
    }
  }
  $spf$nav$request$done_$$($url$$62$$, $options$$6$$, $timing$$7$$, $response$$5$$, $updateCache$$);
}
function $spf$nav$request$handleHeadersFromXHR_$$($multipart_url$$63$$, $chunking$$1$$, $xhr$$2$$) {
  $spf$debug$debug$$("nav.request.handleHeadersFromXHR_ ", $multipart_url$$63$$, $xhr$$2$$);
  $multipart_url$$63$$ = -1 != ($xhr$$2$$.getResponseHeader("X-SPF-Response-Type") || "").toLowerCase().indexOf("multipart");
  $spf$debug$debug$$("    response is", ($multipart_url$$63$$ ? "" : "non-") + "multipart");
  $chunking$$1$$.$multipart$ = $multipart_url$$63$$;
}
function $spf$nav$request$handleChunkFromXHR_$$($url$$64$$, $options$$7$$, $chunking$$2$$, $i$$19_xhr$$3$$, $chunk$$2_text$$18$$, $opt_lastDitch$$1$$) {
  $spf$debug$debug$$("nav.request.handleChunkFromXHR_ ", $url$$64$$, {extra:$chunking$$2$$.$extra$, chunk:$chunk$$2_text$$18$$});
  if ($chunking$$2$$.$multipart$) {
    $chunk$$2_text$$18$$ = $chunking$$2$$.$extra$ + $chunk$$2_text$$18$$;
    var $parsed$$;
    try {
      $parsed$$ = $spf$nav$response$parse$$($chunk$$2_text$$18$$, !0, $opt_lastDitch$$1$$);
    } catch ($err$$2$$) {
      $spf$debug$debug$$("    JSON parse failed", $chunk$$2_text$$18$$);
      $i$$19_xhr$$3$$.abort();
      $options$$7$$.$onError$ && $options$$7$$.$onError$($url$$64$$, $err$$2$$);
      return;
    }
    if ($options$$7$$.$onPart$) {
      for ($i$$19_xhr$$3$$ = 0;$i$$19_xhr$$3$$ < $parsed$$.$parts$.length;$i$$19_xhr$$3$$++) {
        $spf$debug$debug$$("    parsed part", $parsed$$.$parts$[$i$$19_xhr$$3$$]), $options$$7$$.$onPart$($url$$64$$, $parsed$$.$parts$[$i$$19_xhr$$3$$]);
      }
    }
    $chunking$$2$$.complete = $chunking$$2$$.complete.concat($parsed$$.$parts$);
    $chunking$$2$$.$extra$ = $parsed$$.$extra$;
  } else {
    $spf$debug$debug$$("    skipping non-multipart response");
  }
}
function $spf$nav$request$handleCompleteFromXHR_$$($url$$65$$, $options$$8$$, $timing$$8$$, $chunking$$3_i$$20$$, $l$$9_xhr$$4$$) {
  $spf$debug$debug$$("nav.request.handleCompleteFromXHR_ ", $url$$65$$, {extra:$chunking$$3_i$$20$$.$extra$, complete:$l$$9_xhr$$4$$.responseText});
  if ($l$$9_xhr$$4$$.timing) {
    for (var $navigationStart_t$$ in $l$$9_xhr$$4$$.timing) {
      $timing$$8$$[$navigationStart_t$$] = $l$$9_xhr$$4$$.timing[$navigationStart_t$$];
    }
  }
  if ($l$$9_xhr$$4$$.resourceTiming) {
    if ("load" == $options$$8$$.type) {
      for (var $key$$51_value$$56$$ in $l$$9_xhr$$4$$.resourceTiming) {
        $timing$$8$$[$key$$51_value$$56$$] = $l$$9_xhr$$4$$.resourceTiming[$key$$51_value$$56$$];
      }
    } else {
      if (window.performance && window.performance.timing && ($navigationStart_t$$ = window.performance.timing.navigationStart, $navigationStart_t$$ + $l$$9_xhr$$4$$.resourceTiming.startTime >= $timing$$8$$.startTime)) {
        for (var $metric_part$$ in $l$$9_xhr$$4$$.resourceTiming) {
          $key$$51_value$$56$$ = $l$$9_xhr$$4$$.resourceTiming[$metric_part$$], void 0 !== $key$$51_value$$56$$ && ($spf$string$endsWith$$($metric_part$$, "Start") || $spf$string$endsWith$$($metric_part$$, "End") || "startTime" == $metric_part$$) && ($timing$$8$$[$metric_part$$] = $navigationStart_t$$ + Math.round($key$$51_value$$56$$));
        }
      }
    }
  }
  "load" != $options$$8$$.type && ($timing$$8$$.navigationStart = $timing$$8$$.startTime);
  $chunking$$3_i$$20$$.complete.length && ($chunking$$3_i$$20$$.$extra$ = $spf$string$trim$$($chunking$$3_i$$20$$.$extra$), $chunking$$3_i$$20$$.$extra$ && $spf$nav$request$handleChunkFromXHR_$$($url$$65$$, $options$$8$$, $chunking$$3_i$$20$$, $l$$9_xhr$$4$$, "", !0));
  var $parts$$3_response$$6$$;
  try {
    $parts$$3_response$$6$$ = $spf$nav$response$parse$$($l$$9_xhr$$4$$.responseText).$parts$;
  } catch ($err$$3$$) {
    $spf$debug$debug$$("    JSON parse failed");
    $options$$8$$.$onError$ && $options$$8$$.$onError$($url$$65$$, $err$$3$$);
    return;
  }
  if ($options$$8$$.$onPart$ && 1 < $parts$$3_response$$6$$.length) {
    for ($chunking$$3_i$$20$$ = $chunking$$3_i$$20$$.complete.length;$chunking$$3_i$$20$$ < $parts$$3_response$$6$$.length;$chunking$$3_i$$20$$++) {
      $spf$debug$debug$$("    parsed part", $parts$$3_response$$6$$[$chunking$$3_i$$20$$]), $options$$8$$.$onPart$($url$$65$$, $parts$$3_response$$6$$[$chunking$$3_i$$20$$]);
    }
  }
  if (1 < $parts$$3_response$$6$$.length) {
    var $cacheType$$;
    $chunking$$3_i$$20$$ = 0;
    for ($l$$9_xhr$$4$$ = $parts$$3_response$$6$$.length;$chunking$$3_i$$20$$ < $l$$9_xhr$$4$$;$chunking$$3_i$$20$$++) {
      $metric_part$$ = $parts$$3_response$$6$$[$chunking$$3_i$$20$$], $metric_part$$.cacheType && ($cacheType$$ = $metric_part$$.cacheType);
    }
    $parts$$3_response$$6$$ = {parts:$parts$$3_response$$6$$, type:"multipart"};
    $cacheType$$ && ($parts$$3_response$$6$$.cacheType = $cacheType$$);
  } else {
    $parts$$3_response$$6$$ = 1 == $parts$$3_response$$6$$.length ? $parts$$3_response$$6$$[0] : {};
  }
  $spf$nav$request$done_$$($url$$65$$, $options$$8$$, $timing$$8$$, $parts$$3_response$$6$$, !0);
}
function $spf$nav$request$done_$$($url$$66$$, $options$$9$$, $timing$$9$$, $response$$7$$, $cache_cacheKey$$2$$) {
  $spf$debug$debug$$("nav.request.done_", $url$$66$$, $options$$9$$, $timing$$9$$, $response$$7$$, $cache_cacheKey$$2$$);
  if ($cache_cacheKey$$2$$ && "POST" != $options$$9$$.method && ($cache_cacheKey$$2$$ = $spf$nav$request$getCacheKey_$$($url$$66$$, $options$$9$$.current, $response$$7$$.cacheType, $options$$9$$.type, !0))) {
    $response$$7$$.cacheKey = $cache_cacheKey$$2$$;
    var $data$$inline_210_unit$$inline_231$$ = {response:$response$$7$$, type:$options$$9$$.type || ""}, $lifetime$$inline_211$$ = parseInt($spf$config$values$$["cache-lifetime"], 10), $JSCompiler_temp_const$$227_max$$inline_212$$ = parseInt($spf$config$values$$["cache-max"], 10);
    0 >= $lifetime$$inline_211$$ || 0 >= $JSCompiler_temp_const$$227_max$$inline_212$$ || ($JSCompiler_temp_const$$227_max$$inline_212$$ = $spf$cache$storage_$$(), $data$$inline_210_unit$$inline_231$$ = {data:$data$$inline_210_unit$$inline_231$$, life:$lifetime$$inline_211$$, time:$spf$now$$(), count:0}, $spf$cache$updateCount_$$($data$$inline_210_unit$$inline_231$$), $JSCompiler_temp_const$$227_max$$inline_212$$[$cache_cacheKey$$2$$] = $data$$inline_210_unit$$inline_231$$, setTimeout($spf$cache$collect$$, 
    1E3));
  }
  $response$$7$$.timing = $timing$$9$$;
  $options$$9$$.$onSuccess$ && $options$$9$$.$onSuccess$($url$$66$$, $response$$7$$);
}
function $spf$nav$request$getCacheKey_$$($absoluteUrl_url$$67$$, $opt_current$$, $opt_cacheType$$, $opt_requestType$$, $opt_set$$) {
  $absoluteUrl_url$$67$$ = $spf$url$absolute$$($absoluteUrl_url$$67$$);
  var $cacheKey$$3$$;
  $spf$config$values$$["cache-unified"] ? $cacheKey$$3$$ = $absoluteUrl_url$$67$$ : "navigate-back" == $opt_requestType$$ || "navigate-forward" == $opt_requestType$$ ? $cacheKey$$3$$ = "history " + $absoluteUrl_url$$67$$ : "navigate" == $opt_requestType$$ ? $cacheKey$$3$$ = ($opt_set$$ ? "history " : "prefetch ") + $absoluteUrl_url$$67$$ : "prefetch" == $opt_requestType$$ && ($cacheKey$$3$$ = $opt_set$$ ? "prefetch " + $absoluteUrl_url$$67$$ : "");
  $opt_current$$ && "url" == $opt_cacheType$$ ? $cacheKey$$3$$ += " previous " + $opt_current$$ : $opt_current$$ && "path" == $opt_cacheType$$ && ($cacheKey$$3$$ += " previous " + $spf$url$utils$$($opt_current$$).pathname);
  return $cacheKey$$3$$ || "";
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
function $spf$nav$getEventURL_$$($evt$$25_target$$39$$) {
  if ($evt$$25_target$$39$$.metaKey || $evt$$25_target$$39$$.altKey || $evt$$25_target$$39$$.ctrlKey || $evt$$25_target$$39$$.shiftKey) {
    return $spf$debug$debug$$("    ignoring click with modifier key"), null;
  }
  if (0 < $evt$$25_target$$39$$.button) {
    return $spf$debug$debug$$("    ignoring click with alternate button"), null;
  }
  var $linkEl$$ = $spf$nav$getAncestorWithLinkClass_$$($evt$$25_target$$39$$.target);
  if (!$linkEl$$) {
    return $spf$debug$debug$$("    ignoring click without link class"), null;
  }
  if ($spf$config$values$$["nolink-class"] && $spf$nav$getAncestorWithNoLinkClass_$$($evt$$25_target$$39$$.target)) {
    return $spf$debug$debug$$("    ignoring click with nolink class"), null;
  }
  $evt$$25_target$$39$$ = $spf$nav$getAncestorWithHref_$$($evt$$25_target$$39$$.target, $linkEl$$);
  return $evt$$25_target$$39$$ ? $evt$$25_target$$39$$.href : ($spf$debug$debug$$("    ignoring click without href parent"), null);
}
function $spf$nav$isAllowed_$$($url$$68$$) {
  return $spf$url$utils$$($url$$68$$).origin != $spf$url$utils$$(window.location.href).origin ? ($spf$debug$warn$$("destination not same-origin"), !1) : !0;
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
function $spf$nav$handleClick_$$($evt$$26$$) {
  $spf$debug$debug$$("nav.handleClick ", "evt=", $evt$$26$$);
  if (!$evt$$26$$.defaultPrevented) {
    var $url$$71$$ = $spf$nav$getEventURL_$$($evt$$26$$);
    $url$$71$$ && ($url$$71$$ = $spf$url$appendPersistentParameters$$($url$$71$$), $spf$nav$isAllowed_$$($url$$71$$) && $spf$nav$isEligible_$$() && $spf$dispatch$$("spfclick", {url:$url$$71$$, target:$evt$$26$$.target}) && ($spf$nav$navigate_$$($url$$71$$, {}, new $spf$nav$Info$$), $evt$$26$$.preventDefault()));
  }
}
function $spf$nav$handleMouseDown_$$($evt$$27$$) {
  $spf$debug$debug$$("nav.handleMouseDown ", "evt=", $evt$$27$$);
  var $url$$72$$ = $spf$nav$getEventURL_$$($evt$$27$$);
  $url$$72$$ && setTimeout(function() {
    $spf$nav$prefetch$$($url$$72$$);
  }, 0);
}
function $spf$nav$handleScroll_$$() {
  var $position_position$$inline_130$$;
  $position_position$$inline_130$$ = $spf$state$values_$$["nav-scroll-position"] || null;
  var $url$$inline_131$$ = $spf$state$values_$$["nav-scroll-url"] || "";
  $position_position$$inline_130$$ = $position_position$$inline_130$$ && $url$$inline_131$$ == window.location.href ? $position_position$$inline_130$$ : null;
  $spf$nav$clearScrollTempPosition_$$();
  $position_position$$inline_130$$ && ($spf$debug$debug$$("    returning to saved scroll temp position", $position_position$$inline_130$$), window.scroll.apply(null, $position_position$$inline_130$$));
}
function $spf$nav$handleHistory_$$($url$$73$$, $opt_state$$3$$) {
  $spf$debug$debug$$("nav.handleHistory ", "(url=", $url$$73$$, "state=", $opt_state$$3$$, ")");
  var $info$$1$$ = new $spf$nav$Info$$({current:$opt_state$$3$$ && $opt_state$$3$$["spf-current"], history:!0, position:$opt_state$$3$$ && $opt_state$$3$$["spf-position"], $referer$:$opt_state$$3$$ && $opt_state$$3$$["spf-referer"], reverse:!(!$opt_state$$3$$ || !$opt_state$$3$$["spf-back"])}), $position$$inline_133_reloadId$$ = $spf$config$values$$["reload-identifier"];
  $position$$inline_133_reloadId$$ && ($url$$73$$ = $spf$url$removeParameters$$($url$$73$$, [$position$$inline_133_reloadId$$]));
  $spf$nav$isAllowed_$$($url$$73$$) ? $spf$nav$isEligible_$$() ? $spf$dispatch$$("spfhistory", {url:$url$$73$$, referer:$info$$1$$.$referer$, previous:$info$$1$$.current}) && ($info$$1$$.position && ($position$$inline_133_reloadId$$ = [window.pageXOffset, window.pageYOffset], $spf$debug$debug$$("    saving scroll temp position", $position$$inline_133_reloadId$$), $spf$state$set$$("nav-scroll-position", $position$$inline_133_reloadId$$), $spf$state$set$$("nav-scroll-url", window.location.href)), $spf$nav$navigate_$$($url$$73$$, 
  {}, $info$$1$$)) : $spf$nav$reload$$($url$$73$$, $spf$nav$ReloadReason$INELIGIBLE$$) : $spf$nav$reload$$($url$$73$$, $spf$nav$ReloadReason$FORBIDDEN$$);
}
function $spf$nav$navigate_$$($url$$75$$, $options$$13_xhr$$inline_158$$, $info$$3$$) {
  $spf$debug$info$$("nav.navigate_ ", $url$$75$$, $options$$13_xhr$$inline_158$$, $info$$3$$);
  $spf$nav$cancel$$();
  var $JSCompiler_inline_result$$15_absoluteUrl$$2_absoluteUrl$$inline_138_handlePart$$inline_156_promoteKey$$inline_150$$;
  a: {
    var $absoluteCurrent$$inline_139_current$$inline_137_handleSuccess$$inline_157_opt_skipKey$$inline_141$$ = $info$$3$$.current || window.location.href;
    if (-1 != $url$$75$$.indexOf("#") || -1 != $absoluteCurrent$$inline_139_current$$inline_137_handleSuccess$$inline_157_opt_skipKey$$inline_141$$.indexOf("#")) {
      if ($JSCompiler_inline_result$$15_absoluteUrl$$2_absoluteUrl$$inline_138_handlePart$$inline_156_promoteKey$$inline_150$$ = $spf$url$absolute$$($url$$75$$), $absoluteCurrent$$inline_139_current$$inline_137_handleSuccess$$inline_157_opt_skipKey$$inline_141$$ = $spf$url$absolute$$($absoluteCurrent$$inline_139_current$$inline_137_handleSuccess$$inline_157_opt_skipKey$$inline_141$$), $JSCompiler_inline_result$$15_absoluteUrl$$2_absoluteUrl$$inline_138_handlePart$$inline_156_promoteKey$$inline_150$$ == 
      $absoluteCurrent$$inline_139_current$$inline_137_handleSuccess$$inline_157_opt_skipKey$$inline_141$$) {
        $spf$debug$debug$$("    not handling hash-based navigation");
        $JSCompiler_inline_result$$15_absoluteUrl$$2_absoluteUrl$$inline_138_handlePart$$inline_156_promoteKey$$inline_150$$ = !1;
        break a;
      }
    }
    $JSCompiler_inline_result$$15_absoluteUrl$$2_absoluteUrl$$inline_138_handlePart$$inline_156_promoteKey$$inline_150$$ = !0;
  }
  if ($JSCompiler_inline_result$$15_absoluteUrl$$2_absoluteUrl$$inline_138_handlePart$$inline_156_promoteKey$$inline_150$$) {
    if ($spf$nav$dispatchRequest_$$($url$$75$$, $info$$3$$.$referer$, $info$$3$$.current, $options$$13_xhr$$inline_158$$)) {
      $spf$state$set$$("nav-counter", (parseInt($spf$state$values_$$["nav-counter"], 10) || 0) + 1);
      $spf$nav$cancelAllPrefetchesExcept$$($url$$75$$);
      $JSCompiler_inline_result$$15_absoluteUrl$$2_absoluteUrl$$inline_138_handlePart$$inline_156_promoteKey$$inline_150$$ = $spf$url$absolute$$($url$$75$$);
      var $absoluteCurrent$$inline_139_current$$inline_137_handleSuccess$$inline_157_opt_skipKey$$inline_141$$ = "preprocess " + $spf$url$absolute$$($JSCompiler_inline_result$$15_absoluteUrl$$2_absoluteUrl$$inline_138_handlePart$$inline_156_promoteKey$$inline_150$$), $handleError$$inline_155_key$$inline_144_prefetchXhr_preprocessKey$$inline_149$$;
      for ($handleError$$inline_155_key$$inline_144_prefetchXhr_preprocessKey$$inline_149$$ in $spf$tasks$queues_$$) {
        $absoluteCurrent$$inline_139_current$$inline_137_handleSuccess$$inline_157_opt_skipKey$$inline_141$$ != $handleError$$inline_155_key$$inline_144_prefetchXhr_preprocessKey$$inline_149$$ && 0 == $handleError$$inline_155_key$$inline_144_prefetchXhr_preprocessKey$$inline_149$$.lastIndexOf("preprocess", 0) && $spf$tasks$cancel$$($handleError$$inline_155_key$$inline_144_prefetchXhr_preprocessKey$$inline_149$$);
      }
      $handleError$$inline_155_key$$inline_144_prefetchXhr_preprocessKey$$inline_149$$ = $spf$nav$prefetches_$$()[$JSCompiler_inline_result$$15_absoluteUrl$$2_absoluteUrl$$inline_138_handlePart$$inline_156_promoteKey$$inline_150$$];
      $spf$state$set$$("nav-request", $handleError$$inline_155_key$$inline_144_prefetchXhr_preprocessKey$$inline_149$$);
      $spf$state$set$$("nav-promote", null);
      $spf$state$set$$("nav-promote-time", null);
      $handleError$$inline_155_key$$inline_144_prefetchXhr_preprocessKey$$inline_149$$ && 4 != $handleError$$inline_155_key$$inline_144_prefetchXhr_preprocessKey$$inline_149$$.readyState ? ($spf$debug$debug$$("nav.navigatePromotePrefetch_ ", $url$$75$$), $handleError$$inline_155_key$$inline_144_prefetchXhr_preprocessKey$$inline_149$$ = "preprocess " + $spf$url$absolute$$($url$$75$$), $JSCompiler_inline_result$$15_absoluteUrl$$2_absoluteUrl$$inline_138_handlePart$$inline_156_promoteKey$$inline_150$$ = 
      "promote " + $spf$url$absolute$$($url$$75$$), $spf$state$set$$("nav-promote", $url$$75$$), $spf$state$set$$("nav-promote-time", $spf$now$$()), $spf$tasks$cancel$$($handleError$$inline_155_key$$inline_144_prefetchXhr_preprocessKey$$inline_149$$), $spf$tasks$run$$($JSCompiler_inline_result$$15_absoluteUrl$$2_absoluteUrl$$inline_138_handlePart$$inline_156_promoteKey$$inline_150$$, !0), $info$$3$$.history || $spf$nav$navigateAddHistory_$$($url$$75$$, $info$$3$$.$referer$, $spf$bind$$($spf$nav$handleNavigateError_$$, 
      null, $options$$13_xhr$$inline_158$$))) : ($handleError$$inline_155_key$$inline_144_prefetchXhr_preprocessKey$$inline_149$$ = $spf$bind$$($spf$nav$handleNavigateError_$$, null, $options$$13_xhr$$inline_158$$), $JSCompiler_inline_result$$15_absoluteUrl$$2_absoluteUrl$$inline_138_handlePart$$inline_156_promoteKey$$inline_150$$ = $spf$bind$$($spf$nav$handleNavigatePart_$$, null, $options$$13_xhr$$inline_158$$, $info$$3$$), $absoluteCurrent$$inline_139_current$$inline_137_handleSuccess$$inline_157_opt_skipKey$$inline_141$$ = 
      $spf$bind$$($spf$nav$handleNavigateSuccess_$$, null, $options$$13_xhr$$inline_158$$, $info$$3$$), $spf$config$values$$["advanced-navigate-persist-timing"] || $spf$nav$clearResourceTimings_$$(), $info$$3$$.type = "navigate", $info$$3$$.history && ($info$$3$$.type += $info$$3$$.reverse ? "-back" : "-forward"), $options$$13_xhr$$inline_158$$ = $spf$nav$request$send$$($url$$75$$, {method:$options$$13_xhr$$inline_158$$.method, $onPart$:$JSCompiler_inline_result$$15_absoluteUrl$$2_absoluteUrl$$inline_138_handlePart$$inline_156_promoteKey$$inline_150$$, 
      $onError$:$handleError$$inline_155_key$$inline_144_prefetchXhr_preprocessKey$$inline_149$$, $onSuccess$:$absoluteCurrent$$inline_139_current$$inline_137_handleSuccess$$inline_157_opt_skipKey$$inline_141$$, $postData$:$options$$13_xhr$$inline_158$$.postData, type:$info$$3$$.type, current:$info$$3$$.current, $referer$:$info$$3$$.$referer$}), $spf$state$set$$("nav-request", $options$$13_xhr$$inline_158$$), $info$$3$$.history || $spf$nav$navigateAddHistory_$$($url$$75$$, $info$$3$$.$referer$, $handleError$$inline_155_key$$inline_144_prefetchXhr_preprocessKey$$inline_149$$));
    } else {
      $spf$nav$reload$$($url$$75$$, $spf$nav$ReloadReason$REQUEST_CANCELED$$);
    }
  } else {
    $spf$debug$debug$$("non-navigable, just scroll"), $info$$3$$.history || $spf$nav$navigateAddHistory_$$($url$$75$$, $info$$3$$.$referer$, $spf$bind$$($spf$nav$handleNavigateError_$$, null, $options$$13_xhr$$inline_158$$)), $spf$nav$navigateScroll_$$($url$$75$$, $info$$3$$);
  }
}
function $spf$nav$navigateScroll_$$($url$$78$$, $info$$6$$) {
  if ($info$$6$$.position) {
    $spf$debug$debug$$("    clearing scroll temp position"), $spf$nav$clearScrollTempPosition_$$(), $spf$debug$debug$$("    scrolling to position", $info$$6$$.position), window.scroll.apply(null, $info$$6$$.position), $info$$6$$.$scrolled$ = !0;
  } else {
    var $result$$11$$ = $spf$string$partition$$($url$$78$$, "#");
    if ($result$$11$$[2]) {
      var $el$$14$$ = document.getElementById($result$$11$$[2]);
      $el$$14$$ && ($spf$debug$debug$$("    clearing scroll temp position"), $spf$nav$clearScrollTempPosition_$$(), $spf$debug$debug$$("    scrolling into view", $result$$11$$[2]), $el$$14$$.scrollIntoView(), $info$$6$$.$scrolled$ = !0);
    } else {
      $info$$6$$.$scrolled$ || ($spf$debug$debug$$("    clearing scroll temp position"), $spf$nav$clearScrollTempPosition_$$(), $spf$debug$debug$$("    scrolling to top"), window.scroll(0, 0), $info$$6$$.$scrolled$ = !0);
    }
  }
}
function $spf$nav$navigateAddHistory_$$($url$$79$$, $opt_state$$inline_161_referer$$, $handleError$$3$$) {
  try {
    var $position$$1$$ = [window.pageXOffset, window.pageYOffset], $updateState$$ = {"spf-position":$position$$1$$};
    $spf$debug$debug$$("    updating history to scroll position", $position$$1$$);
    $spf$history$replace$$(null, $updateState$$);
    $spf$url$absolute$$($url$$79$$, !0) != window.location.href && ($opt_state$$inline_161_referer$$ = {"spf-referer":$opt_state$$inline_161_referer$$}, $spf$debug$info$$("history.add ", $url$$79$$), $spf$history$push_$$(!1, $url$$79$$, $opt_state$$inline_161_referer$$, void 0));
  } catch ($err$$4$$) {
    $spf$nav$cancel$$(), $spf$debug$error$$("error caught, redirecting ", "(url=", $url$$79$$, "err=", $err$$4$$, ")"), $handleError$$3$$($url$$79$$, $err$$4$$);
  }
}
function $spf$nav$handleNavigateError_$$($options$$16$$, $url$$80$$, $err$$5$$) {
  $spf$debug$warn$$("navigate error", "(url=", $url$$80$$, ")");
  $spf$state$set$$("nav-request", null);
  $spf$nav$dispatchError_$$($url$$80$$, $err$$5$$, $options$$16$$) && $spf$nav$reload$$($url$$80$$, $spf$nav$ReloadReason$ERROR$$, $err$$5$$);
}
function $spf$nav$handleNavigatePart_$$($options$$17$$, $info$$7$$, $url$$81$$, $partial$$) {
  if ($spf$nav$dispatchPartProcess_$$($url$$81$$, $partial$$, $options$$17$$)) {
    if ($partial$$.reload) {
      $spf$nav$reload$$($url$$81$$, $spf$nav$ReloadReason$RESPONSE_RECEIVED$$);
    } else {
      if ($partial$$.redirect) {
        $spf$nav$handleNavigateRedirect_$$($options$$17$$, $partial$$.redirect);
      } else {
        try {
          $spf$nav$response$process$$($url$$81$$, $partial$$, $info$$7$$, function() {
            $spf$nav$dispatchPartDone_$$($url$$81$$, $partial$$, $options$$17$$);
          });
        } catch ($err$$6$$) {
          $spf$debug$debug$$("    failed to process part", $partial$$), $spf$nav$handleNavigateError_$$($options$$17$$, $url$$81$$, $err$$6$$);
        }
      }
    }
  } else {
    $spf$nav$reload$$($url$$81$$, $spf$nav$ReloadReason$PART_PROCESS_CANCELED$$);
  }
}
function $spf$nav$handleNavigateSuccess_$$($options$$18$$, $info$$8$$, $url$$82$$, $response$$9$$) {
  $spf$state$set$$("nav-request", null);
  if ($spf$state$values_$$["nav-promote"] == $info$$8$$.$original$) {
    var $timing$$10$$ = $response$$9$$.timing || {};
    $timing$$10$$.navigationStart = $spf$state$values_$$["nav-promote-time"];
    $timing$$10$$.spfPrefetched = !0;
  }
  var $multipart$$1$$ = "multipart" == $response$$9$$.type;
  if (!$multipart$$1$$) {
    if (!$spf$nav$dispatchProcess_$$($url$$82$$, $response$$9$$, $options$$18$$)) {
      $spf$nav$reload$$($url$$82$$, $spf$nav$ReloadReason$PROCESS_CANCELED$$);
      return;
    }
    if ($response$$9$$.reload) {
      $spf$nav$reload$$($url$$82$$, $spf$nav$ReloadReason$RESPONSE_RECEIVED$$);
      return;
    }
    if ($response$$9$$.redirect) {
      $spf$nav$handleNavigateRedirect_$$($options$$18$$, $response$$9$$.redirect);
      return;
    }
  }
  try {
    $spf$nav$response$process$$($url$$82$$, $multipart$$1$$ ? {} : $response$$9$$, $info$$8$$, function() {
      var $name$$80_val$$inline_164$$ = $response$$9$$.name || "";
      if ($multipart$$1$$) {
        for (var $node$$inline_165_parts$$4$$ = $response$$9$$.parts, $i$$22$$ = 0;$i$$22$$ < $node$$inline_165_parts$$4$$.length;$i$$22$$++) {
          $name$$80_val$$inline_164$$ = $node$$inline_165_parts$$4$$[$i$$22$$].name || $name$$80_val$$inline_164$$;
        }
      }
      $node$$inline_165_parts$$4$$ = document.body;
      $node$$inline_165_parts$$4$$.dataset ? $node$$inline_165_parts$$4$$.dataset.spfName = $name$$80_val$$inline_164$$ : $node$$inline_165_parts$$4$$.setAttribute("data-" + "spfName".replace(/([A-Z])/g, "-$1").toLowerCase(), $name$$80_val$$inline_164$$);
      $spf$nav$navigateScroll_$$($url$$82$$, $info$$8$$);
      $spf$nav$dispatchDone_$$($url$$82$$, $response$$9$$, $options$$18$$);
    });
  } catch ($err$$7$$) {
    $spf$debug$debug$$("    failed to process response", $response$$9$$), $spf$nav$handleNavigateError_$$($options$$18$$, $url$$82$$, $err$$7$$);
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
  var $xhr$$6$$ = $spf$state$values_$$["nav-request"];
  $xhr$$6$$ && ($spf$debug$warn$$("aborting previous navigate ", "xhr=", $xhr$$6$$), $xhr$$6$$.abort(), $spf$state$set$$("nav-request", null));
}
function $spf$nav$callback$$($fn$$15$$, $var_args$$36$$) {
  var $args$$4_val$$5$$;
  $fn$$15$$ && ($args$$4_val$$5$$ = Array.prototype.slice.call(arguments), $args$$4_val$$5$$[0] = $fn$$15$$, $args$$4_val$$5$$ = $spf$execute$$.apply(null, $args$$4_val$$5$$), $args$$4_val$$5$$ instanceof Error && $spf$debug$error$$("error in callback (url=", window.location.href, "err=", $args$$4_val$$5$$, ")"));
  return!1 !== $args$$4_val$$5$$;
}
function $spf$nav$reload$$($url$$83$$, $reason$$, $err$$9_opt_err$$) {
  $err$$9_opt_err$$ = $err$$9_opt_err$$ ? $err$$9_opt_err$$.message : "";
  $spf$debug$warn$$("reloading (", "url=", $url$$83$$, "reason=", $reason$$, "error=", $err$$9_opt_err$$, ")");
  $spf$nav$cancel$$();
  $spf$nav$cancelAllPrefetchesExcept$$();
  var $logReason$$ = $reason$$;
  $err$$9_opt_err$$ && ($logReason$$ += " Message: " + $err$$9_opt_err$$);
  $spf$dispatch$$("spfreload", {url:$url$$83$$, reason:$logReason$$});
  $spf$config$values$$["experimental-remove-history"] && window.location.href == $url$$83$$ && ($spf$state$set$$("history-ignore-pop", !0), window.history.back());
  setTimeout(function() {
    var $reloadId$$1_url$$inline_172$$ = $spf$config$values$$["reload-identifier"];
    if ($reloadId$$1_url$$inline_172$$) {
      var $params$$ = {};
      $params$$[$reloadId$$1_url$$inline_172$$] = encodeURIComponent($reason$$);
      var $reloadId$$1_url$$inline_172$$ = $url$$83$$, $result$$inline_174$$ = $spf$string$partition$$($reloadId$$1_url$$inline_172$$, "#"), $reloadId$$1_url$$inline_172$$ = $result$$inline_174$$[0], $delim$$inline_175$$ = -1 != $reloadId$$1_url$$inline_172$$.indexOf("?") ? "&" : "?", $key$$inline_176$$;
      for ($key$$inline_176$$ in $params$$) {
        $reloadId$$1_url$$inline_172$$ += $delim$$inline_175$$ + $key$$inline_176$$, $params$$[$key$$inline_176$$] && ($reloadId$$1_url$$inline_172$$ += "=" + $params$$[$key$$inline_176$$]), $delim$$inline_175$$ = "&";
      }
      $url$$83$$ = $reloadId$$1_url$$inline_172$$ + $result$$inline_174$$[1] + $result$$inline_174$$[2];
    }
    window.location.href = $url$$83$$;
  }, 0);
}
function $spf$nav$load_$$($url$$85$$, $options$$21$$, $info$$10$$) {
  $spf$debug$info$$("nav.load ", $url$$85$$, $options$$21$$, $info$$10$$);
  $info$$10$$.$original$ = $info$$10$$.$original$ || $url$$85$$;
  if ($spf$nav$dispatchRequest_$$($url$$85$$, void 0, void 0, $options$$21$$, !0)) {
    var $handleError$$4$$ = $spf$bind$$($spf$nav$handleLoadError_$$, null, !1, $options$$21$$, $info$$10$$), $handlePart$$1$$ = $spf$bind$$($spf$nav$handleLoadPart_$$, null, !1, $options$$21$$, $info$$10$$), $handleSuccess$$1$$ = $spf$bind$$($spf$nav$handleLoadSuccess_$$, null, !1, $options$$21$$, $info$$10$$);
    $info$$10$$.type = "load";
    $spf$nav$request$send$$($url$$85$$, {method:$options$$21$$.method, $onPart$:$handlePart$$1$$, $onError$:$handleError$$4$$, $onSuccess$:$handleSuccess$$1$$, $postData$:$options$$21$$.postData, type:$info$$10$$.type});
  }
}
function $spf$nav$prefetch$$($url$$86$$, $opt_options$$21$$) {
  $url$$86$$ = $spf$url$appendPersistentParameters$$($url$$86$$);
  $spf$nav$prefetch_$$($url$$86$$, $opt_options$$21$$ || {}, new $spf$nav$Info$$);
}
function $spf$nav$prefetch_$$($absoluteUrl$$inline_180_url$$87$$, $options$$23_xhr$$inline_179$$, $info$$12$$) {
  $spf$debug$info$$("nav.prefetch ", $absoluteUrl$$inline_180_url$$87$$, $options$$23_xhr$$inline_179$$, $info$$12$$);
  $info$$12$$.$original$ = $info$$12$$.$original$ || $absoluteUrl$$inline_180_url$$87$$;
  if ($spf$nav$dispatchRequest_$$($absoluteUrl$$inline_180_url$$87$$, void 0, void 0, $options$$23_xhr$$inline_179$$, !0)) {
    var $handleError$$5$$ = $spf$bind$$($spf$nav$handleLoadError_$$, null, !0, $options$$23_xhr$$inline_179$$, $info$$12$$), $handlePart$$2$$ = $spf$bind$$($spf$nav$handleLoadPart_$$, null, !0, $options$$23_xhr$$inline_179$$, $info$$12$$), $handleSuccess$$2$$ = $spf$bind$$($spf$nav$handleLoadSuccess_$$, null, !0, $options$$23_xhr$$inline_179$$, $info$$12$$);
    $info$$12$$.type = "prefetch";
    $options$$23_xhr$$inline_179$$ = $spf$nav$request$send$$($absoluteUrl$$inline_180_url$$87$$, {method:$options$$23_xhr$$inline_179$$.method, $onPart$:$handlePart$$2$$, $onError$:$handleError$$5$$, $onSuccess$:$handleSuccess$$2$$, $postData$:$options$$23_xhr$$inline_179$$.postData, type:$info$$12$$.type, current:$info$$12$$.current});
    $spf$debug$debug$$("nav.addPrefetch ", $absoluteUrl$$inline_180_url$$87$$, $options$$23_xhr$$inline_179$$);
    $absoluteUrl$$inline_180_url$$87$$ = $spf$url$absolute$$($absoluteUrl$$inline_180_url$$87$$);
    $spf$nav$prefetches_$$()[$absoluteUrl$$inline_180_url$$87$$] = $options$$23_xhr$$inline_179$$;
  }
}
function $spf$nav$handleLoadError_$$($isPrefetch$$, $options$$24$$, $info$$13$$, $url$$88$$, $err$$10$$) {
  $spf$debug$warn$$($isPrefetch$$ ? "prefetch" : "load", "error", "(url=", $url$$88$$, ")");
  $isPrefetch$$ && $spf$nav$removePrefetch$$($url$$88$$);
  $isPrefetch$$ && $spf$state$values_$$["nav-promote"] == $info$$13$$.$original$ ? $spf$nav$handleNavigateError_$$($options$$24$$, $url$$88$$, $err$$10$$) : $spf$nav$dispatchError_$$($url$$88$$, $err$$10$$, $options$$24$$, !0);
}
function $spf$nav$handleLoadPart_$$($isPrefetch$$1$$, $options$$25$$, $info$$14$$, $url$$89$$, $partial$$1$$) {
  if ($spf$nav$dispatchPartProcess_$$($url$$89$$, $partial$$1$$, $options$$25$$, !0)) {
    if ($partial$$1$$.reload) {
      if (!$isPrefetch$$1$$) {
        return;
      }
      if ($spf$state$values_$$["nav-promote"] == $info$$14$$.$original$) {
        $spf$nav$reload$$($url$$89$$, $spf$nav$ReloadReason$RESPONSE_RECEIVED$$);
        return;
      }
    }
    if ($partial$$1$$.redirect) {
      $spf$nav$handleLoadRedirect_$$($isPrefetch$$1$$, $options$$25$$, $info$$14$$, $partial$$1$$.redirect);
    } else {
      if ($isPrefetch$$1$$) {
        var $fn$$16$$ = $spf$bind$$($spf$nav$handleNavigatePart_$$, null, $options$$25$$, $info$$14$$, $url$$89$$, $partial$$1$$), $promoteKey$$1$$ = "promote " + $spf$url$absolute$$($info$$14$$.$original$);
        $spf$tasks$add$$($promoteKey$$1$$, $fn$$16$$);
        if ($spf$state$values_$$["nav-promote"] == $info$$14$$.$original$) {
          $spf$tasks$run$$($promoteKey$$1$$, !0);
          return;
        }
      }
      ($isPrefetch$$1$$ ? $spf$nav$response$preprocess$$ : $spf$nav$response$process$$)($url$$89$$, $partial$$1$$, $info$$14$$, function() {
        $spf$nav$dispatchPartDone_$$($url$$89$$, $partial$$1$$, $options$$25$$, !0);
      });
    }
  }
}
function $spf$nav$handleLoadSuccess_$$($isPrefetch$$2$$, $options$$26$$, $info$$15$$, $url$$90$$, $response$$10$$) {
  var $multipart$$2$$ = "multipart" == $response$$10$$.type;
  if (!$multipart$$2$$) {
    if (!$spf$nav$dispatchProcess_$$($url$$90$$, $response$$10$$, $options$$26$$, !0)) {
      $spf$nav$reload$$($url$$90$$, $spf$nav$ReloadReason$PROCESS_CANCELED$$);
      return;
    }
    if ($response$$10$$.reload) {
      if (!$isPrefetch$$2$$) {
        return;
      }
      if ($spf$state$values_$$["nav-promote"] == $info$$15$$.$original$) {
        $spf$nav$reload$$($url$$90$$, $spf$nav$ReloadReason$RESPONSE_RECEIVED$$);
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
    $spf$nav$removePrefetch$$($url$$90$$);
    if ($spf$state$values_$$["nav-promote"] == $info$$15$$.$original$) {
      $spf$tasks$add$$($processFn$$1_promoteKey$$2$$, $spf$bind$$($spf$nav$handleNavigateSuccess_$$, null, $options$$26$$, $info$$15$$, $url$$90$$, $response$$10$$));
      $spf$tasks$run$$($processFn$$1_promoteKey$$2$$, !0);
      return;
    }
    $spf$tasks$cancel$$($processFn$$1_promoteKey$$2$$);
  }
  $processFn$$1_promoteKey$$2$$ = $isPrefetch$$2$$ ? $spf$nav$response$preprocess$$ : $spf$nav$response$process$$;
  try {
    $processFn$$1_promoteKey$$2$$($url$$90$$, $multipart$$2$$ ? {} : $response$$10$$, $info$$15$$, function() {
      $spf$nav$dispatchDone_$$($url$$90$$, $response$$10$$, $options$$26$$, !0);
    });
  } catch ($err$$11$$) {
    $spf$debug$debug$$("    failed to process response", $response$$10$$), $spf$nav$handleLoadError_$$($isPrefetch$$2$$, $options$$26$$, $info$$15$$, $url$$90$$, $err$$11$$);
  }
}
function $spf$nav$handleLoadRedirect_$$($isPrefetch$$3_redirectFn$$, $options$$27$$, $info$$16$$, $redirectUrl$$1$$) {
  $isPrefetch$$3_redirectFn$$ = $isPrefetch$$3_redirectFn$$ ? $spf$nav$prefetch_$$ : $spf$nav$load_$$;
  var $redirectOpts$$ = {};
  $spf$array$each$$([$spf$nav$Callback$ERROR$$, $spf$nav$Callback$REQUEST$$, $spf$nav$Callback$PART_PROCESS$$, $spf$nav$Callback$PART_DONE$$, $spf$nav$Callback$PROCESS$$, $spf$nav$Callback$DONE$$], function($key$$52$$) {
    $redirectOpts$$[$key$$52$$] = $options$$27$$[$key$$52$$];
  });
  $isPrefetch$$3_redirectFn$$($redirectUrl$$1$$, $redirectOpts$$, $info$$16$$);
}
function $spf$nav$dispatchError_$$($detail$$3_url$$92$$, $err$$12$$, $opt_options$$22_proceed$$, $opt_noEvents$$) {
  $detail$$3_url$$92$$ = {url:$detail$$3_url$$92$$, err:$err$$12$$};
  ($opt_options$$22_proceed$$ = $spf$nav$callback$$(($opt_options$$22_proceed$$ || {})[$spf$nav$Callback$ERROR$$], $detail$$3_url$$92$$)) && !$opt_noEvents$$ && ($opt_options$$22_proceed$$ = $spf$dispatch$$("spferror", $detail$$3_url$$92$$));
  return $opt_options$$22_proceed$$;
}
function $spf$nav$dispatchRequest_$$($detail$$7_url$$96$$, $referer$$1$$, $previous$$2$$, $opt_options$$23_proceed$$1$$, $opt_noEvents$$1$$) {
  $detail$$7_url$$96$$ = {url:$detail$$7_url$$96$$, referer:$referer$$1$$, previous:$previous$$2$$};
  ($opt_options$$23_proceed$$1$$ = $spf$nav$callback$$(($opt_options$$23_proceed$$1$$ || {})[$spf$nav$Callback$REQUEST$$], $detail$$7_url$$96$$)) && !$opt_noEvents$$1$$ && ($opt_options$$23_proceed$$1$$ = $spf$dispatch$$("spfrequest", $detail$$7_url$$96$$));
  return $opt_options$$23_proceed$$1$$;
}
function $spf$nav$dispatchPartProcess_$$($detail$$8_url$$97$$, $partial$$2$$, $opt_options$$24_proceed$$2$$, $opt_noEvents$$2$$) {
  $detail$$8_url$$97$$ = {url:$detail$$8_url$$97$$, part:$partial$$2$$};
  ($opt_options$$24_proceed$$2$$ = $spf$nav$callback$$(($opt_options$$24_proceed$$2$$ || {})[$spf$nav$Callback$PART_PROCESS$$], $detail$$8_url$$97$$)) && !$opt_noEvents$$2$$ && ($opt_options$$24_proceed$$2$$ = $spf$dispatch$$("spfpartprocess", $detail$$8_url$$97$$));
  return $opt_options$$24_proceed$$2$$;
}
function $spf$nav$dispatchPartDone_$$($detail$$9_url$$98$$, $partial$$3$$, $opt_options$$25$$, $opt_noEvents$$3$$) {
  $detail$$9_url$$98$$ = {url:$detail$$9_url$$98$$, part:$partial$$3$$};
  $spf$nav$callback$$(($opt_options$$25$$ || {})[$spf$nav$Callback$PART_DONE$$], $detail$$9_url$$98$$) && !$opt_noEvents$$3$$ && $spf$dispatch$$("spfpartdone", $detail$$9_url$$98$$);
}
function $spf$nav$dispatchProcess_$$($detail$$10_url$$99$$, $response$$12$$, $opt_options$$26_proceed$$4$$, $opt_noEvents$$4$$) {
  $detail$$10_url$$99$$ = {url:$detail$$10_url$$99$$, response:$response$$12$$};
  ($opt_options$$26_proceed$$4$$ = $spf$nav$callback$$(($opt_options$$26_proceed$$4$$ || {})[$spf$nav$Callback$PROCESS$$], $detail$$10_url$$99$$)) && !$opt_noEvents$$4$$ && ($opt_options$$26_proceed$$4$$ = $spf$dispatch$$("spfprocess", $detail$$10_url$$99$$));
  return $opt_options$$26_proceed$$4$$;
}
function $spf$nav$dispatchDone_$$($detail$$11_url$$100$$, $response$$13$$, $opt_options$$27$$, $opt_noEvents$$5$$) {
  $detail$$11_url$$100$$ = {url:$detail$$11_url$$100$$, response:$response$$13$$};
  $spf$nav$callback$$(($opt_options$$27$$ || {})[$spf$nav$Callback$DONE$$], $detail$$11_url$$100$$) && !$opt_noEvents$$5$$ && $spf$dispatch$$("spfdone", $detail$$11_url$$100$$);
}
function $spf$nav$removePrefetch$$($absoluteUrl$$4_url$$104$$) {
  $spf$debug$debug$$("nav.removePrefetch ", $absoluteUrl$$4_url$$104$$);
  $absoluteUrl$$4_url$$104$$ = $spf$url$absolute$$($absoluteUrl$$4_url$$104$$);
  var $prefetches$$2$$ = $spf$nav$prefetches_$$(), $prefetchXhr$$1$$ = $prefetches$$2$$[$absoluteUrl$$4_url$$104$$];
  $prefetchXhr$$1$$ && $prefetchXhr$$1$$.abort();
  delete $prefetches$$2$$[$absoluteUrl$$4_url$$104$$];
}
function $spf$nav$cancelAllPrefetchesExcept$$($absoluteUrl$$5_opt_skipUrl$$) {
  $spf$debug$debug$$("nav.cancelAllPrefetchesExcept", $absoluteUrl$$5_opt_skipUrl$$);
  var $prefetches$$3$$ = $spf$nav$prefetches_$$();
  $absoluteUrl$$5_opt_skipUrl$$ = $absoluteUrl$$5_opt_skipUrl$$ && $spf$url$absolute$$($absoluteUrl$$5_opt_skipUrl$$);
  for (var $key$$53$$ in $prefetches$$3$$) {
    $absoluteUrl$$5_opt_skipUrl$$ != $key$$53$$ && $spf$nav$removePrefetch$$($key$$53$$);
  }
}
var $spf$nav$clearResourceTimings_$$, $clearResourceTimings$$inline_182$$ = window.performance && (window.performance.clearResourceTimings || window.performance.webkitClearResourceTimings || window.performance.mozClearResourceTimings || window.performance.msClearResourceTimings || window.performance.oClearResourceTimings);
$spf$nav$clearResourceTimings_$$ = $clearResourceTimings$$inline_182$$ ? $spf$bind$$($clearResourceTimings$$inline_182$$, window.performance) : $spf$nullFunction$$;
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
var $spf$main$api_$$ = {init:function($config$$inline_187_opt_config$$1_url$$inline_222$$) {
  var $enable$$ = !("function" != typeof window.history.pushState && !$spf$history$getIframe$$().contentWindow.history.pushState);
  $spf$debug$info$$("main.init ", "enable=", $enable$$);
  $config$$inline_187_opt_config$$1_url$$inline_222$$ = $config$$inline_187_opt_config$$1_url$$inline_222$$ || {};
  for (var $errorCallback$$inline_221_key$$inline_188$$ in $spf$config$defaults$$) {
    $spf$config$values$$[$errorCallback$$inline_221_key$$inline_188$$] = $errorCallback$$inline_221_key$$inline_188$$ in $config$$inline_187_opt_config$$1_url$$inline_222$$ ? $config$$inline_187_opt_config$$1_url$$inline_222$$[$errorCallback$$inline_221_key$$inline_188$$] : $spf$config$defaults$$[$errorCallback$$inline_221_key$$inline_188$$];
  }
  for ($errorCallback$$inline_221_key$$inline_188$$ in $config$$inline_187_opt_config$$1_url$$inline_222$$) {
    $errorCallback$$inline_221_key$$inline_188$$ in $spf$config$defaults$$ || ($spf$config$values$$[$errorCallback$$inline_221_key$$inline_188$$] = $config$$inline_187_opt_config$$1_url$$inline_222$$[$errorCallback$$inline_221_key$$inline_188$$]);
  }
  if ($enable$$) {
    $errorCallback$$inline_221_key$$inline_188$$ = $spf$nav$dispatchError_$$;
    if (!$spf$state$values_$$["history-init"] && window.addEventListener) {
      $config$$inline_187_opt_config$$1_url$$inline_222$$ = window.location.href;
      window.addEventListener("popstate", $spf$history$pop_$$, !1);
      $spf$state$set$$("history-init", !0);
      $spf$state$set$$("history-callback", $spf$nav$handleHistory_$$);
      $spf$state$set$$("history-error-callback", $errorCallback$$inline_221_key$$inline_188$$);
      $spf$state$set$$("history-listener", $spf$history$pop_$$);
      $spf$state$set$$("history-url", $config$$inline_187_opt_config$$1_url$$inline_222$$);
      $spf$state$set$$("history-timestamp", $spf$now$$());
      var $historyState$$inline_223$$ = {"spf-referer":document.referrer};
      try {
        $spf$history$replace$$($config$$inline_187_opt_config$$1_url$$inline_222$$, $historyState$$inline_223$$);
      } catch ($err$$inline_224$$) {
        $errorCallback$$inline_221_key$$inline_188$$ && $errorCallback$$inline_221_key$$inline_188$$($config$$inline_187_opt_config$$1_url$$inline_222$$, $err$$inline_224$$);
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
  for (var $key$$inline_192$$ in $spf$config$values$$) {
    delete $spf$config$values$$[$key$$inline_192$$];
  }
}, navigate:function($url$$74$$, $opt_options$$19$$) {
  $spf$debug$debug$$("nav.navigate ", "(url=", $url$$74$$, "options=", $opt_options$$19$$, ")");
  $url$$74$$ && ($url$$74$$ = $spf$url$appendPersistentParameters$$($url$$74$$), $spf$nav$isAllowed_$$($url$$74$$) ? $spf$nav$isEligible_$$() ? $spf$nav$navigate_$$($url$$74$$, $opt_options$$19$$ || {}, new $spf$nav$Info$$) : $spf$nav$reload$$($url$$74$$, $spf$nav$ReloadReason$INELIGIBLE$$) : $spf$nav$reload$$($url$$74$$, $spf$nav$ReloadReason$FORBIDDEN$$));
}, load:function($url$$84$$, $opt_options$$20$$) {
  $url$$84$$ = $spf$url$appendPersistentParameters$$($url$$84$$);
  $spf$nav$load_$$($url$$84$$, $opt_options$$20$$ || {}, new $spf$nav$Info$$);
}, prefetch:$spf$nav$prefetch$$, process:function($response$$11$$, $opt_callback$$11$$) {
  function $done$$($index$$47$$, $max$$2$$, $_$$1$$, $resp$$) {
    $index$$47$$ == $max$$2$$ && $opt_callback$$11$$ && $opt_callback$$11$$($resp$$);
  }
  var $url$$91$$ = window.location.href;
  if ("multipart" == $response$$11$$.type) {
    for (var $parts$$5$$ = $response$$11$$.parts, $i$$23$$ = 0;$i$$23$$ < $parts$$5$$.length;$i$$23$$++) {
      var $fn$$18$$ = $spf$bind$$($done$$, null, $i$$23$$, $parts$$5$$.length - 1);
      $spf$nav$response$process$$($url$$91$$, $parts$$5$$[$i$$23$$], null, $fn$$18$$);
    }
  } else {
    $fn$$18$$ = $spf$bind$$($done$$, null, 0, 0), $spf$nav$response$process$$($url$$91$$, $response$$11$$, null, $fn$$18$$);
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
}, unload:$spf$net$script$unload$$, ignore:function($names$$2$$, $fn$$11$$) {
  $names$$2$$ = $spf$array$toArray$$($names$$2$$);
  $spf$debug$debug$$("script.ignore", $names$$2$$);
  var $topic$$10$$ = $spf$net$resource$key$$($spf$net$resource$Type$JS$$, $names$$2$$.sort().join("|"));
  $spf$debug$debug$$("  unsubscribing", $topic$$10$$);
  $spf$pubsub$unsubscribe$$($topic$$10$$, $fn$$11$$);
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

