//Require
var recomModel = require('../model/recomModel.js');

function formQueryString(taglist){
	var queryString = '';
	for(index in taglist){
		queryString +='"' + taglist[index] + '" ';
	}
	return queryString;
}

function findAll(taglist, res){
	var queryString = formQueryString(taglist);
	recomModel.find({$text:{$search:queryString}}, function(err, data){
		var object = null;
		if(typeof data != "undefined"){
			var ids = new Array();
			for(index in data){
				ids.push(data[index].id);
			}
			object = new Object();
			object["ids"] = ids;
		}
		res.send(object);
	});
}

var recommender = {
	handleRecomm: function(req, res){
		var taglist = req.body.tags;
		findAll(taglist, res);
	}
};
module.exports = recommender;