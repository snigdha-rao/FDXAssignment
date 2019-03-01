
//Require mongoose package
const mongoose = require('mongoose');

//Define BucketlistSchema with title, description and category
const BucketlistSchema = mongoose.Schema({
    title: {
    	type: String,
    	required: true,

    },
    description: {
    	type: String,
    	required: true,
    	
    },

    date: {
    	type: Date,
    	default: Date.now
    }
});

//Create a model using mongoose.model and export it
const BucketList = module.exports = mongoose.model('BucketList', BucketlistSchema );


//BucketList.find() returns all the lists
module.exports.getAllLists = (callback) => {
    BucketList.find({}, null, {sort: {date: -1}},callback);
}

//newList.save is used to insert the document into MongoDB
module.exports.addList = (newList, callback) => {
    newList.save(callback);
}


//We pass on an id and remove it from DB using Bucketlist.remove()
module.exports.deleteListById = (id, callback) => {
    let query = {_id: id};
    BucketList.remove(query, callback);
}

module.exports.updateListById = (id,title,description, callback) => {
	var obj = {}
	if (title) {obj['title']=title}
	if (description) {obj['description']=description}
    BucketList.findByIdAndUpdate(id, obj, function(err, list) {
    	if (err) {callback(err)}
    	else {callback(err,list)}
    });
    
}


