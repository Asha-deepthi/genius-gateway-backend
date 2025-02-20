import express from "express";
import connectdb from "./db.js"
import cors from "cors";
import { registerUser,verifyUser , getUserdetails , updateMarks , level1completion } from "./controller.js";
const app = express();
app.use(cors());

// Or restrict to your frontend's origin (recommended for production)
app.use(cors({
    origin: "http://localhost:5173", // Replace with your frontend URL
    methods: ["GET", "POST"],
    credentials: true // If you are using cookies or authentication
}));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
connectdb();
app.post("/createUser",registerUser);
app.post("/loginUser",verifyUser);
app.post("/access",getUserdetails);
app.post("/marks",updateMarks);
app.post("/completion",level1completion);

app.listen(5000, () => console.log("server running on port 5000"))