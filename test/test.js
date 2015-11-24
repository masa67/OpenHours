
var openHoursParser = require('../lib/openHoursParser').parser;
var moment = require('../node_modules/moment-timezone');

var fs = require('fs');
eval(fs.readFileSync('lib/openhours.js').toString());

function exec(input) {
    console.log('input: ' + input);
    if (openHours.isValid(input)) {
        console.log('output:\n' + JSON.stringify(openHours.parse(input)));
    } else {
        console.log('output: invalid input\n');
    }
}

function isOpen(input, timestamp, timezone, expected) {
    if (openHours.isValid(input)) {
        if (openHours.isOpen(input, timestamp, timezone)) {
            return expected ? true : false;
        }
        return expected ? false : true;
    }
    return false;
}

exec('mon-fri 8:00-16:00');
exec('Mon-Fri 8-16');
exec('Mon-Wed 8-12, Thu-Sat 9-13');
exec('Mon 0:30-1:30');
exec('Mon 23:30-1:30');
exec('invalid string');

// serviceTZ refers to the service time zone (in which the open hours are given)
var serviceTZ = 'Europe/Helsinki';

var pass = isOpen('mon-fri 8:00-16:00', serviceTZ, moment.tz('2015-11-23 07:30', serviceTZ).unix(), false);
pass = pass && isOpen('mon-fri 8:00-16:00', serviceTZ, moment.tz('2015-11-23 08:30', serviceTZ).unix(), true);
pass = pass && isOpen('Mon-Wed 8-12, Thu-Sat 9-13', serviceTZ, moment.tz('2015-11-26 07:30', serviceTZ).unix(), false);
pass = pass && isOpen('Mon-Wed 8-12, Thu-Sat 9-13', serviceTZ, moment.tz('2015-11-26 12:55', serviceTZ).unix(), true);
pass = pass && isOpen('Mon-Wed 8-12, Thu-Sat 9-13', serviceTZ, moment.tz('2015-11-26 13:05', serviceTZ).unix(), false);

// Test the case where the customer is in a different time zone
// myTZ refers to the customer time zone.
var myTZ = 'Europe/Stockholm';

pass = pass && isOpen('mon-fri 8-16', serviceTZ, moment.tz('2015-11-23 06:55', myTZ).unix(), false);
pass = pass && isOpen('mon-fri 8-16', serviceTZ, moment.tz('2015-11-23 07:05', myTZ).unix(), true);
pass = pass && isOpen('mon-fri 8-16', serviceTZ, moment.tz('2015-11-23 14:55', myTZ).unix(), true);
pass = pass && isOpen('mon-fri 8-16', serviceTZ, moment.tz('2015-11-23 15:05', myTZ).unix(), false);

console.log('Verdict: ', pass ? 'pass' : 'fail');


