
var openHoursParser = require('../lib/openHoursParser').parser;
var moment = require('../node_modules/moment');

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

function isOpen(input, timestamp, expected) {
    if (openHours.isValid(input)) {
        if (openHours.isOpen(input, timestamp)) {
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

var pass = isOpen('mon-fri 8:00-16:00', moment('2015-11-23 07:30').unix(), false);
pass = pass && isOpen('mon-fri 8:00-16:00', moment('2015-11-23 08:30').unix(), true);
pass = pass && isOpen('Mon-Wed 8-12, Thu-Sat 9-13', moment('2015-11-26 07:30').unix(), false);
pass = pass && isOpen('Mon-Wed 8-12, Thu-Sat 9-13', moment('2015-11-26 12:55').unix(), true);
pass = pass && isOpen('Mon-Wed 8-12, Thu-Sat 9-13', moment('2015-11-26 13:05').unix(), false);

console.log('Verdict: ', pass ? 'pass' : 'fail');


