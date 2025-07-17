import User from "../models/User.js";

//get user preferences
export const getPreferences = async (req,res) => {
  try{
    const user = await User.findById(req.user.userId);

    res.status(200).json({
      preferences:user.preferences || [],
    });
  }catch(error){
    console.error('Error fetching user preferences:', error);
    res.status(500).json({ message: 'Failed to fetch user preferences' });
  }
};
//save prefernce




export const savePreferences = async (req, res) => {
  try {
    const { preferences } = req.body;
    const user = await User.findById(req.user.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.preferences = preferences;
    await user.save();
    res.status(200).json({ message: "Preferences saved" });
  } catch (err) {
    console.error("Saving preference error:", err);
    res.status(500).json({ message: "Server error" });
  }
};