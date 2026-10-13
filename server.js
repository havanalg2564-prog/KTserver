const express = require("express")
const mongoose = require("mongoose")
const Computer = require('./models/Computer')

const PORT = 3000

const app = express()

app.use(express.json())


mongoose.connect("mongodb://localhost:27017/computer").then(()=>{
    console.log("Успешное подключение к базе данных");
    
}).catch((error)=>{
    console.error("Произошла ошибка при подключении к БД: " + error);
    process.exit(1)
})


app.get("/computers", async (req, res) =>{
    try{
        const computer = await Computer.find()
        res.json(computer)
    }catch(error){
        res.send("Ошибка при получении товаров: " + error)
    }
})
app.get("/computer/:id", async (req, res) =>{
    try{
        const { id } = req.params

        const computer = await Computer.findById(id)
        res.json(computer)
    }catch(error){
        res.send("Ошибка при получении товаров: " + error)
    }
})



app.post("/addcomputer", async (req, res)=>{
    const { title, brend, description, price} = req.body
    try {
        const newComputer = await Computer.create({
            title, brend, description, price
        })
        await newComputer.save()
        res.send("Товар успешно добавлен!")
    }catch(error) {
        console.log("Ошибка при добавлении товара: " + error);
        res.send("Ошибка при добавлении товара!")
    }
})

app.put("/computer/:id", async (req, res) =>{
    try{
        const { id } = req.params
        const { title, brend, description, price } = req.body
        const updateComputer = await Computer.findByIdAndUpdate(id, {
            title, 
            brend, 
            description, 
            price
        }, {new: true})
        if(!updateComputer){
            res.json("Такого товара не существует!")
        }
        res.json( updateComputer, "Товар успешно заменен!");
    }catch(error) {
        res.send("Ошибка при замене товара: " + error)
    }
})



app.patch("/computer/:id", async (req, res) =>{
    try{
        const { id } = req.params
        const updateComputer = await Computer.findByIdAndUpdate(id, {$set: req.body}, {new: true})
        if(!updateComputer){
            res.json("Такого товара не существует!")
        }
        res.json( updateComputer, "Товар успешно изменен!");
    }catch(error) {
        res.send("Ошибка при изменении товара: " + error)
    }
})


app.delete("/computer/:id", async(req, res)=> {
    try {
        const { id } = req.params
        const computer = await Computer.findByIdAndDelete(id)
        if(!computer) {
            res.send("Такого товара не существует!")
        }
        res.send("Товар успешно удален!");
    }catch (error) {
        res.send("Ошибка при удалении товара: " + error)
    }
})
















app.listen(PORT, ()=>{
    console.log("Сервер запущен на порту:" + PORT);
})