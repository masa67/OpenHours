
# Introduction

A simple [Jison](https://github.com/zaach/jison)-based parser to parse strings that use the format typical of presenting weekly open hours. For example:

 * 'mon-fri 8:00-16:00'
 * 'Mon-Fri 8:00-16:00'
 * 'mon-wed 8-14'
 * 'mon-wed 8-14, thu 9-12'
 * 'Thu 8-16'

# Execution

Input: `'mon-tue 8:00-16:00'`

Output: `[{ weekday: 1, start: 480, end: 960 }, { weekday: 2, start: 480, end: 960 }]`

Weekday numbering equals JavaScript `getDay()` method of `Date`, i.e., Sunday = 0, ..., Saturday = 6. `start`/`end` times are returned as minutes from the beginning of the day.

# Build

Install jison locally (`npm install jison`).

IMPORTANT: Make sure that [this](https://github.com/zaach/jison/pull/267/files#r25562689) one-line fix has been done in the version of Jison you are using.

`$node build.js` generates `lib/openhours.js` from `src/openhours.jison`.

# License

For Jison:

Copyright (c) 2009-2014 Zachary Carter

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.