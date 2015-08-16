
/* This parser parses the open hours strings of the form: */
/* - "mon-thu 11-23, fri 11-24, sat 12:30-24, sun 12-20" */

%{
    var res = [];
    var wDays = [];
    var times = [];

    parser.init = function() {
        res = [];
    }

	function fillTimes() {
        var ent, i, tent, wday;

        if (wDays.length === 0) {
            while (tent = times.shift()) {
                ent = { start: tent.start };
                if (tent.end) {
                    ent.end = tent.end;
                }
                res.push(ent);
            }
        } else {
            while (wday = wDays.shift()) {
                for (i = 0; i < times.length; i += 1) {
                    tent = times[i];
                    ent = {
                        weekday: wday,
                        start: tent.start
                    }
                    if (tent.end) {
                        ent.end = tent.end;
                    }
                    res.push(ent);
                }
            }
            times = [];
        }
    }

    function pushTime(start, end) {
        var eMin = timeStrToMin(end),
            sMin = timeStrToMin(start);

		if (eMin < sMin) {
			eMin += 24*60;
		}
        if (end) {
            times.push({start: sMin, end: eMin});
        } else {
            times.push({start: sMin});
        }
    }

    function pushWDays(wd1, wd2) {
        var act = false, i, wDayTokens = [ 'mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun' ];

        for (i = 0; i < wDayTokens.length; i += 1) {
            if (!act) {
                if (wDayTokens[i] === wd1.toLowerCase()) {
                    wDays.push(wDayTokens[i]);
                    if (!wd2) return;
                    act = true;
                }
            } else {
                wDays.push(wDayTokens[i]);
                if (wDayTokens[i] === wd2.toLowerCase()) {
                    return;
                } else {
                    if (i === (wDayTokens.length - 1)) {
                        i = -1;
                    }
                }
            }
        }
    }

	function timeStrToMin(tim) {
		var arr = tim.split(':');
		return 60 * parseInt(arr[0]) + ((arr.length > 1) ? parseInt(arr[1]) : 0);
	}
%}

%lex
%%

\s+                                                 /* skip whitespace */
[0-9][0-9]?(":"[0-5][0-9])?\b                       return 'TIM'
","                                                 return ','
"-"                                                 return '-'
[Mm]on|[Tt]ue|[Ww]ed|[Tt]hu|[Ff]ri|[Ss]at|[Ss]un    return 'WDA'
<<EOF>>                                             return 'EOF'

/lex

%start expressions

%%


expressions
    : e EOF
        {return res;}
    ;

e
    : wl
    ;

wl : wdt ',' wl | wdt;

wdt
    : WDA '-' WDA per
        { pushWDays($1, $3); fillTimes(); }
    | WDA per
        { pushWDays($1); fillTimes(); }
    ;

per
    : TIM '-' TIM
        {{ pushTime($1, $3); }}
    ;
