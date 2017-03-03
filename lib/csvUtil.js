'use strict'
var csvUtil = {
    escape_active: function (x) {
        if (x)
            return ('' + x.replace(/"/g, '').replace(/,/g, ' ').replace(/\n/g, " ").replace(/\r/g, " ").replace(/^=/g, "'='").replace(/^\+/, "'+'").replace(/^-/, "'-'") + '');
        else
            return ('');
    },

    build_response: function (error, csvData) {
        var response = {};
        response['error'] = error;
        response['csvData'] = csvData;
        return response;
    }
}

module.exports =csvUtil;