import User from "./User.js"
const registerUser=async(req,res)=>{
    try{
        const { 
            name,email,Teamname
        } = req.body;
        const password=Teamname+"@geniusgateway"
        const newUser = new User({name,email,Teamname,password});
        await newUser.save();
        res.status(200).json({message:"login completed successfully"})
    }
    catch(error)
    {
        res.status(500).json({message:"error occurred"})
    }
}
export default  registerUser;