
/*global exports, moment, openHoursParser, require */
var openHours = (function () {
    'use strict';

    var parser,
        openHoursParser = openHoursParser || require('../lib/openHoursParser').parser,
        moment = moment || require('../node_modules/moment');

    return {
        parse: function (ohStr) {
            if (!parser) {
                parser = new openHoursParser.Parser();
            }

            try {
                parser.init();
                return parser.parse(ohStr);
            } catch (err) {
                return undefined;
            }
        },
        isValid: function (ohStr) {
            return (this.parse(ohStr) !== undefined) ? true : false;
        },
        isOpen: function (ohStr, timestamp) {
            var mom = moment.unix(timestamp),
                weekday = mom.day(),
                min = 60 * mom.hour() + mom.minute(),
                ohArr = this.parse(ohStr),
                i,
                ent;

            for (i = 0; i < ohArr.length; i += 1) {
                ent = ohArr[i];
                if (ent.weekday === weekday &&
                        ent.start <= min &&
                        min <= ent.end) {

                    return true;
                }
            }

            return false;
        }
    };
}());

exports.openHours = openHours;
