
var parser = require("../lib/openhours").parser;

function exec(input) {
    console.log('input: ' + input);
    parser.init();
    try {
        var ret = parser.parse(input);
        console.log('output:\n' + JSON.stringify(ret, undefined, 2));
    } catch (err) {
        console.log('output: invalid input');
    }
    return ret;
}

exec('mon-fri 8:00-16:00');
exec('Mon-Fri 8-16');
exec('Mon-Wed 8-12, Thu-Sat 9-13');
exec('invalid string');

