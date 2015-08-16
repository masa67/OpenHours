
/*global openHoursParser */
var openHours = (function () {
    'use strict';
    var parser;

    return {
        parse: function(str) {
            if (!parser) {
                parser = new openHoursParser.Parser();
            }

            try {
                parser.init();
                return parser.parse(str);
            } catch (err) {
                return undefined;
            }
        }
    };
}());