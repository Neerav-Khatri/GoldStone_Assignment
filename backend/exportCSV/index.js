const express = require("express");
require("dotenv").config();

const cors = require("cors");
const { connection } = require("./db");
const { userModel } = require("./Model/Users.model");
const csvParser = require("json2csv").Parser;

const app = express();

app.use(express.json());
app.use(cors());

app.get("/export", async(req, res)=>{
    try {
        let data = [];
        const details = await userModel.find();
        details.forEach(ele => {
            let {id, name, email, gender, status} = ele;
            data.push({ id, name, email, gender, status });
        });
        const csvFields = ['id', 'name', 'email', 'gender', 'status'];
        const csv_Parser = new csvParser({csvFields});
        const csvData = csv_Parser.parse(data);

        res.setHeader("Content-Type","text/csv");
        res.setHeader("Content-Disposition","attatchment : filename = upforce.csv");

        res.end(csvData);
    } catch (error) {
        console.log(error)
        res.send({msg:'somthing went wrong',status:'error'})
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