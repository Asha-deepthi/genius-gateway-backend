import express from "express";
import connectdb from "./db.js"
import cors from "cors";
import bodyParser from 'body-parser';
import User from "./User.js"; // ✅ Import User Model
import { registerUser,verifyUser , getUserdetails , updateMarks , level1completion , decrement } from "./controller.js";

const app = express();
app.use(cors());
app.use(bodyParser.json());

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
app.post("/decrementMarks",decrement);
app.get("/teams", async (req, res) => {
    try {
        const teams = await User.find({}, { Teamname: 1, points: 1, _id: 0 })
            .sort({ points: -1 }) // Only sort by points descending
        res.json(teams);
    } catch (error) {
        console.error("Error fetching teams:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.listen(5000, () => console.log("server running on port 5000"))