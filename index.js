'use strict'

var parsecsv = {
    escapeActiveContent: function (req, res, next) {
        var allItems = req.body.data || req.body.csvData;
        var errorData = [];
        var err;
        if (!allItems || !util.isArray(allItems)) {
            err = new Error('Data format error');
            err.status = 412;
            return next(err);
        }

        allItems.forEach(function (item) {
            console.log('Item', item);
        });

        // if (x)
        //     return ('' + x.replace(/"/g, '').replace(/,/g, ' ').replace(/\n/g, " ").replace(/\r/g, " ").replace(/^=/g, "'='").replace(/^\+/, "'+'").replace(/^-/, "'-'") + '');
        // else
        //     return ('');
    }
}

module.export = parsecsv;