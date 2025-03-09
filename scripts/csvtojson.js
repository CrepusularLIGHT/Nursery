import fs from "fs";
import csv from "csvtojson";

async function convertCsvToJson(csvFilePath, jsonFilePath) {
    try {
      const jsonArray = await csv().fromFile(csvFilePath);
      
      // Save the JSON file
      fs.writeFileSync(jsonFilePath, JSON.stringify(jsonArray, null, 2));
      
      console.log(`✅ JSON saved to ${jsonFilePath}`);
    } catch (error) {
      console.error("❌ Error converting CSV to JSON:", error);
    }
  }
  
  // Run CSV to JSON conversion
  convertCsvToJson(csvFile, jsonFile);
  