'use strict';

module.exports.getUrlPath = function(p) {
    return p.then(function(url) {
        return url.match(/http:\/\/[0-9a-z:]+(.*)/)[1]  + '?env=testing';
    })
};

