import { generateText } from "ai";
import { anthropic } from "@ai-sdk/anthropic";
import { menuUploadPrompts } from "@/lib/prompts";

const LLMTextParse = async (pdfText: any) => {
  const { text } = await generateText({
    model: anthropic("claude-3-sonnet-20240229"),
    messages: [
      {
        role: "user",
        content: menuUploadPrompts.userPrompt,
      },
      {
        role: "assistant",
        content: menuUploadPrompts.assistantPrompt,
      },
      {
        role: "user",
        content: pdfText,
      },
    ],
    system: menuUploadPrompts.systemPrompt,
  });

  return text;
};

export default LLMTextParse;
