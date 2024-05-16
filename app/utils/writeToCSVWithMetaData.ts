import fs from "fs";
import path from "path";

// Function to write CSV data and append metadata
function writeCsvWithMetadata(restaurantName, csvData, metadataAttributes) {
  const filePath = path.join(
    process.cwd(),
    "context_menus",
    `${restaurantName}.csv`
  );

  // First, write the initial CSV data
  fs.writeFile(filePath, csvData, (err) => {
    if (err) {
      console.error("Error writing initial CSV data:", err);
      return;
    }
    console.log("Initial CSV data written successfully.");

    // Prepare metadata to be appended
    let metadataString = `\n\nMetadata,\n`; // Start with a newline and a header
    for (const key in metadataAttributes) {
      metadataString += `${key},${metadataAttributes[key]}\n`; // Each attribute on a new line
    }

    // Append metadata to the same CSV file
    fs.appendFile(filePath, metadataString, (err) => {
      if (err) {
        console.error("Error appending metadata:", err);
        return;
      }
      console.log("Metadata appended successfully.");
    });
  });
}

export default writeCsvWithMetadata;
