import React from 'react'

const Preferences = () => {
  return (
   
    <div className="p-6 max-w-4xl mx-auto">
    <h1 className="text-2xl font-bold mb-4">🛠️ News Preferences</h1>
    <p>Select your favorite categories to personalize your news feed:</p>

    <form className="mt-6 space-y-4">
      <label className="block">
        <input type="checkbox" name="category" value="technology" />
        <span className="ml-2">Technology</span>
      </label>
      <label className="block">
        <input type="checkbox" name="category" value="sports" />
        <span className="ml-2">Sports</span>
      </label>
      <label className="block">
        <input type="checkbox" name="category" value="business" />
        <span className="ml-2">Business</span>
      </label>
      <label className="block">
        <input type="checkbox" name="category" value="entertainment" />
        <span className="ml-2">Entertainment</span>
      </label>

      <button
        type="submit"
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Save Preferences
      </button>
    </form>
  </div>
  )
}

export default Preferences