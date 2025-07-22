import { useEffect, useState } from "react";
import API from "../services/axios";

const categories = [
  "business",
  "entertainment",
  "general",
  "health",
  "science",
  "sports",
  "technology",
];

const Preference = () => {
  const [selected, setSelected] = useState([]);
  const [frequency, setFrequency] = useState('hourly')

  // Fetch user preferences when page loads
  useEffect(() => {
    const fetchPreferences = async () => {
      try {
        const res = await API.get("/preference");
        console.log(" Got preferences from server:", res.data.preferences);
        setSelected(res.data.preferences || []);
      } catch (error) {
        console.error("Failed to fetch preferences", error);
      }
    };

    fetchPreferences();
  }, []);

  const toggleCategory = (category) => {
    setSelected((prev) =>
      prev.includes(category)
        ? prev.filter((item) => item !== category)
        : [...prev, category]
    );
  };

  const savePreferences = async () => {
    try {
      const res = await API.post("/preference", {
         preferences: selected,
         alertFrequency: frequency,
    });
      console.log("Saved preferences:", res);
      alert("Preferences saved successfully!");
    } catch (error) {
      console.error(
        "Failed to save preferences",
        error.response?.data || error
      );
      alert("Failed to save preferences");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4"> Choose Your News Categories</h1>
      <div className="flex flex-wrap gap-3 mb-4">
        {categories.map((category) => (
          <button
            key={category}
            className={`px-4 py-2 rounded ${
              selected.includes(category)
                ? "bg-blue-600 text-white"
                : "bg-gray-200"
            }`}
            onClick={() => toggleCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <label className="block mb-2 font-semibold">Alert Frequency:</label>
      <select
        className="mb-4 p-2 border rounded"
        value={frequency}
        onChange={(e) => setFrequency(e.target.value)}
      >
        <option value="immediate">Immediate</option>
        <option value="hourly">Hourly</option>
        <option value="daily">Daily</option>
      </select>
      <button
        onClick={savePreferences}
        className="bg-green-600 text-white px-6 py-2 rounded"
      >
        Save Preferences
      </button>
    </div>
  );
};

export default Preference;
