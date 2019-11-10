if (typeof module !== "undefined" && module.exports) {
  this.later = require("later");
}

schedule = function(later) {
  "use strict";
  var schedule = {
    version: "0.6.3"
  };
  if (!later) throw new Error("Laterjs must be included before Schedulejs.");
  if (!Array.isArray) {
    Array.isArray = function(vArg) {
      return Object.prototype.toString.call(vArg) === "[object Array]";
    };
  }
  if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function(searchElement) {
      "use strict";
      if (this == null) {
        throw new TypeError();
      }
      var t = Object(this);
      var len = t.length >>> 0;
      if (len === 0) {
        return -1;
      }
      var n = 0;
      if (arguments.length > 1) {
        n = Number(arguments[1]);
        if (n != n) {
          n = 0;
        } else if (n != 0 && n != Infinity && n != -Infinity) {
          n = (n > 0 || -1) * Math.floor(Math.abs(n));
        }
      }
      if (n >= len) {
        return -1;
      }
      var k = n >= 0 ? n : Math.max(len - Math.abs(n), 0);
      for (;k < len; k++) {
        if (k in t && t[k] === searchElement) {
          return k;
        }
      }
      return -1;
    };
  }
  schedule.date = {};
  schedule.date.UTC = function() {
    later.date.UTC();
  };
  schedule.date.localTime = function() {
    later.date.localTime();
  };
  schedule.functor = function(v) {
    return typeof v === "function" ? v : function() {
      return v;
    };
  };
  schedule.memoizedRangeFn = function(fn) {
    var cache = {};
    return function(start) {
      if (!cache[start]) {
        var result = fn(1, start);
        cache[start] = [ result[0] ? result[0].getTime() : 41024448e5, result[1] ? result[1].getTime() : 41024448e5 ];
      }
      return cache[start];
    };
  };
  schedule.sort = {};
  schedule.sort.tasks = function(taskGraph, readyTasks) {
    readyTasks.sort(function(a, b) {
      var ta = taskGraph.tasks[a], tb = taskGraph.tasks[b];
      if (tb.priority && (!ta.priority || tb.priority > ta.priority)) {
        return -1;
      }
      if (ta.priority && (!tb.priority || ta.priority > tb.priority)) {
        return 1;
      }
      return taskGraph.tasks[b].floatAmt > taskGraph.tasks[a].floatAmt;
    });
  };
  schedule.resources = function() {
    var id = resourcesId, available = resourcesAvailable, isNotReservable = resourcesIsNotReservable;
    function resources(data) {
      var items = [], fid = schedule.functor(id), favailable = schedule.functor(available), freserve = schedule.functor(isNotReservable);
      for (var i = 0, len = data.length; i < len; i++) {
        var resource = data[i], rId = fid.call(this, resource, i), rAvailable = favailable.call(this, resource, i), rReserve = freserve.call(this, resource, i);
        items.push({
          id: rId,
          available: rAvailable,
          isNotReservable: rReserve
        });
      }
      return items;
    }
    resources.id = function(_) {
      if (!arguments.length) return id;
      id = _;
      return resources;
    };
    resources.available = function(_) {
      if (!arguments.length) return available;
      available = _;
      return resources;
    };
    resources.isNotReservable = function(_) {
      if (!arguments.length) return isNotReservable;
      isNotReservable = _;
      return resources;
    };
    return resources;
  };
  function resourcesId(d) {
    return d.id;
  }
  function resourcesAvailable(d) {
    return d.available;
  }
  function resourcesIsNotReservable(d) {
    return d.isNotReservable || false;
  }
  schedule.tasks = function() {
    var id = tasksId, duration = tasksDuration, available = tasksAvailable, resources = tasksResources, dependsOn = tasksDependsOn, minSchedule = tasksMinSchedule, priority = tasksPriority;
    function tasks(data) {
      var items = [], fid = schedule.functor(id), fduration = schedule.functor(duration), favailable = schedule.functor(available), fresources = schedule.functor(resources), fdependsOn = schedule.functor(dependsOn), fminschedule = schedule.functor(minSchedule), fpriority = schedule.functor(priority);
      for (var i = 0, len = data.length; i < len; i++) {
        var task = data[i], item = {
          id: fid.call(this, task, i),
          duration: fduration.call(this, task, i),
          available: favailable.call(this, task, i),
          resources: fresources.call(this, task, i),
          dependsOn: fdependsOn.call(this, task, i),
          minSchedule: fminschedule.call(this, task, i),
          priority: fpriority.call(this, task, i)
        };
        items.push(item);
      }
      return items;
    }
    tasks.id = function(_) {
      if (!arguments.length) return id;
      id = _;
      return tasks;
    };
    tasks.duration = function(_) {
      if (!arguments.length) return duration;
      duration = _;
      return tasks;
    };
    tasks.available = function(_) {
      if (!arguments.length) return available;
      available = _;
      return tasks;
    };
    tasks.resources = function(_) {
      if (!arguments.length) return resources;
      resources = _;
      return tasks;
    };
    tasks.dependsOn = function(_) {
      if (!arguments.length) return dependsOn;
      dependsOn = _;
      return tasks;
    };
    tasks.minSchedule = function(_) {
      if (!arguments.length) return minSchedule;
      minSchedule = _;
      return tasks;
    };
    tasks.priority = function(_) {
      if (!arguments.length) return priority;
      priority = _;
      return tasks;
    };
    return tasks;
  };
  function tasksId(d) {
    return d.id;
  }
  function tasksDuration(d) {
    return d.duration;
  }
  function tasksAvailable(d) {
    return d.available;
  }
  function tasksResources(d) {
    return d.resources;
  }
  function tasksDependsOn(d) {
    return d.dependsOn;
  }
  function tasksMinSchedule(d) {
    return d.minSchedule;
  }
  function tasksPriority(d) {
    return d.priority;
  }
  schedule.dependencyGraph = function(taskArr) {
    function createDependencyGraph(tasks) {
      var graph = {
        tasks: {},
        roots: [],
        leaves: [],
        resources: [],
        depth: 0,
        end: 0
      };
      for (var i = 0, len = tasks.length; i < len; i++) {
        var t = tasks[i];
        graph.tasks[t.id] = {
          id: t.id,
          duration: t.duration,
          priority: t.priority,
          schedule: t.schedule,
          minSchedule: t.minSchedule,
          dependsOn: t.dependsOn,
          resources: t.resources
        };
      }
      setResources(graph);
      setRequiredBy(graph.tasks);
      setRootsAndLeaves(graph);
      setDepth(graph, graph.leaves, 0);
      graph.depth += 1;
      forwardPass(graph, {}, graph.roots, 0);
      setEnd(graph, graph.leaves);
      backwardPass(graph, {}, graph.leaves, graph.end);
      return graph;
    }
    function setResources(graph) {
      for (var id in graph.tasks) {
        var task = graph.tasks[id];
        if (!isEmpty(task.resources)) {
          for (var i = 0, len = task.resources.length; i < len; i++) {
            var resId = task.resources[i];
            if (graph.resources.indexOf(resId) === -1) {
              graph.resources.push(resId);
            }
          }
        }
      }
    }
    function setRequiredBy(tasks) {
      for (var id in tasks) {
        var child = tasks[id], dependsOn = child.dependsOn;
        if (!isEmpty(dependsOn)) {
          for (var i = 0, len = dependsOn.length; i < len; i++) {
            var parent = tasks[dependsOn[i]];
            (parent.requiredBy || (parent.requiredBy = [])).push(child.id);
          }
        }
      }
    }
    function setRootsAndLeaves(graph) {
      for (var id in graph.tasks) {
        var task = graph.tasks[id];
        if (isEmpty(task.dependsOn)) {
          graph.roots.push(task.id);
        }
        if (isEmpty(task.requiredBy)) {
          graph.leaves.push(task.id);
        }
      }
    }
    function setDepth(graph, tasks, depth) {
      for (var i = 0, len = tasks.length; i < len; i++) {
        var task = graph.tasks[tasks[i]], dependsOn = task.dependsOn;
        task.depth = !task.depth || depth > task.depth ? depth : task.depth;
        graph.depth = depth > graph.depth ? depth : graph.depth;
        if (!isEmpty(dependsOn)) {
          setDepth(graph, dependsOn, task.depth + 1);
        }
      }
    }
    function forwardPass(graph, depEnds, tasks, start) {
      updateDependencies(depEnds, tasks, start);
      for (var i = 0, len = tasks.length; i < len; i++) {
        var tid = tasks[i], task = graph.tasks[tid], dependsOn = task.dependsOn, dep = depEnds[tid];
        if (!task.earlyFinish && (isEmpty(dependsOn) || dep && dep[0] === dependsOn.length)) {
          task.earlyStart = dep[1];
          task.earlyFinish = dep[1] + task.duration;
          if (!isEmpty(task.requiredBy)) {
            forwardPass(graph, depEnds, task.requiredBy, task.earlyFinish);
          }
        }
      }
    }
    function setEnd(graph, tasks) {
      for (var i = 0, len = tasks.length; i < len; i++) {
        var finish = graph.tasks[tasks[i]].earlyFinish;
        graph.end = finish > graph.end ? finish : graph.end;
      }
    }
    function backwardPass(graph, depEnds, tasks, end) {
      updateDependencies(depEnds, tasks, end, true);
      for (var i = 0, len = tasks.length; i < len; i++) {
        var tid = tasks[i], task = graph.tasks[tid], requiredBy = task.requiredBy, dep = depEnds[tid];
        if (isEmpty(requiredBy) || dep && dep[0] === requiredBy.length) {
          task.lateStart = dep[1] - task.duration;
          task.lateFinish = dep[1];
          task.floatAmt = task.lateFinish - task.earlyFinish;
          if (!isEmpty(task.dependsOn)) {
            backwardPass(graph, depEnds, task.dependsOn, task.lateStart);
          }
        }
      }
    }
    function updateDependencies(deps, tasks, start, rev) {
      var compare = rev ? function(a, b) {
        return b > a;
      } : function(a, b) {
        return a > b;
      };
      for (var i = 0, len = tasks.length; i < len; i++) {
        var id = tasks[i];
        if (deps[id]) {
          deps[id][0] = deps[id][0] + 1;
          deps[id][1] = compare(start, deps[id][1]) ? start : deps[id][1];
        } else {
          deps[id] = [ 1, start ];
        }
      }
    }
    function isEmpty(arr) {
      return !arr || arr.length === 0;
    }
    return createDependencyGraph(taskArr);
  };
  schedule.resourceManager = function(resourceDefinitions, startDate) {
    var defaultSched = {
      schedules: [ {
        fd_a: [ startDate.getTime() ]
      } ]
    }, rMap = buildResourceMap(resourceDefinitions, startDate);
    function buildResourceMap(resourceDefinitions, start) {
      var map = {};
      if (resourceDefinitions) {
        for (var i = 0, len = resourceDefinitions.length; i < len; i++) {
          addResourceToMap(map, resourceDefinitions[i], start);
        }
      }
      return map;
    }
    function addResourceToMap(map, def, start) {
      var sched = JSON.parse(JSON.stringify(def.available || defaultSched)), nextFn = schedule.memoizedRangeFn(later.schedule(sched).nextRange);
      map[def.id] = {
        schedule: sched,
        next: nextFn,
        nextAvail: nextFn(start)
      };
    }
    function getReservation(resources, start, min, max) {
      var reservation, schedules = [], delays = {}, maxTries = 50;
      initRanges(resources, start, schedules, delays);
      while (!(reservation = tryReservation(schedules, min, max)).success && --maxTries) {
        updateRanges(schedules, nextValidStart(schedules), delays);
      }
      reservation.delays = delays;
      return reservation;
    }
    function initRanges(resources, start, ranges, delays) {
      for (var i = 0, len = resources.length; i < len; i++) {
        var resId = resources[i];
        if (Array.isArray(resId)) {
          var subRanges = [], subDelays = {};
          initRanges(resId, start, subRanges, subDelays);
          var longDelay = getLongestDelay(subDelays);
          if (longDelay) {
            delays[longDelay] = subDelays[longDelay];
          }
          var schedule = {
            subRanges: subRanges
          };
          setEarliestSubRange(schedule);
          ranges.push(schedule);
        } else {
          var res = rMap[resId], range = res.nextAvail[0] >= start ? res.nextAvail : res.next(start);
          if (range[0] > start && resId !== "_proj") {
            delays[resId] = {
              needed: start,
              available: range[0]
            };
          }
          ranges.push({
            id: resId,
            range: range
          });
        }
      }
    }
    function tryReservation(schedules, min, max) {
      var reservation = {
        success: false
      }, resources = [], start, end;
      for (var i = 0, len = schedules.length; i < len; i++) {
        var schedule = schedules[i], range = schedule.range;
        if (!isInternal(schedule)) {
          resources.push(schedule.id);
        }
        start = !start || range[0] > start ? range[0] : start;
        end = !end || range[1] < end ? range[1] : end;
      }
      var duration = (end - start) / later.MIN;
      if (duration >= min || duration >= max) {
        duration = max && duration > max ? max : duration;
        reservation = createReservation(resources, start, duration);
      }
      return reservation;
    }
    function createReservation(resources, start, duration) {
      var end = start + duration * later.MIN, reservation = {
        resources: resources,
        start: start,
        end: end,
        duration: duration,
        success: true
      };
      applyReservation(resources, start, end);
      return reservation;
    }
    function updateRanges(resources, start, delays) {
      for (var i = 0, len = resources.length; i < len; i++) {
        var res = resources[i];
        if (res.range[1] > start) continue;
        if (res.subRanges) {
          updateRanges(res.subRanges, start, {});
          setEarliestSubRange(res);
        } else {
          res.range = rMap[res.id].next(start);
          if (res.id !== "_proj" && !delays[res.id]) {
            delays[res.id] = {
              needed: start,
              available: res.range[0]
            };
          }
        }
      }
    }
    function applyReservation(resources, start, end) {
      for (var i = 0, len = resources.length; i < len; i++) {
        var res = rMap[resources[i]];
        if (res.isNotReservable) continue;
        if (start !== res.nextAvail[0]) {
          if (!res.schedule.exceptions) res.schedule.exceptions = [];
          res.schedule.exceptions.push({
            fd_a: [ start ],
            fd_b: [ end ]
          });
          res.next = schedule.memoizedRangeFn(later.schedule(res.schedule).nextRange);
          end = res.nextAvail[0];
        }
        res.nextAvail = res.next(end);
      }
    }
    function nextValidStart(schedules) {
      var latest;
      for (var i = 0, len = schedules.length; i < len; i++) {
        var end = schedules[i].range[1];
        latest = !latest || end < latest ? end : latest;
      }
      return latest;
    }
    function setEarliestSubRange(schedule) {
      var minId, minRange;
      for (var i = 0, len = schedule.subRanges.length; i < len; i++) {
        var sub = schedule.subRanges[i];
        if (!minId || sub.range[0] < minRange[0]) {
          minId = sub.id;
          minRange = sub.range;
        }
      }
      schedule.id = minId;
      schedule.range = minRange;
    }
    function getLongestDelay(delays) {
      var latest, lid;
      for (var id in delays) {
        var available = delays[id].available;
        if (!latest || available < latest) {
          latest = available;
          lid = id;
        }
      }
      return lid;
    }
    function isInternal(resource) {
      return resource.id[0] === "_";
    }
    return {
      getResource: function(id) {
        return rMap[id];
      },
      addResource: function(arr, prefix, start) {
        for (var i = 0, len = arr.length; i < len; i++) {
          var def = typeof arr[i] !== "object" ? {
            id: prefix + arr[i]
          } : {
            id: prefix + arr[i].id,
            available: arr[i].available,
            isNotReservable: arr[i].isNotReservable
          };
          if (!rMap[def.id]) {
            addResourceToMap(rMap, def, start);
          }
        }
      },
      makeReservation: function(resources, start, min, max) {
        start = start ? new Date(start) : new Date();
        return getReservation(resources, start.getTime(), min || 1, max);
      },
      optimize: function(start) {
        for (var id in rMap) {
          var res = rMap[id];
          if (res.schedule.exceptions) {
            var curExceptions = res.schedule.exceptions;
            res.schedule.exceptions = [];
            for (var i = 0, len = curExceptions.length; i < len; i++) {
              if (!curExceptions[i].fd_b || curExceptions[i].fd_b > start) {
                res.schedule.exceptions.push(curExceptions[i]);
              }
            }
            res.next = schedule.memoizedRangeFn(later.schedule(res.schedule).nextRange);
          }
          if (res.nextAvail[0] < start) {
            res.nextAvail = res.next(start);
          }
        }
      }
    };
  };
  schedule.create = function(tasks, resources, sched, scheduleStart) {
    if (!Array.isArray(tasks)) {
      throw new Error("Tasks are required and must be passed in as an array.");
    }
    if (resources && !Array.isArray(resources)) {
      throw new Error("Resources must be passed in as an array.");
    }
    var startDate = scheduleStart ? new Date(scheduleStart) : new Date();
    if (!startDate || !startDate.getTime()) {
      throw new Error("Invalid start date specified.");
    }
    var taskGraph = schedule.dependencyGraph(tasks), resMgr = schedule.resourceManager(resources, startDate), scheduledTasks = {};
    function generateSchedule() {
      var range, failedTasks = [];
      resMgr.addResource(taskGraph.resources, "", startDate);
      resMgr.addResource([ {
        id: "_proj",
        available: sched
      } ], "", startDate);
      resMgr.addResource(tasks, "_task", startDate);
      forwardPass(taskGraph.roots);
      range = getSummary(tasks, failedTasks);
      backwardPass(taskGraph.leaves, range[1]);
      return {
        scheduledTasks: scheduledTasks,
        failedTasks: failedTasks.length ? failedTasks : null,
        success: failedTasks.length === 0,
        start: range[0],
        end: range[1]
      };
    }
    function forwardPass(roots) {
      var readyTasks = roots.slice(0), dependencies = {};
      for (var i = 0, len = roots.length; i < len; i++) {
        dependencies[roots[i]] = [ 0, startDate.getTime() ];
      }
      while (readyTasks.length) {
        schedule.sort.tasks(taskGraph, readyTasks);
        var task = taskGraph.tasks[readyTasks.pop()], start = dependencies[task.id][1], end = forwardPassTask(task, start);
        if (end && task.requiredBy) {
          updateDependencies(readyTasks, dependencies, task.requiredBy, end);
          resMgr.optimize(getMinStart(dependencies));
        }
      }
    }
    function forwardPassTask(task, start) {
      var resAll = [ "_proj", "_task" + task.id ], resources = task.resources ? resAll.concat(task.resources) : resAll, duration = task.duration, next = start, scheduledTask = {
        schedule: [],
        duration: task.duration
      };
      while (duration) {
        var r = resMgr.makeReservation(resources, next, task.minSchedule || 1, duration);
        if (!r.success) return undefined;
        scheduledTask.earlyStart = scheduledTask.earlyStart || r.start;
        scheduledTask.schedule.push(r);
        duration -= r.duration;
        next = r.end;
      }
      scheduledTask.earlyFinish = next;
      scheduledTasks[task.id] = scheduledTask;
      return next;
    }
    function getSummary(tasks, failedTasks) {
      var start, end;
      for (var i = 0, len = tasks.length; i < len; i++) {
        var t = scheduledTasks[tasks[i].id];
        if (t) {
          start = !start || t.earlyStart < start ? t.earlyStart : start;
          end = !end || t.earlyFinish > end ? t.earlyFinish : end;
        } else {
          failedTasks.push(tasks[i].id);
        }
      }
      return [ start, end ];
    }
    function updateDependencies(readyTasks, dependencies, tasks, end) {
      for (var i = 0, len = tasks.length; i < len; i++) {
        var tid = tasks[i], dependsOn = taskGraph.tasks[tid].dependsOn, metDeps = dependencies[tid] || (dependencies[tid] = [ 0, 0 ]);
        metDeps[0] += 1;
        metDeps[1] = end > metDeps[1] ? end : metDeps[1];
        if (!dependsOn || metDeps[0] >= dependsOn.length) {
          readyTasks.push(tid);
        }
      }
    }
    function getMinStart(dependencies) {
      var min;
      for (var id in dependencies) {
        if (!min || min > dependencies[id][1]) {
          min = dependencies[id][1];
        }
      }
      return min;
    }
    function backwardPass(tasks, finishDate) {
      for (var i = 0, len = tasks.length; i < len; i++) {
        var sTask = scheduledTasks[tasks[i]], dependsOn = taskGraph.tasks[tasks[i]].dependsOn;
        if (sTask) {
          sTask.lateFinish = finishDate;
          sTask.floatAmt = (sTask.lateFinish - sTask.earlyFinish) / later.MIN;
          if (dependsOn) {
            backwardPass(dependsOn, sTask.earlyStart);
          }
        }
      }
    }
    return generateSchedule();
  };
  return schedule;
}(this.later);