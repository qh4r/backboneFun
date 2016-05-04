var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    autoIncrement = require('mongoose-auto-increment');



var vehicleSchema = new Schema({
    id: {
        type: Number,
        unique: true,
        required: true
    },
    name: {
        type: String
    },
    speed: {
        type: Number
    },
    color: {
        type: String
    }
});

vehicleSchema.plugin(autoIncrement.plugin, { model: 'Vehicle', field: 'id' });


module.exports = mongoose.model('Vehicle', vehicleSchema);