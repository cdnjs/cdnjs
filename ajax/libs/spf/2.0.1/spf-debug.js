/*
SPF 20 (v2.0.1)
(c) 2012-2014 Google, Inc.
License: MIT
*/
(function(){function $spf$bind$$($fn$$, $self$$1$$, $var_args$$27$$) {
  var $args$$ = Array.prototype.slice.call(arguments, 2);
  return function() {
    var $newArgs$$ = $args$$.slice();
    $newArgs$$.push.apply($newArgs$$, arguments);
    return $fn$$.apply($self$$1$$, $newArgs$$);
  };
}
function $spf$execute$$($fn$$1$$, $var_args$$28$$) {
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
;function $spf$state$set$$($key$$16$$, $value$$39$$) {
  return $spf$state$values_$$[$key$$16$$] = $value$$39$$;
}
var $spf$state$values_$$ = window._spf_state || {};
window._spf_state = $spf$state$values_$$;
var $spf$config$defaults$$ = {"animation-class":"spf-animate", "animation-duration":425, "cache-lifetime":6E5, "cache-max":50, "cache-unified":!1, "link-class":"spf-link", "nolink-class":"spf-nolink", "navigate-limit":20, "navigate-lifetime":864E5, "reload-identifier":null, "request-timeout":0, "url-identifier":"?spf=__type__"}, $spf$config$values$$ = {};
"config" in $spf$state$values_$$ || $spf$state$set$$("config", $spf$config$values$$);
$spf$config$values$$ = $spf$state$values_$$.config;
function $spf$array$each$$($arr$$10$$, $fn$$2$$) {
  if ($arr$$10$$.forEach) {
    $arr$$10$$.forEach($fn$$2$$, void 0);
  } else {
    for (var $i$$3$$ = 0, $l$$ = $arr$$10$$.length;$i$$3$$ < $l$$;$i$$3$$++) {
      $i$$3$$ in $arr$$10$$ && $fn$$2$$.call(void 0, $arr$$10$$[$i$$3$$], $i$$3$$, $arr$$10$$);
    }
  }
}
function $spf$array$every$$($arr$$11$$, $fn$$3$$) {
  if ($arr$$11$$.every) {
    return $arr$$11$$.every($fn$$3$$, void 0);
  }
  for (var $i$$4$$ = 0, $l$$1$$ = $arr$$11$$.length;$i$$4$$ < $l$$1$$;$i$$4$$++) {
    if ($i$$4$$ in $arr$$11$$ && !$fn$$3$$.call(void 0, $arr$$11$$[$i$$4$$], $i$$4$$, $arr$$11$$)) {
      return!1;
    }
  }
  return!0;
}
function $spf$array$filter$$($arr$$12$$, $fn$$4$$) {
  if ($arr$$12$$.filter) {
    return $arr$$12$$.filter($fn$$4$$, void 0);
  }
  var $res$$ = [];
  $spf$array$each$$($arr$$12$$, function($a$$, $i$$5$$, $arr$$13$$) {
    $fn$$4$$.call(void 0, $a$$, $i$$5$$, $arr$$13$$) && $res$$.push($a$$);
  });
  return $res$$;
}
function $spf$array$map$$($arr$$15$$, $fn$$5$$) {
  if ($arr$$15$$.map) {
    return $arr$$15$$.map($fn$$5$$, void 0);
  }
  var $res$$1$$ = [];
  $res$$1$$.length = $arr$$15$$.length;
  $spf$array$each$$($arr$$15$$, function($a$$1$$, $i$$7$$, $arr$$16$$) {
    $res$$1$$[$i$$7$$] = $fn$$5$$.call(void 0, $a$$1$$, $i$$7$$, $arr$$16$$);
  });
  return $res$$1$$;
}
function $spf$array$toArray$$($val$$1$$) {
  return "[object Array]" == Object.prototype.toString.call($val$$1$$) ? $val$$1$$ : [$val$$1$$];
}
;function $spf$cache$remove$$($key$$21$$) {
  var $storage$$2$$ = $spf$cache$storage_$$();
  $key$$21$$ in $storage$$2$$ && delete $storage$$2$$[$key$$21$$];
}
function $spf$cache$collect$$() {
  var $storage$$3_storage$$inline_21$$ = $spf$cache$storage_$$(), $extra$$inline_23_key$$22_max$$inline_22$$;
  for ($extra$$inline_23_key$$22_max$$inline_22$$ in $storage$$3_storage$$inline_21$$) {
    $spf$cache$valid_$$($storage$$3_storage$$inline_21$$[$extra$$inline_23_key$$22_max$$inline_22$$]) || delete $storage$$3_storage$$inline_21$$[$extra$$inline_23_key$$22_max$$inline_22$$];
  }
  $storage$$3_storage$$inline_21$$ = $spf$cache$storage_$$();
  $extra$$inline_23_key$$22_max$$inline_22$$ = parseInt($spf$config$values$$["cache-max"], 10);
  $extra$$inline_23_key$$22_max$$inline_22$$ = isNaN($extra$$inline_23_key$$22_max$$inline_22$$) ? Infinity : $extra$$inline_23_key$$22_max$$inline_22$$;
  $extra$$inline_23_key$$22_max$$inline_22$$ = Object.keys($storage$$3_storage$$inline_21$$).length - $extra$$inline_23_key$$22_max$$inline_22$$;
  if (!(0 >= $extra$$inline_23_key$$22_max$$inline_22$$)) {
    for (var $i$$inline_24$$ = 0;$i$$inline_24$$ < $extra$$inline_23_key$$22_max$$inline_22$$;$i$$inline_24$$++) {
      var $JSCompiler_object_inline_count_0$$inline_25$$ = Infinity, $JSCompiler_object_inline_key_1$$inline_26$$, $key$$inline_27$$;
      for ($key$$inline_27$$ in $storage$$3_storage$$inline_21$$) {
        $storage$$3_storage$$inline_21$$[$key$$inline_27$$].count < $JSCompiler_object_inline_count_0$$inline_25$$ && ($JSCompiler_object_inline_key_1$$inline_26$$ = $key$$inline_27$$, $JSCompiler_object_inline_count_0$$inline_25$$ = $storage$$3_storage$$inline_21$$[$key$$inline_27$$].count);
      }
      delete $storage$$3_storage$$inline_21$$[$JSCompiler_object_inline_key_1$$inline_26$$];
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
;function $spf$debug$debug$$($var_args$$29$$) {
  $spf$debug$isLevelEnabled$$($spf$debug$Level$DEBUG$$) && $spf$debug$log$$($spf$debug$Level$DEBUG$$, arguments);
}
function $spf$debug$info$$($var_args$$30$$) {
  $spf$debug$isLevelEnabled$$($spf$debug$Level$INFO$$) && $spf$debug$log$$($spf$debug$Level$INFO$$, arguments);
}
function $spf$debug$warn$$($var_args$$31$$) {
  $spf$debug$isLevelEnabled$$($spf$debug$Level$WARN$$) && $spf$debug$log$$($spf$debug$Level$WARN$$, arguments);
}
function $spf$debug$error$$($var_args$$32$$) {
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
function $spf$debug$formatDuration$$($start$$7$$, $end$$3$$) {
  var $dur$$ = ($end$$3$$ - $start$$7$$) / 1E3;
  $dur$$.toFixed && ($dur$$ = $dur$$.toFixed(3));
  return $dur$$ + "s";
}
function $spf$debug$isLevelEnabled$$($level$$7$$) {
  return $spf$debug$levels_$$[$level$$7$$] >= $spf$debug$levels_$$.debug;
}
var $spf$debug$start_$$ = $spf$now$$(), $spf$debug$split_$$ = 0, $spf$debug$direct_$$ = !(!window.console || !window.console.debug), $spf$debug$levels_$$ = {debug:1, info:2, warn:3, error:4}, $spf$debug$Level$DEBUG$$ = "debug", $spf$debug$Level$INFO$$ = "info", $spf$debug$Level$WARN$$ = "warn", $spf$debug$Level$ERROR$$ = "error";
function $spf$dom$classlist$get$$($node$$2$$) {
  return $node$$2$$.classList ? $node$$2$$.classList : $node$$2$$.className && $node$$2$$.className.match(/\S+/g) || [];
}
function $spf$dom$classlist$contains$$($node$$3$$, $cls$$) {
  if ($node$$3$$.classList) {
    return $node$$3$$.classList.contains($cls$$);
  }
  for (var $classes$$ = $spf$dom$classlist$get$$($node$$3$$), $i$$9$$ = 0, $l$$2$$ = $classes$$.length;$i$$9$$ < $l$$2$$;$i$$9$$++) {
    if ($classes$$[$i$$9$$] == $cls$$) {
      return!0;
    }
  }
  return!1;
}
function $spf$dom$classlist$add$$($node$$4$$, $cls$$1$$) {
  $node$$4$$.classList ? $node$$4$$.classList.add($cls$$1$$) : $spf$dom$classlist$contains$$($node$$4$$, $cls$$1$$) || ($node$$4$$.className += " " + $cls$$1$$);
}
function $spf$dom$classlist$remove$$($node$$5$$, $cls$$2$$) {
  if ($node$$5$$.classList) {
    $node$$5$$.classList.remove($cls$$2$$);
  } else {
    for (var $classes$$1$$ = $spf$dom$classlist$get$$($node$$5$$), $newClasses$$ = [], $i$$10$$ = 0, $l$$3$$ = $classes$$1$$.length;$i$$10$$ < $l$$3$$;$i$$10$$++) {
      $classes$$1$$[$i$$10$$] != $cls$$2$$ && $newClasses$$.push($classes$$1$$[$i$$10$$]);
    }
    $node$$5$$.className = $newClasses$$.join(" ");
  }
}
;function $spf$dom$query$$($selector$$1$$, $opt_document$$) {
  var $doc$$ = $opt_document$$ || document;
  return $doc$$.querySelectorAll ? $doc$$.querySelectorAll($selector$$1$$) : [];
}
function $spf$dom$flattenElement$$($element$$4$$) {
  var $child$$1$$, $parent$$2$$ = $element$$4$$.parentNode;
  if ($parent$$2$$ && 11 != $parent$$2$$.nodeType) {
    if ($element$$4$$.removeNode) {
      $element$$4$$.removeNode(!1);
    } else {
      for (;$child$$1$$ = $element$$4$$.firstChild;) {
        $parent$$2$$.insertBefore($child$$1$$, $element$$4$$);
      }
      $parent$$2$$.removeChild($element$$4$$);
    }
  }
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
function $spf$dom$createIframe$$($id$$4_opt_id$$, $doc$$1_opt_document$$1$$, $opt_callback$$6$$) {
  $id$$4_opt_id$$ = $id$$4_opt_id$$ || "";
  $doc$$1_opt_document$$1$$ = $doc$$1_opt_document$$1$$ || document;
  var $iframeEl$$ = $doc$$1_opt_document$$1$$.createElement("iframe");
  $iframeEl$$.id = $id$$4_opt_id$$;
  $iframeEl$$.src = 'javascript:""';
  $iframeEl$$.style.display = "none";
  $opt_callback$$6$$ && ($iframeEl$$.onload = $spf$bind$$($opt_callback$$6$$, null, $iframeEl$$));
  $doc$$1_opt_document$$1$$.body.appendChild($iframeEl$$);
  return $iframeEl$$;
}
;function $spf$history$replace$$($opt_url$$4$$, $opt_state$$1$$, $opt_doCallback$$1$$, $opt_retainState$$) {
  var $currentState$$ = window.history.state;
  $opt_retainState$$ && $currentState$$ && ($opt_state$$1$$ = $opt_state$$1$$ || $currentState$$);
  $spf$debug$info$$("history.replace ", $opt_url$$4$$);
  $spf$history$push_$$(!0, $opt_url$$4$$, $opt_state$$1$$, $opt_doCallback$$1$$);
}
function $spf$history$push_$$($pushState$$inline_32_replace$$, $opt_url$$5_url$$11$$, $opt_state$$2_state$$, $callback$$36_opt_doCallback$$2$$) {
  if ($opt_url$$5_url$$11$$ || $opt_state$$2_state$$) {
    $opt_url$$5_url$$11$$ = $opt_url$$5_url$$11$$ || window.location.href;
    $opt_state$$2_state$$ = $opt_state$$2_state$$ || {};
    var $timestamp$$1$$ = $spf$now$$();
    $spf$state$set$$("history-timestamp", $timestamp$$1$$);
    $opt_state$$2_state$$["spf-timestamp"] = $timestamp$$1$$;
    if ($pushState$$inline_32_replace$$) {
      $spf$history$doReplaceState_$$($opt_state$$2_state$$, $opt_url$$5_url$$11$$), $spf$debug$debug$$("    replaceState:  ", "url=", $opt_url$$5_url$$11$$, "state=", $opt_state$$2_state$$);
    } else {
      $pushState$$inline_32_replace$$ = $spf$history$getIframe$$().contentWindow.history.pushState;
      if ("function" == typeof $pushState$$inline_32_replace$$) {
        $pushState$$inline_32_replace$$.call(window.history, $opt_state$$2_state$$, "", $opt_url$$5_url$$11$$);
      } else {
        throw Error("history.pushState is not a function.");
      }
      $spf$debug$debug$$("    pushState:  ", "url=", $opt_url$$5_url$$11$$, "state=", $opt_state$$2_state$$);
    }
    $spf$state$set$$("history-url", $opt_url$$5_url$$11$$);
    $callback$$36_opt_doCallback$$2$$ && ($callback$$36_opt_doCallback$$2$$ = $spf$state$values_$$["history-callback"]) && $callback$$36_opt_doCallback$$2$$($opt_url$$5_url$$11$$, $opt_state$$2_state$$);
  }
}
function $spf$history$pop_$$($evt$$22_state$$1$$) {
  var $url$$12$$ = window.location.href;
  $spf$debug$info$$("history.pop ", "url=", $url$$12$$, "evt=", $evt$$22_state$$1$$);
  if ($spf$state$values_$$["history-ignore-pop"]) {
    $spf$state$set$$("history-ignore-pop", !1);
  } else {
    if ($evt$$22_state$$1$$.state) {
      $evt$$22_state$$1$$ = $evt$$22_state$$1$$.state;
      var $callback$$37_timestamp$$2$$ = $evt$$22_state$$1$$["spf-timestamp"];
      $url$$12$$ == $spf$state$values_$$["history-url"] ? ($spf$state$set$$("history-timestamp", $callback$$37_timestamp$$2$$), $spf$history$doReplaceState_$$($evt$$22_state$$1$$, $url$$12$$), $spf$debug$debug$$("    replaceState:  ", "url=", $url$$12$$, "state=", $evt$$22_state$$1$$)) : ($evt$$22_state$$1$$["spf-back"] = $callback$$37_timestamp$$2$$ < parseInt($spf$state$values_$$["history-timestamp"], 10), $evt$$22_state$$1$$["spf-current"] = $spf$state$values_$$["history-url"], $spf$state$set$$("history-timestamp", 
      $callback$$37_timestamp$$2$$), $spf$state$set$$("history-url", $url$$12$$), ($callback$$37_timestamp$$2$$ = $spf$state$values_$$["history-callback"]) && $callback$$37_timestamp$$2$$($url$$12$$, $evt$$22_state$$1$$));
    }
  }
}
function $spf$history$doReplaceState_$$($data$$29$$, $opt_url$$7$$) {
  var $replaceState$$ = $spf$history$getIframe$$().contentWindow.history.replaceState;
  if ("function" == typeof $replaceState$$) {
    $replaceState$$.call(window.history, $data$$29$$, "", $opt_url$$7$$);
  } else {
    throw Error("history.replaceState is not a function");
  }
}
function $spf$history$getIframe$$() {
  var $frame$$ = document.getElementById("history-iframe");
  $frame$$ || ($frame$$ = $spf$dom$createIframe$$("history-iframe"));
  return $frame$$;
}
;function $spf$net$xhr$send$$($addContentType_method$$2$$, $url$$15$$, $data$$31$$, $opt_options$$16$$) {
  var $options$$3$$ = $opt_options$$16$$ || {}, $chunked$$ = !1, $offset$$14$$ = 0, $timer$$, $xhr$$ = new XMLHttpRequest;
  $xhr$$.open($addContentType_method$$2$$, $url$$15$$, !0);
  $xhr$$.timing = {};
  var $xhr_abort$$ = $xhr$$.abort;
  $xhr$$.abort = function $$xhr$$$abort$() {
    clearTimeout($timer$$);
    $xhr$$.onreadystatechange = null;
    $xhr_abort$$.call($xhr$$);
  };
  $xhr$$.onreadystatechange = function $$xhr$$$onreadystatechange$() {
    var $chunk_firefoxSpdy_timing$$ = $xhr$$.timing;
    if ($xhr$$.readyState == $spf$net$xhr$State$HEADERS_RECEIVED$$) {
      $chunk_firefoxSpdy_timing$$.responseStart = $chunk_firefoxSpdy_timing$$.responseStart || $spf$now$$();
      $chunked$$ = -1 < ($xhr$$.getResponseHeader("Transfer-Encoding") || "").toLowerCase().indexOf("chunked");
      if (!$chunked$$) {
        var $chunk_firefoxSpdy_timing$$ = $xhr$$.getResponseHeader("X-Firefox-Spdy"), $chromeSpdy_loadTimes$$ = window.chrome && chrome.loadTimes && chrome.loadTimes(), $chromeSpdy_loadTimes$$ = $chromeSpdy_loadTimes$$ && $chromeSpdy_loadTimes$$.wasFetchedViaSpdy;
        $chunked$$ = !(!$chunk_firefoxSpdy_timing$$ && !$chromeSpdy_loadTimes$$);
      }
      $options$$3$$.$onHeaders$ && $options$$3$$.$onHeaders$($xhr$$);
    } else {
      $xhr$$.readyState == $spf$net$xhr$State$LOADING$$ ? $chunked$$ && $options$$3$$.$onChunk$ && ($chunk_firefoxSpdy_timing$$ = $xhr$$.responseText.substring($offset$$14$$), $offset$$14$$ = $xhr$$.responseText.length, $options$$3$$.$onChunk$($xhr$$, $chunk_firefoxSpdy_timing$$)) : $xhr$$.readyState == $spf$net$xhr$State$DONE$$ && ($chunk_firefoxSpdy_timing$$.responseEnd = $chunk_firefoxSpdy_timing$$.responseEnd || $spf$now$$(), window.performance && window.performance.getEntriesByName && ($xhr$$.resourceTiming = 
      window.performance.getEntriesByName($url$$15$$)[0]), $chunked$$ && $options$$3$$.$onChunk$ && $xhr$$.responseText.length > $offset$$14$$ && ($chunk_firefoxSpdy_timing$$ = $xhr$$.responseText.substring($offset$$14$$), $offset$$14$$ = $xhr$$.responseText.length, $options$$3$$.$onChunk$($xhr$$, $chunk_firefoxSpdy_timing$$)), clearTimeout($timer$$), $options$$3$$.$onDone$ && $options$$3$$.$onDone$($xhr$$));
    }
  };
  $addContentType_method$$2$$ = "POST" == $addContentType_method$$2$$;
  if ($options$$3$$.headers) {
    for (var $key$$25$$ in $options$$3$$.headers) {
      $xhr$$.setRequestHeader($key$$25$$, $options$$3$$.headers[$key$$25$$]), "content-type" == $key$$25$$.toLowerCase() && ($addContentType_method$$2$$ = !1);
    }
  }
  $addContentType_method$$2$$ && $xhr$$.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  0 < $options$$3$$.$timeoutMs$ && ($timer$$ = setTimeout(function() {
    $xhr$$.abort();
    $options$$3$$.$onTimeout$ && $options$$3$$.$onTimeout$($xhr$$);
  }, $options$$3$$.$timeoutMs$));
  $xhr$$.timing.fetchStart = $spf$now$$();
  $xhr$$.send($data$$31$$);
  return $xhr$$;
}
var $spf$net$xhr$State$HEADERS_RECEIVED$$ = 2, $spf$net$xhr$State$LOADING$$ = 3, $spf$net$xhr$State$DONE$$ = 4;
function $spf$pubsub$subscribe$$($topic$$, $fn$$6$$) {
  $topic$$ && $fn$$6$$ && ($topic$$ in $spf$pubsub$subscriptions$$ || ($spf$pubsub$subscriptions$$[$topic$$] = []), $spf$pubsub$subscriptions$$[$topic$$].push($fn$$6$$));
}
function $spf$pubsub$unsubscribe$$($topic$$1$$, $fn$$7$$) {
  $topic$$1$$ in $spf$pubsub$subscriptions$$ && $fn$$7$$ && $spf$array$every$$($spf$pubsub$subscriptions$$[$topic$$1$$], function($subFn$$, $i$$11$$, $arr$$17$$) {
    return $subFn$$ == $fn$$7$$ ? ($arr$$17$$[$i$$11$$] = null, !1) : !0;
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
function $spf$string$endsWith$$($str$$9$$, $suffix$$) {
  var $l$$4$$ = $str$$9$$.length - $suffix$$.length;
  return 0 <= $l$$4$$ && $str$$9$$.indexOf($suffix$$, $l$$4$$) == $l$$4$$;
}
var $spf$string$trim$$ = String.prototype.trim ? function($str$$10$$) {
  return $str$$10$$.trim();
} : function($str$$11$$) {
  return $str$$11$$.replace(/^\s+|\s+$/g, "");
};
function $spf$string$partition$$($arr$$19_str$$12$$) {
  $arr$$19_str$$12$$ = $arr$$19_str$$12$$.split("#");
  var $nosep$$ = 1 == $arr$$19_str$$12$$.length;
  return[$arr$$19_str$$12$$[0], $nosep$$ ? "" : "#", $nosep$$ ? "" : $arr$$19_str$$12$$.slice(1).join("#")];
}
;function $spf$url$utils$$($url$$16_utils$$) {
  var $aEl$$ = document.createElement("a");
  $aEl$$.href = $url$$16_utils$$;
  $aEl$$.href = $aEl$$.href;
  $url$$16_utils$$ = {href:$aEl$$.href, protocol:$aEl$$.protocol, host:$aEl$$.host, hostname:$aEl$$.hostname, port:$aEl$$.port, pathname:$aEl$$.pathname, search:$aEl$$.search, hash:$aEl$$.hash, $username$:$aEl$$.$username$, $password$:$aEl$$.$password$};
  $url$$16_utils$$.origin = $url$$16_utils$$.protocol + "//" + $url$$16_utils$$.host;
  $url$$16_utils$$.pathname && "/" == $url$$16_utils$$.pathname[0] || ($url$$16_utils$$.pathname = "/" + $url$$16_utils$$.pathname);
  return $url$$16_utils$$;
}
function $spf$url$absolute$$($relative$$, $opt_keepHash$$) {
  var $utils$$1$$ = $spf$url$utils$$($relative$$);
  return $opt_keepHash$$ ? $utils$$1$$.href : $spf$string$partition$$($utils$$1$$.href)[0];
}
function $spf$url$removeParameters$$($url$$21$$, $parameters$$1$$) {
  var $result$$3$$ = $spf$string$partition$$($url$$21$$);
  $url$$21$$ = $result$$3$$[0];
  for (var $i$$14$$ = 0;$i$$14$$ < $parameters$$1$$.length;$i$$14$$++) {
    $url$$21$$ = $url$$21$$.replace(new RegExp("([?&])" + $parameters$$1$$[$i$$14$$] + "(?:=[^&]*)?(?:(?=[&])|$)", "g"), function($_$$, $delim$$1$$) {
      return "?" == $delim$$1$$ ? $delim$$1$$ : "";
    });
  }
  $spf$string$endsWith$$($url$$21$$, "?") && ($url$$21$$ = $url$$21$$.slice(0, -1));
  return $url$$21$$ + $result$$3$$[1] + $result$$3$$[2];
}
;function $spf$tasks$add$$($key$$27$$, $fn$$8$$, $opt_delay$$) {
  var $queue$$ = $spf$tasks$queues_$$[$key$$27$$];
  return $key$$27$$ && $fn$$8$$ ? ($queue$$ || ($queue$$ = $spf$tasks$queues_$$[$key$$27$$] = {items:[], $scheduledKey$:0, $timeoutKey$:0, $semaphore$:1}), $queue$$.items.push({$fn$:$fn$$8$$, $delay$:$opt_delay$$ || 0})) : $queue$$ && $queue$$.items.length || 0;
}
function $spf$tasks$run$$($key$$28$$, $opt_sync$$) {
  var $queue$$1$$ = $spf$tasks$queues_$$[$key$$28$$];
  if ($queue$$1$$) {
    var $active$$ = !!$queue$$1$$.$scheduledKey$ || !!$queue$$1$$.$timeoutKey$;
    0 < $queue$$1$$.$semaphore$ && ($opt_sync$$ || !$active$$) && $spf$tasks$do_$$($key$$28$$, $opt_sync$$);
  }
}
function $spf$tasks$suspend$$($key$$29_queue$$2$$) {
  ($key$$29_queue$$2$$ = $spf$tasks$queues_$$[$key$$29_queue$$2$$]) && $key$$29_queue$$2$$.$semaphore$--;
}
function $spf$tasks$resume$$($key$$30$$, $opt_sync$$1$$) {
  var $queue$$3$$ = $spf$tasks$queues_$$[$key$$30$$];
  $queue$$3$$ && ($queue$$3$$.$semaphore$++, $spf$tasks$run$$($key$$30$$, $opt_sync$$1$$));
}
function $spf$tasks$cancel$$($key$$31$$) {
  var $queue$$4$$ = $spf$tasks$queues_$$[$key$$31$$];
  $queue$$4$$ && ($spf$tasks$clearAsyncTasks_$$($queue$$4$$), delete $spf$tasks$queues_$$[$key$$31$$]);
}
function $spf$tasks$key$$($obj$$20$$) {
  var $uid$$ = parseInt($spf$state$values_$$.uid, 10) || 0;
  $uid$$++;
  return $obj$$20$$["spf-key"] || ($obj$$20$$["spf-key"] = "" + $spf$state$set$$("uid", $uid$$));
}
function $spf$tasks$do_$$($key$$33$$, $opt_sync$$2$$) {
  var $queue$$5$$ = $spf$tasks$queues_$$[$key$$33$$];
  if ($queue$$5$$ && ($spf$tasks$clearAsyncTasks_$$($queue$$5$$), 0 < $queue$$5$$.$semaphore$ && $queue$$5$$.items.length)) {
    var $task$$1$$ = $queue$$5$$.items[0];
    if ($task$$1$$) {
      var $step$$ = $spf$bind$$(function($nextFn$$, $taskFn$$) {
        $taskFn$$();
        $nextFn$$();
      }, null, $spf$bind$$($spf$tasks$do_$$, null, $key$$33$$, $opt_sync$$2$$));
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
function $spf$net$resource$load$$($el$$1_type$$73$$, $url$$24$$, $name$$52$$, $check_opt_fn$$) {
  $spf$debug$debug$$("resource.load", $el$$1_type$$73$$, $url$$24$$, $name$$52$$);
  var $isJS_key$$inline_36_prevName$$ = $el$$1_type$$73$$ == $spf$net$resource$Type$JS$$;
  $url$$24$$ = $spf$net$resource$canonicalize$$($el$$1_type$$73$$, $url$$24$$);
  var $pseudonym$$ = $name$$52$$ || "^" + $url$$24$$, $topic$$6$$ = $spf$net$resource$key$$($el$$1_type$$73$$, $pseudonym$$), $prevUrl$$;
  $name$$52$$ && ($prevUrl$$ = $spf$net$resource$url$get$$($el$$1_type$$73$$, $name$$52$$)) && $url$$24$$ != $prevUrl$$ && ($spf$dispatch$$($isJS_key$$inline_36_prevName$$ ? "spfjsbeforeunload" : "spfcssbeforeunload", {name:$name$$52$$, url:$prevUrl$$}), $spf$net$resource$unloadPrepare_$$($el$$1_type$$73$$, $name$$52$$, $prevUrl$$), $spf$pubsub$subscribe$$($topic$$6$$, $spf$bind$$($spf$net$resource$unloadComplete_$$, null, $el$$1_type$$73$$, $name$$52$$, $prevUrl$$)));
  $isJS_key$$inline_36_prevName$$ = $spf$net$resource$key$$($el$$1_type$$73$$, $url$$24$$);
  if (($isJS_key$$inline_36_prevName$$ = $spf$net$resource$name_$$[$isJS_key$$inline_36_prevName$$]) && $pseudonym$$ != $isJS_key$$inline_36_prevName$$) {
    var $key$$inline_40_key$$inline_44_key$$inline_52_oldTopic$$inline_46$$ = $spf$net$resource$key$$($el$$1_type$$73$$, $isJS_key$$inline_36_prevName$$);
    delete $spf$net$resource$url_$$[$key$$inline_40_key$$inline_44_key$$inline_52_oldTopic$$inline_46$$];
    $key$$inline_40_key$$inline_44_key$$inline_52_oldTopic$$inline_46$$ = $spf$net$resource$key$$($el$$1_type$$73$$, $url$$24$$);
    delete $spf$net$resource$name_$$[$key$$inline_40_key$$inline_44_key$$inline_52_oldTopic$$inline_46$$];
    ($key$$inline_40_key$$inline_44_key$$inline_52_oldTopic$$inline_46$$ = $spf$net$resource$key$$($el$$1_type$$73$$, $isJS_key$$inline_36_prevName$$)) && $topic$$6$$ && $key$$inline_40_key$$inline_44_key$$inline_52_oldTopic$$inline_46$$ in $spf$pubsub$subscriptions$$ && ($spf$pubsub$subscriptions$$[$topic$$6$$] = ($spf$pubsub$subscriptions$$[$topic$$6$$] || []).concat($spf$pubsub$subscriptions$$[$key$$inline_40_key$$inline_44_key$$inline_52_oldTopic$$inline_46$$]), delete $spf$pubsub$subscriptions$$[$key$$inline_40_key$$inline_44_key$$inline_52_oldTopic$$inline_46$$]);
  }
  $key$$inline_40_key$$inline_44_key$$inline_52_oldTopic$$inline_46$$ = $spf$net$resource$key$$($el$$1_type$$73$$, $url$$24$$);
  $spf$net$resource$name_$$[$key$$inline_40_key$$inline_44_key$$inline_52_oldTopic$$inline_46$$] = $pseudonym$$;
  $spf$net$resource$url$set$$($el$$1_type$$73$$, $pseudonym$$, $url$$24$$);
  $spf$debug$debug$$("  subscribing callback", $topic$$6$$);
  $spf$pubsub$subscribe$$($topic$$6$$, $check_opt_fn$$);
  $check_opt_fn$$ = $spf$bind$$($spf$net$resource$check$$, null, $el$$1_type$$73$$);
  $spf$net$resource$status$get$$($el$$1_type$$73$$, $url$$24$$) ? ($isJS_key$$inline_36_prevName$$ && $pseudonym$$ != $isJS_key$$inline_36_prevName$$ && ($el$$1_type$$73$$ = $spf$net$resource$find$$($el$$1_type$$73$$, $url$$24$$)) && $el$$1_type$$73$$.setAttribute("name", $name$$52$$ || ""), $check_opt_fn$$()) : ($el$$1_type$$73$$ = $spf$net$resource$create$$($el$$1_type$$73$$, $url$$24$$, $check_opt_fn$$, void 0, void 0, $prevUrl$$)) && $name$$52$$ && $el$$1_type$$73$$.setAttribute("name", $name$$52$$);
}
function $spf$net$resource$unload$$($type$$74$$, $name$$53$$) {
  $spf$debug$warn$$("resource.unload", $type$$74$$, $name$$53$$);
  var $url$$25$$ = $spf$net$resource$url$get$$($type$$74$$, $name$$53$$);
  $spf$net$resource$unloadPrepare_$$($type$$74$$, $name$$53$$, $url$$25$$);
  $spf$net$resource$unloadComplete_$$($type$$74$$, $name$$53$$, $url$$25$$);
}
function $spf$net$resource$unloadPrepare_$$($topic$$7_type$$75$$, $name$$54$$, $key$$inline_60_url$$26$$) {
  $spf$debug$debug$$("  > resource.unloadPrepare_", $topic$$7_type$$75$$, $key$$inline_60_url$$26$$);
  var $key$$inline_56$$ = $spf$net$resource$key$$($topic$$7_type$$75$$, $name$$54$$);
  delete $spf$net$resource$url_$$[$key$$inline_56$$];
  $key$$inline_60_url$$26$$ && ($key$$inline_60_url$$26$$ = $spf$net$resource$key$$($topic$$7_type$$75$$, $key$$inline_60_url$$26$$), delete $spf$net$resource$name_$$[$key$$inline_60_url$$26$$]);
  $topic$$7_type$$75$$ = $spf$net$resource$key$$($topic$$7_type$$75$$, $name$$54$$);
  $spf$debug$debug$$("  clearing callbacks for", $topic$$7_type$$75$$);
  delete $spf$pubsub$subscriptions$$[$topic$$7_type$$75$$];
}
function $spf$net$resource$unloadComplete_$$($type$$76$$, $name$$55$$, $url$$27$$) {
  var $isJS$$1$$ = $type$$76$$ == $spf$net$resource$Type$JS$$;
  $url$$27$$ && ($spf$debug$debug$$("  > resource.unloadComplete_", $type$$76$$, $url$$27$$), $spf$dispatch$$($isJS$$1$$ ? "spfjsunload" : "spfcssunload", {name:$name$$55$$, url:$url$$27$$}), $spf$net$resource$destroy$$($type$$76$$, $url$$27$$));
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
function $spf$net$resource$create$$($type$$78$$, $url$$28$$, $opt_callback$$7$$, $opt_document$$2_prevEl$$, $opt_statusGroup$$, $opt_prevUrl$$) {
  function $next$$1$$() {
    $spf$debug$debug$$("resource.create", $type$$78$$, $url$$28$$, "done");
    $spf$net$resource$status$get$$($type$$78$$, $url$$28$$, $opt_statusGroup$$) && ($spf$debug$debug$$("resource.create", $type$$78$$, $url$$28$$, "loaded"), $spf$net$resource$status$set$$($spf$net$resource$State$LOADED$$, $type$$78$$, $url$$28$$, $opt_statusGroup$$));
    $opt_callback$$7$$ && setTimeout($opt_callback$$7$$, 0);
    return null;
  }
  $spf$debug$debug$$("resource.create", $type$$78$$, $url$$28$$, "loading");
  var $isJS$$2$$ = $type$$78$$ == $spf$net$resource$Type$JS$$;
  $url$$28$$ = $spf$net$resource$canonicalize$$($type$$78$$, $url$$28$$);
  $spf$net$resource$status$set$$($spf$net$resource$State$LOADING$$, $type$$78$$, $url$$28$$, $opt_statusGroup$$);
  var $doc$$2_head$$ = $opt_document$$2_prevEl$$ || document, $el$$2$$ = $doc$$2_head$$.createElement($isJS$$2$$ ? "script" : "link");
  if (!$url$$28$$) {
    return $next$$1$$();
  }
  var $label$$4$$ = $spf$net$resource$label$$($url$$28$$);
  $el$$2$$.className = $spf$net$resource$key$$($type$$78$$, $label$$4$$);
  "onload" in $el$$2$$ ? $el$$2$$.onerror = $el$$2$$.onload = $next$$1$$ : $el$$2$$.onreadystatechange = function $$el$$2$$$onreadystatechange$() {
    /^c|loade/.test($el$$2$$.readyState) && $next$$1$$();
  };
  $doc$$2_head$$ = $doc$$2_head$$.getElementsByTagName("head")[0];
  $isJS$$2$$ ? ($el$$2$$.async = !0, $el$$2$$.src = $url$$28$$, $doc$$2_head$$.insertBefore($el$$2$$, $doc$$2_head$$.firstChild)) : ($el$$2$$.rel = "stylesheet", $el$$2$$.href = $url$$28$$, ($opt_document$$2_prevEl$$ = $opt_prevUrl$$ && $spf$net$resource$find$$($type$$78$$, $opt_prevUrl$$, $opt_document$$2_prevEl$$)) ? $doc$$2_head$$.insertBefore($el$$2$$, $opt_document$$2_prevEl$$) : $doc$$2_head$$.appendChild($el$$2$$));
  return $el$$2$$;
}
function $spf$net$resource$destroy$$($type$$79$$, $url$$29$$) {
  $url$$29$$ = $spf$net$resource$canonicalize$$($type$$79$$, $url$$29$$);
  var $el$$3_key$$inline_66$$ = $spf$net$resource$find$$($type$$79$$, $url$$29$$, void 0);
  $el$$3_key$$inline_66$$ && $el$$3_key$$inline_66$$.parentNode && $el$$3_key$$inline_66$$.parentNode.removeChild($el$$3_key$$inline_66$$);
  $el$$3_key$$inline_66$$ = $spf$net$resource$key$$($type$$79$$, $url$$29$$);
  delete $spf$net$resource$status_$$[$el$$3_key$$inline_66$$];
}
function $spf$net$resource$find$$($cls$$3_type$$80$$, $label$$5_url$$30$$, $opt_document$$4$$) {
  $label$$5_url$$30$$ = $spf$net$resource$label$$($label$$5_url$$30$$);
  $cls$$3_type$$80$$ = $spf$net$resource$key$$($cls$$3_type$$80$$, $label$$5_url$$30$$);
  return $spf$dom$query$$("." + $cls$$3_type$$80$$, $opt_document$$4$$)[0];
}
function $spf$net$resource$discover$$($type$$81$$) {
  $spf$debug$debug$$("resource.discover", $type$$81$$);
  var $isJS$$3$$ = $type$$81$$ == $spf$net$resource$Type$JS$$, $els$$1$$ = [];
  $spf$array$each$$($spf$dom$query$$($isJS$$3$$ ? "script[src]" : 'link[rel~="stylesheet"]'), function($el$$4$$) {
    var $url$$31$$ = $isJS$$3$$ ? $el$$4$$.src : $el$$4$$.href, $url$$31$$ = $spf$net$resource$canonicalize$$($type$$81$$, $url$$31$$);
    if (!$spf$net$resource$status$get$$($type$$81$$, $url$$31$$)) {
      $spf$net$resource$status$set$$($spf$net$resource$State$LOADED$$, $type$$81$$, $url$$31$$);
      var $cls$$4_label$$6$$ = $spf$net$resource$label$$($url$$31$$), $cls$$4_label$$6$$ = $spf$net$resource$key$$($type$$81$$, $cls$$4_label$$6$$);
      $spf$dom$classlist$add$$($el$$4$$, $cls$$4_label$$6$$);
      var $name$$56$$ = $el$$4$$.getAttribute("name");
      if ($name$$56$$) {
        var $key$$inline_71$$ = $spf$net$resource$key$$($type$$81$$, $url$$31$$);
        $spf$net$resource$name_$$[$key$$inline_71$$] = $name$$56$$;
        $spf$net$resource$url$set$$($type$$81$$, $name$$56$$, $url$$31$$);
      }
      $els$$1$$.push($el$$4$$);
      $spf$debug$debug$$("  found", $url$$31$$, $cls$$4_label$$6$$, $name$$56$$);
    }
  });
}
function $spf$net$resource$prefetch$$($type$$82$$, $url$$32$$) {
  if ($url$$32$$ && ($url$$32$$ = $spf$net$resource$canonicalize$$($type$$82$$, $url$$32$$), !$spf$net$resource$status$get$$($type$$82$$, $url$$32$$))) {
    var $el$$5_label$$7$$ = $spf$net$resource$label$$($url$$32$$), $id$$5_next$$2$$ = $spf$net$resource$key$$($type$$82$$, $el$$5_label$$7$$), $key$$34$$ = $spf$net$resource$key$$($type$$82$$, "prefetch"), $el$$5_label$$7$$ = document.getElementById($key$$34$$);
    if (!$el$$5_label$$7$$) {
      $el$$5_label$$7$$ = $spf$dom$createIframe$$($key$$34$$, null, function($el$$6$$) {
        $el$$6$$.title = $key$$34$$;
        $spf$tasks$run$$($key$$34$$, !0);
      });
    } else {
      if ($el$$5_label$$7$$.contentWindow.document.getElementById($id$$5_next$$2$$)) {
        return;
      }
    }
    $id$$5_next$$2$$ = $spf$bind$$($spf$net$resource$prefetch_$$, null, $el$$5_label$$7$$, $type$$82$$, $url$$32$$, $id$$5_next$$2$$, $key$$34$$);
    $el$$5_label$$7$$.title ? $id$$5_next$$2$$() : $spf$tasks$add$$($key$$34$$, $id$$5_next$$2$$);
  }
}
function $spf$net$resource$prefetch_$$($doc$$3_el$$7$$, $fetchEl_type$$83$$, $url$$33$$, $id$$6$$, $group$$) {
  var $isCSS$$ = $fetchEl_type$$83$$ == $spf$net$resource$Type$CSS$$;
  $doc$$3_el$$7$$ = $doc$$3_el$$7$$.contentWindow.document;
  $fetchEl_type$$83$$ == $spf$net$resource$Type$JS$$ ? ($fetchEl_type$$83$$ = $doc$$3_el$$7$$.createElement("object"), $spf$net$resource$IS_IE$$ ? $doc$$3_el$$7$$.createElement("script").src = $url$$33$$ : $fetchEl_type$$83$$.data = $url$$33$$, $fetchEl_type$$83$$.id = $id$$6$$, $doc$$3_el$$7$$.body.appendChild($fetchEl_type$$83$$)) : $isCSS$$ ? ($fetchEl_type$$83$$ = $spf$net$resource$create$$($fetchEl_type$$83$$, $url$$33$$, null, $doc$$3_el$$7$$, $group$$), $fetchEl_type$$83$$.id = $id$$6$$) : 
  ($fetchEl_type$$83$$ = $doc$$3_el$$7$$.createElement("img"), $fetchEl_type$$83$$.src = $url$$33$$, $fetchEl_type$$83$$.id = $id$$6$$, $doc$$3_el$$7$$.body.appendChild($fetchEl_type$$83$$));
}
function $spf$net$resource$eval$$($type$$84$$, $el$$8_text$$10$$, $name$$57$$) {
  for (var $previous$$ = $spf$net$resource$url$get$$($type$$84$$, $name$$57$$), $cls$$5_id$$7_label$$8_str$$inline_73$$ = $el$$8_text$$10$$.replace(/\s/g, ""), $cls$$5_id$$7_label$$8_str$$inline_73$$ = $cls$$5_id$$7_label$$8_str$$inline_73$$ || "", $result$$inline_74$$ = 0, $i$$inline_75$$ = 0, $l$$inline_76$$ = $cls$$5_id$$7_label$$8_str$$inline_73$$.length;$i$$inline_75$$ < $l$$inline_76$$;++$i$$inline_75$$) {
    $result$$inline_74$$ = 31 * $result$$inline_74$$ + $cls$$5_id$$7_label$$8_str$$inline_73$$.charCodeAt($i$$inline_75$$), $result$$inline_74$$ %= 4294967296;
  }
  $cls$$5_id$$7_label$$8_str$$inline_73$$ = "hash-" + $result$$inline_74$$;
  $spf$net$resource$url$set$$($type$$84$$, $name$$57$$, $cls$$5_id$$7_label$$8_str$$inline_73$$);
  !$spf$net$resource$status$loaded$$($type$$84$$, $cls$$5_id$$7_label$$8_str$$inline_73$$) && ($el$$8_text$$10$$ = $spf$net$resource$exec$$($type$$84$$, $el$$8_text$$10$$)) && ($spf$net$resource$status$set$$($spf$net$resource$State$LOADED$$, $type$$84$$, $cls$$5_id$$7_label$$8_str$$inline_73$$), $el$$8_text$$10$$ && ($cls$$5_id$$7_label$$8_str$$inline_73$$ = $spf$net$resource$label$$($cls$$5_id$$7_label$$8_str$$inline_73$$), $cls$$5_id$$7_label$$8_str$$inline_73$$ = $spf$net$resource$key$$($type$$84$$, 
  $cls$$5_id$$7_label$$8_str$$inline_73$$), $el$$8_text$$10$$.className = $cls$$5_id$$7_label$$8_str$$inline_73$$, $el$$8_text$$10$$.setAttribute("name", $name$$57$$)), ($previous$$ = $previous$$ && $previous$$[0]) && $spf$net$resource$destroy$$($type$$84$$, $previous$$));
}
function $spf$net$resource$exec$$($type$$85$$, $text$$11$$) {
  $text$$11$$ = $spf$string$trim$$($text$$11$$);
  if (!$text$$11$$) {
    return null;
  }
  var $targetEl$$ = document.getElementsByTagName("head")[0] || document.body, $el$$9$$;
  $type$$85$$ == $spf$net$resource$Type$JS$$ ? ($el$$9$$ = document.createElement("script"), $el$$9$$.text = $text$$11$$, $targetEl$$.appendChild($el$$9$$)) : ($el$$9$$ = document.createElement("style"), $targetEl$$.appendChild($el$$9$$), "styleSheet" in $el$$9$$ ? $el$$9$$.styleSheet.cssText = $text$$11$$ : $el$$9$$.appendChild(document.createTextNode($text$$11$$)));
  return $el$$9$$;
}
function $spf$net$resource$canonicalize$$($type$$87$$, $url$$34$$) {
  var $key$$36_paths$$1$$ = "rsrc-p-" + $type$$87$$;
  if ($url$$34$$) {
    var $index$$45$$ = $url$$34$$.indexOf("//");
    if (0 > $index$$45$$) {
      if (0 == $url$$34$$.lastIndexOf("hash-", 0)) {
        return $url$$34$$;
      }
      $key$$36_paths$$1$$ = $spf$state$values_$$[$key$$36_paths$$1$$] || "";
      if ("[object String]" == Object.prototype.toString.call($key$$36_paths$$1$$)) {
        $url$$34$$ = $key$$36_paths$$1$$ + $url$$34$$;
      } else {
        for (var $p$$ in $key$$36_paths$$1$$) {
          $url$$34$$ = $url$$34$$.replace($p$$, $key$$36_paths$$1$$[$p$$]);
        }
      }
      $url$$34$$ = 0 > $url$$34$$.indexOf("." + $type$$87$$) ? $url$$34$$ + "." + $type$$87$$ : $url$$34$$;
      $url$$34$$ = $spf$url$absolute$$($url$$34$$);
    } else {
      0 == $index$$45$$ && ($url$$34$$ = $spf$url$absolute$$($url$$34$$));
    }
  }
  return $url$$34$$;
}
function $spf$net$resource$key$$($type$$88$$, $label$$9$$, $opt_group$$) {
  return $type$$88$$ + "-" + $label$$9$$ + ($opt_group$$ ? "-" + $opt_group$$ : "");
}
function $spf$net$resource$label$$($url$$35$$) {
  return $url$$35$$ ? String($url$$35$$).replace(/[^\w]/g, "") : "";
}
function $spf$net$resource$status$set$$($status$$, $key$$37_type$$89$$, $url$$36$$, $opt_group$$1$$) {
  $key$$37_type$$89$$ = $spf$net$resource$key$$($key$$37_type$$89$$, $url$$36$$, $opt_group$$1$$);
  $spf$net$resource$status_$$[$key$$37_type$$89$$] = $status$$;
}
function $spf$net$resource$status$get$$($key$$38_type$$90$$, $url$$37$$, $opt_group$$2$$) {
  $key$$38_type$$90$$ = $spf$net$resource$key$$($key$$38_type$$90$$, $url$$37$$, $opt_group$$2$$);
  return $spf$net$resource$status_$$[$key$$38_type$$90$$];
}
function $spf$net$resource$status$loaded$$($type$$92$$, $url$$39$$) {
  var $status$$1$$ = $spf$net$resource$status$get$$($type$$92$$, $url$$39$$);
  return "" == $url$$39$$ || $status$$1$$ == $spf$net$resource$State$LOADED$$;
}
function $spf$net$resource$url$set$$($key$$43_type$$96$$, $name$$59$$, $url$$43$$) {
  $key$$43_type$$96$$ = $spf$net$resource$key$$($key$$43_type$$96$$, $name$$59$$);
  $spf$net$resource$url_$$[$key$$43_type$$96$$] = $url$$43$$;
}
function $spf$net$resource$url$get$$($type$$97$$, $name$$60$$) {
  var $key$$44$$ = $spf$net$resource$key$$($type$$97$$, $name$$60$$);
  return $spf$net$resource$url_$$[$key$$44$$];
}
function $spf$net$resource$url$loaded$$($type$$99$$, $name$$62$$) {
  var $url$$45$$ = $spf$net$resource$url$get$$($type$$99$$, $name$$62$$);
  return void 0 != $url$$45$$ && $spf$net$resource$status$loaded$$($type$$99$$, $url$$45$$);
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
  $spf$array$each$$($urls$$, function($url$$46$$) {
    $spf$net$resource$prefetch$$("img", $url$$46$$);
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
    var $chunk$$1_extra$$1$$, $start$$8$$ = 0;
    $opt_lastDitch$$ && ($response_text$$16$$ += "\r\n");
    var $finish$$ = $response_text$$16$$.indexOf($spf$nav$response$Token$BEGIN$$, $start$$8$$);
    for (-1 < $finish$$ && ($start$$8$$ = $finish$$ + $spf$nav$response$Token$BEGIN$$.length);-1 < ($finish$$ = $response_text$$16$$.indexOf($spf$nav$response$Token$DELIMITER$$, $start$$8$$));) {
      $chunk$$1_extra$$1$$ = $spf$string$trim$$($response_text$$16$$.substring($start$$8$$, $finish$$)), $start$$8$$ = $finish$$ + $spf$nav$response$Token$DELIMITER$$.length, $chunk$$1_extra$$1$$ && $opt_multipart_parts$$1$$.push(JSON.parse($chunk$$1_extra$$1$$));
    }
    $finish$$ = $response_text$$16$$.indexOf($spf$nav$response$Token$END$$, $start$$8$$);
    -1 < $finish$$ && ($chunk$$1_extra$$1$$ = $spf$string$trim$$($response_text$$16$$.substring($start$$8$$, $finish$$)), $start$$8$$ = $finish$$ + $spf$nav$response$Token$END$$.length, $chunk$$1_extra$$1$$ && $opt_multipart_parts$$1$$.push(JSON.parse($chunk$$1_extra$$1$$)));
    $chunk$$1_extra$$1$$ = "";
    $response_text$$16$$.length > $start$$8$$ && ($chunk$$1_extra$$1$$ = $response_text$$16$$.substring($start$$8$$), $opt_lastDitch$$ && $spf$string$endsWith$$($chunk$$1_extra$$1$$, "\r\n") && ($chunk$$1_extra$$1$$ = $chunk$$1_extra$$1$$.substring(0, $chunk$$1_extra$$1$$.length - 2)));
    return{$parts$:$opt_multipart_parts$$1$$, $extra$:$chunk$$1_extra$$1$$};
  }
  $response_text$$16$$ = JSON.parse($response_text$$16$$);
  $opt_multipart_parts$$1$$ = "number" == typeof $response_text$$16$$.length ? $response_text$$16$$ : [$response_text$$16$$];
  return{$parts$:$opt_multipart_parts$$1$$, $extra$:""};
}
function $spf$nav$response$process$$($url$$55$$, $response$$1$$, $opt_callback$$8$$, $fragments_opt_navigate$$, $opt_reverse$$) {
  $spf$debug$info$$("nav.response.process ", $response$$1$$, $opt_reverse$$);
  var $key$$46$$ = "process " + $spf$url$absolute$$($url$$55$$), $sync$$ = !$spf$config$values$$["experimental-process-async"], $fn$$12_num$$5$$;
  $fn$$12_num$$5$$ = 0;
  $response$$1$$.timing || ($response$$1$$.timing = {});
  $response$$1$$.title && (document.title = $response$$1$$.title);
  $fragments_opt_navigate$$ && $response$$1$$.url && $spf$url$absolute$$($response$$1$$.url) != $spf$url$absolute$$(window.location.href) && ($spf$debug$debug$$("  update history with response url"), $spf$history$replace$$($response$$1$$.url + window.location.hash, null, !1, !0));
  $response$$1$$.head && ($fn$$12_num$$5$$ = $spf$bind$$(function($head$$1$$, $timing$$1$$) {
    var $extracted$$ = $spf$nav$response$extract_$$($head$$1$$);
    $spf$nav$response$preinstallLinks_$$($extracted$$);
    $spf$nav$response$installStyles_$$($extracted$$);
    $spf$debug$debug$$("    head css");
    $spf$tasks$suspend$$($key$$46$$);
    $spf$nav$response$installScripts_$$($extracted$$, function() {
      $timing$$1$$.spfProcessHead = $spf$now$$();
      $spf$debug$debug$$("    head js");
      $spf$tasks$resume$$($key$$46$$, $sync$$);
      $spf$debug$debug$$("  process task done: head");
    });
  }, null, $response$$1$$.head, $response$$1$$.timing), $fn$$12_num$$5$$ = $spf$tasks$add$$($key$$46$$, $fn$$12_num$$5$$), $spf$debug$debug$$("  process task queued: head", $fn$$12_num$$5$$));
  $response$$1$$.attr && ($fn$$12_num$$5$$ = $spf$bind$$(function($attrs$$, $timing$$2$$) {
    for (var $id$$9$$ in $attrs$$) {
      var $el$$12_element$$inline_80$$ = document.getElementById($id$$9$$);
      if ($el$$12_element$$inline_80$$) {
        var $attributes$$inline_81$$ = $attrs$$[$id$$9$$], $name$$inline_82$$ = void 0;
        for ($name$$inline_82$$ in $attributes$$inline_81$$) {
          var $value$$inline_83$$ = $attributes$$inline_81$$[$name$$inline_82$$];
          "class" == $name$$inline_82$$ ? $el$$12_element$$inline_80$$.className = $value$$inline_83$$ : "style" == $name$$inline_82$$ ? $el$$12_element$$inline_80$$.style.cssText = $value$$inline_83$$ : $el$$12_element$$inline_80$$.setAttribute($name$$inline_82$$, $value$$inline_83$$);
        }
        $spf$debug$debug$$("    attr set", $id$$9$$);
      }
    }
    $timing$$2$$.spfProcessAttr = $spf$now$$();
    $spf$debug$debug$$("  process task done: attr");
  }, null, $response$$1$$.attr, $response$$1$$.timing), $fn$$12_num$$5$$ = $spf$tasks$add$$($key$$46$$, $fn$$12_num$$5$$), $spf$debug$debug$$("  process task queued: attr", $fn$$12_num$$5$$));
  $fragments_opt_navigate$$ = $response$$1$$.body || {};
  var $numBeforeFragments$$ = $fn$$12_num$$5$$, $id$$8_numFragments$$;
  for ($id$$8_numFragments$$ in $fragments_opt_navigate$$) {
    $fn$$12_num$$5$$ = $spf$bind$$(function($id$$10$$, $body$$1$$) {
      var $animationFn_el$$13$$ = document.getElementById($id$$10$$);
      if ($animationFn_el$$13$$) {
        var $extracted$$1$$ = $spf$nav$response$extract_$$($body$$1$$), $animationClass_animationData_innerHtmlHandler$$ = $spf$config$values$$["animation-class"];
        if ($spf$nav$response$CAN_ANIMATE_$$ && $spf$dom$classlist$contains$$($animationFn_el$$13$$, $animationClass_animationData_innerHtmlHandler$$)) {
          $spf$tasks$suspend$$($key$$46$$);
          var $animationKey$$ = $spf$tasks$key$$($animationFn_el$$13$$);
          $spf$tasks$run$$($animationKey$$, !0);
          $animationClass_animationData_innerHtmlHandler$$ = {$extracted$:$extracted$$1$$, reverse:!!$opt_reverse$$, $currentEl$:null, $pendingEl$:null, $parentEl$:$animationFn_el$$13$$, $currentClass$:$animationClass_animationData_innerHtmlHandler$$ + "-old", $pendingClass$:$animationClass_animationData_innerHtmlHandler$$ + "-new", $startClass$:$opt_reverse$$ ? $animationClass_animationData_innerHtmlHandler$$ + "-reverse-start" : $animationClass_animationData_innerHtmlHandler$$ + "-forward-start", 
          $endClass$:$opt_reverse$$ ? $animationClass_animationData_innerHtmlHandler$$ + "-reverse-end" : $animationClass_animationData_innerHtmlHandler$$ + "-forward-end"};
          $animationFn_el$$13$$ = $spf$bind$$(function($data$$32$$) {
            $spf$nav$response$installStyles_$$($data$$32$$.$extracted$);
            $spf$dom$classlist$add$$($data$$32$$.$parentEl$, $data$$32$$.$startClass$);
            $data$$32$$.$currentEl$ = document.createElement("div");
            $data$$32$$.$currentEl$.className = $data$$32$$.$currentClass$;
            var $element$$inline_85_refNode$$inline_90_refNode$$inline_93$$ = $data$$32$$.$parentEl$, $parent$$inline_86$$ = $data$$32$$.$currentEl$;
            if ($parent$$inline_86$$) {
              for (var $child$$inline_87$$;$child$$inline_87$$ = $element$$inline_85_refNode$$inline_90_refNode$$inline_93$$.firstChild;) {
                $parent$$inline_86$$.appendChild($child$$inline_87$$);
              }
              $element$$inline_85_refNode$$inline_90_refNode$$inline_93$$.appendChild($parent$$inline_86$$);
            }
            $data$$32$$.$pendingEl$ = document.createElement("div");
            $data$$32$$.$pendingEl$.className = $data$$32$$.$pendingClass$;
            $data$$32$$.$pendingEl$.innerHTML = $data$$32$$.$extracted$.$html$;
            $data$$32$$.reverse ? ($element$$inline_85_refNode$$inline_90_refNode$$inline_93$$ = $data$$32$$.$currentEl$, $element$$inline_85_refNode$$inline_90_refNode$$inline_93$$.parentNode.insertBefore($data$$32$$.$pendingEl$, $element$$inline_85_refNode$$inline_90_refNode$$inline_93$$)) : ($element$$inline_85_refNode$$inline_90_refNode$$inline_93$$ = $data$$32$$.$currentEl$, $element$$inline_85_refNode$$inline_90_refNode$$inline_93$$.parentNode.insertBefore($data$$32$$.$pendingEl$, $element$$inline_85_refNode$$inline_90_refNode$$inline_93$$.nextSibling));
            $spf$debug$debug$$("  process anim done: add new", $data$$32$$.$parentEl$.id);
          }, null, $animationClass_animationData_innerHtmlHandler$$);
          $spf$tasks$add$$($animationKey$$, $animationFn_el$$13$$, 0);
          $spf$debug$debug$$("  process anim queued: add new", $id$$10$$);
          $animationFn_el$$13$$ = $spf$bind$$(function($data$$33$$) {
            $spf$dom$classlist$remove$$($data$$33$$.$parentEl$, $data$$33$$.$startClass$);
            $spf$dom$classlist$add$$($data$$33$$.$parentEl$, $data$$33$$.$endClass$);
            $spf$debug$debug$$("  process anim done: swap", $data$$33$$.$parentEl$.id);
          }, null, $animationClass_animationData_innerHtmlHandler$$);
          $spf$tasks$add$$($animationKey$$, $animationFn_el$$13$$, 0);
          $spf$debug$debug$$("  process anim queued: swap", $id$$10$$);
          $animationFn_el$$13$$ = $spf$bind$$(function($data$$34$$) {
            $data$$34$$.$parentEl$.removeChild($data$$34$$.$currentEl$);
            $spf$dom$classlist$remove$$($data$$34$$.$parentEl$, $data$$34$$.$endClass$);
            $spf$dom$flattenElement$$($data$$34$$.$pendingEl$);
            $spf$debug$debug$$("    body update", $data$$34$$.$parentEl$.id);
            $spf$tasks$suspend$$($animationKey$$);
            $spf$nav$response$installScripts_$$($data$$34$$.$extracted$, function() {
              $spf$debug$debug$$("    body js", $data$$34$$.$parentEl$.id);
              $spf$tasks$resume$$($animationKey$$);
              $spf$debug$debug$$("  process anim done: del old", $data$$34$$.$parentEl$.id);
            });
          }, null, $animationClass_animationData_innerHtmlHandler$$);
          $spf$tasks$add$$($animationKey$$, $animationFn_el$$13$$, parseInt($spf$config$values$$["animation-duration"], 10));
          $spf$debug$debug$$("  process anim queued: del old", $id$$10$$);
          $animationFn_el$$13$$ = $spf$bind$$(function($data$$35$$, $key$$47$$) {
            $spf$debug$debug$$("  process anim done: complete", $data$$35$$.$parentEl$.id);
            $spf$tasks$resume$$($key$$47$$);
            $spf$debug$debug$$("  process task done: body ", $data$$35$$.$parentEl$.id);
          }, null, $animationClass_animationData_innerHtmlHandler$$, $key$$46$$);
          $spf$tasks$add$$($animationKey$$, $animationFn_el$$13$$);
          $spf$debug$debug$$("  process anim queued: complete", $id$$10$$);
          $spf$tasks$run$$($animationKey$$);
        } else {
          $spf$nav$response$installStyles_$$($extracted$$1$$);
          var $installScripts$$ = function $$installScripts$$$() {
            $spf$tasks$suspend$$($key$$46$$);
            $spf$nav$response$installScripts_$$($extracted$$1$$, function() {
              $spf$debug$debug$$("    body js", $id$$10$$);
              $spf$tasks$resume$$($key$$46$$, $sync$$);
              $spf$debug$debug$$("  process task done: body", $id$$10$$);
            });
          };
          ($animationClass_animationData_innerHtmlHandler$$ = $spf$config$values$$["experimental-html-handler"]) ? ($spf$tasks$suspend$$($key$$46$$), $animationClass_animationData_innerHtmlHandler$$($extracted$$1$$.$html$, $animationFn_el$$13$$, function() {
            $installScripts$$();
            $spf$tasks$resume$$($key$$46$$, $sync$$);
          })) : ($animationFn_el$$13$$.innerHTML = $extracted$$1$$.$html$, $spf$debug$debug$$("    body update", $id$$10$$), $installScripts$$());
        }
      }
    }, null, $id$$8_numFragments$$, $fragments_opt_navigate$$[$id$$8_numFragments$$], $response$$1$$.timing), $fn$$12_num$$5$$ = $spf$tasks$add$$($key$$46$$, $fn$$12_num$$5$$), $spf$debug$debug$$("  process task queued: body", $id$$8_numFragments$$, $fn$$12_num$$5$$);
  }
  $id$$8_numFragments$$ = $fn$$12_num$$5$$ - $numBeforeFragments$$;
  $response$$1$$.foot ? ($fn$$12_num$$5$$ = $spf$bind$$(function($extracted$$2_foot$$, $timing$$4$$, $numFragments$$1$$) {
    $numFragments$$1$$ && ($timing$$4$$.spfProcessBody = $spf$now$$());
    $extracted$$2_foot$$ = $spf$nav$response$extract_$$($extracted$$2_foot$$);
    $spf$nav$response$installStyles_$$($extracted$$2_foot$$);
    $spf$debug$debug$$("    foot css");
    $spf$tasks$suspend$$($key$$46$$);
    $spf$nav$response$installScripts_$$($extracted$$2_foot$$, function() {
      $timing$$4$$.spfProcessFoot = $spf$now$$();
      $spf$debug$debug$$("    foot js");
      $spf$tasks$resume$$($key$$46$$, $sync$$);
      $spf$debug$debug$$("  process task done: foot");
    });
  }, null, $response$$1$$.foot, $response$$1$$.timing, $id$$8_numFragments$$), $fn$$12_num$$5$$ = $spf$tasks$add$$($key$$46$$, $fn$$12_num$$5$$), $spf$debug$debug$$("  process task queued: foot", $fn$$12_num$$5$$)) : $id$$8_numFragments$$ && ($fn$$12_num$$5$$ = $spf$bind$$(function($timing$$5$$) {
    $timing$$5$$.spfProcessBody = $spf$now$$();
    $spf$debug$debug$$("  process task done: timing-for-body");
  }, null, $response$$1$$.timing), $fn$$12_num$$5$$ = $spf$tasks$add$$($key$$46$$, $fn$$12_num$$5$$), $spf$debug$debug$$("  process task queued: timing-for-body", $fn$$12_num$$5$$));
  $opt_callback$$8$$ && ($fn$$12_num$$5$$ = $spf$tasks$add$$($key$$46$$, $spf$bind$$($opt_callback$$8$$, null, $url$$55$$, $response$$1$$)), $spf$debug$debug$$("  process task queued: callback", $fn$$12_num$$5$$));
  $spf$tasks$run$$($key$$46$$, $sync$$);
}
function $spf$nav$response$preprocess$$($url$$56$$, $response$$2$$, $opt_callback$$9$$) {
  $spf$debug$info$$("nav.response.preprocess ", $response$$2$$);
  var $key$$48$$ = "preprocess " + $spf$url$absolute$$($url$$56$$), $fn$$13$$;
  $response$$2$$.head && ($fn$$13$$ = $spf$bind$$(function($extracted$$3_head$$2$$) {
    $extracted$$3_head$$2$$ = $spf$nav$response$extract_$$($extracted$$3_head$$2$$);
    $spf$nav$response$preinstallLinks_$$($extracted$$3_head$$2$$);
    $spf$nav$response$preinstallStyles_$$($extracted$$3_head$$2$$);
    $spf$nav$response$preinstallScripts_$$($extracted$$3_head$$2$$);
    $spf$debug$debug$$("  preprocess task done: head");
  }, null, $response$$2$$.head), $spf$tasks$add$$($key$$48$$, $fn$$13$$), $spf$debug$debug$$("  preprocess task queued: head"));
  var $fragments$$1$$ = $response$$2$$.body || {}, $id$$11$$;
  for ($id$$11$$ in $fragments$$1$$) {
    $fragments$$1$$[$id$$11$$] && ($fn$$13$$ = $spf$bind$$(function($id$$12$$, $body$$2$$) {
      var $extracted$$4$$ = $spf$nav$response$extract_$$($body$$2$$);
      $spf$nav$response$preinstallStyles_$$($extracted$$4$$);
      $spf$nav$response$preinstallScripts_$$($extracted$$4$$);
      $spf$debug$debug$$("    body js", $id$$12$$);
      $spf$debug$debug$$("  preprocess task done: body", $id$$12$$);
    }, null, $id$$11$$, $fragments$$1$$[$id$$11$$]), $spf$tasks$add$$($key$$48$$, $fn$$13$$), $spf$debug$debug$$("  preprocess task queued: body", $id$$11$$));
  }
  $response$$2$$.foot && ($fn$$13$$ = $spf$bind$$(function($extracted$$5_foot$$1$$) {
    $extracted$$5_foot$$1$$ = $spf$nav$response$extract_$$($extracted$$5_foot$$1$$);
    $spf$nav$response$preinstallStyles_$$($extracted$$5_foot$$1$$);
    $spf$nav$response$preinstallScripts_$$($extracted$$5_foot$$1$$);
    $spf$debug$debug$$("  preprocess task done: foot");
  }, null, $response$$2$$.foot), $spf$tasks$add$$($key$$48$$, $fn$$13$$), $spf$debug$debug$$("  preprocess task queued: foot"));
  $opt_callback$$9$$ && ($spf$tasks$add$$($key$$48$$, $spf$bind$$($opt_callback$$9$$, null, $url$$56$$, $response$$2$$)), $spf$debug$debug$$("  preprocess task queued: callback"));
  $spf$tasks$run$$($key$$48$$);
}
function $spf$nav$response$extract_$$($html$$) {
  var $result$$4$$ = new $spf$nav$response$Extraction_$$;
  if (!$html$$) {
    return $result$$4$$;
  }
  if ("[object String]" != Object.prototype.toString.call($html$$)) {
    return $html$$.scripts && $spf$array$each$$($html$$.scripts, function($script$$) {
      $result$$4$$.scripts.push({url:$script$$.url || "", text:$script$$.text || "", name:$script$$.name || "", async:$script$$.async || !1});
    }), $html$$.styles && $spf$array$each$$($html$$.styles, function($style$$) {
      $result$$4$$.$styles$.push({url:$style$$.url || "", text:$style$$.text || "", name:$style$$.name || ""});
    }), $html$$.links && $spf$config$values$$["experimental-preconnect"] && $spf$array$each$$($html$$.links, function($link$$) {
      "spf-preconnect" == $link$$.rel && $result$$4$$.links.push({url:$link$$.url || "", rel:$link$$.rel || ""});
    }), $result$$4$$.$html$ = $html$$.html || "", $result$$4$$;
  }
  $html$$ = $html$$.replace($spf$nav$response$ElementRegEx$SCRIPT_STYLE$$, function($full_name$$76$$, $tag$$1_url$$57$$, $async_attr$$, $text$$17$$) {
    return "script" == $tag$$1_url$$57$$ ? ($full_name$$76$$ = ($full_name$$76$$ = $async_attr$$.match($spf$nav$response$AttributeRegEx$NAME$$)) ? $full_name$$76$$[1] : "", $tag$$1_url$$57$$ = ($tag$$1_url$$57$$ = $async_attr$$.match($spf$nav$response$AttributeRegEx$SRC$$)) ? $tag$$1_url$$57$$[1] : "", $async_attr$$ = $spf$nav$response$AttributeRegEx$ASYNC$$.test($async_attr$$), $result$$4$$.scripts.push({url:$tag$$1_url$$57$$, text:$text$$17$$, name:$full_name$$76$$, async:$async_attr$$}), "") : 
    "style" == $tag$$1_url$$57$$ ? ($full_name$$76$$ = ($full_name$$76$$ = $async_attr$$.match($spf$nav$response$AttributeRegEx$NAME$$)) ? $full_name$$76$$[1] : "", $result$$4$$.$styles$.push({url:"", text:$text$$17$$, name:$full_name$$76$$}), "") : $full_name$$76$$;
  });
  $html$$ = $html$$.replace($spf$nav$response$ElementRegEx$LINK$$, function($full$$1$$, $attr$$1$$) {
    var $name$$77_rel$$ = $attr$$1$$.match($spf$nav$response$AttributeRegEx$REL$$), $name$$77_rel$$ = $name$$77_rel$$ ? $name$$77_rel$$[1] : "";
    if ("stylesheet" == $name$$77_rel$$) {
      var $name$$77_rel$$ = ($name$$77_rel$$ = $attr$$1$$.match($spf$nav$response$AttributeRegEx$NAME$$)) ? $name$$77_rel$$[1] : "", $url$$58$$ = $attr$$1$$.match($spf$nav$response$AttributeRegEx$HREF$$), $url$$58$$ = $url$$58$$ ? $url$$58$$[1] : "";
      $result$$4$$.$styles$.push({url:$url$$58$$, text:"", name:$name$$77_rel$$});
      return "";
    }
    return "spf-preconnect" == $name$$77_rel$$ && $spf$config$values$$["experimental-preconnect"] ? ($url$$58$$ = ($url$$58$$ = $attr$$1$$.match($spf$nav$response$AttributeRegEx$HREF$$)) ? $url$$58$$[1] : "", $result$$4$$.links.push({url:$url$$58$$, rel:$name$$77_rel$$}), "") : $full$$1$$;
  });
  $result$$4$$.$html$ = $html$$;
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
  if (!(0 >= $result$$7$$.$styles$.length)) {
    for (var $i$$15$$ = 0, $l$$7$$ = $result$$7$$.$styles$.length;$i$$15$$ < $l$$7$$;$i$$15$$++) {
      var $item$$2$$ = $result$$7$$.$styles$[$i$$15$$];
      $item$$2$$.url ? $item$$2$$.name ? $spf$net$style$load$$($item$$2$$.url, $item$$2$$.name) : $spf$net$style$get$$($item$$2$$.url) : $item$$2$$.text && ($item$$2$$.name ? $spf$net$resource$eval$$($spf$net$resource$Type$CSS$$, $item$$2$$.text, $item$$2$$.name) : $spf$net$resource$exec$$($spf$net$resource$Type$CSS$$, $item$$2$$.text));
    }
  }
}
function $spf$nav$response$preinstallStyles_$$($result$$8_urls$$4$$) {
  0 >= $result$$8_urls$$4$$.$styles$.length || ($result$$8_urls$$4$$ = $spf$array$map$$($result$$8_urls$$4$$.$styles$, function($item$$3$$) {
    return $item$$3$$.url;
  }), $spf$net$style$prefetch$$($result$$8_urls$$4$$));
}
function $spf$nav$response$preinstallLinks_$$($result$$10_urls$$5$$) {
  0 >= $result$$10_urls$$5$$.links.length || ($result$$10_urls$$5$$ = $spf$array$map$$($result$$10_urls$$5$$.links, function($item$$4$$) {
    return "spf-preconnect" == $item$$4$$.rel ? $item$$4$$.url : "";
  }), $spf$net$connect$preconnect$$($result$$10_urls$$5$$));
}
function $spf$nav$response$Extraction_$$() {
  this.$html$ = "";
  this.scripts = [];
  this.$styles$ = [];
  this.links = [];
}
var $spf$nav$response$CAN_ANIMATE_$$ = function() {
  var $testEl$$ = document.createElement("div");
  if ("transition" in $testEl$$.style) {
    return!0;
  }
  for (var $prefixes$$ = ["webkit", "Moz", "Ms", "O", "Khtml"], $i$$16$$ = 0, $l$$8$$ = $prefixes$$.length;$i$$16$$ < $l$$8$$;$i$$16$$++) {
    if ($prefixes$$[$i$$16$$] + "Transition" in $testEl$$.style) {
      return!0;
    }
  }
  return!1;
}(), $spf$nav$response$ElementRegEx$LINK$$ = /\x3clink([\s\S]*?)\x3e/ig, $spf$nav$response$ElementRegEx$SCRIPT_STYLE$$ = /\x3c(script|style)([\s\S]*?)\x3e([\s\S]*?)\x3c\/\1\x3e/ig, $spf$nav$response$AttributeRegEx$ASYNC$$ = /(?:\s|^)async(?:\s|=|$)/i, $spf$nav$response$AttributeRegEx$HREF$$ = /(?:\s|^)href\s*=\s*["']?([^\s"']+)/i, $spf$nav$response$AttributeRegEx$NAME$$ = /(?:\s|^)name\s*=\s*["']?([^\s"']+)/i, $spf$nav$response$AttributeRegEx$REL$$ = /(?:\s|^)rel\s*=\s*["']?([^\s"']+)/i, $spf$nav$response$AttributeRegEx$SRC$$ = 
/(?:\s|^)src\s*=\s*["']?([^\s"']+)/i, $spf$nav$response$Token$BEGIN$$ = "[\r\n", $spf$nav$response$Token$DELIMITER$$ = ",\r\n", $spf$nav$response$Token$END$$ = "]\r\n";
function $spf$nav$request$send$$($url$$59$$, $opt_options$$17$$) {
  $spf$debug$debug$$("nav.request.send ", $url$$59$$, $opt_options$$17$$);
  var $options$$4$$ = $opt_options$$17$$ || {};
  $options$$4$$.method = (($options$$4$$.method || "GET") + "").toUpperCase();
  $options$$4$$.type = $options$$4$$.type || "request";
  var $requestUrl_url$$inline_100$$ = $url$$59$$, $handleComplete_ident$$inline_102_timing$$6_xhrOpts$$ = $spf$config$values$$["url-identifier"] || "";
  if ($handleComplete_ident$$inline_102_timing$$6_xhrOpts$$) {
    var $handleComplete_ident$$inline_102_timing$$6_xhrOpts$$ = $handleComplete_ident$$inline_102_timing$$6_xhrOpts$$.replace("__type__", $options$$4$$.type || ""), $cached_headers_keys$$inline_107_result$$inline_103$$ = $spf$string$partition$$($requestUrl_url$$inline_100$$), $requestUrl_url$$inline_100$$ = $cached_headers_keys$$inline_107_result$$inline_103$$[0];
    0 == $handleComplete_ident$$inline_102_timing$$6_xhrOpts$$.lastIndexOf("?", 0) && -1 != $requestUrl_url$$inline_100$$.indexOf("?") && ($handleComplete_ident$$inline_102_timing$$6_xhrOpts$$ = $handleComplete_ident$$inline_102_timing$$6_xhrOpts$$.replace("?", "&"));
    $requestUrl_url$$inline_100$$ += $handleComplete_ident$$inline_102_timing$$6_xhrOpts$$ + $cached_headers_keys$$inline_107_result$$inline_103$$[1] + $cached_headers_keys$$inline_107_result$$inline_103$$[2];
  }
  $requestUrl_url$$inline_100$$ = $spf$url$absolute$$($requestUrl_url$$inline_100$$);
  $spf$debug$debug$$("    request url ", $requestUrl_url$$inline_100$$);
  $handleComplete_ident$$inline_102_timing$$6_xhrOpts$$ = {};
  $handleComplete_ident$$inline_102_timing$$6_xhrOpts$$.spfUrl = $requestUrl_url$$inline_100$$;
  $handleComplete_ident$$inline_102_timing$$6_xhrOpts$$.startTime = $spf$now$$();
  $handleComplete_ident$$inline_102_timing$$6_xhrOpts$$.fetchStart = $handleComplete_ident$$inline_102_timing$$6_xhrOpts$$.startTime;
  a: {
    var $cacheKey$$inline_105_chunking_headerId_i$$inline_108$$ = $spf$nav$request$getCacheKey_$$($url$$59$$, $options$$4$$.current, null, $options$$4$$.type, !1), $l$$inline_109_opt_current$$inline_106$$ = $options$$4$$.current, $cached_headers_keys$$inline_107_result$$inline_103$$ = [];
    $l$$inline_109_opt_current$$inline_106$$ && ($cached_headers_keys$$inline_107_result$$inline_103$$.push($cacheKey$$inline_105_chunking_headerId_i$$inline_108$$ + " previous " + $l$$inline_109_opt_current$$inline_106$$), $cached_headers_keys$$inline_107_result$$inline_103$$.push($cacheKey$$inline_105_chunking_headerId_i$$inline_108$$ + " previous " + $spf$url$utils$$($l$$inline_109_opt_current$$inline_106$$).pathname));
    $cached_headers_keys$$inline_107_result$$inline_103$$.push($cacheKey$$inline_105_chunking_headerId_i$$inline_108$$);
    $cacheKey$$inline_105_chunking_headerId_i$$inline_108$$ = 0;
    for ($l$$inline_109_opt_current$$inline_106$$ = $cached_headers_keys$$inline_107_result$$inline_103$$.length;$cacheKey$$inline_105_chunking_headerId_i$$inline_108$$ < $l$$inline_109_opt_current$$inline_106$$;$cacheKey$$inline_105_chunking_headerId_i$$inline_108$$++) {
      var $cached$$inline_110_key$$inline_187$$;
      b: {
        $cached$$inline_110_key$$inline_187$$ = $cached_headers_keys$$inline_107_result$$inline_103$$[$cacheKey$$inline_105_chunking_headerId_i$$inline_108$$];
        var $storage$$inline_188_unit$$inline_189$$ = $spf$cache$storage_$$();
        if ($cached$$inline_110_key$$inline_187$$ in $storage$$inline_188_unit$$inline_189$$) {
          $storage$$inline_188_unit$$inline_189$$ = $storage$$inline_188_unit$$inline_189$$[$cached$$inline_110_key$$inline_187$$];
          if ($spf$cache$valid_$$($storage$$inline_188_unit$$inline_189$$)) {
            $spf$cache$updateCount_$$($storage$$inline_188_unit$$inline_189$$);
            $cached$$inline_110_key$$inline_187$$ = $storage$$inline_188_unit$$inline_189$$.data;
            break b;
          }
          $spf$cache$remove$$($cached$$inline_110_key$$inline_187$$);
        }
        $cached$$inline_110_key$$inline_187$$ = void 0;
      }
      if ($cached$$inline_110_key$$inline_187$$) {
        $cached_headers_keys$$inline_107_result$$inline_103$$ = {key:$cached_headers_keys$$inline_107_result$$inline_103$$[$cacheKey$$inline_105_chunking_headerId_i$$inline_108$$], response:$cached$$inline_110_key$$inline_187$$.response, type:$cached$$inline_110_key$$inline_187$$.type};
        break a;
      }
    }
    $cached_headers_keys$$inline_107_result$$inline_103$$ = null;
  }
  $handleComplete_ident$$inline_102_timing$$6_xhrOpts$$.spfPrefetched = !!$cached_headers_keys$$inline_107_result$$inline_103$$ && "prefetch" == $cached_headers_keys$$inline_107_result$$inline_103$$.type;
  $handleComplete_ident$$inline_102_timing$$6_xhrOpts$$.spfCached = !!$cached_headers_keys$$inline_107_result$$inline_103$$;
  if ($cached_headers_keys$$inline_107_result$$inline_103$$) {
    return setTimeout($spf$bind$$($spf$nav$request$handleResponseFromCache_$$, null, $url$$59$$, $options$$4$$, $handleComplete_ident$$inline_102_timing$$6_xhrOpts$$, $cached_headers_keys$$inline_107_result$$inline_103$$.key, $cached_headers_keys$$inline_107_result$$inline_103$$.response), 0), null;
  }
  $spf$debug$debug$$("    sending XHR");
  $cached_headers_keys$$inline_107_result$$inline_103$$ = {};
  void 0 != $options$$4$$.$referer$ && ($cached_headers_keys$$inline_107_result$$inline_103$$["X-SPF-Referer"] = $options$$4$$.$referer$);
  $options$$4$$.current && ($cached_headers_keys$$inline_107_result$$inline_103$$["X-SPF-Previous"] = $options$$4$$.current);
  if ($cacheKey$$inline_105_chunking_headerId_i$$inline_108$$ = $spf$config$values$$["advanced-header-identifier"]) {
    $cached_headers_keys$$inline_107_result$$inline_103$$["X-SPF-Request"] = $cacheKey$$inline_105_chunking_headerId_i$$inline_108$$.replace("__type__", $options$$4$$.type), $cached_headers_keys$$inline_107_result$$inline_103$$.Accept = "application/json";
  }
  $cacheKey$$inline_105_chunking_headerId_i$$inline_108$$ = {$multipart$:!1, $extra$:"", complete:[]};
  $handleComplete_ident$$inline_102_timing$$6_xhrOpts$$ = $spf$bind$$($spf$nav$request$handleCompleteFromXHR_$$, null, $url$$59$$, $options$$4$$, $handleComplete_ident$$inline_102_timing$$6_xhrOpts$$, $cacheKey$$inline_105_chunking_headerId_i$$inline_108$$);
  $handleComplete_ident$$inline_102_timing$$6_xhrOpts$$ = {headers:$cached_headers_keys$$inline_107_result$$inline_103$$, $timeoutMs$:$spf$config$values$$["request-timeout"], $onHeaders$:$spf$bind$$($spf$nav$request$handleHeadersFromXHR_$$, null, $url$$59$$, $cacheKey$$inline_105_chunking_headerId_i$$inline_108$$), $onChunk$:$spf$bind$$($spf$nav$request$handleChunkFromXHR_$$, null, $url$$59$$, $options$$4$$, $cacheKey$$inline_105_chunking_headerId_i$$inline_108$$), $onDone$:$handleComplete_ident$$inline_102_timing$$6_xhrOpts$$, 
  $onTimeout$:$handleComplete_ident$$inline_102_timing$$6_xhrOpts$$};
  return "POST" == $options$$4$$.method ? $spf$net$xhr$send$$("POST", $requestUrl_url$$inline_100$$, $options$$4$$.$postData$, $handleComplete_ident$$inline_102_timing$$6_xhrOpts$$) : $spf$net$xhr$send$$("GET", $requestUrl_url$$inline_100$$, null, $handleComplete_ident$$inline_102_timing$$6_xhrOpts$$);
}
function $spf$nav$request$handleResponseFromCache_$$($url$$60$$, $options$$5$$, $timing$$7$$, $cacheKey$$1_parts$$2$$, $response$$4$$) {
  $spf$debug$debug$$("nav.request.handleResponseFromCache_ ", $url$$60$$, $response$$4$$);
  var $updateCache$$ = !1;
  $timing$$7$$.responseStart = $timing$$7$$.responseEnd = $spf$now$$();
  $options$$5$$.type && 0 == $options$$5$$.type.lastIndexOf("navigate", 0) && ($timing$$7$$.navigationStart = $timing$$7$$.startTime, $spf$config$values$$["cache-unified"] || ($spf$cache$remove$$($cacheKey$$1_parts$$2$$), $updateCache$$ = !0));
  if ($options$$5$$.$onPart$ && "multipart" == $response$$4$$.type) {
    $cacheKey$$1_parts$$2$$ = $response$$4$$.parts;
    for (var $i$$17$$ = 0;$i$$17$$ < $cacheKey$$1_parts$$2$$.length;$i$$17$$++) {
      $options$$5$$.$onPart$($url$$60$$, $cacheKey$$1_parts$$2$$[$i$$17$$]);
    }
  }
  $spf$nav$request$done_$$($url$$60$$, $options$$5$$, $timing$$7$$, $response$$4$$, $updateCache$$);
}
function $spf$nav$request$handleHeadersFromXHR_$$($multipart_url$$61$$, $chunking$$1$$, $xhr$$2$$) {
  $spf$debug$debug$$("nav.request.handleHeadersFromXHR_ ", $multipart_url$$61$$, $xhr$$2$$);
  $multipart_url$$61$$ = -1 != ($xhr$$2$$.getResponseHeader("X-SPF-Response-Type") || "").toLowerCase().indexOf("multipart");
  $spf$debug$debug$$("    response is", ($multipart_url$$61$$ ? "" : "non-") + "multipart");
  $chunking$$1$$.$multipart$ = $multipart_url$$61$$;
}
function $spf$nav$request$handleChunkFromXHR_$$($url$$62$$, $options$$6$$, $chunking$$2$$, $i$$18_xhr$$3$$, $chunk$$2_text$$18$$, $opt_lastDitch$$1$$) {
  $spf$debug$debug$$("nav.request.handleChunkFromXHR_ ", $url$$62$$, {extra:$chunking$$2$$.$extra$, chunk:$chunk$$2_text$$18$$});
  if ($chunking$$2$$.$multipart$) {
    $chunk$$2_text$$18$$ = $chunking$$2$$.$extra$ + $chunk$$2_text$$18$$;
    var $parsed$$;
    try {
      $parsed$$ = $spf$nav$response$parse$$($chunk$$2_text$$18$$, !0, $opt_lastDitch$$1$$);
    } catch ($err$$2$$) {
      $spf$debug$debug$$("    JSON parse failed", $chunk$$2_text$$18$$);
      $i$$18_xhr$$3$$.abort();
      $options$$6$$.$onError$ && $options$$6$$.$onError$($url$$62$$, $err$$2$$);
      return;
    }
    if ($options$$6$$.$onPart$) {
      for ($i$$18_xhr$$3$$ = 0;$i$$18_xhr$$3$$ < $parsed$$.$parts$.length;$i$$18_xhr$$3$$++) {
        $spf$debug$debug$$("    parsed part", $parsed$$.$parts$[$i$$18_xhr$$3$$]), $options$$6$$.$onPart$($url$$62$$, $parsed$$.$parts$[$i$$18_xhr$$3$$]);
      }
    }
    $chunking$$2$$.complete = $chunking$$2$$.complete.concat($parsed$$.$parts$);
    $chunking$$2$$.$extra$ = $parsed$$.$extra$;
  } else {
    $spf$debug$debug$$("    skipping non-multipart response");
  }
}
function $spf$nav$request$handleCompleteFromXHR_$$($url$$63$$, $options$$7$$, $timing$$8$$, $chunking$$3_i$$19$$, $l$$9_xhr$$4$$) {
  $spf$debug$debug$$("nav.request.handleCompleteFromXHR_ ", $url$$63$$, {extra:$chunking$$3_i$$19$$.$extra$, complete:$l$$9_xhr$$4$$.responseText});
  if ($l$$9_xhr$$4$$.timing) {
    for (var $navigationStart_t$$ in $l$$9_xhr$$4$$.timing) {
      $timing$$8$$[$navigationStart_t$$] = $l$$9_xhr$$4$$.timing[$navigationStart_t$$];
    }
  }
  if ($l$$9_xhr$$4$$.resourceTiming) {
    if ("load" == $options$$7$$.type) {
      for (var $key$$49_value$$43$$ in $l$$9_xhr$$4$$.resourceTiming) {
        $timing$$8$$[$key$$49_value$$43$$] = $l$$9_xhr$$4$$.resourceTiming[$key$$49_value$$43$$];
      }
    } else {
      if (window.performance && window.performance.timing) {
        $navigationStart_t$$ = window.performance.timing.navigationStart;
        for (var $metric_part$$ in $l$$9_xhr$$4$$.resourceTiming) {
          $key$$49_value$$43$$ = $l$$9_xhr$$4$$.resourceTiming[$metric_part$$], void 0 !== $key$$49_value$$43$$ && ($spf$string$endsWith$$($metric_part$$, "Start") || $spf$string$endsWith$$($metric_part$$, "End") || "startTime" == $metric_part$$) && ($timing$$8$$[$metric_part$$] = $navigationStart_t$$ + Math.round($key$$49_value$$43$$));
        }
      }
    }
  }
  "load" != $options$$7$$.type && ($timing$$8$$.navigationStart = $timing$$8$$.startTime);
  $chunking$$3_i$$19$$.complete.length && ($chunking$$3_i$$19$$.$extra$ = $spf$string$trim$$($chunking$$3_i$$19$$.$extra$), $chunking$$3_i$$19$$.$extra$ && $spf$nav$request$handleChunkFromXHR_$$($url$$63$$, $options$$7$$, $chunking$$3_i$$19$$, $l$$9_xhr$$4$$, "", !0));
  var $parts$$3_response$$5$$;
  try {
    $parts$$3_response$$5$$ = $spf$nav$response$parse$$($l$$9_xhr$$4$$.responseText).$parts$;
  } catch ($err$$3$$) {
    $spf$debug$debug$$("    JSON parse failed");
    $options$$7$$.$onError$ && $options$$7$$.$onError$($url$$63$$, $err$$3$$);
    return;
  }
  if ($options$$7$$.$onPart$ && 1 < $parts$$3_response$$5$$.length) {
    for ($chunking$$3_i$$19$$ = $chunking$$3_i$$19$$.complete.length;$chunking$$3_i$$19$$ < $parts$$3_response$$5$$.length;$chunking$$3_i$$19$$++) {
      $spf$debug$debug$$("    parsed part", $parts$$3_response$$5$$[$chunking$$3_i$$19$$]), $options$$7$$.$onPart$($url$$63$$, $parts$$3_response$$5$$[$chunking$$3_i$$19$$]);
    }
  }
  if (1 < $parts$$3_response$$5$$.length) {
    var $cacheType$$;
    $chunking$$3_i$$19$$ = 0;
    for ($l$$9_xhr$$4$$ = $parts$$3_response$$5$$.length;$chunking$$3_i$$19$$ < $l$$9_xhr$$4$$;$chunking$$3_i$$19$$++) {
      $metric_part$$ = $parts$$3_response$$5$$[$chunking$$3_i$$19$$], $metric_part$$.cacheType && ($cacheType$$ = $metric_part$$.cacheType);
    }
    $parts$$3_response$$5$$ = {parts:$parts$$3_response$$5$$, type:"multipart"};
    $cacheType$$ && ($parts$$3_response$$5$$.cacheType = $cacheType$$);
  } else {
    $parts$$3_response$$5$$ = 1 == $parts$$3_response$$5$$.length ? $parts$$3_response$$5$$[0] : {};
  }
  $spf$nav$request$done_$$($url$$63$$, $options$$7$$, $timing$$8$$, $parts$$3_response$$5$$, !0);
}
function $spf$nav$request$done_$$($url$$64$$, $options$$8$$, $timing$$9$$, $response$$6$$, $cache_cacheKey$$2$$) {
  $spf$debug$debug$$("nav.request.done_", $url$$64$$, $options$$8$$, $timing$$9$$, $response$$6$$, $cache_cacheKey$$2$$);
  if ($cache_cacheKey$$2$$ && "POST" != $options$$8$$.method && ($cache_cacheKey$$2$$ = $spf$nav$request$getCacheKey_$$($url$$64$$, $options$$8$$.current, $response$$6$$.cacheType, $options$$8$$.type, !0))) {
    $response$$6$$.cacheKey = $cache_cacheKey$$2$$;
    var $data$$inline_192_unit$$inline_196$$ = {response:$response$$6$$, type:$options$$8$$.type || ""}, $lifetime$$inline_193$$ = parseInt($spf$config$values$$["cache-lifetime"], 10), $JSCompiler_temp_const$$inline_195_max$$inline_194$$ = parseInt($spf$config$values$$["cache-max"], 10);
    0 >= $lifetime$$inline_193$$ || 0 >= $JSCompiler_temp_const$$inline_195_max$$inline_194$$ || ($JSCompiler_temp_const$$inline_195_max$$inline_194$$ = $spf$cache$storage_$$(), $data$$inline_192_unit$$inline_196$$ = {data:$data$$inline_192_unit$$inline_196$$, life:$lifetime$$inline_193$$, time:$spf$now$$(), count:0}, $spf$cache$updateCount_$$($data$$inline_192_unit$$inline_196$$), $JSCompiler_temp_const$$inline_195_max$$inline_194$$[$cache_cacheKey$$2$$] = $data$$inline_192_unit$$inline_196$$, setTimeout($spf$cache$collect$$, 
    1E3));
  }
  $response$$6$$.timing = $timing$$9$$;
  $options$$8$$.$onSuccess$ && $options$$8$$.$onSuccess$($url$$64$$, $response$$6$$);
}
function $spf$nav$request$getCacheKey_$$($absoluteUrl_url$$65$$, $opt_current$$, $opt_cacheType$$, $opt_requestType$$, $opt_set$$) {
  $absoluteUrl_url$$65$$ = $spf$url$absolute$$($absoluteUrl_url$$65$$);
  var $cacheKey$$3$$;
  $spf$config$values$$["cache-unified"] ? $cacheKey$$3$$ = $absoluteUrl_url$$65$$ : "navigate-back" == $opt_requestType$$ || "navigate-forward" == $opt_requestType$$ ? $cacheKey$$3$$ = "history " + $absoluteUrl_url$$65$$ : "navigate" == $opt_requestType$$ ? $cacheKey$$3$$ = ($opt_set$$ ? "history " : "prefetch ") + $absoluteUrl_url$$65$$ : "prefetch" == $opt_requestType$$ && ($cacheKey$$3$$ = $opt_set$$ ? "prefetch " + $absoluteUrl_url$$65$$ : "");
  $opt_current$$ && "url" == $opt_cacheType$$ ? $cacheKey$$3$$ += " previous " + $opt_current$$ : $opt_current$$ && "path" == $opt_cacheType$$ && ($cacheKey$$3$$ += " previous " + $spf$url$utils$$($opt_current$$).pathname);
  return $cacheKey$$3$$ || "";
}
;function $spf$nav$getAncestorWithLinkClass_$$($element$$8$$) {
  return $spf$dom$getAncestor$$($element$$8$$, function($node$$6$$) {
    return $spf$dom$classlist$contains$$($node$$6$$, $spf$config$values$$["link-class"]);
  });
}
function $spf$nav$getAncestorWithNoLinkClass_$$($element$$9$$) {
  return $spf$dom$getAncestor$$($element$$9$$, function($node$$7$$) {
    return $spf$dom$classlist$contains$$($node$$7$$, $spf$config$values$$["nolink-class"]);
  });
}
function $spf$nav$getAncestorWithHref_$$($element$$10$$, $parent$$4$$) {
  return $spf$dom$getAncestor$$($element$$10$$, function($node$$8$$) {
    return $node$$8$$.href && "img" != $node$$8$$.tagName.toLowerCase();
  }, $parent$$4$$);
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
function $spf$nav$isAllowed_$$($url$$66$$) {
  return $spf$url$utils$$($url$$66$$).origin != $spf$url$utils$$(window.location.href).origin ? ($spf$debug$warn$$("destination not same-origin"), !1) : !0;
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
    var $url$$69$$ = $spf$nav$getEventURL_$$($evt$$26$$);
    $url$$69$$ && $spf$nav$isAllowed_$$($url$$69$$) && $spf$nav$isEligible_$$() && $spf$dispatch$$("spfclick", {url:$url$$69$$, target:$evt$$26$$.target}) && ($spf$nav$navigate_$$($url$$69$$), $evt$$26$$.preventDefault());
  }
}
function $spf$nav$handleMouseDown_$$($evt$$27$$) {
  $spf$debug$debug$$("nav.handleMouseDown ", "evt=", $evt$$27$$);
  var $url$$70$$ = $spf$nav$getEventURL_$$($evt$$27$$);
  $url$$70$$ && setTimeout(function() {
    $spf$nav$prefetch_$$($url$$70$$, void 0);
  }, 0);
}
function $spf$nav$handleHistory_$$($url$$71$$, $opt_state$$3$$) {
  var $reverse$$ = !(!$opt_state$$3$$ || !$opt_state$$3$$["spf-back"]), $referer$$ = $opt_state$$3$$ && $opt_state$$3$$["spf-referer"], $current$$3$$ = $opt_state$$3$$ && $opt_state$$3$$["spf-current"];
  $spf$debug$debug$$("nav.handleHistory ", "(url=", $url$$71$$, "state=", $opt_state$$3$$, ")");
  var $reloadId$$ = $spf$config$values$$["reload-identifier"];
  $reloadId$$ && ($url$$71$$ = $spf$url$removeParameters$$($url$$71$$, [$reloadId$$]));
  $spf$nav$isAllowed_$$($url$$71$$) ? $spf$nav$isEligible_$$() ? $spf$dispatch$$("spfhistory", {url:$url$$71$$, referer:$referer$$, previous:$current$$3$$}) && $spf$nav$navigate_$$($url$$71$$, null, $current$$3$$, $referer$$, !0, $reverse$$) : $spf$nav$reload$$($url$$71$$, $spf$nav$ReloadReason$INELIGIBLE$$) : $spf$nav$reload$$($url$$71$$, $spf$nav$ReloadReason$FORBIDDEN$$);
}
function $spf$nav$navigate_$$($url$$73$$, $opt_options$$19_options$$9_xhr$$inline_144$$, $current$$4_history$$inline_131_opt_current$$3$$, $opt_referer_referer$$1$$, $history$$inline_139_opt_history_promoteKey$$inline_133$$, $handleError$$inline_141_opt_reverse$$1_preprocessKey$$inline_132$$) {
  $spf$debug$info$$("nav.navigate_ ", $url$$73$$, $opt_options$$19_options$$9_xhr$$inline_144$$, $current$$4_history$$inline_131_opt_current$$3$$, $opt_referer_referer$$1$$, $history$$inline_139_opt_history_promoteKey$$inline_133$$, $handleError$$inline_141_opt_reverse$$1_preprocessKey$$inline_132$$);
  $spf$nav$cancel$$();
  $opt_options$$19_options$$9_xhr$$inline_144$$ = $opt_options$$19_options$$9_xhr$$inline_144$$ || {};
  $opt_referer_referer$$1$$ = void 0 == $opt_referer_referer$$1$$ ? window.location.href : $opt_referer_referer$$1$$;
  $current$$4_history$$inline_131_opt_current$$3$$ = $history$$inline_139_opt_history_promoteKey$$inline_133$$ ? $current$$4_history$$inline_131_opt_current$$3$$ : window.location.href;
  var $JSCompiler_inline_result$$15_absoluteUrl$$2_absoluteUrl$$inline_121_handlePart$$inline_142$$;
  a: {
    if (-1 != $url$$73$$.indexOf("#") && ($JSCompiler_inline_result$$15_absoluteUrl$$2_absoluteUrl$$inline_121_handlePart$$inline_142$$ = $spf$url$absolute$$($url$$73$$), $spf$string$partition$$($current$$4_history$$inline_131_opt_current$$3$$ || window.location.href)[0] == $JSCompiler_inline_result$$15_absoluteUrl$$2_absoluteUrl$$inline_121_handlePart$$inline_142$$)) {
      $spf$debug$debug$$("    not handling hash-only URL");
      $JSCompiler_inline_result$$15_absoluteUrl$$2_absoluteUrl$$inline_121_handlePart$$inline_142$$ = !1;
      break a;
    }
    $JSCompiler_inline_result$$15_absoluteUrl$$2_absoluteUrl$$inline_121_handlePart$$inline_142$$ = !0;
  }
  if ($JSCompiler_inline_result$$15_absoluteUrl$$2_absoluteUrl$$inline_121_handlePart$$inline_142$$) {
    if ($spf$nav$dispatchRequest_$$($url$$73$$, $opt_referer_referer$$1$$, $current$$4_history$$inline_131_opt_current$$3$$, $opt_options$$19_options$$9_xhr$$inline_144$$)) {
      $spf$state$set$$("nav-counter", (parseInt($spf$state$values_$$["nav-counter"], 10) || 0) + 1);
      $spf$nav$cancelAllPrefetchesExcept$$($url$$73$$);
      $JSCompiler_inline_result$$15_absoluteUrl$$2_absoluteUrl$$inline_121_handlePart$$inline_142$$ = $spf$url$absolute$$($url$$73$$);
      var $handleSuccess$$inline_143_opt_skipKey$$inline_123$$ = "preprocess " + $spf$url$absolute$$($JSCompiler_inline_result$$15_absoluteUrl$$2_absoluteUrl$$inline_121_handlePart$$inline_142$$), $key$$inline_126_prefetchXhr_reverse$$inline_140$$;
      for ($key$$inline_126_prefetchXhr_reverse$$inline_140$$ in $spf$tasks$queues_$$) {
        $handleSuccess$$inline_143_opt_skipKey$$inline_123$$ != $key$$inline_126_prefetchXhr_reverse$$inline_140$$ && 0 == $key$$inline_126_prefetchXhr_reverse$$inline_140$$.lastIndexOf("preprocess", 0) && $spf$tasks$cancel$$($key$$inline_126_prefetchXhr_reverse$$inline_140$$);
      }
      $key$$inline_126_prefetchXhr_reverse$$inline_140$$ = $spf$nav$prefetches_$$()[$JSCompiler_inline_result$$15_absoluteUrl$$2_absoluteUrl$$inline_121_handlePart$$inline_142$$];
      $spf$state$set$$("nav-request", $key$$inline_126_prefetchXhr_reverse$$inline_140$$);
      $spf$state$set$$("nav-promote", null);
      $spf$state$set$$("nav-promote-time", null);
      $key$$inline_126_prefetchXhr_reverse$$inline_140$$ && 4 != $key$$inline_126_prefetchXhr_reverse$$inline_140$$.readyState ? ($current$$4_history$$inline_131_opt_current$$3$$ = !!$history$$inline_139_opt_history_promoteKey$$inline_133$$, $spf$debug$debug$$("nav.navigatePromotePrefetch_ ", $url$$73$$), $handleError$$inline_141_opt_reverse$$1_preprocessKey$$inline_132$$ = "preprocess " + $spf$url$absolute$$($url$$73$$), $history$$inline_139_opt_history_promoteKey$$inline_133$$ = "promote " + $spf$url$absolute$$($url$$73$$), 
      $spf$state$set$$("nav-promote", $url$$73$$), $spf$state$set$$("nav-promote-time", $spf$now$$()), $spf$tasks$cancel$$($handleError$$inline_141_opt_reverse$$1_preprocessKey$$inline_132$$), $spf$tasks$run$$($history$$inline_139_opt_history_promoteKey$$inline_133$$, !0), $current$$4_history$$inline_131_opt_current$$3$$ || $spf$nav$navigateAddHistory_$$($url$$73$$, $opt_referer_referer$$1$$, $spf$bind$$($spf$nav$handleNavigateError_$$, null, $opt_options$$19_options$$9_xhr$$inline_144$$))) : ($history$$inline_139_opt_history_promoteKey$$inline_133$$ = 
      !!$history$$inline_139_opt_history_promoteKey$$inline_133$$, $key$$inline_126_prefetchXhr_reverse$$inline_140$$ = !!$handleError$$inline_141_opt_reverse$$1_preprocessKey$$inline_132$$, $handleError$$inline_141_opt_reverse$$1_preprocessKey$$inline_132$$ = $spf$bind$$($spf$nav$handleNavigateError_$$, null, $opt_options$$19_options$$9_xhr$$inline_144$$), $JSCompiler_inline_result$$15_absoluteUrl$$2_absoluteUrl$$inline_121_handlePart$$inline_142$$ = $spf$bind$$($spf$nav$handleNavigatePart_$$, null, 
      $opt_options$$19_options$$9_xhr$$inline_144$$, $key$$inline_126_prefetchXhr_reverse$$inline_140$$), $handleSuccess$$inline_143_opt_skipKey$$inline_123$$ = $spf$bind$$($spf$nav$handleNavigateSuccess_$$, null, $opt_options$$19_options$$9_xhr$$inline_144$$, $key$$inline_126_prefetchXhr_reverse$$inline_140$$, ""), $spf$config$values$$["advanced-navigate-persist-timing"] || $spf$nav$clearResourceTimings_$$(), $opt_options$$19_options$$9_xhr$$inline_144$$ = $spf$nav$request$send$$($url$$73$$, {method:$opt_options$$19_options$$9_xhr$$inline_144$$.method, 
      $onPart$:$JSCompiler_inline_result$$15_absoluteUrl$$2_absoluteUrl$$inline_121_handlePart$$inline_142$$, $onError$:$handleError$$inline_141_opt_reverse$$1_preprocessKey$$inline_132$$, $onSuccess$:$handleSuccess$$inline_143_opt_skipKey$$inline_123$$, $postData$:$opt_options$$19_options$$9_xhr$$inline_144$$.postData, type:"navigate" + ($history$$inline_139_opt_history_promoteKey$$inline_133$$ ? $key$$inline_126_prefetchXhr_reverse$$inline_140$$ ? "-back" : "-forward" : ""), current:$current$$4_history$$inline_131_opt_current$$3$$, 
      $referer$:$opt_referer_referer$$1$$}), $spf$state$set$$("nav-request", $opt_options$$19_options$$9_xhr$$inline_144$$), $history$$inline_139_opt_history_promoteKey$$inline_133$$ || $spf$nav$navigateAddHistory_$$($url$$73$$, $opt_referer_referer$$1$$, $handleError$$inline_141_opt_reverse$$1_preprocessKey$$inline_132$$));
    } else {
      $spf$nav$reload$$($url$$73$$, $spf$nav$ReloadReason$REQUEST_CANCELED$$);
    }
  } else {
    $spf$nav$navigateScroll_$$($url$$73$$), $history$$inline_139_opt_history_promoteKey$$inline_133$$ || $spf$nav$navigateAddHistory_$$($url$$73$$, $opt_referer_referer$$1$$, $spf$bind$$($spf$nav$handleNavigateError_$$, null, $opt_options$$19_options$$9_xhr$$inline_144$$));
  }
}
function $spf$nav$navigateScroll_$$($result$$11_url$$76$$) {
  $result$$11_url$$76$$ = $spf$string$partition$$($result$$11_url$$76$$);
  if ($result$$11_url$$76$$[1]) {
    if ($result$$11_url$$76$$[2]) {
      var $el$$14$$ = document.getElementById($result$$11_url$$76$$[2]);
      $el$$14$$ && ($spf$debug$debug$$("    scrolling into view", $result$$11_url$$76$$[2]), $el$$14$$.scrollIntoView());
    } else {
      $spf$debug$debug$$("    scrolling to top"), window.scroll(0, 0);
    }
  }
}
function $spf$nav$navigateAddHistory_$$($url$$77$$, $referer$$4_state$$2$$, $handleError$$3$$) {
  try {
    $referer$$4_state$$2$$ = {"spf-referer":$referer$$4_state$$2$$}, $spf$url$absolute$$($url$$77$$, !0) == window.location.href ? $spf$history$replace$$($url$$77$$, null, !1, !0) : ($spf$debug$info$$("history.add ", $url$$77$$), $spf$history$push_$$(!1, $url$$77$$, $referer$$4_state$$2$$, void 0));
  } catch ($err$$4$$) {
    $spf$nav$cancel$$(), $spf$debug$error$$("error caught, redirecting ", "(url=", $url$$77$$, "err=", $err$$4$$, ")"), $handleError$$3$$($url$$77$$, $err$$4$$);
  }
}
function $spf$nav$handleNavigateError_$$($options$$12$$, $url$$78$$, $err$$5$$) {
  $spf$debug$warn$$("navigate error", "(url=", $url$$78$$, ")");
  $spf$state$set$$("nav-request", null);
  $spf$nav$dispatchError_$$($url$$78$$, $err$$5$$, $options$$12$$) && $spf$nav$reload$$($url$$78$$, $spf$nav$ReloadReason$ERROR$$, $err$$5$$);
}
function $spf$nav$handleNavigatePart_$$($options$$13$$, $reverse$$3$$, $url$$79$$, $partial$$) {
  if ($spf$nav$dispatchPartProcess_$$($url$$79$$, $partial$$, $options$$13$$)) {
    if ($partial$$.reload) {
      $spf$nav$reload$$($url$$79$$, $spf$nav$ReloadReason$RESPONSE_RECEIVED$$);
    } else {
      if ($partial$$.redirect) {
        $spf$nav$handleNavigateRedirect_$$($options$$13$$, $partial$$.redirect);
      } else {
        try {
          $spf$nav$response$process$$($url$$79$$, $partial$$, function() {
            $spf$nav$dispatchPartDone_$$($url$$79$$, $partial$$, $options$$13$$);
          }, !0, $reverse$$3$$);
        } catch ($err$$6$$) {
          $spf$debug$debug$$("    failed to process part", $partial$$), $spf$nav$handleNavigateError_$$($options$$13$$, $url$$79$$, $err$$6$$);
        }
      }
    }
  } else {
    $spf$nav$reload$$($url$$79$$, $spf$nav$ReloadReason$PART_PROCESS_CANCELED$$);
  }
}
function $spf$nav$handleNavigateSuccess_$$($options$$14$$, $reverse$$4$$, $multipart$$1_original_timing$$10$$, $url$$80$$, $response$$8$$) {
  $spf$state$set$$("nav-request", null);
  $spf$state$values_$$["nav-promote"] == $multipart$$1_original_timing$$10$$ && ($multipart$$1_original_timing$$10$$ = $response$$8$$.timing || {}, $multipart$$1_original_timing$$10$$.navigationStart = $spf$state$values_$$["nav-promote-time"], $multipart$$1_original_timing$$10$$.spfPrefetched = !0);
  $multipart$$1_original_timing$$10$$ = "multipart" == $response$$8$$.type;
  if (!$multipart$$1_original_timing$$10$$) {
    if (!$spf$nav$dispatchProcess_$$($url$$80$$, $response$$8$$, $options$$14$$)) {
      $spf$nav$reload$$($url$$80$$, $spf$nav$ReloadReason$PROCESS_CANCELED$$);
      return;
    }
    if ($response$$8$$.reload) {
      $spf$nav$reload$$($url$$80$$, $spf$nav$ReloadReason$RESPONSE_RECEIVED$$);
      return;
    }
    if ($response$$8$$.redirect) {
      $spf$nav$handleNavigateRedirect_$$($options$$14$$, $response$$8$$.redirect);
      return;
    }
  }
  try {
    $spf$nav$response$process$$($url$$80$$, $multipart$$1_original_timing$$10$$ ? {} : $response$$8$$, function() {
      $spf$nav$navigateScroll_$$($url$$80$$);
      $spf$nav$dispatchDone_$$($url$$80$$, $response$$8$$, $options$$14$$);
    }, !0, $reverse$$4$$);
  } catch ($err$$7$$) {
    $spf$debug$debug$$("    failed to process response", $response$$8$$), $spf$nav$handleNavigateError_$$($options$$14$$, $url$$80$$, $err$$7$$);
  }
}
function $spf$nav$handleNavigateRedirect_$$($options$$15$$, $redirectUrl$$) {
  try {
    $redirectUrl$$ += window.location.hash, $spf$history$replace$$($redirectUrl$$, null, !0, !0);
  } catch ($err$$8$$) {
    $spf$nav$cancel$$(), $spf$debug$error$$("error caught, reloading ", "(url=", $redirectUrl$$, "err=", $err$$8$$, ")"), $spf$nav$handleNavigateError_$$($options$$15$$, $redirectUrl$$, $err$$8$$);
  }
}
function $spf$nav$cancel$$() {
  var $xhr$$6$$ = $spf$state$values_$$["nav-request"];
  $xhr$$6$$ && ($spf$debug$warn$$("aborting previous navigate ", "xhr=", $xhr$$6$$), $xhr$$6$$.abort(), $spf$state$set$$("nav-request", null));
}
function $spf$nav$callback$$($fn$$15$$, $var_args$$35$$) {
  var $args$$4_val$$4$$;
  $fn$$15$$ && ($args$$4_val$$4$$ = Array.prototype.slice.call(arguments), $args$$4_val$$4$$[0] = $fn$$15$$, $args$$4_val$$4$$ = $spf$execute$$.apply(null, $args$$4_val$$4$$), $args$$4_val$$4$$ instanceof Error && $spf$debug$error$$("error in callback (url=", window.location.href, "err=", $args$$4_val$$4$$, ")"));
  return!1 !== $args$$4_val$$4$$;
}
function $spf$nav$reload$$($url$$81$$, $reason$$, $err$$9_opt_err$$) {
  $err$$9_opt_err$$ = $err$$9_opt_err$$ ? $err$$9_opt_err$$.message : "";
  $spf$debug$warn$$("reloading (", "url=", $url$$81$$, "reason=", $reason$$, "error=", $err$$9_opt_err$$, ")");
  $spf$nav$cancel$$();
  $spf$nav$cancelAllPrefetchesExcept$$();
  var $logReason$$ = $reason$$;
  $err$$9_opt_err$$ && ($logReason$$ += " Message: " + $err$$9_opt_err$$);
  $spf$dispatch$$("spfreload", {url:$url$$81$$, reason:$logReason$$});
  $spf$config$values$$["experimental-remove-history"] && window.location.href == $url$$81$$ && ($spf$state$set$$("history-ignore-pop", !0), window.history.back());
  setTimeout(function() {
    var $reloadId$$1_url$$inline_154$$ = $spf$config$values$$["reload-identifier"];
    if ($reloadId$$1_url$$inline_154$$) {
      var $params$$ = {};
      $params$$[$reloadId$$1_url$$inline_154$$] = encodeURIComponent($reason$$);
      var $reloadId$$1_url$$inline_154$$ = $url$$81$$, $result$$inline_156$$ = $spf$string$partition$$($reloadId$$1_url$$inline_154$$), $reloadId$$1_url$$inline_154$$ = $result$$inline_156$$[0], $delim$$inline_157$$ = -1 != $reloadId$$1_url$$inline_154$$.indexOf("?") ? "&" : "?", $key$$inline_158$$;
      for ($key$$inline_158$$ in $params$$) {
        $reloadId$$1_url$$inline_154$$ += $delim$$inline_157$$ + $key$$inline_158$$, $params$$[$key$$inline_158$$] && ($reloadId$$1_url$$inline_154$$ += "=" + $params$$[$key$$inline_158$$]), $delim$$inline_157$$ = "&";
      }
      $url$$81$$ = $reloadId$$1_url$$inline_154$$ + $result$$inline_156$$[1] + $result$$inline_156$$[2];
    }
    window.location.href = $url$$81$$;
  }, 0);
}
function $spf$nav$load_$$($url$$83$$, $opt_options$$21_options$$16$$, $opt_original_original$$1$$) {
  $spf$debug$info$$("nav.load ", $url$$83$$, $opt_options$$21_options$$16$$, $opt_original_original$$1$$);
  $opt_options$$21_options$$16$$ = $opt_options$$21_options$$16$$ || {};
  $opt_original_original$$1$$ = $opt_original_original$$1$$ || $url$$83$$;
  $spf$nav$dispatchRequest_$$($url$$83$$, void 0, void 0, $opt_options$$21_options$$16$$, !0) && $spf$nav$request$send$$($url$$83$$, {method:$opt_options$$21_options$$16$$.method, $onPart$:$spf$bind$$($spf$nav$handleLoadPart_$$, null, !1, $opt_options$$21_options$$16$$, $opt_original_original$$1$$), $onError$:$spf$bind$$($spf$nav$handleLoadError_$$, null, !1, $opt_options$$21_options$$16$$, $opt_original_original$$1$$), $onSuccess$:$spf$bind$$($spf$nav$handleLoadSuccess_$$, null, !1, $opt_options$$21_options$$16$$, 
  $opt_original_original$$1$$), $postData$:$opt_options$$21_options$$16$$.postData, type:"load"});
}
function $spf$nav$prefetch_$$($absoluteUrl$$inline_162_url$$85$$, $opt_options$$23_options$$17_xhr$$inline_161$$, $opt_original$$1_original$$2$$) {
  $spf$debug$info$$("nav.prefetch ", $absoluteUrl$$inline_162_url$$85$$, $opt_options$$23_options$$17_xhr$$inline_161$$, $opt_original$$1_original$$2$$);
  $opt_options$$23_options$$17_xhr$$inline_161$$ = $opt_options$$23_options$$17_xhr$$inline_161$$ || {};
  $opt_original$$1_original$$2$$ = $opt_original$$1_original$$2$$ || $absoluteUrl$$inline_162_url$$85$$;
  var $current$$6$$ = window.location.href;
  $spf$nav$dispatchRequest_$$($absoluteUrl$$inline_162_url$$85$$, void 0, void 0, $opt_options$$23_options$$17_xhr$$inline_161$$, !0) && ($opt_options$$23_options$$17_xhr$$inline_161$$ = $spf$nav$request$send$$($absoluteUrl$$inline_162_url$$85$$, {method:$opt_options$$23_options$$17_xhr$$inline_161$$.method, $onPart$:$spf$bind$$($spf$nav$handleLoadPart_$$, null, !0, $opt_options$$23_options$$17_xhr$$inline_161$$, $opt_original$$1_original$$2$$), $onError$:$spf$bind$$($spf$nav$handleLoadError_$$, 
  null, !0, $opt_options$$23_options$$17_xhr$$inline_161$$, $opt_original$$1_original$$2$$), $onSuccess$:$spf$bind$$($spf$nav$handleLoadSuccess_$$, null, !0, $opt_options$$23_options$$17_xhr$$inline_161$$, $opt_original$$1_original$$2$$), $postData$:$opt_options$$23_options$$17_xhr$$inline_161$$.postData, type:"prefetch", current:$current$$6$$}), $spf$debug$debug$$("nav.addPrefetch ", $absoluteUrl$$inline_162_url$$85$$, $opt_options$$23_options$$17_xhr$$inline_161$$), $absoluteUrl$$inline_162_url$$85$$ = 
  $spf$url$absolute$$($absoluteUrl$$inline_162_url$$85$$), $spf$nav$prefetches_$$()[$absoluteUrl$$inline_162_url$$85$$] = $opt_options$$23_options$$17_xhr$$inline_161$$);
}
function $spf$nav$handleLoadError_$$($isPrefetch$$, $options$$18$$, $original$$3$$, $url$$86$$, $err$$10$$) {
  $spf$debug$warn$$($isPrefetch$$ ? "prefetch" : "load", "error", "(url=", $url$$86$$, ")");
  $isPrefetch$$ && $spf$nav$removePrefetch$$($url$$86$$);
  $isPrefetch$$ && $spf$state$values_$$["nav-promote"] == $original$$3$$ ? $spf$nav$handleNavigateError_$$($options$$18$$, $url$$86$$, $err$$10$$) : $spf$nav$dispatchError_$$($url$$86$$, $err$$10$$, $options$$18$$, !0);
}
function $spf$nav$handleLoadPart_$$($isPrefetch$$1$$, $options$$19$$, $original$$4$$, $url$$87$$, $partial$$1$$) {
  if ($spf$nav$dispatchPartProcess_$$($url$$87$$, $partial$$1$$, $options$$19$$, !0)) {
    if ($partial$$1$$.reload) {
      if (!$isPrefetch$$1$$) {
        return;
      }
      if ($spf$state$values_$$["nav-promote"] == $original$$4$$) {
        $spf$nav$reload$$($url$$87$$, $spf$nav$ReloadReason$RESPONSE_RECEIVED$$);
        return;
      }
    }
    if ($partial$$1$$.redirect) {
      $spf$nav$handleLoadRedirect_$$($isPrefetch$$1$$, $options$$19$$, $original$$4$$, $partial$$1$$.redirect);
    } else {
      if ($isPrefetch$$1$$) {
        var $fn$$16$$ = $spf$bind$$($spf$nav$handleNavigatePart_$$, null, $options$$19$$, !1, $url$$87$$, $partial$$1$$), $promoteKey$$1$$ = "promote " + $spf$url$absolute$$($original$$4$$);
        $spf$tasks$add$$($promoteKey$$1$$, $fn$$16$$);
        if ($spf$state$values_$$["nav-promote"] == $original$$4$$) {
          $spf$tasks$run$$($promoteKey$$1$$, !0);
          return;
        }
      }
      ($isPrefetch$$1$$ ? $spf$nav$response$preprocess$$ : $spf$nav$response$process$$)($url$$87$$, $partial$$1$$, function() {
        $spf$nav$dispatchPartDone_$$($url$$87$$, $partial$$1$$, $options$$19$$, !0);
      });
    }
  }
}
function $spf$nav$handleLoadSuccess_$$($isPrefetch$$2$$, $options$$20$$, $original$$5$$, $url$$88$$, $response$$9$$) {
  var $multipart$$2$$ = "multipart" == $response$$9$$.type;
  if (!$multipart$$2$$) {
    if (!$spf$nav$dispatchProcess_$$($url$$88$$, $response$$9$$, $options$$20$$, !0)) {
      $spf$nav$reload$$($url$$88$$, $spf$nav$ReloadReason$PROCESS_CANCELED$$);
      return;
    }
    if ($response$$9$$.reload) {
      if (!$isPrefetch$$2$$) {
        return;
      }
      if ($spf$state$values_$$["nav-promote"] == $original$$5$$) {
        $spf$nav$reload$$($url$$88$$, $spf$nav$ReloadReason$RESPONSE_RECEIVED$$);
        return;
      }
    }
    if ($response$$9$$.redirect) {
      $spf$nav$handleLoadRedirect_$$($isPrefetch$$2$$, $options$$20$$, $original$$5$$, $response$$9$$.redirect);
      return;
    }
  }
  var $processFn$$1_promoteKey$$2$$ = "promote " + $spf$url$absolute$$($original$$5$$);
  if ($isPrefetch$$2$$) {
    $spf$nav$removePrefetch$$($url$$88$$);
    if ($spf$state$values_$$["nav-promote"] == $original$$5$$) {
      $spf$tasks$add$$($processFn$$1_promoteKey$$2$$, $spf$bind$$($spf$nav$handleNavigateSuccess_$$, null, $options$$20$$, !1, $original$$5$$, $url$$88$$, $response$$9$$));
      $spf$tasks$run$$($processFn$$1_promoteKey$$2$$, !0);
      return;
    }
    $spf$tasks$cancel$$($processFn$$1_promoteKey$$2$$);
  }
  $processFn$$1_promoteKey$$2$$ = $isPrefetch$$2$$ ? $spf$nav$response$preprocess$$ : $spf$nav$response$process$$;
  try {
    $processFn$$1_promoteKey$$2$$($url$$88$$, $multipart$$2$$ ? {} : $response$$9$$, function() {
      $spf$nav$dispatchDone_$$($url$$88$$, $response$$9$$, $options$$20$$, !0);
    });
  } catch ($err$$11$$) {
    $spf$debug$debug$$("    failed to process response", $response$$9$$), $spf$nav$handleLoadError_$$($isPrefetch$$2$$, $options$$20$$, $original$$5$$, $url$$88$$, $err$$11$$);
  }
}
function $spf$nav$handleLoadRedirect_$$($isPrefetch$$3_redirectFn$$, $options$$21$$, $original$$6$$, $redirectUrl$$1$$) {
  $isPrefetch$$3_redirectFn$$ = $isPrefetch$$3_redirectFn$$ ? $spf$nav$prefetch_$$ : $spf$nav$load_$$;
  var $redirectOpts$$ = {};
  $spf$array$each$$([$spf$nav$Callback$ERROR$$, $spf$nav$Callback$REQUEST$$, $spf$nav$Callback$PART_PROCESS$$, $spf$nav$Callback$PART_DONE$$, $spf$nav$Callback$PROCESS$$, $spf$nav$Callback$DONE$$], function($key$$50$$) {
    $redirectOpts$$[$key$$50$$] = $options$$21$$[$key$$50$$];
  });
  $isPrefetch$$3_redirectFn$$($redirectUrl$$1$$, $redirectOpts$$, $original$$6$$);
}
function $spf$nav$dispatchError_$$($detail$$3_url$$90$$, $err$$12$$, $opt_options$$24_proceed$$, $opt_noEvents$$) {
  $detail$$3_url$$90$$ = {url:$detail$$3_url$$90$$, err:$err$$12$$};
  ($opt_options$$24_proceed$$ = $spf$nav$callback$$(($opt_options$$24_proceed$$ || {})[$spf$nav$Callback$ERROR$$], $detail$$3_url$$90$$)) && !$opt_noEvents$$ && ($opt_options$$24_proceed$$ = $spf$dispatch$$("spferror", $detail$$3_url$$90$$));
  return $opt_options$$24_proceed$$;
}
function $spf$nav$dispatchRequest_$$($detail$$7_url$$94$$, $referer$$5$$, $previous$$2$$, $opt_options$$25_proceed$$1$$, $opt_noEvents$$1$$) {
  $detail$$7_url$$94$$ = {url:$detail$$7_url$$94$$, referer:$referer$$5$$, previous:$previous$$2$$};
  ($opt_options$$25_proceed$$1$$ = $spf$nav$callback$$(($opt_options$$25_proceed$$1$$ || {})[$spf$nav$Callback$REQUEST$$], $detail$$7_url$$94$$)) && !$opt_noEvents$$1$$ && ($opt_options$$25_proceed$$1$$ = $spf$dispatch$$("spfrequest", $detail$$7_url$$94$$));
  return $opt_options$$25_proceed$$1$$;
}
function $spf$nav$dispatchPartProcess_$$($detail$$8_url$$95$$, $partial$$2$$, $opt_options$$26_proceed$$2$$, $opt_noEvents$$2$$) {
  $detail$$8_url$$95$$ = {url:$detail$$8_url$$95$$, part:$partial$$2$$};
  ($opt_options$$26_proceed$$2$$ = $spf$nav$callback$$(($opt_options$$26_proceed$$2$$ || {})[$spf$nav$Callback$PART_PROCESS$$], $detail$$8_url$$95$$)) && !$opt_noEvents$$2$$ && ($opt_options$$26_proceed$$2$$ = $spf$dispatch$$("spfpartprocess", $detail$$8_url$$95$$));
  return $opt_options$$26_proceed$$2$$;
}
function $spf$nav$dispatchPartDone_$$($detail$$9_url$$96$$, $partial$$3$$, $opt_options$$27$$, $opt_noEvents$$3$$) {
  $detail$$9_url$$96$$ = {url:$detail$$9_url$$96$$, part:$partial$$3$$};
  $spf$nav$callback$$(($opt_options$$27$$ || {})[$spf$nav$Callback$PART_DONE$$], $detail$$9_url$$96$$) && !$opt_noEvents$$3$$ && $spf$dispatch$$("spfpartdone", $detail$$9_url$$96$$);
}
function $spf$nav$dispatchProcess_$$($detail$$10_url$$97$$, $response$$11$$, $opt_options$$28_proceed$$4$$, $opt_noEvents$$4$$) {
  $detail$$10_url$$97$$ = {url:$detail$$10_url$$97$$, response:$response$$11$$};
  ($opt_options$$28_proceed$$4$$ = $spf$nav$callback$$(($opt_options$$28_proceed$$4$$ || {})[$spf$nav$Callback$PROCESS$$], $detail$$10_url$$97$$)) && !$opt_noEvents$$4$$ && ($opt_options$$28_proceed$$4$$ = $spf$dispatch$$("spfprocess", $detail$$10_url$$97$$));
  return $opt_options$$28_proceed$$4$$;
}
function $spf$nav$dispatchDone_$$($detail$$11_url$$98$$, $response$$12$$, $opt_options$$29$$, $opt_noEvents$$5$$) {
  $detail$$11_url$$98$$ = {url:$detail$$11_url$$98$$, response:$response$$12$$};
  $spf$nav$callback$$(($opt_options$$29$$ || {})[$spf$nav$Callback$DONE$$], $detail$$11_url$$98$$) && !$opt_noEvents$$5$$ && $spf$dispatch$$("spfdone", $detail$$11_url$$98$$);
}
function $spf$nav$removePrefetch$$($absoluteUrl$$4_url$$102$$) {
  $spf$debug$debug$$("nav.removePrefetch ", $absoluteUrl$$4_url$$102$$);
  $absoluteUrl$$4_url$$102$$ = $spf$url$absolute$$($absoluteUrl$$4_url$$102$$);
  var $prefetches$$2$$ = $spf$nav$prefetches_$$(), $prefetchXhr$$1$$ = $prefetches$$2$$[$absoluteUrl$$4_url$$102$$];
  $prefetchXhr$$1$$ && $prefetchXhr$$1$$.abort();
  delete $prefetches$$2$$[$absoluteUrl$$4_url$$102$$];
}
function $spf$nav$cancelAllPrefetchesExcept$$($absoluteUrl$$5_opt_skipUrl$$) {
  $spf$debug$debug$$("nav.cancelAllPrefetchesExcept", $absoluteUrl$$5_opt_skipUrl$$);
  var $prefetches$$3$$ = $spf$nav$prefetches_$$();
  $absoluteUrl$$5_opt_skipUrl$$ = $absoluteUrl$$5_opt_skipUrl$$ && $spf$url$absolute$$($absoluteUrl$$5_opt_skipUrl$$);
  for (var $key$$51$$ in $prefetches$$3$$) {
    $absoluteUrl$$5_opt_skipUrl$$ != $key$$51$$ && $spf$nav$removePrefetch$$($key$$51$$);
  }
}
var $spf$nav$clearResourceTimings_$$, $clearResourceTimings$$inline_164$$ = window.performance && (window.performance.clearResourceTimings || window.performance.webkitClearResourceTimings || window.performance.mozClearResourceTimings || window.performance.msClearResourceTimings || window.performance.oClearResourceTimings);
$spf$nav$clearResourceTimings_$$ = $clearResourceTimings$$inline_164$$ ? $spf$bind$$($clearResourceTimings$$inline_164$$, window.performance) : $spf$nullFunction$$;
function $spf$nav$prefetches_$$() {
  return "nav-prefetches" in $spf$state$values_$$ ? $spf$state$values_$$["nav-prefetches"] : $spf$state$set$$("nav-prefetches", {});
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
var $spf$main$api_$$ = {init:function($config$$inline_169_opt_config$$1_url$$inline_206$$) {
  var $enable$$ = !("function" != typeof window.history.pushState && !$spf$history$getIframe$$().contentWindow.history.pushState);
  $spf$debug$info$$("main.init ", "enable=", $enable$$);
  $config$$inline_169_opt_config$$1_url$$inline_206$$ = $config$$inline_169_opt_config$$1_url$$inline_206$$ || {};
  for (var $errorCallback$$inline_205_key$$inline_170$$ in $spf$config$defaults$$) {
    $spf$config$values$$[$errorCallback$$inline_205_key$$inline_170$$] = $errorCallback$$inline_205_key$$inline_170$$ in $config$$inline_169_opt_config$$1_url$$inline_206$$ ? $config$$inline_169_opt_config$$1_url$$inline_206$$[$errorCallback$$inline_205_key$$inline_170$$] : $spf$config$defaults$$[$errorCallback$$inline_205_key$$inline_170$$];
  }
  for ($errorCallback$$inline_205_key$$inline_170$$ in $config$$inline_169_opt_config$$1_url$$inline_206$$) {
    $errorCallback$$inline_205_key$$inline_170$$ in $spf$config$defaults$$ || ($spf$config$values$$[$errorCallback$$inline_205_key$$inline_170$$] = $config$$inline_169_opt_config$$1_url$$inline_206$$[$errorCallback$$inline_205_key$$inline_170$$]);
  }
  if ($enable$$) {
    $errorCallback$$inline_205_key$$inline_170$$ = $spf$nav$dispatchError_$$;
    if (!$spf$state$values_$$["history-init"] && window.addEventListener) {
      $config$$inline_169_opt_config$$1_url$$inline_206$$ = window.location.href;
      window.addEventListener("popstate", $spf$history$pop_$$, !1);
      $spf$state$set$$("history-init", !0);
      $spf$state$set$$("history-callback", $spf$nav$handleHistory_$$);
      $spf$state$set$$("history-error-callback", $errorCallback$$inline_205_key$$inline_170$$);
      $spf$state$set$$("history-listener", $spf$history$pop_$$);
      $spf$state$set$$("history-url", $config$$inline_169_opt_config$$1_url$$inline_206$$);
      $spf$state$set$$("history-timestamp", $spf$now$$());
      var $historyState$$inline_207$$ = {"spf-referer":document.referrer};
      try {
        $spf$history$replace$$($config$$inline_169_opt_config$$1_url$$inline_206$$, $historyState$$inline_207$$);
      } catch ($err$$inline_208$$) {
        $errorCallback$$inline_205_key$$inline_170$$ && $errorCallback$$inline_205_key$$inline_170$$($config$$inline_169_opt_config$$1_url$$inline_206$$, $err$$inline_208$$);
      }
    }
    !$spf$state$values_$$["nav-init"] && document.addEventListener && (document.addEventListener("click", $spf$nav$handleClick_$$, !1), !$spf$config$values$$["experimental-prefetch-mousedown"] || "ontouchstart" in window || 0 < window.navigator.maxTouchPoints || 0 < window.navigator.msMaxTouchPoints || (document.addEventListener("mousedown", $spf$nav$handleMouseDown_$$, !1), $spf$state$set$$("prefetch-listener", $spf$nav$handleMouseDown_$$)), $spf$state$set$$("nav-init", !0), $spf$state$set$$("nav-init-time", 
    $spf$now$$()), $spf$state$set$$("nav-counter", 0), $spf$state$set$$("nav-listener", $spf$nav$handleClick_$$));
  }
  return $enable$$;
}, dispose:function() {
  "undefined" != typeof History && History.prototype.pushState && ($spf$nav$cancel$$(), $spf$state$values_$$["nav-init"] && (document.removeEventListener && (document.removeEventListener("click", $spf$state$values_$$["nav-listener"], !1), $spf$config$values$$["experimental-prefetch-mousedown"] && document.removeEventListener("mousedown", $spf$state$values_$$["prefetch-listener"], !1)), $spf$state$set$$("nav-init", !1), $spf$state$set$$("nav-init-time", null), $spf$state$set$$("nav-counter", null), 
  $spf$state$set$$("nav-listener", null)), $spf$state$values_$$["history-init"] && (window.removeEventListener && window.removeEventListener("popstate", $spf$state$values_$$["history-listener"], !1), $spf$state$set$$("history-init", !1), $spf$state$set$$("history-callback", null), $spf$state$set$$("history-error-callback", null), $spf$state$set$$("history-listener", null), $spf$state$set$$("history-url", null), $spf$state$set$$("history-timestamp", 0)));
  for (var $key$$inline_174$$ in $spf$config$values$$) {
    delete $spf$config$values$$[$key$$inline_174$$];
  }
}, navigate:function($url$$72$$, $opt_options$$18$$) {
  $spf$debug$debug$$("nav.navigate ", "(url=", $url$$72$$, "options=", $opt_options$$18$$, ")");
  $url$$72$$ && ($spf$nav$isAllowed_$$($url$$72$$) ? $spf$nav$isEligible_$$() ? $spf$nav$navigate_$$($url$$72$$, $opt_options$$18$$) : $spf$nav$reload$$($url$$72$$, $spf$nav$ReloadReason$INELIGIBLE$$) : $spf$nav$reload$$($url$$72$$, $spf$nav$ReloadReason$FORBIDDEN$$));
}, load:function($url$$82$$, $opt_options$$20$$) {
  $spf$nav$load_$$($url$$82$$, $opt_options$$20$$);
}, prefetch:function($url$$84$$, $opt_options$$22$$) {
  $spf$nav$prefetch_$$($url$$84$$, $opt_options$$22$$);
}, process:function($response$$10$$, $opt_callback$$11$$) {
  function $done$$($index$$47$$, $max$$2$$, $_$$1$$, $resp$$) {
    $index$$47$$ == $max$$2$$ && $opt_callback$$11$$ && $opt_callback$$11$$($resp$$);
  }
  var $url$$89$$ = window.location.href;
  if ("multipart" == $response$$10$$.type) {
    for (var $parts$$4$$ = $response$$10$$.parts, $i$$21$$ = 0;$i$$21$$ < $parts$$4$$.length;$i$$21$$++) {
      var $fn$$18$$ = $spf$bind$$($done$$, null, $i$$21$$, $parts$$4$$.length - 1);
      $spf$nav$response$process$$($url$$89$$, $parts$$4$$[$i$$21$$], $fn$$18$$);
    }
  } else {
    $fn$$18$$ = $spf$bind$$($done$$, null, 0, 0), $spf$nav$response$process$$($url$$89$$, $response$$10$$, $fn$$18$$);
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

