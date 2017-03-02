'use strict'

var csvParser = require('../lib/csvparser')

var csvHandler = {
    processCSVWithEscape: function (req, res, next) {
        req.needToEscape = true;
        return csvParser.parse(req, res, next);
    },

    processCSV: function(req, res, next) {
        return csvParser.parse(req, res, next);
    }
}

module.exports = csvHandler;
