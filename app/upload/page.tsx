"use client";

import { useState } from "react";
import axios from "axios";

const PdfUploadForm = () => {
  const [pdfFile, setPdfFile] = useState(null);
  const [restaurantName, setRestaurantName] = useState("");
  const [location, setLocation] = useState("");
  const [website, setWebsite] = useState("");
  const [cuisine, setCuisine] = useState("");

  const handlePdfUpload = (e) => {
    const file = e.target.files[0];
    setPdfFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!pdfFile) {
      alert("Please select a PDF file.");
      return;
    }

    const metadata = {
      restaurantName,
      location,
      website,
      cuisine,
    };

    const formData = new FormData();
    formData.append("pdf", pdfFile);
    formData.append("metadata", JSON.stringify(metadata));

    try {
      const response = await axios.post("/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log(response.data.message);
      // Reset form fields after successful submission
      setPdfFile(null);
      setRestaurantName("");
      setLocation("");
      setWebsite("");
      setCuisine("");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      <div className="mb-4">
        <label
          htmlFor="pdfUpload"
          className="block mb-2 font-bold text-dark dark:text-white"
        >
          Upload PDF
        </label>
        <input
          type="file"
          id="pdfUpload"
          accept=".pdf"
          onChange={handlePdfUpload}
          className="w-full px-3 py-2 text-gray-600 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="restaurantName"
          className="block mb-2 font-bold text-black dark:text-white"
        >
          Restaurant Name
        </label>
        <input
          type="text"
          id="restaurantName"
          value={restaurantName}
          onChange={(e) => setRestaurantName(e.target.value)}
          className="w-full px-3 py-2 text-black border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="location"
          className="block mb-2 font-bold text-black dark:text-white"
        >
          Location
        </label>
        <input
          type="text"
          id="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full px-3 py-2 text-black  border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="website"
          className="block mb-2 font-bold text-black dark:text-white"
        >
          Website
        </label>
        <input
          type="text"
          id="website"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          className="w-full px-3 py-2 text-black border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="cuisine"
          className="block mb-2 font-bold text-black dark:text-white"
        >
          Cuisine
        </label>
        <input
          type="text"
          id="cuisine"
          value={cuisine}
          onChange={(e) => setCuisine(e.target.value)}
          className="w-full px-3 py-2 text-black border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <button
        type="submit"
        className="px-4 py-2 font-bold text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Submit
      </button>
    </form>
  );
};

export default PdfUploadForm;
