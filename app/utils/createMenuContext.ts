import path from "path";
import fs from "fs";

const generateContextForLLM = () => {
  const directoryPath: string = "./context_menus/";
  const fileNames: string[] = fs.readdirSync(directoryPath);

  const contextData: string = fileNames
    .map((fileName) => {
      const filePath = path.join(directoryPath, fileName);
      const fileContent = fs.readFileSync(filePath, "utf-8");
      return fileContent;
    })
    .join("/n");

  return contextData;
};

export default generateContextForLLM;
