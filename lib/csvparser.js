'use strict'

var fs = require('fs');
var util = require('./csvUtil');

var csvParser = {
    parseSync: function (csvfile) {
        if (!csvfile || !csvfile.path) {
            var e = new Error('csvfile not provided');
            e.status = 403;
            return util.build_response(e, null);
        }
        csvfile.delimiter = ',';
        csvfile.header = true;
        var data = fs.readFileSync(csvfile.path, {encoding: 'utf-8'});
        if (!data) {
            var e = new Error('csvfile was empty');
            e.status = 400;
            return util.build_response(e, null);
        }

        var lines = data.replace(/\r/g, '').split('\n');
        var result = [];
        var start = 0;
        var columnCount = lines[0].split(csvfile.delimiter).length;
        var headers = [];
        if (csvfile.header) {
            headers = lines[0].split(',');
            start = 1;
        }
        for (var i = start; i < lines.length; i++) {
            var obj = {};
            var currentline = lines[i].split(csvfile.delimiter);
            if (currentline.length === columnCount) {
                if (csvfile.header) {
                    for (var j = 0; j < headers.length; j++) {
                        obj[headers[j]] = util.escape_active(currentline[j]);
                    }
                } else {
                    for (var k = 0; k < currentline.length; k++) {
                        obj[k] = util.escape_active(currentline[k]);
                    }
                }
                result.push(obj);
            }
        }
        return util.build_response(null, result);
    }
}

module.exports = csvParser;
