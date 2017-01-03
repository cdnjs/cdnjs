function random(from, to) {
    return Math.floor(Math.random() * (to - from + 1) + from);
}

function getEmployeeNo() {
    var out = '',
        i = 0;
    for (; i < 6; ++i) {
        out += random(0, 7);
    }
    return out;
}

function leftPad(string, size, character) {
    var result = String(string);
    character = character || " ";
    while (result.length < size) {
        result = character + result;
    }
    return result;
}

function formatDate(d) {
    return leftPad(d.getFullYear(), 4, '0')+leftPad(d.getMonth() + 1, 2, '0')+leftPad(d.getDate(), 2, '0');
}
/**
    * Returns an array of fake data
    * @param {Number} count The number of fake rows to create data for
    * @return {Array} The fake record data, suitable for usage with an ArrayReader
    */
function createFakeData(count) {
    var firstNames   = ['Ed', 'Tommy', 'Aaron', 'Abe', 'Jamie', 'Adam', 'Dave', 'David', 'Jay', 'Nicolas', 'Nige'],
        lastNames    = ['Spencer', 'Maintz', 'Conran', 'Elias', 'Avins', 'Mishcon', 'Kaneda', 'Davis', 'Robinson', 'Ferrero', 'White'],
        departments  = ['Engineering', 'QA', 'Sales', 'Marketing', 'Accounting', 'Managment', 'Support', 'Administration'],
        ratings      = [1, 2, 3, 4, 5],
        salaries     = [100, 400, 900, 1500, 1000000],
        noticePeriods= ['2 weeks', '1 month', '3 months'];

    var data = [];
    for (var i = 0; i < (count || 25); i++) {
        var firstName   = firstNames[random(0, firstNames.length - 1)],
            lastName    = lastNames[random(0, lastNames.length - 1)],
            name        = firstName + ' ' + lastName,
            email       = firstName.toLowerCase() + '.' + lastName.toLowerCase() + '@sentcha.com',
            rating      = ratings[(name === 'Nige White') ? 0 : random(0, ratings.length - 1)],
            salary      = salaries[(name === 'Nige White') ? 4 : random(0, salaries.length - 1)],
            department  = departments[random(0, departments.length - 1)],
            ageInYears  = random(23, 55),
            dob         = new Date(new Date().getFullYear() - ageInYears, random(0, 11), random(0, 31)),
            joinDate    = new Date(new Date() - random(60, 2000) * 1000 * 60 * 60 * 24),
            sickDays    = random(0, 10),
            holidayDays = random(0, 10),
            holidayAllowance = random(20, 40);

        data.push({
            employeeNo: getEmployeeNo(),
            rating: rating,
            salary: salary,
            forename: firstName,
            surname: lastName,
            email: email,
            department: department,
            dob: formatDate(dob),
            joinDate: formatDate(joinDate),
            sickDays: sickDays,
            holidayDays: holidayDays,
            holidayAllowance: holidayAllowance,
            noticePeriod: noticePeriods[random(0, noticePeriods.length - 1)],
            avatar: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSdj-gG2gXPkOUJGQ2r-3A5AnIgASv19axozeYMWssSVJyySvBIeQ'
        });
    }
    return data;
}

var classBody = JSON.stringify({
    singleton: true,
    data: createFakeData(500)
}, true, '    ');

writeFile('app/data/BigData.js', 'Ext.define(\'KitchenSink.data.BigData\',' + classBody + ');');