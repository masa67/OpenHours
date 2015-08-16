
/*global openHoursParser */
var openHours = (function () {
    'use strict';

    var parser = openHoursParser.openHoursParser;

    return {
        parse: function(str) {
            try {
                parser.init();
                return parser.parse(str);
            } catch (err) {
                return undefined;
            }
        }
    };
}());