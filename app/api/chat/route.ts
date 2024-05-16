import { anthropic } from "@ai-sdk/anthropic";
import { openai } from "@ai-sdk/openai";

import { StreamingTextResponse, streamText, StreamData } from "ai";

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = await streamText({
    model: anthropic("claude-3-opus-20240229"),
    messages,
  });

  const data = new StreamData();

  data.append({ name: "zeid" });

  const stream = result.toAIStream({
    onFinal(_) {
      data.close();
    },
  });

  return new StreamingTextResponse(stream, {}, data);
}
