'use strict'
var csvUtil = {
    escape_active: function (x) {
        if (x)
            return ('' + x.replace(/"/g, '').replace(/,/g, ' ').replace(/\n/g, " ").replace(/\r/g, " ").replace(/^=/g, "'='").replace(/^\+/, "'+'").replace(/^-/, "'-'") + '');
        else
            return ('');
    }
}

module.exports =csvUtil;