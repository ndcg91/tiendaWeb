var mongoose    =require('mongoose');
var Schema      =mongoose.Schema;

var WorkerSchema  =new Schema({
        name:String,
        lastname:String,
        address:String,
});

module.exports = mongoose.model('Workers',WorkerSchema);
