

'use strict';

var path = require('path'); 
// console.log(path,"pathpathpath");

module.exports = function(app){
    app.use('/api/v1/user', require('../api/v1/user'));
    app.use('/api/v1/auth', require('../api/v1/auth'));
    app.use('/api/v1/agency', require('../api/v1/agency'));
    app.use('/api/v1/crime', require('../api/v1/crime'));
    app.route('/*')
        .get(function(req, res) {
        return res.json({status:200, message:"Api endpoint reachable"});
    });

};