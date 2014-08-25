YUI.add('datatype-date-math', function(Y) {

/**
 * Parse number submodule.
 *
 * @module datatype
 * @submodule datatype-date-parse
 * @for DataType.Date
 */
var LANG = Y.Lang;

Y.mix(Y.namespace("DataType.Date"), {

	/**
	 * Checks whether a native JavaScript Date contains a valid value.
	 * @for DataType.Date
	 * @method isValidDate
	 * @param oDate {Date} Date in the month for which the number of days is desired.
	 * @return {Boolean} True if the date argument contains a valid value.
	 */
	 isValidDate : function (oDate) {
		if(LANG.isDate(oDate) && (isFinite(oDate)) && (oDate != "Invalid Date") && !isNaN(oDate) && (oDate != null)) {
            return true;
        }
        else {
            Y.log("Could not validate data " + LANG.dump(oDate) + " as type Date", "warn", "date");
            return false;
        }
	},
	
	areEqual : function (aDate, bDate) {
		return (this.isValidDate(aDate) && this.isValidDate(bDate) && (aDate.getTime() == bDate.getTime()));	
	},

    isGreater : function (aDate, bDate) {
    	return (this.isValidDate(aDate) && this.isValidDate(bDate) && (aDate.getTime() > bDate.getTime()));
    },

    isGreaterOrEqual : function (aDate, bDate) {
    	return (this.isValidDate(aDate) && this.isValidDate(bDate) && (aDate.getTime() >= bDate.getTime()));
    },

	addMonths : function (oDate, numMonths) {
		var newYear = oDate.getFullYear();
		var newMonth = oDate.getMonth() + numMonths;		
		
		newYear  = Math.floor(newYear + newMonth / 12);
		newMonth = (newMonth % 12 + 12) % 12;
		
		var newDate = new Date (oDate.getTime());
		newDate.setYear(newYear);
		newDate.setMonth(newMonth);
		
		return newDate;
	},
	
	addYears : function (oDate, numYears) {
		var newYear = oDate.getFullYear() + numYears;
		var newDate = new Date(oDate.getTime());
		
		newDate.setYear(newYear);
		return newDate;
	},

    listOfDatesInMonth : function (oDate) {
       if (!this.isValidDate(oDate)) {
       	 return [];
       }

       var daysInMonth = this.daysInMonth(oDate),
           year        = oDate.getFullYear(),
           month       = oDate.getMonth(),
           output      = [];

       for (var day = 1; day <= daysInMonth; day++) {
       	   output.push(new Date(year, month, day, 12, 0, 0));
       }

       return output;
    },

	/**
	 * Takes a native JavaScript Date and returns the number of days in the month that the given date belongs to.
	 * @for DataType.Date
	 * @method daysInMonth
	 * @param oDate {Date} Date in the month for which the number of days is desired.
	 * @return {Number} A number (either 28, 29, 30 or 31) of days in the given month.
	 */
	 daysInMonth : function (oDate) {
		if (!this.isValidDate(oDate)) {
			return 0;
		}
		
		var mon = oDate.getMonth();
		var lengths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

		if (mon != 1) {
			return lengths[mon];
		}
		else {

			var year = oDate.getFullYear();
			if (year%400 === 0) {
			       return 29;
			}	
			else if (year%100 === 0) {
				   return 28;
			}
			else if (year%4 === 0) {
			       return 29;
			}
			else {
			       return 28;
		    }
	   } 
	}

});


}, '@VERSION@' ,{requires:['yui-base']});
