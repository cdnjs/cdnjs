!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.reductio=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
var reductio_avg = {
	add: function (a, prior) {
		return function (p, v) {
			if(prior) prior(p, v);
			if(p.count > 0) {
				p.avg = p.sum / p.count;
			} else {
				p.avg = 0;
			}
			return p;
		};
	},
	remove: function (a, prior) {
		return function (p, v) {
			if(prior) prior(p, v);
			if(p.count > 0) {
				p.avg = p.sum / p.count;
			} else {
				p.avg = 0;
			}
			return p;
		};
	},
	initial: function (prior) {
		return function (p) {
			p = prior(p);
			p.avg = 0;
			return p;
		};
	}
};

module.exports = reductio_avg;
},{}],2:[function(_dereq_,module,exports){
var reductio_count = {
	add: function (p, v) {
		p.count++;
		return p;
	},
	remove: function (p, v) {
		p.count--;
		return p;
	},
	initial: function (p) {
		if(p === undefined) p = {};
		p.count = 0;
		return p;
	}
};

module.exports = reductio_count;
},{}],3:[function(_dereq_,module,exports){
var reductio_exception_count = {
	add: function (a, prior) {
		var i, curr;
		return function (p, v) {
			if(prior) prior(p, v);
			// Only count++ if the p.values array doesn't contain a(v) or if it's 0.
			i = p.bisect(p.values, a(v), 0, p.values.length);
			curr = p.values[i];
			if((!curr || curr[0] !== a(v)) || curr[1] === 0) {
				p.exceptionCount++;
			}
			return p;
		};
	},
	remove: function (a, prior) {
		var i, curr;
		return function (p, v) {
			if(prior) prior(p, v);
			// Only count-- if the p.values array contains a(v) value of 1.
			i = p.bisect(p.values, a(v), 0, p.values.length);
			curr = p.values[i];
			if(curr && curr[0] === a(v) && curr[1] === 1) {
				p.exceptionCount--;
			}
			return p;
		};
	},
	initial: function (prior) {
		return function (p) {
			p = prior(p);
			p.exceptionCount = 0;
			return p;
		};
	}
};

module.exports = reductio_exception_count;
},{}],4:[function(_dereq_,module,exports){
var reductio_exception_sum = {
	add: function (a, sum, prior) {
		var i, curr;
		return function (p, v) {
			if(prior) prior(p, v);
			// Only sum if the p.values array doesn't contain a(v) or if it's 0.
			i = p.bisect(p.values, a(v), 0, p.values.length);
			curr = p.values[i];
			if((!curr || curr[0] !== a(v)) || curr[1] === 0) {
				p.exceptionSum = p.exceptionSum + sum(v);
			}
			return p;
		};
	},
	remove: function (a, sum, prior) {
		var i, curr;
		return function (p, v) {
			if(prior) prior(p, v);
			// Only sum if the p.values array contains a(v) value of 1.
			i = p.bisect(p.values, a(v), 0, p.values.length);
			curr = p.values[i];
			if(curr && curr[0] === a(v) && curr[1] === 1) {
				p.exceptionSum = p.exceptionSum - sum(v);
			}
			return p;
		};
	},
	initial: function (prior) {
		return function (p) {
			p = prior(p);
			p.exceptionSum = 0;
			return p;
		};
	}
};

module.exports = reductio_exception_sum;
},{}],5:[function(_dereq_,module,exports){
var reductio_histogram = {
	add: function (a, prior) {
		var bisect = crossfilter.bisect.by(function(d) { return d; }).left;
		var bisectHisto = crossfilter.bisect.by(function(d) { return d.x; }).right;
		var curr, i;
		return function (p, v) {
			if(prior) prior(p, v);
			curr = p.histogram[bisectHisto(p.histogram, a(v), 0, p.histogram.length) - 1];
			curr.y++;
			curr.splice(bisect(curr, a(v), 0, curr.length), 0, a(v));
			return p;
		};
	},
	remove: function (a, prior) {
		var bisect = crossfilter.bisect.by(function(d) { return d; }).left;
		var bisectHisto = crossfilter.bisect.by(function(d) { return d.x; }).right;
		var curr;
		return function (p, v) {
			if(prior) prior(p, v);
			curr = p.histogram[bisectHisto(p.histogram, a(v), 0, p.histogram.length) - 1];
			curr.y--;
			curr.splice(bisect(curr, a(v), 0, curr.length), 1);
			return p;
		};
	},
	initial: function (thresholds, prior) {
		return function (p) {
			p = prior(p);
			p.histogram = [];
			var arr = [];
			for(var i = 1; i < thresholds.length; i++) {
				arr = [];
				arr.x = thresholds[i - 1];
				arr.dx = (thresholds[i] - thresholds[i - 1]);
				arr.y = 0;
				p.histogram.push(arr);
			}
			return p;
		};
	}
};

module.exports = reductio_histogram;
},{}],6:[function(_dereq_,module,exports){
var reductio_max = {
	add: function (prior) {
		return function (p, v) {
			if(prior) prior(p, v);
 
			p.max = p.valueList[p.valueList.length - 1];

			return p;
		};
	},
	remove: function (prior) {
		return function (p, v) {
			if(prior) prior(p, v);

			// Check for undefined.
			if(p.valueList.length === 0) {
				p.max = undefined;
				return p;
			}
 
			p.max = p.valueList[p.valueList.length - 1];

			return p;
		};
	},
	initial: function (prior) {
		return function (p) {
			p = prior(p);
			p.max = undefined;
			return p;
		};
	}
};

module.exports = reductio_max;
},{}],7:[function(_dereq_,module,exports){
var reductio_median = {
	add: function (prior) {
		var half;
		return function (p, v) {
			if(prior) prior(p, v);

			half = Math.floor(p.valueList.length/2);
 
			if(p.valueList.length % 2) {
				p.median = p.valueList[half];
			} else {
				p.median = (p.valueList[half-1] + p.valueList[half]) / 2.0;
			}

			return p;
		};
	},
	remove: function (prior) {
		var half;
		return function (p, v) {
			if(prior) prior(p, v);

			half = Math.floor(p.valueList.length/2);

			// Check for undefined.
			if(p.valueList.length === 0) {
				p.median = undefined;
				return p;
			}
 
			if(p.valueList.length === 1 || p.valueList.length % 2) {
				p.median = p.valueList[half];
			} else {
				p.median = (p.valueList[half-1] + p.valueList[half]) / 2.0;
			}

			return p;
		};
	},
	initial: function (prior) {
		return function (p) {
			p = prior(p);
			p.median = undefined;
			return p;
		};
	}
};

module.exports = reductio_median;
},{}],8:[function(_dereq_,module,exports){
var reductio_min = {
	add: function (prior) {
		return function (p, v) {
			if(prior) prior(p, v);
 
			p.min = p.valueList[0];

			return p;
		};
	},
	remove: function (prior) {
		return function (p, v) {
			if(prior) prior(p, v);

			// Check for undefined.
			if(p.valueList.length === 0) {
				p.min = undefined;
				return p;
			}
 
			p.min = p.valueList[0];

			return p;
		};
	},
	initial: function (prior) {
		return function (p) {
			p = prior(p);
			p.min = undefined;
			return p;
		};
	}
};

module.exports = reductio_min;
},{}],9:[function(_dereq_,module,exports){
reductio_count = _dereq_('./count.js');
reductio_sum = _dereq_('./sum.js');
reductio_avg = _dereq_('./avg.js');
reductio_median = _dereq_('./median.js');
reductio_min = _dereq_('./min.js');
reductio_max = _dereq_('./max.js');
reductio_value_count = _dereq_('./value-count.js');
reductio_value_list = _dereq_('./value-list.js');
reductio_exception_count = _dereq_('./exception-count.js');
reductio_exception_sum = _dereq_('./exception-sum.js');
reductio_histogram = _dereq_('./histogram.js');

function reductio() {
	var order, avg, count, sum, exceptionAccessor, exceptionCount,
		exceptionSum, valueList, median, histogramValue, min, max,
		histogramThresholds,
		reduceAdd, reduceRemove, reduceInitial;

	reduceAdd = function(p, v) { return p; };
	reduceAdd = function(p, v) { return p; };
	reduceInitial = function () { return {}; };

	function my(group) {
		buildFunctions();

		group.reduce(reduceAdd, reduceRemove, reduceInitial);

		return group;
	}

	function buildFunctions() {

		// We have to build these functions in order. Eventually we can include dependency
		// information and create a dependency graph if the process becomes complex enough.

		if(count) {
			reduceAdd = reductio_count.add;
			reduceRemove = reductio_count.remove;
			reduceInitial = reductio_count.initial;
		}

		if(sum) {
			reduceAdd = reductio_sum.add(sum, reduceAdd);
			reduceRemove = reductio_sum.remove(sum, reduceRemove);
			reduceInitial = reductio_sum.initial(reduceInitial);
		}

		if(avg) {
			if(!count | !sum) {
				console.error("You must set .count(true) and define a .sum(accessor) to use .avg(true).");
			} else {
				reduceAdd = reductio_avg.add(sum, reduceAdd);
				reduceRemove = reductio_avg.remove(sum, reduceRemove);
				reduceInitial = reductio_avg.initial(reduceInitial);
			}
		}

		// The unique-only reducers come before the value_count reducers. They need to check if
		// the value is already in the values array on the group. They should only increment/decrement
		// counts if the value not in the array or the count on the value is 0.
		if(exceptionCount) {
			if(!exceptionAccessor) {
				console.error("You must define an .exception(accessor) to use .exceptionCount(true).");
			} else {
				reduceAdd = reductio_exception_count.add(exceptionAccessor, reduceAdd);
				reduceRemove = reductio_exception_count.remove(exceptionAccessor, reduceRemove);
				reduceInitial = reductio_exception_count.initial(reduceInitial);
			}
		}

		if(exceptionSum) {
			if(!exceptionAccessor) {
				console.error("You must define an .exception(accessor) to use .exceptionSum(accessor).");
			} else {
				reduceAdd = reductio_exception_sum.add(exceptionAccessor, exceptionSum, reduceAdd);
				reduceRemove = reductio_exception_sum.remove(exceptionAccessor, exceptionSum, reduceRemove);
				reduceInitial = reductio_exception_sum.initial(reduceInitial);
			}
		}

		// Maintain the values array.
		if(valueList || median || min || max) {
			reduceAdd = reductio_value_list.add(valueList, reduceAdd);
			reduceRemove = reductio_value_list.remove(valueList, reduceRemove);
			reduceInitial = reductio_value_list.initial(reduceInitial);
		}

		if(median) {
			reduceAdd = reductio_median.add(reduceAdd);
			reduceRemove = reductio_median.remove(reduceRemove);
			reduceInitial = reductio_median.initial(reduceInitial);
		}

		if(min) {
			reduceAdd = reductio_min.add(reduceAdd);
			reduceRemove = reductio_min.remove(reduceRemove);
			reduceInitial = reductio_min.initial(reduceInitial);
		}

		if(max) {
			reduceAdd = reductio_max.add(reduceAdd);
			reduceRemove = reductio_max.remove(reduceRemove);
			reduceInitial = reductio_max.initial(reduceInitial);
		}

		// Maintain the values count array.
		if(exceptionAccessor) {
			reduceAdd = reductio_value_count.add(exceptionAccessor, reduceAdd);
			reduceRemove = reductio_value_count.remove(exceptionAccessor, reduceRemove);
			reduceInitial = reductio_value_count.initial(reduceInitial);
		}

		// Histogram
		if(histogramValue && histogramThresholds) {
			reduceAdd = reductio_histogram.add(histogramValue, reduceAdd);
			reduceRemove = reductio_histogram.remove(histogramValue, reduceRemove);
			reduceInitial = reductio_histogram.initial(histogramThresholds ,reduceInitial);
		}
	}

	my.order = function(value) {
		if (!arguments.length) return order;
		order = value;
		return my;
	};

	my.count = function(value) {
		if (!arguments.length) return count;
		count = value;
		return my;
	};

	my.sum = function(value) {
		if (!arguments.length) return sum;
		sum = value;
		return my;
	};

	my.avg = function(value) {
		if (!arguments.length) return avg;
		// We can take either an accessor function or a boolean
		if( typeof value === 'function' ) {
			if(sum) console.warn('SUM aggregation is being overwritten by AVG aggregation');
			sum = value;
			avg = true;
			count = true;
		} else {
			avg = value;
		}
		return my;
	};

	my.exception = function(value) {
		if (!arguments.length) return exceptionAccessor;
		exceptionAccessor = value;
		return my;
	};

	my.valueList = function(value) {
		if (!arguments.length) return valueList;
		valueList = value;
		return my;
	};

	my.median = function(value) {
		if (!arguments.length) return median;
		if(valueList) console.warn('VALUELIST accessor is being overwritten by median aggregation');
		valueList = value;
		median = value;
		return my;
	};

	my.min = function(value) {
		if (!arguments.length) return min;
		if(valueList) console.warn('VALUELIST accessor is being overwritten by min aggregation');
		valueList = value;
		min = value;
		return my;
	};

	my.max = function(value) {
		if (!arguments.length) return max;
		if(valueList) console.warn('VALUELIST accessor is being overwritten by max aggregation');
		valueList = value;
		max = value;
		return my;
	};

	my.exceptionCount = function(value) {
		if (!arguments.length) return exceptionCount;
		if( typeof value === 'function' ) {
			if(sum) console.warn('EXCEPTION accessor is being overwritten by exception count aggregation');
			exceptionAccessor = value;
			exceptionCount = true;
		} else {
			exceptionCount = value;
		}
		return my;
	};

	my.exceptionSum = function(value) {
		if (!arguments.length) return exceptionSum;
		exceptionSum = value;
		return my;
	};

	my.histogramValue = function(value) {
		if (!arguments.length) return histogramValue;
		histogramValue = value;
		return my;
	};

	my.histogramBins = function(value) {
		if (!arguments.length) return histogramThresholds;
		histogramThresholds = value;
		return my;
	};

	return my;
}

module.exports = reductio;
},{"./avg.js":1,"./count.js":2,"./exception-count.js":3,"./exception-sum.js":4,"./histogram.js":5,"./max.js":6,"./median.js":7,"./min.js":8,"./sum.js":10,"./value-count.js":11,"./value-list.js":12}],10:[function(_dereq_,module,exports){
var reductio_sum = {
	add: function (a, prior) {
		return function (p, v) {
			if(prior) prior(p, v);
			p.sum = p.sum + a(v);
			return p;
		};
	},
	remove: function (a, prior) {
		return function (p, v) {
			if(prior) prior(p, v);
			p.sum = p.sum - a(v);
			return p;
		};
	},
	initial: function (prior) {
		return function (p) {
			p = prior(p);
			p.sum = 0;
			return p;
		};
	}
};

module.exports = reductio_sum;
},{}],11:[function(_dereq_,module,exports){
var reductio_value_count = {
	add: function (a, prior) {
		var i, curr;
		return function (p, v) {
			if(prior) prior(p, v);
			// Not sure if this is more efficient than sorting.
			i = p.bisect(p.values, a(v), 0, p.values.length);
			curr = p.values[i];
			if(curr && curr[0] === a(v)) {
				// Value already exists in the array - increment it
				curr[1]++;
			} else {
				// Value doesn't exist - add it in form [value, 1]
				p.values.splice(i, 0, [a(v), 1]);
			}
			return p;
		};
	},
	remove: function (a, prior) {
		var i;
		return function (p, v) {
			if(prior) prior(p, v);
			i = p.bisect(p.values, a(v), 0, p.values.length);
			// Value already exists or something has gone terribly wrong.
			p.values[i][1]--;
			return p;
		};
	},
	initial: function (prior) {
		return function (p) {
			p = prior(p);
			// Array[Array[value, count]]
			p.values = [];
			p.bisect = crossfilter.bisect.by(function(d) { return d[0]; }).left;
			return p;
		};
	}
};

module.exports = reductio_value_count;
},{}],12:[function(_dereq_,module,exports){
var reductio_value_list = {
	add: function (a, prior) {
		var i;
		var bisect = crossfilter.bisect.by(function(d) { return d; }).left;
		return function (p, v) {
			if(prior) prior(p, v);
			// Not sure if this is more efficient than sorting.
			i = bisect(p.valueList, a(v), 0, p.valueList.length);
			p.valueList.splice(i, 0, a(v));
			return p;
		};
	},
	remove: function (a, prior) {
		var i;
		var bisect = crossfilter.bisect.by(function(d) { return d; }).left;
		return function (p, v) {
			if(prior) prior(p, v);
			i = bisect(p.valueList, a(v), 0, p.valueList.length);
			// Value already exists or something has gone terribly wrong.
			p.valueList.splice(i, 1);
			return p;
		};
	},
	initial: function (prior) {
		return function (p) {
			p = prior(p);
			p.valueList = [];
			return p;
		};
	}
};

module.exports = reductio_value_list;
},{}]},{},[9])
(9)
});