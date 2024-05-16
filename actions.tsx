"use server";

import { createStreamableValue } from "ai/rsc";
import { CoreMessage, streamText } from "ai";
import { openai } from "@ai-sdk/openai";
import fs from "fs";
import path from "path";
import chalk from "chalk";
import { menuSearchPrompts } from "./lib/prompts";
import { anthropic } from "@ai-sdk/anthropic";

export async function continueConversation(messages: CoreMessage[]) {
  const directoryPath: string = "./context_menus/";
  const fileNames: string[] = fs.readdirSync(directoryPath);

  const contextData: string = fileNames
    .map((fileName) => {
      const filePath = path.join(directoryPath, fileName);
      const fileContent = fs.readFileSync(filePath, "utf-8");
      return fileContent;
    })
    .join("/n");

  const result = await streamText({
    model: openai("gpt-4o"),
    // model: anthropic("claude-3-opus-20240229"),
    messages,
    system: menuSearchPrompts.systemPrompt,
    // system: `You are a helpful search engine to help people discover restaurants YUou have been given a context and your context is:
    // <context>
    //   ${contextData}
    // </context>

    // `,
  });

  const stream = createStreamableValue(result.textStream);
  return stream.value;
}
