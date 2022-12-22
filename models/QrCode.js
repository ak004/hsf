const mongoose = require("mongoose")

const QrCodeSchema = new mongoose.Schema({
    qrCode: {
        type: Number,
        // required: true,
    },
    
})

const QrCode = mongoose.model("QrCode",  QrCodeSchema)
module.exports = QrCode;
