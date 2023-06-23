const express = require("express");
require("dotenv").config();

const cors = require("cors");
const { connection } = require("./db");
const { userModel } = require("./Model/Users.model");

const app = express();

app.use(express.json());
app.use(cors());

// GET request 
// It returns response with the users array from the database.

app.get("/user", async(req, res) => {
    const users = await userModel.find();
    res.status(200).send(users);
});


// PATCH request
// It will update the user data in the datebase

app.patch("/user/:id", async(req, res) => {
    const { id } = req.params;
    await userModel.findByIdAndUpdate({_id : id}, req.body);
    res.status(200).send({ "message" : "User has been updated." });
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