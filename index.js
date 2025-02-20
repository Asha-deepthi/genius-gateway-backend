import express from "express";
import connectdb from "./db.js"
import registerUser from "./controller.js";
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
connectdb();
app.post("/createUser",registerUser);


app.listen(5000, () => console.log("server running on port 5000"))