const mongoose = require("mongoose")

const computerSchema = new mongoose.Schema({
    title: {
        type: String,
        require: [true, "Заголовок не заполнен!"],
        trim: true
    },
    brend: {
        type: String,
        required: [true, "Заголовок не заполнен!"],
        trim: true
    },
    description: {
        type: String,
        required: [true, "Заголовок не заполнен!"],
        trim: true
    },
    price: {
        type: Number,
        required: [true, "Цена не указана!"],
        min: 0
    }
})

module.exports = mongoose.model("Computer", computerSchema)