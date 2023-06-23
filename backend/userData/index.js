const express = require("express");
require("dotenv").config();

const cors = require("cors");
const { connection } = require("./db");
const { userModel } = require("./Model/Users.model");

const app = express();

app.use(express.json());
app.use(cors());

app.post("/user", async(req, res) => {
    const user = await userModel.find();
    const arr = req.body

    if (user.length>0){
        res.status(201).send({ "message" : "Database consists of users." })
    } else {
        arr.map(async(ele) => {
            const addUser = new userModel(ele);
            await addUser.save();
        });

        res.status(200).send({ "message" : "Users has been added to the datebase" })
    }
})

app.listen(process.env.Port, async() => {
    try {
        await connection;
        console.log("App is connected to DB");
        console.log(`Server is running on port ${process.env.Port}`);
    } catch (error) {
        console.log(error);
    }
});

module.exports = { app };