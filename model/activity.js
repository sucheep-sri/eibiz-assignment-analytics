var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;

var d = new Date();

var activitySchema = new Schema(
	{
    	name : {
			type : String
		},
		products : [{
			type : String,
			ref : 'product'
		}],
		timeStamp : {
			type : Number,
      		default : Date.now
		},
		dateStamp : {
			type : Number,
			default : d.getDate()
		}
	},
	{
		collection : 'activity'
	}
);
module.exports = Mongoose.model('activity', activitySchema);
