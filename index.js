'use strict'
var parsecsv = {
    processCSVWithEscape: function(req, res, next) {
        var csvfile = req.files && req.files.csvfile;
        var e;
        if(!csvfile || !csvfile.path){
            e = new Error('csvfile not provided');
            e.status = 403;
            return next(e);
        }
        csvfile.delimiter = ',';
        csvfile.header = true;

        fs.readFile(csvfile.path, {encoding: 'utf-8'}, function(err, data){
            if (!err){
                var lines=data.replace(/\r/g, '').split('\n');
                var result = [];
                var start = 0;
                var columnCount = lines[0].split(csvfile.delimiter).length;
                var headers = [];
                if(csvfile.header){
                    headers=lines[0].split(',');
                    start = 1;
                }
                for (var i=start; i<lines.length; i++) {
                    var obj = {};
                    var currentline=lines[i].split(csvfile.delimiter);
                    if ( currentline.length === columnCount ) {
                        if (csvfile.header){
                            for (var j=0; j<headers.length; j++) {
                                obj[headers[j]] = this.escape_active(currentline[j]);
                            }
                        } else {
                            for (var k=0; k<currentline.length; k++) {
                                obj[k] = this.escape_active(currentline[k]);
                            }
                        }
                        result.push(obj);
                    }
                }
                req.body.csvData = result;
                next();
            }else{
                err.status = 400;
                return next(err);
            }
        });
    },

    escape_active: function(x) {
        if (x)
            return ('' + x.replace(/"/g, '').replace(/,/g, ' ').replace(/\n/g, " ").replace(/\r/g, " ").replace(/^=/g, "'='").replace(/^\+/, "'+'").replace(/^-/, "'-'") + '');
        else
            return ('');
    }
}

module.export = parsecsv;