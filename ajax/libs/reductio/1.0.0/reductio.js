// https://github.com/esjewett/reductio v1.0.0 Copyright 2020 Ethan Jewett
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('crossfilter2')) :
	typeof define === 'function' && define.amd ? define(['crossfilter2'], factory) :
	(global = global || self, global.reductio = factory(global.crossfilter));
}(this, (function (crossfilter) { 'use strict';

	crossfilter = crossfilter && crossfilter.hasOwnProperty('default') ? crossfilter['default'] : crossfilter;

	var filter = {
		// The big idea here is that you give us a filter function to run on values,
		// a 'prior' reducer to run (just like the rest of the standard reducers),
		// and a reference to the last reducer (called 'skip' below) defined before
		// the most recent chain of reducers.  This supports individual filters for
		// each .value('...') chain that you add to your reducer.
		add: function (filter, prior, skip) {
			return function (p, v, nf) {
				if (filter(v, nf)) {
					if (prior) prior(p, v, nf);
				} else {
					if (skip) skip(p, v, nf);
				}
				return p;
			};
		},
		remove: function (filter, prior, skip) {
			return function (p, v, nf) {
				if (filter(v, nf)) {
					if (prior) prior(p, v, nf);
				} else {
					if (skip) skip(p, v, nf);
				}
				return p;
			};
		}
	};

	var count = {
		add: function(prior, path, propName) {
			return function (p, v, nf) {
				if(prior) prior(p, v, nf);
				path(p)[propName]++;
				return p;
			};
		},
		remove: function(prior, path, propName) {
			return function (p, v, nf) {
				if(prior) prior(p, v, nf);
				path(p)[propName]--;
				return p;
			};
		},
		initial: function(prior, path, propName) {
			return function (p) {
				if(prior) p = prior(p);
				// if(p === undefined) p = {};
				path(p)[propName] = 0;
				return p;
			};
		}
	};

	var sum = {
		add: function (a, prior, path) {
			return function (p, v, nf) {
				if(prior) prior(p, v, nf);
				path(p).sum = path(p).sum + a(v);
				return p;
			};
		},
		remove: function (a, prior, path) {
			return function (p, v, nf) {
				if(prior) prior(p, v, nf);
				path(p).sum = path(p).sum - a(v);
				return p;
			};
		},
		initial: function (prior, path) {
			return function (p) {
				p = prior(p);
				path(p).sum = 0;
				return p;
			};
		}
	};

	var avg = {
		add: function (a, prior, path) {
			return function (p, v, nf) {
				if(prior) prior(p, v, nf);
				if(path(p).count > 0) {
					path(p).avg = path(p).sum / path(p).count;
				} else {
					path(p).avg = 0;
				}
				return p;
			};
		},
		remove: function (a, prior, path) {
			return function (p, v, nf) {
				if(prior) prior(p, v, nf);
				if(path(p).count > 0) {
					path(p).avg = path(p).sum / path(p).count;
				} else {
					path(p).avg = 0;
				}
				return p;
			};
		},
		initial: function (prior, path) {
			return function (p) {
				p = prior(p);
				path(p).avg = 0;
				return p;
			};
		}
	};

	var median = {
		add: function (prior, path) {
			var half;
			return function (p, v, nf) {
				if(prior) prior(p, v, nf);

				half = Math.floor(path(p).valueList.length/2);
	 
				if(path(p).valueList.length % 2) {
					path(p).median = path(p).valueList[half];
				} else {
					path(p).median = (path(p).valueList[half-1] + path(p).valueList[half]) / 2.0;
				}

				return p;
			};
		},
		remove: function (prior, path) {
			var half;
			return function (p, v, nf) {
				if(prior) prior(p, v, nf);

				half = Math.floor(path(p).valueList.length/2);

				// Check for undefined.
				if(path(p).valueList.length === 0) {
					path(p).median = undefined;
					return p;
				}
	 
				if(path(p).valueList.length === 1 || path(p).valueList.length % 2) {
					path(p).median = path(p).valueList[half];
				} else {
					path(p).median = (path(p).valueList[half-1] + path(p).valueList[half]) / 2.0;
				}

				return p;
			};
		},
		initial: function (prior, path) {
			return function (p) {
				p = prior(p);
				path(p).median = undefined;
				return p;
			};
		}
	};

	var min = {
		add: function (prior, path) {
			return function (p, v, nf) {
				if(prior) prior(p, v, nf);
	 
				path(p).min = path(p).valueList[0];

				return p;
			};
		},
		remove: function (prior, path) {
			return function (p, v, nf) {
				if(prior) prior(p, v, nf);

				// Check for undefined.
				if(path(p).valueList.length === 0) {
					path(p).min = undefined;
					return p;
				}
	 
				path(p).min = path(p).valueList[0];

				return p;
			};
		},
		initial: function (prior, path) {
			return function (p) {
				p = prior(p);
				path(p).min = undefined;
				return p;
			};
		}
	};

	var max = {
		add: function (prior, path) {
			return function (p, v, nf) {
				if(prior) prior(p, v, nf);
	 
				path(p).max = path(p).valueList[path(p).valueList.length - 1];

				return p;
			};
		},
		remove: function (prior, path) {
			return function (p, v, nf) {
				if(prior) prior(p, v, nf);

				// Check for undefined.
				if(path(p).valueList.length === 0) {
					path(p).max = undefined;
					return p;
				}
	 
				path(p).max = path(p).valueList[path(p).valueList.length - 1];

				return p;
			};
		},
		initial: function (prior, path) {
			return function (p) {
				p = prior(p);
				path(p).max = undefined;
				return p;
			};
		}
	};

	var value_count = {
		add: function (a, prior, path) {
			var i, curr;
			return function (p, v, nf) {
				if(prior) prior(p, v, nf);
				// Not sure if this is more efficient than sorting.
				i = path(p).bisect(path(p).values, a(v), 0, path(p).values.length);
				curr = path(p).values[i];
				if(curr && curr[0] === a(v)) {
					// Value already exists in the array - increment it
					curr[1]++;
				} else {
					// Value doesn't exist - add it in form [value, 1]
					path(p).values.splice(i, 0, [a(v), 1]);
				}
				return p;
			};
		},
		remove: function (a, prior, path) {
			var i;
			return function (p, v, nf) {
				if(prior) prior(p, v, nf);
				i = path(p).bisect(path(p).values, a(v), 0, path(p).values.length);
				// Value already exists or something has gone terribly wrong.
				path(p).values[i][1]--;
				return p;
			};
		},
		initial: function (prior, path) {
			return function (p) {
				p = prior(p);
				// Array[Array[value, count]]
				path(p).values = [];
				path(p).bisect = crossfilter.bisect.by(function(d) { return d[0]; }).left;
				return p;
			};
		}
	};

	var value_list = {
		add: function (a, prior, path) {
			var i;
			var bisect = crossfilter.bisect.by(function(d) { return d; }).left;
			return function (p, v, nf) {
				if(prior) prior(p, v, nf);
				// Not sure if this is more efficient than sorting.
				i = bisect(path(p).valueList, a(v), 0, path(p).valueList.length);
				path(p).valueList.splice(i, 0, a(v));
				return p;
			};
		},
		remove: function (a, prior, path) {
			var i;
			var bisect = crossfilter.bisect.by(function(d) { return d; }).left;
			return function (p, v, nf) {
				if(prior) prior(p, v, nf);
				i = bisect(path(p).valueList, a(v), 0, path(p).valueList.length);
				// Value already exists or something has gone terribly wrong.
				path(p).valueList.splice(i, 1);
				return p;
			};
		},
		initial: function (prior, path) {
			return function (p) {
				p = prior(p);
				path(p).valueList = [];
				return p;
			};
		}
	};

	var exception_count = {
		add: function (a, prior, path) {
			var i, curr;
			return function (p, v, nf) {
				if(prior) prior(p, v, nf);
				// Only count++ if the p.values array doesn't contain a(v) or if it's 0.
				i = path(p).bisect(path(p).values, a(v), 0, path(p).values.length);
				curr = path(p).values[i];
				if((!curr || curr[0] !== a(v)) || curr[1] === 0) {
					path(p).exceptionCount++;
				}
				return p;
			};
		},
		remove: function (a, prior, path) {
			var i, curr;
			return function (p, v, nf) {
				if(prior) prior(p, v, nf);
				// Only count-- if the p.values array contains a(v) value of 1.
				i = path(p).bisect(path(p).values, a(v), 0, path(p).values.length);
				curr = path(p).values[i];
				if(curr && curr[0] === a(v) && curr[1] === 1) {
					path(p).exceptionCount--;
				}
				return p;
			};
		},
		initial: function (prior, path) {
			return function (p) {
				p = prior(p);
				path(p).exceptionCount = 0;
				return p;
			};
		}
	};

	var exception_sum = {
		add: function (a, sum, prior, path) {
			var i, curr;
			return function (p, v, nf) {
				if(prior) prior(p, v, nf);
				// Only sum if the p.values array doesn't contain a(v) or if it's 0.
				i = path(p).bisect(path(p).values, a(v), 0, path(p).values.length);
				curr = path(p).values[i];
				if((!curr || curr[0] !== a(v)) || curr[1] === 0) {
					path(p).exceptionSum = path(p).exceptionSum + sum(v);
				}
				return p;
			};
		},
		remove: function (a, sum, prior, path) {
			var i, curr;
			return function (p, v, nf) {
				if(prior) prior(p, v, nf);
				// Only sum if the p.values array contains a(v) value of 1.
				i = path(p).bisect(path(p).values, a(v), 0, path(p).values.length);
				curr = path(p).values[i];
				if(curr && curr[0] === a(v) && curr[1] === 1) {
					path(p).exceptionSum = path(p).exceptionSum - sum(v);
				}
				return p;
			};
		},
		initial: function (prior, path) {
			return function (p) {
				p = prior(p);
				path(p).exceptionSum = 0;
				return p;
			};
		}
	};

	var histogram = {
		add: function (a, prior, path) {
			var bisect = crossfilter.bisect.by(function(d) { return d; }).left;
			var bisectHisto = crossfilter.bisect.by(function(d) { return d.x; }).right;
			var curr;
			return function (p, v, nf) {
				if(prior) prior(p, v, nf);
				curr = path(p).histogram[bisectHisto(path(p).histogram, a(v), 0, path(p).histogram.length) - 1];
				curr.y++;
				curr.splice(bisect(curr, a(v), 0, curr.length), 0, a(v));
				return p;
			};
		},
		remove: function (a, prior, path) {
			var bisect = crossfilter.bisect.by(function(d) { return d; }).left;
			var bisectHisto = crossfilter.bisect.by(function(d) { return d.x; }).right;
			var curr;
			return function (p, v, nf) {
				if(prior) prior(p, v, nf);
				curr = path(p).histogram[bisectHisto(path(p).histogram, a(v), 0, path(p).histogram.length) - 1];
				curr.y--;
				curr.splice(bisect(curr, a(v), 0, curr.length), 1);
				return p;
			};
		},
		initial: function (thresholds, prior, path) {
			return function (p) {
				p = prior(p);
				path(p).histogram = [];
				var arr = [];
				for(var i = 1; i < thresholds.length; i++) {
					arr = [];
					arr.x = thresholds[i - 1];
					arr.dx = (thresholds[i] - thresholds[i - 1]);
					arr.y = 0;
					path(p).histogram.push(arr);
				}
				return p;
			};
		}
	};

	var sum_of_sq = {
		add: function (a, prior, path) {
			return function (p, v, nf) {
				if(prior) prior(p, v, nf);
				path(p).sumOfSq = path(p).sumOfSq + a(v)*a(v);
				return p;
			};
		},
		remove: function (a, prior, path) {
			return function (p, v, nf) {
				if(prior) prior(p, v, nf);
				path(p).sumOfSq = path(p).sumOfSq - a(v)*a(v);
				return p;
			};
		},
		initial: function (prior, path) {
			return function (p) {
				p = prior(p);
				path(p).sumOfSq = 0;
				return p;
			};
		}
	};

	var std = {
		add: function (prior, path) {
			return function (p, v, nf) {
				if(prior) prior(p, v, nf);
				if(path(p).count > 0) {
					path(p).std = 0.0;
					var n = path(p).sumOfSq - path(p).sum*path(p).sum/path(p).count;
					if (n>0.0) path(p).std = Math.sqrt(n/(path(p).count-1));
				} else {
					path(p).std = 0.0;
				}
				return p;
			};
		},
		remove: function (prior, path) {
			return function (p, v, nf) {
				if(prior) prior(p, v, nf);
				if(path(p).count > 0) {
					path(p).std = 0.0;
					var n = path(p).sumOfSq - path(p).sum*path(p).sum/path(p).count;
					if (n>0.0) path(p).std = Math.sqrt(n/(path(p).count-1));
				} else {
					path(p).std = 0;
				}
				return p;
			};
		},
		initial: function (prior, path) {
			return function (p) {
				p = prior(p);
				path(p).std = 0;
				return p;
			};
		}
	};

	var nest = {
		add: function (keyAccessors, prior, path) {
			var arrRef;
			var newRef;
			return function (p, v, nf) {
				if(prior) prior(p, v, nf);

				arrRef = path(p).nest;
				keyAccessors.forEach(function(a) {
					newRef = arrRef.filter(function(d) { return d.key === a(v); })[0];
					if(newRef) {
						// There is another level.
						arrRef = newRef.values;
					} else {
						// Next level doesn't yet exist so we create it.
						newRef = [];
						arrRef.push({ key: a(v), values: newRef });
						arrRef = newRef;
					}
				});

				arrRef.push(v);
				
				return p;
			};
		},
		remove: function (keyAccessors, prior, path) {
			var arrRef;
			return function (p, v, nf) {
				if(prior) prior(p, v, nf);

				arrRef = path(p).nest;
				keyAccessors.forEach(function(a) {
					arrRef = arrRef.filter(function(d) { return d.key === a(v); })[0].values;
				});

				// Array contains an actual reference to the row, so just splice it out.
				arrRef.splice(arrRef.indexOf(v), 1);

				// If the leaf now has length 0 and it's not the base array remove it.
				// TODO

				return p;
			};
		},
		initial: function (prior, path) {
			return function (p) {
				p = prior(p);
				path(p).nest = [];
				return p;
			};
		}
	};

	var alias = {
		initial: function(prior, path, obj) {
			return function (p) {
				if(prior) p = prior(p);
				function buildAliasFunction(key){
					return function(){
						return obj[key](path(p));
					};
				}
				for(var prop in obj) {
					path(p)[prop] = buildAliasFunction(prop);
				}
				return p;
			};
		}
	};

	var alias_prop = {
		add: function (obj, prior, path) {
			return function (p, v, nf) {
				if(prior) prior(p, v, nf);
				for(var prop in obj) {
					path(p)[prop] = obj[prop](path(p),v);
				}
				return p;
			};
		}
	};

	var data_list = {
		add: function(a, prior, path) {
			return function (p, v, nf) {
				if(prior) prior(p, v, nf);
				path(p).dataList.push(v);
				return p;
			};
		},
		remove: function(a, prior, path) {
			return function (p, v, nf) {
				if(prior) prior(p, v, nf);
				path(p).dataList.splice(path(p).dataList.indexOf(v), 1);
				return p;
			};
		},
		initial: function(prior, path) {
			return function (p) {
				if(prior) p = prior(p);
				path(p).dataList = [];
				return p;
			};
		}
	};

	var custom = {
		add: function(prior, path, addFn) {
			return function (p, v, nf) {
				if(prior) prior(p, v, nf);
				return addFn(p, v);
			};
		},
		remove: function(prior, path, removeFn) {
			return function (p, v, nf) {
				if(prior) prior(p, v, nf);
				return removeFn(p, v);
			};
		},
		initial: function(prior, path, initialFn) {
			return function (p) {	
				if(prior) p = prior(p);
				return initialFn(p);
			};
		}
	};

	function build_function(p, f, path) {
		// We have to build these functions in order. Eventually we can include dependency
		// information and create a dependency graph if the process becomes complex enough.

		if(!path) path = function (d) { return d; };

		// Keep track of the original reducers so that filtering can skip back to
		// them if this particular value is filtered out.
		var origF = {
			reduceAdd: f.reduceAdd,
			reduceRemove: f.reduceRemove,
			reduceInitial: f.reduceInitial
		};

		if(p.count || p.std) {
	    f.reduceAdd = count.add(f.reduceAdd, path, p.count);
	    f.reduceRemove = count.remove(f.reduceRemove, path, p.count);
	    f.reduceInitial = count.initial(f.reduceInitial, path, p.count);
		}

		if(p.sum) {
			f.reduceAdd = sum.add(p.sum, f.reduceAdd, path);
			f.reduceRemove = sum.remove(p.sum, f.reduceRemove, path);
			f.reduceInitial = sum.initial(f.reduceInitial, path);
		}

		if(p.avg) {
			if(!p.count || !p.sum) {
				console.error("You must set .count(true) and define a .sum(accessor) to use .avg(true).");
			} else {
				f.reduceAdd = avg.add(p.sum, f.reduceAdd, path);
				f.reduceRemove = avg.remove(p.sum, f.reduceRemove, path);
				f.reduceInitial = avg.initial(f.reduceInitial, path);
			}
		}

		// The unique-only reducers come before the value_count reducers. They need to check if
		// the value is already in the values array on the group. They should only increment/decrement
		// counts if the value not in the array or the count on the value is 0.
		if(p.exceptionCount) {
			if(!p.exceptionAccessor) {
				console.error("You must define an .exception(accessor) to use .exceptionCount(true).");
			} else {
				f.reduceAdd = exception_count.add(p.exceptionAccessor, f.reduceAdd, path);
				f.reduceRemove = exception_count.remove(p.exceptionAccessor, f.reduceRemove, path);
				f.reduceInitial = exception_count.initial(f.reduceInitial, path);
			}
		}

		if(p.exceptionSum) {
			if(!p.exceptionAccessor) {
				console.error("You must define an .exception(accessor) to use .exceptionSum(accessor).");
			} else {
				f.reduceAdd = exception_sum.add(p.exceptionAccessor, p.exceptionSum, f.reduceAdd, path);
				f.reduceRemove = exception_sum.remove(p.exceptionAccessor, p.exceptionSum, f.reduceRemove, path);
				f.reduceInitial = exception_sum.initial(f.reduceInitial, path);
			}
		}

		// Maintain the values array.
		if(p.valueList || p.median || p.min || p.max) {
			f.reduceAdd = value_list.add(p.valueList, f.reduceAdd, path);
			f.reduceRemove = value_list.remove(p.valueList, f.reduceRemove, path);
			f.reduceInitial = value_list.initial(f.reduceInitial, path);
		}

		// Maintain the data array.
		if(p.dataList) {
			f.reduceAdd = data_list.add(p.dataList, f.reduceAdd, path);
			f.reduceRemove = data_list.remove(p.dataList, f.reduceRemove, path);
			f.reduceInitial = data_list.initial(f.reduceInitial, path);
		}

		if(p.median) {
			f.reduceAdd = median.add(f.reduceAdd, path);
			f.reduceRemove = median.remove(f.reduceRemove, path);
			f.reduceInitial = median.initial(f.reduceInitial, path);
		}

		if(p.min) {
			f.reduceAdd = min.add(f.reduceAdd, path);
			f.reduceRemove = min.remove(f.reduceRemove, path);
			f.reduceInitial = min.initial(f.reduceInitial, path);
		}

		if(p.max) {
			f.reduceAdd = max.add(f.reduceAdd, path);
			f.reduceRemove = max.remove(f.reduceRemove, path);
			f.reduceInitial = max.initial(f.reduceInitial, path);
		}

		// Maintain the values count array.
		if(p.exceptionAccessor) {
			f.reduceAdd = value_count.add(p.exceptionAccessor, f.reduceAdd, path);
			f.reduceRemove = value_count.remove(p.exceptionAccessor, f.reduceRemove, path);
			f.reduceInitial = value_count.initial(f.reduceInitial, path);
		}

		// Histogram
		if(p.histogramValue && p.histogramThresholds) {
			f.reduceAdd = histogram.add(p.histogramValue, f.reduceAdd, path);
			f.reduceRemove = histogram.remove(p.histogramValue, f.reduceRemove, path);
			f.reduceInitial = histogram.initial(p.histogramThresholds ,f.reduceInitial, path);
		}

		// Sum of Squares
		if(p.sumOfSquares) {
			f.reduceAdd = sum_of_sq.add(p.sumOfSquares, f.reduceAdd, path);
			f.reduceRemove = sum_of_sq.remove(p.sumOfSquares, f.reduceRemove, path);
			f.reduceInitial = sum_of_sq.initial(f.reduceInitial, path);
		}

		// Standard deviation
		if(p.std) {
			if(!p.sumOfSquares || !p.sum) {
				console.error("You must set .sumOfSq(accessor) and define a .sum(accessor) to use .std(true). Or use .std(accessor).");
			} else {
				f.reduceAdd = std.add(f.reduceAdd, path);
				f.reduceRemove = std.remove(f.reduceRemove, path);
				f.reduceInitial = std.initial(f.reduceInitial, path);
			}
		}

		// Custom reducer defined by 3 functions : add, remove, initial
		if (p.custom) {
			f.reduceAdd = custom.add(f.reduceAdd, path, p.custom.add);
			f.reduceRemove = custom.remove(f.reduceRemove, path, p.custom.remove);
			f.reduceInitial = custom.initial(f.reduceInitial, path, p.custom.initial);
		}

		// Nesting
		if(p.nestKeys) {
			f.reduceAdd = nest.add(p.nestKeys, f.reduceAdd, path);
			f.reduceRemove = nest.remove(p.nestKeys, f.reduceRemove, path);
			f.reduceInitial = nest.initial(f.reduceInitial, path);
		}

		// Alias functions
		if(p.aliasKeys) {
			f.reduceInitial = alias.initial(f.reduceInitial, path, p.aliasKeys);
		}

		// Alias properties - this is less efficient than alias functions
		if(p.aliasPropKeys) {
			f.reduceAdd = alias_prop.add(p.aliasPropKeys, f.reduceAdd, path);
			// This isn't a typo. The function is the same for add/remove.
			f.reduceRemove = alias_prop.add(p.aliasPropKeys, f.reduceRemove, path);
		}

		// Filters determine if our built-up priors should run, or if it should skip
		// back to the filters given at the beginning of this build function.
		if (p.filter) {
			f.reduceAdd = filter.add(p.filter, f.reduceAdd, origF.reduceAdd, path);
			f.reduceRemove = filter.remove(p.filter, f.reduceRemove, origF.reduceRemove, path);
		}

		// Values go last.
		if(p.values) {
			Object.getOwnPropertyNames(p.values).forEach(function(n) {
				// Set up the path on each group.
				var setupPath = function(prior) {
					return function (p) {
						p = prior(p);
						path(p)[n] = {};
						return p;
					};
				};
				f.reduceInitial = setupPath(f.reduceInitial);
				build_function(p.values[n].parameters, f, function (p) { return p[n]; });
			});
		}
	}

	var build = {
		build: build_function
	};

	var parameters = function() {
		return {
			order: false,
			avg: false,
			count: false,
			sum: false,
			exceptionAccessor: false,
			exceptionCount: false,
			exceptionSum: false,
			filter: false,
			valueList: false,
			median: false,
			histogramValue: false,
			min: false,
			max: false,
			histogramThresholds: false,
			std: false,
			sumOfSquares: false,
			values: false,
			nestKeys: false,
			aliasKeys: false,
			aliasPropKeys: false,
			groupAll: false,
			dataList: false,
			custom: false
		};
	};

	function assign(target) {
		if (target == null) {
			throw new TypeError('Cannot convert undefined or null to object');
		}

		var output = Object(target);
		for (var index = 1; index < arguments.length; ++index) {
			var source = arguments[index];
			if (source != null) {
				for (var nextKey in source) {
					if(source.hasOwnProperty(nextKey)) {
						output[nextKey] = source[nextKey];
					}
				}
			}
		}
		return output;
	}

	function accessor_build(obj, p) {
		// obj.order = function(value) {
		// 	if (!arguments.length) return p.order;
		// 	p.order = value;
		// 	return obj;
		// };

		// Converts a string to an accessor function
		function accessorify(v) {
			if( typeof v === 'string' ) {
				// Rewrite to a function
				var tempValue = v;
				var func = function (d) { return d[tempValue]; };
				return func;
			} else {
				return v;
			}
		}

		// Converts a string to an accessor function
		function accessorifyNumeric(v) {
			if( typeof v === 'string' ) {
				// Rewrite to a function
				var tempValue = v;
				var func = function (d) { return +d[tempValue]; };
				return func;
			} else {
				return v;
			}
		}

		obj.fromObject = function(value) {
			if(!arguments.length) return p;
			assign(p, value);
			return obj;
		};

		obj.toObject = function() {
			return p;
		};

		obj.count = function(value, propName) {
			if (!arguments.length) return p.count;
	    if (!propName) {
	      propName = 'count';
	    }
			p.count = propName;
			return obj;
		};

		obj.sum = function(value) {
			if (!arguments.length) return p.sum;

			value = accessorifyNumeric(value);

			p.sum = value;
			return obj;
		};

		obj.avg = function(value) {
			if (!arguments.length) return p.avg;

			value = accessorifyNumeric(value);

			// We can take an accessor function, a boolean, or a string
			if( typeof value === 'function' ) {
				if(p.sum && p.sum !== value) console.warn('SUM aggregation is being overwritten by AVG aggregation');
				p.sum = value;
				p.avg = true;
				p.count = 'count';
			} else {
				p.avg = value;
			}
			return obj;
		};

		obj.exception = function(value) {
			if (!arguments.length) return p.exceptionAccessor;

			value = accessorify(value);

			p.exceptionAccessor = value;
			return obj;
		};

		obj.filter = function(value) {
			if (!arguments.length) return p.filter;
			p.filter = value;
			return obj;
		};

		obj.valueList = function(value) {
			if (!arguments.length) return p.valueList;

			value = accessorify(value);

			p.valueList = value;
			return obj;
		};

		obj.median = function(value) {
			if (!arguments.length) return p.median;

			value = accessorifyNumeric(value);

			if(typeof value === 'function') {
				if(p.valueList && p.valueList !== value) console.warn('VALUELIST accessor is being overwritten by median aggregation');
				p.valueList = value;
			}
			p.median = value;
			return obj;
		};

		obj.min = function(value) {
			if (!arguments.length) return p.min;

			value = accessorifyNumeric(value);

			if(typeof value === 'function') {
				if(p.valueList && p.valueList !== value) console.warn('VALUELIST accessor is being overwritten by min aggregation');
				p.valueList = value;
			}
			p.min = value;
			return obj;
		};

		obj.max = function(value) {
			if (!arguments.length) return p.max;

			value = accessorifyNumeric(value);

			if(typeof value === 'function') {
				if(p.valueList && p.valueList !== value) console.warn('VALUELIST accessor is being overwritten by max aggregation');
				p.valueList = value;
			}
			p.max = value;
			return obj;
		};

		obj.exceptionCount = function(value) {
			if (!arguments.length) return p.exceptionCount;

			value = accessorify(value);

			if( typeof value === 'function' ) {
				if(p.exceptionAccessor && p.exceptionAccessor !== value) console.warn('EXCEPTION accessor is being overwritten by exception count aggregation');
				p.exceptionAccessor = value;
				p.exceptionCount = true;
			} else {
				p.exceptionCount = value;
			}
			return obj;
		};

		obj.exceptionSum = function(value) {
			if (!arguments.length) return p.exceptionSum;

			value = accessorifyNumeric(value);

			p.exceptionSum = value;
			return obj;
		};

		obj.histogramValue = function(value) {
			if (!arguments.length) return p.histogramValue;

			value = accessorifyNumeric(value);

			p.histogramValue = value;
			return obj;
		};

		obj.histogramBins = function(value) {
			if (!arguments.length) return p.histogramThresholds;
			p.histogramThresholds = value;
			return obj;
		};

		obj.std = function(value) {
			if (!arguments.length) return p.std;

			value = accessorifyNumeric(value);

			if(typeof(value) === 'function') {
				p.sumOfSquares = value;
				p.sum = value;
				p.count = 'count';
				p.std = true;
			} else {
				p.std = value;
			}
			return obj;
		};

		obj.sumOfSq = function(value) {
			if (!arguments.length) return p.sumOfSquares;

			value = accessorifyNumeric(value);

			p.sumOfSquares = value;
			return obj;
		};

		obj.value = function(value, accessor) {
			if (!arguments.length || typeof value !== 'string' ) {
				console.error("'value' requires a string argument.");
			} else {
				if(!p.values) p.values = {};
				p.values[value] = {};
				p.values[value].parameters = parameters();
				accessor_build(p.values[value], p.values[value].parameters);
				if(accessor) p.values[value].accessor = accessor;
				return p.values[value];
			}
		};

		obj.nest = function(keyAccessorArray) {
			if(!arguments.length) return p.nestKeys;

			keyAccessorArray.map(accessorify);

			p.nestKeys = keyAccessorArray;
			return obj;
		};

		obj.alias = function(propAccessorObj) {
			if(!arguments.length) return p.aliasKeys;
			p.aliasKeys = propAccessorObj;
			return obj;
		};

		obj.aliasProp = function(propAccessorObj) {
			if(!arguments.length) return p.aliasPropKeys;
			p.aliasPropKeys = propAccessorObj;
			return obj;
		};

		obj.groupAll = function(groupTest) {
			if(!arguments.length) return p.groupAll;
			p.groupAll = groupTest;
			return obj;
		};

		obj.dataList = function(value) {
			if (!arguments.length) return p.dataList;
			p.dataList = value;
			return obj;
		};

		obj.custom = function(addRemoveInitialObj) {
			if (!arguments.length) return p.custom;
			p.custom = addRemoveInitialObj;
			return obj;
		};

	}

	var accessors = {
		build: accessor_build
	};

	function postProcess(reductio) {
	    return function (group, p, f) {
	        group.post = function(){
	            var postprocess = function () {
	                return postprocess.all();
	            };
	            postprocess.all = function () {
	                return group.all();
	            };
	            var postprocessors = reductio.postprocessors;
	            Object.keys(postprocessors).forEach(function (name) {
	                postprocess[name] = function () {
	                    var _all = postprocess.all;
	                    var args = [].slice.call(arguments);
	                    postprocess.all = function () {
	                        return postprocessors[name](_all, f, p).apply(null, args);
	                    };
	                    return postprocess;
	                };
	            });
	            return postprocess;
	        };
	    };
	}

	var pluck = function(n){
	    return function(d){
	        return d[n];
	    };
	};

	// supported operators are sum, avg, and count
	const _grouper = function(path, prior){
	    if(!path) path = function(d){return d;};
	    return function(p, v){
	        if(prior) prior(p, v);
	        var x = path(p), y = path(v);
	        if(typeof y.count !== 'undefined') x.count += y.count;
	        if(typeof y.sum !== 'undefined') x.sum += y.sum;
	        if(typeof y.avg !== 'undefined') x.avg = x.sum/x.count;
	        return p;
	    };
	};

	const cap = function (prior, f, p) {
	    var obj = f.reduceInitial();
	    // we want to support values so we'll need to know what those are
	    var values = p.values ? Object.keys(p.values) : [];
	    var _othersGrouper = _grouper();
	    if (values.length) {
	        for (var i = 0; i < values.length; ++i) {
	            _othersGrouper = _grouper(pluck(values[i]), _othersGrouper);
	        }
	    }
	    return function (cap, othersName) {
	        if (!arguments.length) return prior();
	        if( cap === Infinity || !cap ) return prior();
	        var all = prior();
	        var slice_idx = cap-1;
	        if(all.length <= cap) return all;
	        var data = all.slice(0, slice_idx);
	        var others = {key: othersName || 'Others'};
	        others.value = f.reduceInitial();
	        for (var i = slice_idx; i < all.length; ++i) {
	            _othersGrouper(others.value, all[i].value);
	        }
	        data.push(others);
	        return data;
	    };
	};

	var pluck_n = function (n) {
	    if (typeof n === 'function') {
	        return n;
	    }
	    if (~n.indexOf('.')) {
	        var split = n.split('.');
	        return function (d) {
	            return split.reduce(function (p, v) {
	                return p[v];
	            }, d);
	        };
	    }
	    return function (d) {
	        return d[n];
	    };
	};

	function ascending(a, b) {
	    return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
	}

	var comparer = function (accessor, ordering) {
	    return function (a, b) {
	        return ordering(accessor(a), accessor(b));
	    };
	};

	function sortBy (prior) {
	    return function (value, order) {
	        if (arguments.length === 1) {
	            order = ascending;
	        }
	        return prior().sort(comparer(pluck_n(value), order));
	    };
	}

	function postprocessors(reductio){
	    reductio.postprocessors = {};
	    reductio.registerPostProcessor = function(name, func){
	        reductio.postprocessors[name] = func;
	    };

	    reductio.registerPostProcessor('cap', cap);
	    reductio.registerPostProcessor('sortBy', sortBy);
	}

	function reductio() {
		var parameters$1 = parameters();

		var funcs = {};

		function my(group) {
			// Start fresh each time.
			funcs = {
				reduceAdd: function(p) { return p; },
				reduceRemove: function(p) { return p; },
				reduceInitial: function () { return {}; },
			};

			build.build(parameters$1, funcs);

			// If we're doing groupAll
			if(parameters$1.groupAll) {
				if(group.top) {
					console.warn("'groupAll' is defined but attempting to run on a standard dimension.group(). Must run on dimension.groupAll().");
				} else {
					var bisect = crossfilter.bisect.by(function(d) { return d.key; }).left;
					var i, j;
					var keys;
	        var keysLength;
	        var k; // Key
					group.reduce(
						function(p, v, nf) {
							keys = parameters$1.groupAll(v);
	            keysLength = keys.length;
	            for(j=0;j<keysLength;j++) {
	              k = keys[j];
	              i = bisect(p, k, 0, p.length);
								if(!p[i] || p[i].key !== k) {
									// If the group doesn't yet exist, create it first.
									p.splice(i, 0, { key: k, value: funcs.reduceInitial() });
								}

								// Then pass the record and the group value to the reducers
								funcs.reduceAdd(p[i].value, v, nf);
	            }
							return p;
						},
						function(p, v, nf) {
							keys = parameters$1.groupAll(v);
	            keysLength = keys.length;
	            for(j=0;j<keysLength;j++) {
	              i = bisect(p, keys[j], 0, p.length);
								// The group should exist or we're in trouble!
								// Then pass the record and the group value to the reducers
								funcs.reduceRemove(p[i].value, v, nf);
	            }
							return p;
						},
						function() {
							return [];
						}
					);
					if(!group.all) {
						// Add an 'all' method for compatibility with standard Crossfilter groups.
						group.all = function() { return this.value(); };
					}
				}
			} else {
				group.reduce(funcs.reduceAdd, funcs.reduceRemove, funcs.reduceInitial);
			}

			postprocessed(group, parameters$1, funcs);

			return group;
		}

		accessors.build(my, parameters$1);

		return my;
	}

	postprocessors(reductio);
	const postprocessed = postProcess(reductio);

	return reductio;

})));
