var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var searchSchema = new Schema({
	query : String,
	searchType : String,
	Date : {
		type: String,
		default : Date.now()
	}
});
module.exports = mongoose.model('search', searchSchema);