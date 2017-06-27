////////////////////////////////////////////////////////////////////////////////////
//
//  prettycron.js
//  Generates human-readable sentences from a schedule string in cron format
//
//  Based on an earlier version by Pehr Johansson
//  http://dsysadm.blogspot.com.au/2012/09/human-readable-cron-expressions-using.html
//
////////////////////////////////////////////////////////////////////////////////////
//  This program is free software: you can redistribute it and/or modify
//  it under the terms of the GNU Lesser General Public License as published
//  by the Free Software Foundation, either version 3 of the License, or
//  (at your option) any later version.
//
//  This program is distributed in the hope that it will be useful,
//  but WITHOUT ANY WARRANTY; without even the implied warranty of
//  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//  GNU Lesser General Public License for more details.
//
//  You should have received a copy of the GNU Lesser General Public License
//  along with this program.  If not, see <http://www.gnu.org/licenses/>.
////////////////////////////////////////////////////////////////////////////////////

if ((!moment || !later) && (typeof require !== 'undefined')) {
  var moment = require('moment');
  var later = require('later');
}

(function() {

  /*
   * For an array of numbers, e.g. a list of hours in a schedule,
   * return a string listing out all of the values (complete with
   * "and" plus ordinal text on the last item).
   */
  var numberList = function(numbers) {
    if (numbers.length < 2) {
      return moment()._locale.ordinal(numbers);
    }

    var last_val = numbers.pop();
    return numbers.join(', ') + ' and ' + moment()._locale.ordinal(last_val);
  };

  var stepSize = function(numbers) {
    if( !numbers || numbers.length <= 1 ) return 0;

    var expectedStep = numbers[1] - numbers[0];
    if( numbers.length == 2 ) return expectedStep;

    // Check that every number is the previous number + the first number
    return numbers.slice(1).every(function(n,i,a){
      return (i === 0 ? n : n-a[i-1]) === expectedStep;
    }) ? expectedStep : 0;
  };

  var isEveryOther = function(stepsize, numbers) {
    return numbers.length === 30 && stepsize === 2;
  };
  var isTwicePerHour = function(stepsize, numbers) {
    return numbers.length === 2 && stepsize === 30;
  };
  var isOnTheHour = function(numbers) {
    return numbers.length === 1 && numbers[0] === 0;
  };
  var isStepValue = function(stepsize, numbers) {
    // Value with slash (https://en.wikipedia.org/wiki/Cron#Non-Standard_Characters)
    return numbers.length > 2 && stepsize > 0;
  };
  /*
   * For an array of numbers of seconds, return a string
   * listing all the values unless they represent a frequency divisible by 60:
   * /2, /3, /4, /5, /6, /10, /12, /15, /20 and /30
   */
  var getMinutesTextParts = function(numbers) {
    var stepsize = stepSize(numbers);
    if(!numbers) {
      return { beginning: 'minute', text: '' };
    }

    var minutes = { beginning: '', text: '' };
    if( isOnTheHour( numbers ) ) {
      minutes.text = 'hour, on the hour';
    } else if( isEveryOther( stepsize, numbers ) ) {
      minutes.beginning = 'other minute';
    } else if( isStepValue( stepsize, numbers ) ) {
      minutes.text = stepsize + ' minutes';
    } else if( isTwicePerHour( stepsize, numbers ) ) {
      minutes.text = 'first and 30th minute';
    } else {
      minutes.text = numberList(numbers) + ' minute';
    }
    return minutes;
  };
  /*
   * For an array of numbers of seconds, return a string
   * listing all the values unless they represent a frequency divisible by 60:
   * /2, /3, /4, /5, /6, /10, /12, /15, /20 and /30
   */
  var getSecondsTextParts = function(numbers) {
    var stepsize = stepSize(numbers);
    if( !numbers ) {
      return { beginning: 'second', text: '' };
    }
    if( isEveryOther( stepsize, numbers ) ) {
      return { beginning: '', text: 'other second' };
    } else if( isStepValue( stepsize, numbers ) ) {
      return { beginning: '', text: stepsize + ' seconds' };
    } else {
      return { beginning: 'minute', text: 'starting on the ' + (numbers.length === 2 && stepsize === 30 ? 'first and 30th second' : numberList(numbers) + ' second') };
    }
  };

  /*
   * Parse a number into day of week, or a month name;
   * used in dateList below.
   */
  var numberToDateName = function(value, type) {
    if (type === 'dow') {
      return moment().day(value - 1).format('ddd');
    } else if (type === 'mon') {
      return moment().month(value - 1).format('MMM');
    }
  };

  /*
   * From an array of numbers corresponding to dates (given in type: either
   * days of the week, or months), return a string listing all the values.
   */
  var dateList = function(numbers, type) {
    if (numbers.length < 2) {
      return numberToDateName(''+numbers[0], type);
    }

    var last_val = '' + numbers.pop();
    var output_text = '';

    for (var i=0, value; value=numbers[i]; i++) {
      if (output_text.length > 0) {
        output_text += ', ';
      }
      output_text += numberToDateName(value, type);
    }
    return output_text + ' and ' + numberToDateName(last_val, type);
  };

  /*
   * Pad to equivalent of sprintf('%02d'). Both moment.js and later.js
   * have zero-fill functions, but alas, they're private.
   */
  var zeroPad = function(x) {
    return (x < 10) ? '0' + x : x;
  };

  var removeFromSchedule = function( schedule, member, length ) {
    if( schedule[member] && schedule[member].length === length ) {
      delete schedule[member];
    }
  }

  //----------------

  /*
   * Given a schedule from later.js (i.e. after parsing the cronspec),
   * generate a friendly sentence description.
   */
  var scheduleToSentence = function(schedule, useSeconds) {
    var textParts = [];

    // A later.js schedules contains no member for time units where an asterisk is used,
    // but schedules that means the same (e.g 0/1 is essentially the same as *) are
    // returned with populated members.
    // Remove all members that are fully populated to reduce complexity of code
    removeFromSchedule( schedule, 'M', 12 );
    removeFromSchedule( schedule, 'D', 31 );
    removeFromSchedule( schedule, 'd', 7 );
    removeFromSchedule( schedule, 'h', 24 );
    removeFromSchedule( schedule, 'm', 60 );
    removeFromSchedule( schedule, 's', 60 );

    var everySecond = useSeconds && schedule['s'] === undefined,
        everyMinute = schedule['m'] === undefined,
        everyHour = schedule['h'] === undefined
        everyWeekday = schedule['d'] === undefined
        everyDayInMonth = schedule['D'] === undefined,
        everyMonth = schedule['M'] === undefined;

    var oneOrTwoSecondsPerMinute = schedule['s'] && schedule['s'].length <= 2;
    var oneOrTwoMinutesPerHour = schedule['m'] && schedule['m'].length <= 2;
    var oneOrTwoHoursPerDay = schedule['h'] && schedule['h'].length <= 2;
    var onlySpecificDaysOfMonth = schedule['D'] && schedule['D'].length !== 31;
    if ( oneOrTwoHoursPerDay && oneOrTwoMinutesPerHour && oneOrTwoSecondsPerMinute ) {
      // If there are only one or two specified values for
      // hour or minute, print them in HH:MM format, or HH:MM:ss if seconds are used
      // If seconds are not used, later.js returns one element for the seconds (set to zero)

      var hm = [];
      var m = moment();
      for (var i=0; i < schedule['h'].length; i++) {
        for (var j=0; j < schedule['m'].length; j++) {
          for (var k=0; k < schedule['s'].length; k++) {
            m.hour(schedule['h'][i]);
            m.minute(schedule['m'][j]);
            m.second(schedule['s'][k]);
            hm.push(m.format( useSeconds ? 'HH:mm:ss' : 'HH:mm'));
          }
        }
      }
      if (hm.length < 2) {
        textParts.push( hm[0] );
      } else {
        var last_val = hm.pop();
        textParts.push( hm.join(', ') + ' and ' + last_val );
      }
      if (everyWeekday && everyDayInMonth) {
        textParts.push('every day');
      }

    } else {
      var seconds = getSecondsTextParts(schedule['s']);
      var minutes = getMinutesTextParts(schedule['m']);
      var beginning = '';
      var end = '';

      textParts.push('Every');

      // Otherwise, list out every specified hour/minute value.
      var hasSpecificSeconds = schedule['s'] && (
          schedule['s'].length > 1 && schedule['s'].length < 60 ||
          schedule['s'].length === 1 && schedule['s'][0] !== 0 );
      if(hasSpecificSeconds) {
        beginning = seconds.beginning;
        end = seconds.text;
      }

      if(schedule['h']) { // runs only at specific hours
        if( hasSpecificSeconds ) {
          end += ' on the ';
        }
        if (schedule['m']) { // and only at specific minutes
          var hours = numberList(schedule['h']) + ' hour';
          if( !hasSpecificSeconds && isOnTheHour(schedule['m']) ) {
            textParts = [ 'On the' ];
            end += hours;
          } else {
            beginning = minutes.beginning;
            end += minutes.text + ' past the ' + hours;
          }
        } else { // specific hours, but every minute
          end += 'minute of ' + numberList(schedule['h']) + ' hour';
        }
      } else if(schedule['m']) { // every hour, but specific minutes
        beginning = minutes.beginning;
        end += minutes.text;
        if( !isOnTheHour(schedule['m']) && ( onlySpecificDaysOfMonth || schedule['d'] || schedule['M'] ) ) {
          end += ' past every hour';
        }
      } else if( !schedule['s'] && !schedule['m'] ) {
        beginning = seconds.beginning;
      } else if( !useSeconds || !hasSpecificSeconds) { // cronspec has "*" for both hour and minute
        beginning += minutes.beginning;
      }
      textParts.push(beginning);
      textParts.push(end);
    }

    if (onlySpecificDaysOfMonth) { // runs only on specific day(s) of month
      textParts.push('on the ' + numberList(schedule['D']));
      if (!schedule['M']) {
        textParts.push('of every month');
      }
    }

    if (schedule['d']) { // runs only on specific day(s) of week
      if (schedule['D']) {
        // if both day fields are specified, cron uses both; superuser.com/a/348372
        textParts.push('and every');
      } else {
        textParts.push('on');
      }
      textParts.push(dateList(schedule['d'], 'dow'));
    }

    if (schedule['M']) {
      if( schedule['M'].length === 12 ) {
        textParts.push('day of every month');
      } else {
        // runs only in specific months; put this output last
        textParts.push('in ' + dateList(schedule['M'], 'mon'));
      }
    }

    return textParts.filter(function(p) { return p; }).join(' ');
  };

  //----------------

  /*
   * Given a cronspec, return the human-readable string.
   */
  var toString = function(cronspec, sixth) {
    var schedule = later.parse.cron(cronspec, sixth);
    return scheduleToSentence(schedule['schedules'][0], sixth);
  };

  /*
   * Given a cronspec, return the next date for when it will next run.
   * (This is just a wrapper for later.js)
   */
  var getNextDate = function(cronspec, sixth) {
    later.date.localTime();
    var schedule = later.parse.cron(cronspec, sixth);
    return later.schedule(schedule).next();
  };

  /*
   * Given a cronspec, return a friendly string for when it will next run.
   * (This is just a wrapper for later.js and moment.js)
   */
  var getNext = function(cronspec, sixth) {
    return moment( getNextDate( cronspec, sixth ) ).calendar();
  };

  /*
   * Given a cronspec and numDates, return a list of formatted dates
   * of the next set of runs.
   * (This is just a wrapper for later.js and moment.js)
   */
  var getNextDates = function(cronspec, numDates, sixth) {
    var schedule = later.parse.cron(cronspec, sixth);
    var nextDates = later.schedule(schedule).next(numDates);

    var nextPrettyDates = []
    for (var i = 0; i < nextDates.length; i++) {
      nextPrettyDates.push(moment(nextDates[i]).calendar());
    }

    return nextPrettyDates;
  };

  //----------------

  // attach ourselves to window in the browser, and to exports in Node,
  // so our functions can always be called as prettyCron.toString()
  var global_obj = (typeof exports !== "undefined" && exports !== null) ? exports : window.prettyCron = {};

  global_obj.toString = toString;
  global_obj.getNext = getNext;
  global_obj.getNextDate = getNextDate;
  global_obj.getNextDates = getNextDates;

}).call(this);
