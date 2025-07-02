import Preference from "../models/Preference.js";

export const getPreferences = async (req, res) => {
  try {
    const preference = await Preference.findOne({ userId: req.userId });
    if (!preference) return res.status(200).json({ categories: [], frequency: "realtime" });
    res.status(200).json(preference);
  } catch (err) {
    res.status(500).json({ msg: "Failed to fetch preferences" });
  }
};

export const savePreferences = async (req, res) => {
  const { categories, frequency } = req.body;

  try {
    const existing = await Preference.findOne({ userId: req.userId });

    if (existing) {
      existing.categories = categories;
      existing.frequency = frequency;
      await existing.save();
      return res.status(200).json({ msg: "Preferences updated" });
    }

    const newPref = new Preference({ userId: req.userId, categories, frequency });
    await newPref.save();
    res.status(201).json({ msg: "Preferences saved" });
  } catch (err) {
    res.status(500).json({ msg: "Failed to save preferences" });
  }
};