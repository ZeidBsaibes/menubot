import * as fs from "fs/promises";
import pdf from "pdf-parse";

async function parsePDF(filePath) {
  const dataBuffer = await fs.readFile(filePath);
  const data = await pdf(dataBuffer);
  return data.text;
}

export default parsePDF;
