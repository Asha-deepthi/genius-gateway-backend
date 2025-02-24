import User from "./User.js"
// Function to register a new user/team
const registerUser = async (req, res) => {
    try {
        const { name, email, teamName } = req.body;
        const password = teamName + "@geniusgateway";
        
        // Check if required fields are present
        if (!name || !email || !teamName) {
            return res.status(400).json({ message: "Name, Email, and Teamname are required" });
        }
        
        // Check if email or teamname already exists
        const existingUser = await User.findOne({ $or: [{ email }, { teamName }] });
        if (existingUser) {
            return res.status(409).json({ message: "Email or Teamname already taken" });
        }

        // Generate a random number between 1 and 5 for the crossword grid
        const randomGrid = Math.floor(Math.random() * 5) + 1;

        // Create a new user with the random crossword grid number
        const newUser = new User({
            name,
            email,
            Teamname:teamName,
            password,
            points: 100,               // Default points
            gridNumber: randomGrid  // Random grid number
        });

        await newUser.save(); // Save the new user to the database
        
        res.status(201).json({ 
            message: "Registration successful", 
            grid: randomGrid 
        });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


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
            teamName: user.Teamname,
            Points: user.points,
            Level1:user.level1,
            Level2:user.level2,
            Level3:user.level3,
            gridNum:user.gridNumber
        });
    } catch (error) {
        console.error('Error fetching user details:', error);
        res.status(500).json({ message: 'Server error' });
    }
}

const updateMarks = async (req, res) => {
    const { email } = req.body; // Receive email & correctness flag

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

        // If the answer is correct, add 10 marks
       
            user.points += 50; // Ensure marks exist and increment by 10
            await user.save(); // Save the updated document
        

        res.status(200).json({ message: 'Marks updated successfully', updatedMarks: user.points });
    } catch (error) {
        console.error('Error updating marks:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
}

const level1completion = async (req, res) => {
    const { email } = req.body;
    try {
        // Find the user by email
        const user = await User.findOne({ email: email });
    
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }
    
        // Update the level 1 completion status
        user.level1 = true;
        await user.save();
    
        res.json({ message: "Level 1 completed" });
      } 
      catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
      }
}

const decrement = async (req,res) => {
    const { email, hintsUsed } = req.body;

    if (!email || !hintsUsed || hintsUsed < 1 || hintsUsed > 3) {
        return res.status(400).json({ message: "Invalid request data" });
    }

    try {
        let user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Calculate deduction based on hints used
        const deduction = hintsUsed === 1 ? 5 : hintsUsed === 2 ? 10 : 15;
        user.points =  user.points - deduction;

        await user.save();

        res.json({ message: "Points updated", points: user.points });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
}

const getTeams = async (req, res) => {
    try {
        const teams = await User.find({}, { Teamname: 1, points: 1, _id: 0 })
            .sort({ points: -1, Teamname: 1 }); // Sort by points (descending)
        res.json(teams); // Send the sorted teams as a response
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export { registerUser, verifyUser , getUserdetails , updateMarks , level1completion , decrement , getTeams};