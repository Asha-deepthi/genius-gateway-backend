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

const getUserdetails = async(req,res) => {
    const { email } = req.body;

    // Check if email is provided
    if (!email) {
        return res.status(400).json({ message: 'Email is required' });
    }

    try {
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Return user details (excluding password for security)
        res.json({
            name: user.name,
            email: user.email,
            teamName: user.Teamname
        });
    } catch (error) {
        console.error('Error fetching user details:', error);
        res.status(500).json({ message: 'Server error' });
    }
}
export { registerUser, verifyUser , getUserdetails };