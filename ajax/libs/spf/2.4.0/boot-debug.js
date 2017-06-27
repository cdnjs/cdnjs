/* SPF 24 (v2.4.0) | (c) 2012-2016 Google Inc. | License: MIT */
(function(){function $spf$bind$$($fn$$1$$, $self$$1$$, $var_args$$28$$) {
  var $args$$ = Array.prototype.slice.call(arguments, 2);
  return function() {
    var $newArgs$$ = $args$$.slice();
    $newArgs$$.push.apply($newArgs$$, arguments);
    return $fn$$1$$.apply($self$$1$$, $newArgs$$);
  };
}
var $spf$now$$ = window.performance && window.performance.timing && window.performance.now ? function() {
  return window.performance.timing.navigationStart + window.performance.now();
} : function() {
  return(new Date).getTime();
};
function $spf$array$each$$($arr$$8$$, $fn$$3$$) {
  for (var $i$$3$$ = 0, $l$$ = $arr$$8$$.length;$i$$3$$ < $l$$;$i$$3$$++) {
    $i$$3$$ in $arr$$8$$ && $fn$$3$$.call(void 0, $arr$$8$$[$i$$3$$], $i$$3$$, $arr$$8$$);
  }
}
function $spf$array$every$$($arr$$9$$, $fn$$4$$) {
  for (var $i$$4$$ = 0, $l$$1$$ = $arr$$9$$.length;$i$$4$$ < $l$$1$$;$i$$4$$++) {
    if ($i$$4$$ in $arr$$9$$ && !$fn$$4$$.call(void 0, $arr$$9$$[$i$$4$$], $i$$4$$, $arr$$9$$)) {
      return!1;
    }
  }
  return!0;
}
function $spf$array$filter$$($arr$$11$$, $fn$$6$$) {
  var $res$$ = [];
  $spf$array$each$$($arr$$11$$, function($a$$, $i$$6$$, $arr$$12$$) {
    $fn$$6$$.call(void 0, $a$$, $i$$6$$, $arr$$12$$) && $res$$.push($a$$);
  });
  return $res$$;
}
;function $spf$debug$debug$$($var_args$$30$$) {
  if ($spf$debug$levels_$$[$spf$debug$Level$DEBUG$$] >= $spf$debug$levels_$$.debug) {
    var $args$$inline_7$$ = arguments, $method$$inline_8$$ = $spf$debug$Level$DEBUG$$;
    if (window.console) {
      var $args$$inline_7$$ = Array.prototype.slice.call($args$$inline_7$$), $current$$inline_10$$ = $spf$now$$(), $overall$$inline_11$$ = $spf$debug$formatDuration$$($spf$debug$start_$$, $current$$inline_10$$);
      $spf$debug$split_$$ ? $args$$inline_7$$.unshift($overall$$inline_11$$ + "/" + $spf$debug$formatDuration$$($spf$debug$split_$$, $current$$inline_10$$) + ":") : $args$$inline_7$$.unshift($overall$$inline_11$$ + ":");
      $spf$debug$direct_$$ ? ($args$$inline_7$$.unshift("[spf]"), window.console[$method$$inline_8$$].apply(window.console, $args$$inline_7$$)) : ($args$$inline_7$$.unshift("[spf - " + $method$$inline_8$$ + "]"), window.console.log($args$$inline_7$$.join(" ")));
    }
  }
}
function $spf$debug$formatDuration$$($start$$7$$, $end$$3$$) {
  var $dur$$ = ($end$$3$$ - $start$$7$$) / 1E3;
  $dur$$.toFixed && ($dur$$ = $dur$$.toFixed(3));
  return $dur$$ + "s";
}
var $spf$debug$start_$$ = $spf$now$$(), $spf$debug$split_$$ = 0, $spf$debug$direct_$$ = !(!window.console || !window.console.debug), $spf$debug$levels_$$ = {debug:1, info:2, warn:3, error:4}, $spf$debug$Level$DEBUG$$ = "debug";
var $spf$state$values_$$ = window._spf_state || {};
window._spf_state = $spf$state$values_$$;
function $spf$pubsub$subscribe$$($topic$$, $fn$$8$$) {
  $topic$$ && $fn$$8$$ && ($topic$$ in $spf$pubsub$subscriptions$$ || ($spf$pubsub$subscriptions$$[$topic$$] = []), $spf$pubsub$subscriptions$$[$topic$$].push($fn$$8$$));
}
function $spf$pubsub$publish_$$($topic$$4$$) {
  $topic$$4$$ in $spf$pubsub$subscriptions$$ && $spf$array$each$$($spf$pubsub$subscriptions$$[$topic$$4$$], function($subFn$$1$$, $i$$10$$, $arr$$17$$) {
    $arr$$17$$[$i$$10$$] = null;
    $subFn$$1$$ && $subFn$$1$$();
  });
}
var $spf$pubsub$subscriptions$$ = {};
$spf$state$values_$$["ps-s"] = $spf$pubsub$subscriptions$$;
var $spf$config$values$$ = {};
"config" in $spf$state$values_$$ || ($spf$state$values_$$.config = $spf$config$values$$);
$spf$config$values$$ = $spf$state$values_$$.config;
function $spf$url$absolute$$($relative$$) {
  var $aEl$$inline_14$$ = document.createElement("a");
  $aEl$$inline_14$$.href = $relative$$;
  $aEl$$inline_14$$.href = $aEl$$inline_14$$.href;
  return $aEl$$inline_14$$.href.split("#")[0];
}
;function $spf$net$resource$load$$($label$$inline_78_root$$inline_80_url$$20$$, $name$$52$$, $check_opt_fn$$) {
  var $el_selector$$inline_79_type$$78$$ = $spf$net$resource$Type$JS$$;
  $spf$debug$debug$$("resource.load", $el_selector$$inline_79_type$$78$$, $label$$inline_78_root$$inline_80_url$$20$$, $name$$52$$);
  $label$$inline_78_root$$inline_80_url$$20$$ = $spf$net$resource$canonicalize$$($el_selector$$inline_79_type$$78$$, $label$$inline_78_root$$inline_80_url$$20$$);
  var $pseudonym$$ = $name$$52$$ || "^" + $label$$inline_78_root$$inline_80_url$$20$$, $topic$$6$$ = $spf$net$resource$key$$($el_selector$$inline_79_type$$78$$, $pseudonym$$), $key$$inline_53_prevName$$;
  $key$$inline_53_prevName$$ = $spf$net$resource$key$$($el_selector$$inline_79_type$$78$$, $label$$inline_78_root$$inline_80_url$$20$$);
  if (($key$$inline_53_prevName$$ = $spf$net$resource$name_$$[$key$$inline_53_prevName$$]) && $pseudonym$$ != $key$$inline_53_prevName$$) {
    var $key$$inline_57_key$$inline_61_key$$inline_69_oldTopic$$inline_63_url$$inline_73$$ = $spf$net$resource$key$$($el_selector$$inline_79_type$$78$$, $key$$inline_53_prevName$$);
    delete $spf$net$resource$url_$$[$key$$inline_57_key$$inline_61_key$$inline_69_oldTopic$$inline_63_url$$inline_73$$];
    $key$$inline_57_key$$inline_61_key$$inline_69_oldTopic$$inline_63_url$$inline_73$$ = $spf$net$resource$key$$($el_selector$$inline_79_type$$78$$, $label$$inline_78_root$$inline_80_url$$20$$);
    delete $spf$net$resource$name_$$[$key$$inline_57_key$$inline_61_key$$inline_69_oldTopic$$inline_63_url$$inline_73$$];
    ($key$$inline_57_key$$inline_61_key$$inline_69_oldTopic$$inline_63_url$$inline_73$$ = $spf$net$resource$key$$($el_selector$$inline_79_type$$78$$, $key$$inline_53_prevName$$)) && $topic$$6$$ && $key$$inline_57_key$$inline_61_key$$inline_69_oldTopic$$inline_63_url$$inline_73$$ in $spf$pubsub$subscriptions$$ && ($spf$pubsub$subscriptions$$[$topic$$6$$] = ($spf$pubsub$subscriptions$$[$topic$$6$$] || []).concat($spf$pubsub$subscriptions$$[$key$$inline_57_key$$inline_61_key$$inline_69_oldTopic$$inline_63_url$$inline_73$$]), 
    delete $spf$pubsub$subscriptions$$[$key$$inline_57_key$$inline_61_key$$inline_69_oldTopic$$inline_63_url$$inline_73$$]);
  }
  $key$$inline_57_key$$inline_61_key$$inline_69_oldTopic$$inline_63_url$$inline_73$$ = $spf$net$resource$key$$($el_selector$$inline_79_type$$78$$, $label$$inline_78_root$$inline_80_url$$20$$);
  $spf$net$resource$name_$$[$key$$inline_57_key$$inline_61_key$$inline_69_oldTopic$$inline_63_url$$inline_73$$] = $pseudonym$$;
  var $key$$inline_57_key$$inline_61_key$$inline_69_oldTopic$$inline_63_url$$inline_73$$ = $label$$inline_78_root$$inline_80_url$$20$$, $key$$inline_74$$ = $spf$net$resource$key$$($el_selector$$inline_79_type$$78$$, $pseudonym$$);
  $spf$net$resource$url_$$[$key$$inline_74$$] = $key$$inline_57_key$$inline_61_key$$inline_69_oldTopic$$inline_63_url$$inline_73$$;
  $spf$debug$debug$$("  subscribing callback", $topic$$6$$);
  $spf$pubsub$subscribe$$($topic$$6$$, $check_opt_fn$$);
  $check_opt_fn$$ = $spf$bind$$($spf$net$resource$check$$, null, $el_selector$$inline_79_type$$78$$);
  $spf$net$resource$status$get$$($el_selector$$inline_79_type$$78$$, $label$$inline_78_root$$inline_80_url$$20$$) ? ($key$$inline_53_prevName$$ && $pseudonym$$ != $key$$inline_53_prevName$$ && ($label$$inline_78_root$$inline_80_url$$20$$ = $label$$inline_78_root$$inline_80_url$$20$$ ? String($label$$inline_78_root$$inline_80_url$$20$$).replace(/[^\w]/g, "") : "", $el_selector$$inline_79_type$$78$$ = "." + $spf$net$resource$key$$($el_selector$$inline_79_type$$78$$, $label$$inline_78_root$$inline_80_url$$20$$), 
  $label$$inline_78_root$$inline_80_url$$20$$ = document, ($el_selector$$inline_79_type$$78$$ = ($label$$inline_78_root$$inline_80_url$$20$$.querySelectorAll ? $label$$inline_78_root$$inline_80_url$$20$$.querySelectorAll($el_selector$$inline_79_type$$78$$) : [])[0]) && $el_selector$$inline_79_type$$78$$.setAttribute("name", $name$$52$$ || "")), $check_opt_fn$$()) : ($el_selector$$inline_79_type$$78$$ = $spf$net$resource$create$$($el_selector$$inline_79_type$$78$$, $label$$inline_78_root$$inline_80_url$$20$$, 
  $check_opt_fn$$, void 0, void 0)) && $name$$52$$ && $el_selector$$inline_79_type$$78$$.setAttribute("name", $name$$52$$);
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
function $spf$net$resource$create$$($type$$83$$, $url$$24$$, $opt_callback$$7$$, $doc$$1_opt_document$$1_targetEl$$, $opt_statusGroup$$) {
  function $next$$1$$() {
    $spf$debug$debug$$("resource.create", $type$$83$$, $url$$24$$, "done");
    $spf$net$resource$status$get$$($type$$83$$, $url$$24$$, $opt_statusGroup$$) && ($spf$debug$debug$$("resource.create", $type$$83$$, $url$$24$$, "loaded"), $spf$net$resource$status$set$$($spf$net$resource$State$LOADED$$, $type$$83$$, $url$$24$$, $opt_statusGroup$$));
    $opt_callback$$7$$ && setTimeout($opt_callback$$7$$, 0);
    return null;
  }
  $spf$debug$debug$$("resource.create", $type$$83$$, $url$$24$$, "loading");
  $url$$24$$ = $spf$net$resource$canonicalize$$($type$$83$$, $url$$24$$);
  $spf$net$resource$status$set$$($spf$net$resource$State$LOADING$$, $type$$83$$, $url$$24$$, $opt_statusGroup$$);
  $doc$$1_opt_document$$1_targetEl$$ = $doc$$1_opt_document$$1_targetEl$$ || document;
  var $el$$1$$ = $doc$$1_opt_document$$1_targetEl$$.createElement("script");
  if (!$url$$24$$) {
    return $next$$1$$();
  }
  var $label$$4$$ = $url$$24$$ ? String($url$$24$$).replace(/[^\w]/g, "") : "";
  $el$$1$$.className = $spf$net$resource$key$$($type$$83$$, $label$$4$$);
  "onload" in $el$$1$$ ? $el$$1$$.onerror = $el$$1$$.onload = $next$$1$$ : $el$$1$$.onreadystatechange = function $$el$$1$$$onreadystatechange$() {
    /^c|loade/.test($el$$1$$.readyState) && $next$$1$$();
  };
  $doc$$1_opt_document$$1_targetEl$$ = $doc$$1_opt_document$$1_targetEl$$.getElementsByTagName("head")[0] || $doc$$1_opt_document$$1_targetEl$$.body;
  $el$$1$$.async = !0;
  $el$$1$$.src = $url$$24$$;
  $doc$$1_opt_document$$1_targetEl$$.insertBefore($el$$1$$, $doc$$1_opt_document$$1_targetEl$$.firstChild);
  return $el$$1$$;
}
function $spf$net$resource$canonicalize$$($type$$92$$, $url$$31$$) {
  var $key$$29_paths$$1$$ = "rsrc-p-" + $type$$92$$;
  if ($url$$31$$) {
    var $index$$45$$ = $url$$31$$.indexOf("//");
    if (0 > $index$$45$$) {
      if (0 == $url$$31$$.lastIndexOf("hash-", 0)) {
        return $url$$31$$;
      }
      $key$$29_paths$$1$$ = $spf$state$values_$$[$key$$29_paths$$1$$] || "";
      if ("string" == typeof $key$$29_paths$$1$$) {
        $url$$31$$ = $key$$29_paths$$1$$ + $url$$31$$;
      } else {
        for (var $p$$ in $key$$29_paths$$1$$) {
          $url$$31$$ = $url$$31$$.replace($p$$, $key$$29_paths$$1$$[$p$$]);
        }
      }
      $type$$92$$ != $spf$net$resource$Type$IMG$$ && ($url$$31$$ = 0 > $url$$31$$.indexOf("." + $type$$92$$) ? $url$$31$$ + "." + $type$$92$$ : $url$$31$$);
      $url$$31$$ = $spf$url$absolute$$($url$$31$$);
    } else {
      0 == $index$$45$$ && ($url$$31$$ = $spf$url$absolute$$($url$$31$$));
    }
  }
  return $url$$31$$;
}
function $spf$net$resource$key$$($type$$93$$, $label$$9$$, $opt_group$$) {
  return $type$$93$$ + "-" + $label$$9$$ + ($opt_group$$ ? "-" + $opt_group$$ : "");
}
function $spf$net$resource$status$set$$($status$$, $key$$30_type$$94$$, $url$$33$$, $opt_group$$1$$) {
  $key$$30_type$$94$$ = $spf$net$resource$key$$($key$$30_type$$94$$, $url$$33$$, $opt_group$$1$$);
  $spf$net$resource$status_$$[$key$$30_type$$94$$] = $status$$;
}
function $spf$net$resource$status$get$$($key$$31_type$$95$$, $url$$34$$, $opt_group$$2$$) {
  $key$$31_type$$95$$ = $spf$net$resource$key$$($key$$31_type$$95$$, $url$$34$$, $opt_group$$2$$);
  return $spf$net$resource$status_$$[$key$$31_type$$95$$];
}
function $spf$net$resource$url$get$$($type$$102$$, $name$$60$$) {
  var $key$$37$$ = $spf$net$resource$key$$($type$$102$$, $name$$60$$);
  return $spf$net$resource$url_$$[$key$$37$$];
}
function $spf$net$resource$url$loaded$$($type$$104$$, $name$$62$$) {
  var $url$$42$$ = $spf$net$resource$url$get$$($type$$104$$, $name$$62$$), $JSCompiler_temp$$4_status$$inline_30$$;
  if ($JSCompiler_temp$$4_status$$inline_30$$ = void 0 != $url$$42$$) {
    $JSCompiler_temp$$4_status$$inline_30$$ = $spf$net$resource$status$get$$($type$$104$$, $url$$42$$), $JSCompiler_temp$$4_status$$inline_30$$ = "" == $url$$42$$ || $JSCompiler_temp$$4_status$$inline_30$$ == $spf$net$resource$State$LOADED$$;
  }
  return $JSCompiler_temp$$4_status$$inline_30$$;
}
var $spf$net$resource$status_$$ = {}, $spf$net$resource$name_$$ = {}, $spf$net$resource$url_$$ = {}, $spf$net$resource$State$LOADING$$ = 1, $spf$net$resource$State$LOADED$$ = 2, $spf$net$resource$Type$IMG$$ = "img", $spf$net$resource$Type$JS$$ = "js";
$spf$state$values_$$["rsrc-s"] = $spf$net$resource$status_$$;
$spf$state$values_$$["rsrc-n"] = $spf$net$resource$name_$$;
$spf$state$values_$$["rsrc-u"] = $spf$net$resource$url_$$;
function $spf$net$script$ready$$($names$$1_topic$$9$$, $opt_fn$$3$$, $opt_require$$) {
  $names$$1_topic$$9$$ = $names$$1_topic$$9$$ && $names$$1_topic$$9$$.push ? $names$$1_topic$$9$$ : [$names$$1_topic$$9$$];
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
  $spf$net$script$ready$$($names$$3$$, $opt_fn$$4$$, $spf$net$script$require_$$);
}
function $spf$net$script$require_$$($names$$4$$) {
  $spf$array$each$$($names$$4$$, function($name$$69$$) {
    function $next$$3$$() {
      $spf$net$resource$load$$($url$$47$$, $name$$69$$, void 0);
    }
    var $deps$$ = $spf$net$script$deps_$$[$name$$69$$], $url$$47$$ = $spf$net$script$url_$$[$name$$69$$] || $name$$69$$;
    $deps$$ ? $spf$net$script$require$$($deps$$, $next$$3$$) : $next$$3$$();
  });
}
var $spf$net$script$deps_$$ = {};
$spf$state$values_$$["js-d"] = $spf$net$script$deps_$$;
var $spf$net$script$url_$$ = {};
$spf$state$values_$$["js-u"] = $spf$net$script$url_$$;
var $spf$bootloader$api_$$ = {script:{load:function($url$$43$$, $name$$63$$, $opt_fn$$1$$) {
  $spf$net$resource$load$$($url$$43$$, $name$$63$$, $opt_fn$$1$$);
}, get:function($url$$44$$, $opt_fn$$2$$) {
  $spf$net$resource$create$$($spf$net$resource$Type$JS$$, $url$$44$$, $opt_fn$$2$$);
}, ready:$spf$net$script$ready$$, done:function($key$$inline_100_name$$67$$) {
  $key$$inline_100_name$$67$$ = $spf$net$resource$key$$($spf$net$resource$Type$JS$$, $key$$inline_100_name$$67$$);
  $spf$net$resource$url_$$[$key$$inline_100_name$$67$$] = "";
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
  $spf$state$values_$$["rsrc-p-" + $spf$net$resource$Type$JS$$] = $paths$$2$$;
}}}, $api$$ = this.spf = this.spf || {}, $fn$$;
for ($fn$$ in $spf$bootloader$api_$$) {
  $api$$[$fn$$] = $spf$bootloader$api_$$[$fn$$];
}
;})();
