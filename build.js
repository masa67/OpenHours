
var fs = require('fs');
var Parser = require('jison').Parser;

var grammar = fs.readFileSync('src/openhours.jison', 'utf8');

var parser = new Parser(grammar);

var parserSource = parser.generate({moduleName: "openHoursParser"});

fs.writeFile('lib/openHoursParser.js', parserSource);




