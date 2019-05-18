const mongoose = require('mongoose');

let RecordSchema = new mongoose.Schema({
    key: {
        type: String
    },
    value: {
        type: String
    },
    counts: {
        type: [Number]
    }
});

// Create model
let Record = mongoose.model('Record', RecordSchema);

module.exports = { Record };
