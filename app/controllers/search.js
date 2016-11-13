var request = require('request');
var mongoose = require("mongoose");
require('../models/search');
var search = mongoose.model('search');
var async = require('async');
var Schema = mongoose.Schema;
var config = require('config');


var response = {
    error: false,
    status: 200,
    userMessage: '',
    errors: null,
    data: null,
};

var NullResponseValue = function() {
    response = {
        error: false,
        status: 200,
        userMessage: '',
        errors: null,
        data: null,
    };
    return true;
};

var SendResponse = function(res) {
    res.status(response.status);
    res.send(response);
    NullResponseValue();
};

/*===========================================
***   Services  ***
=============================================*/
var methods = {};
module.exports.controller = function(router) {

    router
        .route('/search')
        .post(methods.search);



}




/*===========================================================
    *** Search Service  ***
    =============================================================*/
methods.search = function(req, res) {

    req.checkBody('q', 'Query is Required').notEmpty();//check if query is empty
    req.checkBody('type', 'type is required.').notEmpty();//check if type is not specified


    var errors = req.validationErrors(true);
    if (errors) {
        response.error = true;
        response.status = 400;
        response.errors = errors;
        response.userMessage = 'Validation errors';
        return (SendResponse(res));
    } else {
        var query = req.body.q;
        var searchType = req.body.type;
        var url = "https://api.spotify.com/v1/search?type=" + searchType + "&q=" + query
        request(url, function(error, response, body) {
            insertHistory(query, searchType); // Saving Search History in DB.
            if (!error && response.statusCode == 200) {
                res.send(JSON.parse(body));
            } else {
                res.json({ 'message': 'Sorry some error occured', 'error': true })
            }
        })


    }
}

function insertHistory(query, searchType) {
    var searchData = new search()
    searchData.query = query;
    searchData.searchType = searchType;
    searchData.save()
}
