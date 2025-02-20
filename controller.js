import User from "./User.js"
const registerUser = async (req, res) => {
    try {
        const {
            name, email, Teamname
        } = req.body;
        const password = Teamname + "@geniusgateway"
        const newUser = new User({ name, email, Teamname, password });
        await newUser.save();
        res.status(200).json({ message: "login completed successfully" })
    }
    catch (error) {
        res.status(500).json({ message: "error occurred" })
    }
}

const verifyUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ email, password });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // If user exists, send success response
        res.status(200).json({ message: 'Sign-in successful', user: { name: user.name, email: user.email, teamName: user.teamName } });
    } catch (error) {
        res.status(500).json({ message: "error occurred" })
    }
}
export { registerUser, verifyUser };