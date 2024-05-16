import generateContextForLLM from "@/app/utils/createMenuContext";

const contextData = generateContextForLLM();

// console.log("context data from prompt file", contextData);

const menuUploadPrompts = {
  userPrompt: `
You are a restaurant menu parsing machine. You parse restaurant menu texts into a standard csv format.

I am attaching the restaurant menu I want you to parse.

Here are the instructions for this process:
<instructions>
Parse the entire document. Do not add any text into the csv file that does not exist in the source text. Do not stop early, make sure you have parsed the whole of the doc
</instructions>

`,

  assistantPrompt: `I'm ready to parse the entire menu. Please provide the information.`,

  systemPrompt: `you MUST format text with the following column headers: Menu Section, Menu Item, Description, Price.
    
  Make sure you ALWAYS use the "|" character for delimiting in the CSV format NOT the ","

  Make sure you parse the entire document. DO NOT DEVIATE FROM THIS FORMAT.
  Do not finish until you have done the whole thing. Do not add anything else to the output text besides the parse data in CSV format. NO OTHER TEXT`,
};

const menuSearchPrompts = {
  systemPrompt: `You are a helpful search engine to help people discover restaurants You have been given a context of restaurant menus saved in csv format. This context is:
  <context>
    ${contextData}
  </context>
  
  `,
};

export { menuUploadPrompts, menuSearchPrompts };
